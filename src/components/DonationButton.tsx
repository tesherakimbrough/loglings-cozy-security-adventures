
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Heart, Coffee, TreePine, ExternalLink, Sparkles } from 'lucide-react';
import { useLaunchAnalytics } from '../hooks/useLaunchAnalytics';

const DonationButton = () => {
  const { trackPremiumInterest } = useLaunchAnalytics();
  const [isOpen, setIsOpen] = useState(false);

  const handleDonationClick = (amount?: string) => {
    trackPremiumInterest(`donation_paypal_${amount || 'custom'}`);
    
    // Open PayPal donation link in a new tab
    window.open('https://paypal.me/BeautifullySpkn', '_blank');
    
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="cozy-card hover:scale-105 transition-transform border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-400"
        >
          <Heart className="w-4 h-4 mr-2" />
          Support Loglings
        </Button>
      </DialogTrigger>
      
      <DialogContent className="cozy-card max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center cozy-heading flex items-center justify-center gap-2">
            <TreePine className="w-6 h-6 text-primary" />
            Support Our Forest
            <Sparkles className="w-6 h-6 text-accent" />
          </DialogTitle>
        </DialogHeader>
        
        <CardContent className="p-0 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              Help Loglings grow into the most magical cybersecurity learning experience! 
              Your support keeps our forest cozy and accessible for everyone.
            </p>
          </div>

          {/* Donation Options */}
          <div className="space-y-3">
            <h4 className="font-medium text-center">Choose Your Support Level</h4>
            
            {/* Quick amounts */}
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col gap-2"
                onClick={() => handleDonationClick('3')}
              >
                <Coffee className="w-5 h-5" />
                <span className="text-xs">$3</span>
                <span className="text-xs text-muted-foreground">Coffee</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col gap-2"
                onClick={() => handleDonationClick('10')}
              >
                <TreePine className="w-5 h-5 text-green-600" />
                <span className="text-xs">$10</span>
                <span className="text-xs text-muted-foreground">Plant Tree</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col gap-2"
                onClick={() => handleDonationClick('25')}
              >
                <Heart className="w-5 h-5 text-rose-500" />
                <span className="text-xs">$25</span>
                <span className="text-xs text-muted-foreground">Forest Love</span>
              </Button>
            </div>

            {/* PayPal option */}
            <div className="space-y-2">
              <h5 className="text-sm font-medium text-center">Or donate any amount:</h5>
              <Button
                variant="outline"
                className="w-full justify-between"
                onClick={() => handleDonationClick()}
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  PayPal (Any Amount)
                </div>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">
                Your support helps:
              </h5>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Keep Loglings free for students</li>
                <li>• Add more cybersecurity scenarios</li>
                <li>• Improve accessibility features</li>
                <li>• Create new Logling characters</li>
                <li>• Enhance the cozy experience</li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Every contribution helps our forest grow stronger! 🌱
            </p>
          </div>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export default DonationButton;
