
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfile, Language } from './types';
import Dashboard from './pages/Dashboard';
import VoiceDetection from './pages/VoiceDetection';
import AgenticHoneypot from './pages/AgenticHoneypot';
import Assistant from './pages/Assistant';
import Architecture from './pages/Architecture';
import TestBench from './pages/TestBench';

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center text-center px-6"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "circOut" }}
      >
        <div className="w-24 h-24 bg-blue-600 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)]">
          <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4">
          KAVACH<span className="text-blue-500">.AI</span>
        </h1>
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-blue-400 font-mono text-xs md:text-sm tracking-[0.5em] uppercase font-bold"
        >
          Intelligent Protection Against Digital Fraud
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const Login = ({ onLogin }: { onLogin: (u: UserProfile) => void }) => {
  const [name, setName] = useState('');
  const [lang, setLang] = useState<Language>(Language.ENGLISH);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onLogin({ name, language: lang, isAuthenticated: true, tier: 'Elite' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_100%)]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900/60 backdrop-blur-2xl border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-600/20">
            <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <h2 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">Initialize KAVACH</h2>
          <p className="text-slate-500 text-sm">Authentication Protocol Required</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative">
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Operator Codename</label>
            <input 
              required type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="e.g. AGENT_KAVACH"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all font-mono"
            />
          </div>
          
          <div className="relative">
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Operating Region / Language</label>
            <div className="relative">
              <select 
                value={lang} onChange={(e) => setLang(e.target.value as Language)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-600/50 appearance-none transition-all"
              >
                {Object.values(Language).map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] active:scale-95 uppercase tracking-widest text-sm">
            Grant Operation Access
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const Navigation = () => {
  const items = [
    { to: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "HUB" },
    { to: "/voice-detection", icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z", label: "VOICE" },
    { to: "/agentic-honeypot", icon: "M13 10V3L4 14h7v7l9-11h-7z", label: "TRAP" },
    { to: "/assistant", icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z", label: "ASK" },
    { to: "/test-bench", icon: "M11 4a2 2 0 114 0v1a2 2 0 11-4 0V4zM4 11a2 2 0 114 0v1a2 2 0 11-4 0v-1zM11 18a2 2 0 114 0v1a2 2 0 11-4 0v-1zM18 11a2 2 0 114 0v1a2 2 0 11-4 0v-1z", label: "TEST" }
  ];

  return (
    <nav className="mobile-nav-bottom md:sticky md:top-0 md:h-screen md:w-20 bg-slate-900/80 backdrop-blur-xl border-t md:border-t-0 md:border-r border-slate-800 flex md:flex-col items-center justify-around md:justify-center gap-2 p-3 md:p-4 transition-all z-[60]">
      {items.map(item => (
        <NavLink 
          key={item.to} to={item.to} 
          className={({ isActive }) => `flex flex-col items-center justify-center p-3 rounded-2xl transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={item.icon} /></svg>
          <span className="text-[8px] font-black mt-1 uppercase tracking-tighter md:hidden">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('kavach_identity');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (u: UserProfile) => {
    setUser(u);
    localStorage.setItem('kavach_identity', JSON.stringify(u));
  };

  return (
    <Router>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row min-h-screen">
        {!showSplash && user && <Navigation />}
        
        <main className="flex-1 flex flex-col mb-20 md:mb-0">
          {!showSplash && (
            <Routes>
              {!user ? (
                <Route path="*" element={<Login onLogin={handleLogin} />} />
              ) : (
                <>
                  <Route path="/" element={<Dashboard user={user} />} />
                  <Route path="/voice-detection" element={<VoiceDetection />} />
                  <Route path="/agentic-honeypot" element={<AgenticHoneypot />} />
                  <Route path="/assistant" element={<Assistant />} />
                  <Route path="/architecture" element={<Architecture />} />
                  <Route path="/test-bench" element={<TestBench />} />
                </>
              )}
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
};

export default App;
