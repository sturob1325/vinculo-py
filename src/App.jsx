import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Landing from './pages/Landing';
import Join from './pages/Join';
import Onboarding from './pages/Onboarding';
import Verification from './pages/Verification';
import Calculating from './pages/Calculating';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';

export default function App() {
  const [step, setStep] = useState('landing'); 
  const [selectedMatch, setSelectedMatch] = useState(null);

  useEffect(() => {
    console.log("Vínculo System Initialized. Step:", step);
  }, [step]);

  // Page Routing Logic
  if (step === 'landing') return <Landing onStart={() => setStep('join')} />;
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

  return <div className="p-10 text-center">Loading Vínculo...</div>;
}