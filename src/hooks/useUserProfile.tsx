
import { useState, useEffect } from 'react';
import { UserProfile, UserMode, DifficultyLevel } from '../types/userTypes';
import { useAuth } from './useAuth';
import { useSupabaseUserProfile } from './useSupabaseUserProfile';

const defaultProfile: UserProfile = {
  mode: 'cozy-everyday',
  hasCompletedOnboarding: false,
  preferences: {
    difficulty: 'beginner' as DifficultyLevel,
    audioEnabled: true,
    soundEffectsEnabled: true,
    musicType: 'forest',
    musicVolume: 0.3,
    soundEffectsVolume: 0.4,
    notifications: true,
    shareAchievements: false,
    // Accessibility defaults
    highContrast: false,
    reduceMotion: false,
    fontSize: 'medium',
    colorBlindMode: 'default',
    audioDescriptions: false,
    screenReaderMode: false,
    enhancedFocus: false,
    keyboardOnly: false
  },
  progress: {
    totalSessions: 0,
    totalScore: 0,
    correctAnswers: 0,
    currentStreak: 0,
    longestStreak: 0,
    unlockedLoglings: [],
    achievements: []
  }
};

export const useUserProfile = () => {
  const { user } = useAuth();
  const supabaseProfile = useSupabaseUserProfile();
  const [localProfile, setLocalProfile] = useState<UserProfile>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);

  // Use Supabase profile if user is logged in, otherwise use local storage
  const profile = user ? (supabaseProfile.profile || defaultProfile) : localProfile;
  const loading = user ? supabaseProfile.isLoading : isLoading;

  useEffect(() => {
    if (!user) {
      // Load from localStorage for non-authenticated users
      const savedProfile = localStorage.getItem('loglings-user-profile');
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile);
          const migratedProfile = {
            ...defaultProfile,
            ...parsed,
            preferences: {
              ...defaultProfile.preferences,
              ...parsed.preferences,
              soundEffectsEnabled: parsed.preferences?.soundEffectsEnabled ?? true,
              soundEffectsVolume: parsed.preferences?.soundEffectsVolume ?? 0.4,
              difficulty: (parsed.preferences?.difficulty as DifficultyLevel) || 'beginner',
              highContrast: parsed.preferences?.highContrast ?? false,
              reduceMotion: parsed.preferences?.reduceMotion ?? false,
              fontSize: parsed.preferences?.fontSize ?? 'medium',
              colorBlindMode: parsed.preferences?.colorBlindMode ?? 'default',
              audioDescriptions: parsed.preferences?.audioDescriptions ?? false,
              screenReaderMode: parsed.preferences?.screenReaderMode ?? false,
              enhancedFocus: parsed.preferences?.enhancedFocus ?? false,
              keyboardOnly: parsed.preferences?.keyboardOnly ?? false
            }
          };
          setLocalProfile(migratedProfile);
        } catch (error) {
          console.warn('Failed to parse saved profile, using defaults');
          setLocalProfile(defaultProfile);
        }
      }
      setIsLoading(false);
    }
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (user) {
      // Update Supabase profile
      await supabaseProfile.updateProfile(updates);
    } else {
      // Update local storage
      const newProfile = { ...localProfile, ...updates };
      setLocalProfile(newProfile);
      localStorage.setItem('loglings-user-profile', JSON.stringify(newProfile));
    }
  };

  const selectMode = async (mode: UserMode) => {
    if (user) {
      await supabaseProfile.selectMode(mode);
    } else {
      const modePreferences = {
        'cozy-everyday': {
          difficulty: 'beginner' as DifficultyLevel,
          audioEnabled: true,
          musicType: 'forest'
        },
        'career-pro': {
          difficulty: 'advanced' as DifficultyLevel,
          audioEnabled: true,
          musicType: 'lofi'
        }
      };

      updateProfile({
        mode,
        hasCompletedOnboarding: true,
        preferences: {
          ...profile.preferences,
          ...modePreferences[mode]
        }
      });
    }
  };

  const updatePreferences = async (newPreferences: Partial<UserProfile['preferences']>) => {
    await updateProfile({
      preferences: { ...profile.preferences, ...newPreferences }
    });
  };

  const updateProgress = async (newProgress: Partial<UserProfile['progress']>) => {
    await updateProfile({
      progress: { ...profile.progress, ...newProgress }
    });
  };

  const resetOnboarding = async () => {
    await updateProfile({ hasCompletedOnboarding: false });
  };

  return {
    profile,
    isLoading: loading,
    updateProfile,
    selectMode,
    updatePreferences,
    updateProgress,
    resetOnboarding,
    needsOnboarding: !profile.hasCompletedOnboarding
  };
};
