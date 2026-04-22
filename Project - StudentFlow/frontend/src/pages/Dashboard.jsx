import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useStats } from '../context/StatsContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { 
  Trophy, 
  Target, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { stats, isLoading } = useStats();
  const { user } = useAuth();

  const statCards = [
    { label: 'Total Tasks', value: stats.totalTasks, icon: <Activity className="text-blue-500" />, color: 'blue' },
    { label: 'Completed', value: stats.completedTasks, icon: <CheckCircle2 className="text-green-500" />, color: 'green' },
    { label: 'In Progress', value: stats.inProgressTasks, icon: <Clock className="text-orange-500" />, color: 'orange' },
    { label: 'Overdue', value: stats.overdueTasks, icon: <AlertCircle className="text-red-500" />, color: 'red' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 font-['Plus_Jakarta_Sans']">
      <Navbar />
      <Sidebar />
      
      <main className="md:ml-64 p-6 md:p-10 pt-6">
        <div className="max-w-6xl mx-auto">
          <header className="mb-10">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold text-gray-900 dark:text-white"
            >
              Hey, {user?.name.split(' ')[0]}! 👋
            </motion.h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
              Here's how your study flow is looking today.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {statCards.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 rounded-3xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20`}>
                    {stat.icon}
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 glass-card p-8 rounded-3xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Productivity Score</h2>
                    <p className="text-sm text-gray-500">Your task completion efficiency</p>
                  </div>
                  <div className="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2">
                    <TrendingUp size={18} />
                    {stats.weeklyChange >= 0 ? '+' : ''}{stats.weeklyChange}% this week
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center py-10">
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* SVG Progress Circle */}
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="12"
                        className="text-gray-100 dark:text-slate-800"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="12"
                        strokeDasharray={502.4}
                        strokeDashoffset={502.4 - (502.4 * (stats?.productivityPercentage || 0)) / 100}
                        strokeLinecap="round"
                        className="text-primary-600 transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {Math.round(stats?.productivityPercentage || 0)}%
                      </span>
                      <span className="text-xs font-bold text-gray-400 uppercase">Focus</span>
                    </div>
                  </div>
                  <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 max-w-xs font-medium">
                    You've completed <span className="text-primary-600 font-bold">{stats?.completedTasks || 0}</span> tasks 
                    out of <span className="font-bold">{stats?.totalTasks || 0}</span>. Keep the momentum going!
                  </p>
                </div>
              </div>
              
              {/* Background pattern */}
              <div className="absolute right-0 bottom-0 opacity-5">
                <Target size={200} />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-8 rounded-3xl flex flex-col items-center justify-between text-center bg-gradient-to-br from-indigo-600 to-primary-700 text-white border-none shadow-primary-500/20"
            >
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center mb-6">
                <Trophy size={40} className="text-yellow-300" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Daily Goal</h3>
                <p className="text-indigo-100 text-sm mb-6 font-medium">
                  Complete 5 tasks today to unlock your productivity badge!
                </p>
              </div>
              
              <div className="w-full bg-white/10 rounded-full h-3 mb-2 overflow-hidden">
                <div 
                  className="bg-yellow-400 h-full transition-all duration-1000" 
                  style={{ width: `${Math.min((stats?.completedTasks || 0) * 20, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest">
                {Math.min(stats?.completedTasks || 0, 5)} / 5 COMPLETED
              </p>

              <button className="w-full mt-8 bg-white text-indigo-600 font-bold py-3 rounded-2xl hover:bg-indigo-50 transition-colors shadow-lg">
                View Path
              </button>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
