
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Users, Clock, Gift } from 'lucide-react';
import { useMonetizationTracking } from '../hooks/useMonetizationTracking';

const EarlyAccessBanner = () => {
  const [userCount, setUserCount] = useState(42);
  const { trackPremiumInquiry } = useMonetizationTracking();

  useEffect(() => {
    // Simulate growing user count for social proof
    const interval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 3));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleEarlyAccessClick = () => {
    trackPremiumInquiry('early_access_banner', 'beta_signup');
    // Future: Open waitlist modal or redirect to signup
    alert('🎉 Early access signup coming soon! Follow us for updates.');
  };

  return (
    <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/20 dark:to-blue-950/20 border-emerald-200 dark:border-emerald-800">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">
                Early Access Beta
              </Badge>
            </div>
            <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-100 mb-1">
              Join the Cozy Cybersecurity Revolution! 🌱
            </h3>
            <p className="text-emerald-700 dark:text-emerald-200 text-sm">
              Be among the first to experience stress-free cybersecurity learning. 
              Get lifetime benefits and help shape the future of Loglings!
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-4 text-sm text-emerald-600 dark:text-emerald-400">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{userCount} pioneers</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Limited time</span>
              </div>
              <div className="flex items-center gap-1">
                <Gift className="w-4 h-4" />
                <span>Free lifetime</span>
              </div>
            </div>
            
            <Button 
              onClick={handleEarlyAccessClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Join Early Access
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarlyAccessBanner;
