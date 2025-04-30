import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import React from 'react';
import DOMPurify from 'dompurify';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatResponse = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="code-block overflow-x-auto">$2</pre>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/Time Complexity:/g, '⏳ <strong>Time Complexity:</strong>')
      .replace(/Space Complexity:/g, '💾 <strong>Space Complexity:</strong>')
      .replace(/\n(\d+\.)/g, '<br/><span class="point">$1</span>')
      .replace(/\n/g, '<br/>');
  };

  const handleSend = async () => {
    if (!inputMessage.trim() || isLoading) return;
  
    const userMessage = { text: inputMessage, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
  
    const fullPrompt = `You are a senior FAANG engineer. Provide a brief solution in under 5 bullet points.Additionally provide the code if user asked. Question: ${inputMessage}`;
  
    const fetchWithRetry = async (retries = 3, delay = 2000) => {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: fullPrompt }] }]
            })
          }
        );
  
        const data = await response.json();
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  
        if (rawText) {
          const formatted = formatResponse(rawText);
          setMessages(prev => [...prev, { text: DOMPurify.sanitize(formatted), isBot: true }]);
        } else {
          throw new Error('No valid response');
        }
      } catch (error) {
        if (retries > 0) {
          console.log(`Retrying... ${retries} retries left.`);
          setTimeout(() => fetchWithRetry(retries - 1, delay), delay);
        } else {
          console.error('Final attempt failed:', error);
          setMessages(prev => [...prev, { text: '🚨 Error: Failed to get a response.', isBot: true }]);
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchWithRetry();  // Start the retry process
  };
  

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="mb-8 w-80 h-96 lg:w-96 lg:h-[480px] bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-purple-900/30 shadow-2xl flex flex-col"
          >
            <div className="p-4 bg-gray-900/50 rounded-t-2xl">
              <h3 className="text-lg lg:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400">
                DSA Mentor 🤖
              </h3>
            </div>
  
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] lg:max-w-[90%] p-3 rounded-xl prose ${
                      msg.isBot 
                        ? 'bg-gray-700/50 text-purple-100'
                        : 'bg-purple-700/30 text-pink-200'
                    }`}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg.text) }}
                  />
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center"
                >
                  <div className="loader-dots space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
  
            <div className="p-4 border-t border-purple-900/30">
              <div className="flex gap-2">
                <input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about algorithms, data structures..."
                  className="flex-1 bg-gray-900/50 rounded-xl px-4 py-2 text-sm lg:text-base text-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-br from-pink-600 to-purple-700 rounded-xl hover:scale-105 transition-transform text-sm lg:text-base font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? '...' : '🚀'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
  
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        
        className="mb-3 w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-pink-600 to-purple-700 rounded-2xl shadow-2xl flex items-center justify-center"
      >
        {isOpen ? (
          <svg className="w-6 h-6 lg:w-7 lg:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 lg:w-7 lg:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </motion.button>
    </div>
  );
};

export default ChatBot;
