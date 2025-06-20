
import { useState } from 'react';
import { Settings, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useUserProfile } from '../hooks/useUserProfile';
import AccessibilitySettings from './AccessibilitySettings';
import GeneralSettingsTab from './settings/GeneralSettingsTab';
import AudioSettingsTab from './settings/AudioSettingsTab';

const GameSettings = () => {
  const { resetOnboarding } = useUserProfile();
  const [isOpen, setIsOpen] = useState(false);

  const handleModeSwitch = () => {
    setIsOpen(false);
    setTimeout(() => {
      resetOnboarding();
    }, 100);
  };

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
              <GeneralSettingsTab onModeSwitch={handleModeSwitch} />
            </TabsContent>

            <TabsContent value="audio" className="mt-6">
              <AudioSettingsTab />
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
