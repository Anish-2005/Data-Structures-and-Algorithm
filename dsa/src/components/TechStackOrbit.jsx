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
  SiIntellijidea, SiXcode, SiWebpack, SiVite,
  SiBabel, SiJest, SiCypress,
} from 'react-icons/si';

const iconPool = [
  FaReact, FaNodeJs, FaPython, FaAws, FaDocker, FaGitAlt,
  FaHtml5, FaCss3Alt, FaPhp, FaLaravel, FaJava, FaRust, FaAngular,
  FaVuejs, FaSwift, FaAndroid, FaApple, FaLinux,
  SiTypescript, SiGraphql, SiPostgresql, SiKubernetes, SiRedis,
  SiMongodb, SiMysql, SiFirebase, SiGo, SiDotnet , SiDotnet, SiNextdotjs,
  SiTailwindcss, SiSvelte, SiRedux, SiJquery, SiRubyonrails, SiSpring,
  SiIntellijidea, SiXcode, SiWebpack, SiVite,
  SiBabel, SiJest, SiCypress,
];

const generateLayer = (count) => {
    return Array.from({ length: count }).map(() => ({
      speed: 16 + Math.random() * 2, // Slower speed for smooth floating
      xDirection: Math.random() > 0.5 ? 1 : -1, // Random horizontal direction
      yDirection: Math.random() > 0.5 ? 1 : -1, // Random vertical direction
      icon: iconPool[Math.floor(Math.random() * iconPool.length)],
      size: ['text-xl', 'text-lg', 'text-sm'][Math.floor(Math.random() * 3)],
      color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 70%)`,
      randomX: Math.random() * window.innerWidth, // Random x position within the screen width
      randomY: Math.random() * window.innerHeight // Random y position within the screen height
    }));
  };
  
  const TechStackOrbit = () => {
    const layers = [
      ...generateLayer(10), // Reduced number of particles
      ...generateLayer(8),  // Reduced number of particles
      ...generateLayer(5)   // Reduced number of particles
    ];
  
    return (
      <motion.div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {layers.map((particle, i) => {
          return (
            <motion.div
              key={i}
              className="absolute will-change-transform"
              style={{
                left: `${particle.randomX}px`, // Set random X position
                top: `${particle.randomY}px`, // Set random Y position
                color: particle.color,
                opacity: 0.35
              }}
              animate={{
                x: [particle.randomX, particle.randomX + particle.xDirection * 100], // Move slowly within the screen width
                y: [particle.randomY, particle.randomY + particle.yDirection * 100], // Move slowly within the screen height
                rotate: [0, Math.random() * 360], // Optional: Add some random rotation to give a more dynamic look
                scale: [1, 0.9, 1.1] // Optional: Subtle scaling effect
              }}
              transition={{
                duration: particle.speed, // Slow movement speed
                repeat: Infinity, // Continuous movement
                ease: 'easeInOut', // Smooth easing for better floating feel
                repeatType: 'mirror' // Make sure the motion reverses for smooth back-and-forth
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