import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  FaProjectDiagram, FaCodeBranch, FaSort, FaSitemap, FaBookOpen, FaHome, FaTimes, FaClipboard,
  FaTrash, FaPlus, FaLock, FaRegChartBar, FaCode, FaBrain, FaUbuntu, FaReact, FaPython, FaGitAlt, FaDocker,
  FaSearch, FaEdit, FaSave
} from 'react-icons/fa';
import {
  FiCode, FiHome, FiLock, FiX, FiClipboard, FiChevronRight, FiLayers, FiZap, FiMenu
} from 'react-icons/fi';
import {
  MdScience, MdOutlineSecurity, MdAutoGraph, MdOutlineDeveloperMode, MdQueue
} from 'react-icons/md';
import {
  AiOutlineBug, AiOutlineCloud, AiOutlineDatabase
} from 'react-icons/ai';
import {
  BsFillLightningChargeFill, BsTerminalFill, BsFillGearFill
} from 'react-icons/bs';
import {
  IoRocketOutline, IoAnalyticsSharp
} from 'react-icons/io5';
import {
  RiJavascriptFill, RiNodejsFill, RiCodeSSlashFill
} from 'react-icons/ri';
import {
  TbBrandVscode, TbBrandNextjs
} from 'react-icons/tb';
import {
  SiTypescript, SiMongodb, SiTailwindcss, SiFramer, SiVite, SiPostgresql
} from 'react-icons/si';
import Navbar from './sections/Navbar';
import HolographicGrid from '../../components/HolographicGrid';
import QuantumParticles from '../../components/QuantumParticles';
import Footer from '../../components/Footer';
import HeroSection from './sections/HeroSection';
import TechStackOrbit from '../../components/TechStackOrbit';
import LabsSection from './sections/LabsSection';

const iconComponents = {
  // FontAwesome
  FaProjectDiagram, FaCodeBranch, FaSort, FaSitemap, FaBookOpen, FaHome, FaTimes, FaClipboard,
  FaTrash, FaPlus, FaLock, FaRegChartBar, FaCode, FaBrain, FaUbuntu, FaReact, FaPython, FaGitAlt, FaDocker, FaSearch, FaEdit, FaSave,
  // Feather
  FiCode, FiHome, FiLock, FiX, FiClipboard, FiChevronRight, FiLayers, FiZap, FiMenu,
  // Material Design
  MdScience, MdOutlineSecurity, MdAutoGraph, MdOutlineDeveloperMode, MdQueue,
  // Ant Design
  AiOutlineBug, AiOutlineCloud, AiOutlineDatabase,
  // Bootstrap
  BsFillLightningChargeFill, BsTerminalFill, BsFillGearFill,
  // Ionicons
  IoRocketOutline, IoAnalyticsSharp,
  // Remix Icons
  RiJavascriptFill, RiNodejsFill, RiCodeSSlashFill,
  // Tabler
  TbBrandVscode, TbBrandNextjs,
  // Simple Icons (brands)
  SiTypescript, SiMongodb, SiTailwindcss, SiFramer, SiVite, SiPostgresql
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
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const HARDCODED_PIN = import.meta.env.VITE_ADMIN_PIN;

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 50]);

  const navigate = useNavigate();
  const abortController = new AbortController();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/api/dsa-assignments`, {
          signal: abortController.signal
        });


        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error(`Server returned HTML instead of JSON: ${text.substring(0, 100)}`);
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json();

        const formatted = data.map(a => ({
          ...a,
        }));

        setAssignments(formatted);
        setError(null);
      } catch (err) {
        if (!abortController.signal.aborted) {
          console.error('Fetch error:', err);
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
  }, []);

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
    setEditingAssignment(null);
    setEditMode(false);
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
      const submissionData = {
        ...formData,
        // Ensure icon is saved as a string identifier
        icon: typeof formData.icon === 'string' ? formData.icon : 'FaRegChartBar'
      };
      let response;
      if (editMode && editingAssignment) {
        response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/api/dsa-assignments/${editingAssignment._id}/full`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionData), // Use the prepared data
        });
      } else {
        response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/api/dsa-assignments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(submissionData), // Use the prepared data
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { data } = await response.json();

      // Update state with the new/updated assignment
      if (editMode) {
        setAssignments(prev => prev.map(a =>
          a._id === data._id ? {
            ...data,
            icon: iconComponents[data.icon] || FaRegChartBar, // Map icon string to component
          } : a
        ));
      } else {
        setAssignments(prev => [{
          ...data,
          icon: iconComponents[data.icon] || FaRegChartBar, // Map icon string to component
        }, ...prev]);
      }

      handleCloseAdminPanel();
    } catch (error) {
      console.error('Error submitting challenge:', error);
      // Consider adding user feedback here
      // setError(error.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_APP_BACKEND}/api/dsa-assignments/${id}`, { method: 'DELETE' });
      setAssignments(prev => prev.filter(a => a._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);
    setEditMode(true);
    setFormData({
      title: assignment.title,
       icon: Object.keys(iconComponents).find(key => iconComponents[key] === assignment.icon) || 'FiTerminal',
      problems: assignment.problems.map(p => ({
        question: p.question,
        code: p.code,
        output: p.output
      }))
    });
    setShowAdminPanel(true);
    setPinVerified(true);
  };

  const removeProblem = (index) => {
    setFormData(prev => ({
      ...prev,
      problems: prev.problems.filter((_, i) => i !== index)
    }));
  };

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
      <QuantumParticles />
      <HolographicGrid />
      <TechStackOrbit />
      <Navbar />

      <div className="container mx-auto pt-16 px-0 relative z-10">
        <HeroSection />

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
                // Safely get the icon component - fallback to FaRegChartBar if not found
                const IconComponent = typeof assignment.icon === 'string'
                  ? iconComponents[assignment.icon] || FaRegChartBar
                  : FaRegChartBar;

                return (
                  <motion.div
                    key={assignment._id}
                    className="group relative h-full"
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { type: "spring", stiffness: 300 }
                      }
                    }}
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
                      {selectedAssignment.icon && typeof selectedAssignment.icon === 'string' && iconComponents[selectedAssignment.icon] ? (
                        React.createElement(iconComponents[selectedAssignment.icon])
                      ) : (
                        <FaRegChartBar />
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
                    {editMode ? 'Edit Quantum Challenge' : 'Quantum Admin Panel'}
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
                        <textarea
                          placeholder="Enter Quantum Challenge Name"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full p-3 bg-gray-700/50 rounded-lg border border-purple-800/50 focus:border-purple-500 outline-none resize-none"
                          rows="2"
                        />
                      </div>

                      <div className="space-y-4">
                        <label className="text-sm font-medium text-purple-300">Holographic Icon</label>
                        <select
                          value={formData.icon}
                          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
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
                                  onClick={() => removeProblem(index)}
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
                          className="py-3 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg font-bold shadow-lg shadow-purple-900/50 flex items-center justify-center gap-2"
                        >
                          {editMode ? (
                            <>
                              <FaSave /> Save Changes
                            </>
                          ) : (
                            <>
                              <FaPlus /> Create Challenge
                            </>
                          )}
                        </motion.button>
                        <motion.button
                          type="button"
                          onClick={handleCloseAdminPanel}
                          whileHover={{ scale: 1.05 }}
                          className="py-3 bg-gradient-to-br from-red-600 to-pink-700 rounded-lg font-bold shadow-lg shadow-red-900/50"
                        >
                          Cancel
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
                            <div className="flex gap-2">
                              <motion.button
                                onClick={() => handleEdit(assignment)}
                                whileHover={{ scale: 1.2 }}
                                className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                                title="Edit"
                              >
                                <FaEdit className="text-lg" />
                              </motion.button>
                              <motion.button
                                onClick={() => handleDelete(assignment._id)}
                                whileHover={{ scale: 1.2 }}
                                className="p-2 text-red-400 hover:text-red-300 transition-colors"
                                title="Delete"
                              >
                                <FaTrash className="text-lg" />
                              </motion.button>
                            </div>
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

        <Footer />
      </div>
    </div>
  );
}