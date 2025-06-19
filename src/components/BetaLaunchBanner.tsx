
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Sparkles, MessageSquare, Bug } from 'lucide-react';

const BetaLaunchBanner = () => {
  const [isVisible, setIsVisible] = useState(() => {
    const dismissed = localStorage.getItem('loglings-beta-banner-dismissed');
    return !dismissed;
  });

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('loglings-beta-banner-dismissed', 'true');
  };

  const handleFeedback = () => {
    // Trigger feedback system
    window.dispatchEvent(new CustomEvent('loglings-open-feedback'));
  };

  if (!isVisible) return null;

  return (
    <Card className="mb-6 cozy-card bg-gradient-to-r from-cozy-cream/80 via-cozy-moss/20 to-cozy-amber/30 dark:from-forest-night/80 dark:via-tree-shadow/40 dark:to-moss-glow/20 border-cozy-sage/30 dark:border-moss-glow/30 shadow-lg backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-cozy-sage to-cozy-forest rounded-full flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-cozy-cream animate-sparkle" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-cozy font-semibold text-cozy-forest dark:text-moss-glow">
                Welcome to the Logling Forest Beta! 🌱
              </h3>
              <Badge variant="secondary" className="text-xs bg-cozy-sage/20 text-cozy-forest border-cozy-sage/30 font-cozy">
                Early Grove Access
              </Badge>
            </div>
            
            <p className="text-sm text-cozy-warm/80 dark:text-sage-whisper mb-3 font-body leading-relaxed">
              You're exploring an early growth of our cozy cybersecurity forest! 
              Your gentle feedback helps our woodland community flourish. Expect some growing pains as we nurture this magical space together.
            </p>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleFeedback}
                className="text-xs bg-cozy-cream/60 hover:bg-cozy-cream/80 border-cozy-sage/40 text-cozy-forest hover:text-cozy-warm transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <MessageSquare className="w-3 h-3 mr-1" />
                Share Forest Wisdom
              </Button>
              
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  const bugReports = localStorage.getItem('loglings-bug-reports') || '[]';
                  console.log('Bug Reports:', JSON.parse(bugReports));
                  alert('Forest reports logged to console. Thank you for helping our grove grow! 🌿');
                }}
                className="text-xs bg-cozy-amber/40 hover:bg-cozy-amber/60 border-cozy-rose/40 text-cozy-forest hover:text-cozy-warm transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <Bug className="w-3 h-3 mr-1" />
                Report Growing Pains
              </Button>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="flex-shrink-0 h-8 w-8 p-0 hover:bg-cozy-sage/20 text-cozy-warm/60 hover:text-cozy-forest transition-colors duration-200"
            aria-label="Dismiss beta banner"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Decorative forest elements */}
        <div className="absolute top-2 right-12 w-1.5 h-1.5 bg-cozy-sage/40 rounded-full animate-sparkle animation-delay-500" />
        <div className="absolute bottom-3 left-12 w-1 h-1 bg-cozy-amber/50 rounded-full animate-sparkle animation-delay-1000" />
      </CardContent>
    </Card>
  );
};

export default BetaLaunchBanner;
