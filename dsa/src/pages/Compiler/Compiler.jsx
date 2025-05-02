import { useState, useEffect } from 'react';
import React from 'react';
import { motion } from 'framer-motion';
import {
  FiTerminal, FiChevronRight, FiClock, FiAlertCircle,
  FiCode, FiZap, FiLoader, FiBox, FiLayers, FiMenu
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import QuantumParticles from '../../components/QuantumParticles';
import HolographicGrid from '../../components/HolographicGrid';
import TechStackOrbit from '../../components/TechStackOrbit';
import Footer from '../../components/Footer';
import Navbar from './sections/Navbar';
import Editor from './sections/Editor';
import History from './sections/History';
const CompilerPage = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState([]);
  const [errors, setErrors] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('python');
  const [history, setHistory] = useState([]);
  const [isCompiling, setIsCompiling] = useState(false);

  const languageExamples = {
    python: `# Python 3 example
print("Hello World!")
for i in range(5):
    print(f"Number {i}")`,
    cpp: `// C++ example
#include <iostream>
using namespace std;

int main() {
    cout << "Hello World!";
    return 0;
}`,
    java: `// Java example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
        for(int i=0; i<5; i++) {
            System.out.println("Number " + i);
        }
    }
}`,
    javascript: `// JavaScript example
console.log("Hello World!");
for(let i=0; i<5; i++) {
    console.log(\`Number \${i}\`);
}`
  };

  const languageIds = {
    python: 71,
    cpp: 54,
    java: 62,
    javascript: 63
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${import.meta.env.REACT_APP_BACKEND}/api/history`);
        if (!response.ok) throw new Error('Failed to fetch history');

        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error('Error loading history:', error);
      }
    };

    fetchHistory();
    setCode(languageExamples[language]);
  }, [language]);

  const saveHistory = async (newEntry) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND}/api/history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
      });

      if (!response.ok) throw new Error('Failed to save history');
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };

  const compileCode = async () => {
    setIsCompiling(true);
    setErrors([]);
    setOutput([]);

    try {
      const encodedCode = btoa(unescape(encodeURIComponent(code)));

      const submissionRes = await fetch(
        'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'x-rapidapi-key': '269deccffcmshb8bcfc66a0fca92p1546fajsn1593f894014a',
          },
          body: JSON.stringify({
            source_code: encodedCode,
            language_id: languageIds[language],
            stdin: '',
            base64_encoded: true
          }),
        }
      );

      const submissionData = await submissionRes.json();

      if (!submissionData.token) {
        throw new Error('Submission failed: No token received');
      }

      let result = null;
      let attempts = 0;
      const maxAttempts = 15;

      while (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1500));

        const resultRes = await fetch(
          `https://judge0-ce.p.rapidapi.com/submissions/${submissionData.token}?base64_encoded=true`,
          {
            headers: {
              'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
              'x-rapidapi-key': '269deccffcmshb8bcfc66a0fca92p1546fajsn1593f894014a',
            },
          }
        );

        result = await resultRes.json();

        if (result.status.id > 2) break;
        attempts++;
      }

      let outputText = '';
      let errorText = '';

      if (result.stdout) {
        outputText = decodeURIComponent(escape(atob(result.stdout)));
      }
      if (result.stderr) {
        errorText = decodeURIComponent(escape(atob(result.stderr)));
      }
      if (result.compile_output) {
        errorText = decodeURIComponent(escape(atob(result.compile_output)));
      }
      if (result.message) {
        errorText = result.message;
      }

      if (result.status && result.status.description) {
        if (['Time Limit Exceeded', 'Memory Limit Exceeded'].includes(result.status.description)) {
          errorText = result.status.description;
        }
      }

      if (errorText) {
        setErrors(errorText.split('\n').filter(line => line.trim() !== ''));
      } else {
        setOutput(outputText.split('\n').filter(line => line.trim() !== ''));
      }

      const newEntry = {
        code,
        output: outputText.split('\n'),
        errors: errorText ? errorText.split('\n') : [],
        language,
        timestamp: new Date().toISOString()
      };

      setHistory(prev => {
        const newHistory = [newEntry, ...prev.slice(0, 4)];
        localStorage.setItem('compilerHistory', JSON.stringify(newHistory));
        return newHistory;
      });

      await saveHistory(newEntry);

    } catch (err) {
      setErrors([err.message || 'Compilation failed']);
      console.error('Compilation error:', err);
    } finally {
      setIsCompiling(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/10 text-white">
      <QuantumParticles />
      <HolographicGrid />
      <TechStackOrbit />
      <Navbar />
      <main className="container mx-auto p-4 grid lg:grid-cols-2 gap-6 min-h-screen">
        {/* Editor Section */}
        <Editor
          language={language}
          setLanguage={setLanguage}
          isCompiling={isCompiling}
          compileCode={compileCode}
          code={code}
          setCode={setCode}
          languageExamples={languageExamples}
        />

        {/* Output Section */}
        <div className="flex flex-col gap-6 h-[80vh]">
          <div className="rounded-xl bg-gradient-to-br from-gray-900 to-gray-950 border border-purple-900/50 shadow-xl shadow-purple-900/10 flex-1 overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-purple-900/20 to-purple-900/5 backdrop-blur-lg">
              <div className="flex items-center gap-3">
                <FiBox className="text-pink-400 text-xl shrink-0" />
                <h2 className="text-lg font-semibold bg-gradient-to-r from-pink-200 to-pink-400 bg-clip-text text-transparent">
                  Execution Output
                </h2>
                <div className="ml-auto flex gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-900/30 text-purple-300 border border-purple-900/50">
                    {language.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <motion.div
              className="h-[calc(100%-56px)] overflow-auto p-4 space-y-3 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {errors.length > 0 ? (
                errors.map((error, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-2 font-mono text-sm p-3 rounded-lg bg-red-900/10 border border-red-900/30"
                  >
                    <FiAlertCircle className="flex-shrink-0 mt-1 text-red-400" />
                    <code className="text-red-300/90 break-words">{error}</code>
                  </motion.div>
                ))
              ) : (
                output.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group flex items-start gap-2 font-mono text-sm p-3 rounded-lg bg-gray-800/5 hover:bg-gray-800/10 transition-colors"
                  >
                    <span className="text-green-400/80 mt-0.5">&gt;</span>
                    <code className="text-green-300/90 break-all">{line}</code>
                  </motion.div>
                ))
              )}

              {output.length === 0 && errors.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center h-full p-4"
                >
                  <span className="text-sm text-purple-500/60 italic">
                    {isCompiling ? (
                      <div className="flex items-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="inline-block"
                        >
                          ⏳
                        </motion.span>
                        Compiling...
                      </div>
                    ) : (
                      'Your execution results will appear here...'
                    )}
                  </span>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* History Section */}
          <History />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CompilerPage;