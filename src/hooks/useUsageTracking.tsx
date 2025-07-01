
import { useState, useEffect } from 'react';
import { useUserProfile } from './useUserProfile';
import { useSubscriptionTier } from './useSubscriptionTier';

interface UsageLimits {
  scenariosPerDay: number;
  totalScenarios: number;
  audioTracks: number;
  learningPaths: number;
  exports: number;
}

interface UsageData {
  scenariosToday: number;
  totalScenariosUsed: number;
  audioTracksUsed: number;
  learningPathsUsed: number;
  exportsUsed: number;
  lastResetDate: string;
}

export const useUsageTracking = () => {
  const { profile } = useUserProfile();
  const { subscriptionTier, features } = useSubscriptionTier();
  
  const [usage, setUsage] = useState<UsageData>({
    scenariosToday: 0,
    totalScenariosUsed: 0,
    audioTracksUsed: 2,
    learningPathsUsed: 0,
    exportsUsed: 0,
    lastResetDate: new Date().toDateString()
  });

  const limits: UsageLimits = {
    scenariosPerDay: subscriptionTier === 'free' ? 10 : 999,
    totalScenarios: features.scenarioLimit,
    audioTracks: subscriptionTier === 'free' ? 2 : 20,
    learningPaths: features.learningPaths ? 999 : 0,
    exports: subscriptionTier === 'free' ? 0 : 10
  };

  useEffect(() => {
    const savedUsage = localStorage.getItem('loglings-usage-data');
    if (savedUsage) {
      const parsedUsage = JSON.parse(savedUsage);
      
      // Reset daily counters if it's a new day
      const today = new Date().toDateString();
      if (parsedUsage.lastResetDate !== today) {
        parsedUsage.scenariosToday = 0;
        parsedUsage.lastResetDate = today;
      }
      
      setUsage(parsedUsage);
    }
  }, []);

  const updateUsage = (key: keyof UsageData, increment: number = 1) => {
    setUsage(prev => {
      const newUsage = {
        ...prev,
        [key]: prev[key] + increment
      };
      localStorage.setItem('loglings-usage-data', JSON.stringify(newUsage));
      return newUsage;
    });
  };

  const trackScenarioPlayed = () => {
    updateUsage('scenariosToday');
    updateUsage('totalScenariosUsed');
  };

  const trackAudioUsed = () => {
    if (usage.audioTracksUsed < limits.audioTracks) {
      updateUsage('audioTracksUsed');
    }
  };

  const trackLearningPathUsed = () => {
    updateUsage('learningPathsUsed');
  };

  const trackExportUsed = () => {
    updateUsage('exportsUsed');
  };

  const getUsagePercentage = (type: keyof UsageLimits): number => {
    switch (type) {
      case 'scenariosPerDay':
        return (usage.scenariosToday / limits.scenariosPerDay) * 100;
      case 'totalScenarios':
        return (usage.totalScenariosUsed / limits.totalScenarios) * 100;
      case 'audioTracks':
        return (usage.audioTracksUsed / limits.audioTracks) * 100;
      case 'learningPaths':
        return limits.learningPaths > 0 ? (usage.learningPathsUsed / limits.learningPaths) * 100 : 0;
      case 'exports':
        return limits.exports > 0 ? (usage.exportsUsed / limits.exports) * 100 : 0;
      default:
        return 0;
    }
  };

  const isLimitReached = (type: keyof UsageLimits): boolean => {
    return getUsagePercentage(type) >= 100;
  };

  const isNearLimit = (type: keyof UsageLimits, threshold: number = 80): boolean => {
    return getUsagePercentage(type) >= threshold;
  };

  const getRemainingUsage = (type: keyof UsageLimits): number => {
    switch (type) {
      case 'scenariosPerDay':
        return Math.max(0, limits.scenariosPerDay - usage.scenariosToday);
      case 'totalScenarios':
        return Math.max(0, limits.totalScenarios - usage.totalScenariosUsed);
      case 'audioTracks':
        return Math.max(0, limits.audioTracks - usage.audioTracksUsed);
      case 'learningPaths':
        return Math.max(0, limits.learningPaths - usage.learningPathsUsed);
      case 'exports':
        return Math.max(0, limits.exports - usage.exportsUsed);
      default:
        return 0;
    }
  };

  return {
    usage,
    limits,
    trackScenarioPlayed,
    trackAudioUsed,
    trackLearningPathUsed,
    trackExportUsed,
    getUsagePercentage,
    isLimitReached,
    isNearLimit,
    getRemainingUsage
  };
};
