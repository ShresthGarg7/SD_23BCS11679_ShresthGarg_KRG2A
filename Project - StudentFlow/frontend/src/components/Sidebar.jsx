import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Kanban, Settings, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useStats } from '../context/StatsContext';

const Sidebar = () => {
  const { stats, isLoading } = useStats();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={22} /> },
    { name: 'Board', path: '/board', icon: <Kanban size={22} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={22} /> },
  ];

  return (
    <aside className="fixed left-0 top-20 w-64 h-[calc(100vh-80px)] bg-white dark:bg-slate-950 border-r border-gray-200 dark:border-slate-800 p-4 z-40 hidden md:block">
      <div className="flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-semibold border border-primary-100 dark:border-primary-800/50'
                  : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-900'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="mt-10 pt-6 border-t border-gray-100 dark:border-slate-800">
        <p className="px-4 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
          Quick Stats
        </p>
        <div className="space-y-4">
          <div className="px-4 flex items-center justify-between group cursor-default">
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="p-1.5 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                <CheckCircle2 size={16} />
              </div>
              Done
            </div>
            <span className={`text-xs font-bold ${isLoading ? 'animate-pulse text-gray-300' : 'text-gray-400 dark:text-gray-500 group-hover:text-green-500'}`}>
              {stats.completedTasks}
            </span>
          </div>
          <div className="px-4 flex items-center justify-between group cursor-default">
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                <Clock size={16} />
              </div>
              In Progress
            </div>
            <span className={`text-xs font-bold ${isLoading ? 'animate-pulse text-gray-300' : 'text-gray-400 dark:text-gray-500 group-hover:text-orange-500'}`}>
              {stats.inProgressTasks}
            </span>
          </div>
          <div className="px-4 flex items-center justify-between group cursor-default">
            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="p-1.5 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                <AlertCircle size={16} />
              </div>
              Overdue
            </div>
            <span className={`text-xs font-bold ${isLoading ? 'animate-pulse text-gray-300' : 'text-gray-400 dark:text-gray-500 group-hover:text-red-500'}`}>
              {stats.overdueTasks}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
