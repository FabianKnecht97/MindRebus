import React, { useState } from 'react';
import { ArrowRight, Brain, Zap, Sparkles, Rocket, Cpu } from 'lucide-react';

interface OnboardingProps {
    onComplete: (username: string) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [username, setUsername] = useState('');

    const steps = [
        {
            icon: <Rocket size={56} className="text-apple-blue animate-float" />,
            badge: "EXPEDITION START",
            title: "WILLKOMMEN BEI MINDREBUS",
            desc: "Bereite dich auf eine Reise durch das Rebus-System vor. Trainiere deinen Verstand und aktiviere deinen Neural-Link."
        },
        {
            icon: (
                <div className="flex flex-col items-center bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] border-2 border-white/20 shadow-2xl relative">
                    <div className="absolute -top-3 -right-3 bg-apple-yellow p-2 rounded-full shadow-lg">
                        <Zap size={16} fill="white" className="text-white" />
                    </div>
                    <div className="text-3xl font-black border-b-2 border-apple-blue/40 px-2 mb-2 dark:text-white">I'm</div>
                    <div className="text-4xl font-black text-apple-blue uppercase tracking-tighter">MY WAY</div>
                </div>
            ),
            badge: "BRIEFING",
            title: "WAS IST EIN REBUS?",
            desc: "Ein Rebus ist ein visuelles Worträtsel. 'I'm' auf (on) 'my way' ergibt: 'I'm on my way'. Verstehst du das System?"
        },
        {
            icon: <Cpu size={56} className="text-purple-500 animate-pulse" />,
            badge: "IDENTIFIKATION",
            title: "WIE HEISST DU?",
            desc: "Jeder Entdecker benötigt einen eindeutigen Identifikator in unserem Netzwerk.",
            isInput: true
        }
    ];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            if(username.trim()) onComplete(username);
        }
    };

    const currentStep = steps[step];

    return (
        <div className="fixed inset-0 bg-white dark:bg-black z-[200] flex flex-col items-center justify-center p-8 overflow-hidden">
            {/* Cinematic Background Elements */}
            <div className="stars absolute inset-0 opacity-40"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-apple-blue/10 rounded-full blur-[150px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-md w-full text-center relative z-10 animate-pop">
                <div className="flex justify-center mb-12">
                    <div className="relative">
                        <div className="absolute inset-0 bg-apple-blue/20 blur-3xl rounded-full"></div>
                        <div className="relative p-10 bg-white/5 backdrop-blur-2xl rounded-[3.5rem] border border-white/10 shadow-2xl">
                            {currentStep.icon}
                        </div>
                    </div>
                </div>
                
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-apple-blue/10 rounded-full">
                    <Sparkles size={12} className="text-apple-blue" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-apple-blue">{currentStep.badge}</span>
                </div>

                <h1 className="text-4xl font-black mb-4 tracking-tighter uppercase italic dark:text-white">{currentStep.title}</h1>
                <p className="text-gray-500 dark:text-zinc-400 mb-12 text-lg font-medium leading-relaxed px-4">{currentStep.desc}</p>
                
                {currentStep.isInput && (
                    <div className="relative mb-12 group">
                        <input 
                            type="text" 
                            placeholder="Dein Name..." 
                            autoFocus
                            className="w-full text-center text-4xl font-black border-b-[3px] border-zinc-200 dark:border-zinc-800 bg-transparent py-4 focus:outline-none focus:border-apple-blue transition-all uppercase tracking-tighter dark:text-white"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className="absolute -bottom-px left-0 right-0 h-[3px] bg-apple-blue scale-x-0 group-focus-within:scale-x-100 transition-transform duration-700"></div>
                    </div>
                )}

                <button 
                    onClick={handleNext}
                    disabled={currentStep.isInput && !username.trim()}
                    className="w-full group py-6 bg-apple-blue text-white rounded-[2.2rem] font-black text-xl shadow-[0_20px_50px_rgba(0,113,227,0.3)] flex items-center justify-center gap-4 hover:bg-blue-600 transition-all active:scale-95 disabled:opacity-30 disabled:grayscale"
                >
                    {step === steps.length - 1 ? "EXPEDITION STARTEN" : 'WEITER'} 
                    <ArrowRight size={26} className="group-hover:translate-x-2 transition-transform" />
                </button>
                
                <div className="flex justify-center gap-3 mt-12">
                    {steps.map((_, i) => (
                        <div key={i} className={`h-1.5 transition-all duration-500 rounded-full ${i === step ? 'w-10 bg-apple-blue shadow-[0_0_10px_rgba(0,113,227,0.8)]' : 'w-4 bg-zinc-200 dark:bg-zinc-800'}`} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Onboarding;