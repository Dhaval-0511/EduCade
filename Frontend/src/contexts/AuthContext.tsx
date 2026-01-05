import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, AuthState } from '@/types/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated user storage (will be replaced with Supabase)
const USERS_KEY = 'ruraledu_users';
const CURRENT_USER_KEY = 'ruraledu_current_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const getUsers = (): User[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return { success: false, error: 'No account found with this email' };
    }

    // In a real app, we'd verify the password hash
    // For demo, we're storing password in a separate key
    const passwords = JSON.parse(localStorage.getItem('ruraledu_passwords') || '{}');
    if (passwords[email] !== password) {
      return { success: false, error: 'Invalid password' };
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    setAuthState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });

    return { success: true };
  };

  const signup = async (
    email: string, 
    password: string, 
    name: string, 
    role: UserRole
  ): Promise<{ success: boolean; error?: string }> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    const users = getUsers();
    
    if (users.some(u => u.email === email)) {
      return { success: false, error: 'An account with this email already exists' };
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      name,
      role,
      createdAt: new Date(),
    };

    users.push(newUser);
    saveUsers(users);

    // Store password separately (in real app, this would be hashed on server)
    const passwords = JSON.parse(localStorage.getItem('ruraledu_passwords') || '{}');
    passwords[email] = password;
    localStorage.setItem('ruraledu_passwords', JSON.stringify(passwords));

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    setAuthState({
      user: newUser,
      isAuthenticated: true,
      isLoading: false,
    });

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
