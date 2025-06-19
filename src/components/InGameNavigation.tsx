
import { useState } from 'react';
import { Home, Settings, Pause, Play, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface InGameNavigationProps {
  onBackToHome: () => void;
  onOpenSettings: () => void;
  onPause: () => void;
  onResume: () => void;
  isPaused: boolean;
  currentRound: number;
  totalRounds: number;
}

const InGameNavigation = ({
  onBackToHome,
  onOpenSettings,
  onPause,
  onResume,
  isPaused,
  currentRound,
  totalRounds
}: InGameNavigationProps) => {
  const [showExitDialog, setShowExitDialog] = useState(false);

  const handleExitClick = () => {
    setShowExitDialog(true);
  };

  const handleConfirmExit = () => {
    setShowExitDialog(false);
    onBackToHome();
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleExitClick}
          className="cozy-card hover:scale-105 transition-all"
          aria-label="Exit to home"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline ml-2">Home</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onOpenSettings}
          className="cozy-card hover:scale-105 transition-all"
          aria-label="Open settings"
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline ml-2">Settings</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={isPaused ? onResume : onPause}
          className="cozy-card hover:scale-105 transition-all"
          aria-label={isPaused ? "Resume game" : "Pause game"}
        >
          {isPaused ? (
            <Play className="w-4 h-4" />
          ) : (
            <Pause className="w-4 h-4" />
          )}
          <span className="hidden sm:inline ml-2">
            {isPaused ? 'Resume' : 'Pause'}
          </span>
        </Button>
      </div>

      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Home className="w-5 h-5 text-primary" />
              Return to Forest Home?
            </DialogTitle>
            <DialogDescription>
              You're currently on round {currentRound} of {totalRounds}. 
              Are you sure you want to leave your adventure? Your progress will be saved.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowExitDialog(false)}
              className="flex-1"
            >
              <X className="w-4 h-4 mr-2" />
              Stay & Continue
            </Button>
            <Button
              onClick={handleConfirmExit}
              className="flex-1 logling-button"
            >
              <Home className="w-4 h-4 mr-2" />
              Yes, Go Home
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InGameNavigation;
