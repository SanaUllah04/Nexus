import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, UserRole, AuthContextType } from '../types';
import toast from 'react-hot-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_STORAGE_KEY = 'business_nexus_token';
const USER_STORAGE_KEY = 'business_nexus_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getAuthHeaders = () => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Fetch current user profile with token
  const fetchProfile = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          logout();
          throw new Error('Session expired. Please login again.');
        }
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      console.log('Profile fetched:', data.user);
    } catch (error) {
      console.error('Fetch profile error:', error);
    }
  };

  // ROLE-BASED API CALLS

  // Entrepreneur only
  const fetchEntrepreneurDashboard = async (): Promise<any> => {
    try {
      const response = await fetch('http://localhost:5000/api/entrepreneur/dashboard', {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Access denied. Investors cannot access entrepreneur dashboard.');
        }
        if (response.status === 401) {
          logout();
          throw new Error('Session expired. Please login again.');
        }
        throw new Error('Failed to fetch dashboard');
      }

      const data = await response.json();
      console.log('Entrepreneur dashboard:', data);
      return data;
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    }
  };

  // Investor only
  const fetchInvestorDashboard = async (): Promise<any> => {
    try {
      const response = await fetch('http://localhost:5000/api/investor/dashboard', {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Access denied. Entrepreneurs cannot access investor dashboard.');
        }
        if (response.status === 401) {
          logout();
          throw new Error('Session expired. Please login again.');
        }
        throw new Error('Failed to fetch dashboard');
      }

      const data = await response.json();
      console.log('Investor dashboard:', data);
      return data;
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    }
  };

  // Both roles
  const fetchStartups = async (): Promise<any> => {
    try {
      const response = await fetch('http://localhost:5000/api/startups', {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          logout();
          throw new Error('Session expired or access denied.');
        }
        throw new Error('Failed to fetch startups');
      }

      const data = await response.json();
      console.log('Startups:', data);
      return data;
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    }
  };

  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }

      const data = await response.json();

      localStorage.setItem(TOKEN_STORAGE_KEY, data.token);

      const loggedInUser: User = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user.name)}&background=random`,
        bio: '',
        isOnline: true,
        createdAt: new Date().toISOString()
      };

      setUser(loggedInUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loggedInUser));
      toast.success('Successfully logged in!');
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole): Promise<void> => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });

      if (!response.ok) throw new Error('Registration failed');

      const data = await response.json();
      console.log('Server response:', data);
      toast.success('Account created successfully!');
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<void> => {
    try {
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Request failed');
      }

      toast.success('Password reset instructions sent to your email');
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<void> => {
    try {
      const response = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Reset failed');
      }

      toast.success('Password reset successfully');
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    toast.success('Logged out successfully');
  };

  const updateProfile = async (userId: string, updates: Partial<User>): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          logout();
          throw new Error('Session expired. Please login again.');
        }
        const error = await response.json();
        throw new Error(error.error || 'Update failed');
      }

      const data = await response.json();

      if (user?.id === userId) {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      }

      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    }
  };

  const deleteAccount = async (userId: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          logout();
          throw new Error('Session expired. Please login again.');
        }
        const error = await response.json();
        throw new Error(error.error || 'Delete failed');
      }

      logout();
      toast.success('Account deleted successfully');
    } catch (error) {
      toast.error((error as Error).message);
      throw error;
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateProfile,
    deleteAccount,
    fetchProfile,
    fetchEntrepreneurDashboard,
    fetchInvestorDashboard,
    fetchStartups,
    isAuthenticated: !!user,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};