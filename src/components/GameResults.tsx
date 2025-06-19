
import { useState, useEffect } from 'react';
import { Heart, Sparkles, Clock, RotateCcw, TreePine, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GameData } from '../pages/Index';

interface GameResultsProps {
  gameData: GameData;
  onRestart: () => void;
}

const GameResults = ({ gameData, onRestart }: GameResultsProps) => {
  const [bestScore, setBestScore] = useState<number>(0);

  useEffect(() => {
    // Load best score from localStorage
    const savedBestScore = localStorage.getItem('loglings-best-joy');
    const currentBest = savedBestScore ? parseInt(savedBestScore) : 0;
    
    if (gameData.score > currentBest) {
      localStorage.setItem('loglings-best-joy', gameData.score.toString());
      setBestScore(gameData.score);
    } else {
      setBestScore(currentBest);
    }
  }, [gameData.score]);

  const accuracy = Math.round((gameData.correctAnswers / gameData.totalRounds) * 100);
  const isNewRecord = gameData.score === bestScore && bestScore > 0;

  const getCozyLevel = () => {
    if (accuracy >= 90) return { 
      level: 'Logling Whisperer', 
      color: 'text-primary', 
      icon: TreePine,
      message: 'The Loglings sing songs about your kindness!' 
    };
    if (accuracy >= 75) return { 
      level: 'Forest Guardian', 
      color: 'text-accent', 
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
      color: 'text-muted-foreground', 
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="animate-gentle-float">
              <TreePine className={`w-16 h-16 ${isNewRecord ? 'text-accent animate-sparkle' : 'text-primary'}`} />
            </div>
            <div className="space-y-2">
              <h1 className="text-6xl font-bold forest-gradient bg-clip-text text-transparent">
                Adventure Complete!
              </h1>
              <p className="text-xl text-primary/80">
                The Loglings are so proud of you! 🌸
              </p>
            </div>
            <div className="animate-gentle-float animation-delay-1000">
              <Heart className="w-16 h-16 text-accent animate-sparkle" />
            </div>
          </div>
          {isNewRecord && (
            <Badge className="bg-accent/20 text-accent border-accent text-lg px-6 py-3 animate-cozy-pulse">
              ✨ New Personal Best! The forest celebrates! ✨
            </Badge>
          )}
        </div>

        {/* Results Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Joy Collected Card */}
          <Card className="cozy-card cozy-glow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-gentle-float">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-primary">Joy Collected</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-6xl font-bold text-primary">{gameData.score}</div>
              <div className="text-muted-foreground">
                Best Collection: <span className="text-accent font-semibold">{bestScore}</span>
              </div>
            </CardContent>
          </Card>

          {/* Cozy Achievement Card */}
          <Card className="cozy-card cozy-glow">
            <CardHeader className="text-center">
              <div className={`w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-gentle-float animation-delay-500`}>
                <CozyIcon className={`w-8 h-8 ${cozyLevel.color}`} />
              </div>
              <CardTitle className="text-accent">Your Cozy Title</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className={`text-2xl font-bold ${cozyLevel.color}`}>{cozyLevel.level}</div>
              <div className="text-muted-foreground text-sm">
                {cozyLevel.message}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Garden Stats */}
        <Card className="cozy-card cozy-glow">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-primary">Your Adventure Garden</CardTitle>
            <p className="text-center text-muted-foreground">Look at all the beautiful moments you've collected!</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mx-auto animate-gentle-float">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-primary">{gameData.correctAnswers}</div>
                <div className="text-sm text-muted-foreground">Logling Friends</div>
                <div className="text-xs text-muted-foreground">helped successfully</div>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto animate-gentle-float animation-delay-200">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div className="text-3xl font-bold text-accent">{accuracy}%</div>
                <div className="text-sm text-muted-foreground">Harmony Rate</div>
                <div className="text-xs text-muted-foreground">with forest wisdom</div>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mx-auto animate-gentle-float animation-delay-400">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600">{formatTime(gameData.timeElapsed)}</div>
                <div className="text-sm text-muted-foreground">Peaceful Time</div>
                <div className="text-xs text-muted-foreground">exploring together</div>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto animate-gentle-float animation-delay-600">
                  <TreePine className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary">
                  {Math.round((gameData.timeElapsed / gameData.totalRounds) * 10) / 10}s
                </div>
                <div className="text-sm text-muted-foreground">Thoughtful Pace</div>
                <div className="text-xs text-muted-foreground">per discovery</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gentle Feedback */}
        <Card className="cozy-card cozy-glow">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-semibold text-primary">Message from the Forest Elder</h3>
              <div className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
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
            onClick={onRestart}
            size="lg"
            className="logling-button text-xl px-12 py-8 animate-cozy-pulse"
          >
            <RotateCcw className="w-6 h-6 mr-3" />
            Continue Our Adventure
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
            - AI Security Engineer
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Where cybersecurity learning blooms like wildflowers 🌼
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            May your journey through digital forests always be filled with wonder
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameResults;
