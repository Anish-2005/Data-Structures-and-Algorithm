import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DSALanding from './pages/Landing/Landing';
import Labs from './pages/Labs/Labs';
import Visualizer from './pages/Visualizer/Visualizer';
import Compiler from './pages/Compiler/Compiler';
import Learn from './pages/Learn/Learn';
import ChatBot from './pages/Chatbot/Chatbot';
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Navigation can be added here if it's shared across all pages */}
        <ChatBot />
        <main className="flex-grow relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  <PageTransition>
                    <DSALanding />
                  </PageTransition>
                } 
              />
             <Route 
                path="/labs" 
                element={
                  <PageTransition>
                    <Labs />
                  </PageTransition>
                } 
              />
             <Route 
                path="/visualizer" 
                element={
                  <PageTransition>
                    <Visualizer />
                  </PageTransition>
                } 
              />
               <Route 
                path="/compiler" 
                element={
                  <PageTransition>
                    <Compiler />
                  </PageTransition>
                } 
              />
               <Route 
                path="/learn" 
                element={
                  <PageTransition>
                    <Learn />
                  </PageTransition>
                } 
              />
            </Routes>
          </AnimatePresence>
        </main>
        
        {/* Footer can be added here if it's shared across all pages */}
      </div>
    </Router>
  );
}

export default App;