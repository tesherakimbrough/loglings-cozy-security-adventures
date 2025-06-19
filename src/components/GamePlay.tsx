
import GameHeader from './GameHeader';
import LogAnalysisCard from './LogAnalysisCard';
import LevelProgressionSystem from './LevelProgressionSystem';
import { GameData } from '../pages/Index';
import { UserMode } from '../types/userTypes';
import { useEnhancedGameLogic } from '../hooks/useEnhancedGameLogic';

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
    correctByCategory,
    scenariosPlayed,
    handleThreatAssessment,
    nextRound
  } = useEnhancedGameLogic(userMode, onEndGame);

  if (!currentLog) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-muted-foreground">Preparing your enhanced adventure...</p>
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
            <LevelProgressionSystem />
            
            {/* Enhanced Stats Panel */}
            <div className="cozy-card p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
              <h3 className="font-semibold text-sm mb-3">Session Stats</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="text-lg font-bold text-blue-600">{scenariosPlayed}</div>
                  <div className="text-muted-foreground">Unique Scenarios</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-600">
                    {Object.keys(correctByCategory).length}
                  </div>
                  <div className="text-muted-foreground">Categories Mastered</div>
                </div>
              </div>
            </div>
            
            {/* Encouragement Message */}
            {encouragementMessage && (
              <div className="cozy-card p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30">
                <p className="text-sm text-center text-green-700 dark:text-green-300">
                  {encouragementMessage}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Progress Garden */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground text-center">
            Your Security Journey 🌱 ({currentRound}/{totalRounds})
          </p>
          <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
            <div 
              className="forest-gradient h-3 rounded-full transition-all duration-500 relative"
              style={{ width: `${(currentRound / totalRounds) * 100}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Started your journey</span>
            <span>Security Expert! 🛡️</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlay;
