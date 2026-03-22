import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, CircleDollarSign, Building2, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('entrepreneur');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password, role);
      navigate(role === 'entrepreneur' ? '/dashboard/entrepreneur' : '/dashboard/investor');
    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = (userRole: UserRole) => {
    if (userRole === 'entrepreneur') {
      setEmail('sarah@techwave.io');
      setPassword('password123');
    } else {
      setEmail('michael@vcinnovate.com');
      setPassword('password123');
    }
    setRole(userRole);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-30"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-accent-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30 transform hover:scale-110 transition-transform duration-300 animate-pulse-glow">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <h2 className="mt-2 text-center text-4xl font-extrabold tracking-tight text-gray-900">
          Welcome to <span className="text-gradient">Nexus</span>
        </h2>
        <p className="mt-3 text-center text-sm font-medium text-gray-500 max-w-sm mx-auto">
          Connect with top-tier investors and innovative entrepreneurs globally.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 animate-slide-up">
        <div className="glass py-8 px-4 sm:rounded-2xl sm:px-10 hover:shadow-glass-hover transition-shadow duration-500">
          {error && (
            <div className="mb-6 bg-error-50/80 backdrop-blur-sm border border-error-200 text-error-700 px-4 py-3 rounded-xl flex items-start animate-fade-in shadow-sm">
              <AlertCircle size={18} className="mr-2 mt-0.5 text-error-600 flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select your role
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className={`py-3 px-4 border-2 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 ${role === 'entrepreneur'
                      ? 'border-primary-500 bg-primary-50/50 text-primary-700 shadow-sm shadow-primary-500/20'
                      : 'border-transparent bg-white shadow-sm text-gray-600 hover:bg-gray-50 hover:border-gray-200'
                    }`}
                  onClick={() => setRole('entrepreneur')}
                >
                  <Building2 size={18} className={`mr-2 ${role === 'entrepreneur' ? 'text-primary-600' : 'text-gray-400'}`} />
                  <span className="font-medium">Founder</span>
                </button>

                <button
                  type="button"
                  className={`py-3 px-4 border-2 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 ${role === 'investor'
                      ? 'border-secondary-500 bg-secondary-50/50 text-secondary-700 shadow-sm shadow-secondary-500/20'
                      : 'border-transparent bg-white shadow-sm text-gray-600 hover:bg-gray-50 hover:border-gray-200'
                    }`}
                  onClick={() => setRole('investor')}
                >
                  <CircleDollarSign size={18} className={`mr-2 ${role === 'investor' ? 'text-secondary-600' : 'text-gray-400'}`} />
                  <span className="font-medium">Investor</span>
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                startAdornment={<User size={18} className="text-gray-400" />}
                className="bg-white/70 focus:bg-white transition-colors duration-300"
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                className="bg-white/70 focus:bg-white transition-colors duration-300"
              />
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition duration-200"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                leftIcon={!isLoading && <LogIn size={18} />}
                className="py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-md transform transition-all duration-300 hover:-translate-y-0.5"
              >
                Sign in securely
              </Button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 glass text-gray-500 font-medium rounded-full text-xs uppercase tracking-wider">Demo Access</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => fillDemoCredentials('entrepreneur')}
                leftIcon={<Building2 size={16} />}
                className="bg-white/50 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-all duration-300 rounded-xl py-2.5"
                size="sm"
              >
                Founder Demo
              </Button>

              <Button
                variant="outline"
                onClick={() => fillDemoCredentials('investor')}
                leftIcon={<CircleDollarSign size={16} />}
                className="bg-white/50 hover:bg-secondary-50 hover:border-secondary-200 hover:text-secondary-700 transition-all duration-300 rounded-xl py-2.5"
                size="sm"
              >
                Investor Demo
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center bg-gray-50/50 rounded-xl p-4 border border-gray-100/50">
            <p className="text-sm font-medium text-gray-600">
              New to Nexus?{' '}
              <Link to="/register" className="font-bold text-primary-600 hover:text-primary-500 transition-colors relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary-500 after:bottom-0 after:left-0 after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 inline-block pb-0.5">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};