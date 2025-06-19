
import { Heart, Sparkles, TreePine, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ThemeToggle from './ThemeToggle';
import ProgressTracker from './ProgressTracker';
import DailyChallenge from './DailyChallenge';

interface GameIntroProps {
  onStartGame: () => void;
}

const GameIntro = ({ onStartGame }: GameIntroProps) => {
  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header with Theme Toggle */}
        <div className="flex items-center justify-between">
          <div></div>
          <ThemeToggle />
        </div>

        {/* Main Header */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="animate-gentle-float">
              <TreePine className="w-16 h-16 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-6xl font-bold forest-gradient bg-clip-text text-transparent">
                Loglings
              </h1>
              <p className="text-xl text-primary/80 font-medium">
                Cozy Security Adventures
              </p>
            </div>
            <div className="animate-gentle-float animation-delay-1000">
              <Sparkles className="w-16 h-16 text-accent animate-sparkle" />
            </div>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Welcome to a gentle world where adorable Loglings help you discover the magic of cybersecurity. 
            Learn, explore, and protect our cozy digital forest—no pressure, just curiosity and kindness.
          </p>
        </div>

        {/* Daily Challenge and Progress in a grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          <DailyChallenge />
          <ProgressTracker />
        </div>

        {/* Meet Your Guides */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="cozy-card cozy-glow candlelit-warmth hover:scale-105 transition-transform">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-200 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-gentle-float">
                <Heart className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-primary">Pip the Safe Logling</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                A gentle spirit who loves when everything is peaceful and secure. 
                Pip will cheer you on and celebrate safe discoveries!
              </p>
            </CardContent>
          </Card>

          <Card className="cozy-card cozy-glow candlelit-warmth hover:scale-105 transition-transform">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-amber-200 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-gentle-float animation-delay-500">
                <Sparkles className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <CardTitle className="text-accent">Luna the Curious Logling</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Always wondering "What's this?" Luna helps you notice interesting patterns 
                that might need a closer look—with patience and encouragement.
              </p>
            </CardContent>
          </Card>

          <Card className="cozy-card cozy-glow candlelit-warmth hover:scale-105 transition-transform">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-rose-200 dark:bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-gentle-float animation-delay-1000">
                <TreePine className="w-8 h-8 text-rose-600 dark:text-rose-400" />
              </div>
              <CardTitle className="text-rose-600 dark:text-rose-400">Sage the Alert Logling</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Wise and protective, Sage helps you spot when something needs immediate care. 
                Don't worry—they'll guide you through it step by step.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How to Play - Cozy Style */}
        <Card className="cozy-card cozy-glow candlelit-warmth">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-primary">Your Cozy Adventure Awaits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  What You'll Do
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent">🌸</span>
                    <span>Read gentle log stories with your Logling friends</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">🌿</span>
                    <span>Help Loglings understand what they're seeing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✨</span>
                    <span>Learn together—every choice teaches something beautiful</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">🍃</span>
                    <span>Collect cozy moments and grow your understanding</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-accent flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  How You'll Grow
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">🌱</span>
                    <span><strong className="text-primary">+100 joy</strong> for helping Loglings feel safe</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">🌼</span>
                    <span><strong className="text-accent">+75 wonder</strong> for noticing curious things</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">🌺</span>
                    <span><strong className="text-rose-500">+50 wisdom</strong> for learning something new</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">🍀</span>
                    <span>Gentle encouragement helps you grow stronger</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Adventure Button */}
        <div className="text-center">
          <Button 
            onClick={onStartGame}
            size="lg"
            className="logling-button text-xl px-12 py-8 animate-cozy-pulse"
          >
            <Play className="w-8 h-8 mr-3" />
            Begin Our Cozy Adventure
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
            Where learning cybersecurity feels like a warm hug 🤗
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameIntro;
