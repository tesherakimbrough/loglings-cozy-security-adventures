
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, Shield, Users, Sparkles, ArrowRight, CheckCircle, BookOpen, Target, Lightbulb } from 'lucide-react';
import { useUserProfile } from '../hooks/useUserProfile';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: any;
  content: React.ReactNode;
  interactive?: boolean;
}

const ImprovedOnboarding = () => {
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
      title: 'A Different Kind of Learning 🌿',
      description: 'Welcome to a gentle approach to cybersecurity education',
      icon: Heart,
      content: (
        <div className="space-y-4">
          <p className="text-center text-lg">
            Traditional cybersecurity training can feel overwhelming and stressful. 
            We believe learning should be <strong>cozy, curious, and confidence-building</strong>.
          </p>
          <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-xl">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Our Learning Philosophy
            </h4>
            <ul className="space-y-2 text-sm">
              <li>✨ <strong>Curiosity over fear:</strong> We explore threats with gentle curiosity</li>
              <li>🌱 <strong>Growth mindset:</strong> Every mistake is a learning opportunity</li>
              <li>🤝 <strong>Supportive community:</strong> You're not alone in this journey</li>
              <li>🎯 <strong>Practical wisdom:</strong> Real-world skills in a safe environment</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'meet-guides',
      title: 'Meet Your Learning Companions',
      description: 'Three friendly guides who see security from different perspectives',
      icon: Users,
      content: (
        <div className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center gap-3 p-3 bg-rose-50 dark:bg-rose-950/30 rounded-xl">
              <div className="w-12 h-12 bg-rose-200 dark:bg-rose-800 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h4 className="font-semibold">Pip - The Peaceful Observer</h4>
                <p className="text-sm text-muted-foreground">
                  Sees the calm and normal patterns. Helps you recognize when things are safe and peaceful.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl">
              <div className="w-12 h-12 bg-amber-200 dark:bg-amber-800 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="font-semibold">Luna - The Curious Explorer</h4>
                <p className="text-sm text-muted-foreground">
                  Notices interesting patterns that need a closer look. Helps you develop healthy skepticism.
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
              <div className="w-12 h-12 bg-blue-200 dark:bg-blue-800 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold">Sage - The Protective Guardian</h4>
                <p className="text-sm text-muted-foreground">
                  Spots real dangers and threats. Helps you take decisive action when protection is needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'demo-scenario',
      title: 'Try Your First Gentle Analysis',
      description: 'Let\'s practice with a real scenario. Think like your Logling guides!',
      icon: BookOpen,
      interactive: true,
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-xl font-mono text-sm">
            <p className="mb-4">
              <strong>Scenario:</strong> sarah.bloom@company.com logged in from her home office at 9:00 AM, 
              same location and time as every morning for the past 6 months. Her usual work hours are 9 AM - 5 PM.
            </p>
            
            <p className="mb-4 text-muted-foreground">
              How does this feel to you? What would your Logling guides say?
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Button
                variant={userAnswer === 'safe' ? 'default' : 'outline'}
                onClick={() => setUserAnswer('safe')}
                className="flex flex-col items-center gap-2 h-auto p-4"
              >
                <Heart className="w-6 h-6 text-rose-500" />
                <span className="font-semibold">Peaceful & Safe</span>
                <span className="text-xs text-center">Pip feels calm about this</span>
              </Button>
              
              <Button
                variant={userAnswer === 'warning' ? 'default' : 'outline'}
                onClick={() => setUserAnswer('warning')}
                className="flex flex-col items-center gap-2 h-auto p-4"
              >
                <Sparkles className="w-6 h-6 text-amber-500" />
                <span className="font-semibold">Curious & Interesting</span>
                <span className="text-xs text-center">Luna wants to investigate</span>
              </Button>
              
              <Button
                variant={userAnswer === 'critical' ? 'default' : 'outline'}
                onClick={() => setUserAnswer('critical')}
                className="flex flex-col items-center gap-2 h-auto p-4"
              >
                <Shield className="w-6 h-6 text-blue-500" />
                <span className="font-semibold">Alert & Protective</span>
                <span className="text-xs text-center">Sage senses danger</span>
              </Button>
            </div>
          </div>
          
          {userAnswer && (
            <div className="p-4 rounded-xl welcome-highlight-box">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-semibold">Perfect! You're thinking like a Logling!</span>
              </div>
              {userAnswer === 'safe' ? (
                <p className="text-sm">
                  🌸 Pip agrees! This shows a beautiful, consistent pattern. Sarah's regular routine 
                  from her known location is exactly what peaceful security looks like. 
                  Well-established patterns help us notice when something is actually unusual.
                </p>
              ) : userAnswer === 'warning' ? (
                <p className="text-sm">
                  ✨ Luna appreciates your curiosity! While this scenario is actually quite safe, 
                  your instinct to question and investigate is valuable. In security, it's always 
                  better to be thoughtfully curious than to miss something important.
                </p>
              ) : (
                <p className="text-sm">
                  🛡️ Sage respects your protective instincts! While this scenario is peaceful, 
                  your willingness to be alert is exactly the mindset that catches real threats. 
                  We'll help you learn to distinguish between normal patterns and genuine dangers.
                </p>
              )}
            </div>
          )}
        </div>
      )
    },
    {
      id: 'learning-approach',
      title: 'Your Cozy Learning Journey',
      description: 'How we make cybersecurity learning gentle and effective',
      icon: Target,
      content: (
        <div className="space-y-4">
          <div className="grid gap-4">
            <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/30 dark:to-blue-950/30 rounded-xl">
              <h4 className="font-semibold mb-2">🌱 Progressive Growth</h4>
              <p className="text-sm">
                We start with gentle scenarios and gradually introduce more complex situations. 
                You'll build confidence naturally without feeling overwhelmed.
              </p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl">
              <h4 className="font-semibold mb-2">💡 Understanding Over Memorization</h4>
              <p className="text-sm">
                We focus on helping you understand patterns and develop intuition, 
                not memorizing rules. Real security expertise comes from understanding.
              </p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl">
              <h4 className="font-semibold mb-2">🎯 Real-World Relevance</h4>
              <p className="text-sm">
                Every scenario is based on real security events, but presented in a 
                supportive way that builds practical skills you can use.
              </p>
            </div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-r from-rose-50 to-rose-100 dark:from-rose-950/30 dark:to-rose-900/30 rounded-xl">
            <p className="font-medium">
              Ready to begin your gentle journey into cybersecurity mastery? 🌟
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
            <Badge variant="secondary">Welcome Journey</Badge>
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} of {onboardingSteps.length}
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
              Skip for now
            </Button>
            
            <Button
              onClick={handleStepAction}
              disabled={currentStepData.interactive && !userAnswer}
              className="logling-button"
            >
              {currentStep === onboardingSteps.length - 1 ? 'Begin My Journey' : 'Continue'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImprovedOnboarding;
