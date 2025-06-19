
import { useState, useEffect } from 'react';
import { useEnhancedProgress } from './useEnhancedProgress';

export interface DailyChallenge {
  id: string;
  date: string;
  title: string;
  description: string;
  emoji: string;
  type: 'accuracy' | 'speed' | 'streak' | 'category-focus';
  target: number;
  progress: number;
  completed: boolean;
  reward: {
    joyPoints: number;
    achievement?: string;
    unlockable?: string;
  };
}

const STORAGE_KEY = 'loglings-daily-challenges';

export const useDailyChallenges = () => {
  const { progress } = useEnhancedProgress();
  const [challenges, setChallenges] = useState<DailyChallenge[]>([]);
  const [streakCount, setStreakCount] = useState(0);

  const generateDailyChallenge = (date: string): DailyChallenge => {
    const challengeTemplates = [
      {
        type: 'accuracy' as const,
        title: 'Perfect Vision',
        description: 'Achieve 80% accuracy in a session',
        emoji: '🎯',
        target: 8,
        reward: { joyPoints: 150, achievement: 'daily-perfectionist' }
      },
      {
        type: 'speed' as const,
        title: 'Quick Thinking',
        description: 'Complete a 10-round session in under 5 minutes',
        emoji: '⚡',
        target: 300, // seconds
        reward: { joyPoints: 100, unlockable: 'speed-badge' }
      },
      {
        type: 'streak' as const,
        title: 'Consistency Champion',
        description: 'Play for 3 days in a row',
        emoji: '🔥',
        target: 3,
        reward: { joyPoints: 200, achievement: 'streak-keeper' }
      },
      {
        type: 'category-focus' as const,
        title: 'Network Guardian',
        description: 'Correctly identify 5 network-related logs',
        emoji: '🌐',
        target: 5,
        reward: { joyPoints: 120, unlockable: 'network-expert' }
      }
    ];

    const template = challengeTemplates[Math.floor(Math.random() * challengeTemplates.length)];
    
    return {
      id: `daily-${date}`,
      date,
      ...template,
      progress: 0,
      completed: false
    };
  };

  const getTodayString = () => {
    return new Date().toISOString().split('T')[0];
  };

  const loadChallenges = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const today = getTodayString();
    
    if (saved) {
      const parsed = JSON.parse(saved);
      const todayChallenge = parsed.find((c: DailyChallenge) => c.date === today);
      
      if (todayChallenge) {
        setChallenges([todayChallenge]);
      } else {
        // Generate new challenge for today
        const newChallenge = generateDailyChallenge(today);
        const updatedChallenges = [...parsed.filter((c: DailyChallenge) => c.date !== today), newChallenge];
        setChallenges([newChallenge]);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedChallenges));
      }
    } else {
      // First time - generate today's challenge
      const newChallenge = generateDailyChallenge(today);
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
    const updated = allChallenges.map((c: DailyChallenge) => {
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
    const completedChallenges = allChallenges.filter((c: DailyChallenge) => c.completed);
    
    // Calculate consecutive days
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateString = checkDate.toISOString().split('T')[0];
      
      const dayChallenge = completedChallenges.find((c: DailyChallenge) => c.date === dateString);
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
  }, []);

  const todaysChallenge = challenges[0] || null;

  return {
    todaysChallenge,
    streakCount,
    updateChallengeProgress,
    refreshChallenge: loadChallenges
  };
};
