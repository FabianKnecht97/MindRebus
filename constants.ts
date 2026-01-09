
import { RebusPuzzle, Difficulty, Category, LeaderboardEntry } from "./types";

export const LEVELS = [
  { level: 1, xp: 0, title: "Anfänger" },
  { level: 10, xp: 2000, title: "Rätsel-Experte" },
  { level: 25, xp: 6000, title: "Wort-Akrobat" },
  { level: 50, xp: 15000, title: "Rebus-Meister" },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: 'lb_1', username: 'Lukas_Rebus', level: 45, score: 12500, streak: 15 },
  { id: 'lb_2', username: 'Sarah.Q', level: 38, score: 9800, streak: 8 },
  { id: 'lb_3', username: 'Maximilian', level: 32, score: 7200, streak: 12 },
  { id: 'lb_4', username: 'Julia_Logic', level: 25, score: 5400, streak: 5 },
  { id: 'lb_5', username: 'Thomas_W', level: 18, score: 3200, streak: 3 },
];

export const INITIAL_PUZZLES: RebusPuzzle[] = [
  {
    id: "rebus_ifell",
    visualContent: `
      <div class="flex flex-col items-center justify-center gap-1 font-black text-zinc-900 dark:text-white p-8 bg-white/10 dark:bg-white/5 rounded-[3rem] backdrop-blur-sm border border-black/5 dark:border-white/5">
        <div class="opacity-20 text-xl italic transition-all duration-700">I fell</div>
        <div class="opacity-40 text-2xl italic transition-all duration-700">I fell</div>
        <div class="opacity-60 text-4xl italic transition-all duration-700">I fell</div>
        <div class="opacity-80 text-6xl italic transition-all duration-700">I fell</div>
        <div class="text-[8rem] md:text-[10rem] leading-none text-apple-blue drop-shadow-[0_0_30px_rgba(0,113,227,0.3)] animate-pulse">YOU</div>
      </div>
    `,
    answer: "I fell for you",
    difficulty: Difficulty.EASY,
    category: Category.GENERAL,
    hint1: "Zähle die Vorkommen von 'I fell'.",
    hint2: "Vier mal (four) + 'I fell' + ein großes 'YOU'.",
    explanation: "Das Wort 'I fell' steht viermal da (phonetisch 'for') gefolgt von einem großen 'YOU'.",
    xpReward: 15
  },
  {
    id: "rebus_001",
    visualContent: `
      <div class="flex items-center gap-8 md:gap-16 p-12 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-[4rem] border border-black/5 dark:border-white/5 shadow-2xl">
        <div class="flex flex-col items-center gap-4">
          <!-- SVG Chicken -->
          <svg width="120" height="120" viewBox="0 0 100 100" class="animate-float">
            <circle cx="50" cy="50" r="45" class="fill-yellow-400" />
            <circle cx="65" cy="40" r="5" class="fill-black" />
            <path d="M 85 50 L 100 45 L 85 60 Z" class="fill-orange-500" />
            <path d="M 50 20 L 60 5 L 70 20 Z" class="fill-orange-500" />
            <path d="M 20 50 Q 5 50 20 70" stroke="rgba(0,0,0,0.1)" stroke-width="3" fill="none" />
          </svg>
        </div>
        <div class="w-px h-24 bg-zinc-300 dark:bg-zinc-700"></div>
        <div class="flex flex-col items-center">
           <!-- SVG Urinal/Pee -->
           <div class="relative">
              <div class="w-1.5 h-12 bg-apple-blue mx-auto rounded-full mb-1 animate-pulse"></div>
              <svg width="80" height="100" viewBox="0 0 80 100">
                <path d="M 10 0 L 10 60 Q 10 90 40 90 Q 70 90 70 60 L 70 0 Z" class="fill-zinc-200 dark:fill-zinc-700 stroke-zinc-300 dark:stroke-zinc-600" stroke-width="4" />
                <path d="M 20 10 L 20 50 Q 20 70 40 70 Q 60 70 60 50 L 60 10" class="fill-white/50 dark:fill-black/20" />
              </svg>
           </div>
        </div>
      </div>
    `,
    answer: "Chickpeas",
    difficulty: Difficulty.EASY,
    category: Category.GENERAL,
    hint1: "Was ist das links für ein Tier?",
    hint2: "Ein englisches Wort für Kichererbsen.",
    explanation: "Ein Küken (chick) und urinieren (peeing). Phonetisch: 'chick' + 'peas'.",
    xpReward: 15
  },
  {
    id: "rebus_002",
    visualContent: `
      <div class="flex flex-col md:flex-row items-center gap-12 bg-zinc-100 dark:bg-zinc-900 p-16 rounded-[4rem] shadow-xl border border-white/5">
        <div class="p-8 bg-white dark:bg-zinc-800 rounded-3xl shadow-lg border border-zinc-200 dark:border-zinc-700">
          <!-- SVG Organ Keys -->
          <div class="flex gap-1">
             ${[1,2,3,4].map(i => `
                <div class="w-6 h-20 bg-white border border-zinc-300 rounded-b-md relative">
                   <div class="absolute top-0 right-[-6px] w-3 h-12 bg-black z-10 rounded-b-sm border border-zinc-700"></div>
                </div>
             `).join('')}
             <div class="w-6 h-20 bg-white border border-zinc-300 rounded-b-md"></div>
          </div>
          <div class="mt-4 text-center font-black text-xs uppercase tracking-widest text-zinc-400">Instrument</div>
        </div>
        <div class="grid grid-cols-5 gap-3">
          ${Array(10).fill('<span class="text-5xl font-black text-apple-blue italic drop-shadow-[0_2px_10px_rgba(0,113,227,0.3)]">i</span>').join('')}
        </div>
      </div>
    `,
    answer: "Organize",
    difficulty: Difficulty.MEDIUM,
    category: Category.GENERAL,
    hint1: "Das Instrument ist eine Orgel (Organ).",
    hint2: "Organ + ten 'i's auf Englisch.",
    explanation: "Eine Orgel (Organ) und zehn mal der Buchstabe 'i'. Phonetisch: 'Organ' + 'i's'.",
    xpReward: 30
  },
  {
    id: "rebus_003",
    visualContent: `
      <div class="relative w-64 h-64 flex items-center justify-center">
        <!-- Vertical Road -->
        <div class="absolute h-full w-24 bg-zinc-800 flex items-center justify-center border-x-4 border-dashed border-white/20">
           <span class="transform -rotate-90 text-4xl font-black text-white tracking-[0.2em] opacity-50">ROAD</span>
        </div>
        <!-- Horizontal Road -->
        <div class="absolute w-full h-24 bg-zinc-800 flex items-center justify-center border-y-4 border-dashed border-white/20 shadow-2xl z-10">
           <span class="text-4xl font-black text-white tracking-[0.2em]">ROAD</span>
        </div>
      </div>
    `,
    answer: "Crossroads",
    difficulty: Difficulty.EASY,
    category: Category.GENERAL,
    hint1: "Zwei Straßen schneiden sich.",
    hint2: "Was entsteht, wenn Wörter sich kreuzen?",
    explanation: "Zwei Wörter 'ROADS' kreuzen sich.",
    xpReward: 15
  },
  {
    id: "rebus_004",
    visualContent: `
      <div class="flex gap-20 items-center p-12 bg-white/5 backdrop-blur-md rounded-[3rem]">
        <div class="flex flex-col items-start text-5xl font-black text-zinc-900 dark:text-white leading-none tracking-tighter italic gap-1">
          <span class="text-apple-blue">UP</span>
          <span>SELF</span>
          <span>YOUR</span>
          <span>PICK</span>
        </div>
        <div class="flex flex-col items-center">
          <div class="relative">
             <span class="text-7xl font-black text-apple-red">START</span>
             <div class="absolute top-1/2 left-0 w-full h-1.5 bg-zinc-400 dark:bg-white/60"></div>
          </div>
          <div class="text-4xl font-black opacity-30 mt-2 tracking-widest italic">AGAIN</div>
        </div>
      </div>
    `,
    answer: "Pick yourself up and start over",
    difficulty: Difficulty.HARD,
    category: Category.IDIOMS,
    hint1: "Lies die linke Spalte von unten nach oben.",
    hint2: "Start steht über (over) Again.",
    explanation: "PICK YOUR SELF nach oben (UP) und START über (OVER) AGAIN.",
    xpReward: 50
  },
  {
    id: "rebus_005",
    visualContent: `
      <div class="flex items-center gap-12 bg-zinc-900 p-16 rounded-[4rem] border border-white/5">
        <!-- CSS Bee -->
        <div class="relative w-24 h-24 animate-float">
            <div class="absolute inset-0 bg-yellow-400 rounded-full border-4 border-zinc-900 shadow-lg flex flex-col items-center justify-center gap-2 overflow-hidden">
                <div class="w-full h-2 bg-black/80"></div>
                <div class="w-full h-2 bg-black/80"></div>
                <div class="w-full h-2 bg-black/80"></div>
            </div>
            <div class="absolute -top-4 -right-4 w-10 h-10 bg-white/30 rounded-full blur-sm border border-white/50"></div> <!-- Wing -->
            <div class="absolute -top-4 -left-4 w-10 h-10 bg-white/30 rounded-full blur-sm border border-white/50"></div> <!-- Wing -->
        </div>
        
        <!-- Hands Grid -->
        <div class="grid grid-cols-2 gap-4">
          ${Array(4).fill(`
            <div class="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-white">
                 <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/>
                 <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/>
                 <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/>
                 <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>
               </svg>
            </div>
          `).join('')}
        </div>
      </div>
    `,
    answer: "Beforehand",
    difficulty: Difficulty.MEDIUM,
    category: Category.GENERAL,
    hint1: "Biene + 4 + Hände.",
    hint2: "Bee + Four + Hands.",
    explanation: "Bee + four + hands = Beforehand.",
    xpReward: 30
  },
  {
    id: "rebus_006",
    visualContent: `
      <div class="p-16 border-[6px] border-dashed border-apple-red/40 rounded-[3rem] bg-apple-red/5">
        <span class="text-6xl md:text-[8rem] font-black text-zinc-900 dark:text-white tracking-[0.2em] uppercase italic drop-shadow-sm decoration-wavy underline decoration-apple-red decoration-4">POLITICALY</span>
      </div>
    `,
    answer: "Politically incorrect",
    difficulty: Difficulty.MEDIUM,
    category: Category.GENERAL,
    hint1: "Achte auf die rote Unterstreichung.",
    hint2: "Das Wort ist nicht korrekt geschrieben (incorrect).",
    explanation: "Das Wort 'Politically' ist falsch geschrieben, also 'incorrect'.",
    xpReward: 30
  },
  {
    id: "rebus_007",
    visualContent: `
      <div class="relative p-12 bg-zinc-950 rounded-[4rem] shadow-3xl border border-white/10 overflow-hidden">
        <!-- SVG Cookie/Cracker -->
        <svg width="180" height="180" viewBox="0 0 100 100" class="relative z-10">
           <circle cx="50" cy="50" r="45" class="fill-amber-200 stroke-amber-300" stroke-width="3" />
           <circle cx="30" cy="30" r="4" class="fill-amber-700 opacity-60" />
           <circle cx="70" cy="40" r="5" class="fill-amber-700 opacity-60" />
           <circle cx="50" cy="70" r="4" class="fill-amber-700 opacity-60" />
           <circle cx="25" cy="60" r="3" class="fill-amber-700 opacity-60" />
           <circle cx="65" cy="20" r="3" class="fill-amber-700 opacity-60" />
        </svg>
        
        <!-- Fire Animation Overlay -->
        <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-full h-full flex justify-center z-20 pointer-events-none">
            <div class="text-8xl animate-bounce drop-shadow-[0_0_20px_rgba(255,59,48,0.8)]">🔥</div>
        </div>
      </div>
    `,
    answer: "Firecracker",
    difficulty: Difficulty.EASY,
    category: Category.GENERAL,
    hint1: "Ein brennender Keks.",
    hint2: "Ein Knallkörper auf Englisch.",
    explanation: "Ein Cracker (Snack), der buchstäblich brennt.",
    xpReward: 15
  },
  {
    id: "rebus_008",
    visualContent: `
      <div class="flex items-center gap-14 font-black italic p-12 bg-white/5 rounded-[4rem]">
        <span class="text-[14rem] text-apple-blue drop-shadow-[0_0_50px_rgba(0,113,227,0.4)] leading-none">U</span>
        <div class="grid grid-cols-2 gap-8 text-6xl text-zinc-400">
          <span>IA</span><span>IA</span><span>IA</span><span>IA</span>
        </div>
      </div>
    `,
    answer: "Euphoria",
    difficulty: Difficulty.HARD,
    category: Category.GENERAL,
    hint1: "Buchstabe + Anzahl + IA.",
    hint2: "Zustand extremer Freude.",
    explanation: "U + four (4) + IA = Euphoria.",
    xpReward: 50
  },
  {
    id: "rebus_009",
    visualContent: `
      <div class="flex items-center gap-12 bg-white/5 p-20 rounded-[4rem] border border-white/5">
        <div class="text-[8rem] font-black text-zinc-400 opacity-40 transform -rotate-12 italic tracking-tighter">BACK</div>
        <div class="flex gap-6">
          <div class="w-24 h-32 bg-apple-blue/10 rounded-xl border-2 border-apple-blue flex flex-col items-center justify-end pb-2 relative overflow-hidden">
             <div class="absolute top-2 w-full flex justify-center"><div class="w-2 h-2 bg-apple-blue rounded-full"></div></div>
             <div class="w-8 h-12 bg-apple-blue/30 rounded-t-lg"></div>
          </div>
          <div class="w-24 h-32 bg-apple-blue/10 rounded-xl border-2 border-apple-blue flex flex-col items-center justify-end pb-2 relative overflow-hidden">
             <div class="absolute top-2 w-full flex justify-center"><div class="w-2 h-2 bg-apple-blue rounded-full"></div></div>
             <div class="w-8 h-12 bg-apple-blue/30 rounded-t-lg"></div>
          </div>
        </div>
      </div>
    `,
    answer: "Back to school",
    difficulty: Difficulty.MEDIUM,
    category: Category.GENERAL,
    hint1: "Position links + Anzahl der Gebäude.",
    hint2: "Nach den Ferien geht es...",
    explanation: "Rücken (Back) + to (2) Schools.",
    xpReward: 30
  },
  {
    id: "rebus_010",
    visualContent: `
      <div class="text-6xl md:text-[9rem] font-black text-apple-blue tracking-widest scale-x-[-1] drop-shadow-[0_0_30px_rgba(0,113,227,0.2)]">
        PSYCHOLOGY
      </div>
    `,
    answer: "Reverse psychology",
    difficulty: Difficulty.MEDIUM,
    category: Category.GENERAL,
    hint1: "Lies es von rechts nach links.",
    hint2: "Psychologie rückwärts.",
    explanation: "Das Wort Psychology ist rückwärts geschrieben.",
    xpReward: 30
  },
  {
    id: "rebus_011",
    visualContent: `
      <div class="flex flex-col items-center gap-12 p-16 bg-zinc-950 rounded-[4rem] border border-white/5">
        <div class="flex gap-4">
           <span class="text-8xl font-black text-white italic animate-pulse" style="font-family: serif;">Z</span>
           <span class="text-6xl font-black text-white/60 italic animate-pulse" style="animation-delay: 0.5s; font-family: serif;">z</span>
           <span class="text-4xl font-black text-white/30 italic animate-pulse" style="animation-delay: 1s; font-family: serif;">z</span>
        </div>
        <div class="flex gap-8 bg-white/5 p-8 rounded-full border border-white/10">
          <div class="w-16 h-16 bg-gradient-to-tr from-pink-500 to-yellow-400 rounded-full shadow-[0_0_30px_rgba(236,72,153,0.6)] animate-spin-slow"></div>
          <div class="w-16 h-16 bg-gradient-to-bl from-purple-500 to-blue-500 rounded-full shadow-[0_0_30px_rgba(168,85,247,0.6)] animate-spin-slow" style="animation-direction: reverse;"></div>
        </div>
      </div>
    `,
    answer: "Sweet dreams",
    difficulty: Difficulty.EASY,
    category: Category.GENERAL,
    hint1: "Schlaf-Symbol + Süßigkeiten (Bonbons).",
    hint2: "Gute Nacht Gruß.",
    explanation: "Schlaf (Zzz) und Süßigkeiten (Sweet).",
    xpReward: 15
  },
  {
    id: "rebus_012",
    visualContent: `
      <div class="flex flex-col items-center gap-4 font-black text-7xl md:text-[8rem] italic tracking-tighter uppercase text-zinc-900 dark:text-white">
        <div class="text-apple-blue drop-shadow-lg">step</div>
        <div class="opacity-10 scale-90">pets</div>
        <div class="opacity-10 scale-90">pets</div>
      </div>
    `,
    answer: "One step forward, two steps back",
    difficulty: Difficulty.HARD,
    category: Category.IDIOMS,
    hint1: "Was ist 'pets' rückwärts?",
    hint2: "Ein Schritt vor, zwei zurück.",
    explanation: "'step' vorwärts, 'pets' (step rückwärts) zweimal.",
    xpReward: 50
  },
  {
    id: "rebus_013",
    visualContent: `
      <div class="flex items-center gap-12 bg-zinc-900 p-16 rounded-[4.5rem] border-4 border-apple-red/20 shadow-inner">
         <div class="relative">
            <span class="text-[12rem] font-black text-apple-red animate-pulse">2</span>
            <div class="absolute -top-12 -left-4 w-32 h-32 bg-apple-red/20 rounded-full blur-3xl"></div>
         </div>
         <div class="flex gap-6 items-center">
            <div class="w-20 h-28 bg-white/10 rounded-2xl flex items-center justify-center font-black text-white text-4xl">H</div>
            <div class="w-20 h-28 bg-white/10 rounded-2xl flex items-center justify-center font-black text-white text-4xl">H</div>
            <span class="text-9xl font-black text-white italic">L</span>
         </div>
      </div>
    `,
    answer: "Too hot to handle",
    difficulty: Difficulty.MEDIUM,
    category: Category.IDIOMS,
    hint1: "Die 2 ist heiß.",
    hint2: "Zwei Hände (H) + L.",
    explanation: "Too (2) hot (rot/pulse) + to handle (H-H-L).",
    xpReward: 30
  },
  {
    id: "rebus_014",
    visualContent: `
      <div class="flex items-center font-black text-[8rem] md:text-[10rem] text-zinc-900 dark:text-white">
        <span class="opacity-10">SI</span>
        <span class="text-5xl text-apple-blue bg-white dark:bg-zinc-900 px-8 py-3 rounded-3xl mx-6 border-[5px] border-apple-blue shadow-2xl animate-pulse italic">co</span>
        <span class="opacity-10">DE</span>
      </div>
    `,
    answer: "Coincide",
    difficulty: Difficulty.HARD,
    category: Category.GENERAL,
    hint1: "Wo befindet sich das Wort 'co'?",
    hint2: "In (inside) SIDE.",
    explanation: "Das Wort 'co' ist in (inside) SIDE. Co-in-side.",
    xpReward: 50
  },
  {
    id: "rebus_015",
    visualContent: `
      <div class="flex flex-col items-center gap-10">
        <div class="text-[8rem] font-black text-apple-green italic drop-shadow-2xl animate-float">LAND</div>
        <div class="w-full h-2 bg-gradient-to-r from-transparent via-apple-green/40 to-transparent rounded-full"></div>
        <div class="flex gap-12 text-4xl font-black text-zinc-400 uppercase tracking-[0.2em] italic">
          <span>FOR</span><span>FOUR</span><span>FORE</span>
        </div>
      </div>
    `,
    answer: "Land on all fours",
    difficulty: Difficulty.MEDIUM,
    category: Category.IDIOMS,
    hint1: "Worauf steht LAND?",
    hint2: "Alle Wörter klingen wie 4.",
    explanation: "LAND steht auf (on) Wörtern, die wie die Zahl 4 klingen.",
    xpReward: 30
  },
  {
    id: "rebus_016",
    visualContent: `
      <div class="flex gap-12 items-end p-16 bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/5">
        ${[1,2,3].map(() => `
           <div class="flex flex-col items-center gap-1 opacity-20">
             <div class="w-12 h-12 bg-zinc-400 rounded-full"></div>
             <div class="w-16 h-12 bg-zinc-400 rounded-t-xl"></div>
             <div class="w-16 h-8 bg-zinc-400 rounded-b-md"></div> <!-- Sitting -->
           </div>
        `).join('')}
        
        <div class="flex flex-col items-center gap-1 animate-bounce">
             <div class="w-12 h-12 bg-apple-blue rounded-full"></div>
             <div class="w-16 h-20 bg-apple-blue rounded-xl"></div> <!-- Standing -->
        </div>
      </div>
    `,
    answer: "Last man standing",
    difficulty: Difficulty.EASY,
    category: Category.GENERAL,
    hint1: "Wer ist der einzige, der aktiv ist?",
    hint2: "Drei sitzen, einer steht.",
    explanation: "Drei sitzen, der letzte steht.",
    xpReward: 15
  },
  {
    id: "rebus_017",
    visualContent: `
      <div class="flex items-center gap-16 bg-white/5 p-16 rounded-[4rem]">
        <div class="flex flex-col items-center">
           <!-- Stylized Deer Icon -->
           <svg width="100" height="100" viewBox="0 0 100 100" class="fill-zinc-800 dark:fill-zinc-200">
             <path d="M20 20 L30 40 L40 20 M80 20 L70 40 L60 20" stroke="currentColor" stroke-width="4" fill="none"/>
             <circle cx="50" cy="60" r="25" />
             <path d="M40 55 L50 65 L60 55" stroke="white dark:stroke-black" stroke-width="3" fill="none" />
           </svg>
           <span class="mt-4 font-black text-zinc-500 uppercase italic text-xs tracking-widest">Doe (Reh)</span>
        </div>
        <!-- Stylized Nut Icon -->
        <svg width="100" height="100" viewBox="0 0 100 100">
           <path d="M25 25 L75 25 L100 50 L75 75 L25 75 L0 50 Z" class="fill-zinc-300 dark:fill-zinc-700" />
           <circle cx="50" cy="50" r="20" class="fill-zinc-900 dark:fill-black" />
        </svg>
      </div>
    `,
    answer: "Donut",
    difficulty: Difficulty.EASY,
    category: Category.GENERAL,
    hint1: "Doe + Nut.",
    hint2: "Rundes Gebäck mit Loch.",
    explanation: "Doe (Reh) + Nut (Mutter) = Donut.",
    xpReward: 15
  },
  {
    id: "rebus_018",
    visualContent: `
      <div class="relative flex flex-col items-center">
        <span class="text-[10rem] font-black text-apple-blue mb-6 animate-bounce drop-shadow-[0_0_30px_rgba(0,113,227,0.4)]">π</span>
        <!-- Ear SVG -->
        <div class="w-48 h-48 bg-white/5 rounded-full border-8 border-zinc-200/10 flex items-center justify-center">
           <svg width="100" height="140" viewBox="0 0 100 140" fill="none" stroke="currentColor" stroke-width="6" class="text-zinc-400">
              <path d="M30 20 Q 90 20 90 70 Q 90 130 50 130 Q 30 130 30 110" />
              <path d="M50 40 Q 70 40 70 70 Q 70 100 50 100" stroke-width="4" />
           </svg>
        </div>
      </div>
    `,
    answer: "Pioneer",
    difficulty: Difficulty.MEDIUM,
    category: Category.GENERAL,
    hint1: "Mathematisches Zeichen + Körperteil.",
    hint2: "Pi on ear...",
    explanation: "Phonetisch: Pi + on + ear.",
    xpReward: 30
  },
  {
    id: "rebus_019",
    visualContent: `
      <div class="relative flex items-center justify-center p-24 bg-zinc-950 rounded-[4rem] overflow-hidden border-4 border-zinc-800">
        <!-- Abstract Flag BG -->
        <div class="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none transform scale-150">
           <div class="w-full h-full bg-gradient-to-tr from-apple-red to-orange-500"></div>
           <div class="absolute top-10 left-10 text-9xl text-yellow-500">★</div>
        </div>
        <div class="relative z-10 text-[9rem] font-black text-white italic underline decoration-apple-red decoration-[12px] tracking-tighter">MADE</div>
      </div>
    `,
    answer: "Made in China",
    difficulty: Difficulty.EASY,
    category: Category.GENERAL,
    hint1: "Wo steht das Wort?",
    hint2: "Das Land der Mitte.",
    explanation: "Das Wort 'MADE' steht in (China).",
    xpReward: 15
  },
  {
    id: "rebus_020",
    visualContent: `
      <div class="flex items-center gap-8 font-black text-6xl md:text-[8rem]">
        <span class="text-zinc-500 italic opacity-40">SIN</span>
        <span class="text-zinc-500 italic opacity-40">SIN</span>
        <span class="text-apple-blue italic">@</span>
        <div class="bg-apple-blue text-white px-8 py-4 rounded-3xl italic shadow-2xl">I</div>
      </div>
    `,
    answer: "Cincinnati",
    difficulty: Difficulty.HARD,
    category: Category.GENERAL,
    hint1: "Lies alles hintereinander.",
    hint2: "Sin + Sin + At + I.",
    explanation: "Phonetisch: Cincinnati.",
    xpReward: 50
  },
  {
    id: "rebus_021",
    visualContent: `
      <div class="flex flex-col items-start gap-6 p-16 bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-3xl">
        <div class="flex items-center gap-8"><span class="text-3xl font-black text-apple-blue">01</span><span class="text-6xl font-black text-zinc-800 dark:text-white uppercase italic">grow</span></div>
        <div class="flex items-center gap-8"><span class="text-3xl font-black text-apple-blue">02</span><span class="text-6xl font-black text-zinc-800 dark:text-white uppercase italic">sure</span></div>
        <div class="flex items-center gap-8"><span class="text-3xl font-black text-apple-blue">03</span><span class="text-6xl font-black text-zinc-800 dark:text-white italic">e</span></div>
      </div>
    `,
    answer: "Grocery",
    difficulty: Difficulty.HARD,
    category: Category.GENERAL,
    hint1: "Lies die englischen Wörter der Liste.",
    hint2: "Grow + sure + e.",
    explanation: "Phonetisch: Grocery.",
    xpReward: 50
  },
  {
    id: "rebus_022",
    visualContent: `
      <div class="flex items-center gap-16">
        <div class="relative w-44 h-64 bg-apple-blue rounded-[3rem] flex flex-col items-center justify-center shadow-[0_30px_60px_rgba(0,113,227,0.4)] border-4 border-white/20">
           <div class="absolute -top-14 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[60px] border-b-apple-blue"></div>
           <span class="text-5xl font-black text-white italic tracking-tighter">IT'S</span>
        </div>
        <div class="flex gap-6">
           <span class="text-[12rem] font-black text-zinc-900 dark:text-white italic drop-shadow-lg">U</span>
           <span class="text-[12rem] font-black text-zinc-900 dark:text-white italic drop-shadow-lg">U</span>
        </div>
      </div>
    `,
    answer: "It's up to you",
    difficulty: Difficulty.MEDIUM,
    category: Category.IDIOMS,
    hint1: "Wo steht 'IT'S'?",
    hint2: "Es ist deine Entscheidung.",
    explanation: "IT'S up + to (2) + you (U).",
    xpReward: 30
  },
  {
    id: "rebus_023",
    visualContent: `
      <div class="relative p-20 bg-zinc-950 rounded-[4rem] border-4 border-white/5 shadow-2xl">
        <span class="text-8xl md:text-[11rem] font-black text-white tracking-[0.2em] uppercase italic opacity-20">TIG<span class="text-apple-red opacity-100 drop-shadow-[0_0_20px_rgba(255,59,48,0.8)]">E</span>R</span>
        <div class="absolute -top-16 left-1/2 -translate-x-1/2 text-8xl animate-bounce">
           <svg width="60" height="100" viewBox="0 0 60 100">
             <path d="M30 0 L30 80" stroke="#FF3B30" stroke-width="8" stroke-linecap="round" />
             <path d="M10 60 L30 80 L50 60" stroke="#FF3B30" stroke-width="8" stroke-linecap="round" fill="none"/>
           </svg>
        </div>
      </div>
    `,
    answer: "Eye of the tiger",
    difficulty: Difficulty.EASY,
    category: Category.GENERAL,
    hint1: "Achte auf den markierten Buchstaben.",
    hint2: "E (Eye) im Tiger.",
    explanation: "Der Buchstabe 'I' (Auge) im Tiger.",
    xpReward: 15
  },
  {
    id: "rebus_024",
    visualContent: `
      <div class="flex items-center gap-16 p-16 bg-white/5 rounded-[4rem] border border-white/5">
        <div class="flex flex-col text-7xl font-black text-apple-red tracking-tighter leading-none italic uppercase">
          <span>L</span><span>O</span><span>V</span><span>E</span>
        </div>
        <div class="w-2 h-72 bg-gradient-to-b from-apple-red via-zinc-400 to-zinc-800 rounded-full shadow-inner"></div>
        <div class="flex flex-col text-7xl font-black text-zinc-300 tracking-tighter leading-none italic uppercase">
          <span>H</span><span>A</span><span>T</span><span>E</span>
        </div>
      </div>
    `,
    answer: "Love-hate relationship",
    difficulty: Difficulty.MEDIUM,
    category: Category.IDIOMS,
    hint1: "Zwei gegensätzliche Gefühle.",
    hint2: "Eine komplizierte Beziehung.",
    explanation: "Liebe und Hass nebeneinander.",
    xpReward: 30
  },
  {
    id: "rebus_025",
    visualContent: `
      <div class="relative flex items-center justify-center w-96 h-96">
        <div class="absolute w-full h-full border-t-[30px] border-l-[30px] border-r-[30px] border-zinc-200 dark:border-zinc-800 rounded-t-full shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"></div>
        <span class="text-6xl font-black text-apple-blue italic uppercase tracking-[0.3em] mt-32 animate-pulse">eology</span>
      </div>
    `,
    answer: "Archaeology",
    difficulty: Difficulty.MEDIUM,
    category: Category.GENERAL,
    hint1: "Die Form ist entscheidend.",
    hint2: "Arch + eology.",
    explanation: "eology steht in einem Bogen (Arch).",
    xpReward: 30
  },
  {
    id: "rebus_026",
    visualContent: `
      <div class="flex flex-col items-center gap-10 p-16 bg-white/5 rounded-[4rem] border border-white/10 shadow-2xl">
        <span class="text-[9rem] font-black text-zinc-900 dark:text-white border-b-8 border-apple-blue pb-8 tracking-tighter italic">STAND</span>
        <span class="text-[12rem] font-black text-apple-blue opacity-5 absolute pointer-events-none">2</span>
      </div>
    `,
    answer: "Understand",
    difficulty: Difficulty.MEDIUM,
    category: Category.GENERAL,
    hint1: "Wo steht das Wort STAND?",
    hint2: "Stand + Under.",
    explanation: "STAND steht über (under) der 2. Phonetisch: Understand.",
    xpReward: 30
  },
  {
    id: "rebus_027",
    visualContent: `
      <div class="relative p-16 bg-zinc-950 rounded-[4rem] border border-white/5">
        <span class="text-8xl md:text-[11rem] font-black text-white/5 uppercase tracking-widest italic">POSED</span>
        <div class="absolute inset-0 flex items-center justify-center">
           <span class="text-[18rem] font-black text-apple-red/40 blur-[2px] animate-pulse">X</span>
        </div>
      </div>
    `,
    answer: "Overexposed",
    difficulty: Difficulty.EASY,
    category: Category.GENERAL,
    hint1: "Ein X über dem Wort.",
    hint2: "Over + X + Posed.",
    explanation: "Das X steht über dem Wort POSED.",
    xpReward: 15
  },
  {
    id: "rebus_028",
    visualContent: `
      <div class="flex gap-24 p-24 bg-white/5 backdrop-blur-2xl rounded-[5rem] border border-white/10 shadow-3xl">
        <div class="flex flex-col-reverse text-7xl font-black text-apple-blue tracking-tighter uppercase italic leading-none">
          <span>W</span><span>H</span><span>A</span><span>T</span>
        </div>
        <div class="flex flex-col text-7xl font-black text-apple-red tracking-tighter uppercase italic leading-none">
          <span>M</span><span>U</span><span>S</span><span>T</span>
        </div>
      </div>
    `,
    answer: "What goes up must come down",
    difficulty: Difficulty.MEDIUM,
    category: Category.IDIOMS,
    hint1: "Achte auf die Richtungen.",
    hint2: "Was hoch geht, muss...",
    explanation: "Die Ausrichtung der Wörter bestimmt den Satz.",
    xpReward: 30
  },
  {
    id: "rebus_029",
    visualContent: `
      <div class="flex items-center gap-2 font-black uppercase italic text-apple-blue drop-shadow-xl p-12">
        <span class="text-2xl opacity-10">R</span><span class="text-3xl opacity-20">E</span><span class="text-4xl opacity-40">S</span><span class="text-6xl opacity-60">T</span><span class="text-8xl opacity-80">L</span><span class="text-[10rem] opacity-90">E</span><span class="text-[12rem] opacity-100">S</span><span class="text-[14rem] animate-pulse">S</span>
      </div>
    `,
    answer: "Growing restless",
    difficulty: Difficulty.EASY,
    category: Category.GENERAL,
    hint1: "Das Wort wird immer größer.",
    hint2: "Restless + Growing.",
    explanation: "Das Wort restless wird immer größer.",
    xpReward: 15
  },
  {
    id: "rebus_030",
    visualContent: `
      <div class="flex gap-20 p-16 bg-white/5 rounded-[4rem] border border-white/5">
        <div class="flex flex-col gap-2 text-2xl font-black text-zinc-500 italic opacity-40">
          ${Array(9).fill('<span>WORKING</span>').join('')}
        </div>
        <div class="flex flex-col gap-6 justify-center">
          <span class="text-8xl font-black text-apple-blue drop-shadow-lg">FIVE</span>
          <span class="text-8xl font-black text-apple-blue drop-shadow-lg">FIVE</span>
        </div>
      </div>
    `,
    answer: "Working nine to five",
    difficulty: Difficulty.MEDIUM,
    category: Category.GENERAL,
    hint1: "Zähle die Wiederholungen beider Wörter.",
    hint2: "Neun mal Arbeit zu zwei Fünfen.",
    explanation: "9x WORKING + 2 (to) FIVE.",
    xpReward: 30
  },
  {
    id: "rebus_031",
    visualContent: `
      <div class="flex flex-col items-center font-black p-12 bg-zinc-950 rounded-[4rem]">
        <span class="text-[8rem] text-apple-blue animate-bounce drop-shadow-[0_0_20px_rgba(0,113,227,0.5)]">C</span>
        <span class="text-[12rem] text-white tracking-tighter leading-none italic">GO</span>
      </div>
    `,
    answer: "Congo",
    difficulty: Difficulty.MEDIUM,
    category: Category.GENERAL,
    hint1: "C steht auf GO.",
    hint2: "C + on + go.",
    explanation: "Phonetisch: Congo.",
    xpReward: 30
  },
  {
    id: "rebus_032",
    visualContent: `
      <div class="flex flex-col items-center gap-14 p-16 bg-white/5 rounded-[4rem]">
         <div class="text-7xl font-black bg-zinc-900 text-white px-14 py-5 rounded-[2rem] shadow-2xl border border-white/5 italic">Trial</div>
         <div class="relative w-48 h-48 border-8 border-apple-red rounded-full flex items-center justify-center">
            <!-- Arrow Missing Target SVG -->
            <svg width="100" height="100" viewBox="0 0 100 100">
               <path d="M80 20 L20 80" stroke="#FF3B30" stroke-width="8" stroke-linecap="round" />
               <path d="M20 80 L30 50 L50 70 L20 80" fill="#FF3B30" />
            </svg>
         </div>
      </div>
    `,
    answer: "Mistrial",
    difficulty: Difficulty.MEDIUM,
    category: Category.GENERAL,
    hint1: "Das Ziel wurde verfehlt.",
    hint2: "Missed + Trial.",
    explanation: "Phonetisch: Mistrial.",
    xpReward: 30
  },
  {
    id: "rebus_033",
    visualContent: `
      <div class="p-24 bg-zinc-300 dark:bg-zinc-800 rounded-[5rem] border-[12px] border-zinc-400 dark:border-zinc-700 flex items-center justify-center shadow-inner">
        <span class="text-[12rem] font-black text-zinc-900 dark:text-white drop-shadow-2xl italic tracking-tighter">SET</span>
      </div>
    `,
    answer: "Set in stone",
    difficulty: Difficulty.EASY,
    category: Category.IDIOMS,
    hint1: "In welchem Material ist das Wort?",
    hint2: "Bedeutet: Nicht mehr zu ändern.",
    explanation: "SET steht buchstäblich in Stein.",
    xpReward: 15
  },
  {
    id: "rebus_034",
    visualContent: `
      <div class="flex items-center gap-16 p-16 bg-white/5 rounded-[4rem]">
         <span class="text-[18rem] font-black italic text-zinc-400 opacity-20 drop-shadow-sm">i</span>
         <div class="bg-apple-blue text-white p-12 rounded-[3rem] shadow-2xl animate-pulse">
            <span class="text-7xl font-black uppercase tracking-tighter italic">AAAGH!</span>
         </div>
      </div>
    `,
    answer: "Ice cream",
    difficulty: Difficulty.EASY,
    category: Category.GENERAL,
    hint1: "Das i schreit.",
    hint2: "I + Scream.",
    explanation: "Phonetisch: I scream = Ice cream.",
    xpReward: 15
  },
  {
    id: "rebus_035",
    visualContent: `
      <div class="flex items-center gap-20 p-16 bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/5">
        <span class="text-9xl font-black text-apple-red italic drop-shadow-lg">ROT</span>
        <div class="grid grid-cols-5 gap-6">
          ${Array(10).fill('<div class="w-12 h-12 bg-apple-red rounded-full shadow-lg border-2 border-apple-red/50"></div>').join('')}
        </div>
      </div>
    `,
    answer: "Rotten apples",
    difficulty: Difficulty.EASY,
    category: Category.IDIOMS,
    hint1: "Ein Wort + eine Anzahl von Früchten.",
    hint2: "ROT + ten (10) + Äpfel.",
    explanation: "Phonetisch: Rotten apples.",
    xpReward: 15
  },
  {
    id: "rebus_036",
    visualContent: `
      <div class="grid grid-cols-2 gap-12 p-20 bg-zinc-950 rounded-[5rem] border border-white/5">
        <span class="text-7xl font-black text-white/10 italic transform rotate-12 blur-[1px]">egsg</span>
        <span class="text-7xl font-black text-white/10 italic transform -rotate-12 blur-[1px]">gges</span>
        <span class="text-7xl font-black text-white/10 italic transform skew-x-12 blur-[1px]">gsge</span>
        <span class="text-7xl font-black text-white/10 italic blur-[1px]">egsg</span>
      </div>
    `,
    answer: "Scrambled eggs",
    difficulty: Difficulty.MEDIUM,
    category: Category.GENERAL,
    hint1: "Die Buchstaben sind durcheinander.",
    hint2: "Eiergericht.",
    explanation: "Die Buchstaben von EGGS sind durcheinander (scrambled).",
    xpReward: 30
  },
  {
    id: "rebus_037",
    visualContent: `
      <div class="flex items-center gap-16 p-12 bg-white/5 rounded-[4rem]">
        <div class="w-12 h-12 bg-apple-blue rounded-lg flex items-center justify-center font-black text-white">2</div>
        <div class="flex flex-col gap-6">
           <span class="text-9xl font-black opacity-10 italic">LATE</span>
           <span class="text-9xl font-black opacity-10 italic">LATE</span>
        </div>
      </div>
    `,
    answer: "Too little too late",
    difficulty: Difficulty.HARD,
    category: Category.IDIOMS,
    hint1: "Größe der 2 + Anzahl von LATE.",
    hint2: "Zu wenig, zu spät.",
    explanation: "2 (too) klein (little) + 2 (too) mal LATE.",
    xpReward: 50
  },
  {
    id: "rebus_038",
    visualContent: `
      <div class="flex items-center gap-16 p-16 bg-zinc-950 rounded-[4.5rem] border-4 border-white/5 shadow-3xl">
        <!-- Locked & -->
        <div class="relative p-10 bg-zinc-900 rounded-3xl border-4 border-zinc-800">
           <span class="text-[10rem] text-white font-black italic">&</span>
           <div class="absolute -top-6 -right-6 w-16 h-16 bg-apple-red rounded-full flex items-center justify-center border-4 border-zinc-900">
              <!-- Lock Icon -->
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                 <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                 <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
           </div>
        </div>
        <div class="flex flex-col items-center gap-10">
           <!-- Loaded (Battery) -->
           <div class="w-32 h-16 bg-apple-red/20 border-4 border-apple-red rounded-xl animate-pulse flex items-center p-2 relative">
              <div class="absolute -right-3 w-2 h-6 bg-apple-red rounded-r-md"></div>
              <div class="w-4 h-full bg-apple-red rounded-sm"></div>
           </div>
           <!-- Dead (Skull) -->
           <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-zinc-500">
             <circle cx="9" cy="12" r="1"/>
             <circle cx="15" cy="12" r="1"/>
             <path d="M8 20v2h8v-2"/>
             <circle cx="12" cy="12" r="10"/>
           </svg>
        </div>
      </div>
    `,
    answer: "Locked and loaded",
    difficulty: Difficulty.HARD,
    category: Category.IDIOMS,
    hint1: "Gesperrt + fast leer + tot.",
    hint2: "Voll bereit.",
    explanation: "Locked + And (&) + Lo (Batterie) + dead (Skelett).",
    xpReward: 50
  },
  {
    id: "rebus_039",
    visualContent: `
      <div class="flex flex-col items-center gap-4 font-black text-6xl md:text-[7rem] text-zinc-500 italic tracking-tighter opacity-20">
        <span>LIVE</span>
        <div class="flex gap-10 text-apple-blue opacity-100 drop-shadow-xl">
          <span>LIVE</span><span>DAY</span>
        </div>
        <div class="flex gap-10 text-apple-blue opacity-100 drop-shadow-xl">
          <span>LIVE</span><span>DAY</span>
        </div>
        <span>LIVE</span>
      </div>
    `,
    answer: "Live for today",
    difficulty: Difficulty.MEDIUM,
    category: Category.GENERAL,
    hint1: "Zähle wie oft LIVE vorkommt.",
    hint2: "Lebe für den Moment.",
    explanation: "4 mal LIVE und 2 mal DAY.",
    xpReward: 30
  },
  {
    id: "rebus_040",
    visualContent: `
      <div class="flex items-center gap-20 p-20 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 shadow-3xl">
        <div class="w-48 h-32 bg-apple-red rounded-full shadow-[0_20px_40px_rgba(255,59,48,0.4)] relative overflow-hidden flex items-center justify-center">
           <div class="w-full h-1 bg-white/20"></div> <!-- Lips Split -->
        </div>
        <div class="flex flex-col-reverse font-black text-[9rem] text-apple-blue leading-none italic tracking-tighter">
          <span>M</span><span>A</span><span>K</span><span>E</span>
        </div>
      </div>
    `,
    answer: "Kiss and make up",
    difficulty: Difficulty.EASY,
    category: Category.IDIOMS,
    hint1: "Symbol + Richtung des Wortes.",
    hint2: "Sich nach einem Streit vertragen.",
    explanation: "Kiss + MAKE nach oben (up).",
    xpReward: 15
  }
];
