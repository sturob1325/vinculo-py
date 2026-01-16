import { useState } from 'react';
import Onboarding from './pages/Onboarding';
import Verification from './pages/Verification';
import Dashboard from './pages/Dashboard';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [view, setView] = useState('start'); // 'start', 'interview', 'verify', 'success'

  if (view === 'interview') return <Onboarding onComplete={() => setView('verify')} />;
  if (view === 'verify') return <Verification onComplete={() => setView('success')} onCancel={() => setView('start')} />;
  if (view === 'success') return <Dashboard />;

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-8 text-white">
      <div className="max-w-xs text-center">
        <h1 className="text-5xl font-black italic text-[#27ae60] mb-4 tracking-tighter">VÍNCULO</h1>
        <p className="text-zinc-500 text-sm mb-12 leading-relaxed">The only verified dating ecosystem in Paraguay. AI-matched, Cédula-secured.</p>
        
        <button 
          onClick={() => setView('interview')}
          className="w-full bg-[#27ae60] py-5 rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-900/20 active:scale-95 flex items-center justify-center gap-3"
        >
          <Sparkles /> Start AI Interview
        </button>
      </div>
    </div>
  );
}