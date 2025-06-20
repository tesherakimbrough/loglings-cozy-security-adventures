
import { Clock, TreePine } from 'lucide-react';
import { useI18n } from '../hooks/useI18n';

interface GameStatsProps {
  currentRound: number;
  totalRounds: number;
  score: number;
  timeElapsed: number;
}

const GameStats = ({ currentRound, totalRounds, score, timeElapsed }: GameStatsProps) => {
  const { t } = useI18n();
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="animate-gentle-float">
          <TreePine className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-primary">{t.gameTitle.split(':')[0]}</h1>
      </div>
      <div className="flex gap-8 text-right">
        <div className="cozy-card px-4 py-2">
          <p className="text-sm text-muted-foreground">Adventure</p>
          <p className="text-lg font-bold text-primary">{currentRound}/{totalRounds}</p>
        </div>
        <div className="cozy-card px-4 py-2">
          <p className="text-sm text-muted-foreground">Joy Collected</p>
          <p className="text-lg font-bold text-accent">{score}</p>
        </div>
        <div className="cozy-card px-4 py-2">
          <p className="text-sm text-muted-foreground">Time Exploring</p>
          <p className="text-lg font-bold flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {formatTime(timeElapsed)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
