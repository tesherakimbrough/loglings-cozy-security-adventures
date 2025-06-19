import { useEffect } from 'react';
import { useAnalytics } from './useAnalytics';
import { useLaunchAnalytics } from './useLaunchAnalytics';

interface MonetizationEvent {
  action: 'donation_interest' | 'premium_inquiry' | 'pricing_viewed' | 'upgrade_clicked' | 'payment_started' | 'payment_completed';
  value?: number;
  source: string;
  context?: string;
}

export const useMonetizationTracking = () => {
  const { trackEvent } = useAnalytics();
  const { trackPremiumInterest } = useLaunchAnalytics();

  const trackMonetization = (event: MonetizationEvent) => {
    // Track in general analytics
    trackEvent({
      action: event.action,
      category: 'monetization',
      label: `${event.source}_${event.context || 'general'}`,
      value: event.value
    });

    // Track in launch analytics if premium related
    if (event.action.includes('premium') || event.action.includes('upgrade')) {
      trackPremiumInterest(event.source);
    }

    // Store monetization funnel data
    const funnelData = JSON.parse(localStorage.getItem('loglings-monetization-funnel') || '[]');
    funnelData.push({
      ...event,
      timestamp: new Date().toISOString(),
      sessionId: sessionStorage.getItem('loglings-session-id'),
      userAgent: navigator.userAgent
    });
    
    // Keep last 200 events
    localStorage.setItem('loglings-monetization-funnel', JSON.stringify(funnelData.slice(-200)));
  };

  const trackDonationInterest = (amount?: number, platform?: string) => {
    trackMonetization({
      action: 'donation_interest',
      value: amount,
      source: platform || 'unknown',
      context: 'donation_button'
    });
  };

  const trackPremiumInquiry = (source: string, context?: string) => {
    trackMonetization({
      action: 'premium_inquiry',
      source,
      context
    });
  };

  const trackPricingView = (source: string) => {
    trackMonetization({
      action: 'pricing_viewed',
      source,
      context: 'pricing_page'
    });
  };

  const trackPaymentFlow = (stage: 'started' | 'completed', amount?: number, source?: string) => {
    trackMonetization({
      action: stage === 'started' ? 'payment_started' : 'payment_completed',
      value: amount,
      source: source || 'checkout',
      context: 'payment_flow'
    });
  };

  // Auto-track user behavior that indicates monetization readiness
  useEffect(() => {
    const sessions = JSON.parse(localStorage.getItem('loglings-session-history') || '[]');
    const totalSessions = sessions.length;
    
    // Track high-engagement users (potential customers)
    if (totalSessions === 5) {
      trackMonetization({
        action: 'premium_inquiry',
        source: 'engagement_milestone',
        context: '5_sessions'
      });
    }
    
    if (totalSessions === 10) {
      trackMonetization({
        action: 'premium_inquiry',
        source: 'engagement_milestone',
        context: '10_sessions'
      });
    }
  }, []);

  return {
    trackMonetization,
    trackDonationInterest,
    trackPremiumInquiry,
    trackPricingView,
    trackPaymentFlow
  };
};
