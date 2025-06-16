import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import PriorityBadge from '@/components/atoms/PriorityBadge'

const TaskForm = ({ task, categories, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    priority: 'medium',
    categoryId: 'personal',
    dueDate: ''
  })

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        priority: task.priority,
        categoryId: task.categoryId,
        dueDate: task.dueDate ? format(new Date(task.dueDate), 'yyyy-MM-dd') : ''
      })
    }
  }, [task])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    const submitData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
    }

    onSubmit(submitData)
  }

  const priorityOptions = [
    { value: 'high', label: 'High Priority', icon: 'AlertCircle' },
    { value: 'medium', label: 'Medium Priority', icon: 'Clock' },
    { value: 'low', label: 'Low Priority', icon: 'Minus' }
  ]

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-bold text-gray-900">
              {task ? 'Edit Task' : 'Create New Task'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ApperIcon name="X" size={20} className="text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Task Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="What needs to be done?"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                autoFocus
                required
              />
            </div>

            {/* Priority Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Priority Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {priorityOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData(prev => ({ ...prev, priority: option.value }))}
                    className={`p-3 rounded-xl border transition-all duration-200 ${
                      formData.priority === option.value
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <PriorityBadge priority={option.value} size="sm" />
                      <span className="text-xs font-medium">{option.value}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 bg-white"
              >
                {categories.filter(cat => cat.id !== 'all').map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date (Optional)
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-6">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
              >
                {task ? 'Update Task' : 'Create Task'}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  )
}

export default TaskForm