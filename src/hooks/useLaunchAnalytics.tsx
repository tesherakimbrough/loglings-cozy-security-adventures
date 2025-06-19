
import { useEffect } from 'react';
import { useAnalytics } from './useAnalytics';

export const useLaunchAnalytics = () => {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // Track launch readiness session
    trackEvent({
      action: 'launch_ready_session_start',
      category: 'launch',
      label: 'early_access'
    });

    // Track user environment
    const userAgent = navigator.userAgent;
    const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent);
    const screenSize = `${window.screen.width}x${window.screen.height}`;
    
    trackEvent({
      action: 'user_environment',
      category: 'launch',
      label: `${isMobile ? 'mobile' : 'desktop'}_${screenSize}`
    });

    // Generate session ID for this launch session
    if (!sessionStorage.getItem('loglings-launch-session')) {
      const sessionId = crypto.randomUUID();
      sessionStorage.setItem('loglings-launch-session', sessionId);
      
      trackEvent({
        action: 'new_launch_session',
        category: 'launch',
        label: sessionId
      });
    }
  }, [trackEvent]);

  const trackLaunchInteraction = (interaction: string, context?: string) => {
    trackEvent({
      action: 'launch_interaction',
      category: 'launch',
      label: `${interaction}_${context || 'general'}`
    });
  };

  const trackAccessibilityUsage = (feature: string) => {
    trackEvent({
      action: 'accessibility_feature_used',
      category: 'accessibility',
      label: feature
    });
  };

  const trackFeedbackSubmission = (feedbackType: string, rating?: number) => {
    trackEvent({
      action: 'launch_feedback_submitted',
      category: 'launch',
      label: feedbackType,
      value: rating
    });
  };

  const trackPremiumInterest = (source: string) => {
    trackEvent({
      action: 'premium_interest',
      category: 'monetization',
      label: source
    });
  };

  return {
    trackLaunchInteraction,
    trackAccessibilityUsage,
    trackFeedbackSubmission,
    trackPremiumInterest
  };
};
