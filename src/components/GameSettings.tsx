
import { useState } from 'react';
import { Settings, Volume2, VolumeX, Smartphone, Bell, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useEnhancedProgress } from '../hooks/useEnhancedProgress';
import MusicSelector from './MusicSelector';

const GameSettings = () => {
  const { progress, updatePreferences } = useEnhancedProgress();
  const [isOpen, setIsOpen] = useState(false);

  const handlePreferenceChange = (key: string, value: any) => {
    updatePreferences({ [key]: value });
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="cozy-card hover:scale-105 transition-all"
      >
        <Settings className="w-4 h-4" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md cozy-card cozy-glow max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Settings className="w-5 h-5" />
                Cozy Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Music Selection */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  🎵 Study Atmosphere
                </h4>
                <MusicSelector />
              </div>

              {/* Audio Settings */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  {progress.preferences.audioEnabled ? (
                    <Volume2 className="w-4 h-4 text-accent" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-muted-foreground" />
                  )}
                  Sound Effects
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Game feedback sounds</span>
                  <Switch
                    checked={progress.preferences.audioEnabled}
                    onCheckedChange={(checked) => handlePreferenceChange('audioEnabled', checked)}
                  />
                </div>
                {progress.preferences.audioEnabled && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Volume2 className="w-4 h-4" />
                      <span>Effects Volume</span>
                    </div>
                    <Slider
                      value={[progress.preferences.effectsVolume]}
                      onValueChange={(value) => handlePreferenceChange('effectsVolume', value[0])}
                      max={1}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                )}
              </div>

              {/* Difficulty Settings */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-primary" />
                  Adventure Difficulty
                </h4>
                <Select
                  value={progress.preferences.difficulty}
                  onValueChange={(value) => handlePreferenceChange('difficulty', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">🌱 Gentle Explorer</SelectItem>
                    <SelectItem value="intermediate">🌿 Curious Adventurer</SelectItem>
                    <SelectItem value="advanced">🌳 Forest Guardian</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notifications */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Bell className="w-4 h-4 text-accent" />
                  Daily Reminders
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Gentle learning nudges</span>
                  <Switch
                    checked={progress.preferences.notifications}
                    onCheckedChange={(checked) => handlePreferenceChange('notifications', checked)}
                  />
                </div>
              </div>

              {/* Social Sharing */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-green-600" />
                  Share Achievements
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Celebrate with friends</span>
                  <Switch
                    checked={progress.preferences.shareAchievements}
                    onCheckedChange={(checked) => handlePreferenceChange('shareAchievements', checked)}
                  />
                </div>
              </div>

              {/* Close Button */}
              <Button
                onClick={() => setIsOpen(false)}
                className="w-full logling-button"
              >
                Save Cozy Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default GameSettings;
