
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Sparkles, TreePine, Users, Target, Gift } from 'lucide-react';
import { useUserProfile } from '../hooks/useUserProfile';
import { useMonetizationTracking } from '../hooks/useMonetizationTracking';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  cta: string;
  value: string;
}

const EnhancedUserOnboarding = () => {
  const { profile, selectMode } = useUserProfile();
  const { trackMonetization } = useMonetizationTracking();
  const [currentStep, setCurrentStep] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to Loglings Beta!',
      description: 'You\'re among the first to experience cozy cybersecurity learning. Help us shape the future of security education!',
      icon: TreePine,
      cta: 'Start My Journey',
      value: 'Exclusive early access to innovative learning'
    },
    {
      id: 'mode_selection',
      title: 'Choose Your Adventure',
      description: 'Select the learning style that feels right for you. You can always change this later in settings.',
      icon: Heart,
      cta: 'Select Mode',
      value: 'Personalized learning experience'
    },
    {
      id: 'community',
      title: 'Join Our Growing Community',
      description: 'Be part of a supportive community that\'s reshaping cybersecurity education. Your feedback directly shapes our development.',
      icon: Users,
      cta: 'Join Community',
      value: 'Direct influence on product development'
    },
    {
      id: 'beta_benefits',
      title: 'Beta User Benefits',
      description: 'As a beta user, you get lifetime access to premium features once we launch, plus exclusive content and early access to new features.',
      icon: Gift,
      cta: 'Claim Benefits',
      value: 'Lifetime premium access worth $120/year'
    }
  ];

  useEffect(() => {
    // Show onboarding for new users
    if (!profile.hasCompletedOnboarding) {
      const hasSeenOnboarding = localStorage.getItem('loglings-seen-enhanced-onboarding');
      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
        trackMonetization({
          action: 'premium_inquiry',
          source: 'onboarding_start',
          context: 'enhanced_beta_onboarding'
        });
      }
    }
  }, [profile.hasCompletedOnboarding, trackMonetization]);

  const handleStepAction = (step: OnboardingStep) => {
    trackMonetization({
      action: 'premium_inquiry',
      source: 'onboarding_step',
      context: step.id
    });

    switch (step.id) {
      case 'welcome':
        setCurrentStep(1);
        break;
      case 'mode_selection':
        // Don't auto-advance, let user choose
        break;
      case 'community':
        setCurrentStep(3);
        break;
      case 'beta_benefits':
        completeOnboarding();
        break;
    }
  };

  const handleModeSelection = (mode: 'cozy-everyday' | 'career-pro') => {
    selectMode(mode);
    trackMonetization({
      action: 'premium_inquiry',
      source: 'mode_selection',
      context: mode
    });
    setCurrentStep(2);
  };

  const completeOnboarding = () => {
    localStorage.setItem('loglings-seen-enhanced-onboarding', 'true');
    
    // Mark as beta user with special benefits
    const betaUserData = {
      joinedDate: new Date().toISOString(),
      betaStatus: 'early_access',
      lifetimePremium: true,
      specialBenefits: [
        'lifetime_premium_access',
        'exclusive_content',
        'early_feature_access',
        'community_recognition'
      ]
    };
    
    localStorage.setItem('loglings-beta-user-status', JSON.stringify(betaUserData));
    
    trackMonetization({
      action: 'premium_inquiry',
      source: 'onboarding_complete',
      context: 'beta_benefits_claimed'
    });
    
    setShowOnboarding(false);
  };

  const skipOnboarding = () => {
    localStorage.setItem('loglings-seen-enhanced-onboarding', 'true');
    trackMonetization({
      action: 'premium_inquiry',
      source: 'onboarding_skip',
      context: 'user_skipped'
    });
    setShowOnboarding(false);
  };

  if (!showOnboarding) return null;

  const currentStepData = onboardingSteps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl cozy-card animate-fade-in">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-400 to-amber-400 rounded-full flex items-center justify-center animate-gentle-bounce">
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl cozy-heading">
            {currentStepData.title}
          </CardTitle>
          <Badge variant="secondary" className="mx-auto">
            Step {currentStep + 1} of {onboardingSteps.length}
          </Badge>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p className="text-center text-lg text-accessible-secondary">
            {currentStepData.description}
          </p>
          
          <div className="p-4 rounded-xl welcome-highlight-box text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="font-semibold">Beta User Value</span>
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <p className="text-sm text-accessible-primary font-medium">
              {currentStepData.value}
            </p>
          </div>

          {currentStep === 1 ? (
            // Mode selection step
            <div className="grid md:grid-cols-2 gap-4">
              <Button
                onClick={() => handleModeSelection('cozy-everyday')}
                variant="outline"
                className="h-auto p-6 flex flex-col gap-2 hover:scale-105 transition-transform"
              >
                <Heart className="w-8 h-8 text-rose-500" />
                <div className="text-lg font-semibold">Cozy Learning</div>
                <div className="text-sm text-muted-foreground text-center">
                  Gentle, stress-free cybersecurity exploration with adorable Loglings
                </div>
              </Button>
              
              <Button
                onClick={() => handleModeSelection('career-pro')}
                variant="outline"
                className="h-auto p-6 flex flex-col gap-2 hover:scale-105 transition-transform"
              >
                <Target className="w-8 h-8 text-blue-600" />
                <div className="text-lg font-semibold">Career Pro</div>
                <div className="text-sm text-muted-foreground text-center">
                  Professional skill-building for SOC analysts and security careers
                </div>
              </Button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Button
                onClick={() => handleStepAction(currentStepData)}
                className="flex-1 logling-button"
                size="lg"
              >
                {currentStepData.cta}
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
          
          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              variant="ghost"
              onClick={skipOnboarding}
              className="text-accessible-secondary"
            >
              Skip for now
            </Button>
            
            <div className="flex gap-1">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index <= currentStep 
                      ? 'bg-leaf-glow' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedUserOnboarding;
