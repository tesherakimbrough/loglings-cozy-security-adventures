
import { toast } from 'sonner';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'learning' | 'mastery' | 'exploration' | 'social' | 'special' | 'security';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  unlockedDate?: string;
  progress: number;
  maxProgress: number;
  hidden?: boolean;
  rewardJoyPoints: number;
  rewardDescription: string;
}

export const softLaunchAchievements: Achievement[] = [
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
    rewardJoyPoints: 50,
    rewardDescription: 'Welcome gift from Pip!'
  },
  {
    id: 'quick-learner',
    name: 'Quick Learner',
    description: 'Complete 5 sessions',
    icon: '📚',
    category: 'learning',
    rarity: 'common',
    unlocked: false,
    progress: 0,
    maxProgress: 5,
    rewardJoyPoints: 100,
    rewardDescription: 'Learning boost from Luna!'
  },
  {
    id: 'dedicated-student',
    name: 'Dedicated Student',
    description: 'Complete 25 sessions',
    icon: '🎓',
    category: 'learning',
    rarity: 'rare',
    unlocked: false,
    progress: 0,
    maxProgress: 25,
    rewardJoyPoints: 300,
    rewardDescription: 'Special recognition from Sage!'
  },

  // Mastery Achievements
  {
    id: 'sharp-eye',
    name: 'Sharp Eye',
    description: 'Achieve 80% accuracy in a session',
    icon: '👁️',
    category: 'mastery',
    rarity: 'common',
    unlocked: false,
    progress: 0,
    maxProgress: 80,
    rewardJoyPoints: 150,
    rewardDescription: 'Observation skills unlocked!'
  },
  {
    id: 'expert-analyst',
    name: 'Expert Analyst',
    description: 'Achieve 95% accuracy in a session',
    icon: '🔍',
    category: 'mastery',
    rarity: 'epic',
    unlocked: false,
    progress: 0,
    maxProgress: 95,
    rewardJoyPoints: 500,
    rewardDescription: 'Master analyst badge!'
  },
  {
    id: 'speed-demon',
    name: 'Lightning Reflexes',
    description: 'Complete a session in under 3 minutes',
    icon: '⚡',
    category: 'mastery',
    rarity: 'rare',
    unlocked: false,
    progress: 0,
    maxProgress: 180, // seconds
    rewardJoyPoints: 250,
    rewardDescription: 'Speed boost ability!'
  },

  // Security Category Achievements
  {
    id: 'auth-guardian',
    name: 'Authentication Guardian',
    description: 'Correctly identify 10 authentication threats',
    icon: '🔐',
    category: 'security',
    rarity: 'common',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    rewardJoyPoints: 200,
    rewardDescription: 'Authentication expert badge!'
  },
  {
    id: 'network-sentinel',
    name: 'Network Sentinel',
    description: 'Master network security scenarios',
    icon: '🌐',
    category: 'security',
    rarity: 'rare',
    unlocked: false,
    progress: 0,
    maxProgress: 15,
    rewardJoyPoints: 300,
    rewardDescription: 'Network defender title!'
  },
  {
    id: 'file-protector',
    name: 'File System Protector',
    description: 'Detect 20 file system threats',
    icon: '📁',
    category: 'security',
    rarity: 'rare',
    unlocked: false,
    progress: 0,
    maxProgress: 20,
    rewardJoyPoints: 350,
    rewardDescription: 'File guardian status!'
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
    rewardJoyPoints: 150,
    rewardDescription: 'Consistency bonus!'
  },
  {
    id: 'week-warrior',
    name: 'Week Warrior',
    description: 'Maintain a 7-day learning streak',
    icon: '⚔️',
    category: 'social',
    rarity: 'epic',
    unlocked: false,
    progress: 0,
    maxProgress: 7,
    rewardJoyPoints: 400,
    rewardDescription: 'Weekly champion title!'
  },

  // Exploration Achievements
  {
    id: 'category-explorer',
    name: 'Category Explorer',
    description: 'Encounter scenarios from all 6 categories',
    icon: '🗺️',
    category: 'exploration',
    rarity: 'rare',
    unlocked: false,
    progress: 0,
    maxProgress: 6,
    rewardJoyPoints: 250,
    rewardDescription: 'Explorer badge!'
  },
  {
    id: 'difficulty-climber',
    name: 'Difficulty Climber',
    description: 'Progress from beginner to advanced difficulty',
    icon: '🏔️',
    category: 'exploration',
    rarity: 'epic',
    unlocked: false,
    progress: 0,
    maxProgress: 3,
    rewardJoyPoints: 500,
    rewardDescription: 'Mountain climber title!'
  },

  // Special Achievements
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
    rewardJoyPoints: 100,
    rewardDescription: 'Morning person bonus!'
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Complete a session after 10 PM',
    icon: '🦉',
    category: 'special',
    rarity: 'common',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    rewardJoyPoints: 100,
    rewardDescription: 'Night shift bonus!'
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Get 100% accuracy in a 10+ round session',
    icon: '💎',
    category: 'mastery',
    rarity: 'legendary',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    rewardJoyPoints: 1000,
    rewardDescription: 'Perfect diamond badge!'
  }
];

export class AchievementTracker {
  private achievements: Achievement[] = [];
  private listeners: ((achievement: Achievement) => void)[] = [];

  constructor() {
    this.loadAchievements();
  }

  private loadAchievements() {
    const saved = localStorage.getItem('loglings-achievements');
    if (saved) {
      try {
        this.achievements = JSON.parse(saved);
      } catch {
        this.achievements = [...softLaunchAchievements];
      }
    } else {
      this.achievements = [...softLaunchAchievements];
    }
  }

  private saveAchievements() {
    localStorage.setItem('loglings-achievements', JSON.stringify(this.achievements));
  }

  onAchievementUnlocked(callback: (achievement: Achievement) => void) {
    this.listeners.push(callback);
  }

  private notifyAchievementUnlocked(achievement: Achievement) {
    this.listeners.forEach(callback => callback(achievement));
    
    // Show toast notification
    toast.success(`🏆 Achievement Unlocked: ${achievement.name}!`, {
      description: achievement.rewardDescription,
      duration: 5000,
    });
  }

  updateProgress(gameData: any, userProgress: any) {
    let hasNewUnlocks = false;

    this.achievements = this.achievements.map(achievement => {
      if (achievement.unlocked) return achievement;

      let newProgress = achievement.progress;
      
      switch (achievement.id) {
        case 'first-steps':
          if (userProgress.totalSessions >= 1) newProgress = 1;
          break;
        case 'quick-learner':
          newProgress = Math.min(userProgress.totalSessions, 5);
          break;
        case 'dedicated-student':
          newProgress = Math.min(userProgress.totalSessions, 25);
          break;
        case 'sharp-eye':
          const accuracy = (gameData.correctAnswers / gameData.totalRounds) * 100;
          if (accuracy >= 80) newProgress = Math.max(newProgress, accuracy);
          break;
        case 'expert-analyst':
          const expertAccuracy = (gameData.correctAnswers / gameData.totalRounds) * 100;
          if (expertAccuracy >= 95) newProgress = Math.max(newProgress, expertAccuracy);
          break;
        case 'speed-demon':
          if (gameData.timeElapsed <= 180) newProgress = achievement.maxProgress;
          break;
        case 'streak-starter':
          newProgress = Math.min(userProgress.currentStreak || 0, 3);
          break;
        case 'week-warrior':
          newProgress = Math.min(userProgress.currentStreak || 0, 7);
          break;
        case 'early-bird':
          const hour = new Date().getHours();
          if (hour < 8) newProgress = 1;
          break;
        case 'night-owl':
          const nightHour = new Date().getHours();
          if (nightHour >= 22) newProgress = 1;
          break;
        case 'perfectionist':
          if (gameData.correctAnswers === gameData.totalRounds && gameData.totalRounds >= 10) {
            newProgress = 10;
          }
          break;
      }

      const isNowUnlocked = newProgress >= achievement.maxProgress;
      
      if (!achievement.unlocked && isNowUnlocked) {
        hasNewUnlocks = true;
        const unlockedAchievement = {
          ...achievement,
          progress: newProgress,
          unlocked: true,
          unlockedDate: new Date().toISOString()
        };
        
        // Notify about unlock
        setTimeout(() => this.notifyAchievementUnlocked(unlockedAchievement), 1000);
        
        return unlockedAchievement;
      }
      
      return { ...achievement, progress: newProgress };
    });

    if (hasNewUnlocks) {
      this.saveAchievements();
    }
  }

  getAchievements(): Achievement[] {
    return this.achievements;
  }

  getUnlockedCount(): number {
    return this.achievements.filter(a => a.unlocked).length;
  }

  getTotalJoyPoints(): number {
    return this.achievements
      .filter(a => a.unlocked)
      .reduce((total, a) => total + a.rewardJoyPoints, 0);
  }
}

export const achievementTracker = new AchievementTracker();
