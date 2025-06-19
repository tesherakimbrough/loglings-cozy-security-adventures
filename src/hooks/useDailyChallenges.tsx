
import { useState, useEffect } from 'react';
import { useUserProfile } from './useUserProfile';
import { generateImprovedDailyChallenge, ImprovedDailyChallenge } from '../utils/improvedDailyChallenges';
import { DifficultyLevel } from '../types/userTypes';

export type { ImprovedDailyChallenge as DailyChallenge };

const STORAGE_KEY = 'loglings-daily-challenges-v2';

export const useDailyChallenges = () => {
  const { profile } = useUserProfile();
  const [challenges, setChallenges] = useState<ImprovedDailyChallenge[]>([]);
  const [streakCount, setStreakCount] = useState(0);

  const getTodayString = () => {
    return new Date().toISOString().split('T')[0];
  };

  const loadChallenges = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const today = getTodayString();
    
    if (saved) {
      const parsed = JSON.parse(saved);
      const todayChallenge = parsed.find((c: ImprovedDailyChallenge) => c.date === today);
      
      if (todayChallenge) {
        setChallenges([todayChallenge]);
      } else {
        // Generate new challenge for today based on user level
        const userLevel = profile.preferences.difficulty as DifficultyLevel;
        const newChallenge = generateImprovedDailyChallenge(today, userLevel);
        const updatedChallenges = [...parsed.filter((c: ImprovedDailyChallenge) => c.date !== today), newChallenge];
        setChallenges([newChallenge]);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedChallenges));
      }
    } else {
      // First time - generate today's challenge
      const userLevel = profile.preferences.difficulty as DifficultyLevel;
      const newChallenge = generateImprovedDailyChallenge(today, userLevel);
      setChallenges([newChallenge]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([newChallenge]));
    }
  };

  const updateChallengeProgress = (challengeId: string, newProgress: number) => {
    setChallenges(prev => prev.map(challenge => {
      if (challenge.id === challengeId) {
        const completed = newProgress >= challenge.target;
        return { ...challenge, progress: newProgress, completed };
      }
      return challenge;
    }));
    
    // Save to localStorage
    const saved = localStorage.getItem(STORAGE_KEY) || '[]';
    const allChallenges = JSON.parse(saved);
    const updated = allChallenges.map((c: ImprovedDailyChallenge) => {
      if (c.id === challengeId) {
        const completed = newProgress >= c.target;
        return { ...c, progress: newProgress, completed };
      }
      return c;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const checkStreak = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return 0;
    
    const allChallenges = JSON.parse(saved);
    const completedChallenges = allChallenges.filter((c: ImprovedDailyChallenge) => c.completed);
    
    // Calculate consecutive days
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateString = checkDate.toISOString().split('T')[0];
      
      const dayChallenge = completedChallenges.find((c: ImprovedDailyChallenge) => c.date === dateString);
      if (dayChallenge) {
        streak++;
      } else if (i > 0) {
        break; // Streak broken
      }
    }
    
    return streak;
  };

  useEffect(() => {
    loadChallenges();
    setStreakCount(checkStreak());
  }, [profile.preferences.difficulty]); // Regenerate when difficulty changes

  const todaysChallenge = challenges[0] || null;

  return {
    todaysChallenge,
    streakCount,
    updateChallengeProgress,
    refreshChallenge: loadChallenges
  };
};
