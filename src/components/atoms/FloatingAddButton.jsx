import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const FloatingAddButton = ({ onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-30"
      animate={{ 
        boxShadow: [
          '0 4px 20px rgba(99, 102, 241, 0.3)',
          '0 8px 30px rgba(99, 102, 241, 0.4)',
          '0 4px 20px rgba(99, 102, 241, 0.3)'
        ]
      }}
      transition={{ 
        repeat: Infinity, 
        duration: 2,
        ease: "easeInOut"
      }}
    >
      <ApperIcon name="Plus" size={24} />
    </motion.button>
  )
}

export default FloatingAddButton