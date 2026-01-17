import { useState } from 'react';
import { Sparkles, Send, ArrowRight } from 'lucide-react';

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
      // This triggers the transition to the Verification screen in App.jsx
      onComplete();
    }
  };

  // Calculate progress percentage
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-6 text-white font-sans">
      <div className="w-full max-w-md bg-[#1E1E1E] rounded-[2.5rem] p-10 border border-white/5 shadow-2xl relative overflow-hidden">
        
        {/* Progress Bar (Visual Polish) */}
        <div 
          className="absolute top-0 left-0 h-1 bg-[#27ae60] transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }} 
        />
        
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-[#27ae60]/20 p-2 rounded-xl text-[#27ae60]">
            <Sparkles size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">AI Matchmaker</span>
            <span className="text-[10px] text-zinc-600 font-bold">Step {step + 1} of {QUESTIONS.length}</span>
          </div>
        </div>

        {/* Question Heading */}
        <div className="min-h-[100px]">
           <h1 className="text-3xl font-bold leading-tight mb-8 animate-in fade-in slide-in-from-right-4 duration-500">
            {QUESTIONS[step]}
          </h1>
        </div>
        
        {/* Input Area */}
        <textarea
          autoFocus
          className="w-full bg-transparent border-b-2 border-zinc-800 py-4 text-xl text-zinc-300 focus:border-[#27ae60] transition-colors outline-none h-32 resize-none mb-10 placeholder:text-zinc-700"
          placeholder="Type your response here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleNext();
            }
          }}
        />

        {/* Action Button */}
        <button 
          onClick={handleNext}
          className="w-full bg-[#27ae60] py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all group active:scale-95 shadow-xl shadow-emerald-900/20"
        >
          <span>{step === QUESTIONS.length - 1 ? 'Calculate Compatibility' : 'Next Question'}</span>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Small Trust Footer */}
        <p className="mt-8 text-center text-[10px] text-zinc-600 font-medium uppercase tracking-widest">
          Answers are encrypted & private
        </p>
      </div>
    </div>
  );
}