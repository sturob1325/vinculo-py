import { ShieldCheck, MapPin, Sparkles } from 'lucide-react';

export default function SwipeCard({ user }) {
  return (
    <div className="relative w-full max-w-sm aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group">
      {/* Background Image */}
      <img src={user.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={user.name} />
      
      {/* Dark Luxury Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/20 to-transparent" />
      
      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="flex items-center gap-2 mb-4">
          {/* AI Match Chip */}
          <div className="bg-[#27ae60] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg shadow-emerald-900/40">
            <Sparkles size={12} /> {user.matchScore}% Match
          </div>
          {/* Trust Badge */}
          {user.isVerified && (
            <div className="bg-[#D4AF37]/90 backdrop-blur-sm text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
              <ShieldCheck size={12} /> Verified
            </div>
          )}
        </div>

        <h2 className="text-4xl font-bold text-white mb-2">{user.name}, {user.age}</h2>
        
        <div className="flex items-center text-zinc-400">
          <MapPin size={16} className="mr-1 text-[#27ae60]" />
          <span className="text-sm tracking-wide">{user.district}</span>
        </div>
      </div>
    </div>
  );
}