
import { useState, useEffect } from 'react';
import { X, Sprout, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const EarlyAccessBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem('loglings-banner-dismissed');
    if (dismissed) {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('loglings-banner-dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <Card className="relative overflow-hidden bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 dark:from-green-950/30 dark:via-emerald-950/30 dark:to-green-950/30 border-green-200 dark:border-green-800/50 cozy-glow animate-gentle-bounce">
      <div className="p-6 text-center relative">
        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="absolute top-2 right-2 w-8 h-8 text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Animated icons */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="animate-gentle-float">
            <Sprout className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div className="animate-cozy-pulse">
            <Heart className="w-6 h-6 text-rose-500 dark:text-rose-400" />
          </div>
          <div className="animate-gentle-float animation-delay-1000">
            <Sprout className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        </div>

        {/* Main message */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 flex items-center justify-center gap-2">
            🌱 Welcome to Loglings Early Access! 🌱
          </h2>
          
          <p className="text-lg text-foreground leading-relaxed">
            We're so glad you're here. Loglings is open for gentle cybersecurity adventures—explore, learn, and help us shape our cozy digital forest.
          </p>
          
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-lg p-4 mt-4">
            <p className="text-amber-800 dark:text-amber-200 font-medium mb-2">
              <em>Heads up!</em> We're still adding more relaxing ambient sounds and cozy music.
            </p>
            <p className="text-amber-700 dark:text-amber-300">
              If you'd like to be first to try new audio features (and get exclusive sneak peeks), join the waitlist and we'll send gentle updates your way.
            </p>
          </div>
          
          <p className="text-muted-foreground font-medium mt-4">
            Thank you for growing with us! 🌿
          </p>
        </div>
      </div>
    </Card>
  );
};

export default EarlyAccessBanner;
