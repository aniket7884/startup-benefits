'use client';

import { createContext, useContext, useState } from 'react';

type AuthContextType = {
  token: string | null;
  login: (t: string) => void;
  logout: () => void;
};

const AuthContextData = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : null
  );

  const login = (t: string) => {
    localStorage.setItem('token', t);
    setToken(t);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <AuthContextData.Provider value={{ token, login, logout}}>
      {children}
    </AuthContextData.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContextData);
  if (!ctx) throw new Error('useAuth outside provider');
  return ctx;
};
