import { ShieldCheck, MessageCircle, Heart, MapPin, Sparkles } from 'lucide-react';

const MATCHES = [
  { 
    id: 1, 
    name: "Gabriela", 
    age: 28, 
    score: 98, 
    district: "Villa Morra, Asunción", 
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop",
    verified: true 
  },
  { 
    id: 2, 
    name: "Valentina", 
    age: 25, 
    score: 91, 
    district: "San Bernardino", 
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    verified: true 
  }
];

export default function Dashboard({ onSelectMatch }) {
  return (
    <div className="min-h-screen bg-[#121212] p-6 text-white animate-in fade-in duration-700">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-black italic text-[#27ae60] tracking-tighter">VÍNCULO</h1>
          <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">Verified Ecosystem</p>
        </div>
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-2 border-[#D4AF37] p-0.5 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <img src="https://i.pravatar.cc/100?u=sturob" className="rounded-full h-full w-full object-cover" alt="Profile" />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-[#27ae60] rounded-full p-1 border-2 border-[#121212]">
            <ShieldCheck size={10} className="text-white" />
          </div>
        </div>
      </header>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Sparkles size={18} className="text-[#27ae60]" /> Top AI Matches
        </h2>
        <span className="text-xs text-zinc-500 font-medium">Asunción, PY</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-24">
        {MATCHES.map(match => (
          <div 
            key={match.id} 
            onClick={() => onSelectMatch(match)}
            className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/5 group cursor-pointer shadow-xl transition-all active:scale-95"
          >
            <img src={match.img} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" alt={match.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            
            <div className="absolute top-3 left-3 flex gap-1">
              <div className="bg-[#27ae60] text-white text-[10px] font-black px-2 py-1 rounded-lg backdrop-blur-md shadow-lg">
                {match.score}%
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-1 mb-1">
                <p className="font-bold text-base">{match.name}</p>
                {match.verified && <ShieldCheck size={14} className="text-[#D4AF37]" />}
              </div>
              <p className="text-[10px] text-zinc-400 flex items-center font-medium">
                <MapPin size={10} className="mr-1 text-[#27ae60]" /> {match.district}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modern Floating Nav */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[85%] max-w-sm bg-zinc-900/80 backdrop-blur-2xl border border-white/5 rounded-full py-4 px-8 flex justify-between items-center shadow-2xl">
        <Heart className="text-[#27ae60] hover:scale-110 transition-transform cursor-pointer" size={24} />
        <MessageCircle className="text-zinc-600 hover:text-white transition-colors cursor-pointer" size={24} />
        <ShieldCheck className="text-zinc-600 hover:text-white transition-colors cursor-pointer" size={24} />
      </nav>
    </div>
  );
}