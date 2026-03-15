import React, { useState } from 'react';
import { Copy, Check, Terminal, Bug, Lightbulb, ShieldCheck, Zap, Code } from 'lucide-react';

export default function ResultDisplay({ result }) {
  const [copiedSection, setCopiedSection] = useState(null);

  const handleCopy = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const Section = ({ icon: Icon, title, content, isCode = false, sectionId }) => {
    if (!content) return null;

    return (
      <div className="flex flex-col gap-3 p-5 rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
            <Icon className="w-5 h-5 text-indigo-400" />
            {title}
          </h3>
          {isCode && (
            <button
              onClick={() => handleCopy(content, sectionId)}
              className="px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 transition-colors group flex items-center gap-2 outline-none focus:ring-2 focus:ring-indigo-500/50"
              title="Copy code"
            >
              {copiedSection === sectionId ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-emerald-400 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 group-hover:text-indigo-300 transition-colors" />
                  <span className="text-xs font-medium">Copy</span>
                </>
              )}
            </button>
          )}
        </div>
        
        {isCode ? (
          <div className="relative overflow-hidden rounded-xl bg-slate-950/80 border border-slate-800/80 shadow-inner">
            <div className="absolute top-0 left-0 w-full h-8 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            </div>
            <pre className="p-4 pt-12 overflow-x-auto text-sm text-slate-300 font-mono leading-relaxed">
              <code>{content}</code>
            </pre>
          </div>
        ) : (
          <p className="text-slate-300 leading-relaxed text-sm md:text-base">
            {content}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl glass-panel p-6 sm:p-8 animate-float" style={{ animationDelay: '0.2s', animationDuration: '8s' }}>
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-700/50">
        <div className="p-2.5 bg-indigo-500/20 rounded-xl text-indigo-400">
          <Zap className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          AI Analysis Results
        </h2>
      </div>

      <div className="space-y-4">
        <Section 
          icon={Bug} 
          title="Error Name" 
          content={result['1. Error Name'] || result.error_name} 
          sectionId="error_name"
        />
        <Section 
          icon={Terminal} 
          title="Simple Explanation" 
          content={result['2. Simple Explanation'] || result.simple_explanation} 
          sectionId="simple_explanation"
        />
        <Section 
          icon={Lightbulb} 
          title="Why This Happens" 
          content={result['3. Why This Error Happens'] || result.why_it_happens} 
          sectionId="why_it_happens"
        />
        <Section 
          icon={Check} 
          title="How to Fix It" 
          content={result['4. How to Fix It'] || result.how_to_fix} 
          sectionId="how_to_fix"
        />
        <Section 
          icon={Code} 
          title="Example Code Fix" 
          content={result['5. Example Code Fix'] || result.example_code_fix} 
          isCode={true} 
          sectionId="example_code"
        />
        <Section 
          icon={ShieldCheck} 
          title="Prevention Tips" 
          content={result['6. Prevention Tips'] || result.prevention_tips} 
          sectionId="prevention_tips"
        />
      </div>
    </div>
  );
}
