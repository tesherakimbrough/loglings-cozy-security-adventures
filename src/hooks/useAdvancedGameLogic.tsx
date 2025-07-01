import { useState, useEffect, useCallback } from 'react';
import { AdvancedScenario } from '../utils/advancedScenarioDatabase';
import { useAudioSystem } from './useAudioSystem';
import { useEnhancedErrorHandling } from './useEnhancedErrorHandling';
import { UserMode } from '../types/userTypes';
import { GameData } from '../types/gameTypes';
import { 
  generateScenarioWithFallbacks, 
  createUltimateFallbackScenario,
  ScenarioGenerationOptions 
} from '../utils/scenarioGenerator';
import { calculateEnhancedScore, ScoringOptions } from '../utils/gameScoring';
import { getEnhancedFeedback } from '../utils/gameFeedback';

export const useAdvancedGameLogic = (
  userMode: UserMode,
  onEndGame: (gameData: GameData) => void
) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [currentScenario, setCurrentScenario] = useState<AdvancedScenario | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showNextRound, setShowNextRound] = useState(false);
  const [gameStartTime] = useState(Date.now());
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [usedScenarioIds, setUsedScenarioIds] = useState<string[]>([]);
  const [streakCount, setStreakCount] = useState(0);
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const { playSuccessSound, playErrorSound } = useAudioSystem();
  const { logError } = useEnhancedErrorHandling();
  const totalRounds = 20;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - gameStartTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStartTime]);

  useEffect(() => {
    generateNewScenario();
  }, []);

  // Adaptive difficulty based on performance
  useEffect(() => {
    const accuracy = currentRound > 1 ? (correctAnswers / (currentRound - 1)) * 100 : 100;
    
    if (accuracy >= 80 && streakCount >= 3) {
      setDifficulty('advanced');
    } else if (accuracy >= 65 && streakCount >= 2) {
      setDifficulty('intermediate');
    } else {
      setDifficulty('beginner');
    }
  }, [correctAnswers, currentRound, streakCount]);

  const generateNewScenario = useCallback(() => {
    try {
      const options: ScenarioGenerationOptions = {
        difficulty,
        usedScenarioIds,
        currentRound,
        totalRounds
      };

      const newScenario = generateScenarioWithFallbacks(options);
      
      setCurrentScenario(newScenario);
      setUsedScenarioIds(prev => [...prev, newScenario.id]);
      setFeedback(null);
      setShowNextRound(false);
      setIsCorrect(null);
      
    } catch (error) {
      console.error('Critical error in scenario generation:', error);
      logError(error as Error, {
        component: 'AdvancedGameLogic',
        action: 'generateScenario',
        additionalData: { 
          difficulty, 
          usedScenarioIds: usedScenarioIds.length,
          currentRound,
          totalRounds
        }
      }, 'high');
      
      const ultimateFallback = createUltimateFallbackScenario();
      setCurrentScenario(ultimateFallback);
      setUsedScenarioIds(prev => [...prev, ultimateFallback.id]);
    }
  }, [difficulty, usedScenarioIds, logError, currentRound, totalRounds]);

  const handleThreatAssessment = useCallback((playerChoice: string) => {
    if (!currentScenario) {
      console.error('No current scenario available');
      return;
    }

    const responseTime = timeElapsed - ((currentRound - 1) * 45);
    const answerIsCorrect = playerChoice === currentScenario.threatLevel;
    
    try {
      const scoringOptions: ScoringOptions = {
        playerChoice,
        scenario: currentScenario,
        correct: answerIsCorrect,
        responseTime,
        streakCount
      };

      const pointsEarned = calculateEnhancedScore(scoringOptions);

      if (answerIsCorrect) {
        playSuccessSound();
        setCorrectAnswers(prev => prev + 1);
        setStreakCount(prev => prev + 1);
      } else {
        playErrorSound();
        setStreakCount(0);
      }

      const enhancedFeedback = getEnhancedFeedback(
        playerChoice, 
        currentScenario, 
        answerIsCorrect
      );

      setScore(prev => prev + pointsEarned);
      setFeedback(enhancedFeedback);
      setIsCorrect(answerIsCorrect);
      setShowNextRound(true);

      // Save progress locally for error recovery
      const progressData = {
        currentRound,
        score: score + pointsEarned,
        correctAnswers: correctAnswers + (answerIsCorrect ? 1 : 0),
        timeElapsed,
        difficulty,
        streakCount: answerIsCorrect ? streakCount + 1 : 0
      };
      localStorage.setItem('loglings-current-progress', JSON.stringify(progressData));

      if (currentRound >= totalRounds) {
        setTimeout(() => {
          const finalCorrectAnswers = correctAnswers + (answerIsCorrect ? 1 : 0);
          onEndGame({
            score: score + pointsEarned,
            accuracy: (finalCorrectAnswers / totalRounds) * 100,
            timeElapsed,
            correctAnswers: finalCorrectAnswers,
            incorrectAnswers: totalRounds - finalCorrectAnswers,
            totalQuestions: totalRounds,
            totalRounds,
            sessionsPlayed: 1,
            difficulty
          });
        }, 3000);
      }
    } catch (error) {
      console.error('Error in threat assessment:', error);
      logError(error as Error, {
        component: 'AdvancedGameLogic',
        action: 'handleThreatAssessment',
        additionalData: { 
          playerChoice, 
          scenarioId: currentScenario?.id,
          currentRound 
        }
      }, 'high');
    }
  }, [currentScenario, currentRound, score, correctAnswers, timeElapsed, difficulty, streakCount, totalRounds, playSuccessSound, playErrorSound, onEndGame, logError]);

  const nextRound = useCallback(() => {
    setCurrentRound(prev => prev + 1);
    generateNewScenario();
  }, [generateNewScenario]);

  return {
    currentRound,
    score,
    correctAnswers,
    timeElapsed,
    currentScenario,
    feedback,
    showNextRound,
    isCorrect,
    totalRounds,
    difficulty,
    streakCount,
    handleThreatAssessment,
    nextRound
  };
};
