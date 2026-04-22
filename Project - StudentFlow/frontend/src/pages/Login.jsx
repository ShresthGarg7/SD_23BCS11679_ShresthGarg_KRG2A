import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-slate-950 relative overflow-hidden font-['Plus_Jakarta_Sans']">
      {/* Background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-300 dark:bg-primary-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass w-full max-w-md p-8 rounded-[2rem] relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-xl shadow-primary-500/30">
            S
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your study flow efficiently</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                required
                className="input-field pl-12"
                placeholder="you@university.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1 font-['Plus_Jakarta_Sans']">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                required
                className="input-field pl-12"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-4 rounded-2xl text-lg mt-4 shadow-lg shadow-primary-500/30"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                Sign In <ArrowRight className="ml-2" size={20} />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600 dark:text-primary-400 font-bold hover:underline">
            Create Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
