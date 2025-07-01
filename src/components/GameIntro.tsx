
import { useState } from 'react';
import { Play, Heart, HelpCircle } from 'lucide-react';
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
import EarlyAccessBanner from './EarlyAccessBanner';
import LevelProgressionSystem from './LevelProgressionSystem';
import LearningPaths from './LearningPaths';
import AchievementSystem from './AchievementSystem';
import GameTutorial from './GameTutorial';
import { useUserProfile } from '../hooks/useUserProfile';
import { useI18n } from '../hooks/useI18n';
import { useMobileOptimization } from '../hooks/useMobileOptimization';

interface GameIntroProps {
  onStartGame: (mode: UserMode) => void;
  userMode?: UserMode;
}

const GameIntro = ({ onStartGame, userMode = 'cozy-everyday' }: GameIntroProps) => {
  const isProMode = userMode === 'career-pro';
  const { profile } = useUserProfile();
  const { t } = useI18n();
  const { shouldUseCompactLayout } = useMobileOptimization();
  const achievementSystem = AchievementSystem();
  const [showTutorial, setShowTutorial] = useState(false);

  const handleStartClick = () => {
    onStartGame(userMode);
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
  };

  return (
    <div className="w-full p-2 md:p-4">
      <div className="max-w-6xl mx-auto space-y-4 md:space-y-8">
        {/* Navigation */}
        <GameIntroNavigation />

        {/* Early Access Banner for new users */}
        {profile.progress.totalSessions < 3 && <EarlyAccessBanner />}

        {/* Main Header */}
        <GameIntroHeader userMode={userMode} />

        {/* Tutorial Button - Mobile Optimized */}
        <div className="text-center px-4">
          <Button
            variant="outline"
            onClick={() => setShowTutorial(true)}
            className="cozy-card flex items-center gap-2 w-full sm:w-auto min-h-[44px]"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm md:text-base">{t.tutorial} - {t.whatIsLoglings}</span>
          </Button>
        </div>

        {/* Enhanced Progress Section - Mobile Responsive */}
        <div className={`grid gap-4 md:gap-6 ${shouldUseCompactLayout ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
          <DailyChallenge onStartAdventure={handleStartClick} />
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

        {/* Start Adventure Button - Mobile Optimized */}
        <div className="text-center px-4">
          <Button 
            onClick={handleStartClick}
            size="lg"
            className="logling-button w-full sm:w-auto text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 animate-cozy-pulse min-h-[56px]"
          >
            <Play className="w-6 h-6 md:w-8 md:h-8 mr-2 md:mr-3" />
            <span className="truncate">
              {isProMode ? t.beginAdventure.replace(t.cozy, t.professionalTraining) : t.beginAdventure}
            </span>
          </Button>
        </div>

        {/* Creator Credit - Cozy Style - Mobile Optimized */}
        <div className="text-center pt-6 md:pt-8 border-t border-border/50 px-4">
          <p className="text-muted-foreground flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-sm md:text-base">
            <span>{t.lovinglyCreatedBy}</span>
            <span className="text-primary font-semibold flex items-center gap-1">
              <Heart className="w-4 h-4" />
              Teshera Kimbrough
            </span>
          </p>
          <p className="text-xs md:text-sm text-muted-foreground mt-2 px-2">
            {t.gameSubtitle}
          </p>
        </div>

        {/* Enhanced User Onboarding and Feedback Collection */}
        <EnhancedUserOnboarding />
        <LaunchFeedbackCollector 
          userSessions={profile.progress.totalSessions}
          currentScore={profile.progress.totalScore}
        />
      </div>

      {/* Tutorial Modal */}
      {showTutorial && (
        <GameTutorial
          onClose={() => setShowTutorial(false)}
          onComplete={handleTutorialComplete}
        />
      )}
    </div>
  );
};

export default GameIntro;
