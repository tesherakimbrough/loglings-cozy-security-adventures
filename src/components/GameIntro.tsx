import { Play, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserMode } from '../types/userTypes';
import ProgressTracker from './ProgressTracker';
import DailyChallenge from './DailyChallenge';
import GameIntroHeader from './GameIntroHeader';
import GameIntroGuides from './GameIntroGuides';
import GameIntroFeatures from './GameIntroFeatures';
import GameIntroNewFeatures from './GameIntroNewFeatures';
import GameIntroNavigation from './GameIntroNavigation';
import EnhancedUserOnboarding from './EnhancedUserOnboarding';
import LaunchFeedbackCollector from './LaunchFeedbackCollector';
import SoftLaunchReadinessChecker from './SoftLaunchReadinessChecker';
import EarlyAccessBanner from './EarlyAccessBanner';
import LaunchReadinessModal from './LaunchReadinessModal';
import LevelProgressionSystem from './LevelProgressionSystem';
import LearningPaths from './LearningPaths';
import AchievementSystem from './AchievementSystem';
import { useUserProfile } from '../hooks/useUserProfile';

interface GameIntroProps {
  onStartGame: (mode: UserMode) => void;
  userMode?: UserMode;
}

const GameIntro = ({ onStartGame, userMode = 'cozy-everyday' }: GameIntroProps) => {
  const isProMode = userMode === 'career-pro';
  const { profile } = useUserProfile();
  const achievementSystem = AchievementSystem();

  const handleStartClick = () => {
    onStartGame(userMode);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Enhanced Header with Navigation and Launch Readiness */}
        <div className="flex items-center justify-between">
          <GameIntroNavigation />
          <LaunchReadinessModal />
        </div>

        {/* Early Access Banner for new users */}
        {profile.progress.totalSessions < 3 && <EarlyAccessBanner />}

        {/* Main Header */}
        <GameIntroHeader userMode={userMode} />

        {/* Enhanced Progress Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          <DailyChallenge />
          <LevelProgressionSystem />
        </div>

        {/* Learning Paths Section */}
        <LearningPaths />

        {/* Achievements Section */}
        <achievementSystem.AchievementDisplay />

        {/* Meet Your Guides */}
        <GameIntroGuides userMode={userMode} />

        {/* How to Play - Mode Specific */}
        <GameIntroFeatures userMode={userMode} />

        {/* Enhanced Features Preview */}
        <GameIntroNewFeatures />

        {/* Soft Launch Readiness for experienced users */}
        {profile.progress.totalSessions >= 5 && (
          <SoftLaunchReadinessChecker />
        )}

        {/* Start Adventure Button */}
        <div className="text-center">
          <Button 
            onClick={handleStartClick}
            size="lg"
            className="logling-button text-xl px-12 py-8 animate-cozy-pulse"
          >
            <Play className="w-8 h-8 mr-3" />
            Begin {isProMode ? 'Professional Training' : 'Cozy Adventure'}
          </Button>
        </div>

        {/* Creator Credit - Cozy Style */}
        <div className="text-center pt-8 border-t border-border/50">
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            Lovingly crafted by 
            <span className="text-primary font-semibold flex items-center gap-1">
              <Heart className="w-4 h-4" />
              Teshera Kimbrough
            </span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Where learning cybersecurity feels like a warm hug 🤗
          </p>
        </div>

        {/* Enhanced User Onboarding and Feedback Collection */}
        <EnhancedUserOnboarding />
        <LaunchFeedbackCollector 
          userSessions={profile.progress.totalSessions}
          currentScore={profile.progress.totalScore}
        />
      </div>
    </div>
  );
};

export default GameIntro;
