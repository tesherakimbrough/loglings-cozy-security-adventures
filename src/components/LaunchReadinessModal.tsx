
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Rocket, 
  DollarSign, 
  Users, 
  BookOpen, 
  Crown,
  Target,
  TrendingUp,
  CheckCircle,
  Clock
} from 'lucide-react';
import { SUBSCRIPTION_TIERS } from '../utils/expandedContentLibrary';
import { useMonetizationTracking } from '../hooks/useMonetizationTracking';

const LaunchReadinessModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { trackPremiumInquiry, trackDonationInterest } = useMonetizationTracking();

  const launchMetrics = {
    contentReadiness: 95,
    userFeedback: 85,
    technicalReadiness: 90,
    monetizationReady: 100,
    marketingReady: 75
  };

  const overallReadiness = Math.round(
    (launchMetrics.contentReadiness + 
     launchMetrics.userFeedback + 
     launchMetrics.technicalReadiness + 
     launchMetrics.monetizationReady + 
     launchMetrics.marketingReady) / 5
  );

  const handlePricingView = (tier: string) => {
    trackPremiumInquiry('launch_modal', tier);
  };

  const handleDonationClick = () => {
    trackDonationInterest(undefined, 'launch_modal');
    window.open('https://ko-fi.com/loglings', '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-green-600 to-blue-600 text-white hover:from-green-700 hover:to-blue-700">
          <Rocket className="w-4 h-4 mr-2" />
          Launch Readiness
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Target className="w-6 h-6 text-primary" />
            Loglings Launch Readiness Dashboard
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overall Readiness */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Launch Readiness Score</span>
                <Badge variant={overallReadiness >= 85 ? 'default' : 'secondary'}>
                  {overallReadiness}% Ready
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={overallReadiness} className="h-4 mb-4" />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-green-600">{launchMetrics.contentReadiness}%</div>
                  <p className="text-xs text-muted-foreground">Content</p>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600">{launchMetrics.userFeedback}%</div>
                  <p className="text-xs text-muted-foreground">User Feedback</p>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-600">{launchMetrics.technicalReadiness}%</div>
                  <p className="text-xs text-muted-foreground">Technical</p>
                </div>
                <div>
                  <div className="text-lg font-bold text-emerald-600">{launchMetrics.monetizationReady}%</div>
                  <p className="text-xs text-muted-foreground">Monetization</p>
                </div>
                <div>
                  <div className="text-lg font-bold text-orange-600">{launchMetrics.marketingReady}%</div>
                  <p className="text-xs text-muted-foreground">Marketing</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Ready to Launch
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>✅ 500+ Scenarios</span>
                      <Badge>Complete</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>✅ Cozy UX Design</span>
                      <Badge>Complete</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>✅ Analytics System</span>
                      <Badge>Complete</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>✅ Accessibility Features</span>
                      <Badge>Complete</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-yellow-600" />
                      Next Phase
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>🔄 User Accounts</span>
                      <Badge variant="outline">Phase 1</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>💳 Payment Processing</span>
                      <Badge variant="outline">Phase 1</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>🏢 Team Features</span>
                      <Badge variant="outline">Phase 2</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>📱 Mobile App</span>
                      <Badge variant="outline">Phase 3</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Object.entries(SUBSCRIPTION_TIERS).map(([key, tier]) => (
                  <Card key={key} className={`relative ${key === 'premium' ? 'border-primary border-2' : ''}`}>
                    {key === 'premium' && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-primary">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="flex items-center justify-center gap-2">
                        {key === 'premium' && <Crown className="w-5 h-5 text-yellow-600" />}
                        {tier.name}
                      </CardTitle>
                      <div className="text-3xl font-bold">
                        ${tier.price}
                        {tier.price > 0 && <span className="text-sm text-muted-foreground">/month</span>}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {tier.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="w-full mt-4" 
                        variant={key === 'premium' ? 'default' : 'outline'}
                        onClick={() => handlePricingView(key)}
                      >
                        {tier.price === 0 ? 'Start Free' : 'Choose Plan'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">
                      <div className="text-2xl font-bold text-green-600">300+</div>
                      <div className="text-sm">Free Scenarios</div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-sm">
                    <p>Complete beginner to intermediate cybersecurity scenarios covering all major threat categories.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">
                      <div className="text-2xl font-bold text-blue-600">200+</div>
                      <div className="text-sm">Premium Scenarios</div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-sm">
                    <p>Advanced APT simulations, zero-day exploits, and complex multi-stage attacks for professionals.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-center">
                      <div className="text-2xl font-bold text-purple-600">50+</div>
                      <div className="text-sm">Learning Paths</div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-sm">
                    <p>Curated learning journeys for SOC analysts, pentesters, managers, and beginners.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="roadmap" className="space-y-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      Phase 1: Foundation (Next 2 weeks)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Supabase user authentication integration</li>
                      <li>• Stripe payment processing setup</li>
                      <li>• User progress persistence</li>
                      <li>• Early access landing page</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-600" />
                      Phase 2: Growth (Month 2)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Community features and forums</li>
                      <li>• Advanced analytics dashboard</li>
                      <li>• Custom scenario creation tools</li>
                      <li>• Partnership with cybersecurity bootcamps</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                      Phase 3: Scale (Month 3+)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>• Mobile application</li>
                      <li>• Enterprise team management</li>
                      <li>• AI-powered personalized learning</li>
                      <li>• Industry certifications integration</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-4 justify-center">
            <Button onClick={handleDonationClick} variant="outline" className="gap-2">
              <DollarSign className="w-4 h-4" />
              Support Early Development
            </Button>
            <Button className="gap-2" onClick={() => trackPremiumInquiry('launch_modal', 'cta')}>
              <Rocket className="w-4 h-4" />
              Begin Soft Launch
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LaunchReadinessModal;
