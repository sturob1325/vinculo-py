import { useEffect, useState } from 'react';
import { Cpu, Zap, Search, Shield } from 'lucide-react';

export default function Calculating({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Encoding Personality...');

  const messages = [
    { p: 20, m: 'Extracting linguistic patterns...' },
    { p: 50, m: 'Generating high-dimensional vectors...' },
    { p: 80, m: 'Running Cosine Similarity checks...' },
    { p: 100, m: 'Identity Verified & Match-Ready.' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 1;
        const currentMsg = messages.find(m => m.p === next);
        if (currentMsg) setStatus(currentMsg.m);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
        }
        return next;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-8 text-white">
      <div className="w-full max-w-sm text-center">
        <div className="relative h-32 w-32 mx-auto mb-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#27ae60] rounded-full opacity-20 animate-ping" />
          <div className="relative bg-[#1E1E1E] p-6 rounded-full border border-[#27ae60]/50 shadow-[0_0_30px_rgba(39,174,96,0.2)]">
            <Cpu size={40} className="text-[#27ae60]" />
          </div>
        </div>
        <h2 className="text-xl font-bold mb-4">{status}</h2>
        <div className="w-full bg-zinc-900 h-1.5 rounded-full overflow-hidden">
          <div className="h-full bg-[#27ae60] transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}