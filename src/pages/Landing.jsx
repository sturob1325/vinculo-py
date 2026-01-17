import { ShieldCheck, Sparkles, Zap, Globe, ArrowRight } from 'lucide-react';

export default function Landing({ onStart }) {
  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-[#27ae60]">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="text-2xl font-black italic text-[#27ae60] tracking-tighter">VÍNCULO</div>
        <div className="hidden md:flex gap-8 text-sm font-bold text-zinc-400 uppercase tracking-widest">
          <a href="#features" className="hover:text-white transition-colors">Technology</a>
          <a href="#security" className="hover:text-white transition-colors">Security</a>
        </div>
        <button 
          onClick={onStart}
          className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-[#27ae60] hover:text-white transition-all"
        >
          Launch App
        </button>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pt-20 pb-32 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#1E1E1E] px-4 py-2 rounded-full mb-8 border border-white/5">
          <Sparkles size={16} className="text-[#27ae60]" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Now Live in Asunción</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
          Meaningful <br />
          <span className="text-[#27ae60]">Connections</span> <br />
          Driven by AI.
        </h1>
        <p className="text-zinc-500 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          The first identity-verified dating ecosystem in Paraguay. We use high-dimensional vector embeddings to find your perfect match, secured by national ID verification.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button 
            onClick={onStart}
            className="bg-[#27ae60] px-10 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-2xl shadow-emerald-900/20"
          >
            Find Your Match <ArrowRight />
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="bg-[#181818] py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<Zap className="text-[#27ae60]" />}
            title="Vector Matching"
            desc="Our AI analyzes your personality 'fingerprint' using cosine similarity for 99.9% compatibility accuracy."
          />
          <FeatureCard 
            icon={<ShieldCheck className="text-[#D4AF37]" />}
            title="Cédula Verified"
            desc="Every profile is manually verified via a real-time ID scan, eliminating bots and catfishing in Paraguay."
          />
          <FeatureCard 
            icon={<Globe className="text-blue-500" />}
            title="Localized Context"
            desc="From San Bernardino to Ciudad del Este, our algorithm understands the unique Paraguayan lifestyle."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-white/5">
        <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.5em]">
          Lapacho Creative © 2026 • Built for the Future
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-10 bg-[#1E1E1E] rounded-[2.5rem] border border-white/5 hover:border-[#27ae60]/30 transition-colors group">
      <div className="mb-6 p-4 bg-[#121212] w-fit rounded-2xl group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}