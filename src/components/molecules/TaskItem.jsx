import React, { useState } from "react";
import { motion } from "framer-motion";
import { format, isPast, isToday } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import PriorityBadge from "@/components/atoms/PriorityBadge";
import Checkbox from "@/components/atoms/Checkbox";

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete(task.id)
  }

  const formatDueDate = (dueDate) => {
    if (!dueDate) return null
    
    try {
      const date = new Date(dueDate)
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return { text: 'Invalid date', isOverdue: false, isToday: false }
      }
      
      const now = new Date()
      
      if (isToday(date)) {
        return { text: 'Today', isOverdue: false, isToday: true }
      }
      
      if (isPast(date) && !isToday(date)) {
        return { text: format(date, 'MMM d'), isOverdue: true, isToday: false }
      }
      
return { text: format(date, 'MMM d'), isOverdue: false, isToday: false }
    } catch (error) {
      console.error('Error formatting due date:', error)
      return { text: 'Invalid date', isOverdue: false, isToday: false }
    }
  }

  const dueDateInfo = formatDueDate(task.dueDate)
  const category = task?.category
  return (
    <motion.div
    layout
    whileHover={{
        y: -2
    }}
    className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 ${task.completed ? "opacity-75" : ""} ${isDeleting ? "opacity-50" : ""}`}>
    <div className="flex items-start space-x-4">
        {/* Checkbox */}
        <div className="mt-1">
            <Checkbox checked={task.completed} onChange={onToggle} disabled={isDeleting} />
        </div>
        {/* Task Content */}
        <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                    <h3
                        className={`font-medium break-words ${task.completed ? "text-gray-500 line-through" : "text-gray-900"}`}>
                        {task.title}
                    </h3>
                    {/* Meta Information */}
                    <div className="flex items-center space-x-3 mt-2">
                        <PriorityBadge priority={task.priority} />
                        {category && <div className="flex items-center space-x-1">
                            <ApperIcon name={category.icon} size={14} className="text-gray-400" />
                            <span className="text-xs text-gray-500">{category.name}</span>
                        </div>}
                        {dueDateInfo && <div
                            className={`flex items-center space-x-1 ${dueDateInfo.isOverdue ? "text-error" : dueDateInfo.isToday ? "text-accent" : "text-gray-500"}`}>
                            <ApperIcon name="Calendar" size={14} />
                            <span className="text-xs font-medium">
                                {dueDateInfo.text}
                                {dueDateInfo.isOverdue && " (Overdue)"}
                            </span>
                        </div>}
                    </div>
                </div>
                {/* Action Buttons */}
                <div className="flex items-center space-x-1 ml-4">
                    <motion.button
                        whileHover={{
                            scale: 1.1
                        }}
                        whileTap={{
                            scale: 0.9
                        }}
                        onClick={onEdit}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                        disabled={isDeleting}>
                        <ApperIcon name="Edit2" size={16} />
                    </motion.button>
                    <motion.button
                        whileHover={{
                            scale: 1.1
                        }}
                        whileTap={{
                            scale: 0.9
                        }}
                        onClick={handleDelete}
                        className="p-2 text-gray-400 hover:text-error hover:bg-error/10 rounded-lg transition-all duration-200"
                        disabled={isDeleting}>
                        <ApperIcon name="Trash2" size={16} />
                    </motion.button>
                </div>
            </div>
        </div>
    </div>
</motion.div>
  )
}

export default TaskItem