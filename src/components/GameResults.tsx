
import { useState, useEffect } from 'react';
import { Trophy, Target, Clock, RotateCcw, Shield, Star } from 'lucide-react';
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
    const savedBestScore = localStorage.getItem('threathunter-best-score');
    const currentBest = savedBestScore ? parseInt(savedBestScore) : 0;
    
    if (gameData.score > currentBest) {
      localStorage.setItem('threathunter-best-score', gameData.score.toString());
      setBestScore(gameData.score);
    } else {
      setBestScore(currentBest);
    }
  }, [gameData.score]);

  const accuracy = Math.round((gameData.correctAnswers / gameData.totalRounds) * 100);
  const isNewRecord = gameData.score === bestScore && bestScore > 0;

  const getPerformanceLevel = () => {
    if (accuracy >= 90) return { level: 'Elite SOC Analyst', color: 'text-primary', icon: Trophy };
    if (accuracy >= 75) return { level: 'Senior Analyst', color: 'text-accent', icon: Star };
    if (accuracy >= 60) return { level: 'SOC Analyst', color: 'text-blue-400', icon: Shield };
    return { level: 'Trainee Analyst', color: 'text-muted-foreground', icon: Target };
  };

  const performance = getPerformanceLevel();
  const PerformanceIcon = performance.icon;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Trophy className={`w-12 h-12 ${isNewRecord ? 'text-accent animate-pulse-glow' : 'text-primary'}`} />
            <h1 className="text-5xl font-bold cyber-gradient bg-clip-text text-transparent">
              Mission Complete!
            </h1>
          </div>
          {isNewRecord && (
            <Badge className="bg-accent text-accent-foreground text-lg px-4 py-2 animate-pulse-glow">
              🎉 NEW HIGH SCORE! 🎉
            </Badge>
          )}
        </div>

        {/* Results Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Score Card */}
          <Card className="terminal-glow">
            <CardHeader className="text-center">
              <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle>Final Score</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-6xl font-bold text-primary">{gameData.score}</div>
              <div className="text-muted-foreground">
                Best Score: <span className="text-accent font-semibold">{bestScore}</span>
              </div>
            </CardContent>
          </Card>

          {/* Performance Card */}
          <Card className="terminal-glow">
            <CardHeader className="text-center">
              <PerformanceIcon className={`w-8 h-8 mx-auto mb-2 ${performance.color}`} />
              <CardTitle>Performance Level</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className={`text-2xl font-bold ${performance.color}`}>{performance.level}</div>
              <div className="text-muted-foreground">
                Based on {accuracy}% accuracy
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Stats */}
        <Card className="terminal-glow">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Mission Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <Target className="w-8 h-8 text-primary mx-auto" />
                <div className="text-2xl font-bold text-primary">{gameData.correctAnswers}</div>
                <div className="text-sm text-muted-foreground">Correct Threats</div>
                <div className="text-xs text-muted-foreground">out of {gameData.totalRounds}</div>
              </div>
              
              <div className="space-y-2">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mx-auto text-accent-foreground font-bold">
                  %
                </div>
                <div className="text-2xl font-bold text-accent">{accuracy}%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                <div className="text-xs text-muted-foreground">threat detection</div>
              </div>
              
              <div className="space-y-2">
                <Clock className="w-8 h-8 text-blue-400 mx-auto" />
                <div className="text-2xl font-bold text-blue-400">{formatTime(gameData.timeElapsed)}</div>
                <div className="text-sm text-muted-foreground">Total Time</div>
                <div className="text-xs text-muted-foreground">mission duration</div>
              </div>
              
              <div className="space-y-2">
                <Shield className="w-8 h-8 text-green-400 mx-auto" />
                <div className="text-2xl font-bold text-green-400">
                  {Math.round((gameData.timeElapsed / gameData.totalRounds) * 10) / 10}s
                </div>
                <div className="text-sm text-muted-foreground">Avg Response</div>
                <div className="text-xs text-muted-foreground">per threat</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Feedback */}
        <Card className="terminal-glow">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">SOC Manager Feedback</h3>
              <div className="text-muted-foreground max-w-2xl mx-auto">
                {accuracy >= 90 && "Outstanding work! You've demonstrated expert-level threat detection skills. You're ready for the most challenging security operations."}
                {accuracy >= 75 && accuracy < 90 && "Excellent performance! You show strong analytical skills and would be a valuable addition to any SOC team."}
                {accuracy >= 60 && accuracy < 75 && "Good job! You're developing solid threat detection abilities. Keep practicing to reach the next level."}
                {accuracy < 60 && "Keep learning! Cybersecurity is challenging, but with practice, you'll develop the skills needed to protect organizations."}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button 
            onClick={onRestart}
            size="lg"
            className="text-lg px-8 py-6 cyber-gradient hover:scale-105 transition-transform"
          >
            <RotateCcw className="w-6 h-6 mr-2" />
            Hunt More Threats
          </Button>
        </div>

        {/* Creator Credit */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-muted-foreground">
            ThreatHunter by <span className="text-primary font-semibold">Teshera Kimbrough</span> - AI Security Engineer
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Building the future of cybersecurity education through interactive learning
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameResults;
