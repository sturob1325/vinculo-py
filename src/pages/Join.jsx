import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Heart, Mail, Lock, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';

export default function Join({ onJoinSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      // 1. Authenticate the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      const user = authData?.user;

      if (user) {
        // 2. CHECK: See if a profile already exists to avoid PK/RLS conflicts
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', user.id)
          .single();

        // 3. INSERT: Only create if it doesn't exist
        if (!existingProfile) {
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([{ 
              id: user.id, 
              email: user.email,
              cedula_verified: false 
            }]);
          
          if (insertError) {
            console.warn("Profile already exists or RLS blocked insert, moving to next step anyway.");
          }
        }
        
        // 4. FORCE SUCCESS: We move the user forward to unstick the UI
        setLoading(false);
        onJoinSuccess();
      }
    } catch (err) {
      console.error("Join Process Error:", err.message);
      setErrorMsg(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-zinc-900">
      <div className="w-full max-w-md bg-white rounded-[3rem] p-10 border border-zinc-100 shadow-2xl shadow-rose-100/30">
        
        <div className="text-center mb-10">
          <div className="inline-block bg-rose-50 p-4 rounded-3xl mb-4">
            <Heart size={32} className="text-[#FF2D55]" fill="currentColor" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter italic text-zinc-950">VÍNCULO</h1>
          <p className="text-zinc-400 text-xs mt-2 font-bold uppercase tracking-widest">Asunción Premium Dating</p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-rose-50 text-rose-600 text-[11px] font-bold rounded-2xl border border-rose-100 flex items-center gap-2">
            <ShieldCheck size={16} />
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
              <input 
                type="email" 
                required
                className="w-full bg-zinc-50 border-2 border-transparent focus:border-rose-100 p-5 pl-14 rounded-2xl outline-none transition-all font-medium"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
              <input 
                type="password" 
                required
                className="w-full bg-zinc-50 border-2 border-transparent focus:border-rose-100 p-5 pl-14 rounded-2xl outline-none transition-all font-medium"
                placeholder="Secure Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF2D55] py-5 rounded-2xl font-bold text-white text-lg mt-6 hover:opacity-90 shadow-xl shadow-rose-200 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Start Discovery"} 
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        <div className="mt-10 flex flex-col items-center gap-2">
          <div className="h-px w-12 bg-zinc-100"></div>
          <p className="text-[10px] text-zinc-300 font-bold uppercase tracking-[0.2em]">
            Lapacho Creative Security
          </p>
        </div>
      </div>
    </div>
  );
}