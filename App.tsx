
import React, { useState, useEffect } from 'react';
import { UserState, RebusPuzzle, Difficulty } from './types';
import { INITIAL_PUZZLES } from './constants';
import Layout from './components/ui/Layout';
import Dashboard from './components/Dashboard';
import Game from './components/Game';
import Leaderboard from './components/Leaderboard';
import Store from './components/Store';
import Onboarding from './components/Onboarding';
import LevelPath from './components/LevelPath';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [view, setView] = useState('dashboard');
  const [nextHintTime, setNextHintTime] = useState<number | null>(null);
  
  const [user, setUser] = useState<UserState>(() => {
    const saved = localStorage.getItem('mindrebus_user');
    const userData = saved ? JSON.parse(saved) : {
      username: '',
      isAuthenticated: false, 
      isOnboarded: false,
      level: 1, 
      currentXp: 0,
      totalScore: 0,
      highScore: 0,
      streak: 1,
      coins: 50,
      hintPool: 5,
      lastHintRegen: Date.now(),
      solvedPuzzles: [],
      failedPuzzles: [],
      isPro: false
    };
    // Force onboarding on every app start/reload
    return { ...userData, isOnboarded: false };
  });

  const [puzzles] = useState<RebusPuzzle[]>(INITIAL_PUZZLES);
  const [activePuzzle, setActivePuzzle] = useState<RebusPuzzle | null>(null);

  useEffect(() => {
    localStorage.setItem('mindrebus_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Hint Regeneration Logic
  useEffect(() => {
    const REGEN_INTERVAL = 30 * 60 * 1000; // 30 minutes
    const MAX_HINTS = 5;

    const checkRegen = () => {
        if (user.hintPool >= MAX_HINTS) {
            setNextHintTime(null);
            return;
        }

        const now = Date.now();
        const elapsed = now - user.lastHintRegen;

        if (elapsed >= REGEN_INTERVAL) {
            const hintsToAdd = Math.floor(elapsed / REGEN_INTERVAL);
            const remainder = elapsed % REGEN_INTERVAL;
            
            setUser(prev => ({
                ...prev,
                hintPool: Math.min(MAX_HINTS, prev.hintPool + hintsToAdd),
                lastHintRegen: now - remainder
            }));
        } else {
            setNextHintTime(user.lastHintRegen + REGEN_INTERVAL);
        }
    };

    const interval = setInterval(checkRegen, 1000); // Check every second
    checkRegen(); // Initial check

    return () => clearInterval(interval);
  }, [user.hintPool, user.lastHintRegen]);


  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleOnboardingComplete = (username: string) => {
    setUser(prev => ({ ...prev, username, isOnboarded: true, isAuthenticated: true }));
    setView('dashboard');
  };

  const handleStartGame = () => {
    const puzzleIndex = user.level - 1;
    if (puzzleIndex < puzzles.length) {
        setActivePuzzle(puzzles[puzzleIndex]);
        setView('game');
    } else {
        alert("Glückwunsch! Du hast alle verfügbaren Level gelöst.");
        setView('dashboard');
    }
  };

  const handleConsumeHint = () => {
      if (user.hintPool > 0) {
          setUser(prev => ({
              ...prev,
              hintPool: prev.hintPool - 1,
              // If we were at max hints, set the regen timestamp to now so the timer starts
              lastHintRegen: prev.hintPool === 5 ? Date.now() : prev.lastHintRegen
          }));
          return true;
      }
      return false;
  };

  const handlePuzzleComplete = (success: boolean, scoreDelta: number) => {
      if (!activePuzzle) return;
      const currentPuzzleId = activePuzzle.id;

      setUser(prev => {
          if (!success) return prev; 
          const isNewSolve = !prev.solvedPuzzles.includes(currentPuzzleId);
          const newLevel = isNewSolve ? prev.level + 1 : prev.level;
          const newSolved = isNewSolve ? [...prev.solvedPuzzles, currentPuzzleId] : prev.solvedPuzzles;
          
          return {
              ...prev,
              level: newLevel,
              currentXp: prev.currentXp + scoreDelta,
              totalScore: prev.totalScore + scoreDelta,
              highScore: Math.max(prev.highScore, prev.totalScore + scoreDelta),
              solvedPuzzles: newSolved,
              coins: prev.coins + 5,
          };
      });

      if (success) {
          const solvedIdx = puzzles.findIndex(p => p.id === currentPuzzleId);
          const nextIdx = solvedIdx + 1;
          if (nextIdx < puzzles.length) {
              setActivePuzzle(puzzles[nextIdx]);
          } else {
              setView('dashboard');
              setActivePuzzle(null);
          }
      } else {
          setView('dashboard');
          setActivePuzzle(null);
      }
  };

  const handleExitGame = () => {
      setView('dashboard');
      setActivePuzzle(null);
  };

  const handleSelectLevelFromMap = (levelIndex: number) => {
      if (levelIndex < puzzles.length) {
          setActivePuzzle(puzzles[levelIndex]);
          setView('game');
      }
  };

  if (!user.isOnboarded) {
      return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Layout 
        darkMode={darkMode} 
        toggleDarkMode={toggleDarkMode}
        currentView={view}
        setView={setView}
        userLevel={user.level}
        hintPool={user.hintPool}
    >
        {view === 'dashboard' && (
            <Dashboard 
                user={user} 
                onPlay={handleStartGame}
                onViewLeaderboard={() => setView('leaderboard')}
                nextHintTime={nextHintTime}
            />
        )}

        {view === 'levelPath' && (
            <LevelPath 
                user={user}
                onSelectLevel={handleSelectLevelFromMap}
            />
        )}

        {view === 'game' && activePuzzle && (
            <Game 
                puzzle={activePuzzle}
                user={user}
                onComplete={handlePuzzleComplete}
                onExit={handleExitGame}
                onConsumeHint={handleConsumeHint}
            />
        )}

        {view === 'leaderboard' && <Leaderboard user={user} />}
        {view === 'store' && <Store />}
        {view === 'profile' && (
            <div className="text-center py-10 animate-pop">
                <div className="w-24 h-24 bg-apple-blue text-white rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold shadow-lg">
                    {user.username.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-2xl font-bold mb-1">{user.username}</h2>
                <p className="text-gray-500 mb-8 uppercase tracking-widest text-xs font-bold">Level {user.level} Entdecker</p>
                
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-gray-100 dark:border-zinc-800 max-w-sm mx-auto shadow-sm">
                    <div className="flex justify-between mb-4">
                        <span className="text-gray-500">Gelöste Rätsel</span>
                        <span className="font-bold">{user.solvedPuzzles.length}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Gesamtpunktzahl</span>
                        <span className="font-bold">{user.totalScore.toLocaleString()}</span>
                    </div>
                </div>

                <button 
                  onClick={() => {
                      if(confirm("Bist du sicher, dass du deinen Fortschritt löschen willst?")) {
                          localStorage.removeItem('mindrebus_user');
                          window.location.reload();
                      }
                  }}
                  className="mt-12 text-apple-red text-sm font-semibold hover:underline"
                >
                    Fortschritt zurücksetzen
                </button>
            </div>
        )}
    </Layout>
  );
};

export default App;
