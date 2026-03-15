import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Lock, Mail, ArrowRight, Github } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login for now
    onLogin({ name: 'Developer User', email });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mesh-gradient overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card p-8 sm:p-10 relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-indigo-600/20 rounded-2xl mb-4 border border-indigo-500/30">
            <Terminal className="w-8 h-8 text-indigo-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400 text-center">Login to access your AI Debug Assistant</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="email" 
                required
                className="glass-input w-full pl-12"
                placeholder="developer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="password" 
                required
                className="glass-input w-full pl-12"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm py-1">
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
              <input type="checkbox" className="rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-offset-slate-950" />
              Remember me
            </label>
            <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</a>
          </div>

          <button type="submit" className="primary-btn w-full flex items-center justify-center gap-2 group btn-shine-effect py-4">
            Sign In
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10"></div>
          <span className="text-xs text-slate-500 uppercase tracking-widest">Or continue with</span>
          <div className="h-px flex-1 bg-white/10"></div>
        </div>

        <div className="mt-6">
          <button className="secondary-btn w-full flex items-center justify-center gap-3">
            <Github className="w-5 h-5" />
            Sign in with GitHub
          </button>
        </div>

        <p className="mt-8 text-center text-slate-500 text-sm">
          Don't have an account? <a href="#" className="text-indigo-400 font-medium hover:underline">Create one</a>
        </p>
      </motion.div>
    </div>
  );
}
