import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiClock, FiCpu, FiChevronDown, FiChevronUp, FiAlertCircle } from 'react-icons/fi';

const AlgorithmSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAlgorithms, setFilteredAlgorithms] = useState([]);
  const [visibleAlgorithms, setVisibleAlgorithms] = useState(6);

    const algorithms = [
          { name: 'Bubble Sort', time: 'O(n²)', space: 'O(1)', category: 'Sorting' },
          { name: 'Insertion Sort', time: 'O(n²)', space: 'O(1)', category: 'Sorting' },
          { name: 'Selection Sort', time: 'O(n²)', space: 'O(1)', category: 'Sorting' },
          { name: 'Merge Sort', time: 'O(n log n)', space: 'O(n)', category: 'Sorting' },
          { name: 'Quick Sort', time: 'O(n log n) avg', space: 'O(log n)', category: 'Sorting' },
          { name: 'Heap Sort', time: 'O(n log n)', space: 'O(1)', category: 'Sorting' },
          { name: 'Tim Sort', time: 'O(n log n)', space: 'O(n)', category: 'Sorting' },
          { name: 'Radix Sort', time: 'O(nk)', space: 'O(n + k)', category: 'Sorting' },
          { name: 'Bucket Sort', time: 'O(n²)', space: 'O(n)', category: 'Sorting' },
          { name: 'Counting Sort', time: 'O(n + k)', space: 'O(n + k)', category: 'Sorting' },
          { name: 'Binary Search', time: 'O(log n)', space: 'O(1)', category: 'Searching' },
          { name: 'Linear Search', time: 'O(n)', space: 'O(1)', category: 'Searching' },
          { name: 'Depth-First Search', time: 'O(V + E)', space: 'O(V)', category: 'Graph' },
          { name: 'Breadth-First Search', time: 'O(V + E)', space: 'O(V)', category: 'Graph' },
          { name: 'Ternary Search', time: 'O(log₃n)', space: 'O(1)', category: 'Searching' },
          { name: 'Interpolation Search', time: 'O(log log n) avg', space: 'O(1)', category: 'Searching' },
          { name: "Dijkstra's", time: 'O((V + E) log V)', space: 'O(V)', category: 'Graph' },
          { name: 'A* Search', time: 'O(b^d)', space: 'O(b^d)', category: 'Graph' },
          { name: 'Bellman-Ford', time: 'O(VE)', space: 'O(V)', category: 'Graph' },
          { name: 'Floyd-Warshall', time: 'O(V³)', space: 'O(V²)', category: 'Graph' },
          { name: 'Kruskal\'s', time: 'O(E log E)', space: 'O(E)', category: 'Graph' },
          { name: 'Prim\'s', time: 'O(E log V)', space: 'O(V)', category: 'Graph' },
          { name: 'Topological Sort', time: 'O(V + E)', space: 'O(V)', category: 'Graph' },
          { name: 'Tarjan\'s SCC', time: 'O(V + E)', space: 'O(V)', category: 'Graph' },
          { name: 'Ford-Fulkerson', time: 'O(E * max_flow)', space: 'O(V²)', category: 'Graph' },
          { name: 'Knuth-Morris-Pratt', time: 'O(n + m)', space: 'O(m)', category: 'String' },
          { name: 'Boyer-Moore', time: 'O(nm) worst', space: 'O(m)', category: 'String' },
          { name: 'Rabin-Karp', time: 'O(n + m) avg', space: 'O(1)', category: 'String' },
          { name: 'Levenshtein Distance', time: 'O(nm)', space: 'O(nm)', category: 'String' },
          { name: 'Longest Common Subsequence', time: 'O(nm)', space: 'O(nm)', category: 'String' },
          { name: 'Suffix Array', time: 'O(n log n)', space: 'O(n)', category: 'String' },
          { name: 'Burrows-Wheeler', time: 'O(n)', space: 'O(n)', category: 'String' },
          { name: 'Euclidean GCD', time: 'O(log min(a,b))', space: 'O(1)', category: 'Numerical' },
          { name: 'Fast Fourier Transform', time: 'O(n log n)', space: 'O(n)', category: 'Numerical' },
          { name: 'Miller-Rabin Primality', time: 'O(k log³n)', space: 'O(1)', category: 'Numerical' },
          { name: 'Sieve of Eratosthenes', time: 'O(n log log n)', space: 'O(n)', category: 'Numerical' },
          { name: 'Newton-Raphson', time: 'O(k)', space: 'O(1)', category: 'Numerical' },
          { name: 'Monte Carlo', time: 'O(k)', space: 'O(1)', category: 'Numerical' },
          { name: 'Backpropagation', time: 'O(n)', space: 'O(n)', category: 'ML' },
          { name: 'k-NN', time: 'O(n)', space: 'O(n)', category: 'ML' },
          { name: 'k-Means', time: 'O(nkdi)', space: 'O(n + k)', category: 'ML' },
          { name: 'PageRank', time: 'O(ni)', space: 'O(n)', category: 'ML' },
          { name: 'HMM Viterbi', time: 'O(nT²)', space: 'O(nT)', category: 'ML' },
          { name: 'Apriori', time: 'O(2ⁿ)', space: 'O(n)', category: 'ML' },
          { name: 'RSA', time: 'O(k³)', space: 'O(k)', category: 'Crypto' },
          { name: 'SHA-256', time: 'O(n)', space: 'O(1)', category: 'Crypto' },
          { name: 'AES', time: 'O(n)', space: 'O(1)', category: 'Crypto' },
          { name: 'Diffie-Hellman', time: 'O(k²)', space: 'O(k)', category: 'Crypto' },
          { name: 'Elliptic Curve', time: 'O(k²)', space: 'O(k)', category: 'Crypto' },
          { name: 'Strassen Matrix', time: 'O(n^2.8074)', space: 'O(n²)', category: 'Advanced' },
          { name: 'Cooley-Tukey FFT', time: 'O(n log n)', space: 'O(n)', category: 'Advanced' },
          { name: 'Karatsuba', time: 'O(n^1.585)', space: 'O(n)', category: 'Advanced' },
          { name: 'Simplex', time: 'Exponential', space: 'O(mn)', category: 'Advanced' },
          { name: 'Quantum Shor\'s', time: 'O((log n)^3)', space: 'O(log n)', category: 'Quantum' },
          { name: 'Grover\'s', time: 'O(√n)', space: 'O(n)', category: 'Quantum' },
          { name: 'Hash Table Lookup', time: 'O(1) avg', space: 'O(n)', category: 'Data Structures' },
          { name: 'Bloom Filter', time: 'O(k)', space: 'O(m)', category: 'Data Structures' },
          { name: 'B-Tree Search', time: 'O(log n)', space: 'O(1)', category: 'Data Structures' },
          { name: 'Skip List Search', time: 'O(log n)', space: 'O(n)', category: 'Data Structures' },
          { name: 'Hungarian', time: 'O(n³)', space: 'O(n²)', category: 'Optimization' },
          { name: 'Viterbi Decoder', time: 'O(nT²)', space: 'O(nT)', category: 'Telecom' },
          { name: 'Kalman Filter', time: 'O(n³)', space: 'O(n²)', category: 'Signal Processing' },
          { name: 'Retiming', time: 'O(n³)', space: 'O(n²)', category: 'EDA' },
          { name: 'Alpha-Beta Pruning', time: 'O(b^(d/2))', space: 'O(d)', category: 'Game Theory' },
          { name: 'Halting Problem', time: 'Undecidable', space: 'Undecidable', category: 'Theory' },
          { name: 'P vs NP', time: 'Unknown', space: 'Unknown', category: 'Theory' },
          { name: 'Traveling Salesman', time: 'O(n²2ⁿ)', space: 'O(n2ⁿ)', category: 'Theory' },
  
      ];
      useEffect(() => {
        const results = algorithms.filter((algo) =>
          algo.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredAlgorithms(results);
        setVisibleAlgorithms(6); // Reset visible count when searching
      }, [searchQuery]);
    
      return (
        <div className="space-y-8">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search algorithms..."
              className="w-full p-4 bg-gray-800/50 border border-purple-800/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 pr-16"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400" />
          </div>
    
          {/* Algorithm Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {filteredAlgorithms.slice(0, visibleAlgorithms).map((algo, i) => (
              <motion.div
                key={algo.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 border border-purple-800/50 rounded-xl bg-gray-900/30 group hover:border-purple-500/30 transition-colors"
              >
                <h4 className="text-purple-300 mb-4 font-medium">{algo.name}</h4>
                <div className="flex gap-4 text-sm">
                  <div className="flex-1 p-3 bg-purple-900/20 rounded-lg backdrop-blur-sm">
                    <div className="text-pink-400 flex items-center gap-1 mb-1">
                      <FiClock className="text-sm" /> Time
                    </div>
                    <div className="font-mono text-purple-200">{algo.time}</div>
                  </div>
                  <div className="flex-1 p-3 bg-purple-900/20 rounded-lg backdrop-blur-sm">
                    <div className="text-pink-400 flex items-center gap-1 mb-1">
                      <FiCpu className="text-sm" /> Space
                    </div>
                    <div className="font-mono text-purple-200">{algo.space}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
    
          {/* Show More/Less Controls */}
          <div className="flex justify-center gap-4">
            {filteredAlgorithms.length > visibleAlgorithms && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-purple-800/30 border border-purple-800/50 rounded-lg hover:bg-purple-700/30 transition-colors flex items-center gap-2"
                onClick={() => setVisibleAlgorithms((prev) => prev + 3)}
              >
                <FiChevronDown /> Show More
              </motion.button>
            )}
    
            {visibleAlgorithms > 6 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-purple-800/30 border border-purple-800/50 rounded-lg hover:bg-purple-700/30 transition-colors flex items-center gap-2"
                onClick={() => setVisibleAlgorithms(6)}
              >
                <FiChevronUp /> Show Less
              </motion.button>
            )}
          </div>
    
          {/* No Results Message */}
          {filteredAlgorithms.length === 0 && (
            <div className="text-center py-12 text-purple-400">
              <FiAlertCircle className="inline-block mr-2" />
              No algorithms found matching your search
            </div>
          )}
        </div>
      );
    };
    
    export default AlgorithmSearch;