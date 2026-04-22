import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { Plus } from 'lucide-react';

const BoardColumn = ({ title, status, tasks, onAddTask, onEditTask, onMoveTask }) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    const taskId = e.dataTransfer.getData('taskId');
    onMoveTask(taskId, status);
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`kanban-column transition-all duration-200 ${
        isOver ? 'bg-primary-50/50 dark:bg-primary-900/10 ring-2 ring-primary-500/20' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-gray-700 dark:text-gray-300 capitalize">{title}</h2>
          <span className="bg-gray-200 dark:bg-slate-800 text-gray-500 dark:text-gray-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(status)}
          className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-280px)] pr-1 custom-scrollbar">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDragStart={handleDragStart}
          />
        ))}
        {tasks.length === 0 && (
          <div className="border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center opacity-50">
            <p className="text-xs text-gray-400 dark:text-gray-500">No tasks yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardColumn;
