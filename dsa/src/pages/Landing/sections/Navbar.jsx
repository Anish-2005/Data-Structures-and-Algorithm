import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiLayers, FiBookOpen, FiZap, FiMenu, FiChevronRight } from 'react-icons/fi';
import React from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-gray-900/80 backdrop-blur-xl border-b border-purple-900/50 p-4 sticky top-0 z-50"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="group relative flex items-center"
        >
          <Link to="/" className="flex items-center">
            <motion.div
              className="p-2 mr-3 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-400 transition-all duration-300 shadow-lg"
              animate={{
                rotate: [0, 10, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FiLayers className="text-white text-xl" />
            </motion.div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-200 tracking-tight">
              Quantum DSA
              <span className="text-purple-400 text-sm ml-2 font-normal">v2.0</span>
            </h1>
          </Link>
          <div className="absolute -inset-2 bg-purple-500/10 rounded-xl blur-xl -z-10" />
        </motion.div>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} // Toggle mobile menu
            className="text-white focus:outline-none"
          >
            <FiMenu className="text-2xl" />
          </button>
        </div>

        {/* Desktop Menu Items */}
        <div className="hidden lg:flex space-x-4">
          <motion.div whileHover={{ y: -2 }} className="relative group">
            <Link
              to="/labs"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-gray-100 hover:text-white transition-all duration-300 border border-purple-900/50 hover:border-purple-700/70 flex items-center gap-2 text-sm font-medium"
            >
              <FiBookOpen className="text-purple-400" />
              Lab Catalog
              <motion.span
                className="ml-2 opacity-0 group-hover:opacity-100"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FiChevronRight />
              </motion.span>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <Link
              to="/visualizer"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-br from-purple-700/50 to-pink-600/50 hover:from-purple-600/50 hover:to-pink-500/50 text-purple-100 hover:text-white transition-all duration-300 border border-purple-800/50 hover:border-pink-500/70 flex items-center gap-2 text-sm font-medium backdrop-blur-sm"
            >
              <FiZap className="text-pink-300 animate-pulse" />
              Live Visualizer
            </Link>
            <div className="absolute inset-0 rounded-lg bg-pink-500/20 blur-xl -z-10" />
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-gray-900/80 backdrop-blur-xl p-6 space-y-4 border-t border-purple-800/50">
          <motion.div whileHover={{ y: -2 }} className="relative group">
            <Link
              to="/labs"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-gray-100 hover:text-white transition-all duration-300 border border-purple-900/50 hover:border-purple-700/70 flex items-center gap-2 text-sm font-medium"
            >
              <FiBookOpen className="text-purple-400" />
              Lab Catalog
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <Link
              to="/visualizer"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-br from-purple-700/50 to-pink-600/50 hover:from-purple-600/50 hover:to-pink-500/50 text-purple-100 hover:text-white transition-all duration-300 border border-purple-800/50 hover:border-pink-500/70 flex items-center gap-2 text-sm font-medium backdrop-blur-sm"
            >
              <FiZap className="text-pink-300 animate-pulse" />
              Live Visualizer
            </Link>
          </motion.div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
