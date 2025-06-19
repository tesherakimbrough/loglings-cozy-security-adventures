
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Star, TreePine, Send, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useLaunchAnalytics } from '../hooks/useLaunchAnalytics';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';

interface LaunchFeedbackFormProps {
  onSubmit: (feedback: LaunchFeedbackData) => void;
  onSkip: () => void;
}

export interface LaunchFeedbackData {
  overallExperience: number; // 1-5 stars
  easeOfUse: number; // 1-5 stars
  visualDesign: number; // 1-5 stars
  learningValue: number; // 1-5 stars
  mostEnjoyedFeature: string;
  improvementSuggestions: string;
  premiumInterest: number; // 1-5 scale
  recommendToFriend: number; // 1-5 scale
  additionalComments: string;
  technicalIssues: string;
}

const LaunchFeedbackForm = ({ onSubmit, onSkip }: LaunchFeedbackFormProps) => {
  const { trackFeedbackSubmission, trackPremiumInterest } = useLaunchAnalytics();
  const { announceToScreenReader } = useKeyboardNavigation();
  
  const [feedback, setFeedback] = useState<LaunchFeedbackData>({
    overallExperience: 0,
    easeOfUse: 0,
    visualDesign: 0,
    learningValue: 0,
    mostEnjoyedFeature: '',
    improvementSuggestions: '',
    premiumInterest: 0,
    recommendToFriend: 0,
    additionalComments: '',
    technicalIssues: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    { title: 'Your Experience', icon: Heart },
    { title: 'Your Thoughts', icon: Sparkles },
    { title: 'Future Together', icon: TreePine }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    announceToScreenReader('Submitting your cozy feedback...');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store feedback with enhanced metadata
    const enhancedFeedback = {
      ...feedback,
      timestamp: new Date().toISOString(),
      id: crypto.randomUUID(),
      sessionId: sessionStorage.getItem('loglings-launch-session'),
      userAgent: navigator.userAgent,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      launchVersion: 'early-access-1.0'
    };
    
    const feedbackList = JSON.parse(localStorage.getItem('loglings-launch-feedback') || '[]');
    feedbackList.push(enhancedFeedback);
    localStorage.setItem('loglings-launch-feedback', JSON.stringify(feedbackList));
    
    // Track analytics
    trackFeedbackSubmission('launch_comprehensive', feedback.overallExperience);
    
    if (feedback.premiumInterest >= 4) {
      trackPremiumInterest('feedback_form_high_interest');
    }
    
    setIsSubmitting(false);
    onSubmit(feedback);
    announceToScreenReader('Thank you! Your feedback helps our forest grow stronger.');
    toast.success('Your cozy feedback has been planted in our garden! 🌱✨');
  };

  const setRating = (category: keyof LaunchFeedbackData, rating: number) => {
    setFeedback(prev => ({ ...prev, [category]: rating }));
    announceToScreenReader(`Set ${category} rating to ${rating} out of 5 stars`);
  };

  const RatingStars = ({ 
    value, 
    onChange, 
    label, 
    ariaLabel 
  }: { 
    value: number; 
    onChange: (rating: number) => void; 
    label: string;
    ariaLabel: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-accessible-primary">
        {label}
      </label>
      <div className="flex gap-1" role="radiogroup" aria-label={ariaLabel}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            role="radio"
            aria-checked={rating === value}
            aria-label={`${rating} out of 5 stars`}
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
            <Star 
              className={`w-6 h-6 ${
                rating <= value 
                  ? 'text-warm-amber fill-warm-amber' 
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-3xl mx-auto cozy-card animate-fade-in">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-400 to-amber-400 rounded-full flex items-center justify-center animate-gentle-bounce">
          <TreePine className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl cozy-heading">
          Help Shape Our Cozy Forest! 🌸
        </CardTitle>
        <p className="text-accessible-secondary text-lg">
          Your thoughts help us create the most magical cybersecurity learning experience
        </p>
        
        {/* Progress indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index <= currentSection 
                  ? 'bg-leaf-glow' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label={`Section ${index + 1}: ${section.title}`}
            />
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Experience Ratings */}
          {currentSection >= 0 && (
            <div className="space-y-6 p-6 rounded-xl welcome-highlight-box">
              <h3 className="text-xl font-semibold cozy-heading flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Your Experience
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <RatingStars
                  value={feedback.overallExperience}
                  onChange={(rating) => setRating('overallExperience', rating)}
                  label="Overall Experience"
                  ariaLabel="Rate your overall experience"
                />
                
                <RatingStars
                  value={feedback.easeOfUse}
                  onChange={(rating) => setRating('easeOfUse', rating)}
                  label="Ease of Use"
                  ariaLabel="Rate how easy it was to use"
                />
                
                <RatingStars
                  value={feedback.visualDesign}
                  onChange={(rating) => setRating('visualDesign', rating)}
                  label="Visual Design & Coziness"
                  ariaLabel="Rate the visual design and coziness"
                />
                
                <RatingStars
                  value={feedback.learningValue}
                  onChange={(rating) => setRating('learningValue', rating)}
                  label="Learning Value"
                  ariaLabel="Rate the learning value"
                />
              </div>
            </div>
          )}

          {/* Section 2: Detailed Feedback */}
          {currentSection >= 1 && (
            <div className="space-y-6 p-6 rounded-xl welcome-highlight-box">
              <h3 className="text-xl font-semibold cozy-heading flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Your Thoughts
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="mostEnjoyedFeature" className="block text-sm font-medium text-accessible-primary mb-2">
                    What feature made your heart sparkle the most?
                  </label>
                  <Textarea
                    id="mostEnjoyedFeature"
                    placeholder="The cozy forest atmosphere, learning with Loglings, gentle gamification..."
                    value={feedback.mostEnjoyedFeature}
                    onChange={(e) => setFeedback(prev => ({ ...prev, mostEnjoyedFeature: e.target.value }))}
                    className="cozy-card min-h-[80px] text-accessible-primary"
                    aria-describedby="mostEnjoyedFeature-help"
                  />
                  <p id="mostEnjoyedFeature-help" className="text-xs text-accessible-secondary mt-1">
                    Help us understand what brings you the most joy
                  </p>
                </div>

                <div>
                  <label htmlFor="improvementSuggestions" className="block text-sm font-medium text-accessible-primary mb-2">
                    How can we make your forest adventure even more magical?
                  </label>
                  <Textarea
                    id="improvementSuggestions"
                    placeholder="More Logling personalities, different ambient sounds, new learning paths..."
                    value={feedback.improvementSuggestions}
                    onChange={(e) => setFeedback(prev => ({ ...prev, improvementSuggestions: e.target.value }))}
                    className="cozy-card min-h-[80px] text-accessible-primary"
                  />
                </div>

                <div>
                  <label htmlFor="technicalIssues" className="block text-sm font-medium text-accessible-primary mb-2">
                    Did you encounter any technical hiccups? (Optional)
                  </label>
                  <Textarea
                    id="technicalIssues"
                    placeholder="Slow loading, audio issues, visual glitches..."
                    value={feedback.technicalIssues}
                    onChange={(e) => setFeedback(prev => ({ ...prev, technicalIssues: e.target.value }))}
                    className="cozy-card min-h-[60px] text-accessible-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Future & Premium */}
          {currentSection >= 2 && (
            <div className="space-y-6 p-6 rounded-xl welcome-highlight-box">
              <h3 className="text-xl font-semibold cozy-heading flex items-center gap-2">
                <TreePine className="w-5 h-5" />
                Our Future Together
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <RatingStars
                  value={feedback.premiumInterest}
                  onChange={(rating) => setRating('premiumInterest', rating)}
                  label="Interest in Premium Features"
                  ariaLabel="Rate your interest in premium features"
                />
                
                <RatingStars
                  value={feedback.recommendToFriend}
                  onChange={(rating) => setRating('recommendToFriend', rating)}
                  label="Would Recommend to Friends"
                  ariaLabel="Rate likelihood to recommend to friends"
                />
              </div>

              <div>
                <label htmlFor="additionalComments" className="block text-sm font-medium text-accessible-primary mb-2">
                  Any other thoughts to share with our forest council?
                </label>
                <Textarea
                  id="additionalComments"
                  placeholder="Dreams, wishes, or stories from your adventure..."
                  value={feedback.additionalComments}
                  onChange={(e) => setFeedback(prev => ({ ...prev, additionalComments: e.target.value }))}
                  className="cozy-card min-h-[80px] text-accessible-primary"
                />
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-6">
            {currentSection < 2 ? (
              <Button
                type="button"
                onClick={() => setCurrentSection(prev => prev + 1)}
                className="flex-1 logling-button"
                disabled={
                  (currentSection === 0 && feedback.overallExperience === 0) ||
                  (currentSection === 1 && !feedback.mostEnjoyedFeature.trim())
                }
              >
                Continue Journey
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <>
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
                  disabled={isSubmitting || feedback.overallExperience === 0}
                  className="flex-1 logling-button"
                >
                  {isSubmitting ? (
                    'Planting wisdom...'
                  ) : (
                    <>
                      Share Thoughts
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
          
          {currentSection > 0 && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setCurrentSection(prev => prev - 1)}
              className="w-full text-accessible-secondary"
            >
              ← Go back
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default LaunchFeedbackForm;
