
import { useState } from 'react';
import GameIntro from '../components/GameIntro';
import GamePlay from '../components/GamePlay';
import GameResults from '../components/GameResults';
import MusicControlBar from '../components/MusicControlBar';
import OnboardingModal from '../components/OnboardingModal';
import { useUserProfile } from '../hooks/useUserProfile';

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

  const startGame = () => {
    setGameState('playing');
    setGameData({
      score: 0,
      totalRounds: 0,
      correctAnswers: 0,
      timeElapsed: 0
    });
  };

  const endGame = (finalData: GameData) => {
    setGameData(finalData);
    setGameState('results');
  };

  const resetGame = () => {
    setGameState('intro');
  };

  // Show loading while profile loads
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading your cozy adventure...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Onboarding Modal */}
      <OnboardingModal 
        isOpen={needsOnboarding}
        onSelectMode={selectMode}
      />

      {/* Main Game Content */}
      {gameState === 'intro' && <GameIntro onStartGame={startGame} userMode={profile.mode} />}
      {gameState === 'playing' && <GamePlay onEndGame={endGame} userMode={profile.mode} />}
      {gameState === 'results' && <GameResults gameData={gameData} onRestart={resetGame} userMode={profile.mode} />}
      
      {/* Music control bar available throughout the app */}
      <MusicControlBar />
    </div>
  );
};

export default Index;
