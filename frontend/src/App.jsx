import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import ErrorForm from './ErrorForm';
import ResultDisplay from './ResultDisplay';
import Documentation from './Documentation';
import ApiReference from './ApiReference';
import { HeroScrollDemo } from './components/HeroScrollDemo';
import { motion, AnimatePresence } from 'framer-motion';

function Layout({ user, onLogout, children }) {
  return (
    <div className="min-h-screen mesh-gradient relative">
      <Navbar user={user} onLogout={onLogout} />
      {children}
      <footer className="py-10 border-t border-white/5 text-center text-slate-500 text-xs font-medium uppercase tracking-[0.2em]">
        &copy; 2026 AI Debugger &bull; Built for Modern Developers
      </footer>
    </div>
  );
}

function MainApp({ user, onLogout }) {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleExplain = async (formData) => {
    setIsLoading(true);
    setErrorMsg(null);
    setResult(null);
    
    try {
      const response = await fetch(import.meta.env.VITE_API_URL || 'http://localhost:5000/explain-error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `Server returned ${response.status}`);
      }
      
      setResult(data);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="pt-32 pb-20 px-4 flex flex-col items-center relative z-10">
      <header className="text-center mb-16 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter"
        >
          Debug with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Superpowers</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed"
        >
          Understand the 'why' behind the crash. Paste your error and let AI engineer a tailored solution for you.
        </motion.p>
      </header>

      <HeroScrollDemo />

      <div className="w-full max-w-5xl space-y-12 flex flex-col items-center -mt-60">
        <ErrorForm onSubmit={handleExplain} isLoading={isLoading} />
        
        <AnimatePresence>
          {errorMsg && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-4xl p-6 bg-rose-500/10 border border-rose-500/20 rounded-3xl text-rose-400 backdrop-blur-md flex items-center gap-4"
            >
              <div className="w-2 h-2 rounded-full bg-rose-500"></div>
              <p className="font-medium">{errorMsg}</p>
            </motion.div>
          )}

          {result && !isLoading && (
            <ResultDisplay result={result} />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ai_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('ai_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('ai_user');
  };

  const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
    return <Layout user={user} onLogout={handleLogout}>{children}</Layout>;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <MainApp user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/documentation" 
          element={
            <ProtectedRoute>
              <Documentation />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/api-reference" 
          element={
            <ProtectedRoute>
              <ApiReference />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
