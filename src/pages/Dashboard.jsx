import { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { 
  Heart, 
  MessageCircle, 
  ShieldCheck, 
  MapPin, 
  LogOut, 
  Star,
  X,
  Info,
  ChevronRight,
  Settings,
  Send,
  Phone,
  Video,
  CheckCheck,
  User as UserIcon,
  Camera,
  Brain,
  Edit3,
  ArrowLeft,
  Check,
  Search,
  Smartphone,
  Globe,
  CreditCard,
  Bell,
  Trash2
} from 'lucide-react';

// --- SUB-COMPONENT: SETTINGS ---
function SettingsView({ profile, onBack }) {
  const handleLogout = () => supabase.auth.signOut().then(() => window.location.reload());
  const handleDelete = async () => {
    if (window.confirm("Permanently delete your Vínculo profile?")) {
      const { error } = await supabase.from('profiles').delete().eq('id', profile.id);
      if (!error) handleLogout();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#FAFAFA] flex flex-col h-screen overflow-y-auto pb-20 animate-in slide-in-from-right duration-300">
      <header className="bg-white p-6 border-b flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-zinc-400"><ArrowLeft size={24} /></button>
        <h2 className="font-black italic text-lg uppercase tracking-tight">Settings</h2>
        <div className="w-10" />
      </header>
      <main className="p-6 max-w-md mx-auto w-full space-y-6">
        <div className="bg-white rounded-[2rem] border border-zinc-100 overflow-hidden shadow-sm">
          <div className="p-6 flex items-center justify-between border-b border-zinc-50">
            <div className="flex items-center gap-4">
              <ShieldCheck size={20} className="text-green-500" />
              <span className="text-sm font-bold">Identity: {profile?.cedula_verified ? 'Verified' : 'Unverified'}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full p-6 flex items-center gap-4 text-zinc-400 hover:bg-zinc-50 border-b border-zinc-50 transition-colors">
            <LogOut size={20} /><span className="text-sm font-bold">Log Out</span>
          </button>
          <button onClick={handleDelete} className="w-full p-6 flex items-center gap-4 text-[#FF2D55] hover:bg-rose-50 transition-colors">
            <Trash2 size={20} /><span className="text-sm font-bold">Delete Account</span>
          </button>
        </div>
        <p className="text-center text-[10px] text-zinc-300 font-bold uppercase tracking-widest pt-4 italic">Vínculo v1.0.5 • Lapacho Creative</p>
      </main>
    </div>
  );
}

// --- SUB-COMPONENT: PROFILE ---
function ProfileView({ profile, onBack }) {
  return (
    <div className="fixed inset-0 z-[90] bg-[#FAFAFA] flex flex-col h-screen overflow-y-auto pb-20 animate-in slide-in-from-right duration-300">
      <header className="bg-white p-6 border-b flex items-center justify-between sticky top-0 z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-zinc-400"><ArrowLeft size={24} /></button>
        <h2 className="font-black italic text-lg uppercase tracking-tight">My Profile</h2>
        <div className="w-10" />
      </header>
      <main className="p-6 max-w-md mx-auto w-full space-y-8">
        <div className="flex flex-col items-center space-y-4 pt-4">
          <div className="w-32 h-32 rounded-[3rem] bg-zinc-200 overflow-hidden border-4 border-white shadow-xl">
            <img src={`https://ui-avatars.com/api/?name=${profile?.email}&background=FF2D55&color=fff&size=256`} className="w-full h-full object-cover" alt="" />
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-black">{profile?.email?.split('@')[0]}</h3>
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">{profile?.email}</p>
          </div>
        </div>
        <section className="bg-zinc-900 rounded-[2.5rem] p-8 text-white space-y-4 shadow-2xl">
          <div className="flex items-center gap-3 text-[#FF2D55]"><Brain size={20} /><h4 className="font-black italic text-white text-lg">AI Archetype</h4></div>
          <p className="text-[#FF2D55] font-black text-3xl uppercase italic tracking-tighter leading-none">The Visionary</p>
          <p className="text-zinc-400 text-sm italic pt-4 border-t border-white/10">"You value deep, authentic connections in Asunción over surface-level small talk."</p>
        </section>
      </main>
    </div>
  );
}

// --- MAIN DASHBOARD ---
export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [discoverFeed, setDiscoverFeed] = useState([]);
  const [viewingProfile, setViewingProfile] = useState(false);
  const [viewingMessages, setViewingMessages] = useState(false);
  const [viewingSettings, setViewingSettings] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch User Profile
        const { data: mine } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle();
        setProfile(mine);

        // Fetch Others (Live Feed) - requires RLS "Select Others" policy
        const { data: others } = await supabase.from('profiles').select('*').neq('id', user.id).limit(10);
        if (others) setDiscoverFeed(others);
      }
      setLoading(false);
    }
    init();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white text-[#FF2D55] font-black italic text-4xl animate-pulse tracking-tighter">
      VÍNCULO
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-32 text-zinc-900 overflow-x-hidden font-sans">
      <header className="bg-white/80 backdrop-blur-lg border-b p-6 sticky top-0 z-40 flex justify-between items-center">
        <h1 className="text-2xl font-black italic text-[#FF2D55] tracking-tighter">VÍNCULO</h1>
        <div className="flex items-center gap-4">
          {profile?.cedula_verified && <ShieldCheck size={20} className="text-[#FF2D55]" />}
          <button onClick={() => setViewingSettings(true)} className="text-zinc-200 hover:text-[#FF2D55] transition-colors">
            <Settings size={22} />
          </button>
        </div>
      </header>

      <main className="p-6 max-w-md mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Live Location</p>
            <div className="flex items-center gap-1 font-bold text-sm">
              <MapPin size={14} className="text-[#FF2D55]" /> Asunción, PY
            </div>
          </div>
          <Star className="text-zinc-100" />
        </div>

        <section className="grid gap-8">
          {discoverFeed.length > 0 ? (
            discoverFeed.map((m) => (
              <div key={m.id} className="group relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl transition-all cursor-pointer">
                <img src={m.avatar_url || `https://ui-avatars.com/api/?name=${m.email}&background=FF2D55&color=fff`} className="absolute inset-0 w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h4 className="text-3xl font-black tracking-tighter">{m.email?.split('@')[0]}</h4>
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1">Nearby in Asunción</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-zinc-300 italic tracking-tight">No more users nearby...</div>
          )}
        </section>
      </main>

      {/* Layered Views */}
      {viewingProfile && <ProfileView profile={profile} onBack={() => setViewingProfile(false)} />}
      {viewingSettings && <SettingsView profile={profile} onBack={() => setViewingSettings(false)} />}

      {/* Navigation */}
      <nav className="fixed bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl border border-zinc-100 rounded-[2.5rem] p-2 flex justify-around items-center shadow-2xl z-50">
        <button 
          className={`p-4 rounded-full transition-all ${!viewingProfile && !viewingMessages && !viewingSettings ? 'text-[#FF2D55] bg-rose-50' : 'text-zinc-300'}`} 
          onClick={() => { setViewingProfile(false); setViewingMessages(false); setViewingSettings(false); }}
        >
          <Heart fill="currentColor" size={24} />
        </button>
        <button 
          className={`p-4 rounded-full transition-all ${viewingMessages ? 'text-[#FF2D55] bg-rose-50' : 'text-zinc-300'}`} 
          onClick={() => { setViewingMessages(true); setViewingProfile(false); setViewingSettings(false); }}
        >
          <MessageCircle size={24} />
        </button>
        <button 
          className={`p-4 rounded-full transition-all ${viewingProfile ? 'text-[#FF2D55] bg-rose-50' : 'text-zinc-300'}`} 
          onClick={() => { setViewingProfile(true); setViewingMessages(false); setViewingSettings(false); }}
        >
          <UserIcon size={24} />
        </button>
      </nav>
    </div>
  );
}