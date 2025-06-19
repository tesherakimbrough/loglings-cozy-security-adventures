
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
    <Card className="welcome-highlight-box relative overflow-hidden animate-gentle-bounce">
      <div className="p-6 text-center relative">
        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className="absolute top-2 right-2 w-8 h-8 text-text-whisper hover:text-text-cozy gentle-hover"
        >
          <X className="w-4 h-4" />
        </Button>

        {/* Animated icons */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="animate-gentle-float firefly-twinkle">
            <Sprout className="w-8 h-8 text-leaf-glow" />
          </div>
          <div className="animate-cozy-pulse">
            <Heart className="w-6 h-6 text-warm-amber" />
          </div>
          <div className="animate-gentle-float animation-delay-1000 firefly-twinkle">
            <Sprout className="w-8 h-8 text-spring-moss" />
          </div>
        </div>

        {/* Main message */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold welcome-header flex items-center justify-center gap-2">
            🌱 Welcome to Loglings Early Access! 🌱
          </h2>
          
          <p className="text-lg text-text-cozy leading-relaxed cozy-body">
            We're so glad you're here. Loglings is open for gentle cybersecurity adventures—explore, learn, and help us shape our cozy digital forest.
          </p>
          
          <div className="welcome-highlight-box p-4 mt-4">
            <p className="text-warm-amber font-medium mb-2">
              <em>Heads up!</em> We're still adding more relaxing ambient sounds and cozy music.
            </p>
            <p className="text-text-cozy cozy-body">
              If you'd like to be first to try new audio features (and get exclusive sneak peeks), join the waitlist and we'll send gentle updates your way.
            </p>
          </div>
          
          <p className="text-text-whisper font-medium mt-4 cozy-body">
            Thank you for growing with us! 🌿
          </p>
        </div>
      </div>
    </Card>
  );
};

export default EarlyAccessBanner;
