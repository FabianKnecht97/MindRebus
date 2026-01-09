import React from 'react';
import { MOCK_LEADERBOARD } from '../constants';
import { UserState } from '../types';

interface LeaderboardProps {
    user: UserState;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ user }) => {
    // Combine mock data with current user if not present (simplified logic)
    const data = [...MOCK_LEADERBOARD];
    if (!data.find(d => d.username === user.username)) {
        data.push({
            id: 'current_user',
            username: user.username,
            level: user.level,
            score: user.totalScore,
            streak: user.streak
        });
    }
    // Sort by score
    data.sort((a, b) => b.score - a.score);

    return (
        <div className="animate-pop max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Leaderboard</h2>
            <div className="flex gap-4 mb-6">
                <button className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-semibold">Global</button>
                <button className="px-4 py-2 bg-gray-100 dark:bg-zinc-800 text-gray-500 rounded-full text-sm font-semibold">Friends</button>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden">
                {data.map((entry, index) => {
                    const isMe = entry.username === user.username;
                    return (
                        <div 
                            key={entry.id} 
                            className={`flex items-center p-4 border-b border-gray-100 dark:border-zinc-800 last:border-none ${isMe ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}
                        >
                            <div className="w-8 font-bold text-gray-400 text-center">{index + 1}</div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 dark:from-zinc-700 dark:to-zinc-600 flex items-center justify-center text-xs font-bold mr-4">
                                {entry.username.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <div className={`font-semibold ${isMe ? 'text-apple-blue' : ''}`}>{entry.username} {isMe && '(You)'}</div>
                                <div className="text-xs text-gray-500">Level {entry.level} • {entry.streak} Day Streak</div>
                            </div>
                            <div className="font-mono font-bold text-lg">{entry.score.toLocaleString()}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Leaderboard;