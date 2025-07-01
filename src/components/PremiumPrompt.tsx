
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Sparkles, TreePine, Heart, X } from 'lucide-react';

interface PremiumPromptProps {
  trigger: 'sessions' | 'achievement' | 'score';
  onDismiss: () => void;
  onUpgrade: () => void;
  sessionsPlayed?: number;
  currentScore?: number;
  achievement?: string;
}

const PremiumPrompt = ({ 
  trigger, 
  onDismiss, 
  onUpgrade, 
  sessionsPlayed = 0,
  currentScore = 0,
  achievement 
}: PremiumPromptProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const getPromptContent = () => {
    switch (trigger) {
      case 'sessions':
        return {
          title: "You're becoming quite the Logling whisperer! 🌟",
          subtitle: `${sessionsPlayed} peaceful adventures completed`,
          message: "Your dedication to learning fills our hearts with joy. Ready to unlock the full forest experience with premium features?",
          icon: TreePine,
          color: "text-green-600"
        };
      case 'achievement':
        return {
          title: "You've earned early access to premium features! ✨",
          subtitle: `Achievement unlocked: ${achievement}`,
          message: "Your wisdom and curiosity have impressed the Forest Elder. Claim your special access to enhanced learning paths!",
          icon: Crown,
          color: "text-amber-600"
        };
      case 'score':
        return {
          title: "Ready to unlock the full forest experience? 🏆",
          subtitle: `Outstanding performance: ${currentScore} joy collected`,
          message: "Your mastery brings such harmony to our digital grove. Discover what awaits in the deeper forest paths!",
          icon: Sparkles,
          color: "text-purple-600"
        };
      default:
        return {
          title: "Join our Premium Forest Community! 🌸",
          subtitle: "Exclusive early access",
          message: "Support our cozy learning mission and unlock special features created just for nature-loving learners like you.",
          icon: Heart,
          color: "text-rose-600"
        };
    }
  };

  const content = getPromptContent();
  const IconComponent = content.icon;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg cozy-card animate-scale-in relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="absolute top-2 right-2 w-8 h-8"
        >
          <X className="w-4 h-4" />
        </Button>

        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-br from-amber-400 to-rose-400 rounded-full flex items-center justify-center animate-gentle-bounce">
            <IconComponent className={`w-10 h-10 text-white`} />
          </div>
          
          <div className="space-y-2">
            <Badge className="bg-accent/20 text-accent border-accent">
              {content.subtitle}
            </Badge>
            <CardTitle className="text-xl text-primary">
              {content.title}
            </CardTitle>
            <p className="text-muted-foreground leading-relaxed">
              {content.message}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold text-green-700 dark:text-green-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Premium Forest Features
            </h4>
            <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
              <li>• 🎵 Complete cozy audio library (60+ ambient tracks)</li>
              <li>• 🌟 Advanced learning paths & exclusive Loglings</li>
              <li>• 📊 Detailed progress analytics & insights</li>
              <li>• 🎁 Early access to new features & content</li>
              <li>• 💝 Support our mission to make cybersecurity cozy</li>
            </ul>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-accent/10 rounded-lg p-2">
              <div className="font-semibold text-accent">Early Supporter</div>
              <div className="text-muted-foreground">Pay what feels right</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-2">
              <div className="font-semibold text-primary">Garden Friend</div>
              <div className="text-muted-foreground">$7/month</div>
            </div>
            <div className="bg-amber-500/10 rounded-lg p-2">
              <div className="font-semibold text-amber-600">Forest Guardian</div>
              <div className="text-muted-foreground">$15/month</div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleDismiss}
              className="flex-1"
            >
              Maybe later
            </Button>
            <Button
              onClick={onUpgrade}
              className="flex-1 logling-button"
            >
              <Crown className="w-4 h-4 mr-2" />
              Unlock Premium
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumPrompt;
