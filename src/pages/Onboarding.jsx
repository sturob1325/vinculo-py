import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Heart, ArrowRight, Loader2 } from 'lucide-react';

const QUESTIONS = [
  "What is your ideal weekend in Asunción?",
  "Are you a Planner or Go-with-the-flow?",
  "Quiet dinner or loud party?"
];

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState('');
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    const updatedAnswers = { ...answers, [step]: input };
    setAnswers(updatedAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
      setInput('');
    } else {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // UPSERT: Create if missing, update if exists
        const { error } = await supabase
          .from('profiles')
          .upsert({ 
            id: user.id, 
            email: user.email, 
            personality_answers: updatedAnswers 
          });

        if (error) {
          alert("Error saving: " + error.message);
        } else {
          onComplete();
        }
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md p-10 border border-zinc-100 rounded-[2.5rem] shadow-xl">
        <h2 className="text-zinc-400 text-xs font-black uppercase mb-4">Question {step + 1}</h2>
        <h1 className="text-2xl font-bold mb-6">{QUESTIONS[step]}</h1>
        <textarea 
          className="w-full h-32 p-4 bg-zinc-50 rounded-2xl mb-6 outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button 
          onClick={handleNext}
          className="w-full bg-[#FF2D55] py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Continue"}
        </button>
      </div>
    </div>
  );
}