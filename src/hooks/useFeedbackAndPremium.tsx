
import { useState, useEffect } from 'react';
import { FeedbackData } from '../components/FeedbackForm';

interface FeedbackState {
  hasShownSessionPrompt: boolean;
  hasShownScorePrompt: boolean;
  hasShownAchievementPrompt: boolean;
  lastPromptDate: string;
  dismissedCount: number;
}

export const useFeedbackAndPremium = () => {
  const [feedbackState, setFeedbackState] = useState<FeedbackState>({
    hasShownSessionPrompt: false,
    hasShownScorePrompt: false,
    hasShownAchievementPrompt: false,
    lastPromptDate: '',
    dismissedCount: 0
  });

  useEffect(() => {
    const saved = localStorage.getItem('loglings-feedback-state');
    if (saved) {
      setFeedbackState(JSON.parse(saved));
    }
  }, []);

  const saveFeedbackState = (newState: FeedbackState) => {
    localStorage.setItem('loglings-feedback-state', JSON.stringify(newState));
    setFeedbackState(newState);
  };

  const submitFeedback = (feedback: FeedbackData) => {
    const feedbackList = JSON.parse(localStorage.getItem('loglings-feedback') || '[]');
    feedbackList.push({
      ...feedback,
      timestamp: new Date().toISOString(),
      id: crypto.randomUUID()
    });
    localStorage.setItem('loglings-feedback', JSON.stringify(feedbackList));
  };

  const shouldShowPremiumPrompt = (
    type: 'sessions' | 'score' | 'achievement',
    sessionsPlayed?: number,
    currentScore?: number
  ): boolean => {
    // Don't show if dismissed too many times recently
    if (feedbackState.dismissedCount >= 3) return false;

    // Don't show more than once per day
    const lastPrompt = new Date(feedbackState.lastPromptDate);
    const now = new Date();
    const daysSinceLastPrompt = (now.getTime() - lastPrompt.getTime()) / (1000 * 60 * 60 * 24);
    
    if (daysSinceLastPrompt < 1) return false;

    switch (type) {
      case 'sessions':
        return !feedbackState.hasShownSessionPrompt && (sessionsPlayed || 0) >= 5;
      case 'score':
        return !feedbackState.hasShownScorePrompt && (currentScore || 0) >= 100;
      case 'achievement':
        return !feedbackState.hasShownAchievementPrompt;
      default:
        return false;
    }
  };

  const markPromptShown = (type: 'sessions' | 'score' | 'achievement') => {
    const newState = {
      ...feedbackState,
      lastPromptDate: new Date().toISOString()
    };

    switch (type) {
      case 'sessions':
        newState.hasShownSessionPrompt = true;
        break;
      case 'score':
        newState.hasShownScorePrompt = true;
        break;
      case 'achievement':
        newState.hasShownAchievementPrompt = true;
        break;
    }

    saveFeedbackState(newState);
  };

  const markPromptDismissed = () => {
    saveFeedbackState({
      ...feedbackState,
      dismissedCount: feedbackState.dismissedCount + 1,
      lastPromptDate: new Date().toISOString()
    });
  };

  const handleUpgrade = () => {
    // For now, redirect to waitlist with premium context
    const params = new URLSearchParams({ 
      premium: 'true',
      source: 'upgrade-prompt'
    });
    window.location.href = `/waitlist?${params.toString()}`;
  };

  return {
    feedbackState,
    submitFeedback,
    shouldShowPremiumPrompt,
    markPromptShown,
    markPromptDismissed,
    handleUpgrade
  };
};
