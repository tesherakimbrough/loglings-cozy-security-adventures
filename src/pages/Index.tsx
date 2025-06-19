
import { useState, useEffect } from 'react';
import GameIntro from '../components/GameIntro';
import GamePlay from '../components/GamePlay';
import GameResults from '../components/GameResults';
import MusicControlBar from '../components/MusicControlBar';
import OnboardingModal from '../components/OnboardingModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';
import EarlyAccessBanner from '../components/EarlyAccessBanner';
import { useUserProfile } from '../hooks/useUserProfile';
import { useAnalytics } from '../hooks/useAnalytics';
import { useMobileOptimization } from '../hooks/useMobileOptimization';
import { useSession } from '../hooks/useSession';
import { Sparkles, TreePine, Heart } from 'lucide-react';

export type GameState = 'intro' | 'playing' | 'results';

export interface GameData {
  score: number;
  totalRounds: number;
  correctAnswers: number;
  timeElapsed: number;
}

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [gameData, setGameData] = useState<GameData>({
    score: 0,
    totalRounds: 0,
    correctAnswers: 0,
    timeElapsed: 0
  });

  const { profile, isLoading, selectMode, needsOnboarding } = useUserProfile();
  const { trackGameStart, trackGameComplete } = useAnalytics();
  const { getMobileClasses, shouldShowMobileWarning } = useMobileOptimization();
  const { trackGameSession } = useSession();

  useEffect(() => {
    // Add mobile CSS classes to body
    document.body.className = getMobileClasses();
    
    return () => {
      document.body.className = '';
    };
  }, [getMobileClasses]);

  const startGame = () => {
    setGameState('playing');
    setGameData({
      score: 0,
      totalRounds: 0,
      correctAnswers: 0,
      timeElapsed: 0
    });
    
    trackGameStart(profile.mode);
    trackGameSession();
  };

  const endGame = (finalData: GameData) => {
    setGameData(finalData);
    setGameState('results');
    
    const accuracy = (finalData.correctAnswers / finalData.totalRounds) * 100;
    trackGameComplete(finalData.score, accuracy);
  };

  const resetGame = () => {
    setGameState('intro');
  };

  // Show loading while profile loads
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-amber-50 to-rose-50 dark:from-green-950/20 dark:via-amber-950/20 dark:to-rose-950/20" />
        
        <LoadingSpinner 
          size="lg" 
          message="Loading your cozy adventure..." 
          className="space-y-4 relative z-10"
          cozyVariant="forest"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced magical background matching waitlist */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-amber-50 to-rose-50 dark:from-green-950/20 dark:via-amber-950/20 dark:to-rose-950/20" />
      
      {/* Floating decorative elements throughout the game */}
      <div className="absolute top-20 left-10 animate-gentle-float">
        <Sparkles className="w-6 h-6 text-amber-400/60" />
      </div>
      <div className="absolute top-40 right-20 animate-gentle-float" style={{ animationDelay: '1s' }}>
        <TreePine className="w-8 h-8 text-green-400/60" />
      </div>
      <div className="absolute bottom-32 left-20 animate-gentle-float" style={{ animationDelay: '2s' }}>
        <Heart className="w-5 h-5 text-rose-400/60" />
      </div>
      <div className="absolute top-60 left-1/2 animate-gentle-float" style={{ animationDelay: '0.5s' }}>
        <div className="w-2 h-2 bg-rose-300 rounded-full animate-sparkle" />
      </div>

      {/* Mobile orientation warning */}
      {shouldShowMobileWarning && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-100 border-b border-yellow-300 p-2 text-center text-sm text-yellow-800 z-50">
          For the best experience, please rotate your device to portrait mode
        </div>
      )}

      {/* Early Access Banner */}
      {gameState === 'intro' && (
        <div className="relative z-20 p-4">
          <ErrorBoundary fallback={<div>Error loading banner</div>}>
            <EarlyAccessBanner />
          </ErrorBoundary>
        </div>
      )}

      {/* Onboarding Modal */}
      <ErrorBoundary fallback={<div>Error loading onboarding</div>}>
        <OnboardingModal 
          isOpen={needsOnboarding}
          onSelectMode={selectMode}
        />
      </ErrorBoundary>

      {/* Main Game Content with enhanced styling */}
      <div className="relative z-10">
        <ErrorBoundary>
          {gameState === 'intro' && <GameIntro onStartGame={startGame} userMode={profile.mode} />}
          {gameState === 'playing' && <GamePlay onEndGame={endGame} userMode={profile.mode} />}
          {gameState === 'results' && <GameResults gameData={gameData} onRestart={resetGame} userMode={profile.mode} />}
        </ErrorBoundary>
      </div>
      
      {/* Music control bar available throughout the app */}
      <ErrorBoundary fallback={null}>
        <MusicControlBar />
      </ErrorBoundary>
    </div>
  );
};

export default Index;
