
import GameHeader from './GameHeader';
import LogAnalysisCard from './LogAnalysisCard';
import ProgressionSystem from './ProgressionSystem';
import { GameData } from '../pages/Index';
import { UserMode } from '../types/userTypes';
import { useGameLogic } from '../hooks/useGameLogic';

interface GamePlayProps {
  onEndGame: (gameData: GameData) => void;
  userMode?: UserMode;
}

const GamePlay = ({ onEndGame, userMode = 'cozy-everyday' }: GamePlayProps) => {
  const {
    currentRound,
    score,
    timeElapsed,
    currentLog,
    feedback,
    showNextRound,
    isCorrect,
    isProMode,
    totalRounds,
    todaysChallenge,
    encouragementMessage,
    handleThreatAssessment,
    nextRound
  } = useGameLogic(userMode, onEndGame);

  if (!currentLog) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-muted-foreground">Preparing your cozy adventure...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <GameHeader
          todaysChallenge={todaysChallenge}
          currentRound={currentRound}
          totalRounds={totalRounds}
          score={score}
          timeElapsed={timeElapsed}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LogAnalysisCard
              currentLog={currentLog}
              currentRound={currentRound}
              totalRounds={totalRounds}
              feedback={feedback}
              isCorrect={isCorrect}
              showNextRound={showNextRound}
              isProMode={isProMode}
              onThreatAssessment={handleThreatAssessment}
              onNextRound={nextRound}
            />
          </div>
          
          <div className="space-y-6">
            <ProgressionSystem />
            
            {/* Encouragement Message */}
            {encouragementMessage && (
              <div className="cozy-card p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
                <p className="text-sm text-center text-blue-700 dark:text-blue-300">
                  {encouragementMessage}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Progress Garden */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground text-center">Your Adventure Progress 🌱</p>
          <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
            <div 
              className="forest-gradient h-3 rounded-full transition-all duration-500 relative"
              style={{ width: `${(currentRound / totalRounds) * 100}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlay;
