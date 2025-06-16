import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const ErrorState = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex items-center justify-center h-full"
    >
      <div className="text-center p-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-error/10 rounded-full mb-4">
          <ApperIcon name="AlertTriangle" size={24} className="text-error" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Something went wrong
        </h3>
        
        <p className="text-gray-500 mb-6 max-w-md">
          {message || 'An unexpected error occurred. Please try again.'}
        </p>

        {onRetry && (
          <Button
            onClick={onRetry}
            variant="primary"
          >
            <ApperIcon name="RefreshCw" size={16} className="mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </motion.div>
  )
}

export default ErrorState