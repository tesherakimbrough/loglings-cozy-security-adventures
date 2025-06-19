
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
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      // Load progress
      const { data: progressData } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Load preferences
      const { data: preferencesData } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      setProfile(profileData);
      setProgress(progressData);
      setPreferences(preferencesData);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (updates: Partial<UserProgress>) => {
    if (!user || !progress) return;

    const { data, error } = await supabase
      .from('user_progress')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('user_id', user.id)
      .select()
      .single();

    if (!error && data) {
      setProgress(data);
    }
    return { data, error };
  };

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!user || !preferences) return;

    const { data, error } = await supabase
      .from('user_preferences')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('user_id', user.id)
      .select()
      .single();

    if (!error && data) {
      setPreferences(data);
    }
    return { data, error };
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

    const { data, error } = await supabase
      .from('game_sessions')
      .insert({
        user_id: user.id,
        ...sessionData
      });

    return { data, error };
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
