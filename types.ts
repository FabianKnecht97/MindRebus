
export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
  EXPERT = 'Expert'
}

export enum Category {
  GENERAL = 'Allgemein',
  IDIOMS = 'Redewendungen',
  MOVIES = 'Filme',
  MUSIC = 'Musik',
  DAILY = 'Tagesrätsel'
}

export interface RebusPuzzle {
  id: string;
  visualContent: string; // HTML/CSS representation
  answer: string;
  acceptedSynonyms?: string[];
  difficulty: Difficulty;
  category: Category;
  hint1: string; 
  hint2: string;
  explanation: string;
  xpReward: number;
}

export interface UserState {
  username: string;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  level: number; // This will represent the current puzzle level (1-indexed)
  currentXp: number;
  totalScore: number;
  highScore: number;
  streak: number;
  coins: number;
  hintPool: number;
  lastHintRegen: number;
  solvedPuzzles: string[]; // IDs of solved puzzles in order
  failedPuzzles: string[];
  isPro: boolean;
}

export interface GameState {
  currentPuzzleId: string | null;
  lives: number;
  attempts: number;
  isSolved: boolean;
  isFailed: boolean;
  feedbackMessage: string | null;
  feedbackType: 'success' | 'error' | 'info' | null;
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  level: number;
  score: number;
  streak: number;
}
