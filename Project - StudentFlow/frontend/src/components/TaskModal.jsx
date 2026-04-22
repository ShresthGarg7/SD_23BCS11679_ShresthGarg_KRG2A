import React, { useState, useEffect } from 'react';
import { X, Trash2, Calendar, Flag, Type, AlignLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskModal = ({ isOpen, onClose, onSave, onDelete, task, initialStatus }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: initialStatus || 'todo',
    priority: 'Medium',
    deadline: '',
    color: '#8b5cf6',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || initialStatus || 'todo',
        priority: task.priority || 'Medium',
        deadline: task.deadline ? task.deadline.substring(0, 19) : '',
        color: task.color || '#8b5cf6',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: initialStatus || 'todo',
        priority: 'Medium',
        deadline: '',
        color: '#8b5cf6',
      });
    }
  }, [task, initialStatus, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-slate-800"
        >
          <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
              {task ? 'Edit Task' : 'Create New Task'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-xl transition-colors">
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Type size={14} /> Title
              </label>
              <input
                type="text"
                required
                className="input-field"
                placeholder="What needs to be done?"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <AlignLeft size={14} /> Description
              </label>
              <textarea
                className="input-field min-h-[100px] resize-none"
                placeholder="Add more details..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Flag size={14} /> Priority
                </label>
                <select
                  className="input-field appearance-none cursor-pointer"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Calendar size={14} /> Deadline
                </label>
                <input
                  type="datetime-local"
                  step="1"
                  min={getCurrentDateTime()}
                  className="input-field cursor-pointer"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center gap-6 py-2">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Accent Color</label>
                <div className="flex gap-3">
                  {['#8b5cf6', '#f43f5e', '#10b981', '#f59e0b', '#3b82f6'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: c })}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        formData.color === c ? 'border-gray-900 dark:border-white scale-110' : 'border-transparent scale-100 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-800">
              {task && (
                <button
                  type="button"
                  onClick={() => onDelete(task.id)}
                  className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-xl transition-all"
                >
                  <Trash2 size={18} /> Delete Task
                </button>
              )}
              <div className="flex gap-3 ml-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all font-['Plus_Jakarta_Sans']"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-8"
                >
                  {task ? 'Update' : 'Create Task'}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskModal;
