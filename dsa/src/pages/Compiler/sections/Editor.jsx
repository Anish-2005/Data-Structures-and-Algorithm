import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZap, FiLoader, FiCode, FiChevronDown } from 'react-icons/fi';
import { SiPython, SiCplusplus, SiOpenjdk, SiJavascript } from 'react-icons/si';

// Ensure all keys match lowercase input
const languageIcons = {
  python: <SiPython className="text-blue-400 text-xl" />,
  cpp: <SiCplusplus className="text-pink-500 text-xl" />,
  java: <SiOpenjdk className="text-red-500 text-xl" />,
  javascript: <SiJavascript className="text-yellow-400 text-xl" />,
};

const Editor = ({
  language,
  setLanguage,
  isCompiling,
  compileCode,
  code,
  setCode,
  languageExamples,
}) => {
  const [isLangOpen, setIsLangOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-4 h-[80vh]">
      {/* Language Select + Run Button */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="w-full flex items-center gap-3 bg-gray-800/50 border border-purple-700/50 rounded-lg px-4 py-3 text-sm"
          >
            {languageIcons[language]}
            <span className="text-purple-200">{language.toUpperCase()}</span>
            <FiChevronDown className="ml-auto text-purple-400 transform transition-transform duration-200" 
              style={{ rotate: isLangOpen ? '180deg' : '0deg' }} />
          </motion.button>

          <AnimatePresence>
            {isLangOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute w-full mt-2 bg-gray-900 border border-purple-800/50 rounded-lg shadow-xl z-10"
              >
                {['python', 'cpp', 'java', 'javascript'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setIsLangOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-purple-900/20 transition-colors"
                  >
                    {languageIcons[lang]}
                    <span className="text-purple-200">{lang.toUpperCase()}</span>
                    {language === lang && (
                      <div className="ml-auto w-2 h-2 bg-purple-400 rounded-full" />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={compileCode}
          disabled={isCompiling}
          className="px-6 py-3 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg font-medium flex items-center gap-2 text-white relative overflow-hidden"
        >
          {isCompiling && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-white/10 mix-blend-lighten"
            />
          )}
          {isCompiling ? (
            <FiLoader className="animate-spin" />
          ) : (
            <FiZap className="text-yellow-200" />
          )}
          {isCompiling ? 'Compiling...' : 'Run Code'}
          {!isCompiling && (
            <span className="text-xs ml-2 opacity-70">Ctrl+↩</span>
          )}
        </motion.button>
      </div>

      {/* Code Input Area */}
      <div className="relative flex-1 rounded-xl border border-purple-800/50 bg-gradient-to-b from-gray-900/50 to-gray-950 backdrop-blur-lg shadow-inner shadow-purple-900/10">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-purple-900/10 to-transparent pointer-events-none" />
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full bg-transparent text-purple-100 font-mono text-sm focus:outline-none resize-none p-4 pl-10"
          placeholder={`// Start coding in ${language.toUpperCase()}...\n${languageExamples[language].split('\n')[0]}`}
          spellCheck="false"
          style={{
            whiteSpace: 'pre-wrap',
            tabSize: 4,
            lineHeight: '1.5rem',
          }}
        />
        <div className="absolute right-4 bottom-4 text-xs text-purple-500/50">
          {code.length} chars
        </div>
      </div>

      {/* Language Examples */}
      <div className="rounded-xl border border-purple-800/50 bg-gray-900/50 p-4 backdrop-blur-lg">
        <div className="flex items-center gap-2 text-purple-300 mb-3">
          <FiCode className="text-sm" />
          <span className="text-sm font-medium bg-gradient-to-r from-purple-200 to-purple-400 bg-clip-text text-transparent">
            Quick Examples
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(languageExamples).map(([lang, example]) => (
            <motion.button
              key={lang}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setLanguage(lang);
                setCode(example);
              }}
              className={`text-left p-3 text-sm font-mono rounded-lg transition-all ${
                language === lang
                  ? 'bg-purple-600/30 border border-purple-500/50 shadow-md shadow-purple-900/20'
                  : 'bg-gray-800/30 hover:bg-gray-800/50 border border-transparent hover:border-purple-900/30'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {languageIcons[lang]}
                <span className="text-purple-300">{lang.toUpperCase()}</span>
              </div>
              <div className="text-purple-400/60 text-xs line-clamp-2">
                {example.split('\n')[0].replace(/^\s*/, '')}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Editor;