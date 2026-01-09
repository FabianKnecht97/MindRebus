
import React, { useState, useEffect, useRef } from 'react';
import { RebusPuzzle, GameState, UserState } from '../types';
import { Heart, Lightbulb, CheckCircle, XCircle, ArrowRight, ArrowLeft, Zap, Sparkles, Rocket, Star } from 'lucide-react';

interface GameProps {
  puzzle: RebusPuzzle;
  user: UserState;
  onComplete: (success: boolean, scoreDelta: number) => void;
  onExit: () => void;
  onConsumeHint: () => boolean;
}

// Levenshtein distance for fuzzy matching
const levenshtein = (a: string, b: string): number => {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }
  return matrix[b.length][a.length];
};

const Game: React.FC<GameProps> = ({ puzzle, user, onComplete, onExit, onConsumeHint }) => {
  const [input, setInput] = useState('');
  const [gameState, setGameState] = useState<GameState>({
    currentPuzzleId: puzzle.id,
    lives: 3,
    attempts: 0,
    isSolved: false,
    isFailed: false,
    feedbackMessage: null,
    feedbackType: null,
  });
  const [hintsRevealed, setHintsRevealed] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInput('');
    setGameState({
      currentPuzzleId: puzzle.id,
      lives: 3,
      attempts: 0,
      isSolved: false,
      isFailed: false,
      feedbackMessage: null,
      feedbackType: null,
    });
    setHintsRevealed(0);
    setIsTransitioning(false);
    if(inputRef.current) {
        setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [puzzle.id]);

  const checkAnswer = () => {
    if (gameState.isSolved || gameState.isFailed || !input.trim()) return;

    setIsSubmitting(true);
    const cleanInput = input.trim().toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    const cleanAnswer = puzzle.answer.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    
    // Exact match or synonym match
    let isCorrect = cleanInput === cleanAnswer || 
                      puzzle.acceptedSynonyms?.some(s => s.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"") === cleanInput);

    // Fuzzy matching if not exactly correct
    if (!isCorrect) {
        const distance = levenshtein(cleanInput, cleanAnswer);
        const threshold = cleanAnswer.length > 8 ? 2 : 1; // Allow more typos for longer phrases
        if (distance <= threshold) {
            isCorrect = true;
        }
    }

    setTimeout(() => {
      if (isCorrect) {
        setGameState(prev => ({
          ...prev,
          isSolved: true,
          feedbackMessage: "Richtig! Gut gemacht.",
          feedbackType: 'success'
        }));
      } else {
        const newLives = gameState.lives - 1;
        const failed = newLives <= 0;
        
        setGameState(prev => ({
          ...prev,
          lives: newLives,
          attempts: prev.attempts + 1,
          isFailed: failed,
          feedbackMessage: failed ? "Keine Versuche mehr." : "Das war leider falsch.",
          feedbackType: 'error'
        }));
      }
      setIsSubmitting(false);
    }, 400);
  };

  const handleFinish = () => {
    if (gameState.isSolved) {
      setIsTransitioning(true);
      setTimeout(() => {
        onComplete(true, puzzle.xpReward);
      }, 1900); 
    } else {
      onComplete(false, 0);
    }
  };

  const revealHint = () => {
    if (hintsRevealed < 2 && user.hintPool > 0) {
      const consumed = onConsumeHint();
      if (consumed) {
        setHintsRevealed(prev => prev + 1);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (gameState.isSolved || gameState.isFailed) {
        handleFinish();
      } else {
        checkAnswer();
      }
    }
  };

  return (
    <div className={`flex flex-col items-center max-w-2xl mx-auto w-full relative min-h-[85vh] md:min-h-[80vh] pb-32 md:pb-10 ${isTransitioning ? 'overflow-hidden fixed inset-0 z-[100]' : ''}`}>
      
      {/* Cinematic Portal Transition */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black overflow-hidden">
          <div className="cinematic-flash"></div>
          
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="tunnel-ring" 
              style={{ 
                width: `${(i+1)*150}px`, 
                height: `${(i+1)*150}px`, 
                animationDelay: `${i*0.3}s`,
                borderWidth: `${6-i}px`,
                borderColor: `rgba(0, 113, 227, ${0.1 + (i*0.1)})`
              }}
            />
          ))}

          <div className="animate-portal-zoom flex flex-col items-center z-10 px-6 text-center">
            <div className="relative">
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-[80px] opacity-60 animate-pulse"></div>
                <div className="w-32 h-32 md:w-48 md:h-48 bg-white dark:bg-zinc-900 rounded-[2.5rem] md:rounded-[3rem] flex items-center justify-center shadow-[0_0_100px_rgba(0,113,227,1)] relative overflow-hidden border-4 border-white">
                  <Rocket size={64} className="md:w-24 md:h-24 text-apple-blue animate-float" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent animate-spin-slow"></div>
                </div>
            </div>
            <div className="mt-12 md:mt-16 space-y-3 md:space-y-4">
                <p className="text-apple-blue font-black uppercase tracking-[0.4em] text-[10px] md:text-xs animate-pulse">Warp-Antrieb: 100%</p>
                <h2 className="text-white text-5xl md:text-7xl font-black italic tracking-tighter uppercase drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">LEVEL {user.level + 1}</h2>
            </div>
          </div>
        </div>
      )}

      {/* Header Info */}
      <div className={`w-full flex justify-between items-center mb-4 md:mb-8 px-2 transition-all duration-700 ${gameState.isSolved || gameState.isFailed ? 'opacity-20 blur-md pointer-events-none' : 'opacity-100'}`}>
        <button 
          onClick={onExit}
          className="p-2.5 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/5 shadow-sm hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-500" />
        </button>

        <div className="flex flex-col items-center">
            <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.3em] mb-0.5">Sektor</span>
            <span className="text-sm md:text-lg font-black text-apple-blue tracking-tighter uppercase italic">Level {user.level}</span>
        </div>
        
        <div className="flex items-center gap-1.5 p-2 md:p-3 bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-xl md:rounded-2xl border border-black/5 dark:border-white/5">
          {[1, 2, 3].map((i) => (
             <Heart 
               key={i} 
               size={16} 
               className={`${i <= gameState.lives ? 'text-apple-red fill-apple-red' : 'text-gray-300 dark:text-zinc-700'} transition-all duration-500`} 
             />
          ))}
        </div>
      </div>

      {/* Puzzle View Area - Optimized Contrast */}
      <div className="w-full flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12">
        <div className={`w-full max-w-xl transition-all duration-1000 ${isTransitioning ? 'scale-[3] opacity-0 blur-3xl' : 'scale-100 opacity-100 blur-0'}`}>
           <div 
             className="text-center font-black select-none transition-transform duration-500 drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)] bg-white/5 dark:bg-black/5 p-4 rounded-[3.5rem] md:p-10"
             dangerouslySetInnerHTML={{ __html: puzzle.visualContent }}
           />
        </div>
      </div>

      {/* Interactive Controls Area */}
      <div className={`w-full px-4 flex flex-col items-center gap-6 mt-auto transition-all duration-700 ${gameState.isSolved || gameState.isFailed ? 'opacity-0 scale-95 pointer-events-none translate-y-20' : 'opacity-100 scale-100'}`}>
        
        {/* Input Field - Clean, Large Typography */}
        <div className={`w-full relative ${gameState.feedbackType === 'error' && !gameState.isFailed ? 'animate-shake' : ''}`}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={gameState.isSolved || gameState.isFailed}
            placeholder="DEKODIERUNG EINGEBEN..."
            className="w-full bg-transparent border-b-[4px] border-zinc-200 dark:border-zinc-800 text-3xl md:text-5xl font-black text-center py-4 md:py-6 focus:outline-none focus:border-apple-blue transition-all disabled:opacity-50 tracking-tighter uppercase dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
          />
          {gameState.feedbackMessage && !gameState.isSolved && !gameState.isFailed && (
              <div className="absolute top-full left-0 right-0 text-center mt-3 text-[10px] md:text-xs text-apple-red font-black animate-pop tracking-[0.2em] uppercase">
                  {gameState.feedbackMessage}
              </div>
          )}
        </div>

        {/* CTA: Submit (SYSTEM-CHECK) */}
        <button 
          onClick={() => checkAnswer()} 
          disabled={!input || gameState.isSolved || gameState.isFailed}
          className="w-full group py-5 md:py-7 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-[1.8rem] md:rounded-[2.2rem] font-black text-xl md:text-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-95 disabled:opacity-30 disabled:grayscale transition-all flex items-center justify-center gap-4 mt-4"
        >
          SYSTEM-CHECK
          <Zap size={22} className="group-hover:fill-current transition-all md:w-6 md:h-6" />
        </button>

        {/* Action: Hint (SIGNAL VERSTÄRKEN) */}
        <button 
          onClick={revealHint}
          disabled={hintsRevealed >= 2 || gameState.isSolved || gameState.isFailed || user.hintPool <= 0}
          className="group flex items-center gap-3 px-10 py-4 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md text-zinc-800 dark:text-zinc-100 rounded-full font-black text-[10px] md:text-xs border border-zinc-100 dark:border-zinc-700 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all disabled:opacity-30 disabled:translate-y-0"
        >
          <Lightbulb size={20} className={`${hintsRevealed > 0 ? "text-apple-yellow fill-current" : ""} group-hover:scale-110 transition-transform`} />
          {hintsRevealed === 0 ? "SIGNAL VERSTÄRKEN" : hintsRevealed === 1 ? "FINALES SIGNAL" : "SIGNAL VOLLSTÄNDIG"}
        </button>
      </div>

      {/* SUCCESS / FAILURE OVERLAY */}
      {(gameState.isSolved || gameState.isFailed) && !isTransitioning && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-pop">
          <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-[60px]"></div>
          
          <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 shadow-2xl rounded-[3rem] md:rounded-[3.5rem] border border-white/20 dark:border-white/5 flex flex-col items-center p-8 md:p-10 overflow-hidden">
            <div className={`absolute -top-20 w-64 h-64 ${gameState.isSolved ? 'bg-apple-green/20' : 'bg-apple-red/20'} rounded-full blur-[80px]`}></div>
            
            <div className="relative mb-8 md:mb-10">
              {gameState.isSolved ? (
                <div className="bg-apple-green text-white p-6 rounded-full shadow-lg relative">
                  <CheckCircle size={48} className="md:w-16 md:h-16" strokeWidth={2.5} />
                  <div className="absolute -top-2 -right-2 bg-apple-yellow p-2 rounded-full shadow-md border-2 border-white dark:border-zinc-900 animate-bounce">
                    <Zap size={18} fill="white" className="text-white" />
                  </div>
                </div>
              ) : (
                <div className="bg-apple-red text-white p-6 rounded-full shadow-lg">
                  <XCircle size={48} className="md:w-16 md:h-16" strokeWidth={2.5} />
                </div>
              )}
            </div>

            <div className="text-center mb-6 md:mb-8">
              <h2 className={`text-3xl md:text-5xl font-black mb-2 tracking-tighter uppercase italic dark:text-white ${gameState.isSolved ? 'text-apple-green' : 'text-apple-red'}`}>
                {gameState.isSolved ? 'UNGEMEIN!' : 'KRITISCH!'}
              </h2>
              <p className="text-gray-500 dark:text-zinc-400 text-xs md:text-sm font-bold max-w-[280px] mx-auto leading-relaxed uppercase tracking-widest">
                {gameState.isSolved ? `Sektor ${user.level} stabilisiert.` : `Der Link wurde unterbrochen.`}
              </p>
            </div>

            <div className="w-full mb-8 relative">
              <div className="relative bg-zinc-50 dark:bg-zinc-800/50 rounded-[2rem] p-6 md:p-8 text-center border border-zinc-100 dark:border-zinc-700/50 shadow-inner">
                <span className="text-[9px] font-black text-apple-blue/60 uppercase tracking-[0.4em] block mb-2 md:mb-3">LÖSUNG IDENTIFIZIERT</span>
                <p className="text-3xl md:text-4xl font-black text-apple-blue mb-2 md:mb-4 uppercase tracking-tighter leading-none">
                  {puzzle.answer}
                </p>
                <div className="w-10 h-1 bg-apple-blue/10 mx-auto mb-3 md:mb-4 rounded-full"></div>
                <p className="text-[10px] md:text-xs text-gray-500 dark:text-zinc-400 italic px-4 leading-relaxed font-medium">
                  "{puzzle.explanation}"
                </p>
              </div>
            </div>

            <div className="w-full space-y-3 md:space-y-4">
              <button 
                onClick={handleFinish}
                className="w-full group py-4 md:py-6 bg-apple-blue text-white rounded-[1.8rem] md:rounded-[2.2rem] font-black text-lg md:text-xl shadow-xl hover:bg-blue-600 transition-all active:scale-[0.97] flex items-center justify-center gap-3"
              >
                {gameState.isSolved ? 'NÄCHSTER SEKTOR' : 'NEUSTART'} 
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
              </button>
              
              {!gameState.isSolved && (
                <button 
                  onClick={onExit}
                  className="w-full py-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 font-black text-[9px] transition-colors uppercase tracking-[0.4em]"
                >
                  Abbruch
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hints Display Area - Floating Elements */}
      <div className={`w-full mt-10 md:mt-14 space-y-4 transition-all duration-700 delay-200 ${gameState.isSolved || gameState.isFailed ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'}`}>
        <div className="grid grid-cols-1 gap-4 px-4">
            {hintsRevealed >= 1 && (
                <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg p-6 md:p-8 rounded-[2rem] border-l-[8px] border-apple-yellow shadow-2xl animate-pop relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 text-apple-yellow">
                        <Star size={64} fill="currentColor" />
                    </div>
                    <span className="text-[8px] md:text-[10px] font-black text-apple-yellow uppercase tracking-[0.4em] block mb-2">FRAGMENT #1</span>
                    <p className="text-zinc-800 dark:text-zinc-100 font-bold text-sm md:text-lg leading-relaxed">{puzzle.hint1}</p>
                </div>
            )}

            {hintsRevealed >= 2 && (
                <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-lg p-6 md:p-8 rounded-[2rem] border-l-[8px] border-orange-500 shadow-2xl animate-pop relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 text-orange-500">
                        <Zap size={64} fill="currentColor" />
                    </div>
                    <span className="text-[8px] md:text-[10px] font-black text-orange-500 uppercase tracking-[0.4em] block mb-2">FRAGMENT #2</span>
                    <p className="text-zinc-800 dark:text-zinc-100 font-black text-base md:text-xl leading-relaxed italic">{puzzle.hint2}</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Game;
