
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Sparkles, TreePine, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useLaunchAnalytics } from '../hooks/useLaunchAnalytics';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { sanitizeHtml, validateTextInput, rateLimiter, logSecurityEvent } from '../utils/securityUtils';
import { useAdvancedErrorHandling } from '../hooks/useAdvancedErrorHandling';

interface FeedbackFormProps {
  onSubmit: (feedback: FeedbackData) => void;
  onSkip: () => void;
}

export interface FeedbackData {
  howDidYouHear: string;
  excitingFeatures: string;
  suggestions: string;
  experience: number;
  accessibility: number;
  technicalFeedback: string;
}

const FeedbackForm = ({ onSubmit, onSkip }: FeedbackFormProps) => {
  const { trackFeedbackSubmission, trackAccessibilityUsage } = useLaunchAnalytics();
  const { announceToScreenReader } = useKeyboardNavigation();
  const { logAdvancedError } = useAdvancedErrorHandling();
  
  const [feedback, setFeedback] = useState<FeedbackData>({
    howDidYouHear: '',
    excitingFeatures: '',
    suggestions: '',
    experience: 0,
    accessibility: 0,
    technicalFeedback: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  // Enhanced input validation with security checks
  const validateInput = (field: string, value: string): string[] => {
    const maxLengths = {
      howDidYouHear: 200,
      excitingFeatures: 1000,
      suggestions: 1000,
      technicalFeedback: 1000
    };

    const validation = validateTextInput(
      value, 
      0, 
      maxLengths[field as keyof typeof maxLengths] || 1000,
      false // Don't allow HTML
    );

    if (!validation.isValid) {
      logSecurityEvent('failed_validation', { 
        field, 
        reason: 'input_validation_failed',
        errors: validation.errors 
      });
    }

    return validation.errors;
  };

  // Secure input handler with sanitization
  const handleInputChange = (field: keyof FeedbackData, value: string | number) => {
    if (typeof value === 'string') {
      // Sanitize string inputs
      const sanitizedValue = sanitizeHtml(value);
      
      // Validate input
      const errors = validateInput(field, sanitizedValue);
      setValidationErrors(prev => ({ ...prev, [field]: errors }));
      
      setFeedback(prev => ({ ...prev, [field]: sanitizedValue }));
    } else {
      // Handle numeric inputs (ratings)
      if (value >= 1 && value <= 5) {
        setFeedback(prev => ({ ...prev, [field]: value }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting for feedback submissions
    const rateLimitKey = 'feedback-submission';
    if (!rateLimiter.isAllowed(rateLimitKey, 3, 300000)) { // 3 submissions per 5 minutes
      const remainingTime = rateLimiter.getRemainingTime(rateLimitKey);
      logSecurityEvent('rate_limit_exceeded', { action: 'feedback_submission', remainingTime });
      toast.error(`Please wait ${Math.ceil(remainingTime / 1000)} seconds before submitting again.`);
      return;
    }

    // Validate all fields
    let hasErrors = false;
    const newValidationErrors: Record<string, string[]> = {};

    Object.entries(feedback).forEach(([field, value]) => {
      if (typeof value === 'string' && value.length > 0) {
        const errors = validateInput(field, value);
        if (errors.length > 0) {
          newValidationErrors[field] = errors;
          hasErrors = true;
        }
      }
    });

    setValidationErrors(newValidationErrors);

    if (hasErrors) {
      toast.error('Please fix the validation errors before submitting.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      announceToScreenReader('Submitting your feedback to the forest council...');
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const enhancedFeedback = {
        ...feedback,
        timestamp: new Date().toISOString(),
        id: crypto.randomUUID(),
        sessionId: sessionStorage.getItem('loglings-launch-session'),
        version: 'enhanced-launch',
        securityValidated: true
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
      
    } catch (error) {
      logAdvancedError(error as Error, {
        component: 'FeedbackForm',
        action: 'submit',
        securityLevel: 'medium',
        additionalData: { feedbackLength: JSON.stringify(feedback).length }
      });
      
      setIsSubmitting(false);
      toast.error('Failed to submit feedback. Please try again.');
    }
  };

  const setRating = (type: 'experience' | 'accessibility', rating: number) => {
    handleInputChange(type, rating);
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
          const isSelected = rating <= value;
          return (
            <button
              key={rating}
              type="button"
              role="radio"
              aria-checked={rating === value}
              aria-label={`${rating} out of 5`}
              onClick={() => onChange(rating)}
              className={`p-2 transition-all duration-200 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg cursor-pointer ${
                isSelected ? 'transform scale-105' : ''
              }`}
              tabIndex={0}
            >
              <IconComponent 
                className={`w-8 h-8 transition-colors ${
                  isSelected
                    ? icon === Heart ? 'text-rose-500 fill-rose-500' : 'text-amber-500 fill-amber-500'
                    : 'text-gray-300 dark:text-gray-600 hover:text-gray-400 dark:hover:text-gray-500'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );

  const InputField = ({ 
    id, 
    label, 
    value, 
    onChange, 
    placeholder, 
    isTextarea = false,
    minHeight = 'min-h-[80px]'
  }: {
    id: keyof FeedbackData;
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    isTextarea?: boolean;
    minHeight?: string;
  }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-accessible-primary mb-2">
        {label}
      </label>
      {isTextarea ? (
        <Textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`cozy-card ${minHeight} text-accessible-primary ${
            validationErrors[id]?.length ? 'border-red-500' : ''
          }`}
        />
      ) : (
        <Input
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`cozy-card text-accessible-primary ${
            validationErrors[id]?.length ? 'border-red-500' : ''
          }`}
        />
      )}
      {validationErrors[id]?.length > 0 && (
        <div className="mt-1 text-red-500 text-xs">
          {validationErrors[id].map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}
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
          <InputField
            id="howDidYouHear"
            label="How did you discover our cozy forest? (optional)"
            value={feedback.howDidYouHear}
            onChange={(value) => handleInputChange('howDidYouHear', value)}
            placeholder="Twitter, friend, wandering the internet..."
          />

          {/* Exciting features */}
          <InputField
            id="excitingFeatures"
            label="What features make your heart sparkle? (optional)"
            value={feedback.excitingFeatures}
            onChange={(value) => handleInputChange('excitingFeatures', value)}
            placeholder="Cozy learning, ambient sounds, gentle gamification, Logling friends..."
            isTextarea={true}
          />

          {/* Suggestions */}
          <InputField
            id="suggestions"
            label="What would make your forest adventure even more magical? (optional)"
            value={feedback.suggestions}
            onChange={(value) => handleInputChange('suggestions', value)}
            placeholder="More Loglings, different music, new learning paths, accessibility features..."
            isTextarea={true}
          />

          {/* Technical Feedback */}
          <InputField
            id="technicalFeedback"
            label="Any technical thoughts or accessibility needs? (optional)"
            value={feedback.technicalFeedback}
            onChange={(value) => handleInputChange('technicalFeedback', value)}
            placeholder="Screen reader compatibility, keyboard navigation, visual considerations..."
            isTextarea={true}
            minHeight="min-h-[60px]"
          />

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
