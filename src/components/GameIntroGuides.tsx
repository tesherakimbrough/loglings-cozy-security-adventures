
import { Heart, Sparkles, TreePine, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserMode } from '../types/userTypes';
import { useI18n } from '../hooks/useI18n';

interface GameIntroGuidesProps {
  userMode: UserMode;
}

const GameIntroGuides = ({ userMode }: GameIntroGuidesProps) => {
  const { t } = useI18n();
  const isProMode = userMode === 'career-pro';

  const getGuides = () => {
    if (isProMode) {
      return [
        {
          name: t.analystPip,
          description: t.analystPipDescription,
          icon: Shield,
          color: 'blue'
        },
        {
          name: t.detectiveLuna,
          description: t.detectiveLunaDescription,
          icon: Sparkles,
          color: 'purple'
        },
        {
          name: t.guardianSage,
          description: t.guardianSageDescription,
          icon: TreePine,
          color: 'green'
        }
      ];
    }

    return [
      {
        name: t.pipTheSafeLogling,
        description: t.pipDescription,
        icon: Heart,
        color: 'green'
      },
      {
        name: t.lunaTheCuriousLogling,
        description: t.lunaDescription,
        icon: Sparkles,
        color: 'amber'
      },
      {
        name: t.sageTheAlertLogling,
        description: t.sageDescription,
        icon: TreePine,
        color: 'rose'
      }
    ];
  };

  const guides = getGuides();
  
  const colorClasses = {
    green: 'bg-green-200 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    amber: 'bg-amber-200 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    rose: 'bg-rose-200 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
    blue: 'bg-blue-200 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    purple: 'bg-purple-200 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {guides.map((guide, index) => {
        const Icon = guide.icon;
        
        return (
          <Card key={guide.name} className="cozy-card cozy-glow candlelit-warmth hover:scale-105 transition-transform">
            <CardHeader className="text-center">
              <div className={`w-16 h-16 ${colorClasses[guide.color as keyof typeof colorClasses]} rounded-full flex items-center justify-center mx-auto mb-4 animate-gentle-float`}
                   style={{ animationDelay: `${index * 500}ms` }}>
                <Icon className="w-8 h-8" />
              </div>
              <CardTitle className={guide.color === 'green' ? 'text-primary' : guide.color === 'amber' ? 'text-accent' : `text-${guide.color}-600 dark:text-${guide.color}-400`}>
                {guide.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                {guide.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default GameIntroGuides;
