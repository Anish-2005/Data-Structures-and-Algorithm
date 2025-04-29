import React from 'react';
import { motion } from 'framer-motion';
import { FiLock } from 'react-icons/fi';

const AdminPanelButton = ({ setShowAdminPanel }) => {
  return (
    <motion.button
      onClick={() => setShowAdminPanel(true)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 p-5 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full shadow-2xl shadow-purple-900/50 z-[1000]"
    >
      <FiLock className="text-2xl text-white" />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
    </motion.button>
  );
};

export default AdminPanelButton;
