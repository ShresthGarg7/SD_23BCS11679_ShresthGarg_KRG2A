import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Moon, Sun, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const { user, logout, darkMode, toggleDarkMode } = useAuth();

  return (
    <nav className="h-20 glass sticky top-0 z-50 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
          S
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
          StudyFlow
        </span>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-200"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="h-10 w-[1px] bg-gray-200 dark:bg-slate-700 mx-2"></div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold dark:text-gray-200">{user?.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50">
            <User size={20} />
          </div>
          <button
            onClick={logout}
            className="p-2.5 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
