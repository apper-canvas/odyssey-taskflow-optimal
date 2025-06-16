import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Checkbox = ({ checked, onChange, disabled = false }) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.9 } : {}}
      onClick={onChange}
      disabled={disabled}
      className={`w-6 h-6 rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
        checked
          ? 'bg-gradient-to-r from-primary to-secondary border-primary shadow-sm'
          : 'border-gray-300 hover:border-primary/50'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <motion.div
        initial={false}
        animate={{ 
          scale: checked ? 1 : 0,
          opacity: checked ? 1 : 0
        }}
        transition={{ 
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        <ApperIcon 
          name="Check" 
          size={14} 
          className="text-white"
        />
      </motion.div>
    </motion.button>
  )
}

export default Checkbox