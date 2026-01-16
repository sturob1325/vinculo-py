import { useState } from 'react';
import Onboarding from './pages/Onboarding';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('test'); // 'test' or 'onboarding'

  if (view === 'onboarding') {
    return <Onboarding onComplete={() => setView('test')} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] p-4 text-white font-sans">
      <div className="bg-[#1E1E1E] p-8 rounded-3xl border border-zinc-800 shadow-2xl text-center max-w-sm">
        <h1 className="text-4xl font-black mb-4 bg-gradient-to-r from-[#27ae60] to-emerald-400 bg-clip-text text-transparent italic">
          Vínculo PY
        </h1>
        <p className="text-zinc-400 mb-8">Setup successful. Your engine is ready for national launch.</p>
        
        <button 
          onClick={() => setView('onboarding')}
          className="group relative flex items-center gap-2 bg-[#27ae60] hover:bg-emerald-600 px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-900/40"
        >
          <Sparkles className="h-5 w-5" />
          <span>Start AI Interview</span>
        </button>
      </div>
    </div>
  );
}