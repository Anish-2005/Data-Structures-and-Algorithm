import { useState, useRef, useEffect } from 'react';
import React from 'react'
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { FiAlertTriangle, FiClock, FiCpu, FiCode, FiChevronRight, FiMenu, FiLayers } from 'react-icons/fi';
import { TbTopologyStar3 } from 'react-icons/tb';
import { FaReact } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FiSearch, FiChevronDown, FiChevronUp, FiAlertCircle } from 'react-icons/fi';
import Footer from '../../components/Footer';
import AlgorithmSearch from './sections/AlgoCards';
import HolographicGrid from '../../components/HolographicGrid';
import QuantumParticles from '../../components/QuantumParticles';
import TechStackOrbit from '../../components/TechStackOrbit';
import Navbar from './sections/Navbar';

const ComplexityVisualizer = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [code, setCode] = useState('');
    const controls = useAnimation();
    const [searchQuery, setSearchQuery] = useState('');
    const containerRef = useRef(null);
    const { scrollY } = useScroll({ container: containerRef });
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);
    const y2 = useTransform(scrollY, [0, 500], [0, 50]);
    const [analysis, setAnalysis] = useState({
        timeComplexity: '',
        spaceComplexity: '',
        explanation: [],
        visualization: {}
    });

    const analyzeCode = () => {
        try {
            let timeComplexity = 'O(1)';
            let spaceComplexity = 'O(1)';
            let explanations = [];

            // Preprocess code to remove comments and strings
            const codeWithoutComments = code
                .replace(/\/\/.*/g, '')
                .replace(/\/\*[\s\S]*?\*\//g, '')
                .replace(/"(?:\\"|.)*?"/g, '')
                .replace(/'(?:\\'|.)'?/g, '');

            // Detect loops and their nesting depth
            const tokens = codeWithoutComments.match(/(\b(for|while)\b|{|}|})/g) || [];
            let depth = 0;
            const loopDepths = [];

            tokens.forEach(token => {
                if (token === '{') {
                    depth++;
                } else if (token === '}') {
                    depth = Math.max(depth - 1, 0);
                } else if (token === 'for' || token === 'while') {
                    loopDepths.push(depth);
                }
            });

            const maxLoopDepth = loopDepths.length > 0 ? Math.max(...loopDepths) : 0;
            const loopCount = loopDepths.length;

            // Calculate time complexity
            if (loopCount > 0) {
                const exponent = maxLoopDepth + 1;
                timeComplexity = exponent === 1 ? 'O(n)' : `O(n^${exponent})`;
                explanations.push(`${exponent} nested loop${exponent > 1 ? 's' : ''} detected`);
            }

            // Detect dynamic memory allocations or variable-length arrays
            const hasDynamicArrays = /(\w+)\s*\[\s*\w+\s*\]|(malloc|calloc)/.test(codeWithoutComments);
            if (hasDynamicArrays) {
                spaceComplexity = 'O(n)';
                explanations.push('Dynamic memory allocation or variable-length array detected');
            }

            // Detect variables
            const variableMatches = codeWithoutComments.match(/(int|float|double|char)\s+\w+/g) || [];
            const variableCount = variableMatches.length;
            if (variableCount > 0) {
                explanations.push(`${variableCount} variable${variableCount > 1 ? 's' : ''} declared`);
            }

            // Update analysis state
            setAnalysis({
                timeComplexity,
                spaceComplexity,
                explanation: explanations,
                visualization: {
                    worstCase: timeComplexity,
                    averageCase: timeComplexity,
                    bestCase: loopCount > 0 ? 'O(1)' : timeComplexity
                }
            });

            controls.start({ opacity: 1, y: 0 });
        } catch (error) {
            setAnalysis({
                error: true,
                message: `Analysis Error: ${error.message}`,
                timeComplexity: '',
                spaceComplexity: '',
                explanation: [],
                visualization: {}
            });
        }
    };

    const highlightCode = (code) => {
        return code
            .replace(/(\b(int|float|return|if|else|for|while|char|double|void)\b)/g, '<span class="text-purple-500 font-bold">$1</span>')
            .replace(/(#include\s+<[^>]+>)/g, '<span class="text-green-500">$1</span>')
            .replace(/(\b(malloc|calloc|free)\b)/g, '<span class="text-blue-400">$1</span>')
            .replace(/(\w+)\s*\(/g, '<span class="text-yellow-300">$1</span>(')
            .replace(/(\d+)/g, '<span class="text-orange-400">$1</span>');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/20 text-white overflow-x-hidden" ref={containerRef}>
            <QuantumParticles />
            <HolographicGrid />
            <TechStackOrbit />
            <Navbar />
            <main className="container mx-auto px-4 py-12 relative z-10">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="holographic-border rounded-3xl bg-gray-900/50 backdrop-blur-xl p-8">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300 mb-8">
                        <TbTopologyStar3 className="inline-block mr-4 -mt-2" />
                        Quantum Complexity Analyzer
                    </h1>

                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        {/* Fixed Code Editor Section */}
                        <div className="relative rounded-xl border border-purple-800/50 overflow-hidden">
                            <div className="relative h-96 bg-zinc-900">
                                <div className="h-full relative code-editor-container">
                                    <textarea
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        className="absolute top-0 left-0 w-full h-full p-4 font-mono text-sm text-white caret-pink-400 bg-transparent outline-none resize-none z-10 whitespace-pre-wrap break-words"
                                        placeholder="Enter your code here..."
                                        spellCheck="false"
                                        style={{
                                            whiteSpace: "pre-wrap",
                                            overflowWrap: "break-word",
                                            overflow: "auto",
                                            WebkitOverflowScrolling: "touch"
                                        }}
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={analyzeCode}
                                className="absolute bottom-4 right-4 px-6 py-3 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg font-semibold flex items-center gap-2 text-white shadow-lg z-20"
                            >
                                <FiCode /> Analyze
                            </motion.button>
                        </div>


                        {/* Fixed Results Section */}
                        <div className="relative rounded-xl border border-purple-800/50 bg-gray-900 p-6 h-96 flex flex-col">
                            {analysis.error ? (
                                <div className="text-pink-400 text-center p-4 flex-1 flex items-center justify-center">
                                    ⚠️ {analysis.message || 'Error analyzing code'}
                                </div>
                            ) : analysis.timeComplexity ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={controls}
                                    className="flex-1 overflow-auto"
                                >
                                    <div className="space-y-8">
                                        <div className="flex gap-8 mb-8">
                                            <div className="flex-1 p-6 bg-purple-900/30 rounded-xl">
                                                <h3 className="text-pink-400 mb-4 flex items-center gap-2">
                                                    <FiClock /> Time Complexity
                                                </h3>
                                                <div className="text-4xl font-bold text-purple-300">
                                                    {analysis.timeComplexity}
                                                </div>
                                            </div>
                                            <div className="flex-1 p-6 bg-purple-900/30 rounded-xl">
                                                <h3 className="text-pink-400 mb-4 flex items-center gap-2">
                                                    <FiCpu /> Space Complexity
                                                </h3>
                                                <div className="text-4xl font-bold text-purple-300">
                                                    {analysis.spaceComplexity}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="text-xl text-purple-200 flex items-center gap-2">
                                                <FiAlertTriangle /> Breakdown
                                            </h4>
                                            <div className="space-y-2">
                                                {analysis.explanation.map((point, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="flex items-center gap-3 text-purple-100"
                                                        initial={{ x: -20 }}
                                                        animate={{ x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                    >
                                                        <FiChevronRight className="text-pink-400" />
                                                        {point}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-8 p-6 bg-black/20 rounded-xl">
                                            <h4 className="text-purple-200 mb-4">Growth Patterns</h4>
                                            <div className="flex gap-4 text-center">
                                                {Object.entries(analysis.visualization).map(([key, value]) => (
                                                    <div key={key} className="flex-1 p-4 bg-purple-900/30 rounded-lg">
                                                        <div className="text-sm text-pink-300 mb-2">{key}</div>
                                                        <div className="text-xl font-mono text-purple-300">{value}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="flex-1 flex items-center justify-center text-purple-400/30">
                                    <div className="animate-pulse">Analysis results will appear here</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Algorithm Reference Cards */}
                   <AlgorithmSearch />
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default ComplexityVisualizer;