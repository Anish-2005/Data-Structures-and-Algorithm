import { motion } from 'framer-motion';
import { FaUbuntu } from 'react-icons/fa';
import React from 'react';

const HeroSection = () => {
  return (
    <motion.section
      className="py-32 px-4 text-center relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Badge Section */}
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

        {/* Main Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-300 leading-tight"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            animate={{
              textShadow: [
                '0 0 10px rgba(168,85,247,0.5)',
                '0 0 20px rgba(236,72,153,0.5)',
                '0 0 10px rgba(168,85,247,0.5)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Quantum DSA
          </motion.span>
          <br />
          <span className="text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-400">
            Lab Challenges
          </span>
        </motion.h1>
      </div>

      {/* Arrow Button */}
      <motion.a
        href="#labs"
        className="absolute left-1/2 transform -translate-x-1/2 bottom-8 cursor-pointer"
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        <div className="p-3 rounded-full bg-purple-900/40 border border-purple-700/50 hover:bg-purple-800/60 transition-all backdrop-blur-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-8 h-8 text-purple-300"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </motion.a>
    </motion.section>
  );
};

export default HeroSection;
