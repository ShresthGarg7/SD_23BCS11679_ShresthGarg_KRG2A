import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true' || false;
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    setUser({ name: data.name, email: data.email });
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    setUser({ name: data.name, email: data.email });
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, darkMode, toggleDarkMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
