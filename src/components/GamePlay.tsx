
import GameHeader from './GameHeader';
import LogAnalysisCard from './LogAnalysisCard';
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
    handleThreatAssessment,
    nextRound
  } = useGameLogic(userMode, onEndGame);

  if (!currentLog) return <div>Loading our cozy adventure...</div>;

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
