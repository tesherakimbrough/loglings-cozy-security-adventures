import { useState, useEffect } from 'react';
import { Heart, Sparkles, Clock, RotateCcw, TreePine, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GameData } from '../pages/Index';
import { UserMode } from '../types/userTypes';
import SocialSharing from './SocialSharing';
import EnhancedSocialSharing from './EnhancedSocialSharing';
import PremiumPrompt from './PremiumPrompt';
import LaunchFeedbackForm from './LaunchFeedbackForm';
import { useFeedbackAndPremium } from '../hooks/useFeedbackAndPremium';
import { useLaunchAnalytics } from '../hooks/useLaunchAnalytics';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';

interface GameResultsProps {
  gameData: GameData;
  onRestart: () => void;
  userMode?: UserMode;
}

const GameResults = ({ gameData, onRestart, userMode = 'cozy-everyday' }: GameResultsProps) => {
  const [bestScore, setBestScore] = useState<number>(0);
  const [showPremiumPrompt, setShowPremiumPrompt] = useState(false);
  const [showLaunchFeedback, setShowLaunchFeedback] = useState(false);
  const [premiumPromptType, setPremiumPromptType] = useState<'sessions' | 'score' | 'achievement'>('sessions');
  
  const { shouldShowPremiumPrompt, markPromptShown, markPromptDismissed, handleUpgrade } = useFeedbackAndPremium();
  const { trackLaunchInteraction } = useLaunchAnalytics();
  const { announceToScreenReader } = useKeyboardNavigation();

  useEffect(() => {
    // Announce results to screen readers
    const accuracy = Math.round((gameData.correctAnswers / gameData.totalRounds) * 100);
    announceToScreenReader(
      `Adventure complete! You collected ${gameData.score} joy points with ${accuracy}% accuracy. ${gameData.correctAnswers} Logling friends helped successfully.`
    );

    // Load best score from localStorage
    const savedBestScore = localStorage.getItem('loglings-best-joy');
    const currentBest = savedBestScore ? parseInt(savedBestScore) : 0;
    
    if (gameData.score > currentBest) {
      localStorage.setItem('loglings-best-joy', gameData.score.toString());
      setBestScore(gameData.score);
      announceToScreenReader('Congratulations! You achieved a new personal best!');
    } else {
      setBestScore(currentBest);
    }

    // Update progress tracking
    updateProgressTracking();
    
    // Check for premium prompts
    checkForPremiumPrompts();

    // Check for launch feedback (every 3rd session)
    const sessionCount = JSON.parse(localStorage.getItem('loglings-progress') || '{}').totalSessions || 0;
    if (sessionCount > 0 && sessionCount % 3 === 0 && !localStorage.getItem('loglings-launch-feedback-shown')) {
      setTimeout(() => {
        setShowLaunchFeedback(true);
        localStorage.setItem('loglings-launch-feedback-shown', 'true');
      }, 2000);
    }
  }, [gameData.score]);

  const updateProgressTracking = () => {
    const savedProgress = localStorage.getItem('loglings-progress');
    let progress = savedProgress ? JSON.parse(savedProgress) : {
      totalSessions: 0,
      totalScore: 0,
      correctAnswers: 0,
      loglingsFriended: [],
      achievements: [],
      currentStreak: 0,
      longestStreak: 0
    };

    progress.totalSessions += 1;
    progress.totalScore += gameData.score;
    progress.correctAnswers += gameData.correctAnswers;

    const accuracy = Math.round((gameData.correctAnswers / gameData.totalRounds) * 100);
    progress.achievements = progress.achievements.map((achievement: any) => {
      if (achievement.id === 'first-friend' && !achievement.unlocked) {
        achievement.unlocked = true;
      }
      if (achievement.id === 'curious-explorer' && !achievement.unlocked) {
        achievement.progress = Math.min((achievement.progress || 0) + 1, achievement.maxProgress);
        if (achievement.progress >= achievement.maxProgress) {
          achievement.unlocked = true;
        }
      }
      if (achievement.id === 'forest-guardian' && !achievement.unlocked && accuracy >= 90) {
        achievement.unlocked = true;
      }
      if (achievement.id === 'wisdom-keeper' && !achievement.unlocked) {
        achievement.progress = Math.min(progress.totalScore, achievement.maxProgress);
        if (achievement.progress >= achievement.maxProgress) {
          achievement.unlocked = true;
        }
      }
      return achievement;
    });

    localStorage.setItem('loglings-progress', JSON.stringify(progress));
  };

  const checkForPremiumPrompts = () => {
    const savedProgress = localStorage.getItem('loglings-progress');
    const progress = savedProgress ? JSON.parse(savedProgress) : { totalSessions: 0 };
    
    const accuracy = Math.round((gameData.correctAnswers / gameData.totalRounds) * 100);
    
    if (shouldShowPremiumPrompt('sessions', progress.totalSessions)) {
      setPremiumPromptType('sessions');
      setShowPremiumPrompt(true);
      markPromptShown('sessions');
      return;
    }
    
    if (shouldShowPremiumPrompt('score', undefined, gameData.score)) {
      setPremiumPromptType('score');
      setShowPremiumPrompt(true);
      markPromptShown('score');
      return;
    }
    
    if (accuracy >= 90 && shouldShowPremiumPrompt('achievement')) {
      setPremiumPromptType('achievement');
      setShowPremiumPrompt(true);
      markPromptShown('achievement');
      return;
    }
  };

  const handlePremiumDismiss = () => {
    setShowPremiumPrompt(false);
    markPromptDismissed();
  };

  const handlePremiumUpgrade = () => {
    setShowPremiumPrompt(false);
    handleUpgrade();
  };

  const handleLaunchFeedbackSubmit = (feedback: any) => {
    setShowLaunchFeedback(false);
    trackLaunchInteraction('feedback_submitted', 'game_results');
    announceToScreenReader('Thank you for helping our forest grow with your feedback!');
  };

  const handleRestartClick = () => {
    trackLaunchInteraction('game_restart', 'results_screen');
    announceToScreenReader('Starting a new forest adventure!');
    onRestart();
  };

  const accuracy = Math.round((gameData.correctAnswers / gameData.totalRounds) * 100);
  const isNewRecord = gameData.score === bestScore && bestScore > 0;

  const getCozyLevel = () => {
    if (accuracy >= 90) return { 
      level: 'Logling Whisperer', 
      color: 'text-leaf-glow', 
      icon: TreePine,
      message: 'The Loglings sing songs about your kindness!' 
    };
    if (accuracy >= 75) return { 
      level: 'Forest Guardian', 
      color: 'text-warm-amber', 
      icon: Star,
      message: 'You bring such warmth to our digital grove!' 
    };
    if (accuracy >= 60) return { 
      level: 'Curious Adventurer', 
      color: 'text-blue-500', 
      icon: Sparkles,
      message: 'Your curiosity makes the Loglings dance with joy!' 
    };
    return { 
      level: 'Gentle Learner', 
      color: 'text-accessible-secondary', 
      icon: Heart,
      message: 'Every step you take fills our hearts with hope!' 
    };
  };

  const cozyLevel = getCozyLevel();
  const CozyIcon = cozyLevel.icon;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showLaunchFeedback) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <LaunchFeedbackForm
          onSubmit={handleLaunchFeedbackSubmit}
          onSkip={() => setShowLaunchFeedback(false)}
        />
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Skip link for screen readers */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          {/* Header */}
          <header className="text-center space-y-6" id="main-content">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="animate-gentle-float">
                <TreePine 
                  className={`w-16 h-16 ${isNewRecord ? 'text-warm-amber animate-sparkle' : 'text-leaf-glow'}`}
                  aria-hidden="true"
                />
              </div>
              <div className="space-y-2">
                <h1 className="text-6xl font-bold cozy-heading bg-gradient-to-r from-leaf-glow to-warm-amber bg-clip-text text-transparent">
                  Adventure Complete!
                </h1>
                <p className="text-xl text-accessible-primary">
                  The Loglings are so proud of you! 🌸
                </p>
              </div>
              <div className="animate-gentle-float animation-delay-1000">
                <Heart className="w-16 h-16 text-warm-amber animate-sparkle" aria-hidden="true" />
              </div>
            </div>
            {isNewRecord && (
              <Badge className="bg-warm-amber/20 text-warm-amber border-warm-amber text-lg px-6 py-3 animate-cozy-pulse">
                ✨ New Personal Best! The forest celebrates! ✨
              </Badge>
            )}
          </header>

          {/* Results and Enhanced Social Sharing Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Joy Collected Card */}
            <Card className="cozy-card cozy-glow candlelit-warmth">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-leaf-glow/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-gentle-float">
                  <Sparkles className="w-8 h-8 text-leaf-glow" aria-hidden="true" />
                </div>
                <CardTitle className="cozy-heading text-leaf-glow">Joy Collected</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-6xl font-bold stat-number" aria-label={`${gameData.score} joy points collected`}>
                  {gameData.score}
                </div>
                <div className="text-accessible-secondary">
                  Best Collection: <span className="text-warm-amber font-semibold">{bestScore}</span>
                </div>
              </CardContent>
            </Card>

            {/* Cozy Achievement Card */}
            <Card className="cozy-card cozy-glow candlelit-warmth">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 bg-warm-amber/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-gentle-float animation-delay-500`}>
                  <CozyIcon className={`w-8 h-8 ${cozyLevel.color}`} aria-hidden="true" />
                </div>
                <CardTitle className="cozy-heading text-warm-amber">Your Cozy Title</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className={`text-2xl font-bold ${cozyLevel.color}`}>{cozyLevel.level}</div>
                <div className="text-accessible-secondary text-sm">
                  {cozyLevel.message}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Social Sharing */}
            <EnhancedSocialSharing 
              gameData={gameData} 
              achievements={['Forest Guardian', 'Wisdom Keeper']}
            />
          </div>

          {/* Detailed Garden Stats */}
          <Card className="cozy-card cozy-glow candlelit-warmth">
            <CardHeader>
              <CardTitle className="text-center text-3xl cozy-heading text-leaf-glow">Your Adventure Garden</CardTitle>
              <p className="text-center text-accessible-secondary">Look at all the beautiful moments you've collected!</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-green-200 dark:bg-green-800/30 rounded-full flex items-center justify-center mx-auto animate-gentle-float">
                    <Heart className="w-6 h-6 text-green-600 dark:text-green-400" aria-hidden="true" />
                  </div>
                  <div className="text-3xl font-bold stat-number" aria-label={`${gameData.correctAnswers} Logling friends helped`}>
                    {gameData.correctAnswers}
                  </div>
                  <div className="text-sm text-accessible-secondary">Logling Friends</div>
                  <div className="text-xs text-accessible-secondary">helped successfully</div>
                </div>
                
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-warm-amber/20 rounded-full flex items-center justify-center mx-auto animate-gentle-float animation-delay-200">
                    <Sparkles className="w-6 h-6 text-warm-amber" aria-hidden="true" />
                  </div>
                  <div className="text-3xl font-bold text-warm-amber" aria-label={`${accuracy} percent harmony rate`}>
                    {accuracy}%
                  </div>
                  <div className="text-sm text-accessible-secondary">Harmony Rate</div>
                  <div className="text-xs text-accessible-secondary">with forest wisdom</div>
                </div>
                
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-blue-200 dark:bg-blue-800/30 rounded-full flex items-center justify-center mx-auto animate-gentle-float animation-delay-400">
                    <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400" aria-label={`${formatTime(gameData.timeElapsed)} peaceful time exploring`}>
                    {formatTime(gameData.timeElapsed)}
                  </div>
                  <div className="text-sm text-accessible-secondary">Peaceful Time</div>
                  <div className="text-xs text-accessible-secondary">exploring together</div>
                </div>
                
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-leaf-glow/20 rounded-full flex items-center justify-center mx-auto animate-gentle-float animation-delay-600">
                    <TreePine className="w-6 h-6 text-leaf-glow" aria-hidden="true" />
                  </div>
                  <div className="text-3xl font-bold stat-number">
                    {Math.round((gameData.timeElapsed / gameData.totalRounds) * 10) / 10}s
                  </div>
                  <div className="text-sm text-accessible-secondary">Thoughtful Pace</div>
                  <div className="text-xs text-accessible-secondary">per discovery</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gentle Feedback */}
          <Card className="cozy-card cozy-glow candlelit-warmth">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-semibold cozy-heading text-leaf-glow">Message from the Forest Elder</h3>
                <div className="text-accessible-secondary max-w-3xl mx-auto text-lg leading-relaxed">
                  {accuracy >= 90 && "✨ Your heart shines with the wisdom of the ancient trees! The Loglings gather around you with such joy. You've become a true guardian of our digital forest."}
                  {accuracy >= 75 && accuracy < 90 && "🌸 Your gentle spirit and keen observation bring such warmth to our grove. The Loglings dance when they see you coming!"}
                  {accuracy >= 60 && accuracy < 75 && "🌱 Every question you ask and every choice you make helps our forest grow stronger. Your curiosity is a gift to all of us."}
                  {accuracy < 60 && "💙 Your willingness to learn and explore fills our hearts with hope. Remember, every great guardian started exactly where you are now."}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Continue Adventure */}
          <div className="flex justify-center gap-4">
            <Button 
              onClick={handleRestartClick}
              size="lg"
              className="logling-button text-xl px-12 py-8 animate-cozy-pulse"
              aria-label="Start a new forest adventure"
            >
              <RotateCcw className="w-6 h-6 mr-3" aria-hidden="true" />
              Continue Our Adventure
            </Button>
          </div>

          {/* Creator Credit - Cozy Style */}
          <footer className="text-center pt-8 border-t border-border/50">
            <p className="text-accessible-secondary flex items-center justify-center gap-2">
              Lovingly crafted by 
              <span className="text-leaf-glow font-semibold flex items-center gap-1">
                <Heart className="w-4 h-4" aria-hidden="true" />
                Teshera Kimbrough
              </span>
              - AI Security Engineer
            </p>
            <p className="text-sm text-accessible-secondary mt-2">
              Where cybersecurity learning blooms like wildflowers 🌼
            </p>
            <p className="text-xs text-accessible-secondary mt-1">
              May your journey through digital forests always be filled with wonder
            </p>
          </footer>
        </div>
      </div>

      {showPremiumPrompt && (
        <PremiumPrompt
          trigger={premiumPromptType}
          onDismiss={handlePremiumDismiss}
          onUpgrade={handlePremiumUpgrade}
          sessionsPlayed={JSON.parse(localStorage.getItem('loglings-progress') || '{}').totalSessions}
          currentScore={gameData.score}
          achievement={premiumPromptType === 'achievement' ? 'Forest Guardian' : undefined}
        />
      )}
    </>
  );
};

export default GameResults;
