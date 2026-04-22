import React, { useState, useEffect } from 'react';
import taskService from '../services/taskService';
import { useStats } from '../context/StatsContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BoardColumn from '../components/BoardColumn';
import TaskModal from '../components/TaskModal';
import { Search, Filter, Plus, SlidersHorizontal, ListFilter } from 'lucide-react';
import { motion } from 'framer-motion';

const Board = () => {
  const { refreshStats } = useStats();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [initialStatus, setInitialStatus] = useState('todo');

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    let result = tasks;
    
    if (searchQuery) {
      result = result.filter(t => 
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (priorityFilter !== 'All') {
      result = result.filter(t => t.priority === priorityFilter);
    }
    
    setFilteredTasks(result);
  }, [tasks, searchQuery, priorityFilter]);

  const fetchTasks = async () => {
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = (status) => {
    setInitialStatus(status);
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (formData) => {
    try {
      if (editingTask) {
        await taskService.updateTask(editingTask.id, formData);
      } else {
        await taskService.createTask(formData);
      }
      setIsModalOpen(false);
      fetchTasks();
      refreshStats();
    } catch (err) {
      console.error('Failed to save task', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      setIsModalOpen(false);
      fetchTasks();
      refreshStats();
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  const handleMoveTask = async (id, status) => {
    try {
      // Optimistic UI update
      setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
      await taskService.moveTask(id, status);
      refreshStats();
    } catch (err) {
      console.error('Failed to move task', err);
      fetchTasks(); // Revert on failure
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 font-['Plus_Jakarta_Sans']">
      <Navbar />
      <Sidebar />
      
      <main className="md:ml-64 p-6 md:p-10 pt-6">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Task Board</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium italic">Your Academic Kanban</p>
            </div>
            <button 
              onClick={() => handleCreateTask('todo')}
              className="btn-primary shadow-lg shadow-primary-500/30 gap-2 px-6 h-12"
            >
              <Plus size={20} /> Create New Task
            </button>
          </header>

          <div className="bg-white dark:bg-slate-900/50 p-4 rounded-3xl mb-10 flex flex-wrap items-center gap-4 border border-gray-200 dark:border-slate-800 shadow-sm">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-primary-500/20 text-sm transition-all"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700">
              <ListFilter size={16} className="text-gray-400" />
              <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">Priority</span>
              <select 
                className="bg-transparent border-none outline-none text-sm font-semibold text-gray-700 dark:text-gray-300 py-1"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="All">All Levels</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="h-8 w-[1px] bg-gray-200 dark:bg-slate-800 mx-2 hidden sm:block"></div>

            <div className="text-xs font-bold text-gray-400 flex items-center gap-2">
              <SlidersHorizontal size={14} />
              {tasks.length} {tasks.length === 1 ? 'TASK' : 'TASKS'} TOTAL
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 bg-gray-200 dark:bg-slate-800 rounded-3xl opacity-50"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
              <BoardColumn
                title="To Do"
                status="todo"
                tasks={filteredTasks.filter(t => t.status === 'todo')}
                onAddTask={handleCreateTask}
                onEditTask={handleEditTask}
                onMoveTask={handleMoveTask}
              />
              <BoardColumn
                title="In Progress"
                status="progress"
                tasks={filteredTasks.filter(t => t.status === 'progress')}
                onAddTask={handleCreateTask}
                onEditTask={handleEditTask}
                onMoveTask={handleMoveTask}
              />
              <BoardColumn
                title="Completed"
                status="done"
                tasks={filteredTasks.filter(t => t.status === 'done')}
                onAddTask={handleCreateTask}
                onEditTask={handleEditTask}
                onMoveTask={handleMoveTask}
              />
            </div>
          )}
        </div>
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        task={editingTask}
        initialStatus={initialStatus}
      />
    </div>
  );
};

export default Board;
