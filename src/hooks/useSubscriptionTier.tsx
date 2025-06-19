
import { useState, useEffect } from 'react';
import { useUserProfile } from './useUserProfile';

export type SubscriptionTier = 'free' | 'basic' | 'premium' | 'team';

export const useSubscriptionTier = () => {
  const { profile } = useUserProfile();
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>('free');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionEndDate, setSubscriptionEndDate] = useState<Date | null>(null);

  useEffect(() => {
    // Check local storage for subscription info (temporary solution)
    const savedTier = localStorage.getItem('loglings-subscription-tier') as SubscriptionTier;
    const savedEndDate = localStorage.getItem('loglings-subscription-end');
    
    if (savedTier) {
      setSubscriptionTier(savedTier);
      setIsSubscribed(savedTier !== 'free');
      
      if (savedEndDate) {
        const endDate = new Date(savedEndDate);
        setSubscriptionEndDate(endDate);
        
        // Check if subscription has expired
        if (endDate < new Date()) {
          setSubscriptionTier('free');
          setIsSubscribed(false);
          localStorage.removeItem('loglings-subscription-tier');
          localStorage.removeItem('loglings-subscription-end');
        }
      }
    }

    // For early access users, grant premium access
    if (profile.progress.totalSessions >= 3) {
      setSubscriptionTier('premium');
      setIsSubscribed(true);
      // Set end date to 3 months from now for early access
      const earlyAccessEnd = new Date();
      earlyAccessEnd.setMonth(earlyAccessEnd.getMonth() + 3);
      setSubscriptionEndDate(earlyAccessEnd);
    }
  }, [profile]);

  const upgradeSubscription = (newTier: SubscriptionTier, months: number = 1) => {
    setSubscriptionTier(newTier);
    setIsSubscribed(newTier !== 'free');
    
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + months);
    setSubscriptionEndDate(endDate);
    
    localStorage.setItem('loglings-subscription-tier', newTier);
    localStorage.setItem('loglings-subscription-end', endDate.toISOString());
  };

  const cancelSubscription = () => {
    setSubscriptionTier('free');
    setIsSubscribed(false);
    setSubscriptionEndDate(null);
    localStorage.removeItem('loglings-subscription-tier');
    localStorage.removeItem('loglings-subscription-end');
  };

  const getSubscriptionFeatures = () => {
    switch (subscriptionTier) {
      case 'free':
        return {
          scenarioLimit: 50,
          premiumScenarios: false,
          learningPaths: false,
          analytics: false,
          support: 'community'
        };
      case 'basic':
        return {
          scenarioLimit: 300,
          premiumScenarios: false,
          learningPaths: true,
          analytics: true,
          support: 'email'
        };
      case 'premium':
        return {
          scenarioLimit: 500,
          premiumScenarios: true,
          learningPaths: true,
          analytics: true,
          support: 'priority'
        };
      case 'team':
        return {
          scenarioLimit: 500,
          premiumScenarios: true,
          learningPaths: true,
          analytics: true,
          support: 'dedicated',
          teamManagement: true
        };
      default:
        return {
          scenarioLimit: 10,
          premiumScenarios: false,
          learningPaths: false,
          analytics: false,
          support: 'none'
        };
    }
  };

  return {
    subscriptionTier,
    isSubscribed,
    subscriptionEndDate,
    features: getSubscriptionFeatures(),
    upgradeSubscription,
    cancelSubscription
  };
};
