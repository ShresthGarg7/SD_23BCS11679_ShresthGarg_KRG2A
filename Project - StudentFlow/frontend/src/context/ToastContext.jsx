import React, { useState, createContext, useContext, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[1000] flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl min-w-[300px] border ${
                toast.type === 'success' 
                  ? 'bg-white dark:bg-slate-900 border-green-100 dark:border-green-900/30' 
                  : 'bg-white dark:bg-slate-900 border-red-100 dark:border-red-900/30'
              }`}
            >
              <div className={`p-2 rounded-xl ${
                toast.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {toast.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800 dark:text-gray-100">{toast.message}</p>
              </div>
              <button 
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
