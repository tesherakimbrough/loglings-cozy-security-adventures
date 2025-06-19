
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Sparkles, MessageSquare, Bug, Leaf, TreePine } from 'lucide-react';

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
    <div className="relative">
      {/* Magical forest background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-cozy-moss/10 rounded-full blur-xl animate-gentle-float" />
        <div className="absolute bottom-0 right-1/3 w-24 h-24 bg-cozy-amber/15 rounded-full blur-lg animate-gentle-float animation-delay-1000" />
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-cozy-sage/10 rounded-full blur-md animate-sparkle animation-delay-500" />
      </div>

      <Card className="mb-6 cozy-card relative overflow-hidden bg-gradient-to-br from-cozy-cream/90 via-cozy-moss/15 to-cozy-amber/25 dark:from-forest-night/90 dark:via-tree-shadow/50 dark:to-moss-glow/15 border-cozy-sage/40 dark:border-moss-glow/40 shadow-xl backdrop-blur-sm">
        {/* Gentle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-gentle-float opacity-60 pointer-events-none" />
        
        <CardContent className="p-6 relative z-10">
          <div className="flex items-start gap-4">
            {/* Enhanced icon with forest theme */}
            <div className="flex-shrink-0 relative">
              <div className="w-10 h-10 bg-gradient-to-br from-cozy-sage via-cozy-forest to-cozy-moss rounded-xl flex items-center justify-center shadow-lg border border-cozy-sage/30">
                <Sparkles className="w-5 h-5 text-cozy-cream animate-sparkle" />
              </div>
              {/* Floating forest elements */}
              <div className="absolute -top-1 -right-1 w-3 h-3">
                <Leaf className="w-3 h-3 text-cozy-sage/60 animate-gentle-bounce" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="font-cozy font-semibold text-lg text-cozy-forest dark:text-moss-glow flex items-center gap-2">
                  <TreePine className="w-4 h-4 text-cozy-sage" />
                  Welcome to the Logling Forest Beta!
                  <span className="text-lg">🌱</span>
                </h3>
                <Badge variant="secondary" className="text-xs bg-cozy-sage/25 text-cozy-forest dark:text-moss-glow border-cozy-sage/40 font-cozy px-3 py-1 rounded-full shadow-sm">
                  Early Grove Access
                </Badge>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm text-cozy-warm/90 dark:text-sage-whisper font-body leading-relaxed">
                  You're exploring an early growth of our cozy cybersecurity forest! 
                  Your gentle feedback helps our woodland community flourish. Expect some growing pains as we nurture this magical space together.
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleFeedback}
                    className="text-xs bg-cozy-cream/70 hover:bg-cozy-cream/90 border-cozy-sage/50 text-cozy-forest hover:text-cozy-warm transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 font-cozy"
                  >
                    <MessageSquare className="w-3 h-3 mr-1.5" />
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
                    className="text-xs bg-cozy-amber/50 hover:bg-cozy-amber/70 border-cozy-rose/50 text-cozy-forest hover:text-cozy-warm transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 font-cozy"
                  >
                    <Bug className="w-3 h-3 mr-1.5" />
                    Report Growing Pains
                  </Button>
                </div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="flex-shrink-0 h-8 w-8 p-0 hover:bg-cozy-sage/25 text-cozy-warm/70 hover:text-cozy-forest transition-all duration-200 rounded-lg"
              aria-label="Dismiss beta banner"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Enhanced decorative forest elements */}
          <div className="absolute top-3 right-16 w-2 h-2 bg-cozy-sage/50 rounded-full animate-sparkle animation-delay-500" />
          <div className="absolute bottom-4 left-16 w-1.5 h-1.5 bg-cozy-amber/60 rounded-full animate-sparkle animation-delay-1000" />
          <div className="absolute top-1/2 right-6 w-1 h-1 bg-cozy-moss/70 rounded-full animate-twinkle animation-delay-1500" />
          
          {/* Subtle border glow */}
          <div className="absolute inset-0 rounded-lg border border-gradient-to-r from-cozy-sage/20 via-cozy-amber/20 to-cozy-moss/20 pointer-events-none" />
        </CardContent>
      </Card>
    </div>
  );
};

export default BetaLaunchBanner;
