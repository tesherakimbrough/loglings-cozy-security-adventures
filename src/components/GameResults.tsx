
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Clock, TrendingUp, Star, Award } from 'lucide-react';
import ConfettiCelebration from './ConfettiCelebration';
import EnhancedSocialSharing from './EnhancedSocialSharing';
import { GameData } from '../pages/Index';
import { UserMode } from '../types/userTypes';
import { useSupabaseGameData } from '../hooks/useSupabaseGameData';
import { useI18n } from '../hooks/useI18n';

interface GameResultsProps {
  gameData: GameData;
  onRestart: () => void;
  userMode: UserMode;
}

const GameResults = ({ gameData, onRestart, userMode }: GameResultsProps) => {
  const { t } = useI18n();
  const { saveGameSession, updateUserProgress, getGameStatistics } = useSupabaseGameData();
  const stats = getGameStatistics();

  useEffect(() => {
    // Save game data when component mounts
    saveGameSession(gameData);
    updateUserProgress(gameData);
  }, [gameData]);

  const getPerformanceLevel = (accuracy: number) => {
    if (accuracy >= 90) return { level: t.exceptional, color: 'text-yellow-600', icon: Trophy };
    if (accuracy >= 80) return { level: t.excellent, color: 'text-purple-600', icon: Star };
    if (accuracy >= 70) return { level: t.great, color: 'text-blue-600', icon: Award };
    if (accuracy >= 60) return { level: t.good, color: 'text-green-600', icon: Target };
    return { level: t.learning, color: 'text-orange-600', icon: TrendingUp };
  };

  const performance = getPerformanceLevel(gameData.accuracy);
  const PerformanceIcon = performance.icon;

  const getEncouragementMessage = () => {
    if (gameData.accuracy >= 90) {
      return t.outstandingMessage;
    } else if (gameData.accuracy >= 80) {
      return t.excellentWorkMessage;
    } else if (gameData.accuracy >= 70) {
      return t.greatJobMessage;
    } else if (gameData.accuracy >= 60) {
      return t.goodProgressMessage;
    } else {
      return t.everyExpertMessage;
    }
  };

  const getImprovementTip = () => {
    if (gameData.accuracy < 70) {
      return t.improvementTip1;
    } else if (gameData.accuracy < 85) {
      return t.improvementTip2;
    } else {
      return t.improvementTip3;
    }
  };

  return (
    <div className="space-y-6">
      <ConfettiCelebration isActive={gameData.accuracy >= 80} />
      
      <Card className="cozy-card cozy-glow text-center">
        <CardHeader>
          <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-gentle-bounce">
            <PerformanceIcon className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-3xl cozy-heading">
            {t.adventureComplete}
          </CardTitle>
          <p className="text-muted-foreground">
            {getEncouragementMessage()}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Performance Badge */}
          <div className="flex justify-center">
            <Badge variant="outline" className={`text-lg px-4 py-2 ${performance.color} border-current`}>
              {performance.level} {t.performance}
            </Badge>
          </div>

          {/* Main Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">{gameData.score}</div>
              <div className="text-sm text-muted-foreground">{t.joyPoints}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-1">
                {Math.round(gameData.accuracy)}%
              </div>
              <div className="text-sm text-muted-foreground">{t.accuracy}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {gameData.correctAnswers}/{gameData.totalQuestions}
              </div>
              <div className="text-sm text-muted-foreground">{t.correct}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {Math.floor(gameData.timeElapsed / 60)}m {gameData.timeElapsed % 60}s
              </div>
              <div className="text-sm text-muted-foreground">{t.time}</div>
            </div>
          </div>

          {/* Progress Comparison */}
          {stats.totalGames > 1 && (
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                {t.progressJourney}
              </h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-bold text-lg">{stats.totalGames}</div>
                  <div className="text-muted-foreground">{t.totalAdventures}</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-lg">{stats.averageScore}</div>
                  <div className="text-muted-foreground">{t.avgScore}</div>
                </div>
                <div className="text-center">
                  <div className={`font-bold text-lg ${
                    stats.improvementTrend === 'improving' ? 'text-green-600' : 
                    stats.improvementTrend === 'declining' ? 'text-orange-600' : 'text-blue-600'
                  }`}>
                    {stats.improvementTrend === 'improving' ? '📈' : 
                     stats.improvementTrend === 'declining' ? '📉' : '➡️'}
                  </div>
                  <div className="text-muted-foreground">{t.trend}</div>
                </div>
              </div>
            </div>
          )}

          {/* Improvement Tip */}
          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-left">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              🎯 {t.nextGrowthStep}
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {getImprovementTip()}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={onRestart}
              className="flex-1 logling-button"
              size="lg"
            >
              {t.continueJourney}
            </Button>
            <EnhancedSocialSharing 
              gameData={gameData}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameResults;
