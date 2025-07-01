
import { useState, useEffect } from 'react';
import { GameData } from '../types/gameTypes';

export const useGameData = () => {
  const [gameData, setGameData] = useState<GameData>({
    score: 0,
    timeElapsed: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    sessionsPlayed: 0,
    totalQuestions: 0,
    accuracy: 0,
    totalRounds: 0
  });

  const updateGameData = (updates: Partial<GameData>) => {
    setGameData(prev => ({ ...prev, ...updates }));
  };

  const resetGameData = () => {
    setGameData({
      score: 0,
      timeElapsed: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      sessionsPlayed: 0,
      totalQuestions: 0,
      accuracy: 0,
      totalRounds: 0
    });
  };

  return {
    gameData,
    updateGameData,
    resetGameData
  };
};
