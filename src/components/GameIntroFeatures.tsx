
import { Heart, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserMode } from '../types/userTypes';
import { useI18n } from '../hooks/useI18n';

interface GameIntroFeaturesProps {
  userMode: UserMode;
}

const GameIntroFeatures = ({ userMode }: GameIntroFeaturesProps) => {
  const { t } = useI18n();
  const isProMode = userMode === 'career-pro';

  const getFeatureContent = () => {
    if (isProMode) {
      return {
        whatYoullDo: [
          { icon: '🔍', text: t.analyzeComplexSecurityLogs },
          { icon: '🛡️', text: t.practiceIncidentResponse },
          { icon: '📊', text: t.learnThreatIntelligence },
          { icon: '🎯', text: t.buildSkillsForSOC }
        ],
        howYoullGrow: [
          { icon: '🏆', text: t.masteringAdvancedScenarios },
          { icon: '🎖️', text: t.properIncidentHandling },
          { icon: '📈', text: t.identifyingSubtleThreats },
          { icon: '🌟', text: t.professionalSkillBadges }
        ]
      };
    }

    return {
      whatYoullDo: [
        { icon: '🌸', text: t.readGentleLogStories },
        { icon: '🌿', text: t.helpLoglingsUnderstand },
        { icon: '✨', text: t.learnTogetherEveryChoice },
        { icon: '🍃', text: t.collectCozyMoments }
      ],
      howYoullGrow: [
        { icon: '🌱', text: t.helpingLoglingsFeel },
        { icon: '🌼', text: t.noticingCuriousThings },
        { icon: '🌺', text: t.learningSomethingNew },
        { icon: '🍀', text: t.gentleEncouragement }
      ]
    };
  };

  const content = getFeatureContent();

  return (
    <Card className="cozy-card cozy-glow candlelit-warmth">
      <CardHeader>
        <CardTitle className="text-center text-3xl text-primary">
          {t.yourAdventureAwaits.replace('{mode}', isProMode ? t.professional : t.cozy)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary flex items-center gap-2">
              <Heart className="w-5 h-5" />
              {t.whatYoullDo}
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
              {t.howYoullGrow}
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
