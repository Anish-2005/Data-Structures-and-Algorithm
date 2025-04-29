import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiTerminal, FiChevronRight } from 'react-icons/fi';
import React from 'react';

const QuantumCompiler = () => {
  return (
    <motion.section
      className="container mx-auto py-24 px-4 relative z-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="relative rounded-[3rem] border-2 border-purple-800/50 bg-gray-900/50 backdrop-blur-2xl p-8 md:p-12 overflow-hidden">
        {/* Quantum Circuit Background */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] bg-gradient-to-r from-purple-500 to-pink-500"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 30 + 20}%`
              }}
              animate={{
                opacity: [0, 0.5, 0],
                x: [0, (Math.random() - 0.5) * 100]
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center space-y-6 md:space-y-8">
          {/* Heading */}
          <motion.h2
            className="text-xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300 leading-tight"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Redefine DSA with
            <br />
            <span className="text-3xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-500">
              Quantum Compiler
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            className="text-sm md:text-xl text-purple-200 max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Transform algorithm development with AI-powered optimizations and quantum-inspired computing paradigms. Experience compilation at light speed.

            {/* Animated Particles */}
            <span className="relative inline-block ml-2">
              {[...Array(3)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-pink-400 rounded-full"
                  style={{
                    left: `${i * 10}px`,
                    top: '-6px'
                  }}
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{
                    duration: 1.5 + i,
                    repeat: Infinity
                  }}
                />
              ))}
            </span>
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 50 }}
          >
            <Link
              to="/compiler"
              className="inline-flex items-center px-8 py-4 md:px-12 md:py-5 text-lg md:text-xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl md:rounded-2xl hover:shadow-xl transition-all duration-300 group"
            >
              <FiTerminal className="mr-3 md:mr-4 text-xl md:text-2xl text-pink-200" />
              <span className="text-pink-100 group-hover:text-white transition-colors">
                Launch Quantum Compiler
              </span>
              <FiChevronRight className="ml-3 md:ml-4 text-xl opacity-80 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default QuantumCompiler;
