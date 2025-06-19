
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, Shield, Users, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { useUserProfile } from '../hooks/useUserProfile';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  interactive?: boolean;
  demoScenario?: {
    log: string;
    correctAnswer: 'safe' | 'warning' | 'critical';
    explanation: string;
  };
}

const OnboardingTutorial = () => {
  const { profile, updateProfile } = useUserProfile();
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);

  useEffect(() => {
    if (!profile.hasCompletedOnboarding) {
      const hasSeenTutorial = localStorage.getItem('loglings-tutorial-completed');
      if (!hasSeenTutorial) {
        setShowTutorial(true);
      }
    }
  }, [profile.hasCompletedOnboarding]);

  const tutorialSteps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to the Cozy Forest! 🌲',
      description: 'Meet your gentle guides who will help you explore cybersecurity in a safe, supportive environment.',
      icon: Heart
    },
    {
      id: 'meet-loglings',
      title: 'Meet Your Logling Friends',
      description: 'Pip (peaceful), Luna (curious), and Sage (protective) each have unique perspectives on security.',
      icon: Users
    },
    {
      id: 'demo-safe',
      title: 'Try Your First Analysis',
      description: 'Let\'s practice with a gentle scenario. Read the log and choose how it feels to you.',
      icon: Shield,
      interactive: true,
      demoScenario: {
        log: 'sarah.bloom@company.com logged in from her home office at 9:00 AM, same as every morning for the past 6 months.',
        correctAnswer: 'safe',
        explanation: 'Perfect! Pip feels so peaceful about this. Consistent patterns from known users in expected locations are signs of normal, safe activity. 🌸'
      }
    },
    {
      id: 'learning-approach',
      title: 'Your Cozy Learning Journey',
      description: 'Every scenario teaches something new. We focus on understanding patterns, not memorizing rules.',
      icon: Sparkles
    }
  ];

  const handleStepComplete = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setUserAnswer(null);
    } else {
      completeTutorial();
    }
  };

  const handleDemoAnswer = (answer: string) => {
    setUserAnswer(answer);
  };

  const completeTutorial = () => {
    localStorage.setItem('loglings-tutorial-completed', 'true');
    updateProfile({ hasCompletedOnboarding: true });
    setShowTutorial(false);
  };

  if (!showTutorial) return null;

  const currentStepData = tutorialSteps[currentStep];
  const IconComponent = currentStepData.icon;
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl cozy-card animate-fade-in">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary">Tutorial</Badge>
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} of {tutorialSteps.length}
            </span>
          </div>
          <Progress value={progress} className="mb-4" />
          
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center animate-gentle-bounce">
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          
          <CardTitle className="text-2xl cozy-heading">
            {currentStepData.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p className="text-center text-lg text-accessible-secondary">
            {currentStepData.description}
          </p>
          
          {currentStepData.interactive && currentStepData.demoScenario && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-muted/30 font-mono text-sm">
                <p className="mb-4">{currentStepData.demoScenario.log}</p>
                
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={userAnswer === 'safe' ? 'default' : 'outline'}
                    onClick={() => handleDemoAnswer('safe')}
                    className="flex items-center gap-2"
                  >
                    🌸 Safe
                  </Button>
                  <Button
                    variant={userAnswer === 'warning' ? 'default' : 'outline'}
                    onClick={() => handleDemoAnswer('warning')}
                    className="flex items-center gap-2"
                  >
                    🤔 Curious
                  </Button>
                  <Button
                    variant={userAnswer === 'critical' ? 'default' : 'outline'}
                    onClick={() => handleDemoAnswer('critical')}
                    className="flex items-center gap-2"
                  >
                    🚨 Alert
                  </Button>
                </div>
              </div>
              
              {userAnswer && (
                <div className="p-4 rounded-xl welcome-highlight-box">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold">Great choice!</span>
                  </div>
                  <p className="text-sm">{currentStepData.demoScenario.explanation}</p>
                </div>
              )}
            </div>
          )}
          
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="ghost"
              onClick={completeTutorial}
              className="text-accessible-secondary"
            >
              Skip Tutorial
            </Button>
            
            <Button
              onClick={handleStepComplete}
              disabled={currentStepData.interactive && !userAnswer}
              className="logling-button"
            >
              {currentStep === tutorialSteps.length - 1 ? 'Start Adventure' : 'Continue'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingTutorial;
