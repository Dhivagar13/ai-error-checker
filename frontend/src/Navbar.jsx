import React from 'react';
import { Terminal, LogOut, User, Settings, Sparkles } from 'lucide-react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-slate-950/30 border-b border-white/5">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => navigate('/')}
      >
        <div className="p-2 bg-indigo-600/20 rounded-lg group-hover:bg-indigo-600/30 transition-colors border border-indigo-500/20">
          <Terminal className="w-5 h-5 text-indigo-400" />
        </div>
        <span className="font-bold text-xl text-white tracking-tight">AI Error Explainer</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em]">
          <Link 
            to="/" 
            className={`transition-colors hover:text-indigo-400 ${isActive('/') ? 'text-indigo-400' : 'text-slate-400'}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/documentation" 
            className={`transition-colors hover:text-indigo-400 ${isActive('/documentation') ? 'text-indigo-400' : 'text-slate-400'}`}
          >
            Documentation
          </Link>
          <Link 
            to="/api-reference" 
            className={`transition-colors hover:text-indigo-400 ${isActive('/api-reference') ? 'text-indigo-400' : 'text-slate-400'}`}
          >
            API Reference
          </Link>
        </div>

        {user ? (
          <div className="flex items-center gap-3 pl-6 border-l border-white/10">
            <div className="flex flex-col items-end mr-2 hidden sm:flex">
              <span className="text-sm font-medium text-slate-200">{user.name}</span>
              <span className="text-[10px] uppercase text-indigo-400 tracking-tighter flex items-center gap-1">
                Pro Account <Sparkles className="w-2 h-2" />
              </span>
            </div>
            <div className="relative group pt-2 pb-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 hover:bg-indigo-600/30 transition-all cursor-pointer">
                <User className="w-5 h-5" />
              </div>
              
              {/* Dropdown Mockup */}
              <div className="absolute right-0 top-full mt-1 w-48 glass-card border border-white/10 p-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100">
                <button className="w-full text-left px-4 py-2 hover:bg-white/5 rounded-lg text-sm flex items-center gap-2 transition-colors">
                  <Settings className="w-4 h-4" /> Settings
                </button>
                <button 
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 hover:bg-rose-500/10 text-rose-400 rounded-lg text-sm flex items-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => navigate('/login')}
            className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
