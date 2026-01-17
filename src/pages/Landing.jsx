import { Heart, MessageCircle, ShieldCheck, MapPin, ArrowRight, Star } from 'lucide-react';

export default function Landing({ onStart }) {
  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans selection:bg-rose-100 selection:text-rose-600">
      
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="text-3xl font-black text-[#FF2D55] tracking-tighter flex items-center gap-1">
          <Heart fill="currentColor" size={28} /> VÍNCULO
        </div>
        <div className="hidden md:flex gap-8 text-sm font-bold text-zinc-500">
          <a href="#how-it-works" className="hover:text-[#FF2D55] transition-colors">How it Works</a>
          <a href="#safety" className="hover:text-[#FF2D55] transition-colors">Safety</a>
        </div>
        <button 
          onClick={onStart}
          className="bg-[#FF2D55] text-white px-8 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-rose-100"
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <header className="px-6 pt-16 pb-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 text-left">
          <div className="inline-flex items-center gap-2 bg-rose-50 text-[#FF2D55] px-4 py-2 rounded-full mb-8 font-bold text-xs uppercase tracking-wider">
            <Star size={14} fill="currentColor" /> #1 Trusted App in Paraguay
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[1] tracking-tight text-zinc-950">
            Start your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2D55] to-[#FF9500]">
              Success Story.
            </span>
          </h1>
          
          <p className="text-zinc-500 text-lg md:text-xl mb-12 leading-relaxed max-w-xl">
            Tired of ghosting? Join the only community in Paraguay where every profile is Cédula-verified. Real people, real dates, real connections.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onStart}
              className="bg-[#FF2D55] px-10 py-5 rounded-2xl font-bold text-white text-lg flex items-center justify-center gap-3 hover:opacity-95 transition-all shadow-2xl shadow-rose-200 active:scale-95"
            >
              Join Vínculo for Free <ArrowRight />
            </button>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="md:w-1/2 relative">
          <div className="relative w-full aspect-square rounded-[3.5rem] overflow-hidden shadow-2xl shadow-rose-100 bg-rose-50 border-[12px] border-white">
            <img 
              src="https://images.unsplash.com/photo-1516589174184-c685265142ec?q=80&w=1887&auto=format&fit=crop" 
              className="w-full h-full object-cover"
              alt="Happy Couple"
            />
            {/* Floating Badge */}
            <div className="absolute bottom-10 left-10 bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-10 duration-700">
              <div className="bg-[#FF2D55] p-3 rounded-2xl text-white shadow-lg shadow-rose-200">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Verified Couple</p>
                <p className="font-bold text-zinc-950">Found in Asunción</p>
              </div>
            </div>
          </div>
          
          {/* Soft Background Accents */}
          <div className="absolute -top-10 -right-10 h-64 w-64 bg-orange-400 rounded-full blur-[100px] opacity-20" />
          <div className="absolute -bottom-10 -left-10 h-64 w-64 bg-rose-500 rounded-full blur-[100px] opacity-10" />
        </div>
      </header>

      {/* Why Vínculo Section */}
      <section className="bg-zinc-50 py-32 px-6 border-t border-zinc-100">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<ShieldCheck className="text-[#FF2D55]" />}
            title="Verified Identity"
            desc="No more catfishing. We verify every Cédula to ensure the person you see is the person you meet."
          />
          <FeatureCard 
            icon={<MapPin className="text-[#FF9500]" />}
            title="Local Heart"
            desc="From San Bernardino to Ciudad del Este. We celebrate the unique lifestyle of Paraguay."
          />
          <FeatureCard 
            icon={<MessageCircle className="text-blue-500" />}
            title="Smart Match"
            desc="Our AI algorithm understands your personality vectors to find deeper, lasting compatibility."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-zinc-100 text-center">
        <p className="text-xs text-zinc-400 font-bold uppercase tracking-[0.3em]">
          Lapacho Creative © 2026 • Asunción, Paraguay
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-10 bg-white rounded-[2.5rem] shadow-sm border border-zinc-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
      <div className="mb-8 bg-zinc-50 w-fit p-5 rounded-[1.5rem]">{icon}</div>
      <h3 className="text-2xl font-bold mb-4 tracking-tight">{title}</h3>
      <p className="text-zinc-500 leading-relaxed">{desc}</p>
    </div>
  );
}