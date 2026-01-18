import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Camera, ShieldCheck, RefreshCw, Lock, Loader2 } from 'lucide-react';

export default function Verification({ onComplete }) {
  const [isScanning, setIsScanning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const startScan = async () => {
    setIsScanning(true);
    
    // 1. Simulate the high-end AI scan (Visual effect)
    setTimeout(async () => {
      setIsScanning(false);
      setIsSaving(true);

      try {
        // 2. Get the current user
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          // 3. Update the database: Mark as verified
          const { error } = await supabase
            .from('profiles')
            .update({ cedula_verified: true })
            .eq('id', user.id);

          if (error) throw error;
          
          console.log("Cédula Verified Successfully");
          onComplete(); // Move to the Calculating screen
        }
      } catch (err) {
        console.error("Verification Error:", err.message);
        alert("Verification failed to save. Please try again.");
      } finally {
        setIsSaving(false);
      }
    }, 3000); // 3-second "AI Analysis" delay
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-zinc-900">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-3xl font-black mb-4 tracking-tight text-zinc-950">Identity Check</h1>
        <p className="text-zinc-500 text-sm mb-10 leading-relaxed font-medium">
          Securely verify your Cédula to start matching with real people in Asunción.
        </p>

        <div className="relative w-full aspect-[1.58/1] rounded-[2.5rem] border-2 border-zinc-100 bg-zinc-50 overflow-hidden mb-10 shadow-inner group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554034483-04fda0d3507b?q=80&w=2070&auto=format&fit=crop')] opacity-5 grayscale group-hover:opacity-10 transition-opacity" />
          
          {/* Rose Scanning Line Animation */}
          {isScanning && (
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#FF2D55] shadow-[0_0_20px_#FF2D55] animate-scan z-10" />
          )}

          <div className="absolute inset-6 border-2 border-dashed border-rose-200 rounded-[2rem] flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm">
            <Camera size={40} className="text-rose-300 mb-2" />
            <span className="text-[10px] font-black text-rose-300 uppercase tracking-[0.2em]">Center ID in Frame</span>
          </div>
        </div>

        <button 
          onClick={startScan} 
          disabled={isScanning || isSaving}
          className="w-full py-5 bg-[#FF2D55] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-2xl shadow-rose-200 active:scale-95 transition-all disabled:opacity-50"
        >
          {isScanning || isSaving ? <Loader2 className="animate-spin" /> : <ShieldCheck size={22} />}
          <span>{isScanning ? 'Analyzing Document...' : isSaving ? 'Saving Status...' : 'Verify My Cédula'}</span>
        </button>

        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em]">
          <Lock size={12} className="text-rose-400" /> Lapacho Secure Protocol v2.4
        </div>
      </div>
    </div>
  );
}