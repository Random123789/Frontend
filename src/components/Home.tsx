import { ShieldCheck, ArrowLeftRight, Sparkles, CheckCircle2, Clock3, Play, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { ScaleIcon } from './ScaleIcon';

type HomeProps = {
  onGetStarted: () => void;
  onLogin: () => void;
};

export function Home({ onGetStarted, onLogin }: HomeProps) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="h-10 w-10 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center shadow-md shadow-teal-200">
                <ScaleIcon size={22} className="text-amber-100" />
              </div>
            </div>
            <span className="text-xl tracking-tight text-stone-800">LegaLens</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onLogin}>
              Log In
            </Button>
            <Button onClick={onGetStarted}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-stone-50 via-teal-50/30 to-white py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-teal-50 text-teal-800 px-5 py-2.5 rounded-full mb-8 border border-teal-200/50 shadow-sm">
              <Sparkles className="h-4 w-4" strokeWidth={2.5} />
              <span className="text-sm">AI-Powered Contract Analysis</span>
            </div>
            <h1 className="text-5xl mb-6 text-stone-900 tracking-tight">
              Understand Your Employment Contract in Minutes
            </h1>
            <p className="text-xl text-stone-600 mb-10 leading-relaxed">
              Don't sign contracts blindly. LegaLens analyzes your employment
              contracts and highlights risks, unfair terms, and missing clauses —
              all in plain, friendly language.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" onClick={onGetStarted}>
                Start Free Analysis
              </Button>
              <Button size="lg" variant="outline">
                <Play className="h-4 w-4 mr-2 fill-current" strokeWidth={2.5} />
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              3 free analyses included. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-2">68.8%</div>
              <p className="text-slate-600">
                Worry about signing without reading carefully
              </p>
            </div>
            <div>
              <div className="text-4xl mb-2">66.7%</div>
              <p className="text-slate-600">
                Don't know which clauses to pay attention to
              </p>
            </div>
            <div>
              <div className="text-4xl mb-2">4 Clicks</div>
              <p className="text-slate-600">
                To receive comprehensive contract analysis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4">How LegaLens Works</h2>
            <p className="text-xl text-slate-600">
              Three powerful features to protect your rights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="h-14 w-14 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-200/50">
                <FileText className="h-7 w-7 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl mb-4 text-stone-900">Contract Summary</h3>
              <p className="text-stone-600 mb-6 leading-relaxed">
                Upload your contract and get a clear, easy-to-understand summary
                of all key terms in plain English.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-sm text-stone-700">Salary and compensation breakdown</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-sm text-stone-700">Working hours and leave entitlements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-sm text-stone-700">Notice periods and termination terms</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="h-14 w-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-200/50">
                <ShieldCheck className="h-7 w-7 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl mb-4 text-stone-900">Risk Assessment</h3>
              <p className="text-stone-600 mb-6 leading-relaxed">
                Identify potentially unfair clauses and get suggestions for
                negotiation based on Singapore's MOM guidelines.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-sm text-stone-700">Problematic non-compete clauses</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-sm text-stone-700">Missing employment protections</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-sm text-stone-700">Negotiation recommendations</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="h-14 w-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal-200/50">
                <ArrowLeftRight className="h-7 w-7 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl mb-4 text-stone-900">Contract Comparison</h3>
              <p className="text-stone-600 mb-6 leading-relaxed">
                Comparing multiple job offers? See a side-by-side breakdown to
                make the best decision for your career.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-sm text-stone-700">Side-by-side comparison view</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-sm text-stone-700">Pros and cons analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-sm text-stone-700">Decision support recommendations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4 text-stone-900 tracking-tight">Simple, Pay-As-You-Go Pricing</h2>
            <p className="text-xl text-stone-600 leading-relaxed">
              Free contract summaries. Pay only for what you need.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Free Feature */}
            <div className="bg-white border border-stone-200 rounded-2xl p-8 mb-6 shadow-sm">
              <div className="flex items-start gap-6">
                <div className="h-14 w-14 bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-teal-200">
                  <Sparkles className="h-7 w-7 text-amber-100" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl text-stone-900">Free Contract Summary</h3>
                    <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium border border-teal-200">
                      Always Free
                    </span>
                  </div>
                  <p className="text-stone-600 mb-4 leading-relaxed">
                    Upload any contract and instantly get a clear AI-powered summary with key terms, salary, working hours, and more.
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-sm text-stone-700">Unlimited contract uploads</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-sm text-stone-700">AI-powered summaries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-sm text-stone-700">Key terms extraction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="text-sm text-stone-700">Plain English explanations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Paid Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-teal-600 to-teal-700 p-8 rounded-2xl text-white shadow-xl">
                <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <ShieldCheck className="h-6 w-6 text-amber-100" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl mb-2">Contract Review</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl">$0.99</span>
                  <span className="text-teal-100">per review</span>
                </div>
                <p className="text-teal-100 mb-4 text-sm leading-relaxed">
                  Get expert risk assessment, MOM compliance check, and negotiation strategies.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-amber-200 shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>Deep risk analysis</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-amber-200 shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>Unfair clause detection</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-amber-200 shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>Negotiation tips</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-8 rounded-2xl text-white shadow-xl">
                <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                  <ArrowLeftRight className="h-6 w-6 text-amber-100" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl mb-2">Contract Comparison</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl">$0.99</span>
                  <span className="text-amber-100">per comparison</span>
                </div>
                <p className="text-amber-100 mb-4 text-sm leading-relaxed">
                  Compare two contracts side-by-side to make the best career decision.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-amber-200 shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>Side-by-side analysis</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-amber-200 shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>Pros and cons breakdown</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-amber-200 shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>Decision recommendations</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 shadow-lg" onClick={onGetStarted}>
                Get Started Free
              </Button>
              <p className="text-xs text-stone-500 mt-3">No credit card required • Pay only when you need more</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-teal-600 to-teal-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl mb-6 tracking-tight">Ready to Protect Your Rights?</h2>
          <p className="text-xl text-teal-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of part-time workers in Singapore who are making
            informed decisions about their employment contracts.
          </p>
          <Button
            size="lg"
            className="bg-white text-teal-700 hover:bg-amber-50 shadow-lg"
            onClick={onGetStarted}
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-teal-600 rounded-lg flex items-center justify-center">
                  <ScaleIcon size={18} className="text-amber-100" />
                </div>
                <span className="text-stone-100">LegaLens</span>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed">
                AI-powered contract analysis for Singapore's gig economy workers.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-stone-100">Product</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-stone-100">Company</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-stone-100">Legal</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Disclaimer</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-8 text-center text-sm text-stone-400">
            <p>
              © 2025 LegaLens. This tool provides general information only and
              is not a substitute for professional legal advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
