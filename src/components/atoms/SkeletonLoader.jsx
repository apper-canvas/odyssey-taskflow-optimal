import { motion } from "framer-motion";
import React from "react";

const SkeletonLoader = ({ count = 1, className = "h-4" }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <motion.div
          key={index}
          className={`bg-gray-200 rounded-md animate-shimmer ${className}`}
        />
      ))}
    </>
  );
};

export default SkeletonLoader;