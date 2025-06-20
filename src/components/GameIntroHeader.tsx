
import { TreePine, Shield, Sparkles } from 'lucide-react';
import { UserMode } from '../types/userTypes';
import { useI18n } from '../hooks/useI18n';

interface GameIntroHeaderProps {
  userMode: UserMode;
}

const GameIntroHeader = ({ userMode }: GameIntroHeaderProps) => {
  const { t } = useI18n();
  const isProMode = userMode === 'career-pro';
  
  const getHeaderContent = () => {
    if (isProMode) {
      return {
        subtitle: t.professionalSecurityAdventures,
        description: t.welcomeToYourCybersecuritySkillBuildingJourney
      };
    }
    
    return {
      subtitle: t.cozySecurityAdventures,
      description: t.welcomeToAGentleWorld
    };
  };

  const content = getHeaderContent();

  return (
    <div className="text-center space-y-6">
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="animate-gentle-float">
          <TreePine className="w-16 h-16 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-green-500 to-primary bg-clip-text text-transparent">
            Loglings
          </h1>
          <p className="text-xl text-primary font-medium">
            {content.subtitle}
          </p>
        </div>
        <div className="animate-gentle-float animation-delay-1000">
          {isProMode ? (
            <Shield className="w-16 h-16 text-blue-600 animate-sparkle" />
          ) : (
            <Sparkles className="w-16 h-16 text-accent animate-sparkle" />
          )}
        </div>
      </div>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        {content.description}
      </p>
    </div>
  );
};

export default GameIntroHeader;
