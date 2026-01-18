import { X, Heart, MessageCircle, MapPin, ShieldCheck, Info } from 'lucide-react';

export default function MatchDetail({ match, onBack, onMatch }) {
  if (!match) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom duration-500">
      {/* Action Header */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
        <button onClick={onBack} className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/40">
          <X size={24} />
        </button>
        <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-white/30">
          <ShieldCheck size={16} className="text-white" />
          <span className="text-[10px] font-black text-white uppercase tracking-tighter">AI Verified</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="h-[60vh] relative">
        <img src={match.image} className="w-full h-full object-cover" alt={match.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      </div>

      {/* Bio Section */}
      <div className="flex-1 bg-white -mt-12 rounded-t-[3rem] p-8 space-y-6 overflow-y-auto">
        <div>
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-4xl font-black text-zinc-900 tracking-tighter">{match.name}, {match.age}</h2>
            <div className="flex items-center gap-1 text-[#FF2D55] font-bold text-sm bg-rose-50 px-3 py-1 rounded-full">
              98% Match
            </div>
          </div>
          <div className="flex items-center gap-1 text-zinc-400 text-xs font-bold uppercase tracking-widest">
            <MapPin size={14} /> Asunción, Paraguay
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-bold text-zinc-900 flex items-center gap-2">
            <Info size={18} className="text-[#FF2D55]" />
            About
          </h3>
          <p className="text-zinc-500 leading-relaxed italic">
            {match.bio || "Searching for someone to share stories and a good cup of coffee with in the city."}
          </p>
        </div>

        {/* Interaction Buttons */}
        <div className="flex gap-4 pt-4">
          <button 
            onClick={onMatch}
            className="flex-1 bg-[#FF2D55] text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-rose-200 active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <Heart fill="currentColor" size={24} /> Match
          </button>
          <button className="p-5 bg-zinc-50 text-zinc-400 rounded-[2rem] border border-zinc-100 active:scale-95 transition-all">
            <MessageCircle size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}