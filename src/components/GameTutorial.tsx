
import { useState } from 'react';
import { Play, ArrowRight, ArrowLeft, X, Shield, Heart, Brain, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '../hooks/useI18n';

interface GameTutorialProps {
  onClose: () => void;
  onComplete: () => void;
}

const GameTutorial = ({ onClose, onComplete }: GameTutorialProps) => {
  const { t } = useI18n();
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Welcome to Loglings! 🌱",
      content: (
        <div className="space-y-4">
          <p className="text-lg leading-relaxed">
            Welcome to <span className="font-semibold text-primary">Loglings: Cozy Cybersecurity Adventures</span> – 
            where learning digital security feels like exploring an enchanted forest with friendly guides!
          </p>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
              <Heart className="w-5 h-5" />
              What is Loglings?
            </h4>
            <p className="text-green-700 dark:text-green-300 text-sm">
              Loglings transforms the traditionally intimidating world of cybersecurity into a warm, 
              welcoming learning experience. Instead of scary technical jargon, you'll read cozy stories 
              about digital forest adventures while learning real security skills.
            </p>
          </div>
        </div>
      )
    },
    {
      title: "How Security Logs Become Stories 📖",
      content: (
        <div className="space-y-4">
          <p className="leading-relaxed">
            In the real world, cybersecurity professionals analyze "logs" – records of computer activities. 
            In Loglings, these become gentle stories about forest inhabitants and their digital adventures.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Example Transformation:</h4>
            <div className="space-y-3">
              <div>
                <Badge variant="outline" className="mb-2">Real Security Log</Badge>
                <p className="text-xs font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded">
                  2024-01-15 02:47:33 - Login attempt: User 'admin' from IP 203.0.113.42 (Romania) - SUCCESS after 15 failed attempts
                </p>
              </div>
              <div>
                <Badge variant="outline" className="mb-2">Cozy Story Version</Badge>
                <p className="text-sm italic text-muted-foreground">
                  "Luna notices someone trying to open the magical garden gate many times in the middle of the night. 
                  After many attempts, they finally got in. Should Luna be worried about this midnight visitor?"
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Meet Your Forest Guides 🦉🌙🌿",
      content: (
        <div className="space-y-4">
          <p className="leading-relaxed">
            Three friendly Loglings will accompany you on your journey, each specializing in different types of security scenarios:
          </p>
          <div className="grid gap-3">
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1 flex items-center gap-2">
                🌿 Pip - The Gentle Explorer
              </h4>
              <p className="text-green-700 dark:text-green-300 text-sm">
                Helps you identify safe, everyday activities. Perfect for beginners learning to recognize normal behavior.
              </p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
              <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-1 flex items-center gap-2">
                🌙 Luna - The Curious Investigator
              </h4>
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                Guides you through suspicious events that need gentle investigation. Great for building analytical skills.
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-1 flex items-center gap-2">
                🦉 Sage - The Wise Guardian
              </h4>
              <p className="text-purple-700 dark:text-purple-300 text-sm">
                Protects the forest from serious threats with ancient wisdom. For advanced scenarios requiring expert judgment.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "What You'll Learn 🎓",
      content: (
        <div className="space-y-4">
          <p className="leading-relaxed">
            Through cozy gameplay, you'll develop real cybersecurity skills that professionals use every day:
          </p>
          <div className="grid gap-3">
            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">Threat Detection</h4>
                <p className="text-xs text-muted-foreground">Spotting unusual login patterns, suspicious file changes, and potential attacks</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <Brain className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">Risk Assessment</h4>
                <p className="text-xs text-muted-foreground">Learning to evaluate how serious different security events are</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
              <Users className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">Digital Literacy</h4>
                <p className="text-xs text-muted-foreground">Understanding how computer systems work and communicate</p>
              </div>
            </div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
              🎯 Real-World Value: These scenarios are based on actual security incidents from enterprise environments, 
              carefully adapted into gentle stories. You're learning genuine skills that transfer directly to SOC analyst roles, 
              IT security positions, and general digital safety!
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Choose Your Adventure Style 🏠⚡",
      content: (
        <div className="space-y-4">
          <p className="leading-relaxed">
            Loglings offers two adventure modes to match your learning style and goals:
          </p>
          <div className="space-y-3">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 flex items-center gap-2">
                🏠 Cozy Everyday Discovery
              </h4>
              <ul className="text-green-700 dark:text-green-300 text-sm space-y-1">
                <li>• Extended time limits for thoughtful consideration</li>
                <li>• Detailed explanations and gentle feedback</li>
                <li>• Perfect for beginners and mindful learning</li>
                <li>• Focus on building confidence and understanding</li>
              </ul>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                ⚡ Career Pro Mode
              </h4>
              <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
                <li>• Faster-paced scenarios mimicking real work environments</li>
                <li>• Advanced scenarios with multiple factors to consider</li>
                <li>• Skill-building focused on professional development</li>
                <li>• Progress tracking and performance analytics</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Ready to Begin! 🚀",
      content: (
        <div className="space-y-4 text-center">
          <p className="text-lg leading-relaxed">
            You're all set to start your cozy cybersecurity adventure! Remember:
          </p>
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <ul className="text-sm space-y-2 text-left max-w-md mx-auto">
              <li className="flex items-center gap-2">
                <span className="text-green-600">✨</span>
                There are no wrong answers, only learning opportunities
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">🤗</span>
                Take your time and enjoy the journey
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-600">🌱</span>
                Every expert was once a beginner
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-600">💝</span>
                You're building real, valuable skills while having fun
              </li>
            </ul>
          </div>
          <p className="text-muted-foreground text-sm">
            Click "Start Adventure" to begin exploring the digital forest with your Logling guides!
          </p>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl cozy-card cozy-glow max-h-[95vh] overflow-hidden">
        <CardHeader className="relative pb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-2 top-2 h-8 w-8"
            aria-label="Skip tutorial"
          >
            <X className="w-4 h-4" />
          </Button>
          <CardTitle className="flex items-center gap-2 text-primary text-lg pr-8">
            <Play className="w-5 h-5 shrink-0" />
            {tutorialSteps[currentStep].title}
          </CardTitle>
          <div className="flex items-center gap-2 mt-2">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent className="pb-6 overflow-y-auto max-h-[calc(95vh-200px)]">
          <div className="mb-6">
            {tutorialSteps[currentStep].content}
          </div>
          
          <div className="flex items-center justify-between gap-4 pt-4 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.back}
            </Button>
            
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} / {tutorialSteps.length}
            </span>
            
            <Button
              onClick={nextStep}
              className="logling-button flex items-center gap-2"
            >
              {currentStep === tutorialSteps.length - 1 ? (
                <>
                  <Play className="w-4 h-4" />
                  Start Adventure
                </>
              ) : (
                <>
                  {t.nextTip}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameTutorial;
