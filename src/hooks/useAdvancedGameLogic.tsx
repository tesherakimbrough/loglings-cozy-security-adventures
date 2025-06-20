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
      console.log('Generating new scenario with difficulty:', difficulty);
      console.log('Used scenario IDs:', usedScenarioIds.length);
      
      // Reset used scenarios if we've used too many (prevents getting stuck)
      let currentUsedIds = usedScenarioIds;
      if (usedScenarioIds.length > 15) {
        console.log('Resetting used scenarios to prevent exhaustion');
        currentUsedIds = [];
        setUsedScenarioIds([]);
      }
      
      let attempts = 0;
      let newScenario = null;
      
      // Try to generate a unique scenario, with fallback logic
      while (attempts < 5) {
        try {
          newScenario = generateContextualScenario(difficulty, currentUsedIds);
          
          if (newScenario && newScenario.id && !currentUsedIds.includes(newScenario.id)) {
            break; // Found a valid, unused scenario
          } else if (newScenario && newScenario.id) {
            // If we got a used scenario, allow it if we've tried multiple times
            if (attempts >= 3) {
              console.log('Allowing repeated scenario after multiple attempts');
              break;
            }
          }
        } catch (generationError) {
          console.error('Scenario generation attempt failed:', generationError);
        }
        
        attempts++;
      }
      
      // Final fallback if all attempts failed
      if (!newScenario || !newScenario.id) {
        console.log('All generation attempts failed, creating emergency fallback');
        newScenario = {
          id: `emergency-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          category: 'authentication',
          threatLevel: 'safe',
          difficulty: 'beginner',
          timestamp: new Date().toISOString(),
          sourceIP: '192.168.1.100',
          eventType: 'Normal Login',
          user: 'user@company.com',
          location: 'Office',
          status: 'SUCCESS',
          details: 'User logged in normally during business hours from their usual location.',
          explanation: 'This appears to be normal authentication activity from a trusted location.',
          learningTip: 'Normal logins should happen during expected hours from known locations.',
          nextSteps: 'Continue monitoring for any unusual patterns.',
          realWorldContext: 'Regular authentication patterns help establish baselines for detecting anomalies.'
        };
      }
      
      console.log('Generated scenario:', newScenario.id);
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
      
      // Ultimate fallback scenario that should always work
      const ultimateFallback: AdvancedScenario = {
        id: `fallback-${Date.now()}`,
        category: 'authentication',
        threatLevel: 'safe',
        difficulty: 'beginner',
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.100',
        eventType: 'Normal Login',
        user: 'user@company.com',
        location: 'Office',
        status: 'SUCCESS',
        details: 'User logged in normally during business hours from their usual location.',
        explanation: 'This appears to be normal authentication activity from a trusted location.',
        learningTip: 'Normal logins should happen during expected hours from known locations.',
        nextSteps: 'Continue monitoring for any unusual patterns.',
        realWorldContext: 'Regular authentication patterns help establish baselines for detecting anomalies.'
      };
      
      setCurrentScenario(ultimateFallback);
      setUsedScenarioIds(prev => [...prev, ultimateFallback.id]);
    }
  }, [difficulty, usedScenarioIds, logError, currentRound, totalRounds]);

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
    if (!scenario) return 'Something went wrong, but great job trying!';
    
    let feedback = correct ? scenario.explanation : 
      `${scenario.explanation}\n\n💡 Learning insight: ${scenario.learningTip || 'Keep practicing!'}`;
    
    feedback += `\n\n🔍 Next steps: ${scenario.nextSteps || 'Continue learning!'}`;
    feedback += `\n\n🌍 Real-world context: ${scenario.realWorldContext || 'Every scenario teaches us something valuable.'}`;
    
    return feedback;
  };

  const handleThreatAssessment = useCallback((playerChoice: string) => {
    if (!currentScenario) {
      console.error('No current scenario available');
      return;
    }

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
