import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import React from 'react';
const Learn = () => {
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

          {/* Text Content */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-6">
              Ready to Dive into DSA?
            </h2>
            <p className="text-purple-200 mb-8">
              Master Data Structures & Algorithms with interactive visual tools, real-time code feedback, and AI-powered coaching. Your journey starts here.
            </p>
            <Link
              to="/learn"
              className="relative inline-flex items-center justify-center px-8 py-4 font-semibold text-lg text-white bg-gradient-to-br from-pink-600 to-purple-700 rounded-full shadow-xl hover:scale-105 transition-all duration-300 group"
              role="button"
              aria-label="Start Learning"
            >
              <span className="absolute inset-0 bg-white opacity-10 rounded-full blur-md group-hover:opacity-20 transition" />
              <span className="relative z-10">🚀 Start Learning</span>
            </Link>
          </div>

          {/* Animated Data Structure Graphic */}
          <div className="flex-1 relative min-h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/10 rounded-2xl border border-purple-800/40 overflow-hidden">
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute w-full h-full"
                viewBox="0 0 200 200"
                preserveAspectRatio="xMidYMid meet"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              >
                {/* Glowing Nodes */}
                {[...Array(6)].map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={Math.random() * 150 + 25}
                    cy={Math.random() * 150 + 25}
                    r="6"
                    fill="url(#grad1)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: Math.random() * 2,
                    }}
                  />
                ))}

                {/* Glowing Connections */}
                {[...Array(5)].map((_, i) => (
                  <motion.line
                    key={i}
                    x1={Math.random() * 150 + 25}
                    y1={Math.random() * 150 + 25}
                    x2={Math.random() * 150 + 25}
                    y2={Math.random() * 150 + 25}
                    stroke="url(#grad2)"
                    strokeWidth="2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: Math.random() * 2,
                    }}
                  />
                ))}

                {/* Gradients */}
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "rgb(255, 0, 204)", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "rgb(0, 204, 255)", stopOpacity: 1 }} />
                  </linearGradient>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: "rgb(0, 204, 255)", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "rgb(255, 0, 204)", stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
              </motion.svg>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
export default Learn;
