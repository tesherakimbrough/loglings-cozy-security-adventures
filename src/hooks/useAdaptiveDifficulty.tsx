
import { useState, useEffect } from 'react';
import { useUserProfile } from './useUserProfile';

interface PerformanceMetrics {
  accuracy: number;
  averageTime: number;
  categoryStrengths: Record<string, number>;
  recentSessions: number;
  consistentPerformance: boolean;
}

export const useAdaptiveDifficulty = () => {
  const { profile } = useUserProfile();
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    accuracy: 0,
    averageTime: 0,
    categoryStrengths: {},
    recentSessions: 0,
    consistentPerformance: false
  });

  const calculateOptimalDifficulty = (): 'beginner' | 'intermediate' | 'advanced' => {
    // Start with user's preferred difficulty
    let baseDifficulty = profile.preferences.difficulty;
    
    // Adjust based on recent performance
    if (metrics.accuracy >= 90 && metrics.recentSessions >= 5) {
      if (baseDifficulty === 'beginner') return 'intermediate';
      if (baseDifficulty === 'intermediate') return 'advanced';
    }
    
    if (metrics.accuracy < 60 && metrics.recentSessions >= 3) {
      if (baseDifficulty === 'advanced') return 'intermediate';
      if (baseDifficulty === 'intermediate') return 'beginner';
    }
    
    return baseDifficulty;
  };

  const updateMetrics = (sessionData: {
    accuracy: number;
    timeSpent: number;
    correctByCategory: Record<string, number>;
  }) => {
    setMetrics(prev => ({
      ...prev,
      accuracy: (prev.accuracy * prev.recentSessions + sessionData.accuracy) / (prev.recentSessions + 1),
      averageTime: (prev.averageTime * prev.recentSessions + sessionData.timeSpent) / (prev.recentSessions + 1),
      categoryStrengths: {
        ...prev.categoryStrengths,
        ...sessionData.correctByCategory
      },
      recentSessions: Math.min(prev.recentSessions + 1, 10), // Keep last 10 sessions
      consistentPerformance: Math.abs(sessionData.accuracy - prev.accuracy) < 15
    }));
  };

  const getEncouragementMessage = (): string => {
    if (metrics.accuracy >= 85) {
      return "You're becoming a true security expert! The Loglings are so proud! 🌟";
    } else if (metrics.accuracy >= 70) {
      return "Great progress! You're developing excellent security instincts! 🌿";
    } else {
      return "Every expert started as a beginner. Keep exploring and learning! 🌱";
    }
  };

  const shouldSuggestDifficultyIncrease = (): boolean => {
    return metrics.accuracy >= 85 && 
           metrics.recentSessions >= 5 && 
           metrics.consistentPerformance &&
           profile.preferences.difficulty !== 'advanced';
  };

  const shouldSuggestDifficultyDecrease = (): boolean => {
    return metrics.accuracy < 50 && 
           metrics.recentSessions >= 3 &&
           profile.preferences.difficulty !== 'beginner';
  };

  return {
    metrics,
    updateMetrics,
    calculateOptimalDifficulty,
    getEncouragementMessage,
    shouldSuggestDifficultyIncrease,
    shouldSuggestDifficultyDecrease
  };
};
