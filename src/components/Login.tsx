import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { ScaleIcon } from './ScaleIcon';

type LoginProps = {
  onLogin: (email: string, password: string) => void;
  onNavigateToSignup: () => void;
  onBack: () => void;
};

export function Login({ onLogin, onNavigateToSignup, onBack }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-teal-50/30 to-amber-50/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" strokeWidth={2.5} />
          Back to Home
        </Button>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-stone-200 p-8 md:p-10">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-12 w-12 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center shadow-md shadow-teal-200">
              <ScaleIcon size={26} className="text-amber-100" />
            </div>
            <span className="text-2xl text-stone-800 tracking-tight">LegaLens</span>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl mb-2 text-stone-900 tracking-tight">Welcome Back</h1>
            <p className="text-stone-600 leading-relaxed">
              Log in to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11"
              />
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => alert('Password reset coming soon!')}
                >
                  Forgot password?
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-11">
              Log In
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <Separator />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-slate-500">
              or continue with
            </span>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full h-11"
              onClick={() => alert('Social login coming soon!')}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full h-11"
              onClick={() => alert('Social login coming soon!')}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              Continue with Facebook
            </Button>
          </div>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={onNavigateToSignup}
              className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
            >
              Don't have an account?{' '}
              <span className="text-blue-600">Sign up</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
