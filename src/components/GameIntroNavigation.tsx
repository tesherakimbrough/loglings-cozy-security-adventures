
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { BarChart3 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import WaitlistButton from './WaitlistButton';
import DonationButton from './DonationButton';
import GameSettings from './GameSettings';
import LaunchReadinessDashboard from './LaunchReadinessDashboard';
import AuthButton from './AuthButton';

const GameIntroNavigation = () => {
  const [showLaunchDashboard, setShowLaunchDashboard] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <GameSettings />
      <div className="flex items-center gap-3">
        {/* Launch Readiness Dashboard Access */}
        <Dialog open={showLaunchDashboard} onOpenChange={setShowLaunchDashboard}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="hidden md:flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Launch Dashboard
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
            <LaunchReadinessDashboard />
          </DialogContent>
        </Dialog>
        <AuthButton />
        <DonationButton />
        <WaitlistButton />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default GameIntroNavigation;
