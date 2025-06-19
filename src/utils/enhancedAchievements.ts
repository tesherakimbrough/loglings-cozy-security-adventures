
export interface EnhancedAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'learning' | 'social' | 'exploration' | 'mastery' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  unlockedDate?: string;
  progress: number;
  maxProgress: number;
  hidden?: boolean;
  rewardJoyPoints: number;
}

export const achievementDefinitions: EnhancedAchievement[] = [
  // Learning Achievements
  {
    id: 'first-steps',
    name: 'First Steps in the Forest',
    description: 'Complete your first Loglings adventure',
    icon: '🌱',
    category: 'learning',
    rarity: 'common',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rewardJoyPoints: 50
  },
  {
    id: 'keen-observer',
    name: 'Keen Observer',
    description: 'Achieve 90% accuracy in a single session',
    icon: '👁️',
    category: 'learning', 
    rarity: 'rare',
    unlocked: false,
    progress: 0,
    maxProgress: 90,
    rewardJoyPoints: 200
  },
  {
    id: 'security-sage',
    name: 'Security Sage',
    description: 'Correctly identify 50 critical threats',
    icon: '🧙‍♀️',
    category: 'mastery',
    rarity: 'epic',
    unlocked: false,
    progress: 0,
    maxProgress: 50,
    rewardJoyPoints: 500
  },

  // Exploration Achievements
  {
    id: 'category-explorer',
    name: 'Category Explorer',
    description: 'Encounter logs from all 6 categories',
    icon: '🗺️',
    category: 'exploration',
    rarity: 'rare',
    unlocked: false,
    progress: 0,
    maxProgress: 6,
    rewardJoyPoints: 150
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Complete a session between midnight and 6 AM',
    icon: '🦉',
    category: 'special',
    rarity: 'rare',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rewardJoyPoints: 100
  },

  // Social Achievements  
  {
    id: 'streak-starter',
    name: 'Streak Starter',
    description: 'Maintain a 3-day learning streak',
    icon: '🔥',
    category: 'social',
    rarity: 'common',
    unlocked: false,
    progress: 0,
    maxProgress: 3,
    rewardJoyPoints: 100
  },
  {
    id: 'dedicated-learner',
    name: 'Dedicated Learner',
    description: 'Maintain a 7-day learning streak',
    icon: '📚',
    category: 'social',
    rarity: 'epic',
    unlocked: false,
    progress: 0,
    maxProgress: 7,
    rewardJoyPoints: 300
  },

  // Mastery Achievements
  {
    id: 'speed-demon',
    name: 'Lightning Reflexes',
    description: 'Complete a 10-round session in under 4 minutes',
    icon: '⚡',
    category: 'mastery',
    rarity: 'rare',
    unlocked: false,
    progress: 0,
    maxProgress: 240, // seconds
    rewardJoyPoints: 250
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Get 100% accuracy in a 10-round session',
    icon: '💎',
    category: 'mastery',
    rarity: 'legendary',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    rewardJoyPoints: 1000
  },

  // Special/Hidden Achievements
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Complete a session before 8 AM',
    icon: '🌅',
    category: 'special',
    rarity: 'common',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rewardJoyPoints: 75
  },
  {
    id: 'weekend-warrior',
    name: 'Weekend Warrior',
    description: 'Play on both Saturday and Sunday',
    icon: '🎯',
    category: 'special',
    rarity: 'rare',
    unlocked: false,
    progress: 0,
    maxProgress: 2,
    rewardJoyPoints: 150
  },
  {
    id: 'forest-guardian',
    name: 'Forest Guardian',
    description: 'Protect the Loglings by identifying 100 threats correctly',
    icon: '🛡️',
    category: 'mastery',
    rarity: 'legendary',
    unlocked: false,
    progress: 0,
    maxProgress: 100,
    rewardJoyPoints: 750,
    hidden: true
  }
];

export const checkAchievements = (
  gameData: any, 
  userProgress: any,
  currentAchievements: EnhancedAchievement[]
): { newUnlocks: EnhancedAchievement[]; updatedAchievements: EnhancedAchievement[] } => {
  const newUnlocks: EnhancedAchievement[] = [];
  const updatedAchievements = currentAchievements.map(achievement => {
    let newProgress = achievement.progress;
    
    switch (achievement.id) {
      case 'first-steps':
        if (!achievement.unlocked && userProgress.totalSessions >= 1) {
          newProgress = 1;
        }
        break;
        
      case 'keen-observer':
        const accuracy = (gameData.correctAnswers / gameData.totalRounds) * 100;
        if (accuracy >= 90) {
          newProgress = Math.max(newProgress, accuracy);
        }
        break;
        
      case 'speed-demon':
        if (gameData.timeElapsed <= 240 && gameData.totalRounds >= 10) {
          newProgress = achievement.maxProgress;
        }
        break;
        
      case 'perfectionist':
        if (gameData.correctAnswers === 10 && gameData.totalRounds === 10) {
          newProgress = 10;
        }
        break;
        
      case 'early-bird':
        const hour = new Date().getHours();
        if (hour < 8) {
          newProgress = 1;
        }
        break;
        
      case 'night-owl':
        const nightHour = new Date().getHours();
        if (nightHour >= 0 && nightHour < 6) {
          newProgress = 1;
        }
        break;
    }
    
    const wasUnlocked = achievement.unlocked;
    const isNowUnlocked = newProgress >= achievement.maxProgress;
    
    if (!wasUnlocked && isNowUnlocked) {
      newUnlocks.push({
        ...achievement,
        progress: newProgress,
        unlocked: true,
        unlockedDate: new Date().toISOString()
      });
    }
    
    return {
      ...achievement,
      progress: newProgress,
      unlocked: isNowUnlocked,
      unlockedDate: isNowUnlocked && !wasUnlocked ? new Date().toISOString() : achievement.unlockedDate
    };
  });
  
  return { newUnlocks, updatedAchievements };
};
