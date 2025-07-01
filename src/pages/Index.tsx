
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useUserProfile } from '../hooks/useUserProfile';
import { useGameData } from '../hooks/useGameData';
import { useI18n } from '../hooks/useI18n';
import { useAudioSystem } from '../hooks/useAudioSystem';
import GamePlay from '../components/GamePlay';
import GameResults from '../components/GameResults';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ModeToggle';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { useMonetizationTracking } from '@/hooks/useMonetizationTracking';
import UsageTrackingDisplay from '../components/UsageTrackingDisplay';
import PremiumPrompt from '../components/PremiumPrompt';
import { useFeedbackAndPremium } from '../hooks/useFeedbackAndPremium';
import { useUsageTracking } from '../hooks/useUsageTracking';
import { GameData } from '../types/gameTypes';
import { UserMode } from '../types/userTypes';

type GameState = 'intro' | 'playing' | 'results';

const Index = () => {
  const { user, signOut } = useAuth();
  const { profile, isLoading: isProfileLoading } = useUserProfile();
  const { gameData, resetGameData, updateGameData } = useGameData();
  const { t, setLanguage, language } = useI18n();
  const { playTrack, stopMusic } = useAudioSystem();
  const navigate = useNavigate();
  const { trackPremiumInquiry } = useMonetizationTracking();
  
  const { shouldShowPremiumPrompt, markPromptShown, markPromptDismissed, handleUpgrade } = useFeedbackAndPremium();
  const { isLimitReached, usage } = useUsageTracking();
  const [showPremiumPrompt, setShowPremiumPrompt] = useState(false);
  const [premiumPromptTrigger, setPremiumPromptTrigger] = useState<'sessions' | 'achievement' | 'score' | 'usage_limit'>('sessions');
  const [gameState, setGameState] = useState<GameState>('intro');
  const [userMode, setUserMode] = useState<UserMode>('cozy-everyday');

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  useEffect(() => {
    // Load previous session data on mount
    const savedSessions = localStorage.getItem('loglings-session-history');
    if (savedSessions) {
      const sessions = JSON.parse(savedSessions);
      updateGameData({ sessionsPlayed: sessions.length });
    }
  }, [updateGameData]);

  // Check for premium prompt triggers
  useEffect(() => {
    if (gameState === 'intro') {
      // Check for usage limit prompt
      if (isLimitReached('scenariosPerDay') && shouldShowPremiumPrompt('usage_limit')) {
        setPremiumPromptTrigger('usage_limit');
        setShowPremiumPrompt(true);
        markPromptShown('usage_limit');
      }
      // Check for session-based prompt
      else if (shouldShowPremiumPrompt('sessions', gameData.sessionsPlayed)) {
        setPremiumPromptTrigger('sessions');
        setShowPremiumPrompt(true);
        markPromptShown('sessions');
      }
    }
  }, [gameState, gameData.sessionsPlayed, isLimitReached, shouldShowPremiumPrompt, markPromptShown]);

  const handleStartGame = () => {
    playTrack('lofi');
    setGameState('playing');
  };

  const handleEndGame = (newGameData: GameData) => {
    playTrack('forest');
    setGameState('results');

    // Update game data with results
    updateGameData(newGameData);

    // Save session to history
    const savedSessions = localStorage.getItem('loglings-session-history');
    const sessions = savedSessions ? JSON.parse(savedSessions) : [];
    sessions.push({
      ...newGameData,
      date: new Date().toISOString()
    });
    localStorage.setItem('loglings-session-history', JSON.stringify(sessions));

    // Update sessions played count
    updateGameData({ sessionsPlayed: sessions.length });
  };

  const handlePlayAgain = () => {
    playTrack('lofi');
    resetGameData();
    setGameState('playing');
  };

  const handleEndSession = () => {
    stopMusic();
    resetGameData();
    setGameState('intro');
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang as any);
  };

  const handlePremiumPromptDismiss = () => {
    setShowPremiumPrompt(false);
    markPromptDismissed();
  };

  const handlePremiumUpgrade = () => {
    setShowPremiumPrompt(false);
    handleUpgrade();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary py-2 md:py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold text-primary">
            Logling Forest 🌲
          </h1>

          <nav className="flex items-center space-x-4 md:space-x-6">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <Avatar className="h-8 w-8">
                    {isProfileLoading ? (
                      <Skeleton className="h-8 w-8 rounded-full" />
                    ) : (
                      <>
                        <AvatarImage src={profile?.preferences?.musicType} alt={profile?.mode} />
                        <AvatarFallback>{profile?.mode?.charAt(0).toUpperCase()}</AvatarFallback>
                      </>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigate('/waitlist')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/pricing')}>
                  Pricing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>
                  Language: {language}
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('es')}>
                  Español
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {gameState === 'intro' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-primary mb-4">
                Welcome to Logling Forest!
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                Embark on a cozy cybersecurity adventure with your Logling friends.
              </p>
            </div>

            <div className="flex justify-center space-x-4">
              <Button onClick={handleStartGame} className="logling-button">
                Start Adventure
              </Button>
              <Button variant="outline" onClick={() => navigate('/waitlist')}>
                Learn More
              </Button>
            </div>
            
            {/* Add Usage Tracking Display */}
            <div className="max-w-md mx-auto">
              <UsageTrackingDisplay />
            </div>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Tip: Customize your profile to enhance your adventure experience.
              </p>
            </div>
          </div>
        )}

        {gameState === 'playing' && (
          <GamePlay onEndGame={handleEndGame} userMode={userMode} />
        )}

        {gameState === 'results' && (
          <GameResults
            gameData={gameData}
            onRestart={handlePlayAgain}
            userMode={userMode}
          />
        )}
      </main>

      {/* Premium Prompt Modal */}
      {showPremiumPrompt && (
        <PremiumPrompt
          trigger={premiumPromptTrigger}
          onDismiss={handlePremiumPromptDismiss}
          onUpgrade={handlePremiumUpgrade}
          sessionsPlayed={gameData.sessionsPlayed}
          currentScore={gameData.score}
          limitType={premiumPromptTrigger === 'usage_limit' ? 'Daily scenarios' : undefined}
        />
      )}
    </div>
  );
};

export default Index;
