import React from 'react';
import { motion } from 'framer-motion';
import { FaRegChartBar } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';

const LabsSection = ({ assignments = [], iconComponents, setSelectedAssignment, setIsPopupOpen }) => {
  return (
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
          {assignments.length > 0 ? (
            assignments.map((assignment) => {
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
            })
          ) : (
            <p className="text-center text-purple-300">No assignments available.</p>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LabsSection;
