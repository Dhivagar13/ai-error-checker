import React from 'react';
import { motion } from 'framer-motion';
import { Book, Code, Zap, Shield, Cpu, Globe } from 'lucide-react';

const docs = [
  {
    title: "Getting Started",
    icon: Zap,
    description: "Learn how to integrate AI Error Explainer into your development workflow in under 5 minutes.",
    links: ["Installation", "Quick Start", "Authentication"]
  },
  {
    title: "Core Concepts",
    icon: Book,
    description: "Understand the underlying AI technology, prompt engineering, and analysis depth levels.",
    links: ["Analysis Engine", "Custom Tones", "Context Awareness"]
  },
  {
    title: "Advanced Usage",
    icon: Cpu,
    description: "Fine-tune the output for complex enterprise-level stack traces and legacy codebases.",
    links: ["CLI Tool", "Webhooks", "CI/CD Integration"]
  }
];

export default function Documentation() {
  return (
    <div className="min-h-screen mesh-gradient pt-32 pb-20 px-4 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl w-full"
      >
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">Documentation</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Everything you need to know about building, debugging, and scaling with AI Error Explainer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {docs.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 group hover:border-indigo-500/30 transition-all"
            >
              <div className="p-3 bg-indigo-600/20 rounded-xl w-fit mb-6 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                <section.icon className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-3">{section.title}</h2>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                {section.description}
              </p>
              <ul className="space-y-3">
                {section.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-2 group/link">
                      <div className="w-1 h-1 rounded-full bg-indigo-500/50 group-hover/link:bg-indigo-400 transition-colors"></div>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-10 glass-card border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-8 bg-indigo-600/5">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Need Help?</h2>
            <p className="text-slate-400">Our engineering team is always here to help you solve your most complex errors.</p>
          </div>
          <button className="primary-btn whitespace-nowrap px-10">Join Discord Community</button>
        </div>
      </motion.div>
    </div>
  );
}
