import { motion } from 'framer-motion';
import { FaUbuntu } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import React from 'react';
const HeroSection = () => {
  return (
    <motion.section 
      className="container mx-auto py-32 px-4 text-center relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="inline-block mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <div className="px-6 py-2 rounded-full bg-purple-900/50 border border-purple-800/50 text-purple-300 text-sm flex items-center gap-2 backdrop-blur-sm">
            <FaUbuntu className="text-pink-400 animate-bounce" />
            <span>Algorithmic Intelligence Platform</span>
          </div>
        </motion.div>
        
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-300 leading-tight"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            animate={{ textShadow: [
              '0 0 10px rgba(168,85,247,0.5)',
              '0 0 20px rgba(236,72,153,0.5)',
              '0 0 10px rgba(168,85,247,0.5)'
            ]}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Quantum DSA
          </motion.span>
          <br />
          <span className="text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-400">
            Visual Computing Lab
          </span>
        </motion.h1>

        {/* Interactive particle button */}
        <motion.div 
          className="mt-16"
          whileHover={{ scale: 1.05 }}
        >
          <Link 
            to="/labs"
            className="relative inline-block px-12 py-4 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-xl font-bold shadow-2xl shadow-purple-900/50 overflow-hidden"
          >
            <span className="relative z-10">Enter the Matrix</span>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 animate-pulse bg-[conic-gradient(from_90deg_at_50%_50%,rgba(168,85,247,0.2)_0%,rgba(236,72,153,0.8)_50%,rgba(168,85,247,0.2)_100%)]" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
