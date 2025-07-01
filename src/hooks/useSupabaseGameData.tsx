import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useSupabaseProfile } from './useSupabaseProfile';
import { GameData } from '../types/gameTypes';

interface GameSession {
  id: string;
  user_id: string;
  score: number;
  correct_answers: number;
  total_rounds: number;
  time_elapsed: number;
  difficulty_level: string;
  scenarios_played: any;
  created_at: string;
}

// Enhanced input sanitization for game data with security validation
const sanitizeGameData = (gameData: GameData): GameData => {
  // Validate game score integrity
  if (!validateGameScore(gameData.score, gameData.correctAnswers, gameData.totalRounds)) {
    logSecurityEvent('suspicious_input', { 
      reason: 'invalid_game_score',
      data: { score: gameData.score, correct: gameData.correctAnswers, total: gameData.totalRounds }
    });
    throw new Error('Game data validation failed for security reasons');
  }

  // Sanitize string inputs
  const difficulty = sanitizeHtml(gameData.difficulty || 'beginner');
  
  // Validate difficulty value
  const allowedDifficulties = ['beginner', 'intermediate', 'advanced', 'expert'];
  const validDifficulty = allowedDifficulties.includes(difficulty) ? difficulty : 'beginner';

  return {
    score: Math.max(0, Math.min(gameData.score, 999999)),
    correctAnswers: Math.max(0, Math.min(gameData.correctAnswers, 999999)),
    totalRounds: Math.max(0, Math.min(gameData.totalRounds, 999999)),
    timeElapsed: Math.max(0, Math.min(gameData.timeElapsed, 999999)),
    difficulty: validDifficulty,
    accuracy: gameData.accuracy || 0,
    totalQuestions: gameData.totalQuestions || gameData.totalRounds
  };
};

export const useSupabaseGameData = () => {
  const { user } = useAuth();
  const { logAdvancedError } = useAdvancedErrorHandling();
  const [isLoading, setIsLoading] = useState(false);
  const [gameHistory, setGameHistory] = useState<GameSession[]>([]);

  // Enhanced save game session with security validation
  const saveGameSession = async (gameData: GameData) => {
    if (!user) {
      console.log('No user logged in, saving to localStorage as fallback');
      try {
        const sanitizedData = sanitizeGameData(gameData);
        const existingData = JSON.parse(localStorage.getItem('loglings-game-history') || '[]');
        const sessionData = {
          ...sanitizedData,
          id: crypto.randomUUID(),
          user_id: 'anonymous',
          created_at: new Date().toISOString()
        };
        existingData.push(sessionData);
        localStorage.setItem('loglings-game-history', JSON.stringify(existingData));
      } catch (error) {
        logAdvancedError(error as Error, {
          component: 'GameSession',
          action: 'save',
          securityLevel: 'medium'
        });
      }
      return;
    }

    // Rate limiting for game saves
    const rateLimitKey = `game-save-${user.id}`;
    if (!rateLimiter.isAllowed(rateLimitKey, 10, 60000)) { // 10 saves per minute max
      const remainingTime = rateLimiter.getRemainingTime(rateLimitKey);
      logSecurityEvent('rate_limit_exceeded', { action: 'game_save', remainingTime });
      toast.error(`Rate limit exceeded. Please wait ${Math.ceil(remainingTime / 1000)} seconds.`);
      return;
    }

    setIsLoading(true);
    try {
      const sanitizedData = sanitizeGameData(gameData);
      
      const { data, error } = await supabase
        .from('game_sessions')
        .insert({
          user_id: user.id,
          score: sanitizedData.score,
          correct_answers: sanitizedData.correctAnswers,
          total_rounds: sanitizedData.totalRounds,
          time_elapsed: sanitizedData.timeElapsed,
          difficulty_level: sanitizedData.difficulty,
          scenarios_played: []
        })
        .select()
        .maybeSingle();

      if (error) {
        logAdvancedError(new Error('Game session save failed'), {
          component: 'GameSession',
          action: 'save',
          userId: user.id,
          securityLevel: 'medium',
          additionalData: sanitizedData
        });
        toast.error('Failed to save game progress');
        return;
      }

      console.log('Game session saved successfully');
      await loadGameHistory();
      toast.success('Game progress saved! 🌟');
      
    } catch (error) {
      logAdvancedError(error as Error, {
        component: 'GameSession',
        action: 'save',
        userId: user.id,
        securityLevel: 'high',
        additionalData: gameData
      });
      toast.error('Failed to save game progress');
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced load game history with security validation
  const loadGameHistory = async () => {
    if (!user) {
      try {
        const localData = JSON.parse(localStorage.getItem('loglings-game-history') || '[]');
        // Validate local data for security
        const validatedData = localData.filter((session: any) => {
          try {
            return validateGameScore(session.score || 0, session.correct_answers || 0, session.total_rounds || 0);
          } catch {
            return false;
          }
        });
        setGameHistory(validatedData);
      } catch (error) {
        logAdvancedError(error as Error, {
          component: 'GameSession',
          action: 'load',
          securityLevel: 'low'
        });
        setGameHistory([]);
      }
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('game_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        logAdvancedError(new Error('Game history load failed'), {
          component: 'GameSession',
          action: 'load',
          userId: user.id,
          securityLevel: 'medium'
        });
        return;
      }

      // Validate loaded data for security
      const validatedData = data?.filter(session => {
        try {
          return validateGameScore(session.score, session.correct_answers, session.total_rounds);
        } catch {
          logSecurityEvent('suspicious_input', { 
            reason: 'invalid_stored_game_data',
            sessionId: session.id 
          });
          return false;
        }
      }) || [];

      const transformedData = validatedData.map(session => ({
        ...session,
        scenarios_played: session.scenarios_played || []
      }));

      setGameHistory(transformedData);
      
    } catch (error) {
      logAdvancedError(error as Error, {
        component: 'GameSession',
        action: 'load',
        userId: user.id,
        securityLevel: 'medium'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced update user progress with security validation
  const updateUserProgress = async (gameData: GameData) => {
    if (!user) return;

    try {
      const sanitizedData = sanitizeGameData(gameData);
      
      const { data: currentProgress, error: fetchError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (fetchError) {
        logAdvancedError(new Error('User progress fetch failed'), {
          component: 'UserProgress',
          action: 'fetch',
          userId: user.id,
          securityLevel: 'medium'
        });
        return;
      }

      if (currentProgress) {
        const newTotalSessions = currentProgress.total_sessions + 1;
        const newTotalScore = currentProgress.total_score + sanitizedData.score;
        const newCorrectAnswers = currentProgress.correct_answers + sanitizedData.correctAnswers;
        
        // Validate progress calculations for security
        if (newTotalSessions < 0 || newTotalScore < 0 || newCorrectAnswers < 0) {
          logSecurityEvent('suspicious_input', { 
            reason: 'invalid_progress_calculation',
            current: currentProgress,
            new: { newTotalSessions, newTotalScore, newCorrectAnswers }
          });
          return;
        }
        
        const lastSessionDate = new Date(currentProgress.updated_at).toDateString();
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        
        let newCurrentStreak = currentProgress.current_streak;
        if (lastSessionDate === yesterday || lastSessionDate === today) {
          newCurrentStreak = lastSessionDate === yesterday ? newCurrentStreak + 1 : newCurrentStreak;
        } else {
          newCurrentStreak = 1;
        }
        
        const newLongestStreak = Math.max(currentProgress.longest_streak, newCurrentStreak);

        const { error: updateError } = await supabase
          .from('user_progress')
          .update({
            total_sessions: newTotalSessions,
            total_score: newTotalScore,
            correct_answers: newCorrectAnswers,
            current_streak: newCurrentStreak,
            longest_streak: newLongestStreak,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', user.id);

        if (updateError) {
          logAdvancedError(new Error('User progress update failed'), {
            component: 'UserProgress',
            action: 'update',
            userId: user.id,
            securityLevel: 'medium'
          });
        } else {
          console.log('User progress updated successfully');
        }
      }
    } catch (error) {
      logAdvancedError(error as Error, {
        component: 'UserProgress',
        action: 'update',
        userId: user.id,
        securityLevel: 'high',
        additionalData: gameData
      });
    }
  };

  useEffect(() => {
    loadGameHistory();
  }, [user]);

  const getGameStatistics = () => {
    if (gameHistory.length === 0) {
      return {
        totalGames: 0,
        averageScore: 0,
        averageAccuracy: 0,
        bestScore: 0,
        totalTimePlayed: 0,
        improvementTrend: 'stable' as 'improving' | 'declining' | 'stable'
      };
    }

    const totalGames = gameHistory.length;
    const totalScore = gameHistory.reduce((sum, game) => sum + game.score, 0);
    const totalAccuracy = gameHistory.reduce((sum, game) => 
      sum + (game.total_rounds > 0 ? (game.correct_answers / game.total_rounds) * 100 : 0), 0);
    const totalTime = gameHistory.reduce((sum, game) => sum + game.time_elapsed, 0);
    const bestScore = Math.max(...gameHistory.map(game => game.score));
    
    const averageScore = totalScore / totalGames;
    const averageAccuracy = totalAccuracy / totalGames;
    
    let improvementTrend: 'improving' | 'declining' | 'stable' = 'stable';
    if (totalGames >= 6) {
      const recent5 = gameHistory.slice(0, 5).reduce((sum, game) => sum + game.score, 0) / 5;
      const previous5 = gameHistory.slice(5, 10).reduce((sum, game) => sum + game.score, 0) / 5;
      
      if (recent5 > previous5 * 1.1) improvementTrend = 'improving';
      else if (recent5 < previous5 * 0.9) improvementTrend = 'declining';
    }

    return {
      totalGames,
      averageScore: Math.round(averageScore),
      averageAccuracy: Math.round(averageAccuracy * 10) / 10,
      bestScore,
      totalTimePlayed: totalTime,
      improvementTrend
    };
  };

  return {
    isLoading,
    gameHistory,
    saveGameSession,
    loadGameHistory,
    updateUserProgress,
    getGameStatistics
  };
};
