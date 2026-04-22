import React from 'react';
import { Clock, MoreHorizontal, Calendar, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskCard = ({ task, onEdit, onDragStart }) => {
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      case 'medium': return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400';
      case 'low': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = task.deadline && new Date(task.deadline) < new Date() && task.status !== 'done';

  return (
    <motion.div
      layout
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className="glass-card p-4 rounded-2xl cursor-grab active:cursor-grabbing group relative overflow-hidden"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Accent strip */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1.5" 
        style={{ backgroundColor: task.color || '#8b5cf6' }}
      ></div>

      <div className="flex justify-between items-start mb-3 pl-2">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
          {task.priority || 'Medium'}
        </span>
        <button 
          onClick={() => onEdit(task)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2 pl-2 line-clamp-1 leading-tight">
        {task.title}
      </h3>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 pl-2 line-clamp-2 mb-4 h-8">
        {task.description || 'No description provided.'}
      </p>

      <div className="flex items-center justify-between pl-2 mt-auto">
        <div className="flex items-center gap-1.5">
          {task.deadline && (
            <div className={`flex items-center gap-1 text-[11px] font-medium ${isOverdue ? 'text-red-500' : 'text-gray-400'}`}>
              {isOverdue ? <AlertCircle size={12} /> : <Calendar size={12} />}
              {formatDate(task.deadline)}
            </div>
          )}
        </div>
        
        {task.status === 'progress' && (
          <div className="flex items-center gap-1 text-[10px] text-orange-500 font-bold uppercase">
            <Clock size={12} className="animate-pulse" />
            Active
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TaskCard;
