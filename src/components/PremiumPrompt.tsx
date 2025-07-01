
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Crown, Sparkles, TreePine, Heart, X, Lock, ArrowRight, Star } from 'lucide-react';
import { useUsageTracking } from '../hooks/useUsageTracking';

interface PremiumPromptProps {
  trigger: 'sessions' | 'achievement' | 'score' | 'usage_limit';
  onDismiss: () => void;
  onUpgrade: () => void;
  sessionsPlayed?: number;
  currentScore?: number;
  achievement?: string;
  limitType?: string;
}

const PremiumPrompt = ({ 
  trigger, 
  onDismiss, 
  onUpgrade, 
  sessionsPlayed = 0,
  currentScore = 0,
  achievement,
  limitType 
}: PremiumPromptProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const { usage, limits, getRemainingUsage } = useUsageTracking();

  if (!isVisible) return null;

  const getPromptContent = () => {
    switch (trigger) {
      case 'usage_limit':
        return {
          title: "You've reached your daily forest limit! 🌳",
          subtitle: `${limitType} limit reached`,
          message: "Your enthusiasm for learning is wonderful! Upgrade to continue your cybersecurity journey without limits.",
          icon: Lock,
          color: "text-amber-600",
          urgency: "high"
        };
      case 'sessions':
        return {
          title: "You're becoming quite the Logling whisperer! 🌟",
          subtitle: `${sessionsPlayed} peaceful adventures completed`,
          message: "Your dedication to learning fills our hearts with joy. Ready to unlock the full forest experience?",
          icon: TreePine,
          color: "text-green-600",
          urgency: "medium"
        };
      case 'achievement':
        return {
          title: "Achievement unlocked! Time to level up! ✨",
          subtitle: `Achievement: ${achievement}`,
          message: "Your progress shows you're ready for advanced features. Unlock premium scenarios and deeper insights!",
          icon: Crown,
          color: "text-amber-600",
          urgency: "medium"
        };
      case 'score':
        return {
          title: "Outstanding performance! 🏆",
          subtitle: `${currentScore} points earned`,
          message: "Your mastery deserves recognition. Discover advanced scenarios and detailed analytics in premium!",
          icon: Star,
          color: "text-purple-600",
          urgency: "low"
        };
      default:
        return {
          title: "Join our Premium Forest Community! 🌸",
          subtitle: "Exclusive access awaits",
          message: "Support our cozy learning mission and unlock features created for dedicated learners like you.",
          icon: Heart,
          color: "text-rose-600",
          urgency: "low"
        };
    }
  };

  const content = getPromptContent();
  const IconComponent = content.icon;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss();
  };

  const premiumFeatures = [
    { name: 'Unlimited daily scenarios', value: '∞ vs 10/day' },
    { name: 'Premium scenario library', value: '200+ exclusive' },
    { name: 'Complete audio collection', value: '20+ cozy tracks' },
    { name: 'Advanced learning paths', value: 'Personalized routes' },
    { name: 'Detailed progress analytics', value: 'Export & insights' },
    { name: 'Priority support', value: 'Get help faster' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl cozy-card animate-scale-in relative">
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
            <IconComponent className="w-10 h-10 text-white" />
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
        
        <CardContent className="space-y-6">
          {trigger === 'usage_limit' && (
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Today's Usage</span>
                <span className="text-sm text-muted-foreground">
                  {usage.scenariosToday}/{limits.scenariosPerDay}
                </span>
              </div>
              <Progress value={(usage.scenariosToday / limits.scenariosPerDay) * 100} className="h-2 mb-2" />
              <p className="text-xs text-amber-600 dark:text-amber-400">
                Resets in {24 - new Date().getHours()} hours, or upgrade for unlimited access
              </p>
            </div>
          )}

          <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 space-y-4">
            <h4 className="font-semibold text-green-700 dark:text-green-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              What You'll Unlock
            </h4>
            <div className="space-y-3">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
                    <ArrowRight className="w-3 h-3" />
                    {feature.name}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {feature.value}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-accent/10 rounded-lg p-3 space-y-1">
              <div className="font-semibold text-accent">Garden Friend</div>
              <div className="text-lg font-bold">$7</div>
              <div className="text-muted-foreground">/month</div>
            </div>
            <div className="bg-primary/10 rounded-lg p-3 space-y-1 border-2 border-primary/20">
              <div className="font-semibold text-primary">Annual Plan</div>
              <div className="text-lg font-bold">$70</div>
              <div className="text-muted-foreground">/year</div>
              <Badge className="bg-green-100 text-green-800 text-xs">Save 17%</Badge>
            </div>
            <div className="bg-amber-500/10 rounded-lg p-3 space-y-1">
              <div className="font-semibold text-amber-600">Forest Guardian</div>
              <div className="text-lg font-bold">$15</div>
              <div className="text-muted-foreground">/month</div>
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
              size="lg"
            >
              <Crown className="w-4 h-4 mr-2" />
              Unlock Premium
            </Button>
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              ✨ 30-day money-back guarantee • Cancel anytime • No hidden fees ✨
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumPrompt;
