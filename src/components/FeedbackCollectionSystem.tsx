
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MessageSquare, Star, Heart, TrendingUp, Users, Target } from 'lucide-react';
import { toast } from 'sonner';

interface FeedbackData {
  type: 'session' | 'scenario' | 'feature' | 'bug' | 'content';
  rating: number;
  message: string;
  category?: string;
  scenarioId?: string;
  userContext: {
    sessionsPlayed: number;
    currentStreak: number;
    difficulty: string;
  };
}

interface FeedbackCollectionProps {
  trigger: 'post-session' | 'scenario-feedback' | 'manual' | 'difficulty-spike';
  scenarioId?: string;
  onSubmit?: (feedback: FeedbackData) => void;
  onClose?: () => void;
}

const FeedbackCollectionSystem = ({ 
  trigger, 
  scenarioId, 
  onSubmit, 
  onClose 
}: FeedbackCollectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackData['type']>('session');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Auto-show based on trigger conditions
    const shouldShow = checkIfShouldShow();
    if (shouldShow) {
      setIsOpen(true);
    }
  }, [trigger]);

  const checkIfShouldShow = (): boolean => {
    const lastFeedback = localStorage.getItem('loglings-last-feedback');
    const lastFeedbackTime = lastFeedback ? parseInt(lastFeedback) : 0;
    const now = Date.now();
    const hoursSince = (now - lastFeedbackTime) / (1000 * 60 * 60);

    switch (trigger) {
      case 'post-session':
        return hoursSince > 24; // Once per day max
      case 'scenario-feedback':
        return Math.random() < 0.1; // 10% chance after scenarios
      case 'difficulty-spike':
        return hoursSince > 12; // When user struggles
      case 'manual':
        return true;
      default:
        return false;
    }
  };

  const getFeedbackPrompt = () => {
    switch (trigger) {
      case 'post-session':
        return {
          title: 'How was your security journey today?',
          description: 'Help us make your learning experience even cozier!',
          defaultType: 'session' as const
        };
      case 'scenario-feedback':
        return {
          title: 'Quick scenario feedback',
          description: 'Was this scenario helpful for your learning?',
          defaultType: 'scenario' as const
        };
      case 'difficulty-spike':
        return {
          title: 'Feeling challenged?',
          description: 'We noticed this session was tough. Help us adjust!',
          defaultType: 'content' as const
        };
      default:
        return {
          title: 'Share your thoughts',
          description: 'Your feedback helps our forest grow!',
          defaultType: 'feature' as const
        };
    }
  };

  const handleSubmit = async () => {
    if (rating === 0 || !message.trim()) {
      toast.error('Please provide a rating and some feedback');
      return;
    }

    setIsSubmitting(true);

    const feedbackData: FeedbackData = {
      type: feedbackType,
      rating,
      message: message.trim(),
      scenarioId,
      userContext: {
        sessionsPlayed: parseInt(localStorage.getItem('loglings-sessions-played') || '0'),
        currentStreak: parseInt(localStorage.getItem('loglings-current-streak') || '0'),
        difficulty: localStorage.getItem('loglings-difficulty') || 'beginner'
      }
    };

    // Store feedback locally with timestamp
    const existingFeedback = JSON.parse(localStorage.getItem('loglings-user-feedback') || '[]');
    existingFeedback.push({
      ...feedbackData,
      timestamp: new Date().toISOString(),
      id: crypto.randomUUID()
    });
    localStorage.setItem('loglings-user-feedback', JSON.stringify(existingFeedback));
    localStorage.setItem('loglings-last-feedback', Date.now().toString());

    // Call parent callback
    if (onSubmit) {
      onSubmit(feedbackData);
    }

    setIsSubmitting(false);
    setIsOpen(false);
    toast.success('Thank you! Your feedback helps our forest grow 🌱');
    
    if (onClose) {
      onClose();
    }
  };

  const handleStarClick = (starValue: number) => {
    console.log('Star clicked:', starValue);
    setRating(starValue);
  };

  const StarRating = () => (
    <div className="flex gap-2 justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleStarClick(star);
          }}
          className="p-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md cursor-pointer"
          aria-label={`Rate ${star} out of 5 stars`}
        >
          <Star 
            className={`w-8 h-8 transition-colors ${
              star <= rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300 dark:text-gray-600 hover:text-yellow-300'
            }`}
          />
        </button>
      ))}
    </div>
  );

  if (!isOpen) return null;

  const prompt = getFeedbackPrompt();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md cozy-card animate-fade-in">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-xl cozy-heading">
            {prompt.title}
          </CardTitle>
          <p className="text-accessible-secondary">
            {prompt.description}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-medium">How do you feel? *</label>
            <StarRating />
            {rating > 0 && (
              <p className="text-center text-sm text-muted-foreground">
                {rating === 5 ? '🌟 Amazing!' : 
                 rating === 4 ? '😊 Great!' : 
                 rating === 3 ? '👍 Good!' : 
                 rating === 2 ? '😐 Okay' : '😕 Could be better'}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="feedback-message" className="block text-sm font-medium">
              Tell us more *
            </label>
            <Textarea
              id="feedback-message"
              placeholder="What made this experience special? What could we improve?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="cozy-card min-h-[100px]"
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsOpen(false);
                if (onClose) onClose();
              }}
              className="flex-1"
            >
              Maybe Later
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || rating === 0 || !message.trim()}
              className="flex-1 logling-button"
            >
              {isSubmitting ? 'Sending...' : 'Share Feedback'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackCollectionSystem;
