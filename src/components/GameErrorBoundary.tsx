
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId: string;
}

class GameErrorBoundary extends Component<Props, State> {
  private retryCount = 0;
  private maxRetries = 3;

  public state: State = {
    hasError: false,
    errorId: ''
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { 
      hasError: true, 
      error,
      errorId: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Game Error Boundary caught an error:', error, errorInfo);
    
    this.setState({ errorInfo });
    
    // Log error details for debugging
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId: this.state.errorId,
      timestamp: new Date().toISOString(),
      retryCount: this.retryCount
    };
    
    // Store error locally for debugging
    const existingErrors = JSON.parse(localStorage.getItem('loglings-game-errors') || '[]');
    existingErrors.push(errorDetails);
    localStorage.setItem('loglings-game-errors', JSON.stringify(existingErrors.slice(-10))); // Keep last 10 errors
    
    // Call parent error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // Show user-friendly toast
    toast.error('Game encountered an issue, but your progress is safe!', {
      duration: 5000,
      action: {
        label: 'Retry',
        onClick: () => this.handleRetry()
      }
    });
  }

  private handleRetry = () => {
    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      console.log(`Retrying game... Attempt ${this.retryCount}/${this.maxRetries}`);
      
      // Clear error state and try again
      this.setState({ 
        hasError: false, 
        error: undefined, 
        errorInfo: undefined,
        errorId: ''
      });
      
      toast.success('Retrying game...', { duration: 2000 });
    } else {
      toast.error('Unable to recover. Please refresh the page.', { duration: 5000 });
    }
  };

  private handleGoHome = () => {
    // Preserve any current progress
    const currentProgress = localStorage.getItem('loglings-current-progress');
    if (currentProgress) {
      localStorage.setItem('loglings-recovered-progress', currentProgress);
      toast.info('Your progress has been saved!', { duration: 3000 });
    }
    
    // Reset error state and navigate home
    this.setState({ 
      hasError: false, 
      error: undefined, 
      errorInfo: undefined,
      errorId: ''
    });
    
    // Trigger navigation to home
    window.location.hash = '';
    window.location.reload();
  };

  private handleReportBug = () => {
    const errorReport = {
      errorId: this.state.errorId,
      message: this.state.error?.message,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    // Store bug report
    const reports = JSON.parse(localStorage.getItem('loglings-bug-reports') || '[]');
    reports.push(errorReport);
    localStorage.setItem('loglings-bug-reports', JSON.stringify(reports));
    
    toast.success('Bug report saved! Thank you for helping us improve.', { duration: 3000 });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const canRetry = this.retryCount < this.maxRetries;

      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="max-w-md w-full cozy-card">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-orange-800 dark:text-orange-200">
                Game Hiccup! 🌱
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Don't worry! The Loglings are fixing things. Your progress is safe.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                  <p className="text-xs text-orange-600 font-mono break-all">
                    Error ID: {this.state.errorId}
                  </p>
                  <p className="text-xs text-orange-600 font-mono break-all mt-1">
                    {this.state.error.message}
                  </p>
                </div>
              )}
              
              <div className="flex flex-col gap-2">
                {canRetry && (
                  <Button 
                    onClick={this.handleRetry} 
                    className="w-full logling-button"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again ({this.maxRetries - this.retryCount} attempts left)
                  </Button>
                )}
                
                <Button 
                  onClick={this.handleGoHome} 
                  variant="outline" 
                  className="w-full"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Return to Forest Home
                </Button>
                
                <Button 
                  onClick={this.handleReportBug} 
                  variant="ghost" 
                  size="sm"
                  className="w-full text-xs"
                >
                  <Bug className="w-3 h-3 mr-2" />
                  Report Bug (Error ID: {this.state.errorId.slice(-8)})
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GameErrorBoundary;
