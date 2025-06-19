
import { useSupabaseProfile } from './useSupabaseProfile';
import { UserProfile } from '../types/userTypes';

export const useSupabaseUserProfile = () => {
  const { progress, preferences, updateProgress, updatePreferences, loading } = useSupabaseProfile();

  // Convert Supabase data to existing UserProfile format for compatibility
  const profile: UserProfile | null = progress && preferences ? {
    mode: progress.user_mode as 'cozy-everyday' | 'career-pro',
    hasCompletedOnboarding: progress.total_sessions > 0,
    preferences: {
      difficulty: progress.difficulty_level as 'beginner' | 'intermediate' | 'advanced',
      audioEnabled: preferences.audio_enabled,
      soundEffectsEnabled: preferences.sound_effects_enabled,
      musicType: preferences.music_type,
      musicVolume: preferences.music_volume,
      soundEffectsVolume: preferences.sound_effects_volume,
      notifications: preferences.notifications,
      shareAchievements: preferences.share_achievements,
      highContrast: preferences.high_contrast,
      reduceMotion: preferences.reduce_motion,
      fontSize: preferences.font_size,
      colorBlindMode: preferences.color_blind_mode
    },
    progress: {
      totalSessions: progress.total_sessions,
      totalScore: progress.total_score,
      correctAnswers: progress.correct_answers,
      currentStreak: progress.current_streak,
      longestStreak: progress.longest_streak,
      unlockedLoglings: progress.unlocked_loglings,
      achievements: progress.achievements
    }
  } : null;

  const updateProfile = async (updates: Partial<UserProfile>) => {
    const progressUpdates: any = {};
    const preferencesUpdates: any = {};

    if (updates.mode) progressUpdates.user_mode = updates.mode;
    if (updates.preferences?.difficulty) progressUpdates.difficulty_level = updates.preferences.difficulty;
    if (updates.progress) {
      Object.assign(progressUpdates, {
        total_sessions: updates.progress.totalSessions,
        total_score: updates.progress.totalScore,
        correct_answers: updates.progress.correctAnswers,
        current_streak: updates.progress.currentStreak,
        longest_streak: updates.progress.longestStreak,
        unlocked_loglings: updates.progress.unlockedLoglings,
        achievements: updates.progress.achievements
      });
    }

    if (updates.preferences) {
      Object.assign(preferencesUpdates, {
        audio_enabled: updates.preferences.audioEnabled,
        sound_effects_enabled: updates.preferences.soundEffectsEnabled,
        music_type: updates.preferences.musicType,
        music_volume: updates.preferences.musicVolume,
        sound_effects_volume: updates.preferences.soundEffectsVolume,
        notifications: updates.preferences.notifications,
        share_achievements: updates.preferences.shareAchievements,
        high_contrast: updates.preferences.highContrast,
        reduce_motion: updates.preferences.reduceMotion,
        font_size: updates.preferences.fontSize,
        color_blind_mode: updates.preferences.colorBlindMode
      });
    }

    const promises = [];
    if (Object.keys(progressUpdates).length > 0) {
      promises.push(updateProgress(progressUpdates));
    }
    if (Object.keys(preferencesUpdates).length > 0) {
      promises.push(updatePreferences(preferencesUpdates));
    }

    await Promise.all(promises);
  };

  const selectMode = async (mode: 'cozy-everyday' | 'career-pro') => {
    const modePreferences = {
      'cozy-everyday': {
        difficulty_level: 'beginner',
        audio_enabled: true,
        music_type: 'forest'
      },
      'career-pro': {
        difficulty_level: 'advanced',
        audio_enabled: true,
        music_type: 'lofi'
      }
    };

    await updateProgress({ user_mode: mode, ...modePreferences[mode] });
  };

  return {
    profile,
    isLoading: loading,
    updateProfile,
    selectMode,
    updatePreferences: (newPrefs: any) => updatePreferences(newPrefs),
    updateProgress: (newProgress: any) => updateProgress(newProgress),
    resetOnboarding: () => updateProgress({ total_sessions: 0 }),
    needsOnboarding: !profile?.hasCompletedOnboarding
  };
};
