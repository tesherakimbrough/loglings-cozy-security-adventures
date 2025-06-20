
import { Heart, Shield, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserProfile } from '../../hooks/useUserProfile';

interface CurrentModeDisplayProps {
  onModeSwitch: () => void;
}

const CurrentModeDisplay = ({ onModeSwitch }: CurrentModeDisplayProps) => {
  const { profile } = useUserProfile();

  const getModeInfo = () => {
    return profile.mode === 'cozy-everyday' 
      ? { name: 'Cozy Everyday Discovery', icon: Heart, color: 'text-green-600' }
      : { name: 'Career Pro Mode', icon: Shield, color: 'text-blue-600' };
  };

  const modeInfo = getModeInfo();
  const ModeIcon = modeInfo.icon;

  return (
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
            onClick={onModeSwitch}
            className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Switch Mode
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CurrentModeDisplay;
