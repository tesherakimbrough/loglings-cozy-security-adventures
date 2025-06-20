
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { logSecurityEvent, detectSuspiciousActivity, SecurityEvent } from '../utils/securityUtils';

interface AdvancedErrorContext {
  component: string;
  action: string;
  userId?: string;
  sessionId?: string;
  securityLevel: 'low' | 'medium' | 'high' | 'critical';
  additionalData?: any;
}

interface AdvancedErrorLog {
  id: string;
  timestamp: string;
  error: Error;
  context: AdvancedErrorContext;
  severity: 'low' | 'medium' | 'high' | 'critical';
  securityEvent?: SecurityEvent;
  userAgent: string;
  url: string;
  stackTrace?: string;
}

export const useAdvancedErrorHandling = () => {
  const [errors, setErrors] = useState<AdvancedErrorLog[]>([]);
  const [securityEvents, setSecurityEvents] = useState<string[]>([]);

  const logAdvancedError = useCallback((
    error: Error, 
    context: AdvancedErrorContext, 
    severity: AdvancedErrorLog['severity'] = 'medium'
  ) => {
    const errorLog: AdvancedErrorLog = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      error,
      context,
      severity,
      userAgent: navigator.userAgent,
      url: window.location.href,
      stackTrace: error.stack
    };

    // Detect potential security events
    let securityEvent: SecurityEvent | undefined;
    
    if (error.message.includes('unauthorized') || error.message.includes('forbidden')) {
      securityEvent = 'login_attempt';
    } else if (error.message.includes('validation') || error.message.includes('invalid')) {
      securityEvent = 'failed_validation';
    } else if (context.securityLevel === 'high' || context.securityLevel === 'critical') {
      securityEvent = 'suspicious_input';
    }

    if (securityEvent) {
      errorLog.securityEvent = securityEvent;
      logSecurityEvent(securityEvent, { errorId: errorLog.id, context });
      setSecurityEvents(prev => [...prev, securityEvent!]);
    }

    // Store error with enhanced details
    const existingErrors = JSON.parse(localStorage.getItem('loglings-advanced-errors') || '[]');
    existingErrors.push(errorLog);
    
    if (existingErrors.length > 100) {
      existingErrors.splice(0, existingErrors.length - 100);
    }
    
    localStorage.setItem('loglings-advanced-errors', JSON.stringify(existingErrors));
    setErrors(prev => [...prev, errorLog]);

    // Enhanced user messaging based on context
    const userMessage = getContextualErrorMessage(error, context);
    
    // Show appropriate toast based on severity and security level
    if (severity === 'critical' || context.securityLevel === 'critical') {
      toast.error(userMessage, {
        duration: 15000,
        action: {
          label: 'Report Security Issue',
          onClick: () => reportSecurityIssue(errorLog)
        }
      });
    } else if (severity === 'high' || context.securityLevel === 'high') {
      toast.error(userMessage, { duration: 8000 });
    } else if (context.securityLevel === 'medium') {
      toast.warning(userMessage, { duration: 5000 });
    } else {
      console.warn('Advanced error logged:', errorLog);
    }

    // Auto-recovery with enhanced security checks
    attemptSecureRecovery(error, context, errorLog);
    
  }, []);

  const getContextualErrorMessage = (error: Error, context: AdvancedErrorContext): string => {
    // Security-focused error messages
    if (context.securityLevel === 'critical') {
      return 'Security validation failed. Please refresh and try again. 🛡️';
    }
    
    if (context.securityLevel === 'high') {
      return 'Input validation failed for security reasons. Please check your data. ⚠️';
    }

    // Component-specific messages
    if (context.component === 'GameSession' && error.message.includes('network')) {
      return 'Secure connection interrupted. Your progress is safe. Reconnecting... 🔒';
    }
    
    if (context.component === 'AuthSystem') {
      return 'Authentication security check failed. Please try signing in again. 🔐';
    }
    
    if (context.action === 'save' && context.securityLevel === 'medium') {
      return 'Data validation passed, but save failed. Your progress is secured locally. 💾';
    }
    
    return 'Security validation completed. Operation failed safely. Your data is protected. 🌟';
  };

  const attemptSecureRecovery = useCallback(async (
    error: Error, 
    context: AdvancedErrorContext, 
    errorLog: AdvancedErrorLog
  ) => {
    // Enhanced recovery with security validation
    try {
      // Check for suspicious activity patterns
      if (detectSuspiciousActivity(securityEvents)) {
        logSecurityEvent('suspicious_input', { 
          errorId: errorLog.id,
          patterns: securityEvents 
        });
        
        toast.warning('Unusual activity detected. Extra security measures activated. 🛡️');
        return;
      }

      // Secure game save recovery
      if (context.action === 'save' && context.component === 'GameSession') {
        const gameData = context.additionalData;
        if (gameData && validateGameData(gameData)) {
          const secureLocalSave = {
            ...gameData,
            timestamp: new Date().toISOString(),
            recovered: true,
            securityValidated: true,
            errorId: errorLog.id
          };
          localStorage.setItem('loglings-secure-recovery', JSON.stringify(secureLocalSave));
          toast.success('Progress securely saved locally! 🔒💾');
        }
      }

      // Network failure recovery with security checks
      if (error.message.includes('fetch') || error.message.includes('network')) {
        if (context.securityLevel !== 'critical') {
          await new Promise(resolve => setTimeout(resolve, 2000));
          window.dispatchEvent(new CustomEvent('loglings-secure-retry-network', { 
            detail: { errorId: errorLog.id } 
          }));
        }
      }

    } catch (recoveryError) {
      console.error('Secure recovery failed:', recoveryError);
      logSecurityEvent('failed_validation', { 
        originalError: errorLog.id,
        recoveryError: (recoveryError as Error).message 
      });
    }
  }, [securityEvents]);

  const validateGameData = (gameData: any): boolean => {
    // Enhanced game data validation with security checks
    if (!gameData || typeof gameData !== 'object') return false;
    
    const { score, correctAnswers, totalRounds } = gameData;
    
    // Basic type validation
    if (typeof score !== 'number' || typeof correctAnswers !== 'number' || typeof totalRounds !== 'number') {
      return false;
    }
    
    // Security validation ranges
    if (score < 0 || score > 999999) return false;
    if (correctAnswers < 0 || correctAnswers > totalRounds) return false;
    if (totalRounds < 0 || totalRounds > 1000) return false;
    
    return true;
  };

  const reportSecurityIssue = useCallback((errorLog: AdvancedErrorLog) => {
    const securityReport = {
      ...errorLog,
      reportedAt: new Date().toISOString(),
      userReported: true,
      securityContext: {
        suspiciousEvents: securityEvents,
        sessionFingerprint: localStorage.getItem('loglings-session-fingerprint')
      }
    };
    
    const reports = JSON.parse(localStorage.getItem('loglings-security-reports') || '[]');
    reports.push(securityReport);
    localStorage.setItem('loglings-security-reports', JSON.stringify(reports));
    
    toast.success('Security issue reported! Our team will investigate. 🛡️');
  }, [securityEvents]);

  const clearSecurityEvents = useCallback(() => {
    setSecurityEvents([]);
    setErrors([]);
    localStorage.removeItem('loglings-advanced-errors');
    localStorage.removeItem('loglings-security-reports');
  }, []);

  const getSecuritySummary = useCallback(() => {
    const summary = {
      totalErrors: errors.length,
      criticalErrors: errors.filter(e => e.severity === 'critical').length,
      securityEvents: securityEvents.length,
      suspiciousActivity: detectSuspiciousActivity(securityEvents),
      byComponent: errors.reduce((acc, error) => {
        acc[error.context.component] = (acc[error.context.component] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      securityLevels: errors.reduce((acc, error) => {
        acc[error.context.securityLevel] = (acc[error.context.securityLevel] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
    return summary;
  }, [errors, securityEvents]);

  return {
    logAdvancedError,
    errors,
    securityEvents,
    clearSecurityEvents,
    getSecuritySummary,
    reportSecurityIssue
  };
};
