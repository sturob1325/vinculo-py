import { useState } from 'react';
import { Send, ChevronLeft, Sparkles, ShieldCheck } from 'lucide-react';

export default function Chat({ match, onBack }) {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: `Gabriela also loves San Bernardino on Sundays! Why not ask her about her favorite spot by the lake?`, isHint: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'me', text: input }]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col animate-in slide-in-from-right duration-500">
      {/* Chat Header */}
      <header className="p-6 border-b border-white/5 bg-[#1E1E1E]/50 backdrop-blur-xl flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="relative">
          <img src={match.img} className="h-10 w-10 rounded-full object-cover border border-[#27ae60]" alt={match.name} />
          <div className="absolute -bottom-1 -right-1 bg-[#27ae60] h-3 w-3 rounded-full border-2 border-[#121212]" />
        </div>
        <div>
          <div className="flex items-center gap-1">
            <h3 className="font-bold">{match.name}</h3>
            <ShieldCheck size={14} className="text-[#D4AF37]" />
          </div>
          <p className="text-[10px] text-[#27ae60] font-bold uppercase tracking-wider">Matched by AI</p>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-grow p-6 space-y-6 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              msg.sender === 'me' 
              ? 'bg-[#27ae60] text-white rounded-tr-none' 
              : msg.isHint 
                ? 'bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] italic rounded-tl-none' 
                : 'bg-zinc-800 text-zinc-200 rounded-tl-none'
            }`}>
              {msg.isHint && <div className="flex items-center gap-1 mb-1 not-italic font-bold text-[10px] uppercase tracking-widest text-[#D4AF37]">
                <Sparkles size={10} /> AI Wingman Suggestion
              </div>}
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-[#121212] border-t border-white/5">
        <div className="flex gap-2 bg-zinc-900 rounded-2xl p-2 items-center border border-white/5">
          <input 
            className="flex-grow bg-transparent p-3 outline-none text-sm"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            className="p-3 bg-[#27ae60] rounded-xl hover:bg-emerald-600 transition-all active:scale-95 shadow-lg shadow-emerald-900/20"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}