import { useState } from 'react';
import { ArrowLeft, FileText, ShieldAlert, CheckCircle2, AlertCircle, Lock, Sparkles, ArrowLeftRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner@2.0.3';
import type { User, Contract } from '../App';
import { ScaleIcon } from './ScaleIcon';

type ContractAnalysisProps = {
  contract: Contract;
  contracts: Contract[];
  user: User;
  onBack: () => void;
  onUnlockReview: (contractId: string) => void;
  onGenerateReview: (contractId: string) => void;
  onUnlockComparison: (contractId1: string, contractId2: string) => void;
};

export function ContractAnalysis({
  contract,
  contracts,
  user,
  onBack,
  onUnlockReview,
  onGenerateReview,
  onUnlockComparison,
}: ContractAnalysisProps) {
  const [activeTab, setActiveTab] = useState('summary');
  const [comparisonContract, setComparisonContract] = useState<string>('');

  const handleUnlockReview = () => {
    toast.success('Payment successful! Review and Comparison unlocked.');
    onUnlockReview(contract.id);
  };

  const handleGenerateReview = () => {
    toast.success('Generating review...');
    onGenerateReview(contract.id);
  };

  const handleUnlockComparison = () => {
    if (!comparisonContract) {
      toast.error('Please select a contract to compare with');
      return;
    }
    toast.success('Generating comparison...');
    onUnlockComparison(contract.id, comparisonContract);
  };

  const selectedComparisonContract = contracts.find(c => c.id === comparisonContract);
  const isComparisonUnlocked = comparisonContract && contract.comparedWith?.includes(comparisonContract);
  const comparisonData = comparisonContract && contract.comparisons?.[comparisonContract];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center shadow-md shadow-teal-200">
                  <ScaleIcon size={22} className="text-amber-100" />
                </div>
                <div>
                  <h1 className="text-lg text-stone-900 tracking-tight">{contract.name}</h1>
                  <p className="text-xs text-stone-500">
                    Uploaded {new Date(contract.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-stone-600">Signed in as {user.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Split Screen Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Contract Text */}
        <div className="w-1/2 border-r border-stone-200 bg-white flex flex-col">
          <div className="border-b border-stone-200 px-6 py-4 bg-stone-50">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-teal-600" strokeWidth={2.5} />
              <h2 className="text-stone-900">Contract Document</h2>
            </div>
          </div>
          <ScrollArea className="flex-1 p-6">
            <div className="prose prose-stone max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm text-stone-700 leading-relaxed">
                {contract.fileContent || 'Contract content not available'}
              </pre>
            </div>
          </ScrollArea>
        </div>

        {/* Right Side - Analysis Tabs */}
        <div className="w-1/2 bg-stone-50 flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="border-b border-stone-200 bg-white px-6 py-3">
              <TabsList className="w-full bg-stone-100 p-1 rounded-xl">
                <TabsTrigger 
                  value="summary" 
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm rounded-lg transition-all py-2 px-2 text-xs"
                >
                  <Sparkles className="h-3 w-3 mr-1 shrink-0" />
                  <span className="truncate">Summary</span>
                  <Badge variant="secondary" className="ml-1 bg-teal-50 text-teal-700 border-0 text-[10px] px-1 py-0 shrink-0">Free</Badge>
                </TabsTrigger>
                <TabsTrigger 
                  value="review"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm rounded-lg transition-all py-2 px-2 text-xs"
                >
                  <ShieldAlert className="h-3 w-3 mr-1 shrink-0" />
                  <span className="truncate">Review</span>
                  {!contract.hasReview ? (
                    <Badge variant="secondary" className="ml-1 bg-amber-50 text-amber-700 border-0 text-[10px] px-1 py-0 shrink-0">$0.99</Badge>
                  ) : (
                    <Badge variant="secondary" className="ml-1 bg-teal-50 text-teal-700 border-0 text-[10px] px-1 py-0 shrink-0">Paid</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="comparison"
                  className="flex-1 data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm rounded-lg transition-all py-2 px-2 text-xs"
                >
                  <ArrowLeftRight className="h-3 w-3 mr-1 shrink-0" />
                  <span className="truncate">Compare</span>
                  {!contract.hasReview ? (
                    <Badge variant="secondary" className="ml-1 bg-amber-50 text-amber-700 border-0 text-[10px] px-1 py-0 shrink-0">$0.99</Badge>
                  ) : (
                    <Badge variant="secondary" className="ml-1 bg-teal-50 text-teal-700 border-0 text-[10px] px-1 py-0 shrink-0">Paid</Badge>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Summary Tab */}
            <TabsContent value="summary" className="flex-1 overflow-hidden mt-0">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-6">
                  {contract.summary ? (
                    <>
                      {/* Key Information */}
                      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                        <h3 className="text-lg mb-4 text-stone-900 flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-teal-600" />
                          Key Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-stone-500 mb-1">Job Title</p>
                            <p className="text-sm text-stone-900">{contract.summary.jobTitle}</p>
                          </div>
                          <div>
                            <p className="text-xs text-stone-500 mb-1">Employer</p>
                            <p className="text-sm text-stone-900">{contract.summary.employer}</p>
                          </div>
                          <div>
                            <p className="text-xs text-stone-500 mb-1">Salary</p>
                            <p className="text-sm text-stone-900">{contract.summary.salary}</p>
                          </div>
                          <div>
                            <p className="text-xs text-stone-500 mb-1">Working Hours</p>
                            <p className="text-sm text-stone-900">{contract.summary.workingHours}</p>
                          </div>
                          <div>
                            <p className="text-xs text-stone-500 mb-1">Leave Days</p>
                            <p className="text-sm text-stone-900">{contract.summary.leaveDays}</p>
                          </div>
                          <div>
                            <p className="text-xs text-stone-500 mb-1">Notice Period</p>
                            <p className="text-sm text-stone-900">{contract.summary.noticePeriod}</p>
                          </div>
                        </div>
                      </div>

                      {/* Key Terms */}
                      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                        <h3 className="text-lg mb-4 text-stone-900">Key Terms & Clauses</h3>
                        <ul className="space-y-3">
                          {contract.summary.keyTerms.map((term, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                              <span className="text-sm text-stone-700 leading-relaxed">{term}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA for Review */}
                      {!contract.hasReview && (
                        <div className="bg-gradient-to-br from-teal-50 to-amber-50/50 rounded-2xl border border-teal-200 p-6">
                          <div className="flex items-start gap-4">
                            <div className="h-12 w-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-teal-200">
                              <ShieldAlert className="h-6 w-6 text-amber-100" strokeWidth={2.5} />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg mb-2 text-stone-900">Get Full Analysis & Comparison</h3>
                              <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                                Unlock detailed risk assessment, MOM compliance check, negotiation strategies, and the ability to compare with other contracts.
                              </p>
                              <Button onClick={handleUnlockReview} className="bg-teal-600 hover:bg-teal-700">
                                <Lock className="h-4 w-4 mr-2" />
                                Unlock Full Access for $0.99
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-stone-500">Analysis not available</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Review Tab */}
            <TabsContent value="review" className="flex-1 overflow-hidden mt-0">
              <ScrollArea className="h-full">
                <div className="p-6">
                  {contract.hasReview && contract.riskAssessment ? (
                    <div className="space-y-6">
                      {/* Risk Overview */}
                      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg text-stone-900">Overall Risk Assessment</h3>
                          <Badge
                            className={
                              contract.riskAssessment.overallRisk === 'high'
                                ? 'bg-red-50 text-red-700 border-red-200'
                                : contract.riskAssessment.overallRisk === 'medium'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-teal-50 text-teal-700 border-teal-200'
                            }
                          >
                            {contract.riskAssessment.overallRisk.toUpperCase()} RISK
                          </Badge>
                        </div>
                      </div>

                      {/* Issues */}
                      <div className="space-y-4">
                        {contract.riskAssessment.issues.map((issue, index) => (
                          <div
                            key={index}
                            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm"
                          >
                            <div className="flex items-start gap-3 mb-3">
                              <AlertCircle
                                className={`h-5 w-5 shrink-0 mt-0.5 ${
                                  issue.severity === 'high'
                                    ? 'text-red-600'
                                    : issue.severity === 'medium'
                                    ? 'text-amber-600'
                                    : 'text-teal-600'
                                }`}
                                strokeWidth={2.5}
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="text-stone-900">{issue.clause}</h4>
                                  <Badge
                                    variant="secondary"
                                    className={
                                      issue.severity === 'high'
                                        ? 'bg-red-50 text-red-700 border-red-200'
                                        : issue.severity === 'medium'
                                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                                        : 'bg-teal-50 text-teal-700 border-teal-200'
                                    }
                                  >
                                    {issue.severity}
                                  </Badge>
                                </div>
                                <p className="text-sm text-stone-600 mb-3 leading-relaxed">{issue.issue}</p>
                                <div className="bg-teal-50 border border-teal-200 rounded-xl p-3">
                                  <p className="text-xs text-teal-900 mb-1">💡 Suggestion</p>
                                  <p className="text-sm text-teal-800 leading-relaxed">{issue.suggestion}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : contract.hasReview && !contract.riskAssessment ? (
                    <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
                      <div className="h-16 w-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-teal-200">
                        <Sparkles className="h-8 w-8 text-amber-100" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-2xl mb-3 text-stone-900 tracking-tight">
                        Ready to Generate Review
                      </h3>
                      <p className="text-stone-600 mb-6 leading-relaxed">
                        Click the button below to generate your detailed risk assessment, MOM compliance check, and negotiation strategies.
                      </p>
                      <Button
                        onClick={handleGenerateReview}
                        size="lg"
                        className="bg-teal-600 hover:bg-teal-700 shadow-lg"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Review
                      </Button>
                    </div>
                  ) : (
                    <div className="relative">
                      {/* Blurred Preview */}
                      <div className="blur-sm pointer-events-none select-none">
                        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm mb-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg text-stone-900">Overall Risk Assessment</h3>
                            <Badge className="bg-amber-50 text-amber-700 border-amber-200">
                              MEDIUM RISK
                            </Badge>
                          </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm mb-4">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-red-600" />
                            <div>
                              <h4 className="text-stone-900 mb-2">Non-Compete Agreement</h4>
                              <p className="text-sm text-stone-600">
                                The 3-month non-compete period may be excessive...
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Unlock Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-stone-50/80 via-stone-50/95 to-stone-50 flex items-center justify-center">
                        <div className="text-center max-w-md mx-auto p-8">
                          <div className="h-16 w-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-teal-200">
                            <Lock className="h-8 w-8 text-amber-100" strokeWidth={2.5} />
                          </div>
                          <h3 className="text-2xl mb-3 text-stone-900 tracking-tight">
                            Unlock Full Analysis
                          </h3>
                          <p className="text-stone-600 mb-6 leading-relaxed">
                            Get detailed risk assessment, MOM compliance check, negotiation strategies, and unlock comparison features for just $0.99.
                          </p>
                          <Button
                            onClick={handleUnlockReview}
                            size="lg"
                            className="bg-teal-600 hover:bg-teal-700 shadow-lg"
                          >
                            <Lock className="h-4 w-4 mr-2" />
                            Unlock for $0.99
                          </Button>
                          <p className="text-xs text-stone-500 mt-4">One-time payment • Unlocks Review + Comparison</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Comparison Tab */}
            <TabsContent value="comparison" className="flex-1 overflow-hidden mt-0">
              <ScrollArea className="h-full">
                <div className="p-6">
                  {!contract.hasReview ? (
                    <div className="relative">
                      {/* Blurred Preview */}
                      <div className="blur-sm pointer-events-none select-none">
                        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm mb-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg text-stone-900">Contract Comparison</h3>
                          </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm mb-4">
                          <div className="flex items-start gap-3">
                            <ArrowLeftRight className="h-5 w-5 text-teal-600" />
                            <div>
                              <h4 className="text-stone-900 mb-2">Side-by-Side Analysis</h4>
                              <p className="text-sm text-stone-600">
                                Compare key terms and conditions between contracts...
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Unlock Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-stone-50/80 via-stone-50/95 to-stone-50 flex items-center justify-center">
                        <div className="text-center max-w-md mx-auto p-8">
                          <div className="h-16 w-16 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-teal-200">
                            <Lock className="h-8 w-8 text-amber-100" strokeWidth={2.5} />
                          </div>
                          <h3 className="text-2xl mb-3 text-stone-900 tracking-tight">
                            Unlock Comparison Features
                          </h3>
                          <p className="text-stone-600 mb-6 leading-relaxed">
                            Get detailed risk assessment, MOM compliance check, negotiation strategies, and unlock comparison features for just $0.99.
                          </p>
                          <Button
                            onClick={handleUnlockReview}
                            size="lg"
                            className="bg-teal-600 hover:bg-teal-700 shadow-lg"
                          >
                            <Lock className="h-4 w-4 mr-2" />
                            Unlock for $0.99
                          </Button>
                          <p className="text-xs text-stone-500 mt-4">One-time payment • Unlocks Review + Comparison</p>
                        </div>
                      </div>
                    </div>
                  ) : contracts.filter(c => c.hasReview).length === 0 ? (
                    <div className="text-center py-12">
                      <ArrowLeftRight className="h-12 w-12 text-stone-300 mx-auto mb-4" />
                      <p className="text-stone-500 mb-2">No other upgraded contracts available</p>
                      <p className="text-xs text-stone-400">Upgrade another contract to enable comparison</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Info Banner */}
                      <div className="bg-gradient-to-r from-teal-50 to-amber-50/50 border border-teal-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <div className="h-6 w-6 bg-teal-600 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                            <Sparkles className="h-3 w-3 text-white" strokeWidth={2.5} />
                          </div>
                          <div>
                            <p className="text-xs text-stone-600 leading-relaxed">
                              Compare this contract with other <span className="font-medium text-teal-700">paid contracts</span>. Only upgraded contracts can be compared with each other.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Contract Selector */}
                      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                        <label className="text-sm text-stone-700 mb-2 block">Select contract to compare:</label>
                        <Select value={comparisonContract} onValueChange={setComparisonContract}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose a contract" />
                          </SelectTrigger>
                          <SelectContent>
                            {contracts.filter(c => c.hasReview).map(c => {
                              const isCompared = contract.comparedWith?.includes(c.id);
                              return (
                                <SelectItem key={c.id} value={c.id}>
                                  <div className="flex items-center justify-between w-full gap-3">
                                    <span>{c.name}</span>
                                    {isCompared && (
                                      <span className="text-teal-600 text-xs flex items-center gap-1">
                                        <CheckCircle2 className="h-3 w-3" strokeWidth={2.5} />
                                        Compared
                                      </span>
                                    )}
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      {comparisonContract && (
                        <>
                          {comparisonData && selectedComparisonContract ? (
                            <div className="space-y-6">
                              {/* Side-by-Side Comparison */}
                              <div className="grid grid-cols-2 gap-4">
                                {/* Current Contract */}
                                <div className="bg-white rounded-2xl border-2 border-teal-300 p-6 shadow-sm">
                                  <div className="flex items-center gap-2 mb-4">
                                    <div className="h-8 w-8 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center">
                                      <FileText className="h-4 w-4 text-white" strokeWidth={2.5} />
                                    </div>
                                    <h4 className="text-sm text-teal-700 font-medium">Contract A</h4>
                                  </div>
                                  <p className="text-xs text-stone-500 mb-4">{contract.name}</p>
                                  <div className="space-y-3">
                                    <div>
                                      <p className="text-xs text-stone-500 mb-1">Salary</p>
                                      <p className="text-sm text-stone-900">{contract.summary?.salary || 'N/A'}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-stone-500 mb-1">Working Hours</p>
                                      <p className="text-sm text-stone-900">{contract.summary?.workingHours || 'N/A'}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-stone-500 mb-1">Leave Days</p>
                                      <p className="text-sm text-stone-900">{contract.summary?.leaveDays || 'N/A'}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-stone-500 mb-1">Notice Period</p>
                                      <p className="text-sm text-stone-900">{contract.summary?.noticePeriod || 'N/A'}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Comparison Contract */}
                                <div className="bg-white rounded-2xl border-2 border-stone-300 p-6 shadow-sm">
                                  <div className="flex items-center gap-2 mb-4">
                                    <div className="h-8 w-8 bg-gradient-to-br from-stone-600 to-stone-700 rounded-lg flex items-center justify-center">
                                      <FileText className="h-4 w-4 text-white" strokeWidth={2.5} />
                                    </div>
                                    <h4 className="text-sm text-stone-700 font-medium">Contract B</h4>
                                  </div>
                                  <p className="text-xs text-stone-500 mb-4">{selectedComparisonContract.name}</p>
                                  <div className="space-y-3">
                                    <div>
                                      <p className="text-xs text-stone-500 mb-1">Salary</p>
                                      <p className="text-sm text-stone-900">{selectedComparisonContract.summary?.salary || 'N/A'}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-stone-500 mb-1">Working Hours</p>
                                      <p className="text-sm text-stone-900">{selectedComparisonContract.summary?.workingHours || 'N/A'}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-stone-500 mb-1">Leave Days</p>
                                      <p className="text-sm text-stone-900">{selectedComparisonContract.summary?.leaveDays || 'N/A'}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-stone-500 mb-1">Notice Period</p>
                                      <p className="text-sm text-stone-900">{selectedComparisonContract.summary?.noticePeriod || 'N/A'}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Key Insights */}
                              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
                                <h4 className="text-lg text-stone-900 mb-4 flex items-center gap-2">
                                  <Sparkles className="h-5 w-5 text-teal-600" />
                                  Key Insights
                                </h4>
                                <ul className="space-y-3">
                                  {comparisonData.insights.map((insight, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                      <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                                      <span className="text-sm text-stone-700 leading-relaxed">{insight}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Recommendation */}
                              <div className="bg-gradient-to-br from-teal-50 to-amber-50/50 rounded-2xl border border-teal-200 p-6">
                                <h4 className="text-lg text-stone-900 mb-3 flex items-center gap-2">
                                  <ShieldAlert className="h-5 w-5 text-teal-700" strokeWidth={2.5} />
                                  Our Recommendation
                                </h4>
                                <p className="text-sm text-stone-700 leading-relaxed">{comparisonData.recommendation}</p>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
                              <ArrowLeftRight className="h-12 w-12 text-stone-300 mx-auto mb-4" />
                              <p className="text-stone-500 mb-2">Ready to compare</p>
                              <p className="text-xs text-stone-400 mb-4">Generate detailed comparison between these two contracts</p>
                              <Button onClick={handleUnlockComparison} className="bg-teal-600 hover:bg-teal-700">
                                <Sparkles className="h-4 w-4 mr-2" />
                                Generate Comparison
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
