
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, Crown, Sparkles, Users, Building } from 'lucide-react';
import { useSubscriptionTier } from '../hooks/useSubscriptionTier';
import { useMonetizationTracking } from '../hooks/useMonetizationTracking';

interface PricingTier {
  name: string;
  price: number;
  period: string;
  description: string;
  icon: any;
  popular?: boolean;
  features: {
    name: string;
    included: boolean;
    limit?: string;
  }[];
  cta: string;
}

const PricingComparison = () => {
  const { subscriptionTier, upgradeSubscription } = useSubscriptionTier();
  const { trackPricingView, trackPaymentFlow } = useMonetizationTracking();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const pricingTiers: PricingTier[] = [
    {
      name: 'Forest Explorer',
      price: 0,
      period: 'forever',
      description: 'Perfect for curious beginners exploring cybersecurity',
      icon: Sparkles,
      features: [
        { name: 'Core scenario library', included: true, limit: '50 scenarios' },
        { name: 'Basic Logling companions', included: true, limit: '3 characters' },
        { name: 'Community support', included: true },
        { name: 'Basic progress tracking', included: true },
        { name: 'Cozy forest ambience', included: true, limit: '2 tracks' },
        { name: 'Premium scenarios', included: false },
        { name: 'Advanced analytics', included: false },
        { name: 'Learning paths', included: false },
        { name: 'Priority support', included: false }
      ],
      cta: 'Start Free'
    },
    {
      name: 'Garden Friend',
      price: billingPeriod === 'monthly' ? 7 : 70,
      period: billingPeriod === 'monthly' ? 'month' : 'year',
      description: 'For dedicated learners ready to grow their skills',
      icon: Crown,
      popular: true,
      features: [
        { name: 'Complete scenario library', included: true, limit: '300+ scenarios' },
        { name: 'All Logling companions', included: true, limit: '12+ characters' },
        { name: 'Email support', included: true },
        { name: 'Detailed progress analytics', included: true },
        { name: 'Full audio library', included: true, limit: '20+ tracks' },
        { name: 'Premium advanced scenarios', included: true, limit: '100+ scenarios' },
        { name: 'Personalized learning paths', included: true },
        { name: 'Achievement system', included: true },
        { name: 'Export progress reports', included: true }
      ],
      cta: 'Upgrade to Garden Friend'
    },
    {
      name: 'Forest Guardian',
      price: billingPeriod === 'monthly' ? 15 : 150,
      period: billingPeriod === 'monthly' ? 'month' : 'year',
      description: 'For professionals and teams seeking comprehensive training',
      icon: Building,
      features: [
        { name: 'Everything in Garden Friend', included: true },
        { name: 'Custom scenario creation', included: true },
        { name: 'Team management dashboard', included: true, limit: 'Up to 10 users' },
        { name: 'Priority support', included: true },
        { name: 'Advanced reporting', included: true },
        { name: 'API access', included: true },
        { name: 'White-label options', included: true },
        { name: 'Dedicated account manager', included: true },
        { name: 'Custom integrations', included: true }
      ],
      cta: 'Upgrade to Guardian'
    }
  ];

  const handleUpgrade = (tier: PricingTier) => {
    trackPricingView('pricing_comparison');
    trackPaymentFlow('started', tier.price, 'pricing_page');
    
    if (tier.price === 0) {
      // Already free tier
      return;
    }
    
    // Simulate upgrade process
    upgradeSubscription(
      tier.name === 'Garden Friend' ? 'premium' : 'team',
      billingPeriod === 'yearly' ? 12 : 1
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Choose Your Forest Adventure</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Every plan includes our signature cozy learning experience. 
          Upgrade when you're ready for more advanced features and deeper forest exploration.
        </p>
        
        <Tabs value={billingPeriod} onValueChange={(value) => setBillingPeriod(value as 'monthly' | 'yearly')}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly" className="relative">
              Yearly
              <Badge className="ml-2 bg-green-100 text-green-800 text-xs">Save 17%</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {pricingTiers.map((tier) => {
          const IconComponent = tier.icon;
          const isCurrentTier = (
            (tier.name === 'Forest Explorer' && subscriptionTier === 'free') ||
            (tier.name === 'Garden Friend' && subscriptionTier === 'premium') ||
            (tier.name === 'Forest Guardian' && subscriptionTier === 'team')
          );

          return (
            <Card key={tier.name} className={`relative ${tier.popular ? 'border-primary border-2' : ''} ${isCurrentTier ? 'bg-green-50 dark:bg-green-950/30' : ''}`}>
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary">Most Popular</Badge>
                </div>
              )}
              
              {isCurrentTier && (
                <div className="absolute -top-3 right-4">
                  <Badge className="bg-green-600">Current Plan</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 w-12 h-12 bg-gradient-to-br from-green-400 to-amber-400 rounded-full flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">
                    ${tier.price}
                    {tier.price > 0 && <span className="text-lg text-muted-foreground">/{tier.period}</span>}
                  </div>
                  {billingPeriod === 'yearly' && tier.price > 0 && (
                    <p className="text-sm text-green-600">
                      ${Math.round(tier.price / 12)}/month billed annually
                    </p>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">{tier.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      )}
                      <div className="text-sm">
                        <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                          {feature.name}
                        </span>
                        {feature.limit && (
                          <div className="text-xs text-muted-foreground">{feature.limit}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full mt-6" 
                  variant={tier.popular ? 'default' : 'outline'}
                  onClick={() => handleUpgrade(tier)}
                  disabled={isCurrentTier}
                >
                  {isCurrentTier ? 'Current Plan' : tier.cta}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center space-y-4 pt-8 border-t">
        <h3 className="text-xl font-semibold">Questions about pricing?</h3>
        <p className="text-muted-foreground">
          All plans include our gentle, stress-free learning approach. 
          Start free and upgrade when you're ready for more advanced features.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="sm">
            View Feature Details
          </Button>
          <Button variant="outline" size="sm">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingComparison;
