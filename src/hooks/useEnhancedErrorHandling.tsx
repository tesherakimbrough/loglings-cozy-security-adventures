import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface ErrorContext {
  component: string;
  action: string;
  userId?: string;
  sessionId?: string;
  additionalData?: any;
}

interface ErrorLog {
  id: string;
  timestamp: string;
  error: Error;
  context: ErrorContext;
  severity: 'low' | 'medium' | 'high' | 'critical';
  userAgent: string;
  url: string;
}

export const useEnhancedErrorHandling = () => {
  const [errors, setErrors] = useState<ErrorLog[]>([]);
  const [isRecovering, setIsRecovering] = useState(false);

  const logError = useCallback((error: Error, context: ErrorContext, severity: ErrorLog['severity'] = 'medium') => {
    const errorLog: ErrorLog = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      error,
      context,
      severity,
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Store error locally
    const existingErrors = JSON.parse(localStorage.getItem('loglings-error-logs') || '[]');
    existingErrors.push(errorLog);
    // Keep only last 50 errors
    if (existingErrors.length > 50) {
      existingErrors.splice(0, existingErrors.length - 50);
    }
    localStorage.setItem('loglings-error-logs', JSON.stringify(existingErrors));

    setErrors(prev => [...prev, errorLog]);

    // Show user-friendly error message
    const userMessage = getUserFriendlyMessage(error, context);
    
    if (severity === 'critical') {
      toast.error(userMessage, {
        duration: 10000,
        action: {
          label: 'Report Issue',
          onClick: () => reportError(errorLog)
        }
      });
    } else if (severity === 'high') {
      toast.error(userMessage);
    } else {
      console.warn('Non-critical error logged:', errorLog);
    }

    // Auto-recovery for known issues
    attemptAutoRecovery(error, context);
    
  }, []);

  const getUserFriendlyMessage = (error: Error, context: ErrorContext): string => {
    if (context.component === 'GameSession' && error.message.includes('network')) {
      return 'Connection hiccup! Your progress is safe. We\'re reconnecting... 🌐';
    }
    
    if (context.component === 'AudioSystem') {
      return 'Audio couldn\'t load, but your adventure continues! 🎵';
    }
    
    if (context.action === 'save') {
      return 'Don\'t worry! We\'re keeping your progress safe locally. 💾';
    }
    
    if (error.message.includes('fetch')) {
      return 'Network seems sleepy. We\'ll try again in a moment! 😴';
    }

    return 'Something unexpected happened, but we\'re on it! Your adventure continues. 🌟';
  };

  const attemptAutoRecovery = useCallback(async (error: Error, context: ErrorContext) => {
    setIsRecovering(true);

    try {
      // Game save failures - use local storage
      if (context.action === 'save' && context.component === 'GameSession') {
        const gameData = context.additionalData;
        if (gameData) {
          const localSave = {
            ...gameData,
            timestamp: new Date().toISOString(),
            recovered: true
          };
          localStorage.setItem('loglings-recovery-save', JSON.stringify(localSave));
          toast.success('Progress saved locally! 💾');
        }
      }

      // Network failures - retry with exponential backoff
      if (error.message.includes('fetch') || error.message.includes('network')) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Trigger a gentle retry mechanism
        window.dispatchEvent(new CustomEvent('loglings-retry-network'));
      }

      // Audio failures - graceful degradation
      if (context.component === 'AudioSystem') {
        localStorage.setItem('loglings-audio-fallback', 'true');
        toast.info('Playing in quiet mode 🔇');
      }

    } catch (recoveryError) {
      console.error('Recovery attempt failed:', recoveryError);
    } finally {
      setIsRecovering(false);
    }
  }, []);

  const reportError = useCallback((errorLog: ErrorLog) => {
    // In a real app, this would send to error tracking service
    const reportData = {
      ...errorLog,
      reportedAt: new Date().toISOString(),
      userReported: true
    };
    
    localStorage.setItem('loglings-reported-errors', 
      JSON.stringify([
        ...JSON.parse(localStorage.getItem('loglings-reported-errors') || '[]'),
        reportData
      ])
    );
    
    toast.success('Thank you for reporting! This helps us improve. 🌱');
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
    localStorage.removeItem('loglings-error-logs');
  }, []);

  const getErrorSummary = useCallback(() => {
    const summary = {
      total: errors.length,
      critical: errors.filter(e => e.severity === 'critical').length,
      high: errors.filter(e => e.severity === 'high').length,
      byComponent: errors.reduce((acc, error) => {
        acc[error.context.component] = (acc[error.context.component] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
    return summary;
  }, [errors]);

  return {
    logError,
    errors,
    isRecovering,
    clearErrors,
    getErrorSummary,
    reportError
  };
};
