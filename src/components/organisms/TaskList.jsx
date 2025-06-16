import { motion, AnimatePresence } from 'framer-motion'
import TaskItem from '@/components/molecules/TaskItem'

const TaskList = ({ tasks, onTaskToggle, onTaskEdit, onTaskDelete, categories }) => {
  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.05,
              ease: "easeOut"
            }}
            layout
          >
            <TaskItem
              task={task}
              onToggle={() => onTaskToggle(task.id)}
              onEdit={() => onTaskEdit(task)}
              onDelete={() => onTaskDelete(task.id)}
              category={categories.find(cat => cat.id === task.categoryId)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TaskList