import { useState } from 'react';
import { Sparkles, Send } from 'lucide-react';

const QUESTIONS = [
  "What does a perfect Sunday afternoon in San Bernardino look like for you?",
  "In a relationship, are you the 'Planner' or the 'Go-with-the-flow' partner?",
  "Describe your ideal first date in Asunción: Loud and social or quiet and intimate?"
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [input, setInput] = useState('');

  const handleNext = () => {
    if (!input.trim()) return;
    setAnswers([...answers, input]);
    setInput('');
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      alert("Interview Complete! Calculating your Personality Vector...");
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center p-6 text-white">
      <div className="w-full max-w-md bg-[#1E1E1E] rounded-3xl p-8 border border-white/5 shadow-2xl">
        {/* AI Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-[#27ae60]/20 p-2 rounded-xl">
            <Sparkles className="text-[#27ae60]" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Vínculo AI Matchmaker</h2>
            <p className="text-xs text-zinc-500">Step {step + 1} of {QUESTIONS.length}</p>
          </div>
        </div>

        {/* The Question */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold leading-tight mb-4">{QUESTIONS[step]}</h1>
          <textarea
            className="w-full bg-[#121212] border border-white/5 rounded-2xl p-4 text-zinc-300 focus:border-[#27ae60] transition-colors outline-none h-32"
            placeholder="Tell us your story..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <button 
          onClick={handleNext}
          className="w-full bg-[#27ae60] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all active:scale-95"
        >
          <span>Next Step</span>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}