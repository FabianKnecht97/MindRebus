
import React, { useEffect, useState } from 'react';
import { UserState } from '../types';
import { Play, TrendingUp, Zap, Trophy, Target, Sparkles, Rocket, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  user: UserState;
  onPlay: () => void;
  onViewLeaderboard: () => void;
  nextHintTime: number | null;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onPlay, onViewLeaderboard, nextHintTime }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (!nextHintTime) return;

    const interval = setInterval(() => {
        const now = Date.now();
        const diff = nextHintTime - now;

        if (diff <= 0) {
            setTimeLeft('');
            clearInterval(interval);
        } else {
            const minutes = Math.floor(diff / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextHintTime]);

  const mockActivityData = [
    { day: 'Mo', score: 120 },
    { day: 'Di', score: 200 },
    { day: 'Mi', score: 150 },
    { day: 'Do', score: 300 },
    { day: 'Fr', score: user.totalScore > 0 ? user.totalScore % 500 : 250 }, 
    { day: 'Sa', score: 0 },
    { day: 'So', score: 0 },
  ];

  return (
    <div className="space-y-10 animate-pop relative">
      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-apple-blue/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Welcome & Mission Launch */}
      <section className="flex flex-col md:flex-row gap-8 items-center justify-between bg-white/40 dark:bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-[3rem] border border-white/20 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-apple-blue/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        
        <div className="relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 bg-apple-blue/10 rounded-full">
            <Sparkles size={12} className="text-apple-blue" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-apple-blue">Bereit zur Transition</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic dark:text-white">
            Hallo, {user.username}! 🖖
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 font-medium">Nächster Halt: Level {user.level} Portal.</p>
        </div>

        <div className="flex flex-col items-center gap-4">
            <button 
              onClick={onPlay}
              className="relative z-10 w-full md:w-auto group px-12 py-6 bg-apple-blue text-white rounded-[2rem] font-black shadow-[0_20px_40px_rgba(0,113,227,0.3)] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-4 text-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Rocket size={24} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              LAUNCH LEVEL {user.level}
            </button>
            
            {/* Hint Regen Indicator */}
            {nextHintTime && (
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-white/50 dark:bg-black/20 px-4 py-1.5 rounded-full border border-white/10">
                    <Clock size={12} className="text-apple-blue animate-pulse" />
                    <span>Regeneration: {timeLeft}</span>
                </div>
            )}
        </div>
      </section>

      {/* Stats Grid - Enhanced Glassmorphism */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<Target className="text-apple-blue" />} label="Sektor" value={user.level} />
        <StatCard icon={<Trophy className="text-apple-yellow" />} label="Energie" value={user.totalScore.toLocaleString()} />
        <StatCard icon={<Zap className="text-orange-500" />} label="Warp-Streak" value={`${user.streak} T`} />
        <StatCard icon={<TrendingUp className="text-apple-green" />} label="Bestwert" value={user.highScore} />
      </div>

      {/* Activity Chart - Dark Theme Integrated */}
      <section className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-2xl rounded-[3rem] p-8 shadow-sm border border-black/5 dark:border-white/10">
        <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black tracking-tighter uppercase italic flex items-center gap-3">
                <div className="w-8 h-8 bg-apple-green/20 rounded-lg flex items-center justify-center">
                    <TrendingUp size={18} className="text-apple-green" />
                </div>
                Gehirnwellen-Aktivität
            </h3>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Letzte 7 Tage</span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockActivityData}>
               <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 800 }} 
                dy={15}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(0,113,227,0.05)', radius: 12 }}
                contentStyle={{ 
                    borderRadius: '24px', 
                    border: 'none', 
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    padding: '12px 16px',
                    fontWeight: 800,
                    textTransform: 'uppercase'
                }}
              />
              <Bar dataKey="score" radius={[12, 12, 12, 12]} barSize={32}>
                {mockActivityData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === 4 ? '#0071E3' : 'currentColor'} 
                    className={`${index === 4 ? 'opacity-100 shadow-xl' : 'text-gray-100 dark:text-zinc-800 opacity-50'} transition-all duration-500`} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ icon, label, value }: any) => (
  <div className="group bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6 rounded-[2.5rem] border border-black/5 dark:border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden">
    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-apple-blue/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
    
    <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl group-hover:scale-110 transition-transform duration-500">
      {icon}
    </div>
    <div>
      <div className="text-2xl font-black tracking-tighter mb-1">{value}</div>
      <div className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-black">{label}</div>
    </div>
  </div>
);

export default Dashboard;
