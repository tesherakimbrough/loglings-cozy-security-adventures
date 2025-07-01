
import React, { useState } from 'react';
import GameIntro from '../components/GameIntro';
import AdvancedGamePlay from '../components/AdvancedGamePlay';
import GameResults from '../components/GameResults';
import ImprovedOnboarding from '../components/ImprovedOnboarding';
import FeedbackCollectionSystem from '../components/FeedbackCollectionSystem';
import GameErrorBoundary from '../components/GameErrorBoundary';
import BetaLaunchBanner from '../components/BetaLaunchBanner';
import { ResponsiveWrapper } from '../components/ResponsiveWrapper';
import { UserMode } from '../types/userTypes';
import { useUserProfile } from '../hooks/useUserProfile';
import { useMobileOptimization } from '../hooks/useMobileOptimization';
import { useI18n } from '../hooks/useI18n';

export interface GameData {
  score: number;
  accuracy: number;
  timeElapsed: number;
  correctAnswers: number;
  totalQuestions: number;
  totalRounds: number;
  difficulty: string;
}

type GameState = 'intro' | 'playing' | 'results';

const Index = () => {
  const { t } = useI18n();
  
  const [gameState, setGameState] = useState<GameState>('intro');
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [userMode, setUserMode] = useState<UserMode>('cozy-everyday');
  const [showFeedback, setShowFeedback] = useState(false);
  const { profile } = useUserProfile();
  const { shouldUseCompactLayout } = useMobileOptimization();

  const handleStartGame = (mode: UserMode) => {
    setUserMode(mode);
    setGameState('playing');
  };

  const handleEndGame = (data: GameData) => {
    setGameData(data);
    setGameState('results');
  };

  const handlePlayAgain = () => {
    setGameData(null);
    setGameState('intro');
  };

  const handleBackToHome = () => {
    // Save any current progress if needed
    setGameData(null);
    setGameState('intro');
  };

  const handleGameError = (error: Error, errorInfo: any) => {
    console.error('Game error caught by boundary:', error, errorInfo);
    
    // Save current state for recovery
    const recoveryData = {
      gameState,
      userMode,
      gameData,
      timestamp: new Date().toISOString(),
      error: error.message
    };
    localStorage.setItem('loglings-error-recovery', JSON.stringify(recoveryData));
  };

  // Listen for feedback trigger events
  React.useEffect(() => {
    const handleFeedbackEvent = () => {
      setShowFeedback(true);
    };
    
    window.addEventListener('loglings-open-feedback', handleFeedbackEvent);
    return () => window.removeEventListener('loglings-open-feedback', handleFeedbackEvent);
  }, []);

  return (
    <ResponsiveWrapper>
      <div className="w-full bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Global Error Boundary */}
        <GameErrorBoundary onError={handleGameError}>
          {/* Improved Onboarding Tutorial */}
          <ImprovedOnboarding />
          
          {/* Beta Launch Banner */}
          {gameState === 'intro' && (
            <div className={`p-2 md:p-4 ${shouldUseCompactLayout ? 'px-4' : ''}`}>
              <BetaLaunchBanner />
            </div>
          )}
          
          {gameState === 'intro' && (
            <GameIntro onStartGame={handleStartGame} userMode={userMode} />
          )}
          
          {gameState === 'playing' && (
            <GameErrorBoundary onError={handleGameError}>
              <AdvancedGamePlay 
                onEndGame={handleEndGame} 
                onBackToHome={handleBackToHome}
                userMode={userMode} 
              />
            </GameErrorBoundary>
          )}
          
          {gameState === 'results' && gameData && (
            <GameErrorBoundary onError={handleGameError}>
              <div className="p-2 md:p-4 pb-8">
                <GameResults 
                  gameData={gameData} 
                  onRestart={handlePlayAgain}
                  userMode={userMode}
                />
                <FeedbackCollectionSystem
                  trigger="post-session"
                  onSubmit={() => {}}
                  onClose={() => {}}
                />
              </div>
            </GameErrorBoundary>
          )}

          {/* Global Feedback System */}
          {showFeedback && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="w-full max-w-md">
                <FeedbackCollectionSystem
                  trigger="manual"
                  onSubmit={() => setShowFeedback(false)}
                  onClose={() => setShowFeedback(false)}
                />
              </div>
            </div>
          )}
        </GameErrorBoundary>
      </div>
    </ResponsiveWrapper>
  );
};

export default Index;
