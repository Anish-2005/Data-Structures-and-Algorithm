import React, { useRef,useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValueEvent, useAnimation } from 'framer-motion';
import { FiCode, FiBookOpen, FiLayers, FiTrendingUp, FiChevronRight, FiCpu, FiZap, FiCloud, FiDatabase
,  FiBox, FiShare2,FiActivity,FiMenu
 } from 'react-icons/fi';
import { FaUbuntu, FaReact } from 'react-icons/fa';
import { TbTopologyStar3 } from 'react-icons/tb';

const Landing = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const containerRef = useRef(null);
  const controls = useAnimation();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 50]);


  
  // Complex particle animation
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

  // Holographic grid background
  const HolographicGrid = () => (
    <motion.div 
      className="fixed inset-0 opacity-5 pointer-events-none z-0"
      style={{ y: y2 }}
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

  // Floating tech stack icons
  const TechStackOrbit = () => {
    const icons = [FaReact, FiCloud, FiDatabase, TbTopologyStar3];
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64">
        {icons.map((Icon, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl text-purple-300"
            animate={{
              rotate: [0, 360],
              x: [0, Math.sin((i * Math.PI)/2) * 120, 0],
              y: [0, Math.cos((i * Math.PI)/2) * 120, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 8 + i*2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <Icon className="text-purple-400/30 hover:text-pink-400 transition-colors" />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/20 text-white overflow-x-hidden"
      ref={containerRef}
    >
      {/* Background elements */}
      <QuantumParticles />
      <HolographicGrid />
      <TechStackOrbit />
      
      

      {/* Navigation */}
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
          DSA Labs
          <span className="text-purple-400 text-sm ml-2 font-normal">v2.0</span>
        </h1>
      </Link>
      <div className="absolute -inset-2 bg-purple-500/10 rounded-xl blur-xl -z-10" />
    </motion.div>

    {/* Hamburger Menu for Mobile */}
    <div className="lg:hidden">
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)} // Assuming you manage this state
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


      {/* Hero Section */}
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
{/* Start Learning Section */}
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
        <button className="relative inline-flex items-center justify-center px-8 py-4 font-semibold text-lg text-white bg-gradient-to-br from-pink-600 to-purple-700 rounded-full shadow-xl hover:scale-105 transition-all duration-300 group">
          <span className="absolute inset-0 bg-white opacity-10 rounded-full blur-md group-hover:opacity-20 transition" />
          <span className="relative z-10">🚀 Start Learning</span>
        </button>
      </div>

      {/* Animated Matrix Side */}
   {/* Animated Data Structure Graphic Side */}
<div className="flex-1 relative min-h-[400px]">
  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/10 rounded-2xl border border-purple-800/40 overflow-hidden">
    {/* Graph with glowing nodes and lines */}
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

      {/* Glowing Connections/Edges */}
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
      
      {/* Add animated background grid */}
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




      {/* Holographic Feature Cards */}
      <motion.section 
        className="container mx-auto py-24 px-4 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="holographic-card p-8 rounded-3xl border border-purple-800/50 backdrop-blur-xl relative overflow-hidden"
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-[conic-gradient(from_230.29deg_at_51.3%_52%,_rgba(168,85,247,0.2)_0deg,_rgba(236,72,153,0.8)_180deg)] opacity-30" />
              <div className="relative z-10">
                <div className="mb-6">
                  <motion.div
                    className="p-4 rounded-2xl bg-purple-900/50 inline-block"
                    animate={{ rotate: [0, 10, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  >
                    {feature.icon}
                  </motion.div>
                </div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300 mb-4">
                  {feature.title}
                </h3>
                <p className="text-purple-200">{feature.description}</p>
                <motion.div
                  className="mt-6 flex items-center gap-2 text-pink-300 cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  <span>Explore</span>
                  <FiChevronRight className="transition-transform" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 3D Code Galaxy */}
      <motion.section 
        className="container mx-auto py-24 px-4 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="code-galaxy rounded-[3rem] border-2 border-purple-800/50 bg-gray-900/50 backdrop-blur-2xl p-12">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300 mb-6">
                Quantum Code Playground
              </h2>
              <p className="text-purple-200 mb-8">
                Experience code visualization in 4D space with real-time complexity analysis and AI-powered optimization suggestions.
              </p>
              <div className="space-y-4">
                {['Multi-language Support', 'Real-time Collaboration', 'AI Pair Programmer', 'Holographic Debugging'].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3 text-purple-100"
                    whileHover={{ x: 5 }}
                  >
                    <div className="w-2 h-2 bg-pink-400 rounded-full" />
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 relative min-h-[400px]">
              {/* Animated code matrix */}
              <div className="absolute inset-0 bg-purple-900/20 rounded-2xl border border-purple-800/50">
                {[...Array(50)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-purple-400/20 font-mono text-xs"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      y: [0, -100],
                      x: [0, (Math.random() - 0.5) * 50],
                    }}
                    transition={{
                      duration: Math.random() * 10 + 5,
                      repeat: Infinity,
                    }}
                  >
                    {Math.random() > 0.5 ? '0x' : '1x'}{Math.floor(Math.random() * 10000).toString(16)}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

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
  );
};

const features = [
    {
      icon: <FiLayers className="text-pink-400" />,
      title: "3D Visualizations",
      description: "Interactive 3D representations of complex data structures"
    },
    {
      icon: <FiTrendingUp className="text-purple-400" />,
      title: "Complexity Analysis",
      description: "Real-time Big-O notation tracking with execution metrics"
    },
    {
      icon: <FiCode className="text-pink-400" />,
      title: "Code Playground",
      description: "WebAssembly-powered execution environment with debugger"
    },
    {
      icon: <FiBookOpen className="text-purple-400" />,
      title: "AI Tutor",
      description: "Context-aware hints and optimization suggestions"
    },
    {
      icon: <FiZap className="text-pink-400" />,
      title: "Instant Execution",
      description: "Lightning-fast compilation and output across languages"
    },
    {
      icon: <FiBox className="text-purple-400" />,
      title: "Modular Design",
      description: "Plug-and-play architecture for learning algorithms by blocks"
    },
    {
      icon: <FiShare2 className="text-pink-400" />,
      title: "Live Collaboration",
      description: "Code and visualize together in real-time with peers"
    },
    {
      icon: <FiCpu className="text-purple-400" />,
      title: "Hardware Insights",
      description: "Simulate hardware-level execution for system-level learning"
    },
    {
      icon: <FiActivity className="text-pink-400" />,
      title: "Performance Metrics",
      description: "Track memory usage, execution steps, and I/O throughput"
    }
  ];

export default Landing;