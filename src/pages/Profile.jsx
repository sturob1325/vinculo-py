import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { 
  User as UserIcon, 
  Camera, 
  ShieldCheck, 
  Brain, 
  Edit3, 
  LogOut, 
  ChevronRight,
  ArrowLeft,
  Check
} from 'lucide-react';

export default function Profile({ onBack }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
        
        if (data) {
          setProfile(data);
          setBio(data.bio || '');
        }
      }
      setLoading(false);
    }
    getProfile();
  }, []);

  const handleSaveBio = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase
      .from('profiles')
      .update({ bio: bio })
      .eq('id', user.id);
    
    if (!error) setIsEditing(false);
  };

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center text-[#FF2D55] font-black italic">VÍNCULO</div>;

  return (
    <div className="fixed inset-0 z-[80] bg-[#FAFAFA] flex flex-col h-screen overflow-y-auto pb-20">
      {/* Header */}
      <header className="bg-white p-6 flex items-center justify-between sticky top-0 z-10 border-b border-zinc-100">
        <button onClick={onBack} className="p-2 -ml-2 text-zinc-400"><ArrowLeft size={24} /></button>
        <h2 className="font-black italic text-lg tracking-tight">MY PROFILE</h2>
        <button onClick={() => supabase.auth.signOut().then(() => window.location.reload())} className="text-zinc-300 hover:text-[#FF2D55]"><LogOut size={20} /></button>
      </header>

      <main className="p-6 max-w-md mx-auto w-full space-y-8">
        {/* Photo & Identity */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-[3rem] bg-zinc-200 overflow-hidden border-4 border-white shadow-xl">
              <img 
                src={`https://ui-avatars.com/api/?name=${profile?.email}&background=FF2D55&color=fff&size=256`} 
                className="w-full h-full object-cover" 
                alt="Profile" 
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-zinc-900 text-white p-3 rounded-2xl border-4 border-[#FAFAFA] shadow-lg">
              <Camera size={18} />
            </button>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-black tracking-tight">{profile?.email?.split('@')[0]}</h3>
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">{profile?.email}</p>
          </div>
        </div>

        {/* Verification Card */}
        <section className={`p-6 rounded-[2.5rem] border ${profile?.cedula_verified ? 'bg-rose-50 border-rose-100' : 'bg-white border-zinc-100'} flex items-center justify-between shadow-sm`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${profile?.cedula_verified ? 'bg-[#FF2D55] text-white' : 'bg-zinc-100 text-zinc-400'}`}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="font-black text-sm tracking-tight">{profile?.cedula_verified ? 'Identity Verified' : 'Verify Identity'}</p>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">Paraguay National ID (Cédula)</p>
            </div>
          </div>
          {!profile?.cedula_verified && <ChevronRight size={20} className="text-zinc-300" />}
        </section>

        {/* AI Personality Results */}
        <section className="bg-zinc-900 rounded-[2.5rem] p-8 text-white space-y-6 shadow-2xl shadow-zinc-900/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg text-[#FF2D55]"><Brain size={20} /></div>
            <h4 className="font-black italic tracking-tight text-lg">AI Archetype</h4>
          </div>
          <div className="space-y-2">
            <p className="text-[#FF2D55] font-black text-3xl tracking-tighter uppercase italic">The Visionary</p>
            <p className="text-zinc-400 text-sm leading-relaxed italic">"You value deep connections and authentic experiences in Asunción over surface-level interactions."</p>
          </div>
          <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Compatibility</p>
              <p className="text-lg font-bold">High (92%)</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Openness</p>
              <p className="text-lg font-bold">Strong</p>
            </div>
          </div>
        </section>

        {/* Bio Editor */}
        <section className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <h4 className="font-black italic text-sm tracking-tight flex items-center gap-2">
              <Edit3 size={16} className="text-[#FF2D55]" /> ABOUT ME
            </h4>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="text-[10px] font-black text-[#FF2D55] uppercase tracking-widest">Edit</button>
            ) : (
              <button onClick={handleSaveBio} className="text-[10px] font-black text-green-500 uppercase tracking-widest flex items-center gap-1"><Check size={12} /> Save</button>
            )}
          </div>
          
          {isEditing ? (
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-zinc-50 border-none rounded-2xl p-4 text-sm italic focus:ring-2 focus:ring-rose-100 transition-all min-h-[100px]"
              placeholder="Tell your story..."
            />
          ) : (
            <p className="text-zinc-500 text-sm italic leading-relaxed">
              {bio || "Tap edit to write something about yourself..."}
            </p>
          )}
        </section>
      </main>
    </div>
  );
}