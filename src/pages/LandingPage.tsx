import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Globe2, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-30"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-3 group">
              <div className="w-9 h-9 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-xl flex items-center justify-center shadow-md shadow-primary-500/20 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 tracking-tight">Nexus</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" className="bg-white/50 backdrop-blur-sm border-gray-200 hover:bg-white transition-all shadow-sm">Log in</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 shadow-md">Sign up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative z-10 py-20 pb-20">
        <div className="text-center max-w-4xl mx-auto animate-fade-in relative">
          
          <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-primary-200/50 text-sm font-medium text-primary-700 mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary-500 mr-2 animate-pulse-glow"></span>
            The premier platform for startup funding
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
            Where Great Ideas Meet <br className="hidden md:block" />
            <span className="text-gradient">Strategic Capital</span>
          </h1>
          
          <p className="mt-4 text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Connect directly with verified investors and visionary founders in a secure, transparent environment built for growth.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
             <Link to="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-lg shadow-primary-500/30 transform transition-all duration-300 hover:-translate-y-1 text-lg px-8 py-4 h-auto rounded-xl" rightIcon={<ArrowRight size={20} />}>
                Get Started
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto glass hover:bg-white/80 active:bg-white/90 text-lg px-8 py-4 h-auto rounded-xl border-2 border-gray-200 shadow-sm transition-all duration-300">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full animate-slide-up animation-delay-500">
          
          <div className="glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
             <div className="w-14 h-14 bg-primary-100/50 rounded-2xl flex items-center justify-center text-primary-600 mb-6 shadow-sm">
                <Globe2 size={28} />
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-3">Global Network</h3>
             <p className="text-gray-500 leading-relaxed">Access a curated network of founders and investors spanning across the globe with shared visions.</p>
          </div>
          
          <div className="glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 relative">
             <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-3xl pointer-events-none"></div>
             <div className="w-14 h-14 bg-secondary-100/50 rounded-2xl flex items-center justify-center text-secondary-600 mb-6 shadow-sm relative z-10">
                <ShieldCheck size={28} />
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Verified Profiles</h3>
             <p className="text-gray-500 leading-relaxed relative z-10">Trust is our foundation. Every member undergoes strict verification before joining the ecosystem.</p>
          </div>
          
          <div className="glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
             <div className="w-14 h-14 bg-accent-100/50 rounded-2xl flex items-center justify-center text-accent-600 mb-6 shadow-sm">
                <TrendingUp size={28} />
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-3">Data-Driven Deals</h3>
             <p className="text-gray-500 leading-relaxed">Make smarter decisions with our advanced analytics and real-time deal flow insights tracking.</p>
          </div>

        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200/50 bg-white/50 backdrop-blur-sm py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-gray-500">
           <p>© {new Date().getFullYear()} Business Nexus. All rights reserved.</p>
           <div className="flex space-x-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a>
           </div>
        </div>
      </footer>
    </div>
  );
};
