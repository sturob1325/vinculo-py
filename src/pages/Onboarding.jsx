import { useState } from 'react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

const QUESTIONS = [
  "What does a perfect Sunday afternoon in San Bernardino look like for you?",
  "In a relationship, are you the 'Planner' or the 'Go-with-the-flow' partner?",
  "Describe your ideal first date in Asunción: Loud and social or quiet and intimate?",
  "If you could travel anywhere next month, would it be a beach, a mountain, or a big city?"
];

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState('');

  const handleNext = () => {
    if (!input.trim()) return;
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
      setInput('');
    } else {
      onComplete();
    }
  };

  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-zinc-900">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 border border-zinc-100 shadow-2xl shadow-rose-100/50 relative overflow-hidden">
        
        {/* Progress Bar */}
        <div 
          className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-[#FF2D55] to-[#FF9500] transition-all duration-500" 
          style={{ width: `${progress}%` }} 
        />
        
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-rose-50 p-2 rounded-xl text-[#FF2D55]">
            <Heart size={20} fill="currentColor" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">AI Matchmaker</span>
            <p className="text-[10px] text-rose-400 font-bold">Step {step + 1} of {QUESTIONS.length}</p>
          </div>
        </div>

        <h1 className="text-3xl font-black leading-tight mb-8 tracking-tight text-zinc-950">
          {QUESTIONS[step]}
        </h1>
        
        <textarea
          autoFocus
          className="w-full bg-zinc-50 border-2 border-transparent focus:border-rose-100 rounded-3xl p-6 text-lg text-zinc-800 transition-all outline-none h-40 resize-none mb-10 placeholder:text-zinc-300"
          placeholder="Tell us your story..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button 
          onClick={handleNext}
          className="w-full bg-[#FF2D55] py-5 rounded-2xl font-bold text-white flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl shadow-rose-200 active:scale-95"
        >
          <span>{step === QUESTIONS.length - 1 ? 'Find My Match' : 'Next Question'}</span>
          <ArrowRight size={18} />
        </button>

        <p className="mt-8 text-center text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
          Cédula-Verified Security
        </p>
      </div>
    </div>
  );
}