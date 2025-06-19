
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';
import WaitlistButton from './WaitlistButton';
import DonationButton from './DonationButton';
import GameSettings from './GameSettings';
import AuthButton from './AuthButton';

const GameIntroNavigation = () => {
  return (
    <div className="flex items-center justify-between">
      <GameSettings />
      <div className="flex items-center gap-3">
        <AuthButton />
        <DonationButton />
        <WaitlistButton />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default GameIntroNavigation;
