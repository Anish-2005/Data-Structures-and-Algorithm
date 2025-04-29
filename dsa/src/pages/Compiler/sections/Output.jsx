import React, { useState, useEffect } from 'react';
import { FiBox, FiAlertCircle } from 'react-icons/fi';

const OutputSection = ({ code, language, isCompiling, setOutput, setErrors, languageIds }) => {
  const [output, setLocalOutput] = useState([]);
  const [errors, setLocalErrors] = useState([]);

  useEffect(() => {
    setLocalOutput([]);
    setLocalErrors([]);
  }, [code]);

  useEffect(() => {
    setOutput(output);
    setErrors(errors);
  }, [output, errors, setOutput, setErrors]);

  const compileCode = async () => {
    setLocalErrors([]);
    setLocalOutput([]);

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
        setLocalErrors(errorText.split('\n').filter(line => line.trim() !== ''));
      } else {
        setLocalOutput(outputText.split('\n').filter(line => line.trim() !== ''));
      }

    } catch (err) {
      setLocalErrors([err.message || 'Compilation failed']);
      console.error('Compilation error:', err);
    }
  };

  return (
    <div className="rounded-xl border-2 border-purple-800/50 bg-gray-900/50 backdrop-blur-lg flex-1 overflow-hidden">
      <div className="p-4 border-b border-purple-800/50 flex items-center gap-4">
        <FiBox className="text-pink-400" />
        <h2 className="text-lg font-semibold">Output</h2>
        <div className="ml-auto flex gap-2">
          <span className="text-sm text-purple-400">
            {language.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="h-[calc(100%-56px)] overflow-auto p-4 space-y-2">
        {errors.length > 0 ? (
          errors.map((error, i) => (
            <div key={i} className="flex items-start gap-2 font-mono text-sm text-red-300">
              <FiAlertCircle className="flex-shrink-0 mt-1" />
              {error}
            </div>
          ))
        ) : (
          output.map((line, i) => (
            <div key={i} className="flex items-start gap-2 font-mono text-sm text-green-300">
              <span>&gt;</span>
              {line}
            </div>
          ))
        )}
        {output.length === 0 && errors.length === 0 && (
          <div className="text-center text-purple-500 p-4">
            {isCompiling ? 'Compiling...' : 'Output will appear here'}
          </div>
        )}
      </div>
      <div className="p-4">
        <button
          onClick={compileCode}
          disabled={isCompiling}
          className="w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-600"
        >
          {isCompiling ? 'Compiling...' : 'Run Code'}
        </button>
      </div>
    </div>
  );
};

export default OutputSection;
