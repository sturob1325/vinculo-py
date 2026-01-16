import { useState } from 'react';
import { Camera, ShieldCheck, RefreshCw, X, Lock } from 'lucide-react';

export default function Verification({ onComplete, onCancel }) {
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    setIsScanning(true);
    // Simulate AI scanning time (3 seconds)
    setTimeout(() => {
      setIsScanning(false);
      onComplete();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white relative animate-in fade-in duration-500">
      <button onClick={onCancel} className="absolute top-10 right-6 text-zinc-500 hover:text-white transition-colors">
        <X size={28} />
      </button>
      
      <div className="w-full max-w-sm flex flex-col items-center">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">ID Verification</h1>
          <p className="text-zinc-500 text-sm">Align your Cédula within the frame. Our AI will verify your identity against the national database.</p>
        </div>

        {/* The Viewfinder */}
        <div className="relative w-full aspect-[1.58/1] rounded-3xl border-2 border-zinc-800 bg-zinc-900/30 overflow-hidden flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,1)]">
          {/* Simulated Grainy Camera Feed */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554034483-04fda0d3507b?q=80&w=2070&auto=format&fit=crop')] opacity-10 grayscale contrast-125" />
          
          {/* Scanning Animation Line */}
          {isScanning && (
            <div className="absolute top-0 left-0 w-full h-1 bg-[#27ae60] shadow-[0_0_20px_#27ae60] z-10 animate-scan" />
          )}

          {/* Framing Guides */}
          <div className="absolute inset-6 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center">
             {!isScanning && (
               <div className="text-center">
                 <Camera size={40} className="text-zinc-700 mx-auto mb-2" />
                 <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">Scanning Area</span>
               </div>
             )}
          </div>
        </div>

        <div className="mt-12 w-full space-y-4">
          <button 
            onClick={startScan}
            disabled={isScanning}
            className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${isScanning ? 'bg-zinc-800 text-zinc-500' : 'bg-white text-black hover:scale-[1.02] active:scale-95'}`}
          >
            {isScanning ? <RefreshCw className="animate-spin" /> : <Camera size={20} />}
            {isScanning ? 'AI ANALYZING IDENTITY...' : 'CAPTURE PHOTO'}
          </button>
          
          <div className="flex items-center justify-center gap-3 py-4 text-[10px] text-zinc-600 uppercase font-black tracking-[0.2em]">
            <Lock size={12} className="text-[#D4AF37]" />
            Secure End-to-End Encryption
          </div>
        </div>
      </div>
    </div>
  );
}