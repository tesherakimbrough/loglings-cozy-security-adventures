
import { useState, useEffect } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TreePine, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { ResponsiveWrapper } from '../components/ResponsiveWrapper';
import { useAuth } from '@/hooks/useAuth';
import { useMobileOptimization } from '../hooks/useMobileOptimization';

const Auth = () => {
  const { user, signIn, signUp } = useAuth();
  const { shouldUseCompactLayout } = useMobileOptimization();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Check for email verification success
  useEffect(() => {
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    
    if (error) {
      setError(`Email verification failed: ${errorDescription || error}`);
    } else if (searchParams.get('type') === 'signup') {
      setSuccess('Email verified successfully! You can now sign in.');
    }
  }, [searchParams]);

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const { error } = await signIn(email, password);
    
    if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const { error } = await signUp(email, password, displayName);
    
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Check your email for a verification link! The link will bring you back here to sign in.');
      // Clear form
      setEmail('');
      setPassword('');
      setDisplayName('');
    }
    setLoading(false);
  };

  return (
    <ResponsiveWrapper>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 flex items-center justify-center p-2 md:p-4">
        <Card className={`w-full ${shouldUseCompactLayout ? 'max-w-sm' : 'max-w-md'} cozy-card cozy-glow`}>
          <CardHeader className="text-center space-y-3 md:space-y-4 p-4 md:p-6">
            <div className="mx-auto w-12 h-12 md:w-16 md:h-16 bg-emerald-100 dark:bg-emerald-950/50 rounded-full flex items-center justify-center">
              <TreePine className="w-6 h-6 md:w-8 md:h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <CardTitle className="text-xl md:text-2xl font-bold text-emerald-800 dark:text-emerald-200">
                Welcome to Loglings
              </CardTitle>
              <p className="text-sm md:text-base text-emerald-600 dark:text-emerald-400 mt-2">
                Your cozy cybersecurity adventure awaits
              </p>
            </div>
          </CardHeader>
          <CardContent className="p-4 md:p-6">
            <Tabs defaultValue="signin" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 h-10 md:h-auto">
                <TabsTrigger value="signin" className="text-sm md:text-base">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="text-sm md:text-base">Sign Up</TabsTrigger>
              </TabsList>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert variant="default" className="border-emerald-200 bg-emerald-50 text-emerald-800">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <AlertDescription className="text-sm">{success}</AlertDescription>
                </Alert>
              )}

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-sm md:text-base">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 md:h-auto text-base"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-sm md:text-base">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-password"
                        type="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 h-12 md:h-auto text-base"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 md:h-auto text-base"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-sm md:text-base">Display Name (Optional)</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Your name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="pl-10 h-12 md:h-auto text-base"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-sm md:text-base">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 md:h-auto text-base"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-sm md:text-base">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Choose a secure password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 h-12 md:h-auto text-base"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 md:h-auto text-base"
                    disabled={loading}
                  >
                    {loading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-4 md:mt-6 p-3 md:p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <h4 className="text-sm font-semibold text-emerald-800 dark:text-emerald-200 mb-2">
                Testing Note:
              </h4>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">
                After signing up, check your email for a verification link. Click it to verify your account, 
                then return here to sign in with your credentials.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ResponsiveWrapper>
  );
};

export default Auth;
