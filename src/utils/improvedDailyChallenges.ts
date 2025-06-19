import { DifficultyLevel } from '../types/userTypes';

export interface ImprovedDailyChallenge {
  id: string;
  date: string;
  title: string;
  description: string;
  emoji: string;
  type: 'accuracy' | 'speed' | 'streak' | 'category-focus' | 'perfect-round' | 'threat-specialist';
  target: number;
  progress: number;
  completed: boolean;
  difficulty: DifficultyLevel;
  reward: {
    joyPoints: number;
    achievement?: string;
    unlockable?: string;
    title?: string;
  };
  tips: string[];
}

const challengePool = [
  // Accuracy Challenges
  {
    type: 'accuracy' as const,
    title: 'Eagle Eye Detective',
    description: 'Achieve 85% accuracy in any session',
    emoji: '🎯',
    target: 85,
    difficulty: 'beginner' as const,
    reward: { joyPoints: 150, achievement: 'eagle-eye', title: 'Sharp Observer' },
    tips: ['Take your time reading each log carefully', 'Look for timing patterns', 'Check if locations make sense']
  },
  {
    type: 'accuracy' as const,
    title: 'Perfect Vision',
    description: 'Achieve 95% accuracy in a session',
    emoji: '💎',
    target: 95,
    difficulty: 'advanced' as const,
    reward: { joyPoints: 300, achievement: 'perfect-vision', title: 'Security Sage' },
    tips: ['Focus on user behavior patterns', 'Consider context and timing', 'Trust your instincts']
  },

  // Speed Challenges
  {
    type: 'speed' as const,
    title: 'Quick Thinking',
    description: 'Complete 10 rounds in under 6 minutes',
    emoji: '⚡',
    target: 360,
    difficulty: 'beginner' as const,
    reward: { joyPoints: 120, unlockable: 'speed-badge', title: 'Rapid Responder' },
    tips: ['Learn to spot patterns quickly', 'Safe logs often have routine timing', 'Trust first impressions']
  },
  {
    type: 'speed' as const,
    title: 'Lightning Reflexes',
    description: 'Complete 10 rounds in under 4 minutes',
    emoji: '🌪️',
    target: 240,
    difficulty: 'advanced' as const,
    reward: { joyPoints: 250, achievement: 'lightning-fast', title: 'Speed Demon' },
    tips: ['Develop pattern recognition', 'Focus on key indicators first', 'Practice builds speed']
  },

  // Category Focus Challenges
  {
    type: 'category-focus' as const,
    title: 'Network Guardian',
    description: 'Correctly identify 5 network-related threats',
    emoji: '🌐',
    target: 5,
    difficulty: 'intermediate' as const,
    reward: { joyPoints: 180, unlockable: 'network-specialist', title: 'Network Defender' },
    tips: ['Watch for unusual data volumes', 'Check connection destinations', 'Look for scanning patterns']
  },
  {
    type: 'category-focus' as const,
    title: 'Authentication Expert',
    description: 'Correctly identify 7 authentication logs',
    emoji: '🔐',
    target: 7,
    difficulty: 'beginner' as const,
    reward: { joyPoints: 140, achievement: 'auth-expert', title: 'Login Detective' },
    tips: ['Check login times vs work hours', 'Verify location consistency', 'Multiple failures = red flag']
  },

  // Perfect Round Challenges
  {
    type: 'perfect-round' as const,
    title: 'Flawless Detective',
    description: 'Get every answer correct in a session',
    emoji: '⭐',
    target: 10,
    difficulty: 'intermediate' as const,
    reward: { joyPoints: 400, achievement: 'flawless-victory', title: 'Perfect Investigator' },
    tips: ['Start with easier difficulty', 'Read each log twice', 'Consider all context clues']
  },

  // Threat Specialist Challenges
  {
    type: 'threat-specialist' as const,
    title: 'Critical Alert Master',
    description: 'Correctly identify 3 critical threats in one session',
    emoji: '🚨',
    target: 3,
    difficulty: 'advanced' as const,
    reward: { joyPoints: 350, achievement: 'threat-master', title: 'Threat Hunter' },
    tips: ['Look for impossible scenarios', 'Geographic impossibilities are key', 'Privilege abuse patterns']
  },

  // Streak Challenges
  {
    type: 'streak' as const,
    title: 'Consistency Champion',
    description: 'Play for 3 consecutive days',
    emoji: '🔥',
    target: 3,
    difficulty: 'beginner' as const,
    reward: { joyPoints: 200, achievement: 'dedicated-learner', title: 'Committed Guardian' },
    tips: ['Even 5 minutes counts', 'Build a daily habit', 'Consistency beats intensity']
  },
  {
    type: 'streak' as const,
    title: 'Weekly Warrior',
    description: 'Play for 7 consecutive days',
    emoji: '👑',
    target: 7,
    difficulty: 'intermediate' as const,
    reward: { joyPoints: 500, achievement: 'week-warrior', title: 'Security Devotee' },
    tips: ['Set a daily reminder', 'Track your progress', 'Share your goal with friends']
  }
];

export const generateImprovedDailyChallenge = (date: string, userLevel: DifficultyLevel = 'beginner'): ImprovedDailyChallenge => {
  // Filter challenges by user level
  const availableChallenges = challengePool.filter(challenge => 
    challenge.difficulty === userLevel || 
    (userLevel === 'intermediate' && challenge.difficulty === 'beginner') ||
    (userLevel === 'advanced' && ['beginner', 'intermediate'].includes(challenge.difficulty))
  );

  const template = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
  
  return {
    id: `daily-${date}`,
    date,
    ...template,
    progress: 0,
    completed: false
  };
};

export const getProgressiveTarget = (challengeType: string, userLevel: string, baseTarget: number): number => {
  const multipliers = {
    'beginner': 1.0,
    'intermediate': 1.2,
    'advanced': 1.5
  };
  
  return Math.floor(baseTarget * (multipliers[userLevel as keyof typeof multipliers] || 1.0));
};
