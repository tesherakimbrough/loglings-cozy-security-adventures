
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Send, X } from 'lucide-react';
import { toast } from 'sonner';
import { sanitizeHtml, validateTextInput, rateLimiter } from '../utils/securityUtils';
import { useMobileOptimization } from '../hooks/useMobileOptimization';

interface FeedbackFormProps {
  onSubmit: (feedback: any) => void;
  onClose: () => void;
  initialData?: any;
}

const FeedbackForm = ({ onSubmit, onClose, initialData }: FeedbackFormProps) => {
  const { shouldUseCompactLayout } = useMobileOptimization();
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [feedback, setFeedback] = useState(initialData?.feedback || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [name, setName] = useState(initialData?.name || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    const userKey = `feedback_${email || 'anonymous'}`;
    if (!rateLimiter.isAllowed(userKey, 3, 300000)) { // 3 attempts per 5 minutes
      const remainingTime = Math.ceil(rateLimiter.getRemainingTime(userKey) / 1000 / 60);
      toast.error(`Too many feedback submissions. Please wait ${remainingTime} minutes before trying again.`);
      return;
    }

    // Enhanced input validation
    const feedbackValidation = validateTextInput(feedback, 10, 1000);
    const nameValidation = validateTextInput(name, 0, 100);
    
    if (!feedbackValidation.isValid) {
      toast.error(`Feedback validation failed: ${feedbackValidation.errors.join(', ')}`);
      return;
    }
    
    if (!nameValidation.isValid) {
      toast.error(`Name validation failed: ${nameValidation.errors.join(', ')}`);
      return;
    }

    if (rating === 0) {
      toast.error('Please provide a rating before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Sanitize all inputs
      const sanitizedData = {
        rating,
        feedback: sanitizeHtml(feedback.trim()),
        email: email.trim(),
        name: sanitizeHtml(name.trim()),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent.substring(0, 200), // Limit length
        url: window.location.href.substring(0, 500) // Limit length
      };

      await onSubmit(sanitizedData);
      toast.success('Thank you for your feedback! 🌟');
      onClose();
    } catch (error) {
      console.error('Feedback submission error:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={`w-full ${shouldUseCompactLayout ? 'max-w-sm' : 'max-w-md'} mx-auto cozy-card`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg md:text-xl">Share Your Experience</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4 md:space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating Section - Mobile Optimized */}
          <div className="space-y-2">
            <Label className="text-sm md:text-base">How would you rate your experience?</Label>
            <div className="flex justify-center gap-1 md:gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 md:p-2 touch-manipulation"
                >
                  <Star 
                    className={`w-6 h-6 md:w-8 md:h-8 transition-colors ${
                      star <= rating 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300 hover:text-yellow-400'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Text */}
          <div className="space-y-2">
            <Label htmlFor="feedback" className="text-sm md:text-base">
              Tell us more about your experience
            </Label>
            <Textarea
              id="feedback"
              placeholder="What did you love? What could we improve?"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[80px] md:min-h-[100px] text-base resize-none"
              maxLength={1000}
              required
            />
            <div className="text-xs text-muted-foreground text-right">
              {feedback.length}/1000 characters
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm md:text-base">Name (Optional)</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 md:h-auto text-base"
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm md:text-base">Email (Optional)</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 md:h-auto text-base"
                maxLength={254}
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="w-full logling-button h-12 md:h-auto text-base"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Send Feedback
              </div>
            )}
          </Button>
        </form>

        {/* Privacy Note */}
        <div className="text-xs text-muted-foreground text-center border-t pt-3">
          Your feedback helps us improve Loglings. We respect your privacy and won't spam you.
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
