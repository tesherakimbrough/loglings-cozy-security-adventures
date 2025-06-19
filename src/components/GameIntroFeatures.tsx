
import { Heart, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserMode } from '../types/userTypes';

interface GameIntroFeaturesProps {
  userMode: UserMode;
}

const GameIntroFeatures = ({ userMode }: GameIntroFeaturesProps) => {
  const isProMode = userMode === 'career-pro';

  const getFeatureContent = () => {
    if (isProMode) {
      return {
        whatYoullDo: [
          { icon: '🔍', text: 'Analyze complex security logs and SIEM alerts' },
          { icon: '🛡️', text: 'Practice incident response procedures' },
          { icon: '📊', text: 'Learn threat intelligence and risk assessment' },
          { icon: '🎯', text: 'Build skills for SOC analyst and security roles' }
        ],
        howYoullGrow: [
          { icon: '🏆', text: '+150 expertise for mastering advanced scenarios' },
          { icon: '🎖️', text: '+100 recognition for proper incident handling' },
          { icon: '📈', text: '+75 insight for identifying subtle threats' },
          { icon: '🌟', text: 'Professional skill badges and certifications' }
        ]
      };
    }

    return {
      whatYoullDo: [
        { icon: '🌸', text: 'Read gentle log stories with your Logling friends' },
        { icon: '🌿', text: 'Help Loglings understand what they\'re seeing' },
        { icon: '✨', text: 'Learn together—every choice teaches something beautiful' },
        { icon: '🍃', text: 'Collect cozy moments and grow your understanding' }
      ],
      howYoullGrow: [
        { icon: '🌱', text: '+100 joy for helping Loglings feel safe' },
        { icon: '🌼', text: '+75 wonder for noticing curious things' },
        { icon: '🌺', text: '+50 wisdom for learning something new' },
        { icon: '🍀', text: 'Gentle encouragement helps you grow stronger' }
      ]
    };
  };

  const content = getFeatureContent();

  return (
    <Card className="cozy-card cozy-glow candlelit-warmth">
      <CardHeader>
        <CardTitle className="text-center text-3xl text-primary">
          Your {isProMode ? 'Professional' : 'Cozy'} Adventure Awaits
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
              <Heart className="w-5 h-5" />
              What You'll Do
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              {content.whatYoullDo.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-accent">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-accent flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              How You'll Grow
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              {content.howYoullGrow.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameIntroFeatures;
