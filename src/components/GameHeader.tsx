
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DailyChallenge } from '../hooks/useDailyChallenges';
import GameStats from './GameStats';

interface GameHeaderProps {
  todaysChallenge: DailyChallenge | null;
  currentRound: number;
  totalRounds: number;
  score: number;
  timeElapsed: number;
}

const GameHeader = ({ 
  todaysChallenge, 
  currentRound, 
  totalRounds, 
  score, 
  timeElapsed 
}: GameHeaderProps) => {
  return (
    <div className="space-y-6">
      {/* Daily Challenge Banner */}
      {todaysChallenge && !todaysChallenge.completed && (
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{todaysChallenge.emoji}</span>
              <div className="flex-1">
                <div className="font-semibold text-amber-700 dark:text-amber-300">
                  Daily Challenge: {todaysChallenge.title}
                </div>
                <div className="text-sm text-amber-600 dark:text-amber-400">
                  {todaysChallenge.description} ({todaysChallenge.progress}/{todaysChallenge.target})
                </div>
              </div>
              <Badge variant="outline" className="text-amber-600 border-amber-300">
                +{todaysChallenge.reward.joyPoints} Joy
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Header Stats */}
      <GameStats 
        currentRound={currentRound}
        totalRounds={totalRounds}
        score={score}
        timeElapsed={timeElapsed}
      />
    </div>
  );
};

export default GameHeader;
