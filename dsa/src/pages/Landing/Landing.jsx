import React, { useRef } from 'react';
import HolographicGrid from '../../components/HolographicGrid';
import QuantumParticles from '../../components/QuantumParticles';
import TechStackOrbit from '../../components/TechStackOrbit';
import Learn from './sections/Learn';
import HeroSection from './sections/HeroSection';
import Navbar from './sections/Navbar';
import QuantumCompiler from './sections/QuantumCompiler';
import FeatureCards from './sections/FeatureCard';
import ThreeDCodeGalaxy from './sections/ThreeDCodeGalaxy';
import Footer from '../../components/Footer';

const Landing = () => {

  const containerRef = useRef(null);

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
      <Navbar />
      {/* Hero Section */}
      <HeroSection />
      {/* Start Learning Section */}
      <Learn />
      {/* Quantum Compiler CTA Section */}
      <QuantumCompiler />
      {/* Holographic Feature Cards */}
      <FeatureCards />
      {/* 3D Code Galaxy */}
      <ThreeDCodeGalaxy />
      {/*Footer*/}
      \<Footer />
    </div>
  );
};
export default Landing;