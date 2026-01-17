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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-zinc-900">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-3xl font-black mb-4 tracking-tight">Identity Check</h1>
        <p className="text-zinc-500 text-sm mb-10">Securely verify your identity to start matching with real people in Asunción.</p>

        <div className="relative w-full aspect-[1.58/1] rounded-[2rem] border-2 border-zinc-100 bg-zinc-50 overflow-hidden mb-10 shadow-inner">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554034483-04fda0d3507b?q=80&w=2070&auto=format&fit=crop')] opacity-5 grayscale" />
          {isScanning && <div className="absolute top-0 left-0 w-full h-1 bg-[#FF2D55] shadow-[0_0_15px_#FF2D55] animate-scan z-10" />}
          <div className="absolute inset-6 border-2 border-dashed border-rose-200 rounded-2xl flex flex-col items-center justify-center">
            <Camera size={32} className="text-rose-300" />
            <span className="text-[10px] font-bold text-rose-300 uppercase mt-2 tracking-widest">Place Cédula Here</span>
          </div>
        </div>

        <button onClick={startScan} disabled={isScanning} className="w-full py-5 bg-[#FF2D55] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-rose-100 active:scale-95 transition-all">
          {isScanning ? <RefreshCw className="animate-spin" /> : <Camera size={20} />}
          {isScanning ? 'Authenticating...' : 'Scan Your Cédula'}
        </button>

        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
          <Lock size={12} className="text-rose-400" /> Secure Lapacho Protocol
        </div>
      </div>
    </div>
  );
}