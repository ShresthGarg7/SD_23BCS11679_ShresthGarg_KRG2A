import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { User, Shield, Bell, Moon, Sun, Monitor, Palette, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
  const { user, darkMode, toggleDarkMode, logout } = useAuth();

  const settingsSections = [
    {
      title: 'Profile Settings',
      icon: <User className="text-primary-500" />,
      items: [
        { label: 'Display Name', value: user?.name },
        { label: 'Email Address', value: user?.email },
        { label: 'Student ID', value: 'Not connected' },
      ]
    },
    {
      title: 'Appearance',
      icon: <Palette className="text-indigo-500" />,
      items: [
        { 
          label: 'Theme Mode', 
          value: darkMode ? 'Dark Mode' : 'Light Mode',
          action: (
            <button 
              onClick={toggleDarkMode}
              className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-sm font-bold transition-all"
            >
              Toggle
            </button>
          )
        },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 font-['Plus_Jakarta_Sans']">
      <Navbar />
      <Sidebar />
      
      <main className="md:ml-64 p-6 md:p-10 pt-6">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">Manage your account and preferences</p>
          </header>

          <div className="space-y-8">
            {settingsSections.map((section, idx) => (
              <motion.div 
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card rounded-[2rem] overflow-hidden"
              >
                <div className="px-8 py-6 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 flex items-center gap-3">
                  {section.icon}
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">{section.title}</h2>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-slate-800">
                  {section.items.map((item) => (
                    <div key={item.label} className="px-8 py-6 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                        <p className="text-gray-700 dark:text-gray-300 font-semibold">{item.value}</p>
                      </div>
                      {item.action}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-red-50 dark:bg-red-900/10 rounded-[2rem] p-8 border border-red-100 dark:border-red-900/20 flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-1">Danger Zone</h3>
                <p className="text-red-500/70 text-sm font-medium">Sign out of your account on this device</p>
              </div>
              <button 
                onClick={logout}
                className="px-6 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-600/20"
              >
                <LogOut size={20} /> Logout
              </button>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
