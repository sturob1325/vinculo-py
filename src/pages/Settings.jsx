import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { 
  ArrowLeft, 
  Bell, 
  Lock, 
  ShieldCheck, 
  EyeOff, 
  Trash2, 
  LogOut, 
  ChevronRight,
  Globe,
  Smartphone,
  CreditCard
} from 'lucide-react';

export default function SettingsPage({ onBack }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
        if (data) setProfile(data);
      }
      setLoading(false);
    }
    loadSettings();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure? This will permanently delete your Vínculo profile and all match data."
    );
    
    if (confirmed) {
      // This triggers the DELETE policy we set up: auth.uid() = id
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', profile.id);

      if (error) {
        alert("Error deleting profile: " + error.message);
      } else {
        await supabase.auth.signOut();
        window.location.reload();
      }
    }
  };

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center text-[#FF2D55] font-black italic">VÍNCULO</div>;

  return (
    <div className="fixed inset-0 z-[90] bg-[#FAFAFA] flex flex-col h-screen overflow-y-auto pb-20 animate-in fade-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="bg-white p-6 flex items-center justify-between sticky top-0 z-10 border-b border-zinc-100">
        <button onClick={onBack} className="p-2 -ml-2 text-zinc-400 hover:text-zinc-900"><ArrowLeft size={24} /></button>
        <h2 className="font-black italic text-lg tracking-tight uppercase">Settings</h2>
        <div className="w-10" />
      </header>

      <main className="p-6 max-w-md mx-auto w-full space-y-8">
        {/* Account Section */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em] ml-2">Account Settings</h3>
          <div className="bg-white rounded-[2rem] border border-zinc-100 overflow-hidden shadow-sm">
            <button className="w-full p-6 flex items-center justify-between hover:bg-zinc-50 transition-colors border-b border-zinc-50">
              <div className="flex items-center gap-4 text-zinc-900">
                <Globe size={20} className="text-[#FF2D55]" />
                <span className="text-sm font-bold">Language</span>
              </div>
              <span className="text-xs font-bold text-zinc-400">English <ChevronRight size={14} className="inline ml-1" /></span>
            </button>
            <button className="w-full p-6 flex items-center justify-between hover:bg-zinc-50 transition-colors">
              <div className="flex items-center gap-4 text-zinc-900">
                <Smartphone size={20} className="text-[#FF2D55]" />
                <span className="text-sm font-bold">Linked Device</span>
              </div>
              <span className="text-xs font-bold text-zinc-400">iPhone 15 <ChevronRight size={14} className="inline ml-1" /></span>
            </button>
          </div>
        </section>

        {/* Safety & Privacy */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em] ml-2">Safety & Verification</h3>
          <div className="bg-white rounded-[2rem] border border-zinc-100 overflow-hidden shadow-sm">
            <div className="p-6 flex items-center justify-between border-b border-zinc-50">
              <div className="flex items-center gap-4 text-zinc-900">
                <ShieldCheck size={20} className="text-green-500" />
                <div className="text-left">
                  <p className="text-sm font-bold">Cédula Verification</p>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase">Status: {profile?.cedula_verified ? 'Verified' : 'Pending'}</p>
                </div>
              </div>
            </div>
            <button className="w-full p-6 flex items-center justify-between hover:bg-zinc-50 transition-colors">
              <div className="flex items-center gap-4 text-zinc-900">
                <EyeOff size={20} className="text-[#FF2D55]" />
                <span className="text-sm font-bold">Incognito Mode</span>
              </div>
              <div className="w-10 h-5 bg-zinc-100 rounded-full relative">
                <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
              </div>
            </button>
          </div>
        </section>

        {/* Notifications */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em] ml-2">App Preferences</h3>
          <div className="bg-white rounded-[2rem] border border-zinc-100 overflow-hidden shadow-sm">
            <button className="w-full p-6 flex items-center justify-between hover:bg-zinc-50 transition-colors border-b border-zinc-50">
              <div className="flex items-center gap-4 text-zinc-900">
                <Bell size={20} className="text-[#FF2D55]" />
                <span className="text-sm font-bold">Push Notifications</span>
              </div>
              <ChevronRight size={18} className="text-zinc-200" />
            </button>
            <button className="w-full p-6 flex items-center justify-between hover:bg-zinc-50 transition-colors">
              <div className="flex items-center gap-4 text-zinc-900">
                <CreditCard size={20} className="text-[#FF2D55]" />
                <span className="text-sm font-bold">Vínculo Gold</span>
              </div>
              <span className="text-[10px] font-black text-[#FF2D55] bg-rose-50 px-2 py-1 rounded-md tracking-widest uppercase">Upgrade</span>
            </button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="space-y-4 pt-4">
          <div className="bg-white rounded-[2rem] border border-rose-100 overflow-hidden shadow-sm">
            <button 
              onClick={handleLogout}
              className="w-full p-6 flex items-center gap-4 text-zinc-400 hover:bg-zinc-50 transition-colors border-b border-zinc-50"
            >
              <LogOut size={20} />
              <span className="text-sm font-bold">Log Out</span>
            </button>
            <button 
              onClick={handleDeleteAccount}
              className="w-full p-6 flex items-center gap-4 text-[#FF2D55] hover:bg-rose-50 transition-colors"
            >
              <Trash2 size={20} />
              <span className="text-sm font-bold">Delete Account</span>
            </button>
          </div>
          <p className="text-center text-[10px] text-zinc-300 font-bold uppercase tracking-widest pt-4">
            Vínculo v1.0.4 • Lapacho Creative
          </p>
        </section>
      </main>
    </div>
  );
}