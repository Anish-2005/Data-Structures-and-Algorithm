import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { motion, AnimatePresence,useScroll,useTransform } from 'framer-motion';
import {
  FaProjectDiagram, FaCodeBranch, FaSort, FaSitemap, FaBookOpen, FaHome,
  FaTimes, FaClipboard, FaTrash, FaPlus, FaLock, FaRegChartBar, FaCode, FaBrain,FaUbuntu
} from 'react-icons/fa';
import { FiCode, FiHome, FiLock, FiX, FiClipboard, FiChevronRight, FiLayers, FiZap, FiMenu } from 'react-icons/fi';

const iconComponents = {
  FaProjectDiagram, FaCodeBranch, FaSort, FaSitemap, FaRegChartBar, FaCode, FaBrain,
  FaBookOpen, FaHome, FaClipboard, FaTrash, FaPlus, FaLock
};

export default function DSALabsPage() {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    icon: 'FaRegChartBar',
    problems: [{ question: '', code: '', output: '' }]
  });
  const [pin, setPin] = useState('');
  const [pinVerified, setPinVerified] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const HARDCODED_PIN = '1234';
  // Add this inside your component
const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 50]);

const navigate = useNavigate();
const abortController = new AbortController();

useEffect(() => {
    const abortController = new AbortController();
const fetchAssignments = async () => {
    try {
      const response = await fetch('https://object-oriented-programming-cpp-lab.onrender.com/api/dsa-assignments', {
        signal: abortController.signal
      });
      if (!response.ok) throw new Error('Failed to fetch assignments');
      const { data } = await response.json();

      const formatted = data.map(a => ({
        ...a,
        icon: iconComponents[a.icon] || FaRegChartBar
      }));

      setAssignments(formatted);
      setError(null);
    } catch (err) {
      if (!abortController.signal.aborted) {
        setError(err.message);
      }
    } finally {
      if (!abortController.signal.aborted) {
        setLoading(false);
      }
    }
  };
  fetchAssignments();
  return () => abortController.abort();
}, []); // Empty dependency array for single execution



  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === HARDCODED_PIN) {
      setPinVerified(true);
      setPin('');
    }
  };

  const handleCloseAdminPanel = () => {
    setShowAdminPanel(false);
    setPinVerified(false);
    setPin('');
    setFormData({
      title: '',
      icon: 'FaRegChartBar',
      problems: [{ question: '', code: '', output: '' }]
    });
  };

  const addProblemField = () => {
    setFormData(prev => ({
      ...prev,
      problems: [...prev.problems, { question: '', code: '', output: '' }]
    }));
  };

  const handleProblemChange = (index, field, value) => {
    const newProblems = formData.problems.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );
    setFormData(prev => ({ ...prev, problems: newProblems }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://object-oriented-programming-cpp-lab.onrender.com/api/dsa-assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const { data } = await response.json();
      setAssignments(prev => [{
        ...data,
        icon: iconComponents[data.icon] || FaRegChartBar,
      }, ...prev]);
    } catch (error) {
      console.error('Error submitting challenge:', error);
    } finally {
      handleCloseAdminPanel();
      setTimeout(() => {
        navigate('/labs', { replace: true });
        window.location.reload(); // reload after navigating
      }, 0); // wait for 5 seconds
    }
  };
  const handleDelete = async (id) => {
    try {
      await fetch(`https://object-oriented-programming-cpp-lab.onrender.com/api/dsa-assignments/${id}`, { method: 'DELETE' });
      setAssignments(prev => prev.filter(a => a._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

   // Complex particle animation
// Updated QuantumParticles component (add transform properties)
const QuantumParticles = React.memo(() => {
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.3 + 0.2,
      duration: Math.random() * 10 + 15,
      translateZ: Math.random() * 100 // Add Z-axis variation
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
              scale: p.scale,
              translateZ: `${p.translateZ}px` // Enable 3D acceleration
            }}
            animate={{
              y: [0, 100, -50, 75, 0],
              x: [0, 50, -30, 40, 0],
              rotate: [0, 360],
              opacity: [0.3, 1, 0.3],
              transition: {
                duration: p.duration,
                repeat: Infinity,
                ease: "linear" // Smoother easing
              }
            }}
          />
        ))}
      </div>
    );
  });
  
  const HolographicGrid = () => (
    <motion.div 
      className="fixed inset-0 opacity-5 pointer-events-none z-0"
      style={{ y: y2 }} // If you need parallax effect, implement useParallax hook
    >
      <svg className="w-full h-full">
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
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        <defs>
          <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/20 flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-4xl text-purple-400"
        >
          <FaBrain />
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/20 flex items-center justify-center p-4">
        <div className="text-center text-purple-400">
          <p className="text-xl mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/20 text-white overflow-x-hidden">
      {/* Background Elements */}
      <QuantumParticles />
      <HolographicGrid />
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-gray-900/80 backdrop-blur-xl border-b border-purple-900/50 p-4 sticky top-0 z-50"
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.03 }} className="group relative flex items-center">
            <Link to="/" className="flex items-center">
              <motion.div
                className="p-2 mr-3 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-400 transition-all duration-300 shadow-lg"
                animate={{ rotate: [0, 10, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FiLayers className="text-white text-xl" />
              </motion.div>
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-200 tracking-tight">
                Quantum DSA
                <span className="text-purple-400 text-sm ml-2 font-normal">v2.0</span>
              </h1>
            </Link>
          </motion.div>
  
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <FiMenu className="text-2xl" />
            </button>
          </div>
  
          <div className="hidden lg:flex space-x-4">
            <motion.div whileHover={{ y: -2 }} className="relative group">
              <Link
                to="/"
                className="px-5 py-2.5 rounded-lg bg-gradient-to-br from-purple-700/50 to-pink-600/50 hover:from-purple-600/50 hover:to-pink-500/50 text-purple-100 hover:text-white transition-all duration-300 border border-purple-800/50 hover:border-pink-500/70 flex items-center gap-2 text-sm font-medium backdrop-blur-sm"
              >
                Home
              </Link>
            </motion.div>
          </div>
        </div>
  
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-gray-900/80 backdrop-blur-xl p-6 space-y-4 border-t border-purple-800/50">
            <motion.div whileHover={{ y: -2 }} className="relative group">
              <Link
                to="/labs"
                className="px-5 py-2.5 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-gray-100 hover:text-white transition-all duration-300 border border-purple-900/50 hover:border-purple-700/70 flex items-center gap-2 text-sm font-medium"
              >
                <FaBookOpen className="text-purple-400" />
                Lab Catalog
              </Link>
            </motion.div>
          </div>
        )}
      </motion.nav>
  
      {/* Main Content */}
      <div className="container mx-auto pt-16 px-0 relative z-10">
        {/* Hero Section */}
        <motion.section 
  className="py-32 px-4 text-center relative"
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

  
        {/* Labs Grid */}
       {/* Assignment Grid */}
       <motion.section
  id="labs"
  className="labs py-24 px-4 relative z-10"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  <div className="code-galaxy rounded-[3rem] border-2 border-purple-800/50 bg-gray-900/50 backdrop-blur-2xl p-12">
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
      }}
    >
      {assignments.map((assignment) => {
        const IconComponent = iconComponents[assignment.icon] || FaRegChartBar;
        
        return (
          <motion.div
            key={assignment._id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { type: "spring", stiffness: 300 }
              }
            }}
            className="group relative h-full"
          >
            <motion.div
              className="holographic-card cursor-pointer p-8 rounded-2xl border border-purple-800/50 bg-gradient-to-br from-purple-900/20 to-pink-900/10 backdrop-blur-xl h-full overflow-hidden"
              onClick={() => {
                setSelectedAssignment(assignment);
                setIsPopupOpen(true);
              }}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.15)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-[conic-gradient(from_230.29deg_at_51.3%_52%,rgba(168,85,247,0.2)_0deg,rgba(236,72,153,0.8)_180deg)] opacity-30" />
              
              <div className="relative z-10">
                <div className="mb-6">
                  <motion.div
                    className="p-4 rounded-xl bg-purple-900/30 inline-block"
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <IconComponent className="text-3xl text-pink-400" />
                  </motion.div>
                </div>

                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200 mb-2">
                  {assignment.title}
                </h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-purple-300 text-sm">
                    {assignment.problems.length} {assignment.problems.length > 1 ? 'Challenges' : 'Challenge'}
                  </span>
                  <motion.div
                    className="text-pink-300 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: 10 }}
                    whileHover={{ x: 0 }}
                  >
                    <FiChevronRight className="text-xl" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  </div>
</motion.section>
  
  {/* Admin Panel Floating Button */}
<motion.button
  onClick={() => setShowAdminPanel(true)}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  className="fixed bottom-8 right-8 p-5 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full shadow-2xl shadow-purple-900/50 z-[1000]"
>
  <FiLock className="text-2xl text-white" />
  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
</motion.button>

{/* Assignment Modal */}
<AnimatePresence>
        {isPopupOpen && selectedAssignment && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsPopupOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 50 }}
              className="bg-gradient-to-br from-gray-900 to-purple-900/20 rounded-2xl border border-purple-800/50 w-full max-w-3xl max-h-[90vh] overflow-y-auto backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 relative">
                <button
                  onClick={() => setIsPopupOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full hover:bg-purple-900/30 transition-colors"
                >
                  <FiX className="text-2xl text-purple-400" />
                </button>

                <div className="flex items-center mb-8 gap-4">
                  <div className="text-4xl text-purple-400">
                    {selectedAssignment.icon && iconComponents[selectedAssignment.icon] && (
                      React.createElement(iconComponents[selectedAssignment.icon])
                    )}
                  </div>
                  <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-200">
                    {selectedAssignment.title}
                  </h2>
                </div>

                <div className="space-y-8">
                  {selectedAssignment.problems?.map((problem, pIndex) => (
                    <div key={pIndex} className="bg-gray-800/30 p-6 rounded-xl border border-purple-800/30">
                      <h3 className="text-xl font-medium text-purple-100 mb-4">
                        Problem {pIndex + 1}: {problem.question}
                      </h3>

                      <div className="relative mb-6">
                        <div className="flex items-center justify-between bg-gray-900 px-4 py-3 rounded-t-lg">
                          <div className="flex items-center gap-2">
                            <div className="flex space-x-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                            </div>
                            <span className="text-sm text-purple-300">solution.py</span>
                          </div>
                          <button
                            onClick={() => navigator.clipboard.writeText(problem.code)}
                            className="text-purple-300 hover:text-pink-300 transition-colors"
                            title="Copy to clipboard"
                          >
                            <FiClipboard className="text-lg" />
                          </button>
                        </div>
                        <pre className="p-4 bg-gray-900 rounded-b-lg overflow-x-auto text-sm">
                          <code className="text-green-300 font-mono">{problem.code}</code>
                        </pre>
                      </div>

                      <div className="bg-gray-900/50 p-4 rounded-lg">
                        <h4 className="text-purple-300 text-sm font-semibold mb-2">Expected Output:</h4>
                        <pre className="text-gray-200 text-sm font-mono whitespace-pre-wrap">
                          {problem.output}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>




        {/* Admin Panel Modal */}
        <AnimatePresence>
  {showAdminPanel && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1002] bg-black/50 backdrop-blur-sm flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-gray-800/95 backdrop-blur-xl p-8 rounded-2xl border border-purple-800/50 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            <FiLock className="inline-block mr-3" />
            Quantum Admin Panel
          </h2>
          <motion.button
            onClick={handleCloseAdminPanel}
            whileHover={{ scale: 1.1 }}
            className="p-2 hover:bg-purple-900/30 rounded-full transition-colors"
          >
            <FiX className="text-xl text-purple-300" />
          </motion.button>
        </div>

        {!pinVerified ? (
          <form onSubmit={handlePinSubmit} className="space-y-8">
            <div className="space-y-4">
              <label className="text-sm font-medium text-purple-300">
                Enter Quantum Access Code
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="w-full p-4 bg-gray-700/50 rounded-lg text-center text-3xl font-mono tracking-[0.5em] border border-purple-800/50 focus:border-purple-500 outline-none"
                placeholder="••••"
                inputMode="numeric"
                pattern="\d{4}"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl font-bold shadow-lg shadow-purple-900/50"
            >
              Verify Access
            </motion.button>
          </form>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <label className="text-sm font-medium text-purple-300">Challenge Title</label>
                <input
                  placeholder="Enter Quantum Challenge Name"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full p-3 bg-gray-700/50 rounded-lg border border-purple-800/50 focus:border-purple-500 outline-none"
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-purple-300">Holographic Icon</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="w-full p-3 bg-gray-700/50 rounded-lg border border-purple-800/50 focus:border-purple-500 outline-none"
                >
                  {Object.keys(iconComponents).map(icon => (
                    <option key={icon} value={icon} className="bg-gray-800">
                      {icon}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-6">
                {formData.problems.map((problem, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-gray-700/30 p-6 rounded-xl border border-purple-800/30"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-purple-300 font-medium">Problem {index + 1}</span>
                      {index > 0 && (
                        <motion.button
                          type="button"
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            problems: prev.problems.filter((_, i) => i !== index)
                          }))}
                          whileHover={{ scale: 1.2 }}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <FiX className="text-xl" />
                        </motion.button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <textarea
                        placeholder="Quantum Question"
                        value={problem.question}
                        onChange={(e) => handleProblemChange(index, 'question', e.target.value)}
                        className="w-full p-3 bg-gray-700/50 rounded-lg border border-purple-800/50 focus:border-purple-500 outline-none"
                        rows="2"
                      />
                      <textarea
                        placeholder="Holographic Code"
                        value={problem.code}
                        onChange={(e) => handleProblemChange(index, 'code', e.target.value)}
                        className="w-full p-3 bg-gray-700/50 rounded-lg border border-purple-800/50 focus:border-purple-500 outline-none font-mono"
                        rows="4"
                      />
                      <textarea
                        placeholder="Expected Quantum Output"
                        value={problem.output}
                        onChange={(e) => handleProblemChange(index, 'output', e.target.value)}
                        className="w-full p-3 bg-gray-700/50 rounded-lg border border-purple-800/50 focus:border-purple-500 outline-none"
                        rows="2"
                      />
                    </div>
                  </motion.div>
                ))}

                <motion.button
                  type="button"
                  onClick={addProblemField}
                  whileHover={{ scale: 1.05 }}
                  className="w-full py-3 bg-purple-900/30 rounded-lg border border-purple-800/50 hover:border-purple-500 text-purple-300 transition-all"
                >
                  <FaPlus className="inline mr-2" />
                  Add Quantum Problem
                </motion.button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  className="py-3 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg font-bold shadow-lg shadow-purple-900/50"
                >
                  Create Challenge
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleCloseAdminPanel}
                  whileHover={{ scale: 1.05 }}
                  className="py-3 bg-gradient-to-br from-red-600 to-pink-700 rounded-lg font-bold shadow-lg shadow-red-900/50"
                >
                  Close Portal
                </motion.button>
              </div>
            </form>

            <div className="mt-12 pt-8 border-t border-purple-800/30">
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300 mb-6">
                Active Quantum Challenges
              </h3>
              <div className="space-y-4">
                {assignments.map(assignment => (
                  <motion.div 
                    key={assignment._id}
                    className="flex justify-between items-center bg-gray-700/30 p-4 rounded-lg border border-purple-800/30"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-purple-200">{assignment.title}</span>
                    <motion.button
                      onClick={() => handleDelete(assignment._id)}
                      whileHover={{ scale: 1.2 }}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <FaTrash className="text-lg" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

  
        {/* Footer */}
          <motion.footer 
                className="bg-gray-900/80 backdrop-blur-xl border-t border-purple-900/30 relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="container mx-auto px-4 py-12">
                  <div className="grid md:grid-cols-4 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-200 mb-4">DSA Labs</h3>
                      <p className="text-purple-300 text-sm">
                        Mastering algorithms through visual computing and interactive learning.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-purple-200 mb-4">Labs</h4>
                      <ul className="space-y-2">
                        {['Sorting', 'Graphs', 'Trees', 'Dynamic Programming'].map((item, i) => (
                          <li key={i}>
                            <Link to="/labs" className="text-purple-300 hover:text-pink-300 text-sm transition-colors">
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-purple-200 mb-4">Tools</h4>
                      <ul className="space-y-2">
                        {['Visualizer', 'Code Playground', 'Complexity Analyzer', 'Challenge Arena'].map((item, i) => (
                          <li key={i}>
                            <Link to="/tools" className="text-purple-300 hover:text-pink-300 text-sm transition-colors">
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-purple-200 mb-4">Connect</h4>
                      <div className="flex gap-4">
                        {['GitHub', 'Discord', 'Twitter', 'Blog'].map((item, i) => (
                          <motion.a
                            key={i}
                            href="#"
                            className="text-purple-300 hover:text-pink-300 text-sm"
                            whileHover={{ y: -2 }}
                          >
                            {item}
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 pt-8 border-t border-purple-900/20 text-center">
                    <p className="text-purple-400 text-sm">
                      © {new Date().getFullYear()} DSA Labs - Visual Algorithm Platform
                    </p>
                  </div>
                </div>
              </motion.footer>
      </div>
    </div>
  );
}