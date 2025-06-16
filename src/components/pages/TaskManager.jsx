import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { taskService, categoryService } from '@/services'
import CategorySidebar from '@/components/organisms/CategorySidebar'
import TaskList from '@/components/organisms/TaskList'
import TaskForm from '@/components/organisms/TaskForm'
import FilterBar from '@/components/organisms/FilterBar'
import EmptyState from '@/components/molecules/EmptyState'
import SkeletonLoader from '@/components/atoms/SkeletonLoader'
import ErrorState from '@/components/molecules/ErrorState'
import FloatingAddButton from '@/components/atoms/FloatingAddButton'

const TaskManager = () => {
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [tasksData, categoriesData] = await Promise.all([
          taskService.getAll(),
          categoryService.getAll()
        ])
        setTasks(tasksData)
        setCategories(categoriesData)
      } catch (err) {
        setError(err.message || 'Failed to load data')
        toast.error('Failed to load tasks')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Filter tasks based on current filters
  const filteredTasks = tasks.filter(task => {
    // Category filter
    if (selectedCategory !== 'all' && task.categoryId !== selectedCategory) {
      return false
    }

    // Search filter
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Priority filter
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) {
      return false
    }

    // Status filter
    if (statusFilter === 'completed' && !task.completed) {
      return false
    }
    if (statusFilter === 'pending' && task.completed) {
      return false
    }

    return true
  })

  const handleTaskCreate = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData)
      setTasks(prevTasks => [newTask, ...prevTasks])
      setShowTaskForm(false)
      toast.success('Task created successfully!')
    } catch (err) {
      toast.error('Failed to create task')
    }
  }

  const handleTaskUpdate = async (id, updateData) => {
    try {
      const updatedTask = await taskService.update(id, updateData)
      setTasks(prevTasks => 
        prevTasks.map(task => task.id === id ? updatedTask : task)
      )
      setEditingTask(null)
      
      if (updateData.completed) {
        toast.success('Task completed! Great job! 🎉')
      } else {
        toast.success('Task updated successfully!')
      }
    } catch (err) {
      toast.error('Failed to update task')
    }
  }

  const handleTaskDelete = async (id) => {
    try {
      await taskService.delete(id)
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
      toast.success('Task deleted successfully!')
    } catch (err) {
      toast.error('Failed to delete task')
    }
  }

  const handleTaskToggle = async (id) => {
    const task = tasks.find(t => t.id === id)
    if (task) {
      await handleTaskUpdate(id, { completed: !task.completed })
    }
  }

  if (loading) {
    return (
      <div className="h-screen flex bg-background">
        <div className="w-80 bg-surface border-r border-gray-200 p-6">
          <SkeletonLoader count={5} className="h-12 mb-4" />
        </div>
        <div className="flex-1 p-6">
          <SkeletonLoader count={6} className="h-16 mb-4" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <ErrorState 
        message={error}
        onRetry={() => window.location.reload()}
      />
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen flex bg-background max-w-full overflow-hidden"
    >
      {/* Category Sidebar */}
      <div className="w-80 bg-surface border-r border-gray-200 flex-shrink-0 overflow-y-auto">
        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          tasks={tasks}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Filter Bar */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 p-6">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            priorityFilter={priorityFilter}
            onPriorityFilterChange={setPriorityFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            taskCount={filteredTasks.length}
            selectedCategory={selectedCategory}
            categories={categories}
          />
        </div>

        {/* Task List Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredTasks.length === 0 ? (
            <EmptyState
              title={searchQuery || priorityFilter !== 'all' || statusFilter !== 'all' 
                ? "No tasks match your filters" 
                : "No tasks yet"}
              description={searchQuery || priorityFilter !== 'all' || statusFilter !== 'all'
                ? "Try adjusting your filters to see more tasks"
                : "Create your first task to get started with TaskFlow"}
              actionLabel="Add New Task"
              onAction={() => setShowTaskForm(true)}
              icon="CheckSquare"
            />
          ) : (
            <TaskList
              tasks={filteredTasks}
              onTaskToggle={handleTaskToggle}
              onTaskEdit={setEditingTask}
              onTaskDelete={handleTaskDelete}
              categories={categories}
            />
          )}
        </div>
      </div>

      {/* Floating Add Button */}
      <FloatingAddButton onClick={() => setShowTaskForm(true)} />

      {/* Task Form Modal */}
      <AnimatePresence>
        {(showTaskForm || editingTask) && (
          <TaskForm
            task={editingTask}
            categories={categories}
            onSubmit={editingTask ? 
              (data) => handleTaskUpdate(editingTask.id, data) : 
              handleTaskCreate
            }
            onClose={() => {
              setShowTaskForm(false)
              setEditingTask(null)
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default TaskManager