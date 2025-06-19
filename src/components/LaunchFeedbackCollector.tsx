
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Sparkles, Target, Users, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import LaunchFeedbackForm from './LaunchFeedbackForm';
import SoftLaunchFeedback from './SoftLaunchFeedback';
import { useLaunchAnalytics } from '../hooks/useLaunchAnalytics';

interface LaunchFeedbackCollectorProps {
  userSessions: number;
  currentScore: number;
  showType?: 'launch' | 'soft-launch' | 'auto';
}

const LaunchFeedbackCollector = ({ 
  userSessions, 
  currentScore, 
  showType = 'auto' 
}: LaunchFeedbackCollectorProps) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'launch' | 'soft-launch'>('launch');
  const [hasShownFeedback, setHasShownFeedback] = useState(false);
  const { trackLaunchInteraction } = useLaunchAnalytics();

  useEffect(() => {
    // Auto-determine feedback type and timing
    if (showType === 'auto' && !hasShownFeedback) {
      // Show soft launch feedback after 3+ sessions or high score
      if (userSessions >= 3 || currentScore >= 150) {
        setFeedbackType('soft-launch');
        
        // Delay showing feedback to not interrupt gameplay
        const timer = setTimeout(() => {
          setShowFeedback(true);
          trackLaunchInteraction('auto_feedback_prompt', 'soft_launch');
        }, 2000);
        
        return () => clearTimeout(timer);
      }
      // Show launch feedback after 1+ sessions
      else if (userSessions >= 1) {
        setFeedbackType('launch');
        
        const timer = setTimeout(() => {
          setShowFeedback(true);
          trackLaunchInteraction('auto_feedback_prompt', 'launch');
        }, 3000);
        
        return () => clearTimeout(timer);
      }
    } else if (showType !== 'auto') {
      setFeedbackType(showType);
      setShowFeedback(true);
    }
  }, [userSessions, currentScore, showType, hasShownFeedback, trackLaunchInteraction]);

  const handleFeedbackSubmit = (feedback: any) => {
    setHasShownFeedback(true);
    setShowFeedback(false);
    
    // Store feedback with additional context
    const enhancedFeedback = {
      ...feedback,
      userSessions,
      currentScore,
      feedbackType,
      timestamp: new Date().toISOString()
    };
    
    const storageKey = feedbackType === 'soft-launch' 
      ? 'loglings-soft-launch-feedback' 
      : 'loglings-launch-feedback';
    
    const existingFeedback = JSON.parse(localStorage.getItem(storageKey) || '[]');
    existingFeedback.push(enhancedFeedback);
    localStorage.setItem(storageKey, JSON.stringify(existingFeedback));
    
    trackLaunchInteraction('feedback_submitted', feedbackType);
    toast.success('Thank you! Your feedback helps our forest grow! 🌱');
  };

  const handleSkip = () => {
    setHasShownFeedback(true);
    setShowFeedback(false);
    trackLaunchInteraction('feedback_skipped', feedbackType);
  };

  if (!showFeedback) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {feedbackType === 'soft-launch' ? (
          <SoftLaunchFeedback 
            onSubmit={handleFeedbackSubmit}
            onSkip={handleSkip}
          />
        ) : (
          <LaunchFeedbackForm 
            onSubmit={handleFeedbackSubmit}
            onSkip={handleSkip}
          />
        )}
      </div>
    </div>
  );
};

export default LaunchFeedbackCollector;
