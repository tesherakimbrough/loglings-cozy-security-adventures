
import { useState } from 'react';
import { Settings, Volume2, VolumeX, Smartphone, Bell, Share2, Shield, Heart, RefreshCw, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useUserProfile } from '../hooks/useUserProfile';
import MusicSelector from './MusicSelector';
import AccessibilitySettings from './AccessibilitySettings';

const GameSettings = () => {
  const { profile, updatePreferences, resetOnboarding } = useUserProfile();
  const [isOpen, setIsOpen] = useState(false);

  const handlePreferenceChange = (key: string, value: any) => {
    updatePreferences({ [key]: value });
  };

  const handleModeSwitch = () => {
    setIsOpen(false);
    setTimeout(() => {
      resetOnboarding();
    }, 100);
  };

  const getModeInfo = () => {
    return profile.mode === 'cozy-everyday' 
      ? { name: 'Cozy Everyday Discovery', icon: Heart, color: 'text-green-600' }
      : { name: 'Career Pro Mode', icon: Shield, color: 'text-blue-600' };
  };

  const modeInfo = getModeInfo();
  const ModeIcon = modeInfo.icon;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="cozy-card hover:scale-105 transition-all"
          aria-label="Open settings"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto bg-white dark:bg-gray-900">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100 text-lg">
            <Settings className="w-5 h-5 shrink-0" />
            Cozy Settings
          </SheetTitle>
        </SheetHeader>
        
        <div className="pb-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800">
              <TabsTrigger value="general" className="text-sm text-gray-700 dark:text-gray-300 data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100">General</TabsTrigger>
              <TabsTrigger value="audio" className="text-sm text-gray-700 dark:text-gray-300 data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100">Audio</TabsTrigger>
              <TabsTrigger value="accessibility" className="text-sm text-gray-700 dark:text-gray-300 data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100">
                <Eye className="w-4 h-4 mr-1" />
                Accessibility
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-6 mt-6">
              {/* Current Mode Display */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-sm text-gray-900 dark:text-gray-100">
                  <ModeIcon className={`w-4 h-4 ${modeInfo.color} shrink-0`} />
                  Current Adventure Mode
                </h4>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{modeInfo.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {profile.mode === 'cozy-everyday' 
                          ? 'Gentle learning for everyone'
                          : 'Career-focused skill building'
                        }
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleModeSwitch}
                      className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Switch Mode
                    </Button>
                  </div>
                </div>
              </div>

              {/* Difficulty Settings */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-sm text-gray-900 dark:text-gray-100">
                  <Smartphone className="w-4 h-4 text-blue-600 shrink-0" />
                  Adventure Difficulty
                </h4>
                <Select
                  value={profile.preferences.difficulty}
                  onValueChange={(value) => handlePreferenceChange('difficulty', value)}
                >
                  <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-lg">
                    <SelectItem value="beginner">🌱 Gentle Explorer</SelectItem>
                    <SelectItem value="intermediate">🌿 Curious Adventurer</SelectItem>
                    <SelectItem value="advanced">🌳 Forest Guardian</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notifications */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-sm text-gray-900 dark:text-gray-100">
                  <Bell className="w-4 h-4 text-yellow-600 shrink-0" />
                  Daily Reminders
                </h4>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex-1">
                    Gentle learning nudges
                  </span>
                  <Switch
                    checked={profile.preferences.notifications}
                    onCheckedChange={(checked) => handlePreferenceChange('notifications', checked)}
                    className="shrink-0"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-sm text-gray-900 dark:text-gray-100">
                  <Share2 className="w-4 h-4 text-green-600 shrink-0" />
                  Share Achievements
                </h4>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex-1">
                    Celebrate with friends
                  </span>
                  <Switch
                    checked={profile.preferences.shareAchievements}
                    onCheckedChange={(checked) => handlePreferenceChange('shareAchievements', checked)}
                    className="shrink-0"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="audio" className="space-y-6 mt-6">
              {/* Music Selection */}
              <div className="space-y-3">
                <MusicSelector />
              </div>

              {/* Sound Effects Settings */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-sm text-gray-900 dark:text-gray-100">
                  {profile.preferences.soundEffectsEnabled ? (
                    <Volume2 className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                  Answer Feedback Sounds
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400 flex-1">
                      Gentle chimes and feedback sounds
                    </span>
                    <Switch
                      checked={profile.preferences.soundEffectsEnabled}
                      onCheckedChange={(checked) => handlePreferenceChange('soundEffectsEnabled', checked)}
                      className="shrink-0"
                    />
                  </div>
                  {profile.preferences.soundEffectsEnabled && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Volume</span>
                        <span className="text-blue-600 font-medium">{Math.round(profile.preferences.soundEffectsVolume * 100)}%</span>
                      </div>
                      <Slider
                        value={[profile.preferences.soundEffectsVolume]}
                        onValueChange={([value]) => handlePreferenceChange('soundEffectsVolume', value)}
                        max={1}
                        step={0.1}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* General Audio Settings */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2 text-sm text-gray-900 dark:text-gray-100">
                  {profile.preferences.audioEnabled ? (
                    <Volume2 className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                  General Audio
                </h4>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400 flex-1">
                    Enable all game sounds
                  </span>
                  <Switch
                    checked={profile.preferences.audioEnabled}
                    onCheckedChange={(checked) => handlePreferenceChange('audioEnabled', checked)}
                    className="shrink-0"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="accessibility" className="mt-6">
              <AccessibilitySettings />
            </TabsContent>
          </Tabs>

          {/* Close Button */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save Cozy Settings
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default GameSettings;
