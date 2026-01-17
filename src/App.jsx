import { useState } from 'react';
import Onboarding from "./pages/Onboarding";
import Verification from "./pages/Verification";
import Calculating from "./pages/Calculating";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";

export default function App() {
  const [step, setStep] = useState('start'); 
  const [selectedMatch, setSelectedMatch] = useState(null);

  if (step === 'onboarding') return <Onboarding onComplete={() => setStep('verify')} />;
  if (step === 'verify') return <Verification onComplete={() => setStep('calculating')} />;
  if (step === 'calculating') return <Calculating onComplete={() => setStep('success')} />;
  
  if (step === 'success') {
    return <Dashboard onSelectMatch={(match) => {
      setSelectedMatch(match);
      setStep('chat');
    }} />;
  }

  if (step === 'chat') return <Chat match={selectedMatch} onBack={() => setStep('success')} />;

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-8 text-white">
      <h1 className="text-5xl font-black italic text-[#27ae60] mb-4 tracking-tighter">VÍNCULO</h1>
      <p className="text-zinc-500 text-center mb-12">Verified dating in Paraguay.</p>
      <button onClick={() => setStep('onboarding')} className="w-full max-w-xs bg-[#27ae60] py-5 rounded-2xl font-bold">
        Start AI Interview
      </button>
    </div>
  );
}