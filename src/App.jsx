import SwipeCard from './components/SwipeCard';
import { Flame, MessageCircle, ShieldCheck, User } from 'lucide-react';

const MOCK_USER = {
  name: "Gabriela",
  age: 28,
  matchScore: 98,
  isVerified: true,
  district: "Villa Morra, Asunción",
  image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop"
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center">
      {/* Top Header */}
      <header className="w-full max-w-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-black italic text-[#27ae60]">VÍNCULO</h1>
        <div className="h-2 w-2 bg-[#27ae60] rounded-full animate-pulse" />
      </header>

      {/* Main Swipe Area */}
      <main className="flex-grow flex items-center justify-center w-full px-6 mb-20">
        <SwipeCard user={MOCK_USER} />
      </main>

      {/* Bottom Navigation (The Mobile Look) */}
      <nav className="fixed bottom-0 w-full max-w-md bg-[#1E1E1E]/80 backdrop-blur-xl border-t border-white/5 py-4 px-8 flex justify-between items-center rounded-t-3xl">
        <Flame className="text-[#27ae60]" />
        <MessageCircle className="text-zinc-500" />
        <ShieldCheck className="text-zinc-500" />
        <User className="text-zinc-500" />
      </nav>
    </div>
  );
}