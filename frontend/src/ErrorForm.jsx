import React, { useState } from 'react';
import { Send, Code2, Loader2, Zap, Layers, MessageSquareText } from 'lucide-react';
import { motion } from 'framer-motion';

const languages = [
  'JavaScript', 'Python', 'Java', 'C++', 'React', 'TypeScript', 'Go', 'Rust', 'PHP', 'Ruby'
];

const depths = [
  { id: 'beginner', label: 'Basic', icon: Zap },
  { id: 'standard', label: 'Professional', icon: Layers },
  { id: 'senior', label: 'Deep Dive', icon: Code2 },
];

const tones = [
  { id: 'mentor', label: 'Helpful Mentor' },
  { id: 'pro', label: 'Concise & Pro' },
  { id: 'eli5', label: 'ELI5 (Simple)' },
];

export default function ErrorForm({ onSubmit, isLoading }) {
  const [language, setLanguage] = useState('JavaScript');
  const [depth, setDepth] = useState('standard');
  const [tone, setTone] = useState('mentor');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errorMsg.trim()) return;
    onSubmit({ language, error: errorMsg, depth, tone });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl glass-card p-6 sm:p-10 relative"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Language Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Code2 className="w-3 h-3" /> Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="glass-input w-full appearance-none"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* Depth Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Layers className="w-3 h-3" /> Depth
            </label>
            <div className="flex p-1 bg-slate-950/50 rounded-xl border border-white/5">
              {depths.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDepth(d.id)}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                    depth === d.id 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <d.icon className="w-3 h-3" />
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tone Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <MessageSquareText className="w-3 h-3" /> Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="glass-input w-full appearance-none"
            >
              {tones.map(t => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Error Input */}
        <div className="space-y-2 relative">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            Error Payload
          </label>
          <div className="relative group">
            <textarea
              value={errorMsg}
              onChange={(e) => setErrorMsg(e.target.value)}
              placeholder="Paste your trace, compiler error, or logic bug here..."
              className="w-full h-48 glass-input px-5 py-5 font-mono text-sm resize-none scrollbar-thin transition-shadow group-hover:shadow-[0_0_20px_rgba(79,70,229,0.05)]"
              required
            />
            <div className="absolute top-4 right-4 flex gap-2">
               <span className="px-2 py-1 rounded bg-rose-500/10 text-rose-500 text-[10px] font-bold border border-rose-500/20 uppercase">Critical</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
          <p className="text-xs text-slate-500 max-w-[280px]">
            AI will analyze the syntax tree and context to provide a tailored fix.
          </p>
          <button
            type="submit"
            disabled={isLoading || !errorMsg.trim()}
            className="primary-btn w-full sm:w-64 h-14 text-white group btn-shine-effect"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Debug with AI
                  <ArrowRightArrow className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </button>
        </div>
      </form>
    </motion.div>
  );
}

// Fixed Lucide icon name from hypothetical usage
function ArrowRightArrow({ className }) {
  return <Send className={className} />;
}
