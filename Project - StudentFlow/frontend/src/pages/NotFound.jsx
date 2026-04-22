import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden font-['Plus_Jakarta_Sans']">
      {/* Abstract circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative z-10"
      >
        <h1 className="text-[12rem] font-black text-gray-900/5 dark:text-white/5 leading-none select-none">
          404
        </h1>
        <div className="-mt-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-md mx-auto font-medium">
            The study flow seems to have led to a dead end. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/"
              className="btn-primary px-8 py-4 rounded-2xl w-full sm:w-auto flex items-center gap-2"
            >
              <Home size={20} /> Back to Dashboard
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
