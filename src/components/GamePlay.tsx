import GameHeader from './GameHeader';
import LogAnalysisCard from './LogAnalysisCard';
import LevelProgressionSystem from './LevelProgressionSystem';
import { ResponsiveWrapper } from './ResponsiveWrapper';
import { GameData } from '../types/gameTypes';
import { UserMode } from '../types/userTypes';
import { useEnhancedGameLogic } from '../hooks/useEnhancedGameLogic';
import { useMobileOptimization } from '../hooks/useMobileOptimization';
import { useI18n } from '../hooks/useI18n';

interface GamePlayProps {
  onEndGame: (gameData: GameData) => void;
  userMode?: UserMode;
}

const GamePlay = ({ onEndGame, userMode = 'cozy-everyday' }: GamePlayProps) => {
  const { t } = useI18n();
  const { shouldUseCompactLayout } = useMobileOptimization();
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 md:w-12 md:h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm md:text-base text-muted-foreground">Preparing enhanced adventure...</p>
      </div>
    </div>
  );

  return (
    <ResponsiveWrapper>
      <div className="min-h-screen p-2 md:p-4">
        <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
          <GameHeader
            todaysChallenge={todaysChallenge}
            currentRound={currentRound}
            totalRounds={totalRounds}
            score={score}
            timeElapsed={timeElapsed}
          />

          <div className={`grid grid-cols-1 ${shouldUseCompactLayout ? 'lg:grid-cols-1 gap-4' : 'lg:grid-cols-3 gap-6'}`}>
            <div className={shouldUseCompactLayout ? 'order-1' : 'lg:col-span-2'}>
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
            
            <div className={`space-y-4 md:space-y-6 ${shouldUseCompactLayout ? 'order-2' : ''}`}>
              <LevelProgressionSystem />
              
              {/* Enhanced Stats Panel - Mobile Optimized */}
              <div className="cozy-card p-3 md:p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
                <h3 className="font-semibold text-sm md:text-base mb-3">Session Stats</h3>
                <div className="grid grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm">
                  <div className="text-center md:text-left">
                    <div className="text-lg md:text-xl font-bold text-blue-600">{scenariosPlayed}</div>
                    <div className="text-muted-foreground text-xs">Unique Scenarios</div>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="text-lg md:text-xl font-bold text-purple-600">
                      {Object.keys(correctByCategory).length}
                    </div>
                    <div className="text-muted-foreground text-xs">Categories Mastered</div>
                  </div>
                </div>
              </div>
              
              {/* Encouragement Message - Mobile Optimized */}
              {encouragementMessage && (
                <div className="cozy-card p-3 md:p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30">
                  <p className="text-xs md:text-sm text-center text-green-700 dark:text-green-300">
                    {encouragementMessage}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Progress Garden - Mobile Optimized */}
          <div className="space-y-2">
            <p className="text-xs md:text-sm text-muted-foreground text-center px-2">
              Security Journey 🌱 ({currentRound}/{totalRounds})
            </p>
            <div className="w-full bg-muted/50 rounded-full h-2 md:h-3 overflow-hidden mx-auto max-w-md md:max-w-full">
              <div 
                className="forest-gradient h-2 md:h-3 rounded-full transition-all duration-500 relative"
                style={{ width: `${(currentRound / totalRounds) * 100}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground px-2">
              <span>Started</span>
              <span>Expert! 🛡️</span>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveWrapper>
  );
};

export default GamePlay;
