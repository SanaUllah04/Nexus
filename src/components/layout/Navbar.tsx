import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X, Bell, MessageCircle, User, LogOut, Building2, CircleDollarSign } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const dashboardRoute = user?.role === 'entrepreneur' 
    ? '/dashboard/entrepreneur' 
    : '/dashboard/investor';
  
  const profileRoute = user 
    ? `/profile/${user.role}/${user.id}` 
    : '/login';
  
  const navLinks = [
    {
      icon: user?.role === 'entrepreneur' ? <Building2 size={18} /> : <CircleDollarSign size={18} />,
      text: 'Dashboard',
      path: dashboardRoute,
    },
    {
      icon: <MessageCircle size={18} />,
      text: 'Messages',
      path: user ? '/messages' : '/login',
    },
    {
      icon: <Bell size={18} />,
      text: 'Notifications',
      path: user ? '/notifications' : '/login',
    },
    {
      icon: <User size={18} />,
      text: 'Profile',
      path: profileRoute,
    }
  ];
  
  return (
    <nav className="glass sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-xl flex items-center justify-center shadow-md shadow-primary-500/20 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                  <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 tracking-tight">Nexus</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:ml-6">
            {user ? (
              <div className="flex items-center space-x-2">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-white/60 rounded-xl transition-all duration-300 hover:shadow-sm"
                  >
                    <span className="mr-2 opacity-80">{link.icon}</span>
                    {link.text}
                  </Link>
                ))}
                
                <div className="w-px h-6 bg-gray-200 mx-2 hidden lg:block"></div>
                
                <Button 
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-error-600 hover:bg-error-50 px-3 transition-colors"
                >
                  <LogOut size={18} />
                </Button>
                
                <Link to={profileRoute} className="flex items-center space-x-3 ml-2 pl-2 border-l border-white/40 hover:opacity-80 transition-opacity">
                  <Avatar
                    src={user.avatarUrl}
                    alt={user.name}
                    size="sm"
                    status={user.isOnline ? 'online' : 'offline'}
                    className="ring-2 ring-white shadow-sm"
                  />
                  <div className="hidden lg:block">
                    <p className="text-sm font-bold text-gray-800 leading-none mb-0.5">{user.name}</p>
                    <p className="text-xs text-gray-500 font-medium capitalize leading-none">{user.role}</p>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline" className="bg-white/50 backdrop-blur-sm border-gray-200 hover:bg-white transition-all shadow-sm">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 shadow-md">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-600 hover:text-primary-600 hover:bg-white/60 focus:outline-none transition-all shadow-sm bg-white/30"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden glass border-t border-white/20 animate-slide-up shadow-xl rounded-b-2xl overflow-hidden mt-1 mx-2">
          <div className="px-3 pt-3 pb-4 space-y-1">
            {user ? (
              <>
                <div className="flex items-center space-x-4 px-3 py-4 bg-white/40 rounded-xl mb-3">
                  <Avatar
                    src={user.avatarUrl}
                    alt={user.name}
                    size="md"
                    status={user.isOnline ? 'online' : 'offline'}
                    className="ring-2 ring-white shadow-sm"
                  />
                  <div>
                    <p className="text-base font-bold text-gray-900">{user.name}</p>
                    <p className="text-sm text-primary-600 font-medium capitalize">{user.role}</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-white/60 rounded-xl transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center mr-3 text-gray-500">
                        {link.icon}
                      </div>
                      {link.text}
                    </Link>
                  ))}
                  
                  <div className="h-px bg-gray-200/50 my-2 mx-4"></div>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center px-4 py-3 text-base font-medium text-error-600 hover:bg-error-50 rounded-xl transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center mr-3 text-error-500">
                      <LogOut size={18} />
                    </div>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-3 px-2 py-4">
                <Link 
                  to="/login" 
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="outline" fullWidth className="bg-white hover:bg-gray-50 py-3 rounded-xl shadow-sm">Log in</Button>
                </Link>
                <Link 
                  to="/register" 
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button fullWidth className="bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 py-3 rounded-xl shadow-md">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};