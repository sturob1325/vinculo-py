import { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function Calculating({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Analyzing Profile...');

  const messages = [
    { p: 20, m: 'Reviewing Cédula Data...' },
    { p: 50, m: 'Matching Personality Vectors...' },
    { p: 80, m: 'Finding your best matches...' },
    { p: 100, m: 'Identity Verified & Ready.' }
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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-zinc-900">
      <div className="w-full max-w-sm text-center">
        <div className="relative h-32 w-32 mx-auto mb-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-rose-500 rounded-full opacity-20 animate-ping" />
          <div className="relative bg-rose-50 p-6 rounded-full border border-rose-100 shadow-xl shadow-rose-100/20">
            <Heart size={40} className="text-[#FF2D55]" fill="currentColor" />
          </div>
        </div>
        <h2 className="text-2xl font-black mb-4 tracking-tight">{status}</h2>
        <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-gradient-to-r from-[#FF2D55] to-[#FF9500] transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
          <Sparkles size={12} className="text-rose-400" /> Lapacho AI Matchmaker
        </div>
      </div>
    </div>
  );
}