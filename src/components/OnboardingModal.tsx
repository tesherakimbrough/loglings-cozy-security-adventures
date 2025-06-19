
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TreePine, Shield, Heart, Sparkles, Star, Users } from 'lucide-react';
import { UserMode, ModeFeatures } from '../types/userTypes';

interface OnboardingModalProps {
  isOpen: boolean;
  onSelectMode: (mode: UserMode) => void;
}

const OnboardingModal = ({ isOpen, onSelectMode }: OnboardingModalProps) => {
  const [selectedMode, setSelectedMode] = useState<UserMode | null>(null);

  const modes: ModeFeatures[] = [
    {
      id: 'cozy-everyday',
      name: 'Cozy Everyday Discovery',
      emoji: '🌲',
      description: 'Gentle adventures for everyone. Learn digital safety and enjoy relaxing, cozy vibes. No tech background needed.',
      benefits: [
        'Relaxing, low-pressure learning',
        'Beautiful ambient soundscapes',
        'Family-friendly content',
        'Focus on everyday digital safety'
      ],
      challenges: [
        'Recognize safe vs suspicious emails',
        'Create strong, memorable passwords',
        'Spot fake websites and apps',
        'Protect personal information online'
      ],
      difficulty: 'beginner'
    },
    {
      id: 'career-pro',
      name: 'Career Pro Mode',
      emoji: '🛡️',
      description: 'Level up your cyber skills! Realistic log analysis challenges, gentle SOC scenarios, skill-building for your career.',
      benefits: [
        'Industry-relevant scenarios',
        'Advanced log analysis',
        'Career skill development',
        'Professional certifications prep'
      ],
      challenges: [
        'Analyze complex security logs',
        'Identify advanced persistent threats',
        'Incident response procedures',
        'Network security patterns'
      ],
      difficulty: 'advanced'
    }
  ];

  const handleContinue = () => {
    if (selectedMode) {
      onSelectMode(selectedMode);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl cozy-card cozy-glow max-h-[95vh] overflow-y-auto">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <TreePine className="w-12 h-12 text-primary animate-gentle-float" />
            <div>
              <CardTitle className="text-3xl text-primary">Welcome to Loglings!</CardTitle>
              <p className="text-lg text-muted-foreground mt-2">Choose Your Adventure Path</p>
            </div>
            <Sparkles className="w-12 h-12 text-accent animate-sparkle" />
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Loglings offers two beautiful ways to explore cybersecurity and digital safety. 
            Pick the path that feels right for you—you can always change it later!
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {modes.map((mode) => (
              <Card 
                key={mode.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedMode === mode.id 
                    ? 'ring-2 ring-primary bg-primary/5 cozy-glow' 
                    : 'cozy-card hover:shadow-lg'
                }`}
                onClick={() => setSelectedMode(mode.id)}
              >
                <CardHeader className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center text-4xl">
                    {mode.emoji}
                  </div>
                  <CardTitle className="flex items-center justify-center gap-2">
                    {mode.id === 'cozy-everyday' ? (
                      <Heart className="w-5 h-5 text-green-600" />
                    ) : (
                      <Shield className="w-5 h-5 text-blue-600" />
                    )}
                    {mode.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {mode.description}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      What You'll Enjoy
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {mode.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-accent">✨</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-accent mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Example Challenges
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {mode.challenges.slice(0, 2).map((challenge, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary">🌿</span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-2">
                    <Badge variant={mode.id === 'cozy-everyday' ? 'default' : 'secondary'}>
                      {mode.id === 'cozy-everyday' ? 'Perfect for Everyone' : 'Career Focused'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {selectedMode && (
            <div className="text-center pt-6 border-t">
              <div className="mb-4 p-4 bg-primary/5 rounded-xl">
                <p className="text-sm text-muted-foreground mb-2">
                  You can switch modes anytime in Settings ⚙️
                </p>
                <p className="font-medium text-primary">
                  Ready to start your {modes.find(m => m.id === selectedMode)?.name} adventure?
                </p>
              </div>
              <Button
                onClick={handleContinue}
                size="lg"
                className="logling-button px-8 py-6 text-lg"
              >
                <TreePine className="w-6 h-6 mr-3" />
                Begin My Cozy Adventure
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingModal;
