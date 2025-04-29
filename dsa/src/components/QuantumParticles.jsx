import React from 'react';
import { motion } from 'framer-motion';
const QuantumParticles = () => {
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.3 + 0.2,       // Smaller scale: 0.2 to 0.5
      duration: Math.random() * 10 + 15      // Slower: 15s to 25s
    }));
  

    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-2 h-2 bg-purple-400 rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              scale: p.scale
            }}
            animate={{
              y: [0, 100, -50, 75, 0],
              x: [0, 50, -30, 40, 0],
              rotate: [0, 360],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'anticipate'
            }}
          />
        ))}
      </div>
    );
  };
  export default QuantumParticles;