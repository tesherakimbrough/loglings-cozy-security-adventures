
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
import { useMobileOptimization } from '../hooks/useMobileOptimization';

interface AdvancedGamePlayProps {
  onEndGame: (gameData: GameData) => void;
  onBackToHome: () => void;
  userMode?: UserMode;
}

const AdvancedGamePlay = ({ onEndGame, onBackToHome, userMode = 'cozy-everyday' }: AdvancedGamePlayProps) => {
  const { t } = useI18n();
  const { shouldUseCompactLayout } = useMobileOptimization();
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
      <div className="w-full h-full flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 md:w-12 md:h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm md:text-base text-muted-foreground">Preparing your enhanced security adventure...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-2 md:p-4 pb-8">
      <div className="max-w-6xl mx-auto space-y-4 md:space-y-6">
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
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-center justify-center p-4">
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
                  className="logling-button w-full min-h-[44px]"
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
            <div className={`grid grid-cols-1 gap-4 md:gap-6 ${shouldUseCompactLayout ? '' : 'lg:grid-cols-3'}`}>
              <div className={shouldUseCompactLayout ? 'order-1' : 'lg:col-span-2'}>
                <Card className="cozy-card cozy-glow">
                  <CardHeader>
                    <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-lg md:text-2xl">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-accent animate-sparkle" />
                        <span className="truncate">{t.chapter} {currentRound}: {currentScenario.eventType}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          {currentScenario.category}
                        </Badge>
                        <Badge variant={difficulty === 'advanced' ? 'destructive' : difficulty === 'intermediate' ? 'default' : 'secondary'}>
                          {difficulty === 'advanced' ? t.advanced : difficulty === 'intermediate' ? t.intermediate : t.beginner}
                        </Badge>
                      </div>
                    </CardTitle>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {userMode === 'career-pro' 
                        ? t.analysisMode
                        : t.gentleCuriosity
                      }
                    </p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4 md:space-y-6">
                    <div className="bg-muted/30 p-4 md:p-6 rounded-2xl font-mono text-xs md:text-sm">
                      <div className="grid grid-cols-1 gap-3 md:gap-4">
                        <div className="space-y-2">
                          <p><span className="text-primary font-semibold">When:</span> {currentScenario.timestamp}</p>
                          <p><span className="text-primary font-semibold">From:</span> {currentScenario.sourceIP}</p>
                          <p><span className="text-primary font-semibold">What:</span> {currentScenario.eventType}</p>
                          <p><span className="text-primary font-semibold">Who:</span> {currentScenario.user}</p>
                          <p><span className="text-primary font-semibold">Where:</span> {currentScenario.location}</p>
                          <p><span className="text-primary font-semibold">Result:</span> {currentScenario.status}</p>
                        </div>
                      </div>
                      <div className="mt-4 p-3 md:p-4 bg-card/50 rounded-xl">
                        <p><span className="text-primary font-semibold">Story:</span> {currentScenario.details}</p>
                      </div>
                    </div>

                    {!feedback && (
                      <div className="space-y-4">
                        <p className="text-center font-medium text-sm md:text-base">How does this feel to you?</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                          <Button
                            onClick={() => handleThreatAssessment('safe')}
                            variant="outline"
                            className="h-auto p-4 md:p-6 flex flex-col gap-2 hover:scale-105 transition-transform cozy-button min-h-[80px] md:min-h-[100px]"
                          >
                            <span className="text-2xl md:text-3xl">🌸</span>
                            <span className="font-semibold text-xs md:text-sm">{t.safeAndPeaceful}</span>
                            <span className="text-xs text-muted-foreground text-center">{t.everythingNormal}</span>
                          </Button>
                          
                          <Button
                            onClick={() => handleThreatAssessment('warning')}
                            variant="outline"
                            className="h-auto p-4 md:p-6 flex flex-col gap-2 hover:scale-105 transition-transform cozy-button min-h-[80px] md:min-h-[100px]"
                          >
                            <span className="text-2xl md:text-3xl">🤔</span>
                            <span className="font-semibold text-xs md:text-sm">{t.curiousAndWatchful}</span>
                            <span className="text-xs text-muted-foreground text-center">{t.somethingDifferent}</span>
                          </Button>
                          
                          <Button
                            onClick={() => handleThreatAssessment('critical')}
                            variant="outline"
                            className="h-auto p-4 md:p-6 flex flex-col gap-2 hover:scale-105 transition-transform cozy-button min-h-[80px] md:min-h-[100px]"
                          >
                            <span className="text-2xl md:text-3xl">🚨</span>
                            <span className="font-semibold text-xs md:text-sm">{t.alertAndProtective}</span>
                            <span className="text-xs text-muted-foreground text-center">{t.dangerDetected}</span>
                          </Button>
                        </div>
                      </div>
                    )}

                    {feedback && (
                      <div className="space-y-4">
                        <div className={`p-4 md:p-6 rounded-2xl ${isCorrect ? 'bg-green-50 border border-green-200 dark:bg-green-950/30' : 'bg-orange-50 border border-orange-200 dark:bg-orange-950/30'}`}>
                          <div className="flex items-center gap-2 mb-3">
                            {isCorrect ? (
                              <>
                                <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                                <span className="font-semibold text-sm md:text-base text-green-700 dark:text-green-300">
                                  {t.excellentIntuition}
                                </span>
                              </>
                            ) : (
                              <>
                                <Brain className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
                                <span className="font-semibold text-sm md:text-base text-orange-700 dark:text-orange-300">
                                  {t.learningMoment}
                                </span>
                              </>
                            )}
                          </div>
                          <div className="text-xs md:text-sm whitespace-pre-line">{feedback}</div>
                        </div>

                        {showNextRound && (
                          <div className="text-center">
                            <Button 
                              onClick={() => {
                                nextRound();
                                handleFeedbackTrigger();
                              }}
                              className="logling-button min-h-[48px] w-full sm:w-auto"
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
              
              <div className={`space-y-4 md:space-y-6 ${shouldUseCompactLayout ? 'order-2' : ''}`}>
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
                        <div className="text-xl md:text-2xl font-bold text-primary">{streakCount}</div>
                        <div className="text-xs text-muted-foreground">{t.streak}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-primary">
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
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {currentScenario.realWorldContext}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            <div className="space-y-2 px-2">
              <div className="flex justify-between text-xs md:text-sm text-muted-foreground">
                <span>{t.securityJourney}</span>
                <span>{currentRound}/{totalRounds}</span>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-3 md:h-4 overflow-hidden">
                <div 
                  className="forest-gradient h-3 md:h-4 rounded-full transition-all duration-500 relative"
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
            <div className="relative w-full max-w-md">
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
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
              <FeedbackCollectionSystem
                trigger="scenario-feedback"
                scenarioId={currentScenario.id}
                onSubmit={() => setShowFeedback(false)}
                onClose={() => setShowFeedback(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedGamePlay;
