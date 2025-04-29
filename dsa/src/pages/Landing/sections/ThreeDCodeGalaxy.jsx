import { motion } from 'framer-motion';
import React from 'react';

const CodeGalaxy = () => {
  return (
    <motion.section
      className="container mx-auto py-24 px-4 relative z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="code-galaxy rounded-[3rem] border-2 border-purple-800/50 bg-gray-900/50 backdrop-blur-2xl p-12">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300 mb-6">
              Quantum Code Playground
            </h2>
            <p className="text-purple-200 mb-8">
              Experience code visualization in 4D space with real-time complexity analysis and AI-powered optimization suggestions.
            </p>
            <div className="space-y-4">
              {['Multi-language Support', 'Real-time Collaboration', 'AI Pair Programmer', 'Holographic Debugging'].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 text-purple-100"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-2 h-2 bg-pink-400 rounded-full" />
                  {item}
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 relative min-h-[400px]">
            {/* 3D Animated code matrix */}
            <div className="absolute inset-0 bg-purple-900/20 rounded-2xl border border-purple-800/50">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-purple-400/20 font-mono text-xs"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [0, -100, 0],
                    x: [0, (Math.random() - 0.5) * 50, 0],
                    z: [(Math.random() - 0.5) * 100, 0, (Math.random() - 0.5) * 100], // Adding Z-axis motion for depth
                    rotateX: [0, Math.random() * 180, 0], // Random rotation on X-axis
                    rotateY: [0, Math.random() * 180, 0], // Random rotation on Y-axis
                  }}
                  transition={{
                    duration: Math.random() * 10 + 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {Math.random() > 0.5 ? '0x' : '1x'}{Math.floor(Math.random() * 10000).toString(16)}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CodeGalaxy;
