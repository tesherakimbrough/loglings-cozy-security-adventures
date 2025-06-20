
import { useState, useEffect } from 'react';
import { Calendar, Gift, Star, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '../hooks/useI18n';

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Seedling' | 'Sapling' | 'Ancient Tree';
  reward: string;
  completed: boolean;
  expiresAt: string;
}

interface DailyChallengeProps {
  onStartAdventure?: () => void;
}

const DailyChallenge = ({ onStartAdventure }: DailyChallengeProps) => {
  const { t } = useI18n();
  const [todaysChallenge, setTodaysChallenge] = useState<DailyChallenge | null>(null);
  const [timeUntilNext, setTimeUntilNext] = useState<string>('');

  useEffect(() => {
    generateTodaysChallenge();
    const timer = setInterval(updateTimeUntilNext, 1000);
    return () => clearInterval(timer);
  }, []);

  const generateTodaysChallenge = () => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem(`loglings-daily-${today}`);
    
    if (saved) {
      setTodaysChallenge(JSON.parse(saved));
      return;
    }

    const challenges = [
      {
        id: 'perfect-harmony',
        title: t.perfectHarmony,
        description: t.perfectHarmonyDesc,
        difficulty: 'Ancient Tree' as const,
        reward: 'Golden Logling Badge',
        completed: false,
        expiresAt: getEndOfDay()
      },
      {
        id: 'quick-explorer',
        title: t.quickExplorer,
        description: t.quickExplorerDesc,
        difficulty: 'Sapling' as const,
        reward: 'Sparkle Collection',
        completed: false,
        expiresAt: getEndOfDay()
      },
      {
        id: 'gentle-helper',
        title: t.gentleHelper,
        description: t.gentleHelperDesc,
        difficulty: 'Seedling' as const,
        reward: 'Cozy Garden Decoration',
        completed: false,
        expiresAt: getEndOfDay()
      },
      {
        id: 'curious-mind',
        title: t.curiousMind,
        description: t.curiousMindDesc,
        difficulty: 'Sapling' as const,
        reward: 'Mystery Logling Friend',
        completed: false,
        expiresAt: getEndOfDay()
      },
      {
        id: 'wise-guardian',
        title: t.wiseGuardian,
        description: t.wiseGuardianDesc,
        difficulty: 'Ancient Tree' as const,
        reward: 'Ancient Wisdom Scroll',
        completed: false,
        expiresAt: getEndOfDay()
      }
    ];

    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    localStorage.setItem(`loglings-daily-${today}`, JSON.stringify(randomChallenge));
    setTodaysChallenge(randomChallenge);
  };

  const getEndOfDay = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow.toISOString();
  };

  const updateTimeUntilNext = () => {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    setTimeUntilNext(`${hours}h ${minutes}m`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Seedling': return 'text-green-600 bg-green-100 border-green-300';
      case 'Sapling': return 'text-amber-600 bg-amber-100 border-amber-300';
      case 'Ancient Tree': return 'text-purple-600 bg-purple-100 border-purple-300';
      default: return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };

  const getDifficultyName = (difficulty: string) => {
    switch (difficulty) {
      case 'Seedling': return t.seedling;
      case 'Sapling': return t.sapling;
      case 'Ancient Tree': return t.ancientTree;
      default: return difficulty;
    }
  };

  const handleStartAdventure = () => {
    if (onStartAdventure) {
      onStartAdventure();
    }
  };

  if (!todaysChallenge) return null;

  return (
    <Card className="cozy-card cozy-glow candlelit-warmth">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Calendar className="w-5 h-5 animate-gentle-float" />
          {t.todaysChallenge}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="font-semibold text-lg">{todaysChallenge.title}</h3>
              <p className="text-sm text-muted-foreground">{todaysChallenge.description}</p>
            </div>
            <Badge className={`text-xs ${getDifficultyColor(todaysChallenge.difficulty)}`}>
              {getDifficultyName(todaysChallenge.difficulty)}
            </Badge>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-accent">
              <Gift className="w-4 h-4" />
              <span>{todaysChallenge.reward}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Timer className="w-4 h-4" />
              <span>{timeUntilNext} {t.untilNext}</span>
            </div>
          </div>
        </div>

        {todaysChallenge.completed ? (
          <div className="text-center py-6 space-y-2">
            <div className="text-4xl">🎉</div>
            <div className="font-semibold text-primary">{t.challengeComplete}</div>
            <div className="text-sm text-muted-foreground">
              You've earned: {todaysChallenge.reward}
            </div>
          </div>
        ) : (
          <Button className="w-full logling-button" onClick={handleStartAdventure}>
            <Star className="w-4 h-4 mr-2" />
            {t.startTodaysAdventure}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyChallenge;
