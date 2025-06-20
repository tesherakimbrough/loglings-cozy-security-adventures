
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Profile {
  id: string;
  email: string;
  display_name: string | null;
  created_at: string;
  updated_at: string;
}

interface UserProgress {
  id: string;
  user_id: string;
  total_sessions: number;
  total_score: number;
  correct_answers: number;
  current_streak: number;
  longest_streak: number;
  user_mode: string;
  difficulty_level: string;
  unlocked_loglings: string[];
  achievements: string[];
  created_at: string;
  updated_at: string;
}

interface UserPreferences {
  id: string;
  user_id: string;
  audio_enabled: boolean;
  sound_effects_enabled: boolean;
  music_type: string;
  music_volume: number;
  sound_effects_volume: number;
  notifications: boolean;
  share_achievements: boolean;
  high_contrast: boolean;
  reduce_motion: boolean;
  font_size: string;
  color_blind_mode: string;
  created_at: string;
  updated_at: string;
}

// Input sanitization utilities
const sanitizeStringInput = (input: string, maxLength: number = 255): string => {
  return input.trim().slice(0, maxLength);
};

const sanitizeArrayInput = (input: string[]): string[] => {
  return input.filter(item => typeof item === 'string' && item.trim().length > 0);
};

export const useSupabaseProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserData();
    } else {
      setProfile(null);
      setProgress(null);
      setPreferences(null);
      setLoading(false);
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Load profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (profileError) {
        console.error('Error loading profile data');
      }

      // Load progress
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (progressError) {
        console.error('Error loading progress data');
      }

      // Load preferences
      const { data: preferencesData, error: preferencesError } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (preferencesError) {
        console.error('Error loading preferences data');
      }

      setProfile(profileData);
      setProgress(progressData);
      setPreferences(preferencesData);
    } catch (error) {
      console.error('Exception loading user data');
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (updates: Partial<UserProgress>) => {
    if (!user || !progress) return;

    try {
      // Sanitize inputs
      const sanitizedUpdates = { ...updates };
      if (sanitizedUpdates.user_mode) {
        sanitizedUpdates.user_mode = sanitizeStringInput(sanitizedUpdates.user_mode, 50);
      }
      if (sanitizedUpdates.difficulty_level) {
        sanitizedUpdates.difficulty_level = sanitizeStringInput(sanitizedUpdates.difficulty_level, 50);
      }
      if (sanitizedUpdates.unlocked_loglings) {
        sanitizedUpdates.unlocked_loglings = sanitizeArrayInput(sanitizedUpdates.unlocked_loglings);
      }
      if (sanitizedUpdates.achievements) {
        sanitizedUpdates.achievements = sanitizeArrayInput(sanitizedUpdates.achievements);
      }

      const { data, error } = await supabase
        .from('user_progress')
        .update({ ...sanitizedUpdates, updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .select()
        .maybeSingle();

      if (!error && data) {
        setProgress(data);
      }
      return { data, error };
    } catch (error) {
      console.error('Exception updating progress');
      return { data: null, error };
    }
  };

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!user || !preferences) return;

    try {
      // Sanitize inputs
      const sanitizedUpdates = { ...updates };
      if (sanitizedUpdates.music_type) {
        sanitizedUpdates.music_type = sanitizeStringInput(sanitizedUpdates.music_type, 50);
      }
      if (sanitizedUpdates.font_size) {
        sanitizedUpdates.font_size = sanitizeStringInput(sanitizedUpdates.font_size, 20);
      }
      if (sanitizedUpdates.color_blind_mode) {
        sanitizedUpdates.color_blind_mode = sanitizeStringInput(sanitizedUpdates.color_blind_mode, 50);
      }

      const { data, error } = await supabase
        .from('user_preferences')
        .update({ ...sanitizedUpdates, updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .select()
        .maybeSingle();

      if (!error && data) {
        setPreferences(data);
      }
      return { data, error };
    } catch (error) {
      console.error('Exception updating preferences');
      return { data: null, error };
    }
  };

  const saveGameSession = async (sessionData: {
    score: number;
    correct_answers: number;
    total_rounds: number;
    time_elapsed: number;
    difficulty_level: string;
    scenarios_played?: any;
  }) => {
    if (!user) return;

    try {
      // Sanitize inputs
      const sanitizedData = {
        ...sessionData,
        difficulty_level: sanitizeStringInput(sessionData.difficulty_level, 50),
        score: Math.max(0, Math.min(sessionData.score, 999999)),
        correct_answers: Math.max(0, Math.min(sessionData.correct_answers, 999999)),
        total_rounds: Math.max(0, Math.min(sessionData.total_rounds, 999999)),
        time_elapsed: Math.max(0, Math.min(sessionData.time_elapsed, 999999))
      };

      const { data, error } = await supabase
        .from('game_sessions')
        .insert({
          user_id: user.id,
          ...sanitizedData
        });

      return { data, error };
    } catch (error) {
      console.error('Exception saving game session');
      return { data: null, error };
    }
  };

  return {
    profile,
    progress,
    preferences,
    loading,
    updateProgress,
    updatePreferences,
    saveGameSession,
    refreshData: loadUserData
  };
};
