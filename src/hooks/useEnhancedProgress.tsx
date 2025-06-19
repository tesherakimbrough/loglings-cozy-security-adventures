
import { useState, useEffect } from 'react';

export interface EnhancedProgressData {
  totalSessions: number;
  totalScore: number;
  correctAnswers: number;
  sessionHistory: SessionData[];
  achievements: Achievement[];
  streakData: StreakData;
  learningMetrics: LearningMetrics;
  preferences: UserPreferences;
}

export interface SessionData {
  id: string;
  date: string;
  score: number;
  accuracy: number;
  timeSpent: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  logTypes: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  progress?: number;
  maxProgress?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface StreakData {
  current: number;
  longest: number;
  lastPlayed: string;
}

export interface LearningMetrics {
  strongestTopics: string[];
  improvementAreas: string[];
  averageSessionTime: number;
  favoriteTimeOfDay: string;
  consistencyScore: number;
}

export interface UserPreferences {
  audioEnabled: boolean;
  musicType: 'forest' | 'lofi' | 'cozy-cafe' | 'rain' | 'fireplace' | 'silence';
  musicVolume: number;
  effectsVolume: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  notifications: boolean;
  shareAchievements: boolean;
}

const STORAGE_KEY = 'loglings-enhanced-progress';

export const useEnhancedProgress = () => {
  const [progress, setProgress] = useState<EnhancedProgressData>({
    totalSessions: 0,
    totalScore: 0,
    correctAnswers: 0,
    sessionHistory: [],
    achievements: [],
    streakData: { current: 0, longest: 0, lastPlayed: '' },
    learningMetrics: {
      strongestTopics: [],
      improvementAreas: [],
      averageSessionTime: 0,
      favoriteTimeOfDay: 'evening',
      consistencyScore: 0
    },
    preferences: {
      audioEnabled: true,
      musicType: 'forest',
      musicVolume: 0.3,
      effectsVolume: 0.6,
      difficulty: 'beginner',
      notifications: true,
      shareAchievements: true
    }
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  const saveProgress = (newProgress: EnhancedProgressData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    setProgress(newProgress);
  };

  const addSession = (sessionData: Omit<SessionData, 'id' | 'date'>) => {
    const newSession: SessionData = {
      ...sessionData,
      id: crypto.randomUUID(),
      date: new Date().toISOString()
    };

    const updatedProgress = {
      ...progress,
      totalSessions: progress.totalSessions + 1,
      totalScore: progress.totalScore + sessionData.score,
      correctAnswers: progress.correctAnswers + (sessionData.accuracy * 10 / 100),
      sessionHistory: [newSession, ...progress.sessionHistory].slice(0, 50) // Keep last 50 sessions
    };

    saveProgress(updatedProgress);
    return newSession;
  };

  const unlockAchievement = (achievementId: string) => {
    const updatedAchievements = progress.achievements.map(achievement => 
      achievement.id === achievementId 
        ? { ...achievement, unlocked: true, unlockedDate: new Date().toISOString() }
        : achievement
    );

    saveProgress({
      ...progress,
      achievements: updatedAchievements
    });
  };

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    saveProgress({
      ...progress,
      preferences: { ...progress.preferences, ...newPreferences }
    });
  };

  return {
    progress,
    addSession,
    unlockAchievement,
    updatePreferences,
    saveProgress
  };
};
