
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Target, TrendingUp, Award } from 'lucide-react';
import { useUserProfile } from '../hooks/useUserProfile';

interface ProgressionLevel {
  level: number;
  title: string;
  description: string;
  requirement: number;
  rewards: string[];
  icon: string;
}

const progressionLevels: ProgressionLevel[] = [
  {
    level: 1,
    title: "Forest Newcomer",
    description: "Welcome to the Loglings Forest!",
    requirement: 0,
    rewards: ["Access to beginner challenges", "Pip the Safe Logling companion"],
    icon: "🌱"
  },
  {
    level: 2,
    title: "Curious Explorer",
    description: "You're getting the hang of this!",
    requirement: 100,
    rewards: ["Luna the Curious Logling unlocked", "Intermediate difficulty access"],
    icon: "🌿"
  },
  {
    level: 3,
    title: "Vigilant Guardian",
    description: "Your security instincts are sharpening!",
    requirement: 300,
    rewards: ["Sage the Alert Logling unlocked", "Advanced challenges available"],
    icon: "🛡️"
  },
  {
    level: 4,
    title: "Security Sage",
    description: "You're becoming a true expert!",
    requirement: 600,
    rewards: ["Custom Logling colors", "Mentor mode unlocked"],
    icon: "🧙‍♀️"
  },
  {
    level: 5,
    title: "Forest Guardian",
    description: "Master of the Loglings realm!",
    requirement: 1000,
    rewards: ["Golden Logling companion", "Create custom challenges"],
    icon: "👑"
  }
];

const ProgressionSystem = () => {
  const { profile } = useUserProfile();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [nextLevel, setNextLevel] = useState(2);
  const [progressToNext, setProgressToNext] = useState(0);

  useEffect(() => {
    const totalScore = profile.progress.totalScore;
    let level = 1;
    
    for (let i = progressionLevels.length - 1; i >= 0; i--) {
      if (totalScore >= progressionLevels[i].requirement) {
        level = progressionLevels[i].level;
        break;
      }
    }
    
    setCurrentLevel(level);
    
    const nextLevelIndex = Math.min(level, progressionLevels.length - 1);
    setNextLevel(nextLevelIndex + 1);
    
    if (level < progressionLevels.length) {
      const currentReq = progressionLevels[level - 1].requirement;
      const nextReq = progressionLevels[nextLevelIndex].requirement;
      const progress = ((totalScore - currentReq) / (nextReq - currentReq)) * 100;
      setProgressToNext(Math.min(progress, 100));
    } else {
      setProgressToNext(100);
    }
  }, [profile.progress.totalScore]);

  const currentLevelData = progressionLevels[currentLevel - 1];
  const nextLevelData = progressionLevels[nextLevel - 1];

  return (
    <Card className="cozy-card cozy-glow bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
          <Trophy className="w-5 h-5" />
          Your Journey Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Level */}
        <div className="text-center space-y-2">
          <div className="text-4xl">{currentLevelData.icon}</div>
          <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200">
            Level {currentLevel}: {currentLevelData.title}
          </h3>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            {currentLevelData.description}
          </p>
        </div>

        {/* Progress to Next Level */}
        {nextLevel <= progressionLevels.length && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-emerald-600 dark:text-emerald-400">
                Progress to {nextLevelData.title}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400">
                {Math.round(progressToNext)}%
              </span>
            </div>
            <Progress value={progressToNext} className="h-2" />
            <p className="text-xs text-emerald-500 dark:text-emerald-500 text-center">
              {nextLevelData.requirement - profile.progress.totalScore} joy points to next level
            </p>
          </div>
        )}

        {/* Current Level Rewards */}
        <div className="space-y-2">
          <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
            <Award className="w-4 h-4" />
            Your Current Abilities
          </h4>
          <div className="space-y-1">
            {currentLevelData.rewards.map((reward, index) => (
              <Badge key={index} variant="outline" className="mr-1 mb-1 text-xs">
                ✓ {reward}
              </Badge>
            ))}
          </div>
        </div>

        {/* Next Level Preview */}
        {nextLevel <= progressionLevels.length && (
          <div className="space-y-2 p-3 bg-emerald-50 dark:bg-emerald-950/50 rounded-lg">
            <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
              <Star className="w-4 h-4" />
              Next Level Rewards
            </h4>
            <div className="space-y-1">
              {nextLevelData.rewards.map((reward, index) => (
                <Badge key={index} variant="secondary" className="mr-1 mb-1 text-xs opacity-75">
                  {reward}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 pt-2 border-t border-emerald-200 dark:border-emerald-800">
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
              {profile.progress.totalSessions}
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400">Adventures</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
              {profile.progress.totalScore}
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400">Joy Points</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
              {profile.progress.currentStreak}
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400">Day Streak</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressionSystem;
