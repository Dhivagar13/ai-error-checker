import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, Network, Shield, Key, Database } from 'lucide-react';

const endpoints = [
  {
    method: "POST",
    path: "/v1/explain",
    desc: "Analyze an error message and get a structured fix.",
    params: ["language", "error", "depth", "tone"]
  },
  {
    method: "GET",
    path: "/v1/usage",
    desc: "Retrieve current API usage and quota remaining for your account.",
    params: ["api_key"]
  },
  {
    method: "POST",
    path: "/v1/feedback",
    desc: "Submit feedback on an AI-generated explanation to improve future results.",
    params: ["request_id", "rating", "comment"]
  }
];

export default function ApiReference() {
  return (
    <div className="min-h-screen mesh-gradient pt-32 pb-20 px-4 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-6xl w-full"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16">
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4">API Reference</h1>
            <p className="text-slate-400 text-lg">Integrate the most powerful error explanation engine into your own tools.</p>
          </div>
          <div className="flex bg-slate-900/40 p-1 rounded-xl border border-white/5">
            <span className="px-4 py-2 text-xs font-bold text-indigo-400 uppercase tracking-tighter">v1.2.0 Stable</span>
          </div>
        </div>

        <div className="space-y-8">
          {endpoints.map((ep, i) => (
            <motion.div
              key={ep.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card overflow-hidden hover:border-indigo-500/20 transition-all"
            >
              <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/5">
                <div className="p-8 md:w-2/3">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded text-[10px] font-black uppercase ${ep.method === 'POST' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                      {ep.method}
                    </span>
                    <code className="text-indigo-400 font-mono font-bold">{ep.path}</code>
                  </div>
                  <h3 className="text-slate-200 font-medium mb-4">{ep.desc}</h3>
                  <div className="flex flex-wrap gap-2">
                    {ep.params.map(p => (
                      <span key={p} className="px-2 py-1 bg-white/5 rounded text-[10px] font-mono text-slate-500 border border-white/5">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-8 md:w-1/3 bg-slate-950/30">
                  <div className="flex items-center gap-2 mb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                    <Terminal className="w-3 h-3" /> cURL Example
                  </div>
                  <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-400 border border-white/5 leading-loose">
                    <span className="text-indigo-400">curl</span> -X {ep.method} \<br/>
                    &nbsp;&nbsp;"https://api.aie.dev{ep.path}" \<br/>
                    &nbsp;&nbsp;-H <span className="text-emerald-400">"Authorization: Bearer KEY"</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
