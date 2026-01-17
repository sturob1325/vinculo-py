import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Landing from './pages/Landing';
import Join from './pages/Join';
import Onboarding from './pages/Onboarding';
import Verification from './pages/Verification';
import Calculating from './pages/Calculating';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import { Heart } from 'lucide-react';

// THIS LINE FIXES THE "EXPORT NAMED DEFAULT" ERROR
export default function App() {
  const [step, setStep] = useState('landing'); 
  const [selectedMatch, setSelectedMatch] = useState(null);

  // THIS LOGS YOUR DB CONNECTION STATUS IN THE CONSOLE
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase
        .from('profiles') 
        .select('*')
        .limit(1);

      if (error) {
        console.error('❌ DB Connection Error:', error.message);
      } else {
        console.log('✅ DB Connection Successful! Data:', data);
      }
    };
    testConnection();
  }, []);

  // PAGE ROUTING LOGIC
  if (step === 'landing') return <Landing onStart={() => setStep('start')} />;
  if (step === 'join') return <Join onJoinSuccess={() => setStep('interview')} />;
  if (step === 'interview') return <Onboarding onComplete={() => setStep('verify')} />;
  if (step === 'verify') return <Verification onComplete={() => setStep('calculating')} />;
  if (step === 'calculating') return <Calculating onComplete={() => setStep('success')} />;
  
  if (step === 'success') {
    return <Dashboard onSelectMatch={(match) => {
      setSelectedMatch(match);
      setStep('chat');
    }} />;
  }

  if (step === 'chat') return <Chat match={selectedMatch} onBack={() => setStep('success')} />;

  // THE "START" SPLASH SCREEN
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-zinc-950 font-sans">
      <div className="max-w-xs w-full text-center">
        <div className="mb-10 relative inline-block">
          <div className="absolute inset-0 bg-rose-500 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="relative bg-rose-50 p-8 rounded-[2.5rem] border border-rose-100 shadow-xl shadow-rose-100/50">
            <Heart size={56} className="text-[#FF2D55]" fill="currentColor" />
          </div>
        </div>
        <h1 className="text-5xl font-black mb-4 tracking-tighter italic">VÍNCULO</h1>
        <p className="text-zinc-500 text-sm mb-12 font-medium">Verified dating in Paraguay.</p>
        <button 
          onClick={() => setStep('join')}
          className="w-full bg-[#FF2D55] py-5 rounded-2xl font-bold text-white text-lg hover:opacity-90 shadow-2xl shadow-rose-200 active:scale-95 transition-all"
        >
          Begin AI Interview
        </button>
      </div>
    </div>
  );
}