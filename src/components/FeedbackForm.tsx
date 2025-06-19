
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Sparkles, TreePine, ChevronRight, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useLaunchAnalytics } from '../hooks/useLaunchAnalytics';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';

interface FeedbackFormProps {
  onSubmit: (feedback: FeedbackData) => void;
  onSkip: () => void;
}

export interface FeedbackData {
  howDidYouHear: string;
  excitingFeatures: string;
  suggestions: string;
  experience: number; // 1-5 hearts rating
  accessibility: number; // 1-5 rating for accessibility
  technicalFeedback: string;
}

const FeedbackForm = ({ onSubmit, onSkip }: FeedbackFormProps) => {
  const { trackFeedbackSubmission, trackAccessibilityUsage } = useLaunchAnalytics();
  const { announceToScreenReader } = useKeyboardNavigation();
  
  const [feedback, setFeedback] = useState<FeedbackData>({
    howDidYouHear: '',
    excitingFeatures: '',
    suggestions: '',
    experience: 0,
    accessibility: 0,
    technicalFeedback: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    announceToScreenReader('Submitting your feedback to the forest council...');
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const enhancedFeedback = {
      ...feedback,
      timestamp: new Date().toISOString(),
      id: crypto.randomUUID(),
      sessionId: sessionStorage.getItem('loglings-launch-session'),
      version: 'enhanced-launch'
    };
    
    const feedbackList = JSON.parse(localStorage.getItem('loglings-feedback') || '[]');
    feedbackList.push(enhancedFeedback);
    localStorage.setItem('loglings-feedback', JSON.stringify(feedbackList));
    
    // Track analytics
    trackFeedbackSubmission('waitlist', feedback.experience);
    
    if (feedback.accessibility > 0) {
      trackAccessibilityUsage('feedback_rating');
    }
    
    setIsSubmitting(false);
    onSubmit(feedback);
    announceToScreenReader('Thank you! Your thoughts help our forest grow stronger.');
    toast.success('Your thoughts help our forest grow! 🌱');
  };

  const setRating = (type: 'experience' | 'accessibility', rating: number) => {
    setFeedback(prev => ({ ...prev, [type]: rating }));
    announceToScreenReader(`Set ${type} rating to ${rating} out of 5`);
  };

  const RatingComponent = ({ 
    value, 
    onChange, 
    icon, 
    label, 
    ariaLabel 
  }: { 
    value: number; 
    onChange: (rating: number) => void; 
    icon: any;
    label: string;
    ariaLabel: string;
  }) => (
    <div className="text-center space-y-3">
      <label className="block text-sm font-medium text-accessible-primary">
        {label}
      </label>
      <div className="flex justify-center gap-2" role="radiogroup" aria-label={ariaLabel}>
        {[1, 2, 3, 4, 5].map((rating) => {
          const IconComponent = icon;
          return (
            <button
              key={rating}
              type="button"
              role="radio"
              aria-checked={rating === value}
              aria-label={`${rating} out of 5`}
              onClick={() => onChange(rating)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft' && rating > 1) {
                  e.preventDefault();
                  onChange(rating - 1);
                } else if (e.key === 'ArrowRight' && rating < 5) {
                  e.preventDefault();
                  onChange(rating + 1);
                }
              }}
              className="p-2 transition-all duration-200 hover:scale-110 focus-visible:scale-110 rounded-lg"
            >
              <IconComponent 
                className={`w-8 h-8 ${
                  rating <= value 
                    ? icon === Heart ? 'text-rose-500 fill-rose-500' : 'text-warm-amber fill-warm-amber'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-2xl mx-auto cozy-card animate-fade-in">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-400 to-amber-400 rounded-full flex items-center justify-center animate-gentle-bounce">
          <TreePine className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl cozy-heading">Help Our Forest Grow! 🌸</CardTitle>
        <p className="text-accessible-secondary">
          Your thoughts and dreams help us shape the most magical cybersecurity learning experience
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Experience Rating */}
          <RatingComponent
            value={feedback.experience}
            onChange={(rating) => setRating('experience', rating)}
            icon={Heart}
            label="How did joining our waitlist feel?"
            ariaLabel="Rate your waitlist experience"
          />

          {/* Accessibility Rating */}
          <RatingComponent
            value={feedback.accessibility}
            onChange={(rating) => setRating('accessibility', rating)}
            icon={Star}
            label="How accessible did you find our forest? (Optional)"
            ariaLabel="Rate accessibility and ease of use"
          />

          {/* How did you hear about us */}
          <div>
            <label htmlFor="howDidYouHear" className="block text-sm font-medium text-accessible-primary mb-2">
              How did you discover our cozy forest? (optional)
            </label>
            <Input
              id="howDidYouHear"
              placeholder="Twitter, friend, wandering the internet..."
              value={feedback.howDidYouHear}
              onChange={(e) => setFeedback(prev => ({ ...prev, howDidYouHear: e.target.value }))}
              className="cozy-card text-accessible-primary"
              aria-describedby="howDidYouHear-help"
            />
            <p id="howDidYouHear-help" className="text-xs text-accessible-secondary mt-1">
              Help us understand how our community grows
            </p>
          </div>

          {/* Exciting features */}
          <div>
            <label htmlFor="excitingFeatures" className="block text-sm font-medium text-accessible-primary mb-2">
              What features make your heart sparkle? (optional)
            </label>
            <Textarea
              id="excitingFeatures"
              placeholder="Cozy learning, ambient sounds, gentle gamification, Logling friends..."
              value={feedback.excitingFeatures}
              onChange={(e) => setFeedback(prev => ({ ...prev, excitingFeatures: e.target.value }))}
              className="cozy-card min-h-[80px] text-accessible-primary"
            />
          </div>

          {/* Suggestions */}
          <div>
            <label htmlFor="suggestions" className="block text-sm font-medium text-accessible-primary mb-2">
              What would make your forest adventure even more magical? (optional)
            </label>
            <Textarea
              id="suggestions"
              placeholder="More Loglings, different music, new learning paths, accessibility features..."
              value={feedback.suggestions}
              onChange={(e) => setFeedback(prev => ({ ...prev, suggestions: e.target.value }))}
              className="cozy-card min-h-[80px] text-accessible-primary"
            />
          </div>

          {/* Technical Feedback */}
          <div>
            <label htmlFor="technicalFeedback" className="block text-sm font-medium text-accessible-primary mb-2">
              Any technical thoughts or accessibility needs? (optional)
            </label>
            <Textarea
              id="technicalFeedback"
              placeholder="Screen reader compatibility, keyboard navigation, visual considerations..."
              value={feedback.technicalFeedback}
              onChange={(e) => setFeedback(prev => ({ ...prev, technicalFeedback: e.target.value }))}
              className="cozy-card min-h-[60px] text-accessible-primary"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onSkip}
              className="flex-1"
            >
              Skip for now
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 logling-button"
            >
              {isSubmitting ? (
                'Planting seeds...'
              ) : (
                <>
                  Share Thoughts
                  <Sparkles className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
