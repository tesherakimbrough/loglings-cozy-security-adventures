
import { useState } from 'react';
import GameIntro from '../components/GameIntro';
import GamePlay from '../components/GamePlay';
import GameResults from '../components/GameResults';

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

  return (
    <div className="min-h-screen bg-background">
      {gameState === 'intro' && <GameIntro onStartGame={startGame} />}
      {gameState === 'playing' && <GamePlay onEndGame={endGame} />}
      {gameState === 'results' && <GameResults gameData={gameData} onRestart={resetGame} />}
    </div>
  );
};

export default Index;
