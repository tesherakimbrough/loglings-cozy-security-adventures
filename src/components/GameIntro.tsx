import { Heart, Sparkles, TreePine, Play, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserMode } from '../types/userTypes';
import ThemeToggle from './ThemeToggle';
import ProgressTracker from './ProgressTracker';
import DailyChallenge from './DailyChallenge';
import GameSettings from './GameSettings';

interface GameIntroProps {
  onStartGame: () => void;
  userMode?: UserMode;
}

const GameIntro = ({ onStartGame, userMode = 'cozy-everyday' }: GameIntroProps) => {
  const isProMode = userMode === 'career-pro';

  const getModeContent = () => {
    if (isProMode) {
      return {
        subtitle: 'Professional Security Adventures',
        description: 'Welcome to your cybersecurity skill-building journey! Analyze real-world scenarios, build SOC expertise, and advance your career—all in a supportive, cozy environment.',
        guides: [
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
        ],
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
      subtitle: 'Cozy Security Adventures',
      description: 'Welcome to a gentle world where adorable Loglings help you discover the magic of cybersecurity. Learn, explore, and protect our cozy digital forest—no pressure, just curiosity and kindness.',
      guides: [
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
      ],
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

  const content = getModeContent();

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header with Theme Toggle and Settings */}
        <div className="flex items-center justify-between">
          <GameSettings />
          <ThemeToggle />
        </div>

        {/* Main Header */}
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

        {/* Daily Challenge and Progress in a grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          <DailyChallenge />
          <ProgressTracker />
        </div>

        {/* Meet Your Guides */}
        <div className="grid md:grid-cols-3 gap-6">
          {content.guides.map((guide, index) => {
            const Icon = guide.icon;
            const colorClasses = {
              green: 'bg-green-200 dark:bg-green-900/30 text-green-600 dark:text-green-400',
              amber: 'bg-amber-200 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
              rose: 'bg-rose-200 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
              blue: 'bg-blue-200 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
              purple: 'bg-purple-200 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
            };

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

        {/* How to Play - Mode Specific */}
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

        {/* Enhanced Features Preview */}
        <Card className="cozy-card cozy-glow candlelit-warmth">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-primary">✨ New Cozy Features ✨</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto animate-gentle-float">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-semibold text-accent">Forest Sounds</h4>
                <p className="text-sm text-muted-foreground">Gentle ambient audio and cheerful feedback chimes</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto animate-gentle-float animation-delay-300">
                  <TreePine className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-primary">Adaptive Difficulty</h4>
                <p className="text-sm text-muted-foreground">Content that grows with your learning journey</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-green-200 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto animate-gentle-float animation-delay-600">
                  <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-semibold text-green-600 dark:text-green-400">Enhanced Sharing</h4>
                <p className="text-sm text-muted-foreground">Beautiful cards to celebrate your achievements</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Adventure Button */}
        <div className="text-center">
          <Button 
            onClick={onStartGame}
            size="lg"
            className="logling-button text-xl px-12 py-8 animate-cozy-pulse"
          >
            <Play className="w-8 h-8 mr-3" />
            Begin {isProMode ? 'Professional Training' : 'Cozy Adventure'}
          </Button>
        </div>

        {/* Creator Credit - Cozy Style */}
        <div className="text-center pt-8 border-t border-border/50">
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            Lovingly crafted by 
            <span className="text-primary font-semibold flex items-center gap-1">
              <Heart className="w-4 h-4" />
              Teshera Kimbrough
            </span>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Where learning cybersecurity feels like a warm hug 🤗
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameIntro;
