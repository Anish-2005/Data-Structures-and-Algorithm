# 🧠 Data Structures & Algorithms - Interactive Learning Platform

<div align="center">
  <img src="dsa/public/dsa.png" alt="DSA Platform" width="800"/>
  
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
</div>

---

## 🌟 About This Project

A comprehensive **Data Structures & Algorithms** learning platform featuring interactive components, animations, and a complete study guide with implementations in C. This project combines modern web technologies with educational content to create an engaging learning experience.

### 🎯 Key Features

- **🎨 Interactive UI** with quantum-inspired animations and holographic effects
- **📚 Comprehensive Study Materials** with detailed explanations and C implementations
- **🔬 Interactive Labs** for hands-on learning
- **🎯 Algorithm Visualizer** for understanding complex algorithms
- **💻 Online Compiler** for testing code snippets
- **🤖 AI-Powered Chatbot** for instant help and explanations
- **📖 Structured Learning Path** from basics to advanced topics

---

## 🏗️ Project Architecture

### Frontend (React + Vite)
- **Modern Stack**: React 19, Vite 6, Framer Motion 12
- **Responsive Design**: Mobile-first approach with smooth animations
- **Interactive Components**: Quantum particles, holographic grids, tech stack orbit
- **Multi-page Application**: Landing, Labs, Visualizer, Compiler, Learn, Chatbot

### Backend (Node.js + Express)
- **RESTful API**: Express.js with MongoDB integration
- **Security**: Helmet, CORS, compression middleware
- **Data Management**: Mongoose ODM for database operations
- **Assignment Tracking**: History and progress management

### Study Materials
- **Comprehensive Coverage**: 50+ topics with detailed explanations
- **C Implementations**: Production-ready code examples
- **Academic Integration**: PCC-CSBS391 course assignments included

---

## 📚 Learning Content Coverage

| **Data Structures** | **Algorithms** | **Advanced Topics** |
|-------------------|---------------|-------------------|
| • Linked Lists (SLL, DLL, CLL, DCLL) | • Sorting (Bubble, Selection, Insertion, Merge, Quick, Heap) | • Graph Algorithms (BFS, DFS) |
| • Stacks & Queues | • Searching (Linear, Binary) | • Tree Structures (BST, AVL, B-Trees) |
| • Trees & Graphs | • Dynamic Programming | • Advanced Data Structures |
| • Hash Tables | • Greedy Algorithms | • Algorithm Analysis |

---

## 💻 Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Icons](https://img.shields.io/badge/React_Icons-61DAFB?style=for-the-badge&logo=react&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

### AI Integration
![Google AI](https://img.shields.io/badge/Google_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Generative AI](https://img.shields.io/badge/Generative_AI-FF6B6B?style=for-the-badge&logo=openai&logoColor=white)

---

## 🏗️ Project Structure

```
Data-Structures-and-Algorithms/
├── 📁 dsa/                          # Frontend React Application
│   ├── 📁 public/                   # Static assets
│   │   ├── dsa.png                  # Project logo
│   │   └── vite.svg                 # Vite logo
│   ├── 📁 src/
│   │   ├── 📁 components/           # Reusable UI components
│   │   │   ├── Footer.jsx           # Footer component
│   │   │   ├── HolographicGrid.jsx  # Holographic background effect
│   │   │   ├── QuantumParticles.jsx # Quantum particle animations
│   │   │   └── TechStackOrbit.jsx   # Floating tech stack icons
│   │   ├── 📁 pages/                # Main application pages
│   │   │   ├── 📁 Landing/          # Landing page
│   │   │   ├── 📁 Labs/             # Interactive labs
│   │   │   ├── 📁 Visualizer/       # Algorithm visualizer
│   │   │   ├── 📁 Compiler/         # Online code compiler
│   │   │   ├── 📁 Learn/            # Learning materials
│   │   │   └── 📁 Chatbot/          # AI-powered chatbot
│   │   ├── App.jsx                  # Main app component
│   │   └── main.jsx                 # Entry point
│   ├── package.json                 # Frontend dependencies
│   └── vite.config.js               # Vite configuration
├── � dsa-backend/                  # Backend API Server
│   ├── 📁 config/                   # Configuration files
│   │   ├── constants.js             # Application constants
│   │   ├── database.js              # Database configuration
│   │   └── middleware.js            # Custom middleware
│   ├── 📁 controllers/              # Route controllers
│   │   ├── dsaAssignmentController.js
│   │   └── historyController.js
│   ├── 📁 models/                   # MongoDB models
│   │   ├── DSAAssignment.js
│   │   └── History.js
│   ├── 📁 routes/                   # API routes
│   │   ├── dsaAssignmentRoutes.js
│   │   ├── historyRoutes.js
│   │   └── index.js
│   ├── 📁 services/                 # Business logic
│   │   └── responseHandler.js
│   ├── server.js                    # Express server
│   └── package.json                 # Backend dependencies
├── 📁 Study Materials/              # Comprehensive Learning Resources
│   ├── 📁 Linked List/              # All linked list variants
│   │   ├── 📁 Singly Linked List/   # SLL implementation & theory
│   │   ├── 📁 Doubly Linked List/   # DLL implementation & theory
│   │   ├── 📁 Cyclic Linked List/   # CLL implementation & theory
│   │   └── � Doubly Cyclic Linked List/ # DCLL implementation & theory
│   ├── � Stack/                    # Stack implementations
│   │   ├── StackArr.c               # Array-based stack
│   │   ├── StackArr.md              # Array stack documentation
│   │   ├── StackLL.c                # Linked list-based stack
│   │   └── StackLL.md               # Linked list stack documentation
│   ├── 📁 Sorting/                  # Sorting algorithms
│   │   ├── 📁 Bubble Sort/          # Bubble sort with documentation
│   │   ├── 📁 Selection Sort/       # Selection sort implementation
│   │   ├── � Insertion Sort/       # Insertion sort implementation
│   │   ├── � Merge Sort/           # Merge sort implementation
│   │   ├── 📁 Quick Sort/           # Quick sort implementation
│   │   └── 📁 Heap Sort/            # Heap sort implementation
│   ├── 📁 Searching/                # Search algorithms
│   │   ├── 📁 Linear Search/        # Linear search implementation
│   │   └── 📁 Binary Search/        # Binary search implementation
│   ├── 📁 Trees/                    # Tree data structures
│   │   ├── 📁 Binary Search Tree/   # BST implementation
│   │   ├── 📁 AVL Tree/             # Self-balancing BST
│   │   ├── 📁 B Tree/               # B-tree implementation
│   │   ├── 📁 B+ Tree/              # B+ tree implementation
│   │   └── 📁 Red-Black Tree/       # Red-black tree implementation
│   ├── 📁 Graphs/                   # Graph algorithms
│   │   ├── 📁 BFS/                  # Breadth-first search
│   │   └── 📁 DFS/                  # Depth-first search
│   └── 📁 PCC-CSBS391/              # Academic course assignments
│       ├── 📁 Assignment 1/         # Course assignment 1
│       ├── 📁 Assignment 2/         # Course assignment 2
│       └── ... (up to Assignment 12) # Complete course coverage
└── README.md                        # This file
```

---

## 🚀 Quick Start

### 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or Atlas)
- **Git**

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anish-2005/Data-Structures-and-Algorithms.git
   cd Data-Structures-and-Algorithms
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd dsa
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../dsa-backend
   npm install
   ```

4. **Set up Environment Variables**
   
   Create `.env` in the `dsa-backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/dsa-platform
   NODE_ENV=development
   ```

5. **Start the Development Servers**
   
   **Backend** (Terminal 1):
   ```bash
   cd dsa-backend
   npm start
   ```
   
   **Frontend** (Terminal 2):
   ```bash
   cd dsa
   npm run dev
   ```

6. **Open your browser** and navigate to `http://localhost:5173`

---

## 🎮 Platform Features

### 🌐 Interactive Web Application
- **Landing Page**: Modern design with quantum-inspired animations
- **Labs Section**: Interactive coding challenges and exercises
- **Visualizer**: Real-time algorithm visualization
- **Compiler**: Online code editor and compiler
- **Learn Section**: Structured learning path
- **AI Chatbot**: Instant help and explanations

### 📚 Study Materials
- **50+ Data Structure & Algorithm Topics**
- **C Language Implementations** with detailed comments
- **Markdown Documentation** for each topic
- **Academic Course Integration** (PCC-CSBS391)
- **Progressive Difficulty** from basics to advanced

### 🎨 UI/UX Features
- **Quantum Particles**: Dynamic particle system
- **Holographic Grid**: Animated background effects
- **Tech Stack Orbit**: Floating technology icons
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Framer Motion powered transitions

---
## � Development & Testing

### Available Scripts

**Frontend (dsa directory):**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

**Backend (dsa-backend directory):**
```bash
npm start        # Start the server
npm test         # Run tests (when implemented)
```

### Development Tools
- **Vite**: Fast build tool and development server
- **ESLint**: Code linting and style checking
- **Framer Motion**: Animation library
- **React Router**: Client-side routing
- **Express**: Backend web framework
- **Mongoose**: MongoDB object modeling

---

## 📖 Learning Path

### 🎯 Beginner Level
1. **Arrays & Basic Operations**
2. **Singly Linked Lists**
3. **Stacks & Queues**
4. **Basic Sorting** (Bubble, Selection, Insertion)
5. **Linear & Binary Search**

### 🎯 Intermediate Level
1. **Doubly & Circular Linked Lists**
2. **Advanced Sorting** (Merge, Quick, Heap)
3. **Binary Trees & BST**
4. **Graph Basics** (BFS, DFS)
5. **Hash Tables**

### 🎯 Advanced Level
1. **Self-Balancing Trees** (AVL, Red-Black)
2. **B-Trees & B+ Trees**
3. **Advanced Graph Algorithms**
4. **Dynamic Programming**
5. **System Design Concepts**

---

## 🚀 Deployment

### Frontend (Vercel)
The frontend is configured for Vercel deployment with `vercel.json`:
```bash
npm run build
# Deploy to Vercel
```

### Backend (Node.js Hosting)
Deploy to any Node.js hosting platform:
```bash
# Set environment variables
# Deploy the dsa-backend directory
```

---

## 📊 Project Statistics

- **50+ Algorithm Implementations** in C
- **6 Main Application Pages** with React
- **20+ Interactive Components**
- **Academic Course Integration** (12 assignments)
- **Modern Tech Stack** (React 19, Node.js, MongoDB)
- **Mobile-Responsive Design**

---

## 🤝 Contributing

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style
- Add comments to complex algorithms
- Include documentation for new features
- Test your changes thoroughly
- Update README if needed

### Areas for Contribution

- **New Algorithm Implementations**
- **Enhanced Visualizations**
- **Mobile UX Improvements**
- **Performance Optimizations**
- **Test Coverage**
- **Documentation Updates**

---

## 🌟 Future Enhancements

- [ ] **Advanced Visualizations** with D3.js/Three.js
- [ ] **User Authentication** and progress tracking
- [ ] **Code Execution Engine** for multiple languages
- [ ] **Community Features** (sharing, discussions)
- [ ] **Mobile Application** (React Native)
- [ ] **AI-Powered Code Analysis**
- [ ] **Performance Benchmarking**
- [ ] **Video Tutorials Integration**

---

## � License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Educational Institutions** for course structure inspiration
- **Open Source Community** for amazing libraries and tools
- **Algorithm Visualization** community for inspiration
- **React & Node.js** communities for excellent documentation

---

## 📞 Contact & Support

**Developer**: Anish Seth  
**Email**: anishseth0510@gmail.com  
**GitHub**: [@Anish-2005](https://github.com/Anish-2005)  
**Project**: [Data-Structures-and-Algorithms](https://github.com/Anish-2005/Data-Structures-and-Algorithms)

---

<div align="center">
  
  **⭐ Star this repository if you find it helpful!**
  
  Made with ❤️ by [Anish Seth](https://github.com/Anish-2005)
  
</div>

