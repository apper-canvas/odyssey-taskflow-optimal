import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const FilterBar = ({
  searchQuery,
  onSearchChange,
  priorityFilter,
  onPriorityFilterChange,
  statusFilter,
  onStatusFilterChange,
  taskCount,
  selectedCategory,
  categories
}) => {
  const categoryName = categories.find(cat => cat.id === selectedCategory)?.name || 'All Tasks'

  const priorityOptions = [
    { value: 'all', label: 'All Priority', icon: 'Filter' },
    { value: 'high', label: 'High', icon: 'AlertCircle', color: 'text-priority-high' },
    { value: 'medium', label: 'Medium', icon: 'Clock', color: 'text-priority-medium' },
    { value: 'low', label: 'Low', icon: 'Minus', color: 'text-priority-low' }
  ]

  const statusOptions = [
    { value: 'all', label: 'All Status', icon: 'List' },
    { value: 'pending', label: 'Pending', icon: 'Circle' },
    { value: 'completed', label: 'Completed', icon: 'CheckCircle' }
  ]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-gray-900">
            {categoryName}
          </h2>
          <p className="text-gray-500">
            {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <ApperIcon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white"
          />
        </div>

        {/* Priority Filter */}
        <div className="flex gap-2">
          {priorityOptions.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPriorityFilterChange(option.value)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                priorityFilter === option.value
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ApperIcon 
                name={option.icon} 
                size={16}
                className={priorityFilter === option.value 
                  ? 'text-white' 
                  : option.color || 'text-gray-500'
                }
              />
              <span className="hidden sm:inline">{option.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex gap-2">
          {statusOptions.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onStatusFilterChange(option.value)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                statusFilter === option.value
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ApperIcon 
                name={option.icon} 
                size={16}
                className={statusFilter === option.value ? 'text-white' : 'text-gray-500'}
              />
              <span className="hidden sm:inline">{option.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterBar