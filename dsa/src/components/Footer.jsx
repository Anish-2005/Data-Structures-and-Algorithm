import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
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
            © {currentYear} DSA Labs - Visual Algorithm Platform
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
