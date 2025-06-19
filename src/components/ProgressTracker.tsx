
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Sparkles, TreePine, Star, Award, Leaf } from 'lucide-react';
import { useEnhancedProgress } from '../hooks/useEnhancedProgress';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

const ProgressTracker = () => {
  const { progress } = useEnhancedProgress();
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    // Load achievements from enhanced progress or initialize defaults
    if (progress.achievements.length > 0) {
      const mappedAchievements = progress.achievements.map(ach => ({
        id: ach.id,
        name: ach.name,
        description: ach.description,
        icon: getIconComponent(ach.icon),
        unlocked: ach.unlocked,
        progress: ach.progress,
        maxProgress: ach.maxProgress
      }));
      setAchievements(mappedAchievements);
    } else {
      // Initialize with default achievements if none exist
      const defaultAchievements: Achievement[] = [
        {
          id: 'first-friend',
          name: 'First Friend',
          description: 'Meet your first Logling companion',
          icon: Heart,
          unlocked: false
        },
        {
          id: 'curious-explorer',
          name: 'Curious Explorer',
          description: 'Complete 5 adventures successfully',
          icon: Sparkles,
          unlocked: false,
          progress: 0,
          maxProgress: 5
        },
        {
          id: 'forest-guardian',
          name: 'Forest Guardian',
          description: 'Achieve 90% accuracy in a session',
          icon: TreePine,
          unlocked: false
        },
        {
          id: 'wisdom-keeper',
          name: 'Wisdom Keeper',
          description: 'Collect 1000 total joy points',
          icon: Star,
          unlocked: false,
          progress: 0,
          maxProgress: 1000
        },
        {
          id: 'streak-master',
          name: 'Streak Master',
          description: 'Maintain a 7-day learning streak',
          icon: Award,
          unlocked: false,
          progress: 0,
          maxProgress: 7
        },
        {
          id: 'logling-whisperer',
          name: 'Logling Whisperer',
          description: 'Befriend all three main Loglings',
          icon: Leaf,
          unlocked: false,
          progress: 0,
          maxProgress: 3
        }
      ];
      setAchievements(defaultAchievements);
    }
  }, [progress.achievements]);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case '❤️': case 'heart': return Heart;
      case '✨': case 'sparkles': return Sparkles;
      case '🌲': case 'tree': return TreePine;
      case '⭐': case 'star': return Star;
      case '🏆': case 'award': return Award;
      case '🍃': case 'leaf': return Leaf;
      default: return Heart;
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalAchievements = achievements.length;

  return (
    <Card className="cozy-card cozy-glow candlelit-warmth">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <Star className="w-6 h-6 animate-sparkle" />
          Your Adventure Progress
        </CardTitle>
        <p className="text-muted-foreground">
          Keep exploring to unlock new achievements and grow your collection!
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-primary">{progress.totalSessions}</div>
            <div className="text-xs text-muted-foreground">Adventures</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-accent">{progress.totalScore}</div>
            <div className="text-xs text-muted-foreground">Joy Collected</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-green-600">{progress.correctAnswers}</div>
            <div className="text-xs text-muted-foreground">Correct Choices</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-2xl font-bold text-blue-600">{progress.streakData.current}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </div>
        </div>

        {/* Achievement Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-primary">Achievements</h4>
            <Badge variant="outline" className="text-xs">
              {unlockedCount}/{totalAchievements}
            </Badge>
          </div>
          
          <div className="grid gap-3">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    achievement.unlocked 
                      ? 'bg-primary/10 border-primary/30 scale-100' 
                      : 'bg-muted/30 border-border/30 opacity-60'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    achievement.unlocked ? 'bg-primary/20' : 'bg-muted/50'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      achievement.unlocked ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{achievement.name}</div>
                    <div className="text-xs text-muted-foreground">{achievement.description}</div>
                    {achievement.progress !== undefined && achievement.maxProgress && (
                      <div className="mt-1">
                        <div className="w-full bg-muted/50 rounded-full h-1.5">
                          <div 
                            className="bg-primary h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {achievement.progress}/{achievement.maxProgress}
                        </div>
                      </div>
                    )}
                  </div>
                  {achievement.unlocked && (
                    <div className="animate-sparkle">
                      <Sparkles className="w-4 h-4 text-accent" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTracker;
