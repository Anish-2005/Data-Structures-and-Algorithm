import React from 'react';
import { motion } from 'framer-motion';
import {
  FaReact, FaNodeJs, FaPython, FaAws, FaDocker, FaGitAlt,
  FaHtml5, FaCss3Alt, FaPhp, FaLaravel, FaJava, FaRust, FaAngular,
  FaVuejs, FaSwift, FaAndroid, FaApple, FaLinux
} from 'react-icons/fa';
import {
  SiTypescript, SiGraphql, SiPostgresql, SiKubernetes, SiRedis,
  SiMongodb, SiMysql, SiFirebase, SiGo, SiDotnet , SiNextdotjs,
  SiTailwindcss, SiSvelte, SiRedux, SiJquery, SiRubyonrails, SiSpring,
  SiIntellijidea, SiXcode, SiWebpack, SiVite, SiBabel, SiJest, SiCypress
} from 'react-icons/si';
import { FiCloud, FiDatabase } from 'react-icons/fi';
import { VscCircuitBoard } from 'react-icons/vsc';

const iconPool = [
  FaReact, FaNodeJs, FaPython, FaAws, FaDocker, FaGitAlt,
  FaHtml5, FaCss3Alt, FaPhp, FaLaravel, FaJava, FaRust, FaAngular,
  FaVuejs, FaSwift, FaAndroid, FaApple, FaLinux,
  SiTypescript, SiGraphql, SiPostgresql, SiKubernetes, SiRedis,
  SiMongodb, SiMysql, SiFirebase, SiGo, SiDotnet , SiDotnet, SiNextdotjs,
  SiTailwindcss, SiSvelte, SiRedux, SiJquery, SiRubyonrails, SiSpring,
  SiIntellijidea, SiXcode, SiWebpack, SiVite,
  SiBabel, SiJest, SiCypress, FiCloud, FiDatabase
];

const generateLayer = (count, radius, speedVariation) => {
  return Array.from({ length: count }).map(() => ({
    radius: radius * (1.2 + Math.random()), // More spread
    speed: 200 + Math.random() * speedVariation, // Slow down speed
    angle: Math.random() * Math.PI * 2,
    scale: 0.6 + Math.random() * 0.4,
    icon: iconPool[Math.floor(Math.random() * iconPool.length)],
    size: ['text-2xl', 'text-xl', 'text-lg'][Math.floor(Math.random() * 3)],
    color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`
  }));
};

const TechStackOrbit = () => {
  const layers = [
    ...generateLayer(20, 900, 5),
    ...generateLayer(15, 600, 5),
    ...generateLayer(10, 300, 5)
  ];

  return (
    <motion.div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" initial="hidden" animate="visible">
      {layers.map((particle, i) => {
        const initialAngle = particle.angle;

        return (
          <motion.div
            key={i}
            className="absolute will-change-transform"
            style={{
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%',
              color: particle.color,
              opacity: 0.35
            }}
            variants={{
              hidden: { scale: 0 },
              visible: {
                scale: particle.scale,
                transition: {
                  delay: Math.random(),
                  type: 'spring',
                  stiffness: 50
                }
              }
            }}
            animate={{
              x: [
                Math.cos(initialAngle) * particle.radius,
                Math.cos(initialAngle + Math.PI) * particle.radius * 0.8,
                Math.cos(initialAngle + Math.PI * 2) * particle.radius
              ],
              y: [
                Math.sin(initialAngle) * particle.radius,
                Math.sin(initialAngle + Math.PI) * particle.radius * 0.8,
                Math.sin(initialAngle + Math.PI * 2) * particle.radius
              ],
              rotate: [0, Math.random() * 360],
              scale: [1, 0.9, 1.1]
            }}
            transition={{
              duration: particle.speed,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatType: 'mirror'
            }}
          >
            <particle.icon className={`${particle.size} transition-opacity hover:opacity-100 hover:drop-shadow-lg`} />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default TechStackOrbit;
