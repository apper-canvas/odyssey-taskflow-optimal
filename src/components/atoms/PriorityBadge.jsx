import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const PriorityBadge = ({ priority, size = 'md' }) => {
  const priorityConfig = {
    high: {
      label: 'High',
      color: 'bg-error/10 text-error border-error/20',
      icon: 'AlertCircle',
      pulseColor: 'animate-pulse-glow'
    },
    medium: {
      label: 'Medium',
      color: 'bg-warning/10 text-warning border-warning/20',
      icon: 'Clock',
      pulseColor: ''
    },
    low: {
      label: 'Low',
      color: 'bg-success/10 text-success border-success/20',
      icon: 'Minus',
      pulseColor: ''
    }
  }

  const sizeConfig = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-xs',
    lg: 'px-4 py-2 text-sm'
  }

  const iconSize = {
    sm: 12,
    md: 14,
    lg: 16
  }

  const config = priorityConfig[priority]
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center space-x-1 rounded-full border font-medium transition-all duration-200 ${
        config.color
      } ${sizeConfig[size]} ${priority === 'high' ? config.pulseColor : ''}`}
    >
      <ApperIcon 
        name={config.icon} 
        size={iconSize[size]} 
      />
      <span>{config.label}</span>
    </motion.div>
  )
}

export default PriorityBadge