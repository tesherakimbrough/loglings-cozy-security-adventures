import { useState } from 'react';
import { Share2, Download, Copy, Check, Camera, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GameData } from '../types/gameTypes';

interface SocialSharingProps {
  gameData: GameData;
  onShare?: () => void;
}

const SocialSharing = ({ gameData, onShare }: SocialSharingProps) => {
  const [copied, setCopied] = useState(false);

  const shareText = `🌸 I just completed another cozy adventure in Loglings! Collected ${gameData.score} joy points while learning cybersecurity with my Logling friends. ${Math.round((gameData.correctAnswers / gameData.totalRounds) * 100)}% harmony achieved! 🌿✨ #Loglings #CyberSecurity #CozyLearning`;

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

  const accuracy = Math.round((gameData.correctAnswers / gameData.totalRounds) * 100);
  
  const getCozyLevel = () => {
    if (accuracy >= 90) return 'Logling Whisperer';
    if (accuracy >= 75) return 'Forest Guardian';
    if (accuracy >= 60) return 'Curious Adventurer';
    return 'Gentle Learner';
  };

  return (
    <Card className="cozy-card cozy-glow candlelit-warmth">
      <CardContent className="pt-6 space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-primary flex items-center justify-center gap-2">
            <Camera className="w-5 h-5" />
            Share Your Adventure
          </h3>
          <p className="text-sm text-muted-foreground">
            Let others know about your cozy learning journey!
          </p>
        </div>

        {/* Shareable Card Preview */}
        <div className="relative bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-6 rounded-2xl border-2 border-border/30">
          <div className="absolute top-2 right-2">
            <Heart className="w-4 h-4 text-accent animate-sparkle" />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm">Loglings Adventure Complete!</div>
                <div className="text-xs text-muted-foreground">Cozy Security Learning</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-primary">{gameData.score}</div>
                <div className="text-xs text-muted-foreground">Joy Collected</div>
              </div>
              <div>
                <div className="text-xl font-bold text-accent">{accuracy}%</div>
                <div className="text-xs text-muted-foreground">Harmony</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-600">{gameData.correctAnswers}</div>
                <div className="text-xs text-muted-foreground">Friends Helped</div>
              </div>
            </div>

            <div className="text-center">
              <Badge className="bg-primary/20 text-primary border-primary/30">
                {getCozyLevel()}
              </Badge>
            </div>
          </div>
        </div>

        {/* Share Actions */}
        <div className="flex gap-2">
          <Button
            onClick={handleNativeShare}
            className="flex-1 logling-button text-sm"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Adventure
          </Button>
          
          <Button
            onClick={handleCopyShare}
            variant="outline"
            size="icon"
            className="cozy-card hover:scale-105 transition-all"
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
            ✨ Adventure details copied to share!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SocialSharing;
