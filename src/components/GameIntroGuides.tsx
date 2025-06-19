
import { Heart, Sparkles, TreePine, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserMode } from '../types/userTypes';

interface GameIntroGuidesProps {
  userMode: UserMode;
}

const GameIntroGuides = ({ userMode }: GameIntroGuidesProps) => {
  const isProMode = userMode === 'career-pro';

  const getGuides = () => {
    if (isProMode) {
      return [
        {
          name: 'Analyst Pip',
          description: 'Your senior SOC analyst mentor who guides you through complex incident analysis with patience and expertise.',
          icon: Shield,
          color: 'blue'
        },
        {
          name: 'Detective Luna',
          description: 'Specializes in threat hunting and anomaly detection. Luna helps you develop your investigative instincts.',
          icon: Sparkles,
          color: 'purple'
        },
        {
          name: 'Guardian Sage',
          description: 'Incident response veteran who teaches you proper escalation procedures and crisis management.',
          icon: TreePine,
          color: 'green'
        }
      ];
    }

    return [
      {
        name: 'Pip the Safe Logling',
        description: 'A gentle spirit who loves when everything is peaceful and secure. Pip will cheer you on and celebrate safe discoveries!',
        icon: Heart,
        color: 'green'
      },
      {
        name: 'Luna the Curious Logling',
        description: 'Always wondering "What\'s this?" Luna helps you notice interesting patterns that might need a closer look—with patience and encouragement.',
        icon: Sparkles,
        color: 'amber'
      },
      {
        name: 'Sage the Alert Logling',
        description: 'Wise and protective, Sage helps you spot when something needs immediate care. Don\'t worry—they\'ll guide you through it step by step.',
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
