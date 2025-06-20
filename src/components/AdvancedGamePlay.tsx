
import { useState } from 'react';
import GameHeader from './GameHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, Brain, Shield } from 'lucide-react';
import FeedbackCollectionSystem from './FeedbackCollectionSystem';
import GameSettings from './GameSettings';
import { useAdvancedGameLogic } from '../hooks/useAdvancedGameLogic';
import { UserMode } from '../types/userTypes';
import { GameData } from '../pages/Index';
import { useI18n } from '../hooks/useI18n';

interface AdvancedGamePlayProps {
  onEndGame: (gameData: GameData) => void;
  onBackToHome: () => void;
  userMode?: UserMode;
}

const AdvancedGamePlay = ({ onEndGame, onBackToHome, userMode = 'cozy-everyday' }: AdvancedGamePlayProps) => {
  const { t } = useI18n();
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const {
    currentRound,
    score,
    correctAnswers,
    timeElapsed,
    currentScenario,
    feedback,
    showNextRound,
    isCorrect,
    totalRounds,
    difficulty,
    streakCount,
    handleThreatAssessment,
    nextRound
  } = useAdvancedGameLogic(userMode, onEndGame);

  const handleFeedbackTrigger = () => {
    if (currentRound % 5 === 0) { // Every 5 rounds
      setShowFeedback(true);
    }
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleOpenSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  if (!currentScenario) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Preparing your enhanced security adventure...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <GameHeader
          todaysChallenge={null}
          currentRound={currentRound}
          totalRounds={totalRounds}
          score={score}
          timeElapsed={timeElapsed}
          onBackToHome={onBackToHome}
          onOpenSettings={handleOpenSettings}
          onPause={handlePause}
          onResume={handleResume}
          isPaused={isPaused}
        />

        {/* Pause Overlay */}
        {isPaused && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-center justify-center">
            <Card className="w-full max-w-md cozy-card cozy-glow">
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  {t.adventurePaused}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  {t.takeYourTime}
                </p>
                <Button 
                  onClick={handleResume}
                  className="logling-button w-full"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {t.resumeAdventure}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {!isPaused && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="cozy-card cozy-glow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Sparkles className="w-6 h-6 text-accent animate-sparkle" />
                      {t.chapter} {currentRound}: {currentScenario.eventType}
                      <Badge variant="outline" className="ml-2 text-xs">
                        {currentScenario.category}
                      </Badge>
                      <Badge variant={difficulty === 'advanced' ? 'destructive' : difficulty === 'intermediate' ? 'default' : 'secondary'}>
                        {difficulty === 'advanced' ? t.advanced : difficulty === 'intermediate' ? t.intermediate : t.beginner}
                      </Badge>
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {userMode === 'career-pro' 
                        ? t.analysisMode
                        : t.gentleCuriosity
                      }
                    </p>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="bg-muted/30 p-6 rounded-2xl font-mono text-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p><span className="text-primary font-semibold">When:</span> {currentScenario.timestamp}</p>
                          <p><span className="text-primary font-semibold">From:</span> {currentScenario.sourceIP}</p>
                          <p><span className="text-primary font-semibold">What:</span> {currentScenario.eventType}</p>
                        </div>
                        <div className="space-y-2">
                          <p><span className="text-primary font-semibold">Who:</span> {currentScenario.user}</p>
                          <p><span className="text-primary font-semibold">Where:</span> {currentScenario.location}</p>
                          <p><span className="text-primary font-semibold">Result:</span> {currentScenario.status}</p>
                        </div>
                      </div>
                      <div className="mt-4 p-4 bg-card/50 rounded-xl">
                        <p><span className="text-primary font-semibold">Story:</span> {currentScenario.details}</p>
                      </div>
                    </div>

                    {!feedback && (
                      <div className="space-y-4">
                        <p className="text-center font-medium">How does this feel to you?</p>
                        <div className="grid grid-cols-3 gap-4">
                          <Button
                            onClick={() => handleThreatAssessment('safe')}
                            variant="outline"
                            className="h-auto p-6 flex flex-col gap-2 hover:scale-105 transition-transform cozy-button"
                          >
                            <span className="text-3xl">🌸</span>
                            <span className="font-semibold">{t.safeAndPeaceful}</span>
                            <span className="text-xs text-muted-foreground">{t.everythingNormal}</span>
                          </Button>
                          
                          <Button
                            onClick={() => handleThreatAssessment('warning')}
                            variant="outline"
                            className="h-auto p-6 flex flex-col gap-2 hover:scale-105 transition-transform cozy-button"
                          >
                            <span className="text-3xl">🤔</span>
                            <span className="font-semibold">{t.curiousAndWatchful}</span>
                            <span className="text-xs text-muted-foreground">{t.somethingDifferent}</span>
                          </Button>
                          
                          <Button
                            onClick={() => handleThreatAssessment('critical')}
                            variant="outline"
                            className="h-auto p-6 flex flex-col gap-2 hover:scale-105 transition-transform cozy-button"
                          >
                            <span className="text-3xl">🚨</span>
                            <span className="font-semibold">{t.alertAndProtective}</span>
                            <span className="text-xs text-muted-foreground">{t.dangerDetected}</span>
                          </Button>
                        </div>
                      </div>
                    )}

                    {feedback && (
                      <div className="space-y-4">
                        <div className={`p-6 rounded-2xl ${isCorrect ? 'bg-green-50 border border-green-200 dark:bg-green-950/30' : 'bg-orange-50 border border-orange-200 dark:bg-orange-950/30'}`}>
                          <div className="flex items-center gap-2 mb-3">
                            {isCorrect ? (
                              <>
                                <Sparkles className="w-5 h-5 text-green-600" />
                                <span className="font-semibold text-green-700 dark:text-green-300">
                                  {t.excellentIntuition}
                                </span>
                              </>
                            ) : (
                              <>
                                <Brain className="w-5 h-5 text-orange-600" />
                                <span className="font-semibold text-orange-700 dark:text-orange-300">
                                  {t.learningMoment}
                                </span>
                              </>
                            )}
                          </div>
                          <div className="text-sm whitespace-pre-line">{feedback}</div>
                        </div>

                        {showNextRound && (
                          <div className="text-center">
                            <Button 
                              onClick={() => {
                                nextRound();
                                handleFeedbackTrigger();
                              }}
                              className="logling-button"
                              size="lg"
                            >
                              {currentRound >= totalRounds ? t.completeAdventure : t.continueJourney}
                              <Sparkles className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card className="cozy-card">
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      {t.yourGrowth}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{streakCount}</div>
                        <div className="text-xs text-muted-foreground">{t.streak}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {currentRound > 1 ? Math.round((correctAnswers / (currentRound - 1)) * 100) : 100}%
                        </div>
                        <div className="text-xs text-muted-foreground">{t.accuracy}</div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Badge variant={difficulty === 'advanced' ? 'destructive' : difficulty === 'intermediate' ? 'default' : 'secondary'}>
                        <Shield className="w-3 h-3 mr-1" />
                        {difficulty === 'advanced' ? t.advanced : difficulty === 'intermediate' ? t.intermediate : t.beginner} {t.level}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {currentScenario && (
                  <Card className="cozy-card">
                    <CardHeader>
                      <CardTitle className="text-sm">{t.realWorldInsight}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {currentScenario.realWorldContext}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{t.securityJourney}</span>
                <span>{currentRound}/{totalRounds}</span>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-4 overflow-hidden">
                <div 
                  className="forest-gradient h-4 rounded-full transition-all duration-500 relative"
                  style={{ width: `${(currentRound / totalRounds) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Settings Modal Overlay */}
        {showSettings && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative">
              <GameSettings />
              <Button
                variant="outline"
                onClick={handleCloseSettings}
                className="absolute top-4 right-4 h-8 w-8 p-0"
              >
                ×
              </Button>
            </div>
          </div>
        )}

        {showFeedback && (
          <FeedbackCollectionSystem
            trigger="scenario-feedback"
            scenarioId={currentScenario.id}
            onSubmit={() => setShowFeedback(false)}
            onClose={() => setShowFeedback(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AdvancedGamePlay;
