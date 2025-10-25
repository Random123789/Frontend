import { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { SignUp } from './components/SignUp';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { ContractAnalysis } from './components/ContractAnalysis';
import { Toaster } from './components/ui/sonner';

export type User = {
  id: string;
  email: string;
  name: string;
};

export type Contract = {
  id: string;
  name: string;
  uploadDate: string;
  status: 'uploaded' | 'processing' | 'completed' | 'failed';
  analyzed?: boolean;
  fileContent?: string;
  summary?: {
    jobTitle: string;
    employer: string;
    salary: string;
    workingHours: string;
    leaveDays: string;
    noticePeriod: string;
    keyTerms: string[];
  };
  hasReview?: boolean;
  riskAssessment?: {
    overallRisk: 'low' | 'medium' | 'high';
    issues: Array<{
      severity: 'low' | 'medium' | 'high';
      clause: string;
      issue: string;
      suggestion: string;
    }>;
  };
  comparedWith?: string[]; // Array of contract IDs this contract has been compared with
  comparisons?: {
    [contractId: string]: {
      insights: string[];
      recommendation: string;
    };
  };
};

export type Page = 'home' | 'signup' | 'login' | 'dashboard' | 'analysis';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  // Load mock user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('legalens_user');
    const storedContracts = localStorage.getItem('legalens_contracts');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setCurrentPage('dashboard');
    }
    
    if (storedContracts) {
      setContracts(JSON.parse(storedContracts));
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Mock login
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
    };
    setUser(mockUser);
    localStorage.setItem('legalens_user', JSON.stringify(mockUser));
    setCurrentPage('dashboard');
  };

  const handleSignup = (name: string, email: string, password: string) => {
    // Mock signup
    const mockUser: User = {
      id: '1',
      email,
      name,
    };
    setUser(mockUser);
    localStorage.setItem('legalens_user', JSON.stringify(mockUser));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setContracts([]);
    localStorage.removeItem('legalens_user');
    localStorage.removeItem('legalens_contracts');
    setCurrentPage('home');
  };

  const handleUpdateProfile = (name: string, email: string) => {
    if (!user) return;
    const updatedUser = { ...user, name, email };
    setUser(updatedUser);
    localStorage.setItem('legalens_user', JSON.stringify(updatedUser));
  };

  const handleUploadContract = (file: File) => {
    const newContract: Contract = {
      id: Date.now().toString(),
      name: file.name,
      uploadDate: new Date().toISOString(),
      status: 'uploaded',
      analyzed: false,
    };

    setContracts(prev => {
      const updated = [...prev, newContract];
      localStorage.setItem('legallens_contracts', JSON.stringify(updated));
      return updated;
    });
  };

  const handleAnalyzeContract = (contractId: string) => {
    // Set status to processing
    setContracts(prev => {
      const updated = prev.map(c =>
        c.id === contractId
          ? { ...c, status: 'processing' as const }
          : c
      );
      localStorage.setItem('legallens_contracts', JSON.stringify(updated));
      return updated;
    });

    // Simulate processing
    setTimeout(() => {
      setContracts(prev => {
        const updated = prev.map(c =>
          c.id === contractId
            ? {
                ...c,
                status: 'completed' as const,
                analyzed: true,
                fileContent: `EMPLOYMENT CONTRACT

THIS AGREEMENT is made on 1 January 2025

BETWEEN: EventPro Singapore Pte Ltd (the "Employer")
AND: [Employee Name] (the "Employee")

1. POSITION AND DUTIES
The Employee is employed as an Event Coordinator on a part-time, fixed-term basis for a period of six (6) months.

2. COMPENSATION
2.1 The Employee shall be paid S$18.00 per hour.
2.2 Overtime work shall be compensated at one and a half times (1.5x) the regular hourly rate.

3. WORKING HOURS
Working hours will be variable, typically ranging from 20 to 30 hours per week, depending on event schedules.

4. LEAVE ENTITLEMENTS
4.1 The Employee is entitled to one (1) day of paid leave per month, prorated based on hours worked.
4.2 Leave must be requested at least two weeks in advance.

5. NOTICE PERIOD
Either party may terminate this contract with one (1) week's written notice.

6. TRANSPORTATION
The Employee is required to provide their own transportation to event venues.

7. CONFIDENTIALITY
The Employee agrees to maintain strict confidentiality regarding all company information and client details.

8. NON-COMPETE CLAUSE
The Employee agrees not to engage in similar event coordination work with competing companies for a period of three (3) months following termination of this contract.

9. GOVERNING LAW
This contract shall be governed by the laws of Singapore.

SIGNED: ______________________
Date: 1 January 2025`,
                summary: {
                  jobTitle: 'Event Coordinator',
                  employer: 'EventPro Singapore Pte Ltd',
                  salary: '$18/hour',
                  workingHours: 'Variable, typically 20-30 hours/week',
                  leaveDays: '1 day per month (prorated)',
                  noticePeriod: '1 week',
                  keyTerms: [
                    'Fixed-term contract for 6 months',
                    'Overtime paid at 1.5x rate',
                    'Must provide own transportation',
                    'Confidentiality clause included',
                    'Non-compete for 3 months after termination',
                  ],
                },
              }
            : c
        );
        localStorage.setItem('legallens_contracts', JSON.stringify(updated));
        return updated;
      });
    }, 3000);
  };

  const handleUnlockReview = (contractId: string) => {
    // Simulate payment - only unlock, don't generate yet
    const updatedContract = {
      hasReview: true,
    };

    setContracts(prev => {
      const updated = prev.map(c =>
        c.id === contractId
          ? { ...c, ...updatedContract }
          : c
      );
      localStorage.setItem('legallens_contracts', JSON.stringify(updated));
      return updated;
    });

    // Also update the selected contract if it's the one being unlocked
    if (selectedContract?.id === contractId) {
      setSelectedContract(prev => prev ? { ...prev, ...updatedContract } : null);
    }
  };

  const handleGenerateReview = (contractId: string) => {
    // Generate review content after payment
    const reviewData = {
      riskAssessment: {
        overallRisk: 'medium' as const,
        issues: [
          {
            severity: 'high' as const,
            clause: 'Non-Compete Agreement',
            issue: 'The 3-month non-compete period may be excessive for part-time work and could limit your employment opportunities.',
            suggestion: 'Request to reduce non-compete period to 1 month or remove entirely for part-time positions.',
          },
          {
            severity: 'medium' as const,
            clause: 'Leave Entitlements',
            issue: 'While 1 day per month is provided, there is no mention of statutory sick leave or public holiday compensation.',
            suggestion: 'Clarify sick leave policy and public holiday work compensation in writing.',
          },
          {
            severity: 'low' as const,
            clause: 'Transportation',
            issue: 'Contract requires you to provide own transportation without compensation.',
            suggestion: 'Consider negotiating a transport allowance, especially for late-night events.',
          },
        ],
      },
    };

    setContracts(prev => {
      const updated = prev.map(c =>
        c.id === contractId
          ? { ...c, ...reviewData }
          : c
      );
      localStorage.setItem('legallens_contracts', JSON.stringify(updated));
      return updated;
    });

    // Also update the selected contract if it's the one being generated
    if (selectedContract?.id === contractId) {
      setSelectedContract(prev => prev ? { ...prev, ...reviewData } : null);
    }
  };

  const handleViewAnalysis = (contract: Contract) => {
    setSelectedContract(contract);
    setCurrentPage('analysis');
  };

  const handleUnlockComparison = (contractId1: string, contractId2: string) => {
    // Simulate payment and unlock comparison
    const comparisonData = {
      insights: [
        'Contract B offers $2/hour more in base salary',
        'Contract A has better leave benefits (12 days vs 6 days annually)',
        'Contract B includes health insurance, Contract A does not',
        'Contract A has a shorter notice period (1 week vs 2 weeks)',
        'Both contracts include similar non-compete clauses',
      ],
      recommendation: 'Based on the comparison, Contract B offers better overall compensation and benefits, but Contract A provides more flexibility with its shorter notice period. Consider your priorities: if financial security is key, choose Contract B. If flexibility matters more, Contract A may be better.',
    };

    setContracts(prev => {
      const updated = prev.map(c => {
        if (c.id === contractId1) {
          return {
            ...c,
            comparedWith: [...(c.comparedWith || []), contractId2],
            comparisons: {
              ...(c.comparisons || {}),
              [contractId2]: comparisonData,
            },
          };
        }
        if (c.id === contractId2) {
          return {
            ...c,
            comparedWith: [...(c.comparedWith || []), contractId1],
            comparisons: {
              ...(c.comparisons || {}),
              [contractId1]: comparisonData,
            },
          };
        }
        return c;
      });
      localStorage.setItem('legallens_contracts', JSON.stringify(updated));
      return updated;
    });

    // Update selected contract if it's one of the compared contracts
    if (selectedContract?.id === contractId1 || selectedContract?.id === contractId2) {
      setSelectedContract(prev => {
        if (!prev) return null;
        const otherContractId = prev.id === contractId1 ? contractId2 : contractId1;
        return {
          ...prev,
          comparedWith: [...(prev.comparedWith || []), otherContractId],
          comparisons: {
            ...(prev.comparisons || {}),
            [otherContractId]: comparisonData,
          },
        };
      });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <Toaster />
      
      {currentPage === 'home' && (
        <Home
          onGetStarted={() => setCurrentPage('signup')}
          onLogin={() => setCurrentPage('login')}
        />
      )}

      {currentPage === 'signup' && (
        <SignUp
          onSignup={handleSignup}
          onNavigateToLogin={() => setCurrentPage('login')}
          onBack={() => setCurrentPage('home')}
        />
      )}

      {currentPage === 'login' && (
        <Login
          onLogin={handleLogin}
          onNavigateToSignup={() => setCurrentPage('signup')}
          onBack={() => setCurrentPage('home')}
        />
      )}

      {currentPage === 'dashboard' && user && (
        <Dashboard
          user={user}
          contracts={contracts}
          onLogout={handleLogout}
          onUpdateProfile={handleUpdateProfile}
          onUploadContract={handleUploadContract}
          onAnalyzeContract={handleAnalyzeContract}
          onViewAnalysis={handleViewAnalysis}
        />
      )}

      {currentPage === 'analysis' && selectedContract && user && (
        <ContractAnalysis
          contract={selectedContract}
          contracts={contracts.filter(c => c.status === 'completed' && c.id !== selectedContract.id)}
          user={user}
          onBack={() => setCurrentPage('dashboard')}
          onUnlockReview={handleUnlockReview}
          onGenerateReview={handleGenerateReview}
          onUnlockComparison={handleUnlockComparison}
        />
      )}
    </div>
  );
}
