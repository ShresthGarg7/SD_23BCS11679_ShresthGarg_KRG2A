import api from './api';

const taskService = {
  getTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },

  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}`);
  },

  moveTask: async (id, status) => {
    const response = await api.patch(`/tasks/${id}/move`, { status });
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  }
};

export default taskService;
