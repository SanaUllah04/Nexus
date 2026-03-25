import React, { useState } from 'react';
import { User, Lock, Bell, Globe, Palette, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { useAuth } from '../../context/AuthContext';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Profile');
  
  if (!user) return null;
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and settings</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings navigation */}
        <Card className="lg:col-span-1">
          <CardBody className="p-2">
            <nav className="space-y-1">
              <button 
                onClick={() => setActiveTab('Profile')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'Profile' ? 'text-primary-700 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <User size={18} className="mr-3" />
                Profile
              </button>
              
              <button 
                onClick={() => setActiveTab('Security')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'Security' ? 'text-primary-700 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <Lock size={18} className="mr-3" />
                Security
              </button>
              
              <button 
                onClick={() => setActiveTab('Notifications')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'Notifications' ? 'text-primary-700 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <Bell size={18} className="mr-3" />
                Notifications
              </button>
              
              <button 
                onClick={() => setActiveTab('Language')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'Language' ? 'text-primary-700 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <Globe size={18} className="mr-3" />
                Language
              </button>
              
              <button 
                onClick={() => setActiveTab('Appearance')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'Appearance' ? 'text-primary-700 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <Palette size={18} className="mr-3" />
                Appearance
              </button>
              
              <button 
                onClick={() => setActiveTab('Billing')}
                className={`flex items-center w-full px-3 py-2 text-sm font-medium rounded-md ${activeTab === 'Billing' ? 'text-primary-700 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <CreditCard size={18} className="mr-3" />
                Billing
              </button>
            </nav>
          </CardBody>
        </Card>
        
        {/* Main settings content */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'Profile' && (
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Profile Settings</h2>
            </CardHeader>
            <CardBody className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar
                  src={user.avatarUrl}
                  alt={user.name}
                  size="xl"
                />
                
                <div>
                  <Button variant="outline" size="sm" onClick={() => toast.success('Open file picker...')}>
                    Change Photo
                  </Button>
                  <p className="mt-2 text-sm text-gray-500">
                    JPG, GIF or PNG. Max size of 800K
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  defaultValue={user.name}
                />
                
                <Input
                  label="Email"
                  type="email"
                  defaultValue={user.email}
                />
                
                <Input
                  label="Role"
                  value={user.role}
                  disabled
                />
                
                <Input
                  label="Location"
                  defaultValue="San Francisco, CA"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  rows={4}
                  defaultValue={user.bio}
                ></textarea>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => toast.success('Changes reverted')}>Cancel</Button>
                <Button onClick={() => toast.success('Profile settings saved')}>Save Changes</Button>
              </div>
            </CardBody>
          </Card>
          )}

          {activeTab === 'Security' && (
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Security Settings</h2>
            </CardHeader>
            <CardBody className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Add an extra layer of security to your account
                    </p>
                    <Badge variant="error" className="mt-1">Not Enabled</Badge>
                  </div>
                  <Button variant="outline" onClick={() => toast.success('Opening 2FA setup...')}>Enable</Button>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Change Password</h3>
                <div className="space-y-4">
                  <Input
                    label="Current Password"
                    type="password"
                  />
                  
                  <Input
                    label="New Password"
                    type="password"
                  />
                  
                  <Input
                    label="Confirm New Password"
                    type="password"
                  />
                  
                  <div className="flex justify-end">
                    <Button onClick={() => toast.success('Password updated successfully')}>Update Password</Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          )}

          {activeTab !== 'Profile' && activeTab !== 'Security' && (
            <Card>
              <CardBody className="py-12 text-center text-gray-500">
                {activeTab} settings are coming soon.
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};