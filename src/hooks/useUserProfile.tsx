import { useState, useEffect } from 'react';
import { UserProfile, UserMode, DifficultyLevel } from '../types/userTypes';

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
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedProfile = localStorage.getItem('loglings-user-profile');
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        // Migrate old profiles that don't have new accessibility properties
        const migratedProfile = {
          ...defaultProfile,
          ...parsed,
          preferences: {
            ...defaultProfile.preferences,
            ...parsed.preferences,
            soundEffectsEnabled: parsed.preferences?.soundEffectsEnabled ?? true,
            soundEffectsVolume: parsed.preferences?.soundEffectsVolume ?? 0.4,
            difficulty: (parsed.preferences?.difficulty as DifficultyLevel) || 'beginner',
            // Ensure accessibility properties have defaults
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
        setProfile(migratedProfile);
      } catch (error) {
        console.warn('Failed to parse saved profile, using defaults');
        setProfile(defaultProfile);
      }
    }
    setIsLoading(false);
  }, []);

  const updateProfile = (updates: Partial<UserProfile>) => {
    const newProfile = { ...profile, ...updates };
    setProfile(newProfile);
    localStorage.setItem('loglings-user-profile', JSON.stringify(newProfile));
  };

  const selectMode = (mode: UserMode) => {
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
  };

  const updatePreferences = (newPreferences: Partial<UserProfile['preferences']>) => {
    updateProfile({
      preferences: { ...profile.preferences, ...newPreferences }
    });
  };

  const updateProgress = (newProgress: Partial<UserProfile['progress']>) => {
    updateProfile({
      progress: { ...profile.progress, ...newProgress }
    });
  };

  const resetOnboarding = () => {
    updateProfile({ hasCompletedOnboarding: false });
  };

  return {
    profile,
    isLoading,
    updateProfile,
    selectMode,
    updatePreferences,
    updateProgress,
    resetOnboarding,
    needsOnboarding: !profile.hasCompletedOnboarding
  };
};
