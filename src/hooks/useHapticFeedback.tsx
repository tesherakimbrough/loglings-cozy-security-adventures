
import { useCallback } from 'react';
import { useUserProfile } from './useUserProfile';

export type HapticPattern = 'success' | 'error' | 'warning' | 'tap' | 'selection' | 'impact-light' | 'impact-medium' | 'impact-heavy';

export const useHapticFeedback = () => {
  const { profile } = useUserProfile();

  const patterns = {
    success: [100, 50, 100],
    error: [200, 100, 200],
    warning: [50, 50, 50],
    tap: [25],
    selection: [10],
    'impact-light': [25],
    'impact-medium': [50],
    'impact-heavy': [100]
  };

  const triggerHaptic = useCallback((pattern: HapticPattern) => {
    // Check if haptic feedback is enabled in user preferences
    if (!profile.preferences.soundEffectsEnabled) return;
    
    // Check if device supports vibration
    if (!('vibrate' in navigator)) return;
    
    try {
      // Use the Vibration API
      const vibrationPattern = patterns[pattern];
      navigator.vibrate(vibrationPattern);
    } catch (error) {
      console.warn('Haptic feedback not supported:', error);
    }
  }, [profile.preferences.soundEffectsEnabled]);

  const success = useCallback(() => triggerHaptic('success'), [triggerHaptic]);
  const error = useCallback(() => triggerHaptic('error'), [triggerHaptic]);
  const warning = useCallback(() => triggerHaptic('warning'), [triggerHaptic]);
  const tap = useCallback(() => triggerHaptic('tap'), [triggerHaptic]);
  const selection = useCallback(() => triggerHaptic('selection'), [triggerHaptic]);
  const impactLight = useCallback(() => triggerHaptic('impact-light'), [triggerHaptic]);
  const impactMedium = useCallback(() => triggerHaptic('impact-medium'), [triggerHaptic]);
  const impactHeavy = useCallback(() => triggerHaptic('impact-heavy'), [triggerHaptic]);

  return {
    triggerHaptic,
    success,
    error,
    warning,
    tap,
    selection,
    impactLight,
    impactMedium,
    impactHeavy,
    isSupported: 'vibrate' in navigator
  };
};
