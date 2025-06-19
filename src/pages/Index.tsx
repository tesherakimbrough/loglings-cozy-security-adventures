
import { useState, useEffect } from 'react';
import GameIntro from '../components/GameIntro';
import GamePlay from '../components/GamePlay';
import GameResults from '../components/GameResults';
import MusicControlBar from '../components/MusicControlBar';
import OnboardingModal from '../components/OnboardingModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';
import { useUserProfile } from '../hooks/useUserProfile';
import { useAnalytics } from '../hooks/useAnalytics';
import { useMobileOptimization } from '../hooks/useMobileOptimization';
import { useSession } from '../hooks/useSession';

export type GameState = 'intro' | 'playing' | 'results';

export interface GameData {
  score: number;
  totalRounds: number;
  correctAnswers: number;
  timeElapsed: number;
}

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [gameData, setGameData] = useState<GameData>({
    score: 0,
    totalRounds: 0,
    correctAnswers: 0,
    timeElapsed: 0
  });

  const { profile, isLoading, selectMode, needsOnboarding } = useUserProfile();
  const { trackGameStart, trackGameComplete } = useAnalytics();
  const { getMobileClasses, shouldShowMobileWarning } = useMobileOptimization();
  const { trackGameSession } = useSession();

  useEffect(() => {
    // Add mobile CSS classes to body
    document.body.className = getMobileClasses();
    
    return () => {
      document.body.className = '';
    };
  }, [getMobileClasses]);

  const startGame = () => {
    setGameState('playing');
    setGameData({
      score: 0,
      totalRounds: 0,
      correctAnswers: 0,
      timeElapsed: 0
    });
    
    trackGameStart(profile.mode);
    trackGameSession();
  };

  const endGame = (finalData: GameData) => {
    setGameData(finalData);
    setGameState('results');
    
    const accuracy = (finalData.correctAnswers / finalData.totalRounds) * 100;
    trackGameComplete(finalData.score, accuracy);
  };

  const resetGame = () => {
    setGameState('intro');
  };

  // Show loading while profile loads
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner 
          size="lg" 
          message="Loading your cozy adventure..." 
          className="space-y-4"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile orientation warning */}
      {shouldShowMobileWarning && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-100 border-b border-yellow-300 p-2 text-center text-sm text-yellow-800 z-50">
          For the best experience, please rotate your device to portrait mode
        </div>
      )}

      {/* Onboarding Modal */}
      <ErrorBoundary fallback={<div>Error loading onboarding</div>}>
        <OnboardingModal 
          isOpen={needsOnboarding}
          onSelectMode={selectMode}
        />
      </ErrorBoundary>

      {/* Main Game Content */}
      <ErrorBoundary>
        {gameState === 'intro' && <GameIntro onStartGame={startGame} userMode={profile.mode} />}
        {gameState === 'playing' && <GamePlay onEndGame={endGame} userMode={profile.mode} />}
        {gameState === 'results' && <GameResults gameData={gameData} onRestart={resetGame} userMode={profile.mode} />}
      </ErrorBoundary>
      
      {/* Music control bar available throughout the app */}
      <ErrorBoundary fallback={null}>
        <MusicControlBar />
      </ErrorBoundary>
    </div>
  );
};

export default Index;
