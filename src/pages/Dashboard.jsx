import { ShieldCheck, MessageCircle, Heart, MapPin } from 'lucide-react';

const MATCHES = [
  { id: 1, name: "Gabriela", age: 28, score: 98, district: "Villa Morra", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop" },
  { id: 2, name: "Andrea", age: 24, score: 92, district: "San Bernardino", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop" }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#121212] p-6 text-white animate-in slide-in-from-bottom duration-700">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold italic text-[#27ae60]">VÍNCULO</h1>
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Verified Profile</p>
        </div>
        <div className="h-12 w-12 rounded-full border-2 border-[#D4AF37] p-0.5">
          <img src="https://i.pravatar.cc/100" className="rounded-full" alt="Me" />
        </div>
      </header>

      <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
        <Heart size={20} className="text-red-500" /> Top AI Matches
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {MATCHES.map(match => (
          <div key={match.id} className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/5 group">
            <img src={match.img} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            
            <div className="absolute top-2 right-2 bg-[#27ae60] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              {match.score}%
            </div>

            <div className="absolute bottom-3 left-3">
              <p className="font-bold text-sm flex items-center gap-1">
                {match.name} <ShieldCheck size={12} className="text-[#D4AF37]" />
              </p>
              <p className="text-[10px] text-zinc-400 flex items-center tracking-tighter">
                <MapPin size={8} className="mr-0.5" /> {match.district}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Bar */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-xs bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full p-2 flex justify-around items-center">
        <button className="p-4 text-[#27ae60]"><Heart /></button>
        <button className="p-4 text-zinc-500"><MessageCircle /></button>
        <button className="p-4 text-zinc-500"><ShieldCheck /></button>
      </div>
    </div>
  );
}