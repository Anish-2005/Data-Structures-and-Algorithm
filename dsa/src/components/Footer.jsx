import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import React from 'react';
import { FiGithub, FiTwitter, FiCode, FiCpu, FiBookOpen, FiMessageSquare,FiLinkedin,FiYoutube,FiMessageCircle,FiRss } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const links = [
    {
      title: "Labs",
      items: [
        { name: "Sorting", icon: <FiCode className="w-4 h-4" />, link: "/learn" },
        { name: "Graphs", icon: <FiCpu className="w-4 h-4" />, link: "/learn" },
        { name: "Trees", icon: <FiBookOpen className="w-4 h-4" />, link: "/learn" },
        { name: "Dynamic Programming", icon: <FiMessageSquare className="w-4 h-4" />, link: "/learn" },
      ]
    },
    {
      title: "Tools",
      items: [
        { name: "Visualizer", icon: <FiCode className="w-4 h-4" />, link: "/visualizer" },
        { name: "Code Playground", icon: <FiCpu className="w-4 h-4" />, link: "/compiler" },
        { name: "Complexity Analyzer", icon: <FiBookOpen className="w-4 h-4" />, link: "/visualizer" },
        { name: "Challenge Arena", icon: <FiMessageSquare className="w-4 h-4" />, link: "/tlabs" },
      ]
    }
  ];

  const socials = [
    {
      icon: <FiGithub className="hover:scale-110 transition-transform" />,
      link: "#",
      name: "GitHub"
    },
    {
      icon: <FiTwitter className="hover:scale-110 transition-transform" />,
      link: "#",
      name: "Twitter"
    },
    {
      icon: <FiLinkedin className="hover:scale-110 transition-transform" />,
      link: "#",
      name: "LinkedIn"
    },
    {
      icon: <FiYoutube className="hover:scale-110 transition-transform" />,
      link: "#",
      name: "YouTube"
    },
    {
      icon: <FiMessageCircle className="hover:scale-110 transition-transform" />,
      link: "#",
      name: "Discord"
    },
    {
      icon: <FiRss className="hover:scale-110 transition-transform" />,
      link: "#",
      name: "Blog"
    },
  ];
  return (
    <motion.footer 
    className="bg-gray-900/80 backdrop-blur-xl border-t border-purple-900/30 relative z-10"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="space-y-6">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400 text-2xl font-bold">
              DSA Labs
            </h3>
            <p className="text-purple-300 text-sm leading-relaxed max-w-xs">
              Transforming algorithm education through immersive visual computing and interactive learning experiences.
            </p>
          </div>

          {links.map((section, index) => (
            <div key={index} className="space-y-6">
              <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400 text-lg font-semibold">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link
                        to={item.link}
                        className="flex items-center gap-3 text-purple-200 hover:text-pink-200 transition-colors group"
                      >
                        <span className="text-pink-300 opacity-80 group-hover:opacity-100 transition-opacity">
                          {item.icon}
                        </span>
                        <span className="text-sm">{item.name}</span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-12 border-t border-purple-900/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center gap-4">
              {socials.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  className="group relative p-3 rounded-lg hover:bg-purple-900/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <span className="text-2xl text-purple-300 hover:text-pink-300 transition-colors">
                    {social.icon}
                  </span>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-900/80 text-pink-200 px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    {social.name}
                  </span>
                </motion.a>
              ))}
            </div>
            <p className="text-purple-400 text-sm text-center md:text-right">
              © {currentYear} DSA Labs<br className="md:hidden" />
              <span className="hidden md:inline"> - </span>
              Visual Algorithm Platform
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;