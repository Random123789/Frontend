import { useState } from 'react';
import { ArrowLeft, ArrowLeftRight, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import type { User, Contract } from '../App';
import { ScaleIcon } from './ScaleIcon';

type ContractComparisonProps = {
  contracts: Contract[];
  user: User | null;
  onBack: () => void;
};

export function ContractComparison({
  contracts,
  user,
  onBack,
}: ContractComparisonProps) {
  const [contract1Id, setContract1Id] = useState<string>('');
  const [contract2Id, setContract2Id] = useState<string>('');

  const contract1 = contracts.find((c) => c.id === contract1Id);
  const contract2 = contracts.find((c) => c.id === contract2Id);

  const showComparison = contract1 && contract2;

  // Generate comparison insights
  const getComparison = () => {
    if (!contract1?.summary || !contract2?.summary) return null;

    const parseHourlyRate = (salary: string) => {
      const match = salary.match(/\$(\d+)/);
      return match ? parseInt(match[1]) : 0;
    };

    const rate1 = parseHourlyRate(contract1.summary.salary);
    const rate2 = parseHourlyRate(contract2.summary.salary);

    return {
      salary: {
        winner: rate1 > rate2 ? 1 : rate2 > rate1 ? 2 : 0,
        difference: Math.abs(rate1 - rate2),
      },
      riskLevel: {
        winner:
          !contract1.riskAssessment || !contract2.riskAssessment
            ? 0
            : contract1.riskAssessment.overallRisk === 'low' &&
              contract2.riskAssessment.overallRisk !== 'low'
            ? 1
            : contract2.riskAssessment.overallRisk === 'low' &&
              contract1.riskAssessment.overallRisk !== 'low'
            ? 2
            : 0,
      },
      recommendation:
        rate1 > rate2
          ? contract1.name
          : rate2 > rate1
          ? contract2.name
          : 'Both are similar',
    };
  };

  const comparison = getComparison();

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md shadow-teal-200">
                <ArrowLeftRight className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
              <h1 className="text-xl text-stone-900 tracking-tight">Compare Contracts</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Contract Selection */}
        <div className="bg-white rounded-lg border p-8 mb-8">
          <h2 className="text-2xl mb-6">Select Contracts to Compare</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm mb-2 block">Contract 1</label>
              <Select value={contract1Id} onValueChange={setContract1Id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select first contract" />
                </SelectTrigger>
                <SelectContent>
                  {contracts.map((contract) => (
                    <SelectItem
                      key={contract.id}
                      value={contract.id}
                      disabled={contract.id === contract2Id}
                    >
                      {contract.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm mb-2 block">Contract 2</label>
              <Select value={contract2Id} onValueChange={setContract2Id}>
                <SelectTrigger>
                  <SelectValue placeholder="Select second contract" />
                </SelectTrigger>
                <SelectContent>
                  {contracts.map((contract) => (
                    <SelectItem
                      key={contract.id}
                      value={contract.id}
                      disabled={contract.id === contract1Id}
                    >
                      {contract.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {showComparison && comparison && (
          <>
            {/* Recommendation */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 p-8 mb-8">
              <h2 className="text-2xl mb-4">Our Recommendation</h2>
              <p className="text-lg mb-2">
                Based on the analysis, <strong>{comparison.recommendation}</strong>{' '}
                appears to be the better option.
              </p>
              {comparison.salary.difference > 0 && (
                <p className="text-slate-600">
                  The salary difference is ${comparison.salary.difference}/hour.
                </p>
              )}
            </div>

            {/* Side-by-side Comparison */}
            <div className="bg-white rounded-lg border overflow-hidden mb-8">
              <div className="grid grid-cols-2 divide-x">
                {/* Contract 1 Header */}
                <div className="p-6 bg-blue-50">
                  <h3 className="text-xl mb-2">{contract1.name}</h3>
                  <p className="text-sm text-slate-600">
                    {contract1.summary?.employer}
                  </p>
                </div>
                {/* Contract 2 Header */}
                <div className="p-6 bg-indigo-50">
                  <h3 className="text-xl mb-2">{contract2.name}</h3>
                  <p className="text-sm text-slate-600">
                    {contract2.summary?.employer}
                  </p>
                </div>
              </div>

              {/* Job Title */}
              <div className="grid grid-cols-2 divide-x border-t">
                <div className="p-6">
                  <div className="text-sm text-slate-500 mb-1">Job Title</div>
                  <div>{contract1.summary?.jobTitle}</div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-slate-500 mb-1">Job Title</div>
                  <div>{contract2.summary?.jobTitle}</div>
                </div>
              </div>

              {/* Salary */}
              <div className="grid grid-cols-2 divide-x border-t bg-slate-50">
                <div className="p-6">
                  <div className="text-sm text-slate-500 mb-1">Salary</div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{contract1.summary?.salary}</span>
                    {comparison.salary.winner === 1 && (
                      <CheckCircle2 className="h-5 w-5 text-teal-600" strokeWidth={2.5} />
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-slate-500 mb-1">Salary</div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{contract2.summary?.salary}</span>
                    {comparison.salary.winner === 2 && (
                      <CheckCircle2 className="h-5 w-5 text-teal-600" strokeWidth={2.5} />
                    )}
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="grid grid-cols-2 divide-x border-t">
                <div className="p-6">
                  <div className="text-sm text-slate-500 mb-1">Working Hours</div>
                  <div>{contract1.summary?.workingHours}</div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-slate-500 mb-1">Working Hours</div>
                  <div>{contract2.summary?.workingHours}</div>
                </div>
              </div>

              {/* Leave Days */}
              <div className="grid grid-cols-2 divide-x border-t bg-slate-50">
                <div className="p-6">
                  <div className="text-sm text-slate-500 mb-1">Leave Days</div>
                  <div>{contract1.summary?.leaveDays}</div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-slate-500 mb-1">Leave Days</div>
                  <div>{contract2.summary?.leaveDays}</div>
                </div>
              </div>

              {/* Notice Period */}
              <div className="grid grid-cols-2 divide-x border-t">
                <div className="p-6">
                  <div className="text-sm text-slate-500 mb-1">Notice Period</div>
                  <div>{contract1.summary?.noticePeriod}</div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-slate-500 mb-1">Notice Period</div>
                  <div>{contract2.summary?.noticePeriod}</div>
                </div>
              </div>

              {/* Risk Level */}
              {contract1.riskAssessment && contract2.riskAssessment && (
                <div className="grid grid-cols-2 divide-x border-t bg-slate-50">
                  <div className="p-6">
                    <div className="text-sm text-slate-500 mb-1">Risk Level</div>
                    <div className="flex items-center gap-2">
                      <span className="capitalize">
                        {contract1.riskAssessment.overallRisk}
                      </span>
                      {comparison.riskLevel.winner === 1 && (
                        <CheckCircle2 className="h-5 w-5 text-teal-600" strokeWidth={2.5} />
                      )}
                      {contract1.riskAssessment.overallRisk === 'high' && (
                        <AlertCircle className="h-5 w-5 text-red-600" strokeWidth={2.5} />
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-slate-500 mb-1">Risk Level</div>
                    <div className="flex items-center gap-2">
                      <span className="capitalize">
                        {contract2.riskAssessment.overallRisk}
                      </span>
                      {comparison.riskLevel.winner === 2 && (
                        <CheckCircle2 className="h-5 w-5 text-teal-600" strokeWidth={2.5} />
                      )}
                      {contract2.riskAssessment.overallRisk === 'high' && (
                        <AlertCircle className="h-5 w-5 text-red-600" strokeWidth={2.5} />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Contract 1 Pros/Cons */}
              <div className="bg-white rounded-lg border p-6">
                <h3 className="text-xl mb-4">{contract1.name}</h3>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" strokeWidth={2.5} />
                    <span>Pros</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {comparison.salary.winner === 1 && (
                      <li className="text-green-700">
                        • Higher hourly rate (${comparison.salary.difference} more)
                      </li>
                    )}
                    {contract1.summary?.keyTerms.slice(0, 2).map((term, i) => (
                      <li key={i} className="text-slate-700">
                        • {term}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="h-5 w-5 text-orange-600" strokeWidth={2.5} />
                    <span>Cons</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {contract1.riskAssessment?.issues.slice(0, 2).map((issue, i) => (
                      <li key={i} className="text-slate-700">
                        • {issue.clause}: {issue.issue.substring(0, 60)}...
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Contract 2 Pros/Cons */}
              <div className="bg-white rounded-lg border p-6">
                <h3 className="text-xl mb-4">{contract2.name}</h3>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" strokeWidth={2.5} />
                    <span>Pros</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {comparison.salary.winner === 2 && (
                      <li className="text-green-700">
                        • Higher hourly rate (${comparison.salary.difference} more)
                      </li>
                    )}
                    {contract2.summary?.keyTerms.slice(0, 2).map((term, i) => (
                      <li key={i} className="text-slate-700">
                        • {term}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="h-5 w-5 text-orange-600" strokeWidth={2.5} />
                    <span>Cons</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {contract2.riskAssessment?.issues.slice(0, 2).map((issue, i) => (
                      <li key={i} className="text-slate-700">
                        • {issue.clause}: {issue.issue.substring(0, 60)}...
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <Alert>
              <Info className="h-4 w-4" strokeWidth={2.5} />
              <AlertDescription>
                This comparison is based on the information provided in the
                contracts and general employment standards. Consider your personal
                circumstances, career goals, and work-life balance when making
                your decision.
              </AlertDescription>
            </Alert>
          </>
        )}

        {!showComparison && contracts.length >= 2 && (
          <div className="bg-slate-50 border border-dashed rounded-lg p-12 text-center">
            <div className="h-16 w-16 bg-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ArrowLeftRight className="h-8 w-8 text-slate-400" strokeWidth={2.5} />
            </div>
            <h3 className="text-xl mb-2">Select Two Contracts</h3>
            <p className="text-slate-600">
              Choose two contracts from the dropdowns above to see a detailed
              comparison
            </p>
          </div>
        )}

        {contracts.length < 2 && (
          <div className="bg-slate-50 border border-dashed rounded-lg p-12 text-center">
            <div className="h-16 w-16 bg-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ArrowLeftRight className="h-8 w-8 text-slate-400" strokeWidth={2.5} />
            </div>
            <h3 className="text-xl mb-2">Not Enough Contracts</h3>
            <p className="text-slate-600">
              Upload at least two contracts to use the comparison feature
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
