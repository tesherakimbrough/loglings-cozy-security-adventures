
import { Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ThreatAssessmentButtons from './ThreatAssessmentButtons';
import FeedbackDisplay from './FeedbackDisplay';
import { ThreatLevel } from '../utils/logGenerator';

interface LogEntry {
  timestamp: string;
  sourceIP: string;
  eventType: string;
  user: string;
  location: string;
  status: string;
  details: string;
  threatLevel: ThreatLevel;
  explanation: string;
  category?: string;
}

interface LogAnalysisCardProps {
  currentLog: LogEntry;
  currentRound: number;
  totalRounds: number;
  feedback: string | null;
  isCorrect: boolean | null;
  showNextRound: boolean;
  isProMode: boolean;
  onThreatAssessment: (level: ThreatLevel) => void;
  onNextRound: () => void;
}

const LogAnalysisCard = ({ 
  currentLog, 
  currentRound, 
  totalRounds,
  feedback, 
  isCorrect, 
  showNextRound, 
  isProMode, 
  onThreatAssessment, 
  onNextRound 
}: LogAnalysisCardProps) => {
  return (
    <Card className="cozy-card cozy-glow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Sparkles className="w-6 h-6 text-accent animate-sparkle" />
          Chapter {currentRound}: A New Discovery
          {currentLog.category && (
            <Badge variant="outline" className="ml-2 text-xs">
              {currentLog.category}
            </Badge>
          )}
        </CardTitle>
        <p className="text-muted-foreground">
          {isProMode 
            ? "Analyze this security log and determine the appropriate response level."
            : "The Loglings have found something interesting! Let's explore it together with gentle curiosity."
          }
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
          <ThreatAssessmentButtons 
            onAssessment={onThreatAssessment}
            isProMode={isProMode}
          />
        )}

        {feedback && (
          <FeedbackDisplay
            feedback={feedback}
            isCorrect={isCorrect}
            currentLog={currentLog}
            showNextRound={showNextRound}
            currentRound={currentRound}
            totalRounds={totalRounds}
            isProMode={isProMode}
            onNextRound={onNextRound}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default LogAnalysisCard;
