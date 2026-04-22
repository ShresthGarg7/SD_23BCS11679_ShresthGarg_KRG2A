import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import taskService from '../services/taskService';
import { useAuth } from './AuthContext';

const StatsContext = createContext();

export const StatsProvider = ({ children }) => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    todoTasks: 0,
    inProgressTasks: 0,
    productivityPercentage: 0,
    overdueTasks: 0,
    weeklyChange: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchStats = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const data = await taskService.getStats();
      setStats(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
      setError('Could not update statistics');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Initial fetch when user logs in
  useEffect(() => {
    if (user) {
      fetchStats();
    }
  }, [user, fetchStats]);

  const value = {
    stats,
    isLoading,
    error,
    refreshStats: fetchStats
  };

  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>;
};

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};
