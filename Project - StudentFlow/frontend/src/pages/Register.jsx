import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-slate-950 relative overflow-hidden font-['Plus_Jakarta_Sans']">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-300 dark:bg-primary-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass w-full max-w-md p-8 rounded-[2rem] relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 shadow-xl shadow-primary-500/30 font-['Plus_Jakarta_Sans']">
            S
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h1>
          <p className="text-gray-500 dark:text-gray-400">Join thousands of students on StudyFlow</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium line-clamp-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                required
                className="input-field pl-12"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                required
                className="input-field pl-12"
                placeholder="you@university.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                required
                className="input-field pl-12"
                placeholder="Min. 8 characters"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                Get Started <ArrowRight className="ml-2" size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-800/50 p-2 rounded-lg">
            <CheckCircle2 size={14} className="text-green-500" />
            <span>Free forever for students</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-800/50 p-2 rounded-lg">
            <CheckCircle2 size={14} className="text-green-500" />
            <span>Encrypted cloud synchronization</span>
          </div>
        </div>

        <p className="text-center mt-6 text-gray-500 dark:text-gray-400 text-sm font-['Plus_Jakarta_Sans']">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 dark:text-primary-400 font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
