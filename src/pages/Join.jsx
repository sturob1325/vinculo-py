import { useState } from 'react';
import { Heart, Mail, Lock, ArrowRight, User } from 'lucide-react';

export default function Join({ onJoinSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // Later, we connect this to Supabase. 
    // For now, we simulate success to keep your frontend flow moving.
    onJoinSuccess();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-zinc-900">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 border border-zinc-100 shadow-2xl shadow-rose-100/50">
        <div className="text-center mb-10">
          <div className="inline-block bg-rose-50 p-4 rounded-3xl mb-4">
            <Heart size={32} className="text-[#FF2D55]" fill="currentColor" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter">Join Vínculo</h1>
          <p className="text-zinc-500 text-sm mt-2 font-medium">Create your verified account in seconds.</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-4">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
              <input 
                type="email" 
                required
                className="w-full bg-zinc-50 border-2 border-transparent focus:border-rose-100 p-5 pl-14 rounded-2xl outline-none transition-all"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-4">Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
              <input 
                type="password" 
                required
                className="w-full bg-zinc-50 border-2 border-transparent focus:border-rose-100 p-5 pl-14 rounded-2xl outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#FF2D55] py-5 rounded-2xl font-bold text-white text-lg mt-6 hover:opacity-90 shadow-xl shadow-rose-200 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Create Account <ArrowRight size={20} />
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
          By joining, you agree to our Terms of Safety
        </p>
      </div>
    </div>
  );
}