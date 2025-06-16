import { motion } from 'framer-motion'

const SkeletonLoader = ({ count = 1, className = "h-4" }) => {
  return (
    <div className="space-y-3">
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse ${className}`}
          style={{
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite'
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  )
}

export default SkeletonLoader