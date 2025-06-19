import { useEffect } from 'react';
import { useUserProfile } from './useUserProfile';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const useAnalytics = () => {
  const { profile } = useUserProfile();

  useEffect(() => {
    // Initialize analytics (Google Analytics, etc.)
    if (typeof window !== 'undefined' && !window.gtag) {
      // Analytics will be configured when deployed
      console.log('Analytics initialized for user mode:', profile.mode);
    }
  }, [profile.mode]);

  const trackEvent = (event: AnalyticsEvent) => {
    // Track to console in development
    console.log('Analytics Event:', event);
    
    // Track to Google Analytics in production
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value
      });
    }

    // Store locally for later analysis
    const events = JSON.parse(localStorage.getItem('loglings-analytics') || '[]');
    events.push({
      ...event,
      timestamp: new Date().toISOString(),
      userMode: profile.mode,
      sessionId: sessionStorage.getItem('loglings-session-id') || 'anonymous'
    });
    
    // Keep only last 100 events
    localStorage.setItem('loglings-analytics', JSON.stringify(events.slice(-100)));
  };

  const trackGameStart = (mode: string) => {
    trackEvent({
      action: 'game_start',
      category: 'engagement',
      label: mode
    });
  };

  const trackGameComplete = (score: number, accuracy: number) => {
    trackEvent({
      action: 'game_complete',
      category: 'engagement',
      value: score
    });
    
    trackEvent({
      action: 'accuracy_achieved',
      category: 'performance',
      value: Math.round(accuracy)
    });
  };

  const trackThreatAssessment = (correct: boolean, threatLevel: string) => {
    trackEvent({
      action: correct ? 'correct_assessment' : 'incorrect_assessment',
      category: 'gameplay',
      label: threatLevel
    });
  };

  const trackDailyChallengeComplete = (challengeType: string) => {
    trackEvent({
      action: 'daily_challenge_complete',
      category: 'engagement',
      label: challengeType
    });
  };

  const trackLevelUp = (newLevel: number) => {
    trackEvent({
      action: 'level_up',
      category: 'progression',
      value: newLevel
    });
  };

  return {
    trackEvent,
    trackGameStart,
    trackGameComplete,
    trackThreatAssessment,
    trackDailyChallengeComplete,
    trackLevelUp
  };
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
