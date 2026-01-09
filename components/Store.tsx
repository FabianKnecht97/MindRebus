import React from 'react';
import { Check, Star, Zap } from 'lucide-react';

const Store: React.FC = () => {
    return (
        <div className="animate-pop pb-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Shop & Upgrades</h2>
            
            {/* Pro Banner */}
            <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-3xl p-8 mb-8 relative overflow-hidden shadow-xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                 <div className="relative z-10">
                     <div className="inline-block bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded mb-4">PRO</div>
                     <h3 className="text-3xl font-bold mb-2">Go Pro.</h3>
                     <p className="text-gray-300 mb-6 max-w-sm">Infinite lives, no ads, and access to all archive puzzles.</p>
                     
                     <div className="space-y-2 mb-8">
                         <div className="flex items-center gap-2"><Check size={16} className="text-green-400"/> <span>Unlimited Puzzles</span></div>
                         <div className="flex items-center gap-2"><Check size={16} className="text-green-400"/> <span>Detailed Stats</span></div>
                         <div className="flex items-center gap-2"><Check size={16} className="text-green-400"/> <span>Support Indie Devs</span></div>
                     </div>
                     
                     <button className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors">
                         For $2.99 / Month
                     </button>
                 </div>
            </div>

            <h3 className="text-xl font-bold mb-4">Coins & Hints</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-500 mb-3">
                        <Star fill="currentColor" size={24}/>
                    </div>
                    <div className="font-bold mb-1">5 Hints</div>
                    <div className="text-xs text-gray-500 mb-4">Refill Instantly</div>
                    <button className="w-full py-2 bg-gray-100 dark:bg-zinc-800 rounded-lg text-sm font-semibold hover:bg-gray-200 dark:hover:bg-zinc-700">$0.99</button>
                </div>
                 <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-500 mb-3">
                        <Zap fill="currentColor" size={24}/>
                    </div>
                    <div className="font-bold mb-1">1 Hr Infinite</div>
                    <div className="text-xs text-gray-500 mb-4">Endless Hints</div>
                    <button className="w-full py-2 bg-apple-blue text-white rounded-lg text-sm font-semibold hover:bg-blue-600">$1.99</button>
                </div>
            </div>
        </div>
    );
};

export default Store;