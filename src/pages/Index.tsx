
import { useState } from 'react';
import GameIntro from '../components/GameIntro';
import AdvancedGamePlay from '../components/AdvancedGamePlay';
import GameResults from '../components/GameResults';
import OnboardingTutorial from '../components/OnboardingTutorial';
import FeedbackCollectionSystem from '../components/FeedbackCollectionSystem';
import { UserMode } from '../types/userTypes';
import { useUserProfile } from '../hooks/useUserProfile';

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
  const [gameState, setGameState] = useState<GameState>('intro');
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [userMode, setUserMode] = useState<UserMode>('cozy-everyday');
  const { profile } = useUserProfile();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Onboarding Tutorial */}
      <OnboardingTutorial />
      
      {gameState === 'intro' && (
        <GameIntro onStartGame={handleStartGame} userMode={userMode} />
      )}
      
      {gameState === 'playing' && (
        <AdvancedGamePlay onEndGame={handleEndGame} userMode={userMode} />
      )}
      
      {gameState === 'results' && gameData && (
        <>
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
        </>
      )}
    </div>
  );
};

export default Index;
