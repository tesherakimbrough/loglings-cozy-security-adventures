import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { GameData } from '../pages/Index';
import { toast } from 'sonner';

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

// Input sanitization for game data
const sanitizeGameData = (gameData: GameData): GameData => {
  return {
    score: Math.max(0, Math.min(gameData.score, 999999)),
    correctAnswers: Math.max(0, Math.min(gameData.correctAnswers, 999999)),
    totalRounds: Math.max(0, Math.min(gameData.totalRounds, 999999)),
    timeElapsed: Math.max(0, Math.min(gameData.timeElapsed, 999999)),
    difficulty: gameData.difficulty || 'beginner',
    accuracy: gameData.accuracy || 0,
    totalQuestions: gameData.totalQuestions || gameData.totalRounds
  };
};

export const useSupabaseGameData = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [gameHistory, setGameHistory] = useState<GameSession[]>([]);

  // Save game session to Supabase
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
        console.error('Error saving to localStorage');
      }
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
        console.error('Error saving game session');
        toast.error('Failed to save game progress');
        return;
      }

      console.log('Game session saved successfully');
      await loadGameHistory();
      toast.success('Game progress saved! 🌟');
      
    } catch (error) {
      console.error('Exception saving game session');
      toast.error('Failed to save game progress');
    } finally {
      setIsLoading(false);
    }
  };

  // Load game history from Supabase
  const loadGameHistory = async () => {
    if (!user) {
      try {
        const localData = JSON.parse(localStorage.getItem('loglings-game-history') || '[]');
        setGameHistory(localData);
      } catch (error) {
        console.error('Error loading from localStorage');
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
        console.error('Error loading game history');
        return;
      }

      const transformedData = data?.map(session => ({
        ...session,
        scenarios_played: session.scenarios_played || []
      })) || [];

      setGameHistory(transformedData);
      
    } catch (error) {
      console.error('Exception loading game history');
    } finally {
      setIsLoading(false);
    }
  };

  // Update user progress in Supabase
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
        console.error('Error fetching current progress');
        return;
      }

      if (currentProgress) {
        const newTotalSessions = currentProgress.total_sessions + 1;
        const newTotalScore = currentProgress.total_score + sanitizedData.score;
        const newCorrectAnswers = currentProgress.correct_answers + sanitizedData.correctAnswers;
        
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
          console.error('Error updating user progress');
        } else {
          console.log('User progress updated successfully');
        }
      }
    } catch (error) {
      console.error('Exception updating user progress');
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
