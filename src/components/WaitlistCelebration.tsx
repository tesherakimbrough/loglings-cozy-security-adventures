
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Heart, Sparkles, Share2, Gift, TreePine, Star } from 'lucide-react';
import ConfettiCelebration from './ConfettiCelebration';
import { toast } from 'sonner';

interface WaitlistCelebrationProps {
  userName?: string;
  email: string;
  onContinue: () => void;
}

const WaitlistCelebration = ({ userName, email, onContinue }: WaitlistCelebrationProps) => {
  const [celebrationStage, setCelebrationStage] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [milestoneMessage, setMilestoneMessage] = useState('');

  useEffect(() => {
    // Start celebration sequence
    const timer1 = setTimeout(() => {
      setShowConfetti(true);
      setCelebrationStage(1);
    }, 500);

    const timer2 = setTimeout(() => {
      setCelebrationStage(2);
      generateMilestoneMessage();
    }, 2000);

    const timer3 = setTimeout(() => {
      setCelebrationStage(3);
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const generateMilestoneMessage = () => {
    const messages = [
      "🌟 You're joining a community of cozy cybersecurity learners!",
      "🌸 Welcome to our growing forest of digital guardians!",
      "✨ Your journey into gentle security learning begins!",
      "🌿 Thank you for helping us create something magical!",
      "💝 You're now part of the Loglings family!"
    ];
    setMilestoneMessage(messages[Math.floor(Math.random() * messages.length)]);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'I joined the Loglings waitlist!',
      text: 'Learning cybersecurity in the coziest way possible 🌿✨',
      url: window.location.origin + '/waitlist'
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success('Thanks for sharing! 🌸');
      } catch (err) {
        // User cancelled share
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      toast.success('Link copied to clipboard! 📋');
    }
  };

  const getPersonalizedMessage = () => {
    const displayName = userName || 'Forest Friend';
    return `Welcome to our cozy community, ${displayName}! 🌿`;
  };

  return (
    <>
      <ConfettiCelebration 
        isActive={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
      
      <Card className="w-full max-w-md cozy-card animate-scale-in relative z-10 overflow-hidden">
        {/* Magical background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-amber-50/50 to-rose-50/50 dark:from-green-950/20 dark:via-amber-950/20 dark:to-rose-950/20" />
        
        <CardHeader className="text-center pb-6 relative z-10">
          <div className="mx-auto mb-4 relative">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-amber-400 rounded-full flex items-center justify-center animate-gentle-bounce">
              {celebrationStage >= 1 && <Heart className="w-10 h-10 text-white animate-pulse" />}
            </div>
            
            {celebrationStage >= 2 && (
              <div className="absolute -top-2 -right-2 animate-bounce animation-delay-500">
                <Star className="w-6 h-6 text-amber-400" />
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-green-700 dark:text-green-300">
              🎉 Welcome to the Forest! 🎉
            </h1>
            
            {celebrationStage >= 1 && (
              <p className="text-lg font-medium text-primary animate-fade-in">
                {getPersonalizedMessage()}
              </p>
            )}
            
            {celebrationStage >= 2 && milestoneMessage && (
              <p className="text-muted-foreground animate-fade-in animation-delay-1000">
                {milestoneMessage}
              </p>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="text-center relative z-10">
          {celebrationStage >= 2 && (
            <div className="space-y-6 animate-fade-in animation-delay-1500">
              {/* Special Welcome Gift */}
              <div className="bg-gradient-to-r from-amber-50 to-rose-50 dark:from-amber-950/30 dark:to-rose-950/30 rounded-lg p-4 border border-amber-200 dark:border-amber-800/50">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Gift className="w-5 h-5 text-amber-600" />
                  <span className="font-semibold text-amber-700 dark:text-amber-300">
                    Welcome Gift Unlocked!
                  </span>
                </div>
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  🎨 Exclusive cozy wallpaper collection<br/>
                  📧 Check your email for the surprise!
                </p>
              </div>
              
              {/* Share Achievement */}
              <Button
                onClick={handleShare}
                variant="outline"
                className="w-full cozy-card border-2 border-primary/30 hover:border-primary/50 group"
              >
                <Share2 className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                Share Your Forest Journey
              </Button>
            </div>
          )}
          
          {celebrationStage >= 3 && (
            <div className="space-y-4 animate-fade-in animation-delay-2000">
              <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3">
                <p className="text-xs text-green-700 dark:text-green-300 flex items-center justify-center gap-2">
                  <TreePine className="w-3 h-3" />
                  You'll receive gentle updates as we grow our cozy forest
                  <Sparkles className="w-3 h-3" />
                </p>
              </div>
              
              <Button
                onClick={onContinue}
                className="logling-button w-full"
              >
                Continue Exploring the Forest
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default WaitlistCelebration;
