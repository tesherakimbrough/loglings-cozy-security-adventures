
import { Shield, Target, Zap, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GameIntroProps {
  onStartGame: () => void;
}

const GameIntro = ({ onStartGame }: GameIntroProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="w-12 h-12 text-primary animate-pulse-glow" />
            <h1 className="text-5xl font-bold cyber-gradient bg-clip-text text-transparent">
              ThreatHunter
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master the art of cybersecurity through interactive log analysis. 
            Hunt threats, make decisions, and become a SOC analyst hero.
          </p>
        </div>

        {/* Game Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="terminal-glow hover:scale-105 transition-transform">
            <CardHeader className="text-center">
              <Target className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle>Real-World Scenarios</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Analyze authentic log patterns and security events based on real SOC operations.
              </p>
            </CardContent>
          </Card>

          <Card className="terminal-glow hover:scale-105 transition-transform">
            <CardHeader className="text-center">
              <Zap className="w-8 h-8 text-accent mx-auto mb-2" />
              <CardTitle>Instant Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Learn from each decision with detailed explanations and scoring.
              </p>
            </CardContent>
          </Card>

          <Card className="terminal-glow hover:scale-105 transition-transform">
            <CardHeader className="text-center">
              <Shield className="w-8 h-8 text-destructive mx-auto mb-2" />
              <CardTitle>Threat Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Develop skills in anomaly detection, risk assessment, and incident response.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* How to Play */}
        <Card className="terminal-glow">
          <CardHeader>
            <CardTitle className="text-center text-2xl">How to Play</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-primary">🎯 Your Mission</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Review security logs and events</li>
                  <li>• Identify potential threats and anomalies</li>
                  <li>• Make quick, accurate decisions</li>
                  <li>• Protect the organization from cyber attacks</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-accent">⚡ Scoring System</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <span className="text-primary">+100 points</span> for correct threat identification</li>
                  <li>• <span className="text-accent">+50 points</span> for proper risk assessment</li>
                  <li>• <span className="text-destructive">-25 points</span> for missed threats</li>
                  <li>• Speed bonus for quick decisions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Game Button */}
        <div className="text-center">
          <Button 
            onClick={onStartGame}
            size="lg"
            className="text-lg px-8 py-6 cyber-gradient hover:scale-105 transition-transform"
          >
            <Play className="w-6 h-6 mr-2" />
            Start Hunting Threats
          </Button>
        </div>

        {/* Creator Credit */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-muted-foreground">
            Created by <span className="text-primary font-semibold">Teshera Kimbrough</span> - AI Security Engineer
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameIntro;
