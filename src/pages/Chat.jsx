import { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Send, 
  MoreVertical, 
  Phone, 
  Video, 
  ShieldCheck,
  CheckCheck
} from 'lucide-react';

export default function Chat({ partner = { name: 'Valentina', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1974&auto=format&fit=crop' }, onBack }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! I saw your profile. Your AI interview answers were actually really interesting.", sender: 'partner', time: '10:02 PM' },
    { id: 2, text: "Haha thanks! I try to be honest. The AI picked up on my love for tereré pretty quickly.", sender: 'me', time: '10:05 PM' },
    { id: 3, text: "Essential for surviving Asunción summers! ☀️", sender: 'partner', time: '10:06 PM' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: Date.now(),
      text: newMessage,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col h-screen overflow-hidden">
      {/* Premium Chat Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-zinc-100 p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 text-zinc-400 hover:text-zinc-900">
            <ArrowLeft size={24} />
          </button>
          <div className="relative">
            <img src={partner.image} className="w-10 h-10 rounded-full object-cover border-2 border-rose-50" alt={partner.name} />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h2 className="font-black text-sm tracking-tight">{partner.name}</h2>
              <ShieldCheck size={12} className="text-[#FF2D55]" />
            </div>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">Online now</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-zinc-300">
          <button className="p-2 hover:text-[#FF2D55] transition-colors"><Phone size={20} /></button>
          <button className="p-2 hover:text-[#FF2D55] transition-colors"><Video size={20} /></button>
          <button className="p-2 hover:text-zinc-900"><MoreVertical size={20} /></button>
        </div>
      </header>

      {/* Message List */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FAFAFA]">
        <div className="text-center py-4">
          <span className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em]">Match made today</span>
        </div>

        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[75%] space-y-1`}>
              <div className={`px-5 py-3 rounded-[1.8rem] text-sm leading-relaxed shadow-sm ${
                msg.sender === 'me' 
                  ? 'bg-[#FF2D55] text-white rounded-tr-none' 
                  : 'bg-white text-zinc-700 rounded-tl-none border border-zinc-100'
              }`}>
                {msg.text}
              </div>
              <div className={`flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-zinc-400 ${
                msg.sender === 'me' ? 'justify-end' : 'justify-start'
              }`}>
                {msg.time}
                {msg.sender === 'me' && <CheckCheck size={10} className="text-[#FF2D55]" />}
              </div>
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </main>

      {/* Modern Input Area */}
      <footer className="p-6 bg-white border-t border-zinc-100 pb-10">
        <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">
          <input 
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message ${partner.name}...`}
            className="w-full bg-zinc-50 border-none rounded-[2rem] px-6 py-4 text-sm focus:ring-2 focus:ring-rose-100 transition-all placeholder:text-zinc-300"
          />
          <button 
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-[#FF2D55] text-white p-4 rounded-full shadow-lg shadow-rose-200 active:scale-95 disabled:opacity-50 disabled:grayscale transition-all"
          >
            <Send size={20} />
          </button>
        </form>
      </footer>
    </div>
  );
}