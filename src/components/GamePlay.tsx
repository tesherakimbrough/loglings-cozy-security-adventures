
import { useState, useEffect } from 'react';
import { Heart, Clock, Sparkles, TreePine, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GameData } from '../pages/Index';
import { generateLogEntry, LogEntry, ThreatLevel } from '../utils/logGenerator';

interface GamePlayProps {
  onEndGame: (gameData: GameData) => void;
}

const GamePlay = ({ onEndGame }: GamePlayProps) => {
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [currentLog, setCurrentLog] = useState<LogEntry | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showNextRound, setShowNextRound] = useState(false);
  const [gameStartTime] = useState(Date.now());

  const totalRounds = 10;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - gameStartTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStartTime]);

  useEffect(() => {
    generateNewLog();
  }, []);

  const generateNewLog = () => {
    setCurrentLog(generateLogEntry());
    setFeedback(null);
    setShowNextRound(false);
  };

  const handleThreatAssessment = (playerChoice: ThreatLevel) => {
    if (!currentLog) return;

    const isCorrect = playerChoice === currentLog.threatLevel;
    let pointsEarned = 0;
    let feedbackMessage = '';

    if (isCorrect) {
      pointsEarned = currentLog.threatLevel === 'critical' ? 100 : 
                    currentLog.threatLevel === 'warning' ? 75 : 50;
      setCorrectAnswers(prev => prev + 1);
      
      if (currentLog.threatLevel === 'safe') {
        feedbackMessage = `Perfect! Pip the Safe Logling is so happy! 🌸 ${currentLog.explanation}`;
      } else if (currentLog.threatLevel === 'warning') {
        feedbackMessage = `Wonderful! Luna the Curious Logling thanks you for noticing! ✨ ${currentLog.explanation}`;
      } else {
        feedbackMessage = `Excellent! Sage the Alert Logling is proud of your quick thinking! 🌿 ${currentLog.explanation}`;
      }
    } else {
      pointsEarned = -25;
      feedbackMessage = `That's okay, dear friend! Every step teaches us something beautiful. 💙 ${currentLog.explanation}`;
    }

    setScore(prev => prev + pointsEarned);
    setFeedback(feedbackMessage);
    setShowNextRound(true);

    if (currentRound >= totalRounds) {
      setTimeout(() => {
        onEndGame({
          score: score + pointsEarned,
          totalRounds,
          correctAnswers: correctAnswers + (isCorrect ? 1 : 0),
          timeElapsed
        });
      }, 2000);
    }
  };

  const nextRound = () => {
    setCurrentRound(prev => prev + 1);
    generateNewLog();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getLoglingIcon = (level: ThreatLevel) => {
    switch (level) {
      case 'critical': return <TreePine className="w-5 h-5" />;
      case 'warning': return <Sparkles className="w-5 h-5" />;
      case 'safe': return <Heart className="w-5 h-5" />;
    }
  };

  const getLoglingClass = (level: ThreatLevel) => {
    switch (level) {
      case 'critical': return 'alert-logling';
      case 'warning': return 'curious-logling';
      case 'safe': return 'safe-logling';
    }
  };

  if (!currentLog) return <div>Loading our cozy adventure...</div>;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Stats - Cozy Style */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="animate-gentle-float">
              <TreePine className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-primary">Loglings Adventure</h1>
          </div>
          <div className="flex gap-8 text-right">
            <div className="cozy-card px-4 py-2">
              <p className="text-sm text-muted-foreground">Adventure</p>
              <p className="text-lg font-bold text-primary">{currentRound}/{totalRounds}</p>
            </div>
            <div className="cozy-card px-4 py-2">
              <p className="text-sm text-muted-foreground">Joy Collected</p>
              <p className="text-lg font-bold text-accent">{score}</p>
            </div>
            <div className="cozy-card px-4 py-2">
              <p className="text-sm text-muted-foreground">Time Exploring</p>
              <p className="text-lg font-bold flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatTime(timeElapsed)}
              </p>
            </div>
          </div>
        </div>

        {/* Log Analysis - Cozy Style */}
        <Card className="cozy-card cozy-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Sparkles className="w-6 h-6 text-accent animate-sparkle" />
              Chapter {currentRound}: A New Discovery
            </CardTitle>
            <p className="text-muted-foreground">
              The Loglings have found something interesting! Let's explore it together with gentle curiosity.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted/30 p-6 rounded-2xl font-mono text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p><span className="text-primary font-semibold">When:</span> {currentLog.timestamp}</p>
                  <p><span className="text-primary font-semibold">From:</span> {currentLog.sourceIP}</p>
                  <p><span className="text-primary font-semibold">What:</span> {currentLog.eventType}</p>
                </div>
                <div className="space-y-2">
                  <p><span className="text-primary font-semibold">Who:</span> {currentLog.user}</p>
                  <p><span className="text-primary font-semibold">Where:</span> {currentLog.location}</p>
                  <p><span className="text-primary font-semibold">Result:</span> {currentLog.status}</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-card/50 rounded-xl">
                <p><span className="text-primary font-semibold">Story:</span> {currentLog.details}</p>
              </div>
            </div>

            {!feedback && (
              <div className="space-y-6">
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-semibold text-primary">Which Logling friend feels right about this?</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Take your time and trust your instincts. The Loglings are here to support you, no matter what you choose.
                  </p>
                </div>
                <div className="flex gap-6 justify-center">
                  <Button 
                    onClick={() => handleThreatAssessment('safe')}
                    variant="outline"
                    className="safe-logling hover:scale-105 transition-all duration-200 p-6 flex flex-col items-center gap-2 min-w-[140px]"
                  >
                    <Heart className="w-8 h-8" />
                    <span className="font-semibold">Pip Says</span>
                    <span className="text-sm">"All is well!"</span>
                  </Button>
                  <Button 
                    onClick={() => handleThreatAssessment('warning')}
                    variant="outline"
                    className="curious-logling hover:scale-105 transition-all duration-200 p-6 flex flex-col items-center gap-2 min-w-[140px]"
                  >
                    <Sparkles className="w-8 h-8" />
                    <span className="font-semibold">Luna Says</span>
                    <span className="text-sm">"Hmm, curious..."</span>
                  </Button>
                  <Button 
                    onClick={() => handleThreatAssessment('critical')}
                    variant="outline"
                    className="alert-logling hover:scale-105 transition-all duration-200 p-6 flex flex-col items-center gap-2 min-w-[140px]"
                  >
                    <TreePine className="w-8 h-8" />
                    <span className="font-semibold">Sage Says</span>
                    <span className="text-sm">"Needs care!"</span>
                  </Button>
                </div>
              </div>
            )}

            {feedback && (
              <div className="space-y-4">
                <div className={`p-6 rounded-2xl border-2 ${getLoglingClass(currentLog.threatLevel)} relative overflow-hidden`}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="animate-gentle-float">
                      {getLoglingIcon(currentLog.threatLevel)}
                    </div>
                    <Badge variant="outline" className={`${getLoglingClass(currentLog.threatLevel)} font-semibold`}>
                      {currentLog.threatLevel === 'safe' ? 'Pip the Safe Logling' :
                       currentLog.threatLevel === 'warning' ? 'Luna the Curious Logling' :
                       'Sage the Alert Logling'} was right!
                    </Badge>
                  </div>
                  <p className="text-sm leading-relaxed">{feedback}</p>
                  <div className="absolute top-2 right-2 animate-sparkle">
                    <Sparkles className="w-4 h-4 text-accent/50" />
                  </div>
                </div>
                
                {showNextRound && currentRound < totalRounds && (
                  <div className="text-center">
                    <Button onClick={nextRound} className="logling-button">
                      Continue Our Adventure 🌸
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Progress Garden */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground text-center">Your Adventure Progress 🌱</p>
          <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
            <div 
              className="forest-gradient h-3 rounded-full transition-all duration-500 relative"
              style={{ width: `${(currentRound / totalRounds) * 100}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlay;
