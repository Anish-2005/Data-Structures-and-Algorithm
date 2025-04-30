
import { useState } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import HolographicGrid from '../../components/HolographicGrid';
import QuantumParticles from '../../components/QuantumParticles';
import TechStackOrbit from '../../components/TechStackOrbit';
import Footer from '../../components/Footer';
import Navbar from './Navbar';

// Constants
const ALGORITHM_DATA = [
  {
    category: 'Data Structures',
    items: [
      {
        title: 'Arrays',
        complexity: 'O(n)',
        difficulty: '★☆☆',
        path: '/visualizer',
        code: `function traverse(arr) {\n  for(let i=0; i<arr.length; i++) {\n    console.log(arr[i]);\n  }\n}`,
        tags: ['Linear', 'Indexed', 'Random Access'],
        category: 'Array'
      },
      {
        title: 'Linked Lists',
        complexity: 'O(n)',
        difficulty: '★★☆',
        path: '/visualizer',
        code: 'class Node {\n  constructor(value) {\n    this.value = value;\n    this.next = null;\n  }\n}',
        tags: ['Dynamic', 'Pointers', 'Sequential'],
        category: 'List'
      },
      {
        title: 'Binary Trees',
        complexity: 'O(log n)',
        difficulty: '★★☆',
        path: '/visualizer',
        code: 'function traverse(root) {\n  if(root) {\n    traverse(root.left);\n    console.log(root.value);\n    traverse(root.right);\n  }\n}',
        tags: ['Hierarchical', 'Recursion', 'DFS'],
        category: 'Tree'
      },
      {
        title: 'Graphs (Adjacency List)',
        complexity: 'O(V + E)',
        difficulty: '★★★',
        path: '/visualizer',
        code: 'const graph = {\n  A: ["B", "C"],\n  B: ["D"],\n  C: ["E"],\n  D: [],\n  E: []\n};',
        tags: ['Non-linear', 'Edges', 'Vertices'],
        category: 'Graph'
      },
      {
        title: 'Stacks',
        complexity: 'O(1)',
        difficulty: '★☆☆',
        path: '/visualizer',
        code: `class Stack {\n  constructor() {\n    this.items = [];\n  }\n  push(item) {\n    this.items.push(item);\n  }\n  pop() {\n    return this.items.pop();\n  }\n}`,
        tags: ['LIFO', 'Operations', 'Linear'],
        category: 'Linear'
      },
      {
        title: 'Queues',
        complexity: 'O(1)',
        difficulty: '★☆☆',
        path: '/visualizer',
        code: `class Queue {\n  constructor() {\n    this.items = [];\n  }\n  enqueue(item) {\n    this.items.unshift(item);\n  }\n  dequeue() {\n    return this.items.pop();\n  }\n}`,
        tags: ['FIFO', 'Operations', 'Linear'],
        category: 'Linear'
      },
      {
        title: 'Hash Tables',
        complexity: 'O(1)',
        difficulty: '★★☆',
        path: '/visualizer',
        code: `class HashTable {\n  constructor() {\n    this.table = new Array(127);\n  }\n  _hash(key) {\n    let hash = 0;\n    for (let i = 0; i < key.length; i++) {\n      hash += key.charCodeAt(i);\n    }\n    return hash % this.table.length;\n  }\n}`,
        tags: ['Key-Value', 'Collision', 'Hashing'],
        category: 'Hash'
      },
      {
        title: 'Heaps',
        complexity: 'O(log n)',
        difficulty: '★★★',
        path: '/visualizer',
        code: `class MaxHeap {\n  constructor() {\n    this.heap = [];\n  }\n  insert(value) {\n    this.heap.push(value);\n    this.bubbleUp();\n  }\n}`,
        tags: ['Priority', 'Complete Tree', 'Heapify'],
        category: 'Tree'
      },
      {
        title: 'Tries',
        complexity: 'O(L)',
        difficulty: '★★★',
        path: '/visualizer',
        code: `class TrieNode {\n  constructor() {\n    this.children = {};\n    this.isEnd = false;\n  }\n}`,
        tags: ['Prefix', 'Strings', 'Efficient'],
        category: 'Tree'
      },
      {
        title: 'AVL Trees',
        complexity: 'O(log n)',
        difficulty: '★★★',
        path: '/visualizer',
        code: `class AVLNode {\n  constructor(value) {\n    this.value = value;\n    this.height = 1;\n    this.left = null;\n    this.right = null;\n  }\n}`,
        tags: ['Balanced', 'Rotations', 'Height'],
        category: 'Tree'
      },
      {
        title: 'B-Trees',
        complexity: 'O(log n)',
        difficulty: '★★★',
        path: '/visualizer',
        code: `class BTreeNode {\n  constructor(order) {\n    this.keys = [];\n    this.children = [];\n    this.order = order;\n  }\n}`,
        tags: ['Multi-level', 'Balanced', 'Disk'],
        category: 'Tree'
      },
      {
        title: 'Red-Black Trees',
        complexity: 'O(log n)',
        difficulty: '★★★',
        path: '/visualizer',
        code: `class RBNode {\n  constructor(value) {\n    this.value = value;\n    this.color = 'RED';\n    this.left = null;\n    this.right = null;\n  }\n}`,
        tags: ['Balanced', 'Coloring', 'Rotations'],
        category: 'Tree'
      },
      {
        title: 'Segment Trees',
        complexity: 'O(log n)',
        difficulty: '★★★',
        path: '/visualizer',
        code: `class SegmentTree {\n  constructor(array) {\n    this.n = array.length;\n    this.size = 2 ** Math.ceil(Math.log2(this.n));\n    this.tree = new Array(2 * this.size).fill(0);\n  }\n}`,
        tags: ['Range Query', 'Efficient', 'Update'],
        category: 'Tree'
      },
      {
        title: 'Fenwick Trees',
        complexity: 'O(log n)',
        difficulty: '★★★',
        path: '/visualizer',
        code: `class FenwickTree {\n  constructor(size) {\n    this.n = size;\n    this.tree = new Array(this.n + 1).fill(0);\n  }\n}`,
        tags: ['Binary Indexed', 'Prefix Sum', 'Efficient'],
        category: 'Tree'
      },
      {
        title: 'Disjoint Set Union',
        complexity: 'O(α(n))',
        difficulty: '★★★',
        path: '/visualizer',
        code: `class DSU {\n  constructor(size) {\n    this.parent = new Array(size).fill().map((_, i) => i);\n    this.rank = new Array(size).fill(1);\n  }\n}`,
        tags: ['Union-Find', 'Connected Components', 'Merge'],
        category: 'Tree'
      },
      {
        title: 'Bloom Filters',
        complexity: 'O(k)',
        difficulty: '★★★',
        path: '/visualizer',
        code: `class BloomFilter {\n  constructor(size, hashFunctions) {\n    this.size = size;\n    this.storage = new Array(size).fill(false);\n    this.hashes = hashFunctions;\n  }\n}`,
        tags: ['Probabilistic', 'Membership', 'Space-efficient'],
        category: 'Hash'
      },
      {
        title: 'Skip Lists',
        complexity: 'O(log n)',
        difficulty: '★★★',
        path: '/visualizer',
        code: `class SkipListNode {\n  constructor(value, level) {\n    this.value = value;\n    this.next = new Array(level).fill(null);\n  }\n}`,
        tags: ['Probabilistic', 'Layered', 'Search'],
        category: 'List'
      },
      {
        title: 'Circular Buffers',
        complexity: 'O(1)',
        difficulty: '★★☆',
        path: '/visualizer',
        code: `class CircularBuffer {\n  constructor(capacity) {\n    this.buffer = new Array(capacity);\n    this.head = 0;\n    this.tail = 0;\n    this.size = 0;\n  }\n}`,
        tags: ['Ring Buffer', 'Fixed-size', 'FIFO'],
        category: 'Linear'
      },
      {
        title: 'Adjacency Matrix',
        complexity: 'O(V²)',
        difficulty: '★★☆',
        path: '/visualizer',
        code: `const matrix = [\n  [0, 1, 0],\n  [1, 0, 1],\n  [0, 1, 0]\n];`,
        tags: ['Graph', 'Matrix', 'Dense'],
        category: 'Graph'
      },
      {
        title: 'Suffix Trees',
        complexity: 'O(n)',
        difficulty: '★★★',
        path: '/visualizer',
        code: `class SuffixTreeNode {\n  constructor() {\n    this.children = {};\n    this.index = -1;\n  }\n}`,
        tags: ['Pattern Matching', 'Efficient', 'Strings'],
        category: 'Tree'
      },
      {
        title: 'Quad Trees',
        complexity: 'O(log n)',
        difficulty: '★★★',
        path: '/visualizer',
        code: `class QuadTreeNode {\n  constructor(boundary) {\n    this.boundary = boundary;\n    this.points = [];\n    this.divided = false;\n  }\n}`,
        tags: ['Spatial', 'Partitioning', '2D'],
        category: 'Tree'
      }
    ]
  },
  {
    category: 'Algorithms',
    items: [
      {
        title: 'Quick Sort',
        complexity: 'O(n log n)',
        difficulty: '★☆☆',
        path: '/compiler',
        code: `function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[0];\n  const left = [];\n  const right = [];\n  for (let i = 1; i < arr.length; i++) {\n    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);\n  }\n  return [...quickSort(left), pivot, ...quickSort(right)];\n}`,
        tags: ['Divide & Conquer', 'In-place', 'Unstable'],
        category: 'Sorting'
      },
      {
        title: 'Merge Sort',
        complexity: 'O(n log n)',
        difficulty: '★★☆',
        path: '/compiler',
        code: `function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  return merge(\n    mergeSort(arr.slice(0, mid)),\n    mergeSort(arr.slice(mid))\n  );\n}`,
        tags: ['Stable', 'Out-of-place', 'Recursive'],
        category: 'Sorting'
      },
      {
        title: 'Binary Search',
        complexity: 'O(log n)',
        difficulty: '★☆☆',
        path: '/compiler',
        code: `function binarySearch(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    arr[mid] < target ? left = mid + 1 : right = mid - 1;\n  }\n  return -1;\n}`,
        tags: ['Sorted Data', 'Logarithmic', 'Efficient'],
        category: 'Searching'
      },
      {
        title: 'Dijkstra\'s Algorithm',
        complexity: 'O(E + V log V)',
        difficulty: '★★★',
        path: '/compiler',
        code: `function dijkstra(graph, start) {\n  const distances = {};\n  const pq = new PriorityQueue();\n  // Implementation...\n}`,
        tags: ['Shortest Path', 'Greedy', 'Weighted'],
        category: 'Graph'
      },
      {
        title: 'A* Search',
        complexity: 'O(b^d)',
        difficulty: '★★★',
        path: '/compiler',
        code: `function aStar(start, goal) {\n  const openSet = new PriorityQueue();\n  openSet.enqueue(start, 0);\n  // Implementation...\n}`,
        tags: ['Heuristic', 'Optimal', 'Pathfinding'],
        category: 'Graph'
      },
      {
        title: 'BFS',
        complexity: 'O(V + E)',
        difficulty: '★★☆',
        path: '/compiler',
        code: `function BFS(start) {\n  const queue = [start];\n  const visited = new Set();\n  while (queue.length) {\n    const node = queue.shift();\n    // Process node\n  }\n}`,
        tags: ['Level Order', 'Queue', 'Unweighted'],
        category: 'Graph'
      },
      {
        title: 'DFS',
        complexity: 'O(V + E)',
        difficulty: '★★☆',
        path: '/compiler',
        code: `function DFS(node, visited) {\n  if (!node || visited.has(node)) return;\n  visited.add(node);\n  for (const neighbor of node.neighbors) {\n    DFS(neighbor, visited);\n  }\n}`,
        tags: ['Backtracking', 'Recursive', 'Pathfinding'],
        category: 'Graph'
      },
      {
        title: 'Kruskal\'s Algorithm',
        complexity: 'O(E log E)',
        difficulty: '★★★',
        path: '/compiler',
        code: `function kruskal(graph) {\n  const mst = [];\n  const uf = new UnionFind(graph.nodes);\n  // Implementation...\n}`,
        tags: ['MST', 'Greedy', 'Union-Find'],
        category: 'Graph'
      },
      {
        title: 'Prim\'s Algorithm',
        complexity: 'O(E log V)',
        difficulty: '★★★',
        path: '/compiler',
        code: `function prim(graph) {\n  const pq = new PriorityQueue();\n  const visited = new Set();\n  // Implementation...\n}`,
        tags: ['MST', 'Greedy', 'Priority Queue'],
        category: 'Graph'
      },
      {
        title: 'Bellman-Ford',
        complexity: 'O(VE)',
        difficulty: '★★★',
        path: '/compiler',
        code: `function bellmanFord(graph, start) {\n  const distances = {};\n  // Relax edges V-1 times\n}`,
        tags: ['Negative Weights', 'Dynamic', 'Shortest Path'],
        category: 'Graph'
      },
      {
        title: 'Floyd-Warshall',
        complexity: 'O(V³)',
        difficulty: '★★★',
        path: '/compiler',
        code: `function floydWarshall(graph) {\n  const dist = [...graph];\n  // Implementation...\n}`,
        tags: ['All Pairs', 'Dynamic', 'Matrix'],
        category: 'Graph'
      },
      {
        title: 'Topological Sort',
        complexity: 'O(V + E)',
        difficulty: '★★☆',
        path: '/compiler',
        code: `function topologicalSort(graph) {\n  const stack = [];\n  const visited = new Set();\n  // Implementation...\n}`,
        tags: ['DAG', 'Ordering', 'Dependencies'],
        category: 'Graph'
      },
      {
        title: 'KMP Algorithm',
        complexity: 'O(n + m)',
        difficulty: '★★★',
        path: '/compiler',
        code: `function KMPSearch(pattern, text) {\n  const lps = computeLPSArray(pattern);\n  // Implementation...\n}`,
        tags: ['Pattern Matching', 'Efficient', 'Strings'],
        category: 'Strings'
      },
      {
        title: 'Rabin-Karp',
        complexity: 'O(n + m)',
        difficulty: '★★★',
        path: '/compiler',
        code: `function rabinKarp(text, pattern) {\n  const p = 31;\n  const mod = 1e9+9;\n  // Rolling hash...\n}`,
        tags: ['Hashing', 'Substring', 'Average-case'],
        category: 'Strings'
      },
      {
        title: 'Knuth-Morris-Pratt',
        complexity: 'O(n + m)',
        difficulty: '★★★',
        path: '/compiler',
        code: `function computeLPSArray(pattern) {\n  const lps = new Array(pattern.length).fill(0);\n  // Implementation...\n}`,
        tags: ['Prefix Function', 'Optimized', 'Linear'],
        category: 'Strings'
      }
    ]
  },
];

// Components
const AlgorithmCard = ({
  title,
  complexity,
  code,
  tags,
  category,
  difficulty,
  path
}) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="group relative bg-gray-800/40 backdrop-blur-lg rounded-2xl p-8 border border-purple-900/30 hover:border-pink-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

    <Link to={path} className="block h-full">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-semibold text-pink-200">{title}</h3>
          <span className="px-3 py-1 text-xs font-bold bg-purple-900/50 rounded-full text-purple-300">
            {difficulty}
          </span>
        </div>

        {/* Code Preview */}
        <div className="flex-1 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80 z-10" />
          <pre className="text-sm font-mono text-purple-300 overflow-x-auto pb-4">
            <code className="block min-w-max">
              {code}
            </code>
          </pre>
        </div>

        {/* Meta Information */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex space-x-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-pink-900/30 rounded-lg text-pink-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-sm text-purple-400">#{category}</span>
        </div>

        {/* Complexity */}
        <div className="mt-4 text-right text-sm text-purple-300">
          Avg. Complexity: {complexity}
        </div>
      </div>
    </Link>
  </motion.div>
);

// Main Component
const LearnPage = () => {
  const [categoryStates, setCategoryStates] = useState(() => {
    return ALGORITHM_DATA.reduce((acc, cat) => {
      acc[cat.category] = {
        isExpanded: false,
        searchQuery: ''
      };
      return acc;
    }, {});
  });

  const toggleCategory = (categoryName) => {
    setCategoryStates(prev => ({
      ...prev,
      [categoryName]: {
        ...prev[categoryName],
        isExpanded: !prev[categoryName].isExpanded
      }
    }));
  };

  const handleSearch = (categoryName, query) => {
    setCategoryStates(prev => ({
      ...prev,
      [categoryName]: {
        ...prev[categoryName],
        searchQuery: query
      }
    }));
  };

  const filterItems = (items, query) => {
    const q = query.toLowerCase();
    return items.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.tags.some(tag => tag.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q) ||
      item.complexity.toLowerCase().includes(q)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/20 text-white overflow-x-hidden">
      <QuantumParticles />
      <HolographicGrid />
      <TechStackOrbit />
      <Navbar />

      <main className="container mx-auto px-4 py-20 relative z-10">
        {/* Categories */}
        {ALGORITHM_DATA.map((section) => {
          const state = categoryStates[section.category];
          const filteredItems = filterItems(section.items, state.searchQuery);

          return (
            <motion.div
              key={section.category}
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Category Header */}
              <div
                className="sticky top-20 z-30 bg-gray-900/80 backdrop-blur-lg py-6 mb-4 cursor-pointer hover:bg-gray-900/90 transition-colors"
                onClick={() => toggleCategory(section.category)}
              >
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-300 to-purple-400 bg-clip-text text-transparent">
                    {section.category}
                  </h2>
                  <motion.div
                    animate={{ rotate: state.isExpanded ? 180 : 0 }}
                    className="text-purple-300 text-2xl"
                  >
                    ▼
                  </motion.div>
                </div>
              </div>

              <AnimatePresence>
                {state?.isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {/* Search Bar */}
                    <div className="mb-8 px-4">
                      <input
                        type="text"
                        placeholder={`Search ${section.category}...`}
                        className="w-full bg-gray-800/50 rounded-xl px-6 py-3 text-purple-100 
                          focus:outline-none focus:ring-2 focus:ring-pink-400
                          placeholder-purple-400/60 transition-all"
                        value={state.searchQuery}
                        onChange={(e) => handleSearch(section.category, e.target.value)}
                      />
                    </div>

                    {/* Items Grid */}
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 px-4">
                      {filteredItems.map((concept) => (
                        <AlgorithmCard
                          key={concept.title}
                          {...concept}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </main>

      <Footer />
    </div>
  );
};

export default LearnPage;