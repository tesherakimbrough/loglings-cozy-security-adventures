
import { useState, useEffect } from 'react';
import { ThreatLevel } from '../utils/logGenerator';
import { generateAdvancedScenario } from '../utils/expandedScenarioDatabase';
import { useAudioSystem } from './useAudioSystem';
import { useDailyChallenges } from './useDailyChallenges';
import { useAdaptiveDifficulty } from './useAdaptiveDifficulty';
import { useAnalytics } from './useAnalytics';
import { UserMode } from '../types/userTypes';
import { GameData } from '../types/gameTypes';
import { getBridgeScenario } from '../utils/bridgeScenarios';
import { achievementTracker } from '../utils/enhancedAchievementSystem';

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
  id?: string;
}

export const useEnhancedGameLogic = (
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
  const [scenariosPlayed, setScenariosPlayed] = useState<string[]>([]);

  const { playSuccessSound, playErrorSound } = useAudioSystem();
  const { todaysChallenge, updateChallengeProgress } = useDailyChallenges();
  const { calculateOptimalDifficulty, updateMetrics, getEncouragementMessage } = useAdaptiveDifficulty();
  const { trackThreatAssessment } = useAnalytics();
  const totalRounds = 15; // Increased for more comprehensive gameplay

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - gameStartTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStartTime]);

  useEffect(() => {
    generateNewLog();
  }, []);

  const generateNewLog = () => {
    try {
      let attempts = 0;
      let newLog;
      
      // Enhanced difficulty selection with bridge scenarios
      const accuracy = currentRound > 1 ? (correctAnswers / (currentRound - 1)) * 100 : 100;
      let targetDifficulty = calculateOptimalDifficulty();
      
      // Use bridge scenarios for smoother progression
      if (accuracy >= 70 && accuracy < 85 && targetDifficulty === 'intermediate') {
        // Try bridge scenarios first
        const bridgeScenario = getBridgeScenario('beginner-plus', scenariosPlayed);
        if (bridgeScenario) {
          setCurrentLog(bridgeScenario as LogEntry);
          if (bridgeScenario.id) {
            setScenariosPlayed(prev => [...prev, bridgeScenario.id!]);
          }
          setFeedback(null);
          setShowNextRound(false);
          setIsCorrect(null);
          return;
        }
      } else if (accuracy >= 85 && accuracy < 95 && targetDifficulty === 'advanced') {
        // Try pre-intermediate bridge scenarios
        const bridgeScenario = getBridgeScenario('pre-intermediate', scenariosPlayed);
        if (bridgeScenario) {
          setCurrentLog(bridgeScenario as LogEntry);
          if (bridgeScenario.id) {
            setScenariosPlayed(prev => [...prev, bridgeScenario.id!]);
          }
          setFeedback(null);
          setShowNextRound(false);
          setIsCorrect(null);
          return;
        }
      }
      
      // Try to avoid repeating scenarios
      do {
        newLog = generateAdvancedScenario(targetDifficulty);
        attempts++;
      } while (
        scenariosPlayed.includes(newLog.id || '') && 
        attempts < 10 // Prevent infinite loop
      );
      
      setCurrentLog(newLog as LogEntry);
      if (newLog.id) {
        setScenariosPlayed(prev => [...prev, newLog.id!]);
      }
      
      setFeedback(null);
      setShowNextRound(false);
      setIsCorrect(null);
    } catch (error) {
      console.error('Error generating enhanced scenario:', error);
      // Fallback scenario
      setCurrentLog({
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.100',
        eventType: 'login_attempt',
        user: 'test_user',
        location: 'office',
        status: 'success',
        details: 'Normal login during business hours',
        threatLevel: 'safe',
        explanation: 'This appears to be a normal login attempt during regular business hours.',
        category: 'authentication',
        difficulty: 'beginner'
      });
    }
  };

  const getEnhancedFeedback = (playerChoice: ThreatLevel, log: LogEntry, correct: boolean) => {
    let baseFeedback = '';
    
    if (correct) {
      const successMessages = [
        '🌟 Excellent security instincts!',
        '🛡️ Perfect threat assessment!',
        '🎯 Spot on analysis!',
        '✨ Your vigilance paid off!',
        '🚀 Outstanding detection skills!'
      ];
      const randomSuccess = successMessages[Math.floor(Math.random() * successMessages.length)];
      baseFeedback = isProMode 
        ? `${randomSuccess} ${log.explanation}`
        : `${randomSuccess} ${log.explanation}`;
    } else {
      const learningMessages = [
        '🌱 Learning opportunity ahead!',
        '🔍 Let\'s analyze this together:',
        '📚 Great practice for your skills:',
        '🧭 Here\'s what to look for:',
        '💡 Building your expertise:'
      ];
      const randomLearning = learningMessages[Math.floor(Math.random() * learningMessages.length)];
      baseFeedback = isProMode
        ? `${randomLearning} ${log.explanation}`
        : `${randomLearning} ${log.explanation}`;
    }
    
    // Add learning tip for educational value
    const learningTip = log.learningTip 
      ? `\n\n💡 Pro tip: ${log.learningTip}`
      : '';
    
    // Add category insight
    const categoryInsight = log.category
      ? `\n\n🔖 This was a ${log.category.replace('_', ' ')} scenario.`
      : '';
    
    return baseFeedback + learningTip + categoryInsight;
  };

  const calculateScore = (playerChoice: ThreatLevel, log: LogEntry, isCorrect: boolean, roundTime: number) => {
    if (!isCorrect) return -5; // Reduced penalty to encourage learning
    
    // Base scoring system
    const basePoints = {
      'safe': 50,
      'warning': 75,
      'critical': 100
    };
    
    let points = basePoints[log.threatLevel] || 50;
    
    // Difficulty multiplier
    const difficultyMultiplier = {
      'beginner': 1.0,
      'intermediate': 1.5,
      'advanced': 2.0
    };
    points *= difficultyMultiplier[log.difficulty as keyof typeof difficultyMultiplier] || 1.0;
    
    // Speed bonus (under 45 seconds)
    if (roundTime < 45) {
      points += Math.floor(points * 0.3);
    } else if (roundTime < 30) {
      points += Math.floor(points * 0.5);
    }
    
    // Accuracy streak bonus
    const recentCorrect = correctAnswers >= 3;
    if (recentCorrect) {
      points += Math.floor(points * 0.2);
    }
    
    return Math.floor(points);
  };

  const handleThreatAssessment = (playerChoice: ThreatLevel) => {
    if (!currentLog) return;

    const answerIsCorrect = playerChoice === currentLog.threatLevel;
    const roundTime = timeElapsed - ((currentRound - 1) * 45); // Estimate per round
    
    // Track the assessment for analytics
    trackThreatAssessment(answerIsCorrect, currentLog.threatLevel);

    // Enhanced scoring system
    const pointsEarned = calculateScore(playerChoice, currentLog, answerIsCorrect, roundTime);
    
    if (answerIsCorrect) {
      playSuccessSound();
      setCorrectAnswers(prev => prev + 1);
      
      // Track category performance
      if (currentLog.category) {
        setCorrectByCategory(prev => ({
          ...prev,
          [currentLog.category!]: (prev[currentLog.category!] || 0) + 1
        }));
      }
    } else {
      playErrorSound();
    }

    // Enhanced daily challenge progress tracking
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
      } else if (todaysChallenge.type === 'speed' && roundTime < 30) {
        updateChallengeProgress(todaysChallenge.id, todaysChallenge.progress + 1);
      }
    }

    const enhancedFeedback = getEnhancedFeedback(playerChoice, currentLog, answerIsCorrect);
    
    setScore(prev => prev + pointsEarned);
    setFeedback(enhancedFeedback);
    setIsCorrect(answerIsCorrect);
    setShowNextRound(true);

    if (currentRound >= totalRounds) {
      // Update adaptive difficulty metrics
      const finalAccuracy = ((correctAnswers + (answerIsCorrect ? 1 : 0)) / totalRounds) * 100;
      updateMetrics({
        accuracy: finalAccuracy,
        timeSpent: timeElapsed,
        correctByCategory
      });
      
      // Update achievement tracker
      const gameData = {
        score: score + pointsEarned,
        accuracy: finalAccuracy,
        timeElapsed,
        correctAnswers: correctAnswers + (answerIsCorrect ? 1 : 0),
        totalQuestions: totalRounds,
        totalRounds,
        difficulty: calculateOptimalDifficulty()
      };
      
      achievementTracker.updateProgress(gameData, {
        totalSessions: 1, // This would come from user profile
        currentStreak: 1, // This would come from user profile
        correctAnswers: correctAnswers + (answerIsCorrect ? 1 : 0)
      });
      
      setTimeout(() => {
        onEndGame(gameData);
      }, 2500);
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
    correctByCategory,
    scenariosPlayed: scenariosPlayed.length,
    handleThreatAssessment,
    nextRound
  };
};
