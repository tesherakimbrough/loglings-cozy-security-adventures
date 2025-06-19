
import { useState, useEffect } from 'react';
import { ThreatLevel } from '../utils/logGenerator';
import { generateProceduralLog } from '../utils/enhancedLogScenarios';
import { useSoundFeedback } from './useSoundFeedback';
import { useDailyChallenges } from './useDailyChallenges';
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

  const { playCorrectSound, playIncorrectSound, cleanup } = useSoundFeedback();
  const { todaysChallenge, updateChallengeProgress } = useDailyChallenges();
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
    const newLog = generateProceduralLog();
    setCurrentLog(newLog as LogEntry);
    setFeedback(null);
    setShowNextRound(false);
    setIsCorrect(null);
  };

  const getEnhancedFeedback = (playerChoice: ThreatLevel, log: LogEntry, correct: boolean) => {
    if (correct) {
      if (isProMode) {
        const proMessages = {
          'safe': `Excellent analysis! This appears to be normal user behavior - ${log.explanation}`,
          'warning': `Good catch! Your threat detection skills identified this anomaly correctly - ${log.explanation}`,
          'critical': `Outstanding incident response! You correctly escalated this critical threat - ${log.explanation}`
        };
        return proMessages[log.threatLevel];
      } else {
        const cozyMessages = {
          'safe': `Perfect! Pip the Safe Logling is so happy! 🌸 ${log.explanation}`,
          'warning': `Wonderful! Luna the Curious Logling thanks you for noticing! ✨ ${log.explanation}`,
          'critical': `Excellent! Sage the Alert Logling is proud of your quick thinking! 🌿 ${log.explanation}`
        };
        return cozyMessages[log.threatLevel];
      }
    } else {
      if (isProMode) {
        const correctAction = {
          'safe': 'normal activity',
          'warning': 'suspicious behavior requiring investigation',
          'critical': 'a critical security incident'
        }[log.threatLevel];
        return `Let's review this together. This was actually ${correctAction}. ${log.explanation} Keep practicing - each scenario builds your expertise!`;
      } else {
        return `That's okay, dear friend! Every step teaches us something beautiful. 💙 ${log.explanation}`;
      }
    }
  };

  const handleThreatAssessment = (playerChoice: ThreatLevel) => {
    if (!currentLog) return;

    const answerIsCorrect = playerChoice === currentLog.threatLevel;
    let pointsEarned = 0;

    // Play sound feedback
    if (answerIsCorrect) {
      playCorrectSound();
      pointsEarned = currentLog.threatLevel === 'critical' ? 100 : 
                    currentLog.threatLevel === 'warning' ? 75 : 50;
      setCorrectAnswers(prev => prev + 1);
    } else {
      playIncorrectSound();
      pointsEarned = -25;
    }

    // Update daily challenge progress
    if (todaysChallenge && answerIsCorrect) {
      if (todaysChallenge.type === 'accuracy') {
        updateChallengeProgress(todaysChallenge.id, correctAnswers + 1);
      } else if (todaysChallenge.type === 'category-focus' && currentLog.category) {
        const challengeCategory = todaysChallenge.description.toLowerCase();
        if (challengeCategory.includes(currentLog.category)) {
          updateChallengeProgress(todaysChallenge.id, todaysChallenge.progress + 1);
        }
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
    handleThreatAssessment,
    nextRound
  };
};
