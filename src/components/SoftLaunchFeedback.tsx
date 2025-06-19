
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, TreePine, MessageSquare, Users, Target } from 'lucide-react';
import { toast } from 'sonner';
import { useLaunchAnalytics } from '../hooks/useLaunchAnalytics';

interface SoftLaunchFeedbackProps {
  onSubmit: (feedback: SoftLaunchData) => void;
  onSkip: () => void;
}

export interface SoftLaunchData {
  launchReadiness: number; // 1-5 rating
  mostValuableFeature: string;
  biggestPainPoint: string;
  monetizationWillingness: number; // 1-5 rating
  recommendationLikelihood: number; // 1-5 rating
  targetAudience: string;
  competitorComparison: string;
  urgentFixes: string;
}

const SoftLaunchFeedback = ({ onSubmit, onSkip }: SoftLaunchFeedbackProps) => {
  const { trackFeedbackSubmission } = useLaunchAnalytics();
  
  const [feedback, setFeedback] = useState<SoftLaunchData>({
    launchReadiness: 0,
    mostValuableFeature: '',
    biggestPainPoint: '',
    monetizationWillingness: 0,
    recommendationLikelihood: 0,
    targetAudience: '',
    competitorComparison: '',
    urgentFixes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Store with enhanced metadata for soft launch analysis
    const enhancedFeedback = {
      ...feedback,
      timestamp: new Date().toISOString(),
      id: crypto.randomUUID(),
      feedbackType: 'soft_launch_readiness',
      sessionId: sessionStorage.getItem('loglings-launch-session'),
      version: 'soft-launch-beta'
    };
    
    const feedbackList = JSON.parse(localStorage.getItem('loglings-soft-launch-feedback') || '[]');
    feedbackList.push(enhancedFeedback);
    localStorage.setItem('loglings-soft-launch-feedback', JSON.stringify(feedbackList));
    
    trackFeedbackSubmission('soft_launch', feedback.launchReadiness);
    
    setIsSubmitting(false);
    onSubmit(feedback);
    toast.success('Thank you! Your insights help shape our launch strategy 🚀');
  };

  const setRating = (category: keyof SoftLaunchData, rating: number) => {
    setFeedback(prev => ({ ...prev, [category]: rating }));
  };

  const StarRating = ({ 
    value, 
    onChange, 
    label, 
    description 
  }: { 
    value: number; 
    onChange: (rating: number) => void; 
    label: string;
    description: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-accessible-primary">
        {label}
      </label>
      <p className="text-xs text-accessible-secondary">{description}</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(rating)}
            className="p-1 transition-all duration-200 hover:scale-110 focus-visible:scale-110 rounded"
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
        <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center animate-gentle-bounce">
          <Target className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl cozy-heading flex items-center justify-center gap-2">
          <TreePine className="w-6 h-6" />
          Soft Launch Assessment
          <Heart className="w-6 h-6 text-rose-500" />
        </CardTitle>
        <p className="text-accessible-secondary text-lg">
          Help us understand if Loglings is ready for the world!
        </p>
        <Badge variant="secondary" className="mx-auto">
          Critical for Launch Decision
        </Badge>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Launch Readiness Rating */}
          <div className="p-6 rounded-xl welcome-highlight-box">
            <h3 className="text-xl font-semibold cozy-heading mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Launch Readiness Assessment
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <StarRating
                value={feedback.launchReadiness}
                onChange={(rating) => setRating('launchReadiness', rating)}
                label="Ready for Public Launch?"
                description="How ready do you think Loglings is for public release?"
              />
              
              <StarRating
                value={feedback.recommendationLikelihood}
                onChange={(rating) => setRating('recommendationLikelihood', rating)}
                label="Would Recommend to Others?"
                description="How likely are you to recommend Loglings to friends/colleagues?"
              />
            </div>
          </div>

          {/* Key Insights */}
          <div className="p-6 rounded-xl welcome-highlight-box">
            <h3 className="text-xl font-semibold cozy-heading mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Key Insights
            </h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="mostValuableFeature" className="block text-sm font-medium text-accessible-primary mb-2">
                  What's the most valuable feature? *
                </label>
                <Textarea
                  id="mostValuableFeature"
                  placeholder="The cozy learning environment, Logling characters, cybersecurity content..."
                  value={feedback.mostValuableFeature}
                  onChange={(e) => setFeedback(prev => ({ ...prev, mostValuableFeature: e.target.value }))}
                  className="cozy-card min-h-[80px] text-accessible-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="biggestPainPoint" className="block text-sm font-medium text-accessible-primary mb-2">
                  What's the biggest pain point? *
                </label>
                <Textarea
                  id="biggestPainPoint"
                  placeholder="Loading speed, content depth, mobile experience, navigation..."
                  value={feedback.biggestPainPoint}
                  onChange={(e) => setFeedback(prev => ({ ...prev, biggestPainPoint: e.target.value }))}
                  className="cozy-card min-h-[80px] text-accessible-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="urgentFixes" className="block text-sm font-medium text-accessible-primary mb-2">
                  What needs to be fixed before launch?
                </label>
                <Textarea
                  id="urgentFixes"
                  placeholder="Critical bugs, missing features, performance issues..."
                  value={feedback.urgentFixes}
                  onChange={(e) => setFeedback(prev => ({ ...prev, urgentFixes: e.target.value }))}
                  className="cozy-card min-h-[80px] text-accessible-primary"
                />
              </div>
            </div>
          </div>

          {/* Monetization & Market */}
          <div className="p-6 rounded-xl welcome-highlight-box">
            <h3 className="text-xl font-semibold cozy-heading mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Market & Monetization
            </h3>
            
            <div className="space-y-4">
              <StarRating
                value={feedback.monetizationWillingness}
                onChange={(rating) => setRating('monetizationWillingness', rating)}
                label="Willingness to Pay"
                description="How likely would you be to pay for premium features?"
              />

              <div>
                <label htmlFor="targetAudience" className="block text-sm font-medium text-accessible-primary mb-2">
                  Who is the ideal user?
                </label>
                <Textarea
                  id="targetAudience"
                  placeholder="Cybersecurity students, career changers, SOC analysts, educators..."
                  value={feedback.targetAudience}
                  onChange={(e) => setFeedback(prev => ({ ...prev, targetAudience: e.target.value }))}
                  className="cozy-card min-h-[60px] text-accessible-primary"
                />
              </div>

              <div>
                <label htmlFor="competitorComparison" className="block text-sm font-medium text-accessible-primary mb-2">
                  How does this compare to alternatives?
                </label>
                <Textarea
                  id="competitorComparison"
                  placeholder="Compare to TryHackMe, Cybrary, traditional courses..."
                  value={feedback.competitorComparison}
                  onChange={(e) => setFeedback(prev => ({ ...prev, competitorComparison: e.target.value }))}
                  className="cozy-card min-h-[60px] text-accessible-primary"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onSkip}
              className="flex-1"
            >
              Skip Assessment
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !feedback.mostValuableFeature.trim() || !feedback.biggestPainPoint.trim()}
              className="flex-1 logling-button"
            >
              {isSubmitting ? (
                'Analyzing feedback...'
              ) : (
                <>
                  Submit Assessment
                  <Target className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SoftLaunchFeedback;
