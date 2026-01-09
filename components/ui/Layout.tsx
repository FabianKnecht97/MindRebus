import React from 'react';
import { Moon, Sun, Home, Trophy, User, Map, BookOpen, Lightbulb } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentView: string;
  setView: (view: string) => void;
  userLevel: number;
  hintPool: number;
}

const Layout: React.FC<LayoutProps> = ({ children, darkMode, toggleDarkMode, currentView, setView, userLevel, hintPool }) => {
  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-space-dark' : 'bg-space-light'}`}>
      <div className="flex-1 text-slate-900 dark:text-white transition-colors duration-300 pb-24 md:pb-0 md:pl-24">
        
        {/* Top Bar - More Compact for Mobile */}
        <div className="sticky top-0 z-50 bg-white/40 dark:bg-black/40 backdrop-blur-3xl border-b border-black/5 dark:border-white/5 px-4 md:px-6 py-3 md:py-4 flex justify-between items-center transition-all">
          <div className="flex items-center gap-2 md:gap-3 cursor-pointer group" onClick={() => setView('dashboard')}>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-apple-blue to-indigo-600 rounded-lg md:rounded-[0.8rem] flex items-center justify-center text-white font-black text-sm md:text-lg shadow-blue-500/20 transform group-hover:rotate-12 transition-transform">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm md:text-lg tracking-tighter uppercase italic leading-none">MindRebus</span>
              <div className="hidden md:flex items-center gap-1 mt-1">
                 <div className="w-1 h-1 bg-apple-green rounded-full animate-pulse"></div>
                 <span className="text-[7px] font-black text-apple-blue uppercase tracking-[0.3em] leading-none">Neural Link Active</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-4 py-1.5 md:py-2 bg-black/5 dark:bg-white/5 backdrop-blur-md rounded-xl border border-black/5 dark:border-white/5">
                <Lightbulb size={14} className="text-apple-yellow md:w-4 md:h-4 fill-current" />
                <span className="text-[10px] md:text-xs font-black tracking-tighter">{hintPool}/5</span>
            </div>

            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-xl bg-white/80 dark:bg-zinc-900/80 border border-black/5 dark:border-white/5 shadow-sm active:scale-95 transition-all"
            >
              {darkMode ? <Sun size={16} className="text-apple-yellow" /> : <Moon size={16} className="text-apple-blue" />}
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="max-w-4xl mx-auto p-4 md:p-12 relative z-10">
          {children}
        </main>

        {/* Floating Bottom Navigation (Mobile) - Optimized Height */}
        <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] z-50">
          <nav className="bg-zinc-900/95 dark:bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-[2.2rem] py-2.5 px-6 flex justify-between items-center shadow-2xl">
            <NavButton icon={<Home size={20} />} active={currentView === 'dashboard'} onClick={() => setView('dashboard')} />
            <NavButton icon={<Map size={20} />} active={currentView === 'levelPath'} onClick={() => setView('levelPath')} />
            
            <div className="relative">
                <button 
                    className="relative w-12 h-12 bg-apple-blue rounded-full flex items-center justify-center text-white shadow-xl border-4 border-zinc-900 active:scale-90 transition-all z-10" 
                    onClick={() => setView('game')}
                >
                  <BookOpen size={22} strokeWidth={2.5} />
                </button>
            </div>
            
            <NavButton icon={<Trophy size={20} />} active={currentView === 'leaderboard'} onClick={() => setView('leaderboard')} />
            <NavButton icon={<User size={20} />} active={currentView === 'profile'} onClick={() => setView('profile')} />
          </nav>
        </div>

        {/* Minimalist Sidebar (Desktop) */}
        <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-24 flex-col items-center py-12 bg-white/5 dark:bg-black/20 backdrop-blur-3xl border-r border-white/5 z-40">
           <div className="flex-1 flex flex-col justify-center gap-10 w-full">
            <NavButtonDesktop icon={<Home size={26} />} label="Halle" active={currentView === 'dashboard'} onClick={() => setView('dashboard')} />
            <NavButtonDesktop icon={<Map size={26} />} label="Pfad" active={currentView === 'levelPath'} onClick={() => setView('levelPath')} />
            <NavButtonDesktop icon={<BookOpen size={26} />} label="Rätsel" active={currentView === 'game'} onClick={() => setView('game')} />
            <NavButtonDesktop icon={<Trophy size={26} />} label="Rang" active={currentView === 'leaderboard'} onClick={() => setView('leaderboard')} />
           </div>
           <div className="mb-4">
             <NavButtonDesktop icon={<User size={26} />} label="Profil" active={currentView === 'profile'} onClick={() => setView('profile')} />
           </div>
        </nav>

      </div>
    </div>
  );
};

const NavButton = ({ icon, active, onClick }: any) => (
  <button onClick={onClick} className={`p-2 transition-all duration-300 relative ${active ? 'text-apple-blue scale-110' : 'text-zinc-500'}`}>
    {active && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-apple-blue rounded-full" />}
    {icon}
  </button>
);

const NavButtonDesktop = ({ icon, label, active, onClick }: any) => (
  <button 
    onClick={onClick} 
    className={`w-full flex flex-col items-center justify-center py-5 relative group transition-all duration-300 ${active ? 'text-apple-blue' : 'text-zinc-500 hover:text-zinc-400'}`}
  >
    {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-apple-blue rounded-r-full shadow-[0_0_20px_rgba(0,113,227,0.9)] transition-all" />
    )}
    <div className={`transform transition-all ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
      {icon}
    </div>
    <span className="text-[9px] font-black mt-2 opacity-0 group-hover:opacity-100 transition-all absolute left-full ml-6 bg-zinc-900 text-white px-3 py-1.5 rounded-xl text-xs tracking-widest uppercase z-50 pointer-events-none shadow-2xl border border-white/10 translate-x-4 group-hover:translate-x-0">
      {label}
    </span>
  </button>
);

export default Layout;