
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
        <h3 className="text-xl font-semibold cozy-heading">
          {isProMode 
            ? "What's your assessment?" 
            : "Which Logling friend feels right about this?"
          }
        </h3>
        <p className="text-text-cozy max-w-2xl mx-auto cozy-body">
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
          className="safe-logling gentle-hover p-6 flex flex-col items-center gap-2 min-w-[140px] bg-transparent"
        >
          <Heart className="w-8 h-8 text-leaf-glow" />
          <span className="font-semibold text-leaf-glow">{isProMode ? "Safe" : "Pip Says"}</span>
          <span className="text-sm text-text-cozy">{isProMode ? "Normal activity" : '"All is well!"'}</span>
        </Button>
        <Button 
          onClick={() => onAssessment('warning')}
          variant="outline"
          className="curious-logling gentle-hover p-6 flex flex-col items-center gap-2 min-w-[140px] bg-transparent"
        >
          <Sparkles className="w-8 h-8 text-warm-amber" />
          <span className="font-semibold text-warm-amber">{isProMode ? "Warning" : "Luna Says"}</span>
          <span className="text-sm text-text-cozy">{isProMode ? "Needs investigation" : '"Hmm, curious..."'}</span>
        </Button>
        <Button 
          onClick={() => onAssessment('critical')}
          variant="outline"
          className="alert-logling gentle-hover p-6 flex flex-col items-center gap-2 min-w-[140px] bg-transparent"
        >
          <TreePine className="w-8 h-8 text-berry-blush" />
          <span className="font-semibold text-berry-blush">{isProMode ? "Critical" : "Sage Says"}</span>
          <span className="text-sm text-text-cozy">{isProMode ? "Immediate action" : '"Needs care!"'}</span>
        </Button>
      </div>
    </div>
  );
};

export default ThreatAssessmentButtons;
