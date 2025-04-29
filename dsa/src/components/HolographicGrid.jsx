import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HolographicGrid = () => {
  const { scrollY } = useScroll();
  const y2 = useTransform(scrollY, [0, 500], [0, 50]);

  return (
    <motion.div 
      className="fixed inset-0 opacity-5 pointer-events-none z-0"
      style={{ y: y2 }}
    >
      <svg className="w-full h-full">
        <defs>
          <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <pattern
            id="grid-pattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="url(#grid-gradient)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </motion.div>
  );
};

export default HolographicGrid;
