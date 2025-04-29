import React ,{ useState, useEffect } from 'react';
import { FiClock, FiTrash2, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const History = ({ setCode, setLanguage }) => {
  const [history, setHistory] = useState([]);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('compilerHistory')) || [];
    setHistory(storedHistory);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('compilerHistory');
    setHistory([]);
    setConfirmClear(false);
  };

  const handleHistoryClick = (entry) => {
    setCode(entry.code);
    setLanguage(entry.language || 'python');
  };

  const historyItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    hover: { x: 5, background: 'rgba(76, 29, 149, 0.1)' }
  };

  return (
    <div className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-950 border border-purple-900/50 shadow-xl shadow-purple-900/10 flex-1 overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-purple-900/20 to-purple-900/5 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiClock className="text-purple-400 text-lg" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-200 to-purple-400 bg-clip-text text-transparent">
              Compilation History
            </span>
          </div>
          <button 
            onClick={clearHistory}
            className="text-xs px-3 py-1 rounded-full bg-purple-900/30 hover:bg-purple-900/50 text-purple-300 hover:text-pink-200 transition-all duration-200"
          >
            Clear
          </button>
        </div>
      </div>
      
      <motion.div 
        className="h-[calc(100%-56px)] overflow-auto p-3 space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {history.map((entry, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ x: 5 }}
            className="group p-3 rounded-lg bg-gray-800/5 hover:bg-gray-800/20 cursor-pointer transition-all duration-200 border border-transparent hover:border-purple-900/30 relative"
            onClick={() => handleHistoryClick(entry)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/0 to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
            <div className="flex items-center justify-between mb-1 relative">
              <div className="flex items-center gap-2">
                <span className="text-[0.7rem] text-purple-500/80">
                  {new Date(entry.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
                <span className="text-[0.65rem] px-2 py-0.5 rounded-full bg-purple-900/30 text-purple-300 border border-purple-900/50">
                  {(entry.language || 'unknown').toUpperCase()}
                </span>
              </div>
              <span className={`text-[0.65rem] px-2 py-0.5 rounded-full ${
                entry.errors?.length > 0 
                  ? 'bg-red-900/30 text-red-300 border border-red-900/50' 
                  : 'bg-green-900/30 text-green-300 border border-green-900/50'
              }`}>
                {entry.errors?.length ? 'ERROR' : 'SUCCESS'}
              </span>
            </div>
            <code className="block text-xs font-mono text-gray-300/90 line-clamp-2 transition-all duration-200 group-hover:text-gray-200">
              {entry.code || '// No code available'}
            </code>
          </motion.div>
        ))}
        {history.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center h-full p-4"
          >
            <span className="text-sm text-purple-500/60 italic">
              Your compilation history will appear here...
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default History;