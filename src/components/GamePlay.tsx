
import { useState, useEffect } from 'react';
import { Shield, Clock, Target, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
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
      feedbackMessage = `Correct! ${currentLog.explanation}`;
    } else {
      pointsEarned = -25;
      feedbackMessage = `Incorrect. ${currentLog.explanation}`;
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

  const getThreatIcon = (level: ThreatLevel) => {
    switch (level) {
      case 'critical': return <XCircle className="w-5 h-5" />;
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'safe': return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getThreatClass = (level: ThreatLevel) => {
    switch (level) {
      case 'critical': return 'threat-critical';
      case 'warning': return 'threat-warning';
      case 'safe': return 'threat-safe';
    }
  };

  if (!currentLog) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Stats */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">ThreatHunter</h1>
          </div>
          <div className="flex gap-6 text-right">
            <div>
              <p className="text-sm text-muted-foreground">Round</p>
              <p className="text-xl font-bold">{currentRound}/{totalRounds}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Score</p>
              <p className="text-xl font-bold text-primary">{score}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="text-xl font-bold flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatTime(timeElapsed)}
              </p>
            </div>
          </div>
        </div>

        {/* Log Analysis */}
        <Card className="terminal-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-accent" />
              Security Log Analysis - Round {currentRound}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><span className="text-muted-foreground">Timestamp:</span> {currentLog.timestamp}</p>
                  <p><span className="text-muted-foreground">Source IP:</span> {currentLog.sourceIP}</p>
                  <p><span className="text-muted-foreground">Event Type:</span> {currentLog.eventType}</p>
                </div>
                <div>
                  <p><span className="text-muted-foreground">User:</span> {currentLog.user}</p>
                  <p><span className="text-muted-foreground">Location:</span> {currentLog.location}</p>
                  <p><span className="text-muted-foreground">Status:</span> {currentLog.status}</p>
                </div>
              </div>
              <div className="mt-4">
                <p><span className="text-muted-foreground">Details:</span> {currentLog.details}</p>
              </div>
            </div>

            {!feedback && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Threat Assessment Required</h3>
                <p className="text-muted-foreground">
                  Analyze this log entry and determine the threat level. Consider the context, patterns, and potential security implications.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    onClick={() => handleThreatAssessment('safe')}
                    variant="outline"
                    className="threat-safe hover:scale-105 transition-transform"
                  >
                    {getThreatIcon('safe')}
                    Safe
                  </Button>
                  <Button 
                    onClick={() => handleThreatAssessment('warning')}
                    variant="outline"
                    className="threat-warning hover:scale-105 transition-transform"
                  >
                    {getThreatIcon('warning')}
                    Warning
                  </Button>
                  <Button 
                    onClick={() => handleThreatAssessment('critical')}
                    variant="outline"
                    className="threat-critical hover:scale-105 transition-transform"
                  >
                    {getThreatIcon('critical')}
                    Critical
                  </Button>
                </div>
              </div>
            )}

            {feedback && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border-2 ${getThreatClass(currentLog.threatLevel)}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {getThreatIcon(currentLog.threatLevel)}
                    <Badge variant="outline" className={getThreatClass(currentLog.threatLevel)}>
                      Actual Threat Level: {currentLog.threatLevel.toUpperCase()}
                    </Badge>
                  </div>
                  <p>{feedback}</p>
                </div>
                
                {showNextRound && currentRound < totalRounds && (
                  <div className="text-center">
                    <Button onClick={nextRound} className="cyber-gradient">
                      Next Round
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="cyber-gradient h-2 rounded-full transition-all duration-500"
            style={{ width: `${(currentRound / totalRounds) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default GamePlay;
