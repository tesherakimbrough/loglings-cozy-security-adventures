
import { useState, useEffect, useCallback } from 'react';
import { generateContextualScenario, AdvancedScenario } from '../utils/advancedScenarioDatabase';
import { useAudioSystem } from './useAudioSystem';
import { useEnhancedErrorHandling } from './useEnhancedErrorHandling';
import { UserMode } from '../types/userTypes';
import { GameData } from '../pages/Index';

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
  const totalRounds = 20; // Increased for richer experience

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
      const newScenario = generateContextualScenario(difficulty, usedScenarioIds);
      setCurrentScenario(newScenario);
      setUsedScenarioIds(prev => [...prev, newScenario.id]);
      setFeedback(null);
      setShowNextRound(false);
      setIsCorrect(null);
    } catch (error) {
      logError(error as Error, {
        component: 'AdvancedGameLogic',
        action: 'generateScenario',
        additionalData: { difficulty, usedScenarioIds: usedScenarioIds.length }
      }, 'high');
      
      // Fallback scenario
      setCurrentScenario({
        id: 'fallback-001',
        category: 'authentication',
        threatLevel: 'safe',
        difficulty: 'beginner',
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.100',
        eventType: 'Normal Login',
        user: 'user@company.com',
        location: 'Office',
        status: 'SUCCESS',
        details: 'User logged in normally during business hours.',
        explanation: 'This appears to be normal activity.',
        learningTip: 'Look for patterns in user behavior.',
        nextSteps: 'Continue monitoring.',
        realWorldContext: 'Normal authentication is the baseline for security.'
      });
    }
  }, [difficulty, usedScenarioIds, logError]);

  const calculateEnhancedScore = (
    playerChoice: string,
    scenario: AdvancedScenario,
    correct: boolean,
    responseTime: number
  ): number => {
    if (!correct) return -10;

    let basePoints = {
      'beginner': 50,
      'intermediate': 75,
      'advanced': 100
    }[scenario.difficulty];

    // Threat level bonus
    const threatBonus = {
      'safe': 1.0,
      'warning': 1.3,
      'critical': 1.5
    }[scenario.threatLevel];

    basePoints *= threatBonus;

    // Speed bonus (under 30 seconds)
    if (responseTime < 30) {
      basePoints *= 1.5;
    } else if (responseTime < 60) {
      basePoints *= 1.2;
    }

    // Streak bonus
    if (streakCount >= 3) {
      basePoints *= 1.3;
    }

    return Math.floor(basePoints);
  };

  const getEnhancedFeedback = (
    playerChoice: string,
    scenario: AdvancedScenario,
    correct: boolean
  ): string => {
    let feedback = correct ? scenario.explanation : 
      `${scenario.explanation}\n\n💡 Learning insight: ${scenario.learningTip}`;
    
    feedback += `\n\n🔍 Next steps: ${scenario.nextSteps}`;
    feedback += `\n\n🌍 Real-world context: ${scenario.realWorldContext}`;
    
    return feedback;
  };

  const handleThreatAssessment = useCallback((playerChoice: string) => {
    if (!currentScenario) return;

    const responseTime = timeElapsed - ((currentRound - 1) * 45);
    const answerIsCorrect = playerChoice === currentScenario.threatLevel;
    
    try {
      const pointsEarned = calculateEnhancedScore(
        playerChoice, 
        currentScenario, 
        answerIsCorrect, 
        responseTime
      );

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
          onEndGame({
            score: score + pointsEarned,
            accuracy: ((correctAnswers + (answerIsCorrect ? 1 : 0)) / totalRounds) * 100,
            timeElapsed,
            correctAnswers: correctAnswers + (answerIsCorrect ? 1 : 0),
            totalQuestions: totalRounds,
            totalRounds,
            difficulty
          });
        }, 3000);
      }
    } catch (error) {
      logError(error as Error, {
        component: 'AdvancedGameLogic',
        action: 'handleThreatAssessment',
        additionalData: { 
          playerChoice, 
          scenarioId: currentScenario.id,
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
