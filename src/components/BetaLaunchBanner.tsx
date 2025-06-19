
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
    <Card className="mb-6 bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20 border-purple-200 dark:border-purple-800">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-purple-800 dark:text-purple-200">
                Welcome to Loglings Beta! 🌱
              </h3>
              <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                Early Access
              </Badge>
            </div>
            
            <p className="text-sm text-purple-700 dark:text-purple-300 mb-3">
              You're exploring an early version of our cozy cybersecurity adventure! 
              Your feedback helps our forest grow stronger. Expect some rough edges as we polish the experience together.
            </p>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleFeedback}
                className="text-xs bg-white/50 hover:bg-white/80 border-purple-300"
              >
                <MessageSquare className="w-3 h-3 mr-1" />
                Share Feedback
              </Button>
              
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  const bugReports = localStorage.getItem('loglings-bug-reports') || '[]';
                  console.log('Bug Reports:', JSON.parse(bugReports));
                  alert('Bug reports logged to console. Thank you for testing!');
                }}
                className="text-xs bg-white/50 hover:bg-white/80 border-purple-300"
              >
                <Bug className="w-3 h-3 mr-1" />
                Report Issues
              </Button>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="flex-shrink-0 h-8 w-8 p-0 hover:bg-white/20"
            aria-label="Dismiss beta banner"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BetaLaunchBanner;
