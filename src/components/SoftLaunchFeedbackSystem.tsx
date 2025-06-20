import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Star, Send, MessageSquare, TrendingUp, Users } from 'lucide-react';
import { toast } from 'sonner';
import { useUserProfile } from '../hooks/useUserProfile';

interface SoftLaunchFeedback {
  // User Experience
  difficultyRating: number; // 1-5 scale
  engagementRating: number; // 1-5 scale
  clarityRating: number; // 1-5 scale
  
  // Specific Questions
  difficultyProgression: 'too-slow' | 'just-right' | 'too-fast';
  mostEnjoyableAspect: string;
  mostConfusingAspect: string;
  
  // Learning Effectiveness
  confidenceIncrease: number; // 1-5 scale
  realWorldRelevance: number; // 1-5 scale
  wouldRecommend: number; // 1-5 scale
  
  // Feature Feedback
  favoriteFeatures: string[];
  missingFeatures: string;
  
  // Open Feedback
  generalFeedback: string;
  bugReports: string;
  
  // Demographics
  experienceLevel: 'complete-beginner' | 'some-experience' | 'intermediate' | 'advanced';
  primaryGoal: 'learn-basics' | 'career-change' | 'skill-improvement' | 'curiosity' | 'certification';
  
  // Metadata
  sessionCount: number;
  userId: string;
  timestamp: string;
}

interface SoftLaunchFeedbackSystemProps {
  trigger: 'session-complete' | 'manual' | 'exit-intent';
  sessionData?: any;
  onClose: () => void;
}

const SoftLaunchFeedbackSystem = ({ trigger, sessionData, onClose }: SoftLaunchFeedbackSystemProps) => {
  const { profile } = useUserProfile();
  const [currentStep, setCurrentStep] = useState(0);
  const [feedback, setFeedback] = useState<Partial<SoftLaunchFeedback>>({
    favoriteFeatures: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    {
      id: 'experience-rating',
      title: 'Your Experience So Far',
      description: 'Help us understand how Loglings feels to you'
    },
    {
      id: 'learning-effectiveness',
      title: 'Learning & Growth',
      description: 'Tell us about your learning journey'
    },
    {
      id: 'features-feedback',
      title: 'Features & Improvements',
      description: 'What\'s working and what could be better?'
    },
    {
      id: 'open-feedback',
      title: 'Your Thoughts',
      description: 'Anything else you\'d like to share?'
    }
  ];

  const handleRatingChange = (field: keyof SoftLaunchFeedback, value: number) => {
    setFeedback(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureToggle = (feature: string, checked: boolean) => {
    setFeedback(prev => ({
      ...prev,
      favoriteFeatures: checked 
        ? [...(prev.favoriteFeatures || []), feature]
        : (prev.favoriteFeatures || []).filter(f => f !== feature)
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Generate a consistent user identifier based on session data
    const userId = `anonymous_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const completeFeedback: SoftLaunchFeedback = {
      ...feedback,
      sessionCount: profile.progress.totalSessions,
      userId,
      timestamp: new Date().toISOString(),
    } as SoftLaunchFeedback;

    // Store feedback locally for now (in production, send to analytics service)
    const existingFeedback = JSON.parse(localStorage.getItem('loglings-soft-launch-feedback') || '[]');
    existingFeedback.push(completeFeedback);
    localStorage.setItem('loglings-soft-launch-feedback', JSON.stringify(existingFeedback));

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Thank you for your valuable feedback! 🌟', {
      description: 'Your insights help us create a better learning experience for everyone.'
    });
    
    setIsSubmitting(false);
    onClose();
  };

  const renderRatingStars = (currentRating: number, onChange: (rating: number) => void) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className="p-1 transition-colors"
        >
          <Star 
            className={`w-6 h-6 ${
              star <= currentRating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300 hover:text-yellow-400'
            }`}
          />
        </button>
      ))}
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">How would you rate the difficulty progression?</Label>
                {renderRatingStars(feedback.difficultyRating || 0, (rating) => handleRatingChange('difficultyRating', rating))}
                <p className="text-sm text-muted-foreground mt-1">1 = Too easy, 5 = Too hard</p>
              </div>

              <div>
                <Label className="text-base font-medium">How engaging did you find the scenarios?</Label>
                {renderRatingStars(feedback.engagementRating || 0, (rating) => handleRatingChange('engagementRating', rating))}
                <p className="text-sm text-muted-foreground mt-1">1 = Boring, 5 = Very engaging</p>
              </div>

              <div>
                <Label className="text-base font-medium">How clear were the explanations?</Label>
                {renderRatingStars(feedback.clarityRating || 0, (rating) => handleRatingChange('clarityRating', rating))}
                <p className="text-sm text-muted-foreground mt-1">1 = Confusing, 5 = Very clear</p>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">The difficulty progression felt:</Label>
              <RadioGroup 
                value={feedback.difficultyProgression || ''} 
                onValueChange={(value) => setFeedback(prev => ({ ...prev, difficultyProgression: value as any }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="too-slow" id="too-slow" />
                  <Label htmlFor="too-slow">Too gradual (I got bored)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="just-right" id="just-right" />
                  <Label htmlFor="just-right">Just right (perfect challenge)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="too-fast" id="too-fast" />
                  <Label htmlFor="too-fast">Too steep (I felt overwhelmed)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Do you feel more confident about cybersecurity after using Loglings?</Label>
              {renderRatingStars(feedback.confidenceIncrease || 0, (rating) => handleRatingChange('confidenceIncrease', rating))}
              <p className="text-sm text-muted-foreground mt-1">1 = No change, 5 = Much more confident</p>
            </div>

            <div>
              <Label className="text-base font-medium">How relevant are the scenarios to real-world situations?</Label>
              {renderRatingStars(feedback.realWorldRelevance || 0, (rating) => handleRatingChange('realWorldRelevance', rating))}
              <p className="text-sm text-muted-foreground mt-1">1 = Not realistic, 5 = Very realistic</p>
            </div>

            <div>
              <Label className="text-base font-medium">Would you recommend Loglings to a friend?</Label>
              {renderRatingStars(feedback.wouldRecommend || 0, (rating) => handleRatingChange('wouldRecommend', rating))}
              <p className="text-sm text-muted-foreground mt-1">1 = Definitely not, 5 = Absolutely yes</p>
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">What's your experience level with cybersecurity?</Label>
              <RadioGroup 
                value={feedback.experienceLevel || ''} 
                onValueChange={(value) => setFeedback(prev => ({ ...prev, experienceLevel: value as any }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="complete-beginner" id="complete-beginner" />
                  <Label htmlFor="complete-beginner">Complete beginner</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="some-experience" id="some-experience" />
                  <Label htmlFor="some-experience">Some exposure to security concepts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate">Intermediate knowledge</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced">Advanced/Professional</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-3 block">Which features do you enjoy most? (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'The Logling characters',
                  'Story-based scenarios',
                  'Gentle explanations',
                  'Progress tracking',
                  'Achievement system',
                  'Daily challenges',
                  'Learning tips',
                  'Real-world context'
                ].map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={feedback.favoriteFeatures?.includes(feature) || false}
                      onCheckedChange={(checked) => handleFeatureToggle(feature, checked as boolean)}
                    />
                    <Label htmlFor={feature} className="text-sm">{feature}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="missing-features" className="text-base font-medium">What features would you like to see added?</Label>
              <Textarea
                id="missing-features"
                placeholder="Tell us about features that would make your learning experience even better..."
                value={feedback.missingFeatures || ''}
                onChange={(e) => setFeedback(prev => ({ ...prev, missingFeatures: e.target.value }))}
                className="mt-2"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="most-enjoyable" className="text-base font-medium">What aspect of Loglings do you enjoy most?</Label>
              <Input
                id="most-enjoyable"
                placeholder="The characters, the stories, the learning style..."
                value={feedback.mostEnjoyableAspect || ''}
                onChange={(e) => setFeedback(prev => ({ ...prev, mostEnjoyableAspect: e.target.value }))}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="most-confusing" className="text-base font-medium">What aspect is most confusing or could be improved?</Label>
              <Input
                id="most-confusing"
                placeholder="Anything that felt unclear or frustrating..."
                value={feedback.mostConfusingAspect || ''}
                onChange={(e) => setFeedback(prev => ({ ...prev, mostConfusingAspect: e.target.value }))}
                className="mt-2"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="general-feedback" className="text-base font-medium">Any other thoughts about your Loglings experience?</Label>
              <Textarea
                id="general-feedback"
                placeholder="What you love, what could be better, ideas for improvement..."
                value={feedback.generalFeedback || ''}
                onChange={(e) => setFeedback(prev => ({ ...prev, generalFeedback: e.target.value }))}
                className="mt-2"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="bug-reports" className="text-base font-medium">Did you encounter any bugs or technical issues?</Label>
              <Textarea
                id="bug-reports"
                placeholder="Describe any problems you experienced..."
                value={feedback.bugReports || ''}
                onChange={(e) => setFeedback(prev => ({ ...prev, bugReports: e.target.value }))}
                className="mt-2"
                rows={3}
              />
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 p-4 rounded-xl">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Thank You for Being a Beta Explorer! 🌟
              </h4>
              <p className="text-sm">
                Your feedback directly shapes how we build Loglings. As one of our early users, 
                you're helping create a more gentle and effective way to learn cybersecurity.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto cozy-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-accent" />
          Share Your Loglings Experience
        </CardTitle>
        <p className="text-muted-foreground">
          {steps[currentStep].description} (Step {currentStep + 1} of {steps.length})
        </p>
        <div className="w-full bg-muted/50 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {renderCurrentStep()}
        
        <div className="flex justify-between">
          {currentStep > 0 ? (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </Button>
          ) : (
            <Button variant="ghost" onClick={onClose}>
              Skip
            </Button>
          )}
          
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="logling-button"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="logling-button"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Submit Feedback
                </div>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SoftLaunchFeedbackSystem;
