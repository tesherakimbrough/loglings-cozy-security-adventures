export type UserMode = 'cozy-everyday' | 'career-pro';

export interface UserProfile {
  mode: UserMode;
  hasCompletedOnboarding: boolean;
  preferences: {
    difficulty: string;
    audioEnabled: boolean;
    soundEffectsEnabled: boolean;
    musicType: string;
    musicVolume: number;
    soundEffectsVolume: number;
    notifications: boolean;
    shareAchievements: boolean;
  };
  progress: {
    totalSessions: number;
    totalScore: number;
    correctAnswers: number;
    currentStreak: number;
    longestStreak: number;
    unlockedLoglings: string[];
    achievements: string[];
  };
}

export interface ModeFeatures {
  id: UserMode;
  name: string;
  emoji: string;
  description: string;
  benefits: string[];
  challenges: string[];
  difficulty: string;
}
