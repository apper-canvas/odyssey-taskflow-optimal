import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const EmptyState = ({ title, description, actionLabel, onAction, icon }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center py-16"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="mb-6"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full">
          <ApperIcon 
            name={icon || "CheckSquare"} 
            size={32} 
            className="text-primary"
          />
        </div>
      </motion.div>

      <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        {description}
      </p>

      {actionLabel && onAction && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onAction}
            variant="primary"
            className="px-6 py-3"
          >
            <ApperIcon name="Plus" size={16} className="mr-2" />
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default EmptyState