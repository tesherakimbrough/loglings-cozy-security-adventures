
export type UserMode = 'cozy-everyday' | 'career-pro';
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface UserProfile {
  mode: UserMode;
  hasCompletedOnboarding: boolean;
  preferences: {
    difficulty: DifficultyLevel;
    audioEnabled: boolean;
    soundEffectsEnabled: boolean;
    musicType: string;
    musicVolume: number;
    soundEffectsVolume: number;
    notifications: boolean;
    shareAchievements: boolean;
    // Accessibility preferences
    highContrast?: boolean;
    reduceMotion?: boolean;
    fontSize?: string;
    colorBlindMode?: string;
    audioDescriptions?: boolean;
    screenReaderMode?: boolean;
    enhancedFocus?: boolean;
    keyboardOnly?: boolean;
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
