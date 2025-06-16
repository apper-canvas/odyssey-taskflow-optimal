import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const CategorySidebar = ({ categories, selectedCategory, onCategorySelect, tasks }) => {
  const getCategoryTaskCount = (categoryId) => {
    if (categoryId === 'all') {
      return tasks.length
    }
    return tasks.filter(task => task.categoryId === categoryId).length
  }

  const getCompletedCount = (categoryId) => {
    if (categoryId === 'all') {
      return tasks.filter(task => task.completed).length
    }
    return tasks.filter(task => task.categoryId === categoryId && task.completed).length
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          TaskFlow
        </h1>
        <p className="text-gray-500 text-sm mt-1">Organize & Complete Tasks</p>
      </div>

      <div className="space-y-2">
        {categories.map((category) => {
          const taskCount = getCategoryTaskCount(category.id)
          const completedCount = getCompletedCount(category.id)
          const isSelected = selectedCategory === category.id

          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onCategorySelect(category.id)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                isSelected
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                  : 'bg-white hover:bg-gray-50 text-gray-700 shadow-sm border border-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    isSelected 
                      ? 'bg-white/20' 
                      : 'bg-gray-100'
                  }`}>
                    <ApperIcon 
                      name={category.icon} 
                      size={18}
                      className={isSelected ? 'text-white' : 'text-gray-600'}
                    />
                  </div>
                  <div>
                    <h3 className={`font-medium ${
                      isSelected ? 'text-white' : 'text-gray-900'
                    }`}>
                      {category.name}
                    </h3>
                    {taskCount > 0 && (
                      <p className={`text-xs ${
                        isSelected ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {completedCount}/{taskCount} completed
                      </p>
                    )}
                  </div>
                </div>
                
                {taskCount > 0 && (
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {taskCount}
                  </div>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Progress Summary */}
      <div className="mt-8 p-4 bg-white rounded-xl border border-gray-100">
        <h3 className="font-medium text-gray-900 mb-3">Today's Progress</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Completed</span>
            <span className="font-medium text-success">
              {tasks.filter(t => t.completed).length}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Remaining</span>
            <span className="font-medium text-primary">
              {tasks.filter(t => !t.completed).length}
            </span>
          </div>
          <div className="mt-3 bg-gray-100 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-success to-primary h-2 rounded-full transition-all duration-500"
              style={{ 
                width: tasks.length > 0 
                  ? `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` 
                  : '0%' 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategorySidebar