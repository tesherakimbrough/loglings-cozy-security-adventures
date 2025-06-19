
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Shield, Zap, Target, Crown, Award } from 'lucide-react';
import { toast } from 'sonner';
import { useUserProfile } from '../hooks/useUserProfile';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'learning' | 'mastery' | 'exploration' | 'social' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  reward: string;
  hidden?: boolean;
}

const achievementDefinitions: Achievement[] = [
  {
    id: 'first-steps',
    name: 'Forest Newcomer',
    description: 'Complete your first cybersecurity adventure',
    icon: Shield,
    category: 'learning',
    rarity: 'common',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    reward: '50 Joy Points'
  },
  {
    id: 'keen-eye',
    name: 'Keen Observer',
    description: 'Achieve 90% accuracy in a single session',
    icon: Target,
    category: 'mastery',
    rarity: 'rare',
    unlocked: false,
    progress: 0,
    maxProgress: 90,
    reward: '200 Joy Points + Pip Evolution'
  },
  {
    id: 'threat-hunter',
    name: 'Threat Hunter',
    description: 'Correctly identify 25 critical threats',
    icon: Star,
    category: 'mastery',
    rarity: 'epic',
    unlocked: false,
    progress: 0,
    maxProgress: 25,
    reward: 'Luna Logling Unlocked'
  },
  {
    id: 'streak-master',
    name: 'Dedicated Guardian',
    description: 'Maintain a 7-day learning streak',
    icon: Zap,
    category: 'social',
    rarity: 'rare',
    unlocked: false,
    progress: 0,
    maxProgress: 7,
    reward: 'Sage Logling Unlocked'
  },
  {
    id: 'perfectionist',
    name: 'Perfect Vision',
    description: 'Get 100% accuracy in a 10-round session',
    icon: Crown,
    category: 'mastery',
    rarity: 'legendary',
    unlocked: false,
    progress: 0,
    maxProgress: 10,
    reward: 'Golden Logling + 500 Joy Points'
  },
  {
    id: 'category-master',
    name: 'Security Sage',
    description: 'Master all 6 security categories',
    icon: Award,
    category: 'exploration',
    rarity: 'epic',
    unlocked: false,
    progress: 0,
    maxProgress: 6,
    reward: 'Custom Logling Colors'
  }
];

const AchievementSystem = () => {
  const { profile, updateProgress } = useUserProfile();
  const [achievements, setAchievements] = useState<Achievement[]>(achievementDefinitions);
  const [newUnlocks, setNewUnlocks] = useState<Achievement[]>([]);

  const checkAchievements = (gameData: any) => {
    const updatedAchievements = achievements.map(achievement => {
      let newProgress = achievement.progress;
      
      switch (achievement.id) {
        case 'first-steps':
          if (profile.progress.totalSessions >= 1) newProgress = 1;
          break;
        case 'keen-eye':
          const accuracy = (gameData.correctAnswers / gameData.totalRounds) * 100;
          if (accuracy >= 90) newProgress = Math.max(newProgress, accuracy);
          break;
        case 'threat-hunter':
          newProgress = Math.min(profile.progress.correctAnswers, 25);
          break;
        case 'streak-master':
          newProgress = Math.min(profile.progress.currentStreak, 7);
          break;
        case 'perfectionist':
          if (gameData.correctAnswers === 10 && gameData.totalRounds === 10) {
            newProgress = 10;
          }
          break;
        case 'category-master':
          // Track categories encountered (would need additional tracking)
          break;
      }
      
      const wasUnlocked = achievement.unlocked;
      const isNowUnlocked = newProgress >= achievement.maxProgress;
      
      if (!wasUnlocked && isNowUnlocked) {
        const unlockedAchievement = { ...achievement, unlocked: true, progress: newProgress };
        setNewUnlocks(prev => [...prev, unlockedAchievement]);
        toast.success(`🏆 Achievement Unlocked: ${achievement.name}!`, {
          description: achievement.reward
        });
      }
      
      return { ...achievement, progress: newProgress, unlocked: isNowUnlocked };
    });
    
    setAchievements(updatedAchievements);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 border-gray-300';
      case 'rare': return 'text-blue-600 border-blue-300';
      case 'epic': return 'text-purple-600 border-purple-300';
      case 'legendary': return 'text-yellow-600 border-yellow-300';
      default: return 'text-gray-600 border-gray-300';
    }
  };

  return {
    achievements,
    checkAchievements,
    AchievementDisplay: () => (
      <Card className="cozy-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {achievements.filter(a => !a.hidden || a.unlocked).map(achievement => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    achievement.unlocked 
                      ? `${getRarityColor(achievement.rarity)} bg-opacity-10` 
                      : 'border-muted bg-muted/30 opacity-60'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${achievement.unlocked ? getRarityColor(achievement.rarity).split(' ')[0] : 'text-muted-foreground'}`} />
                  <div className="flex-1">
                    <div className="font-medium">{achievement.name}</div>
                    <div className="text-sm text-muted-foreground">{achievement.description}</div>
                    {achievement.progress < achievement.maxProgress && (
                      <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="mt-1 h-1" />
                    )}
                  </div>
                  <Badge variant={achievement.unlocked ? "default" : "secondary"} className="text-xs">
                    {achievement.rarity}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    )
  };
};

export default AchievementSystem;
