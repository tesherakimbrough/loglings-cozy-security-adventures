
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TreePine, Star, Shield, Crown, Sparkles } from 'lucide-react';
import { useUserProfile } from '../hooks/useUserProfile';

interface Level {
  level: number;
  title: string;
  description: string;
  requirement: number;
  icon: string;
  rewards: string[];
  color: string;
}

const levels: Level[] = [
  {
    level: 1,
    title: "Seedling Scout",
    description: "Just sprouted in the forest",
    requirement: 0,
    icon: "🌱",
    rewards: ["Pip the Safe Logling", "Basic scenarios"],
    color: "text-green-600"
  },
  {
    level: 2,
    title: "Curious Sprout",
    description: "Growing stronger with each adventure",
    requirement: 150,
    icon: "🌿",
    rewards: ["Luna the Curious Logling", "Intermediate scenarios"],
    color: "text-emerald-600"
  },
  {
    level: 3,
    title: "Vigilant Sapling",
    description: "Developing keen security instincts",
    requirement: 400,
    icon: "🌳",
    rewards: ["Sage the Alert Logling", "Advanced scenarios"],
    color: "text-teal-600"
  },
  {
    level: 4,
    title: "Guardian Tree",
    description: "A protector of the digital forest",
    requirement: 800,
    icon: "🛡️",
    rewards: ["Custom Logling colors", "Expert scenarios"],
    color: "text-blue-600"
  },
  {
    level: 5,
    title: "Ancient Wisdom",
    description: "Master of cybersecurity knowledge",
    requirement: 1500,
    icon: "🧙‍♀️",
    rewards: ["Golden Logling", "Mentor abilities"],
    color: "text-purple-600"
  },
  {
    level: 6,
    title: "Forest Elder",
    description: "Legendary guardian of all Loglings",
    requirement: 2500,
    icon: "👑",
    rewards: ["Crown Logling", "Create custom scenarios"],
    color: "text-yellow-600"
  }
];

const LevelProgressionSystem = () => {
  const { profile } = useUserProfile();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [progressToNext, setProgressToNext] = useState(0);
  const [nextLevel, setNextLevel] = useState<Level | null>(null);

  useEffect(() => {
    const totalScore = profile.progress.totalScore;
    let level = 1;
    
    // Find current level
    for (let i = levels.length - 1; i >= 0; i--) {
      if (totalScore >= levels[i].requirement) {
        level = levels[i].level;
        break;
      }
    }
    
    setCurrentLevel(level);
    
    // Calculate progress to next level
    const next = levels.find(l => l.level === level + 1);
    setNextLevel(next || null);
    
    if (next) {
      const currentReq = levels[level - 1].requirement;
      const nextReq = next.requirement;
      const progress = ((totalScore - currentReq) / (nextReq - currentReq)) * 100;
      setProgressToNext(Math.min(progress, 100));
    } else {
      setProgressToNext(100);
    }
  }, [profile.progress.totalScore]);

  const currentLevelData = levels[currentLevel - 1];

  return (
    <Card className="cozy-card cozy-glow bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300">
          <TreePine className="w-5 h-5" />
          Your Growth Journey
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Level Display */}
        <div className="text-center space-y-3">
          <div className="text-6xl animate-gentle-bounce">{currentLevelData.icon}</div>
          <div>
            <h3 className={`text-2xl font-bold ${currentLevelData.color}`}>
              Level {currentLevel}: {currentLevelData.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {currentLevelData.description}
            </p>
          </div>
        </div>

        {/* Progress to Next Level */}
        {nextLevel && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress to {nextLevel.title}</span>
              <span className="text-sm text-muted-foreground">{Math.round(progressToNext)}%</span>
            </div>
            <Progress value={progressToNext} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{profile.progress.totalScore} Joy Points</span>
              <span>{nextLevel.requirement} needed</span>
            </div>
          </div>
        )}

        {/* Current Abilities */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Your Current Abilities
          </h4>
          <div className="grid gap-2">
            {currentLevelData.rewards.map((reward, index) => (
              <Badge key={index} variant="outline" className="justify-start">
                <Sparkles className="w-3 h-3 mr-1" />
                {reward}
              </Badge>
            ))}
          </div>
        </div>

        {/* Next Level Preview */}
        {nextLevel && (
          <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-semibold flex items-center gap-2">
              <Star className="w-4 h-4" />
              Next Level Rewards
            </h4>
            <div className="grid gap-2">
              {nextLevel.rewards.map((reward, index) => (
                <Badge key={index} variant="secondary" className="justify-start opacity-75">
                  <Crown className="w-3 h-3 mr-1" />
                  {reward}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Level Overview */}
        <div className="grid grid-cols-3 gap-4 pt-3 border-t border-muted">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{profile.progress.totalSessions}</div>
            <div className="text-xs text-muted-foreground">Adventures</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-accent">{profile.progress.totalScore}</div>
            <div className="text-xs text-muted-foreground">Joy Points</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-emerald-600">{profile.progress.currentStreak}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LevelProgressionSystem;
