
import { useState, useEffect } from 'react';
import { ThreatLevel } from '../utils/logGenerator';
import { generateExpandedLog } from '../utils/expandedLogScenarios';
import { useSoundFeedback } from './useSoundFeedback';
import { useDailyChallenges } from './useDailyChallenges';
import { useAdaptiveDifficulty } from './useAdaptiveDifficulty';
import { UserMode } from '../types/userTypes';
import { GameData } from '../pages/Index';

interface LogEntry {
  timestamp: string;
  sourceIP: string;
  eventType: string;
  user: string;
  location: string;
  status: string;
  details: string;
  threatLevel: ThreatLevel;
  explanation: string;
  category?: string;
  difficulty?: string;
  learningTip?: string;
}

export const useGameLogic = (
  userMode: UserMode,
  onEndGame: (gameData: GameData) => void
) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [currentLog, setCurrentLog] = useState<LogEntry | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showNextRound, setShowNextRound] = useState(false);
  const [gameStartTime] = useState(Date.now());
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isProMode] = useState(userMode === 'career-pro');
  const [correctByCategory, setCorrectByCategory] = useState<Record<string, number>>({});

  const { playCorrectSound, playIncorrectSound, cleanup } = useSoundFeedback();
  const { todaysChallenge, updateChallengeProgress } = useDailyChallenges();
  const { calculateOptimalDifficulty, updateMetrics, getEncouragementMessage } = useAdaptiveDifficulty();
  const totalRounds = 10;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - gameStartTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStartTime]);

  useEffect(() => {
    generateNewLog();
    return cleanup;
  }, [cleanup]);

  const generateNewLog = () => {
    // Use adaptive difficulty or user preference
    const difficulty = calculateOptimalDifficulty();
    const newLog = generateExpandedLog(difficulty);
    setCurrentLog(newLog as LogEntry);
    setFeedback(null);
    setShowNextRound(false);
    setIsCorrect(null);
  };

  const getEnhancedFeedback = (playerChoice: ThreatLevel, log: LogEntry, correct: boolean) => {
    const baseFeedback = correct 
      ? (isProMode 
          ? `Excellent analysis! ${log.explanation}`
          : log.explanation)
      : (isProMode
          ? `Let's review: ${log.explanation}`
          : `That's okay! ${log.explanation}`);
    
    // Add learning tip for educational value
    const learningTip = log.learningTip 
      ? `\n\n💡 Pro tip: ${log.learningTip}`
      : '';
    
    return baseFeedback + learningTip;
  };

  const handleThreatAssessment = (playerChoice: ThreatLevel) => {
    if (!currentLog) return;

    const answerIsCorrect = playerChoice === currentLog.threatLevel;
    let pointsEarned = 0;

    // Enhanced scoring system
    if (answerIsCorrect) {
      playCorrectSound();
      const basePoints = currentLog.threatLevel === 'critical' ? 100 : 
                        currentLog.threatLevel === 'warning' ? 75 : 50;
      
      // Bonus for speed (under 30 seconds)
      const roundTime = timeElapsed - ((currentRound - 1) * 30); // Estimate
      const speedBonus = roundTime < 30 ? Math.floor(basePoints * 0.2) : 0;
      
      pointsEarned = basePoints + speedBonus;
      setCorrectAnswers(prev => prev + 1);
      
      // Track category performance
      if (currentLog.category) {
        setCorrectByCategory(prev => ({
          ...prev,
          [currentLog.category!]: (prev[currentLog.category!] || 0) + 1
        }));
      }
    } else {
      playIncorrectSound();
      pointsEarned = -10; // Smaller penalty to encourage learning
    }

    // Update daily challenge progress with more sophisticated tracking
    if (todaysChallenge && answerIsCorrect) {
      if (todaysChallenge.type === 'accuracy') {
        const currentAccuracy = ((correctAnswers + 1) / currentRound) * 100;
        updateChallengeProgress(todaysChallenge.id, Math.floor(currentAccuracy));
      } else if (todaysChallenge.type === 'category-focus' && currentLog.category) {
        const challengeCategory = todaysChallenge.description.toLowerCase();
        if (challengeCategory.includes(currentLog.category)) {
          updateChallengeProgress(todaysChallenge.id, todaysChallenge.progress + 1);
        }
      } else if (todaysChallenge.type === 'threat-specialist' && currentLog.threatLevel === 'critical') {
        updateChallengeProgress(todaysChallenge.id, todaysChallenge.progress + 1);
      }
    }

    const enhancedFeedback = getEnhancedFeedback(playerChoice, currentLog, answerIsCorrect);
    
    setScore(prev => prev + pointsEarned);
    setFeedback(enhancedFeedback);
    setIsCorrect(answerIsCorrect);
    setShowNextRound(true);

    if (currentRound >= totalRounds) {
      // Update speed challenge if applicable
      if (todaysChallenge && todaysChallenge.type === 'speed' && timeElapsed < todaysChallenge.target) {
        updateChallengeProgress(todaysChallenge.id, todaysChallenge.target);
      }
      
      // Update adaptive difficulty metrics
      const finalAccuracy = ((correctAnswers + (answerIsCorrect ? 1 : 0)) / totalRounds) * 100;
      updateMetrics({
        accuracy: finalAccuracy,
        timeSpent: timeElapsed,
        correctByCategory
      });
      
      setTimeout(() => {
        onEndGame({
          score: score + pointsEarned,
          totalRounds,
          correctAnswers: correctAnswers + (answerIsCorrect ? 1 : 0),
          timeElapsed
        });
      }, 2000);
    }
  };

  const nextRound = () => {
    setCurrentRound(prev => prev + 1);
    generateNewLog();
  };

  return {
    currentRound,
    score,
    correctAnswers,
    timeElapsed,
    currentLog,
    feedback,
    showNextRound,
    isCorrect,
    isProMode,
    totalRounds,
    todaysChallenge,
    encouragementMessage: getEncouragementMessage(),
    handleThreatAssessment,
    nextRound
  };
};
