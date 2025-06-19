
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DailyChallenge } from '../hooks/useDailyChallenges';

interface DailyChallengeCardProps {
  challenge: DailyChallenge | null;
  streakCount: number;
}

const DailyChallengeCard = ({ challenge, streakCount }: DailyChallengeCardProps) => {
  if (!challenge) return null;

  const progressPercentage = (challenge.progress / challenge.target) * 100;

  return (
    <Card className="cozy-card cozy-glow bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
            <span className="text-2xl">{challenge.emoji}</span>
            Daily Challenge
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-amber-600 border-amber-300">
              +{challenge.reward.joyPoints} Joy
            </Badge>
            {challenge.completed && (
              <Badge className="bg-green-600 text-white">
                Complete!
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-amber-800 dark:text-amber-200">
            {challenge.title}
          </h3>
          <p className="text-sm text-amber-700 dark:text-amber-300">
            {challenge.description}
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-amber-600 dark:text-amber-400">Progress</span>
            <span className="text-amber-600 dark:text-amber-400">
              {challenge.progress}/{challenge.target}
            </span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-2"
          />
        </div>

        {streakCount > 0 && (
          <div className="flex items-center gap-2 pt-2 border-t border-amber-200 dark:border-amber-800">
            <span className="text-lg">🔥</span>
            <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
              {streakCount} day streak!
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyChallengeCard;
