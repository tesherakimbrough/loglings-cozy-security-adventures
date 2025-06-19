
import { Sparkles, TreePine, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const GameIntroNewFeatures = () => {
  return (
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
  );
};

export default GameIntroNewFeatures;
