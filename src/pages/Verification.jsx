import { useState } from 'react';
import { Camera, ShieldCheck, RefreshCw, Lock } from 'lucide-react';

export default function Verification({ onComplete }) {
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onComplete();
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-8">Identify Verification</h1>
        <div className="relative w-full aspect-[1.58/1] rounded-2xl border-2 border-zinc-800 bg-zinc-900/30 overflow-hidden mb-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554034483-04fda0d3507b?q=80&w=2070&auto=format&fit=crop')] opacity-10 grayscale" />
          {isScanning && <div className="absolute top-0 left-0 w-full h-1 bg-[#27ae60] shadow-[0_0_15px_#27ae60] animate-scan" />}
          <div className="absolute inset-6 border border-dashed border-white/10 rounded-xl flex items-center justify-center">
            <Camera size={32} className="text-zinc-700" />
          </div>
        </div>
        <button onClick={startScan} disabled={isScanning} className="w-full py-5 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2">
          {isScanning ? <RefreshCw className="animate-spin" /> : <Camera size={20} />}
          {isScanning ? 'Analyzing Cédula...' : 'Capture ID Photo'}
        </button>
        <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
          <Lock size={12} className="text-[#D4AF37]" /> Secure Lapacho Protocol
        </div>
      </div>
    </div>
  );
}