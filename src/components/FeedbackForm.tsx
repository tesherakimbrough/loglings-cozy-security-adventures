
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Sparkles, TreePine, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

interface FeedbackFormProps {
  onSubmit: (feedback: FeedbackData) => void;
  onSkip: () => void;
}

export interface FeedbackData {
  howDidYouHear: string;
  excitingFeatures: string;
  suggestions: string;
  experience: number; // 1-5 hearts rating
}

const FeedbackForm = ({ onSubmit, onSkip }: FeedbackFormProps) => {
  const [feedback, setFeedback] = useState<FeedbackData>({
    howDidYouHear: '',
    excitingFeatures: '',
    suggestions: '',
    experience: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const feedbackList = JSON.parse(localStorage.getItem('loglings-feedback') || '[]');
    feedbackList.push({
      ...feedback,
      timestamp: new Date().toISOString(),
      id: crypto.randomUUID()
    });
    localStorage.setItem('loglings-feedback', JSON.stringify(feedbackList));
    
    setIsSubmitting(false);
    onSubmit(feedback);
    toast.success('Your thoughts help our forest grow! 🌱');
  };

  const setRating = (rating: number) => {
    setFeedback(prev => ({ ...prev, experience: rating }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto cozy-card animate-fade-in">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-400 to-amber-400 rounded-full flex items-center justify-center animate-gentle-bounce">
          <TreePine className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-primary">Help Our Forest Grow! 🌸</CardTitle>
        <p className="text-muted-foreground">
          Your thoughts and dreams help us shape the most magical cybersecurity learning experience
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Experience Rating */}
          <div className="text-center space-y-3">
            <label className="block text-sm font-medium text-foreground">
              How did joining our waitlist feel?
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setRating(rating)}
                  className="p-2 transition-all duration-200 hover:scale-110"
                >
                  <Heart 
                    className={`w-8 h-8 ${
                      rating <= feedback.experience 
                        ? 'text-rose-500 fill-rose-500' 
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* How did you hear about us */}
          <div>
            <label htmlFor="howDidYouHear" className="block text-sm font-medium text-foreground mb-2">
              How did you discover our cozy forest? (optional)
            </label>
            <Input
              id="howDidYouHear"
              placeholder="Twitter, friend, wandering the internet..."
              value={feedback.howDidYouHear}
              onChange={(e) => setFeedback(prev => ({ ...prev, howDidYouHear: e.target.value }))}
              className="cozy-card"
            />
          </div>

          {/* Exciting features */}
          <div>
            <label htmlFor="excitingFeatures" className="block text-sm font-medium text-foreground mb-2">
              What features make your heart sparkle? (optional)
            </label>
            <Textarea
              id="excitingFeatures"
              placeholder="Cozy learning, ambient sounds, gentle gamification..."
              value={feedback.excitingFeatures}
              onChange={(e) => setFeedback(prev => ({ ...prev, excitingFeatures: e.target.value }))}
              className="cozy-card min-h-[80px]"
            />
          </div>

          {/* Suggestions */}
          <div>
            <label htmlFor="suggestions" className="block text-sm font-medium text-foreground mb-2">
              What would make your forest adventure even more magical? (optional)
            </label>
            <Textarea
              id="suggestions"
              placeholder="More Loglings, different music, new learning paths..."
              value={feedback.suggestions}
              onChange={(e) => setFeedback(prev => ({ ...prev, suggestions: e.target.value }))}
              className="cozy-card min-h-[80px]"
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
