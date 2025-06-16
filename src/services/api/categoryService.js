import { categories } from '../mockData/categories.json';

// Utility function to add delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generate ID
const generateId = () => Date.now().toString();

let categoryData = [...categories];

const categoryService = {
  async getAll() {
    await delay(200);
    return [...categoryData];
  },

  async getById(id) {
    await delay(150);
    const category = categoryData.find(c => c.id === id);
    return category ? {...category} : null;
  },

  async create(categoryInfo) {
    await delay(250);
    const newCategory = {
      id: generateId(),
      name: categoryInfo.name,
      color: categoryInfo.color || '#6366F1',
      icon: categoryInfo.icon || 'Folder',
      taskCount: 0
    };
    
    categoryData.push(newCategory);
    return {...newCategory};
  },

  async update(id, updateData) {
    await delay(200);
    const index = categoryData.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Category not found');
    
    const updatedCategory = {
      ...categoryData[index],
      ...updateData
    };
    
    categoryData[index] = updatedCategory;
    return {...updatedCategory};
  },

  async delete(id) {
    await delay(200);
    const index = categoryData.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Category not found');
    
    const deletedCategory = categoryData[index];
    categoryData.splice(index, 1);
    return {...deletedCategory};
  },

  async updateTaskCount(id, count) {
    await delay(100);
    const index = categoryData.findIndex(c => c.id === id);
    if (index !== -1) {
      categoryData[index].taskCount = count;
      return {...categoryData[index]};
    }
    return null;
  }
};

export default categoryService;