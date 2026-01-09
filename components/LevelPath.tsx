import React, { useState } from 'react';
import { RebusPuzzle, UserState } from '../types';
import { INITIAL_PUZZLES } from '../constants';
import { Lock, Check, Rocket, Star, RefreshCcw, X, ArrowRight, Zap } from 'lucide-react';

interface LevelPathProps {
  user: UserState;
  onSelectLevel: (levelIndex: number) => void;
}

const LevelPath: React.FC<LevelPathProps> = ({ user, onSelectLevel }) => {
  const [confirmLevel, setConfirmLevel] = useState<number | null>(null);
  const totalLevels = INITIAL_PUZZLES.length;

  const handleNodeClick = (index: number, isCompleted: boolean) => {
    if (isCompleted) {
      setConfirmLevel(index);
    } else if (user.level === index + 1) {
      onSelectLevel(index);
    }
  };

  return (
    <div className="relative min-h-screen pb-40 pt-10 animate-pop max-w-xl mx-auto">
      {/* Cosmic Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="stars absolute inset-0"></div>
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-apple-blue/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header Area */}
      <div className="text-center mb-24 relative z-10 px-6">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
            <Zap size={14} className="text-apple-yellow fill-current" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-apple-blue">Expeditions-Status</span>
        </div>
        <h2 className="text-5xl font-black tracking-tighter uppercase italic dark:text-white leading-tight">
          DER <span className="text-apple-blue">PFAD</span>
        </h2>
        <p className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.5em] font-black mt-4 opacity-60">
          Navigation durch das Rebus-System
        </p>
      </div>

      {/* The Path Container */}
      <div className="relative flex flex-col-reverse px-10 gap-y-32">
        {INITIAL_PUZZLES.map((puzzle, index) => {
          const levelNumber = index + 1;
          const isCompleted = user.level > levelNumber;
          const isActive = user.level === levelNumber;
          const isLocked = user.level < levelNumber;
          
          // Zig-zag offset
          const offset = index % 2 === 0 ? '-translate-x-12 md:-translate-x-20' : 'translate-x-12 md:translate-x-20';

          return (
            <div 
              key={puzzle.id} 
              className={`relative flex items-center justify-center w-full transition-all duration-500`}
            >
              {/* Vertical Connector (Energy Strand) */}
              {index < totalLevels - 1 && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-[2px] h-32 z-0 pointer-events-none overflow-hidden">
                   <div className={`w-full h-full ${isLocked ? 'bg-zinc-200 dark:bg-zinc-800' : 'bg-apple-blue shadow-[0_0_15px_rgba(0,113,227,0.8)] opacity-60 animate-pulse-glow'}`}></div>
                </div>
              )}

              {/* Node Visualization */}
              <div className={`relative group ${offset}`}>
                {/* Active Glow Effect */}
                {isActive && (
                  <>
                    <div className="absolute -inset-8 bg-apple-blue/20 rounded-full blur-2xl animate-pulse"></div>
                    <div className="absolute -inset-4 border-2 border-dashed border-apple-blue/30 rounded-full animate-spin-slow"></div>
                  </>
                )}
                
                <button
                  onClick={() => handleNodeClick(index, isCompleted)}
                  disabled={isLocked}
                  className={`
                    relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-500 transform
                    ${isActive ? 'bg-apple-blue text-white scale-125 shadow-apple-blue/50 ring-4 ring-white dark:ring-zinc-900 ring-offset-4 ring-offset-apple-blue/20' : ''}
                    ${isCompleted ? 'bg-white dark:bg-zinc-800 text-apple-green hover:scale-110 border-2 border-apple-green/40 shadow-apple-green/10' : ''}
                    ${isLocked ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-400 cursor-not-allowed opacity-30 scale-90' : ''}
                  `}
                >
                  <div className="mb-0.5">
                    {isCompleted ? (
                       <Check size={28} strokeWidth={4} />
                    ) : isLocked ? (
                       <Lock size={22} strokeWidth={2.5} />
                    ) : (
                      <Rocket size={32} className="animate-float" />
                    )}
                  </div>

                  <span className={`text-xl font-black tracking-tighter leading-none ${isActive ? 'text-white' : 'text-zinc-800 dark:text-zinc-100'}`}>
                    {levelNumber}
                  </span>

                  {/* Difficulty Badge */}
                  {!isLocked && (
                    <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] whitespace-nowrap bg-zinc-900 dark:bg-white dark:text-black text-white px-2.5 py-1 rounded-full shadow-lg">
                        {puzzle.difficulty}
                      </span>
                    </div>
                  )}
                </button>

                {/* Score Stars */}
                {isCompleted && (
                  <div className="absolute -top-2 -right-2 flex gap-0.5 bg-zinc-900 dark:bg-zinc-700 px-1.5 py-0.5 rounded-full shadow-lg border border-white/10 scale-90">
                    <Star size={10} className="text-apple-yellow fill-current" />
                    <Star size={10} className="text-apple-yellow fill-current" />
                    <Star size={10} className="text-apple-yellow fill-current opacity-30" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Start Indicator */}
      <div className="text-center mt-32 pb-20 opacity-40">
        <div className="w-[1px] h-12 bg-gradient-to-t from-transparent to-apple-blue mx-auto rounded-full mb-4"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.6em]">Basislager Alpha</span>
      </div>

      {/* REPLAY CONFIRMATION DIALOG (Modern CI) */}
      {confirmLevel !== null && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-pop">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl" onClick={() => setConfirmLevel(null)}></div>
          
          <div className="relative w-full max-w-sm bg-white/95 dark:bg-zinc-900/95 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[3rem] p-8 border border-white/20 overflow-hidden">
            {/* Energy decoration in dialog */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-apple-blue/40 to-transparent"></div>
            
            <div className="flex justify-center mb-8">
              <div className="bg-apple-blue/10 dark:bg-apple-blue/20 p-6 rounded-full shadow-inner ring-4 ring-apple-blue/5">
                <RefreshCcw size={40} className="text-apple-blue animate-spin-slow" />
              </div>
            </div>

            <h3 className="text-3xl font-black mb-3 tracking-tighter dark:text-white uppercase italic text-center">WIEDERHOLEN?</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-10 text-center leading-relaxed font-medium px-4">
              Du hast Level {confirmLevel + 1} bereits abgeschlossen. Möchtest du erneut in den Warp springen?
            </p>

            <div className="flex flex-col gap-4">
              <button 
                onClick={() => {
                  onSelectLevel(confirmLevel!);
                  setConfirmLevel(null);
                }}
                className="w-full group py-5 bg-apple-blue text-white rounded-[2rem] font-black text-lg shadow-xl shadow-apple-blue/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                LEVEL NEUSTARTEN
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setConfirmLevel(null)}
                className="w-full py-4 text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 font-black uppercase tracking-[0.3em] text-[10px] transition-colors"
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelPath;