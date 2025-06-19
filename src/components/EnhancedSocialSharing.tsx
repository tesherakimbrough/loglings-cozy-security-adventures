
import { useState, useRef } from 'react';
import { Share2, Download, Copy, Check, Camera, Heart, Star, TreePine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GameData } from '../pages/Index';

interface EnhancedSocialSharingProps {
  gameData: GameData;
  achievements?: string[];
  onShare?: () => void;
}

const EnhancedSocialSharing = ({ gameData, achievements = [], onShare }: EnhancedSocialSharingProps) => {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const accuracy = Math.round((gameData.correctAnswers / gameData.totalRounds) * 100);
  
  const getCozyLevel = () => {
    if (accuracy >= 90) return { level: 'Logling Whisperer', emoji: '🧚‍♀️', color: 'text-purple-600' };
    if (accuracy >= 75) return { level: 'Forest Guardian', emoji: '🛡️', color: 'text-green-600' };
    if (accuracy >= 60) return { level: 'Curious Adventurer', emoji: '🔍', color: 'text-blue-600' };
    return { level: 'Gentle Learner', emoji: '🌱', color: 'text-emerald-600' };
  };

  const cozyLevel = getCozyLevel();

  const shareText = `🌸 Just completed another cozy adventure in Loglings!

✨ ${cozyLevel.level} ${cozyLevel.emoji}
🎯 ${gameData.score} joy points collected
💚 ${accuracy}% harmony achieved
🌿 ${gameData.correctAnswers}/${gameData.totalRounds} Loglings helped

Learning cybersecurity has never felt so warm and welcoming! 🍃

#Loglings #CyberSecurity #CozyLearning #InfoSec`;

  const handleCopyShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log('Share text copied manually');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Loglings Adventure!',
          text: shareText,
          url: window.location.href
        });
      } catch (err) {
        handleCopyShare();
      }
    } else {
      handleCopyShare();
    }
    onShare?.();
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;
    
    // Simple fallback - copy share text for now
    handleCopyShare();
  };

  return (
    <Card className="cozy-card cozy-glow candlelit-warmth">
      <CardContent className="pt-6 space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-primary flex items-center justify-center gap-2">
            <Camera className="w-5 h-5" />
            Share Your Cozy Journey
          </h3>
          <p className="text-sm text-muted-foreground">
            Spread the joy of gentle cybersecurity learning!
          </p>
        </div>

        {/* Enhanced Shareable Card */}
        <div 
          ref={cardRef}
          className="relative bg-gradient-to-br from-primary/20 via-accent/20 to-green-500/20 p-6 rounded-3xl border-2 border-primary/20 overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-2 right-2 animate-sparkle">
            <Heart className="w-4 h-4 text-accent/60" />
          </div>
          <div className="absolute bottom-2 left-2 animate-gentle-float">
            <TreePine className="w-4 h-4 text-primary/60" />
          </div>
          
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/30 rounded-full flex items-center justify-center animate-gentle-float">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-bold text-lg">Loglings Adventure Complete!</div>
                <div className="text-sm text-muted-foreground">Cozy Security Learning Journey</div>
              </div>
            </div>
            
            {/* Achievement Level */}
            <div className="text-center">
              <Badge className={`${cozyLevel.color} bg-primary/10 border-primary/30 text-base px-4 py-2`}>
                {cozyLevel.emoji} {cozyLevel.level}
              </Badge>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-primary">{gameData.score}</div>
                <div className="text-xs text-muted-foreground">Joy Points</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-accent">{accuracy}%</div>
                <div className="text-xs text-muted-foreground">Harmony</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-green-600">{gameData.correctAnswers}</div>
                <div className="text-xs text-muted-foreground">Friends Helped</div>
              </div>
            </div>

            {/* Recent Achievements */}
            {achievements.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground text-center">Recent Achievements</div>
                <div className="flex justify-center gap-1">
                  {achievements.slice(0, 3).map((achievement, index) => (
                    <div key={index} className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-accent" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="text-center text-xs text-muted-foreground">
              Where cybersecurity learning feels like a warm hug 🤗
            </div>
          </div>
        </div>

        {/* Enhanced Share Actions */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={handleNativeShare}
            className="logling-button text-sm py-3"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          
          <Button
            onClick={downloadCard}
            variant="outline"
            className="cozy-card hover:scale-105 transition-all text-sm py-3"
          >
            <Download className="w-4 h-4 mr-2" />
            Save
          </Button>

          <Button
            onClick={handleCopyShare}
            variant="outline"
            className="cozy-card hover:scale-105 transition-all text-sm py-3"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>

        {copied && (
          <div className="text-center text-sm text-green-600 animate-fade-in">
            ✨ Adventure story copied to share with friends!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedSocialSharing;
