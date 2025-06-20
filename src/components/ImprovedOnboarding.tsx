
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, Shield, Users, Sparkles, ArrowRight, CheckCircle, BookOpen, Target, Lightbulb } from 'lucide-react';
import { useUserProfile } from '../hooks/useUserProfile';
import { useI18n } from '../hooks/useI18n';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  content: React.ReactNode;
  interactive?: boolean;
}

const ImprovedOnboarding = () => {
  const { t } = useI18n();
  const { profile, updateProfile } = useUserProfile();
  const [currentStep, setCurrentStep] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);

  useEffect(() => {
    if (!profile.hasCompletedOnboarding) {
      const hasSeenOnboarding = localStorage.getItem('loglings-improved-onboarding');
      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
      }
    }
  }, [profile.hasCompletedOnboarding]);

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 'philosophy',
      title: t.differentKindOfLearning,
      description: t.welcomeToGentleApproach,
      icon: Heart,
      content: (
        <div className="space-y-4">
          <p className="text-center text-lg">
            {t.traditionalCybersecurityTraining}
          </p>
          <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-xl">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              {t.ourLearningPhilosophy}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>✨ <strong>{t.curiosityOverFear}:</strong> {t.weExploreThreats}</li>
              <li>🌱 <strong>{t.growthMindset}:</strong> {t.everyMistakeIsLearning}</li>
              <li>🤝 <strong>{t.supportiveCommunity}:</strong> {t.youreNotAlone}</li>
              <li>🎯 <strong>{t.practicalWisdom}:</strong> {t.realWorldSkills}</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'meet-guides',
      title: t.meetYourLearningCompanions,
      description: t.threeFriendlyGuides,
      icon: Users,
      content: (
        <div className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center gap-3 p-3 bg-rose-50 dark:bg-rose-950/30 rounded-xl">
              <div className="w-12 h-12 bg-rose-200 dark:bg-rose-800 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h4 className="font-semibold">{t.pipThePeacefulObserver}</h4>
                <p className="text-sm text-muted-foreground">
                  {t.pipOnboardingDescription}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl">
              <div className="w-12 h-12 bg-amber-200 dark:bg-amber-800 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="font-semibold">{t.lunaTheCuriousExplorer}</h4>
                <p className="text-sm text-muted-foreground">
                  {t.lunaOnboardingDescription}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
              <div className="w-12 h-12 bg-blue-200 dark:bg-blue-800 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold">{t.sageTheProtectiveGuardian}</h4>
                <p className="text-sm text-muted-foreground">
                  {t.sageOnboardingDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'demo-scenario',
      title: t.tryYourFirstGentleAnalysis,
      description: t.letsPracticeWithRealScenario,
      icon: BookOpen,
      interactive: true,
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-xl font-mono text-sm">
            <p className="mb-4">
              <strong>{t.scenario}:</strong> {t.sarahBloomScenario}
            </p>
            
            <p className="mb-4 text-muted-foreground">
              {t.howDoesThisFeelToYou}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Button
                variant={userAnswer === 'safe' ? 'default' : 'outline'}
                onClick={() => setUserAnswer('safe')}
                className="flex flex-col items-center gap-2 h-auto p-4"
              >
                <Heart className="w-6 h-6 text-rose-500" />
                <span className="font-semibold">{t.peacefulAndSafe}</span>
                <span className="text-xs text-center">{t.pipFeelsCalm}</span>
              </Button>
              
              <Button
                variant={userAnswer === 'warning' ? 'default' : 'outline'}
                onClick={() => setUserAnswer('warning')}
                className="flex flex-col items-center gap-2 h-auto p-4"
              >
                <Sparkles className="w-6 h-6 text-amber-500" />
                <span className="font-semibold">{t.curiousAndInteresting}</span>
                <span className="text-xs text-center">{t.lunaWantsToInvestigate}</span>
              </Button>
              
              <Button
                variant={userAnswer === 'critical' ? 'default' : 'outline'}
                onClick={() => setUserAnswer('critical')}
                className="flex flex-col items-center gap-2 h-auto p-4"
              >
                <Shield className="w-6 h-6 text-blue-500" />
                <span className="font-semibold">{t.alertAndProtective}</span>
                <span className="text-xs text-center">{t.sageSensesDanger}</span>
              </Button>
            </div>
          </div>
          
          {userAnswer && (
            <div className="p-4 rounded-xl welcome-highlight-box">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold">{t.perfectYoureThinking}</span>
              </div>
              {userAnswer === 'safe' ? (
                <p className="text-sm">
                  {t.pipAgreesResponse}
                </p>
              ) : userAnswer === 'warning' ? (
                <p className="text-sm">
                  {t.lunaAppreciatesResponse}
                </p>
              ) : (
                <p className="text-sm">
                  {t.sageRespectsResponse}
                </p>
              )}
            </div>
          )}
        </div>
      )
    },
    {
      id: 'learning-approach',
      title: t.yourCozyLearningJourney,
      description: t.howWeMakeCybersecurity,
      icon: Target,
      content: (
        <div className="space-y-4">
          <div className="grid gap-4">
            <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 rounded-xl">
              <h4 className="font-semibold mb-2">🌱 {t.progressiveGrowth}</h4>
              <p className="text-sm">
                {t.progressiveGrowthDescription}
              </p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl">
              <h4 className="font-semibold mb-2">💡 {t.understandingOverMemorization}</h4>
              <p className="text-sm">
                {t.understandingOverMemorizationDescription}
              </p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl">
              <h4 className="font-semibold mb-2">🎯 {t.realWorldRelevance}</h4>
              <p className="text-sm">
                {t.realWorldRelevanceDescription}
              </p>
            </div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-r from-rose-50 to-rose-100 dark:from-rose-950/30 dark:to-rose-900/30 rounded-xl">
            <p className="font-medium">
              {t.readyToBeginGentleJourney}
            </p>
          </div>
        </div>
      )
    }
  ];

  const handleStepAction = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setUserAnswer(null);
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem('loglings-improved-onboarding', 'true');
    updateProfile({ hasCompletedOnboarding: true });
    setShowOnboarding(false);
  };

  const skipOnboarding = () => {
    localStorage.setItem('loglings-improved-onboarding', 'true');
    setShowOnboarding(false);
  };

  if (!showOnboarding) return null;

  const currentStepData = onboardingSteps[currentStep];
  const IconComponent = currentStepData.icon;
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl cozy-card animate-fade-in max-h-[90vh] overflow-y-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary">{t.welcomeJourney}</Badge>
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} {t.of} {onboardingSteps.length}
            </span>
          </div>
          <Progress value={progress} className="mb-4" />
          
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center animate-gentle-bounce">
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          
          <CardTitle className="text-2xl cozy-heading">
            {currentStepData.title}
          </CardTitle>
          <p className="text-muted-foreground">
            {currentStepData.description}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {currentStepData.content}
          
          <div className="flex justify-between items-center pt-6 border-t">
            <Button
              variant="ghost"
              onClick={skipOnboarding}
              className="text-muted-foreground"
            >
              {t.skipForNow}
            </Button>
            
            <Button
              onClick={handleStepAction}
              disabled={currentStepData.interactive && !userAnswer}
              className="logling-button"
            >
              {currentStep === onboardingSteps.length - 1 ? t.beginMyJourney : t.continue}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImprovedOnboarding;
