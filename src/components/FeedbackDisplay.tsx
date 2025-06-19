
import { CheckCircle, AlertTriangle, Sparkles, Heart, TreePine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThreatLevel } from '../utils/logGenerator';

interface LogEntry {
  threatLevel: ThreatLevel;
}

interface FeedbackDisplayProps {
  feedback: string;
  isCorrect: boolean | null;
  currentLog: LogEntry;
  showNextRound: boolean;
  currentRound: number;
  totalRounds: number;
  isProMode: boolean;
  onNextRound: () => void;
}

const FeedbackDisplay = ({ 
  feedback, 
  isCorrect, 
  currentLog, 
  showNextRound, 
  currentRound, 
  totalRounds, 
  isProMode, 
  onNextRound 
}: FeedbackDisplayProps) => {
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

  const getFeedbackIcon = () => {
    if (isCorrect === null) return null;
    return isCorrect ? (
      <CheckCircle className="w-6 h-6 text-green-600 animate-gentle-float" />
    ) : (
      <AlertTriangle className="w-6 h-6 text-amber-600 animate-gentle-float" />
    );
  };

  return (
    <div className="space-y-4">
      <div className={`p-6 rounded-2xl border-2 ${getLoglingClass(currentLog.threatLevel)} relative overflow-hidden`}>
        <div className="flex items-start gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="animate-gentle-float">
              {getLoglingIcon(currentLog.threatLevel)}
            </div>
            {getFeedbackIcon()}
          </div>
          <Badge variant="outline" className={`${getLoglingClass(currentLog.threatLevel)} font-semibold`}>
            {isCorrect ? (
              isProMode ? "Correct Assessment!" : 
              currentLog.threatLevel === 'safe' ? 'Pip the Safe Logling' :
              currentLog.threatLevel === 'warning' ? 'Luna the Curious Logling' :
              'Sage the Alert Logling'
            ) : (
              isProMode ? "Let's Learn Together" : "Learning Moment"
            )} {isCorrect ? "was right!" : ""}
          </Badge>
        </div>
        <p className="text-sm leading-relaxed">{feedback}</p>
        <div className="absolute top-2 right-2 animate-sparkle">
          <Sparkles className="w-4 h-4 text-accent/50" />
        </div>
      </div>
      
      {showNextRound && currentRound < totalRounds && (
        <div className="text-center">
          <Button onClick={onNextRound} className="logling-button">
            {isProMode ? "Next Scenario 🔍" : "Continue Our Adventure 🌸"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FeedbackDisplay;
