import { motion } from 'framer-motion';
import { FiChevronRight,FiLayers,FiTrendingUp,FiCode,FiBookOpen,FiZap,FiBox,FiShare2,FiCpu,FiActivity } from 'react-icons/fi';
import React from 'react';

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

const FeatureCards = () => {
  return (
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
  );
};

export default FeatureCards;
