
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
import { useI18n } from '../hooks/useI18n';

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
  const { t } = useI18n();
  const [currentStep, setCurrentStep] = useState(0);
  const [feedback, setFeedback] = useState<Partial<SoftLaunchFeedback>>({
    favoriteFeatures: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    {
      id: 'experience-rating',
      title: t.yourExperienceSoFar,
      description: t.helpUsUnderstand
    },
    {
      id: 'learning-effectiveness',
      title: t.learningAndGrowth,
      description: t.tellUsAboutJourney
    },
    {
      id: 'features-feedback',
      title: t.featuresAndImprovements,
      description: t.whatsWorking
    },
    {
      id: 'open-feedback',
      title: t.yourThoughts,
      description: t.anythingElse
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
    
    toast.success(t.valuableFeedback, {
      description: t.helpsBetter
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
                <Label className="text-base font-medium">{t.rateDifficulty}</Label>
                {renderRatingStars(feedback.difficultyRating || 0, (rating) => handleRatingChange('difficultyRating', rating))}
                <p className="text-sm text-muted-foreground mt-1">1 = {t.tooEasy}, 5 = {t.tooHard}</p>
              </div>

              <div>
                <Label className="text-base font-medium">{t.howEngaging}</Label>
                {renderRatingStars(feedback.engagementRating || 0, (rating) => handleRatingChange('engagementRating', rating))}
                <p className="text-sm text-muted-foreground mt-1">1 = {t.boring}, 5 = {t.veryEngaging}</p>
              </div>

              <div>
                <Label className="text-base font-medium">{t.howClear}</Label>
                {renderRatingStars(feedback.clarityRating || 0, (rating) => handleRatingChange('clarityRating', rating))}
                <p className="text-sm text-muted-foreground mt-1">1 = {t.confusing}, 5 = {t.veryClear}</p>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">{t.difficultyFelt}</Label>
              <RadioGroup 
                value={feedback.difficultyProgression || ''} 
                onValueChange={(value) => setFeedback(prev => ({ ...prev, difficultyProgression: value as any }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="too-slow" id="too-slow" />
                  <Label htmlFor="too-slow">{t.tooGradual}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="just-right" id="just-right" />
                  <Label htmlFor="just-right">{t.justRight}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="too-fast" id="too-fast" />
                  <Label htmlFor="too-fast">{t.tooSteep}</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">{t.moreConfident}</Label>
              {renderRatingStars(feedback.confidenceIncrease || 0, (rating) => handleRatingChange('confidenceIncrease', rating))}
              <p className="text-sm text-muted-foreground mt-1">1 = {t.noChange}, 5 = {t.muchMoreConfident}</p>
            </div>

            <div>
              <Label className="text-base font-medium">{t.howRelevant}</Label>
              {renderRatingStars(feedback.realWorldRelevance || 0, (rating) => handleRatingChange('realWorldRelevance', rating))}
              <p className="text-sm text-muted-foreground mt-1">1 = {t.notRealistic}, 5 = {t.veryRealistic}</p>
            </div>

            <div>
              <Label className="text-base font-medium">{t.wouldRecommend}</Label>
              {renderRatingStars(feedback.wouldRecommend || 0, (rating) => handleRatingChange('wouldRecommend', rating))}
              <p className="text-sm text-muted-foreground mt-1">1 = {t.definitelyNot}, 5 = {t.absolutelyYes}</p>
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">{t.experienceLevel}</Label>
              <RadioGroup 
                value={feedback.experienceLevel || ''} 
                onValueChange={(value) => setFeedback(prev => ({ ...prev, experienceLevel: value as any }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="complete-beginner" id="complete-beginner" />
                  <Label htmlFor="complete-beginner">{t.completeBeginner}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="some-experience" id="some-experience" />
                  <Label htmlFor="some-experience">{t.someExposure}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate">{t.intermediateKnowledge}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced">{t.advancedProfessional}</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-3 block">{t.whichFeatures} ({t.selectAll})</Label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  t.loglingCharacters,
                  t.storyBasedScenarios,
                  t.gentleExplanations,
                  t.progressTracking,
                  t.achievementSystem,
                  t.dailyChallenges,
                  t.learningTips,
                  t.realWorldContext
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
              <Label htmlFor="missing-features" className="text-base font-medium">{t.featuresWanted}</Label>
              <Textarea
                id="missing-features"
                placeholder={t.makeBetter}
                value={feedback.missingFeatures || ''}
                onChange={(e) => setFeedback(prev => ({ ...prev, missingFeatures: e.target.value }))}
                className="mt-2"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="most-enjoyable" className="text-base font-medium">{t.enjoyMost}</Label>
              <Input
                id="most-enjoyable"
                placeholder="The characters, the stories, the learning style..."
                value={feedback.mostEnjoyableAspect || ''}
                onChange={(e) => setFeedback(prev => ({ ...prev, mostEnjoyableAspect: e.target.value }))}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="most-confusing" className="text-base font-medium">{t.mostConfusing}</Label>
              <Input
                id="most-confusing"
                placeholder={t.anythingUnclear}
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
              <Label htmlFor="general-feedback" className="text-base font-medium">{t.generalFeedback}</Label>
              <Textarea
                id="general-feedback"
                placeholder={t.whatYouLove}
                value={feedback.generalFeedback || ''}
                onChange={(e) => setFeedback(prev => ({ ...prev, generalFeedback: e.target.value }))}
                className="mt-2"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="bug-reports" className="text-base font-medium">{t.bugReports}</Label>
              <Textarea
                id="bug-reports"
                placeholder={t.describeProblem}
                value={feedback.bugReports || ''}
                onChange={(e) => setFeedback(prev => ({ ...prev, bugReports: e.target.value }))}
                className="mt-2"
                rows={3}
              />
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 p-4 rounded-xl">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Users className="w-5 h-5" />
                {t.thankYouBeta}
              </h4>
              <p className="text-sm">
                {t.betaExplorer}
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
          {t.shareExperience}
        </CardTitle>
        <p className="text-muted-foreground">
          {steps[currentStep].description} ({t.stepOf.replace('{current}', (currentStep + 1).toString()).replace('{total}', steps.length.toString())})
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
              {t.previous}
            </Button>
          ) : (
            <Button variant="ghost" onClick={onClose}>
              {t.skip}
            </Button>
          )}
          
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="logling-button"
            >
              {t.next}
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
                  {t.sendingFeedback}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  {t.submitFeedback}
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
