
import { Heart, Sparkles, TreePine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThreatLevel } from '../utils/logGenerator';

interface ThreatAssessmentButtonsProps {
  onAssessment: (level: ThreatLevel) => void;
  isProMode: boolean;
}

const ThreatAssessmentButtons = ({ onAssessment, isProMode }: ThreatAssessmentButtonsProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <h3 className="text-xl font-semibold text-primary">
          {isProMode 
            ? "What's your assessment?" 
            : "Which Logling friend feels right about this?"
          }
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {isProMode
            ? "Analyze the log data and select the appropriate threat level based on your security expertise."
            : "Take your time and trust your instincts. The Loglings are here to support you, no matter what you choose."
          }
        </p>
      </div>
      <div className="flex gap-6 justify-center">
        <Button 
          onClick={() => onAssessment('safe')}
          variant="outline"
          className="safe-logling hover:scale-105 transition-all duration-200 p-6 flex flex-col items-center gap-2 min-w-[140px]"
        >
          <Heart className="w-8 h-8" />
          <span className="font-semibold">{isProMode ? "Safe" : "Pip Says"}</span>
          <span className="text-sm">{isProMode ? "Normal activity" : '"All is well!"'}</span>
        </Button>
        <Button 
          onClick={() => onAssessment('warning')}
          variant="outline"
          className="curious-logling hover:scale-105 transition-all duration-200 p-6 flex flex-col items-center gap-2 min-w-[140px]"
        >
          <Sparkles className="w-8 h-8" />
          <span className="font-semibold">{isProMode ? "Warning" : "Luna Says"}</span>
          <span className="text-sm">{isProMode ? "Needs investigation" : '"Hmm, curious..."'}</span>
        </Button>
        <Button 
          onClick={() => onAssessment('critical')}
          variant="outline"
          className="alert-logling hover:scale-105 transition-all duration-200 p-6 flex flex-col items-center gap-2 min-w-[140px]"
        >
          <TreePine className="w-8 h-8" />
          <span className="font-semibold">{isProMode ? "Critical" : "Sage Says"}</span>
          <span className="text-sm">{isProMode ? "Immediate action" : '"Needs care!"'}</span>
        </Button>
      </div>
    </div>
  );
};

export default ThreatAssessmentButtons;
