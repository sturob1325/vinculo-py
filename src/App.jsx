import { useState } from 'react';
import Landing from './pages/Landing'; // NEW
import Onboarding from './pages/Onboarding';
import Verification from './pages/Verification';
import Calculating from './pages/Calculating';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';

export default function App() {
  const [step, setStep] = useState('landing'); // CHANGE STARTING POINT
  const [selectedMatch, setSelectedMatch] = useState(null);

  // LOGIC SWITCHER
  if (step === 'landing') return <Landing onStart={() => setStep('interview')} />;
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
}