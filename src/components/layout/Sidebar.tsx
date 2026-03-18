import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, Building2, CircleDollarSign, Users, MessageCircle, 
  Bell, FileText, Settings, HelpCircle
} from 'lucide-react';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `flex items-center py-3 px-4 rounded-xl transition-all duration-300 group relative ${
          isActive 
            ? 'bg-gradient-to-r from-primary-50 to-transparent text-primary-700 font-semibold shadow-sm' 
            : 'text-gray-600 hover:bg-white/60 hover:text-gray-900 border border-transparent'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-r-full shadow-lg"></div>
          )}
          <span className={`mr-3.5 transition-colors duration-300 ${isActive ? 'text-primary-600 drop-shadow-sm' : 'text-gray-400 group-hover:text-primary-500'}`}>
            {icon}
          </span>
          <span className="text-sm tracking-wide">{text}</span>
        </>
      )}
    </NavLink>
  );
};

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  const entrepreneurItems = [
    { to: '/dashboard/entrepreneur', icon: <Home size={20} />, text: 'Dashboard' },
    { to: '/profile/entrepreneur/' + user.id, icon: <Building2 size={20} />, text: 'My Startup' },
    { to: '/investors', icon: <CircleDollarSign size={20} />, text: 'Find Investors' },
    { to: '/messages', icon: <MessageCircle size={20} />, text: 'Messages' },
    { to: '/notifications', icon: <Bell size={20} />, text: 'Notifications' },
    { to: '/documents', icon: <FileText size={20} />, text: 'Documents' },
  ];
  
  const investorItems = [
    { to: '/dashboard/investor', icon: <Home size={20} />, text: 'Dashboard' },
    { to: '/profile/investor/' + user.id, icon: <CircleDollarSign size={20} />, text: 'My Portfolio' },
    { to: '/entrepreneurs', icon: <Users size={20} />, text: 'Find Startups' },
    { to: '/messages', icon: <MessageCircle size={20} />, text: 'Messages' },
    { to: '/notifications', icon: <Bell size={20} />, text: 'Notifications' },
    { to: '/deals', icon: <FileText size={20} />, text: 'Deals' },
  ];
  
  const sidebarItems = user.role === 'entrepreneur' ? entrepreneurItems : investorItems;
  
  const commonItems = [
    { to: '/settings', icon: <Settings size={20} />, text: 'Settings' },
    { to: '/help', icon: <HelpCircle size={20} />, text: 'Help & Support' },
  ];
  
  return (
    <div className="w-64 glass shadow-sm h-full border-r border-white/50 hidden md:block backdrop-blur-md relative z-20">
      <div className="h-full flex flex-col pt-6 bg-white/40">
        <div className="flex-1 overflow-y-auto px-4 sidebar-scroll">
          <div className="space-y-1">
            {sidebarItems.map((item, index) => (
              <SidebarItem
                key={index}
                to={item.to}
                icon={item.icon}
                text={item.text}
              />
            ))}
          </div>
          
          <div className="mt-10 mb-6">
            <h3 className="px-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
              Settings & Help
            </h3>
            <div className="space-y-1">
              {commonItems.map((item, index) => (
                <SidebarItem
                  key={index}
                  to={item.to}
                  icon={item.icon}
                  text={item.text}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-5 border-t border-white/40 bg-white/20">
          <div className="bg-gradient-to-br from-white/80 to-white/40 border border-white/60 rounded-xl p-4 shadow-sm backdrop-blur-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <p className="text-xs font-semibold text-gray-500 tracking-wide uppercase">Need help?</p>
            <h4 className="text-sm font-bold text-gray-800 mt-1.5">Premium Support</h4>
            <a 
              href="mailto:support@businessnexus.com" 
              className="mt-2.5 inline-flex items-center text-xs font-bold text-primary-600 hover:text-primary-500 bg-primary-50 px-2.5 py-1.5 rounded-lg transition-colors border border-primary-100 w-full justify-center"
            >
              Contact Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};