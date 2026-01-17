import { useState } from 'react';
import Onboarding from './pages/Onboarding';
import Verification from './pages/Verification';
import Calculating from './pages/Calculating';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat'; // NEW IMPORT

export default function App() {
  const [view, setView] = useState('start'); 
  const [selectedMatch, setSelectedMatch] = useState(null); // TRACK SELECTED MATCH

  if (view === 'interview') return <Onboarding onComplete={() => setView('verify')} />;
  if (view === 'verify') return <Verification onComplete={() => setView('calculating')} />;
  if (view === 'calculating') return <Calculating onComplete={() => setView('success')} />;
  
  if (view === 'success') {
    return <Dashboard onSelectMatch={(match) => {
      setSelectedMatch(match);
      setView('chat');
    }} />;
  }

  if (view === 'chat') {
    return <Chat match={selectedMatch} onBack={() => setView('success')} />;
  }

  // ... (Your Start Screen Return) ...
}