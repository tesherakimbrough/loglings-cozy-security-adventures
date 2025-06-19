import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Heart, Sparkles, TreePine, Mail, Check } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import FeedbackForm, { FeedbackData } from '@/components/FeedbackForm';
import { toast } from 'sonner';

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Check for premium upgrade context
  const urlParams = new URLSearchParams(window.location.search);
  const isPremiumSignup = urlParams.get('premium') === 'true';
  const signupSource = urlParams.get('source') || 'waitlist';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store waitlist data
    const waitlistData = {
      email,
      firstName,
      timestamp: new Date().toISOString(),
      source: signupSource,
      isPremium: isPremiumSignup
    };
    
    const existingData = JSON.parse(localStorage.getItem('loglings-waitlist') || '[]');
    existingData.push(waitlistData);
    localStorage.setItem('loglings-waitlist', JSON.stringify(existingData));
    
    setIsLoading(false);
    setIsSubmitted(true);
    
    toast.success('Welcome to our cozy forest! 🌸');
    
    // Show feedback form after a brief delay
    setTimeout(() => setShowFeedback(true), 1500);
  };

  const handleFeedbackSubmit = (feedback: FeedbackData) => {
    setShowFeedback(false);
    toast.success('Your thoughts help our forest flourish! 🌱');
  };

  const handleFeedbackSkip = () => {
    setShowFeedback(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-amber-50 to-rose-50 dark:from-green-950/20 dark:via-amber-950/20 dark:to-rose-950/20" />
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 animate-gentle-float">
          <Sparkles className="w-6 h-6 text-amber-400/60" />
        </div>
        <div className="absolute top-40 right-20 animate-gentle-float" style={{ animationDelay: '1s' }}>
          <TreePine className="w-8 h-8 text-green-400/60" />
        </div>
        <div className="absolute bottom-32 left-20 animate-gentle-float" style={{ animationDelay: '2s' }}>
          <Heart className="w-5 h-5 text-rose-400/60" />
        </div>

        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        {showFeedback ? (
          <FeedbackForm 
            onSubmit={handleFeedbackSubmit}
            onSkip={handleFeedbackSkip}
          />
        ) : (
          <Card className="w-full max-w-md cozy-card animate-scale-in relative z-10">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-green-400 to-amber-400 rounded-full flex items-center justify-center animate-gentle-bounce">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">
                {isPremiumSignup ? "Premium access request received! 🌟" : "You're on the list! 🌸"}
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                {isPremiumSignup 
                  ? "We'll reach out soon about premium features and early access opportunities!"
                  : "We'll send you a gentle hello when it's your turn to explore Loglings. Thank you for joining our cozy digital forest!"
                }
              </p>
            </CardHeader>
            
            <CardContent className="text-center">
              <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4 mb-6">
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  💝 Check your email for a special surprise wallpaper!
                </p>
              </div>
              
              <Button
                onClick={() => window.location.href = '/'}
                className="logling-button w-full"
              >
                Continue Exploring
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-amber-50 to-rose-50 dark:from-green-950/20 dark:via-amber-950/20 dark:to-rose-950/20" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 animate-gentle-float">
        <Sparkles className="w-6 h-6 text-amber-400/60" />
      </div>
      <div className="absolute top-40 right-20 animate-gentle-float" style={{ animationDelay: '1s' }}>
        <TreePine className="w-8 h-8 text-green-400/60" />
      </div>
      <div className="absolute bottom-32 left-20 animate-gentle-float" style={{ animationDelay: '2s' }}>
        <Heart className="w-5 h-5 text-rose-400/60" />
      </div>
      <div className="absolute top-60 left-1/2 animate-gentle-float" style={{ animationDelay: '0.5s' }}>
        <div className="w-2 h-2 bg-rose-300 rounded-full animate-sparkle" />
      </div>

      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md cozy-card animate-fade-in relative z-10">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 w-20 h-20 bg-gradient-to-br from-green-400 to-amber-400 rounded-full flex items-center justify-center animate-cozy-pulse">
            <TreePine className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold forest-primary mb-2">
            {isPremiumSignup ? "Join Premium Early Access!" : "Join the Cozy Waitlist!"}
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            {isPremiumSignup 
              ? "Get exclusive access to premium features and help shape the future of cozy cybersecurity learning."
              : "Be first to play, get exclusive sneak peeks, and help shape our gentle digital forest."
            }
          </p>
        </CardHeader>
        
        <CardContent>
          {isPremiumSignup && (
            <div className="bg-gradient-to-r from-amber-50 to-rose-50 dark:from-amber-950/30 dark:to-rose-950/30 rounded-lg p-4 mb-6 border border-amber-200 dark:border-amber-800/50">
              <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Premium Features Included
              </h4>
              <ul className="text-sm text-amber-600 dark:text-amber-400 space-y-1">
                <li>• 🎵 Complete cozy audio library</li>
                <li>• 🌟 Advanced learning paths</li>
                <li>• 📊 Detailed progress insights</li>
                <li>• 🎁 Early access to new content</li>
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                First Name (optional)
              </label>
              <Input
                id="firstName"
                type="text"
                placeholder="What should we call you?"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="cozy-card border-2 focus:border-primary/50 transition-colors"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address *
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="cozy-card border-2 focus:border-primary/50 transition-colors"
              />
            </div>
            
            <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3 text-center">
              <p className="text-xs text-green-700 dark:text-green-300 flex items-center justify-center gap-2">
                <Heart className="w-3 h-3" />
                We'll only send gentle updates. No spam—ever.
                <Heart className="w-3 h-3" />
              </p>
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="logling-button w-full text-lg py-6 relative overflow-hidden"
            >
              <Mail className="w-5 h-5 mr-2" />
              {isLoading ? 'Joining...' : isPremiumSignup ? 'Request Premium Access' : 'Join the Waitlist'}
              {isLoading && (
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              🌿 Join 0+ nature lovers already on the waitlist 🌿
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Waitlist;
