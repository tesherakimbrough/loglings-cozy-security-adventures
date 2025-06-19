
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GameIntro from '@/components/GameIntro';
import GamePlay from '@/components/GamePlay';
import GameResults from '@/components/GameResults';
import ProgressTracker from '@/components/ProgressTracker';
import UserProfileSection from '@/components/UserProfileSection';
import { UserMode } from '@/types/userTypes';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useAuth } from '@/hooks/useAuth';

export interface GameData {
  score: number;
  accuracy: number;
  timeElapsed: number;
  correctAnswers: number;
  totalQuestions: number;
  difficulty: string;
}

const Index = () => {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'results'>('intro');
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [selectedMode, setSelectedMode] = useState<UserMode>('cozy-everyday');
  const { profile } = useUserProfile();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (profile) {
      setSelectedMode(profile.mode);
    }
  }, [profile]);

  const handleStartGame = (mode: UserMode) => {
    setSelectedMode(mode);
    setGameState('playing');
  };

  const handleEndGame = (data: GameData) => {
    setGameData(data);
    setGameState('results');
  };

  const handlePlayAgain = () => {
    setGameState('playing');
    setGameData(null);
  };

  const handleBackToIntro = () => {
    setGameState('intro');
    setGameData(null);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading your cozy adventure...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {user && <UserProfileSection />}
        
        {gameState === 'intro' && (
          <GameIntro onStartGame={handleStartGame} />
        )}
        
        {gameState === 'playing' && (
          <GamePlay 
            onEndGame={handleEndGame} 
            userMode={selectedMode}
          />
        )}
        
        {gameState === 'results' && gameData && (
          <div className="space-y-8">
            <GameResults 
              gameData={gameData}
              onPlayAgain={handlePlayAgain}
              onBackToIntro={handleBackToIntro}
            />
            
            <Tabs defaultValue="progress" className="w-full">
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="progress">Your Progress</TabsTrigger>
              </TabsList>
              <TabsContent value="progress" className="mt-6">
                <ProgressTracker />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
