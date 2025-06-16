import { tasks } from '../mockData/tasks.json';

// Utility function to add delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generate ID
const generateId = () => Date.now().toString();

let taskData = [...tasks];

const taskService = {
  async getAll() {
    await delay(300);
    return [...taskData].sort((a, b) => {
      // Sort by completed first, then by created date
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  },

  async getById(id) {
    await delay(200);
    const task = taskData.find(t => t.id === id);
    return task ? {...task} : null;
  },

  async create(taskData) {
    await delay(300);
    const newTask = {
      id: generateId(),
      title: taskData.title,
      completed: false,
      priority: taskData.priority || 'medium',
      categoryId: taskData.categoryId || 'personal',
      dueDate: taskData.dueDate || null,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    
    taskData.push(newTask);
    return {...newTask};
  },

  async update(id, updateData) {
    await delay(250);
    const index = taskData.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    const updatedTask = {
      ...taskData[index],
      ...updateData,
      completedAt: updateData.completed && !taskData[index].completed 
        ? new Date().toISOString() 
        : updateData.completed === false 
        ? null 
        : taskData[index].completedAt
    };
    
    taskData[index] = updatedTask;
    return {...updatedTask};
  },

  async delete(id) {
    await delay(200);
    const index = taskData.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    const deletedTask = taskData[index];
    taskData.splice(index, 1);
    return {...deletedTask};
  },

  async getByCategory(categoryId) {
    await delay(250);
    return taskData
      .filter(task => task.categoryId === categoryId)
      .sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  },

  async searchTasks(query) {
    await delay(300);
    const lowercaseQuery = query.toLowerCase();
    return taskData
      .filter(task => task.title.toLowerCase().includes(lowercaseQuery))
      .sort((a, b) => {
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }
};

export default taskService;