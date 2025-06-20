import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import { generateSessionFingerprint, logSecurityEvent } from '../utils/securityUtils';
import { toast } from 'sonner';

interface SessionSecurityConfig {
  timeoutMinutes: number;
  warningMinutes: number;
  maxConcurrentSessions: number;
  enableDeviceTracking: boolean;
}

const defaultConfig: SessionSecurityConfig = {
  timeoutMinutes: 60,
  warningMinutes: 5,
  maxConcurrentSessions: 3,
  enableDeviceTracking: true
};

export const useSessionSecurity = (config: Partial<SessionSecurityConfig> = {}) => {
  const { user, signOut } = useAuth();
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
  const [sessionFingerprint] = useState(generateSessionFingerprint);
  
  const finalConfig = { ...defaultConfig, ...config };

  // Update last activity on user interaction
  const updateActivity = useCallback(() => {
    setLastActivity(Date.now());
    setShowTimeoutWarning(false);
  }, []);

  // Check for session timeout
  useEffect(() => {
    if (!user) return;

    const checkTimeout = () => {
      const now = Date.now();
      const timeSinceActivity = now - lastActivity;
      const timeoutMs = finalConfig.timeoutMinutes * 60 * 1000;
      const warningMs = finalConfig.warningMinutes * 60 * 1000;

      if (timeSinceActivity >= timeoutMs) {
        logSecurityEvent('session_timeout', { 
          timeSinceActivity: timeSinceActivity / 1000,
          userId: user.id 
        });
        toast.error('Session expired for security. Please sign in again.');
        signOut();
      } else if (timeSinceActivity >= timeoutMs - warningMs && !showTimeoutWarning) {
        setShowTimeoutWarning(true);
        toast.warning(`Session will expire in ${finalConfig.warningMinutes} minutes due to inactivity.`, {
          duration: 10000,
          action: {
            label: 'Stay Active',
            onClick: updateActivity
          }
        });
      }
    };

    const interval = setInterval(checkTimeout, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [user, lastActivity, finalConfig, showTimeoutWarning, signOut, updateActivity]);

  // Track user activity
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
    };
  }, [updateActivity]);

  // Device tracking and concurrent session detection
  useEffect(() => {
    if (!user || !finalConfig.enableDeviceTracking) return;

    const checkConcurrentSessions = () => {
      const sessionKey = `loglings-session-${user.id}`;
      const sessions = JSON.parse(localStorage.getItem(sessionKey) || '[]');
      
      // Clean up old sessions (older than 24 hours)
      const validSessions = sessions.filter((session: any) => 
        Date.now() - session.timestamp < 24 * 60 * 60 * 1000
      );

      // Check if current session fingerprint exists
      const currentSession = validSessions.find((s: any) => s.fingerprint === sessionFingerprint);
      
      if (!currentSession) {
        validSessions.push({
          fingerprint: sessionFingerprint,
          timestamp: Date.now(),
          userAgent: navigator.userAgent
        });
      } else {
        currentSession.timestamp = Date.now();
      }

      if (validSessions.length > finalConfig.maxConcurrentSessions) {
        logSecurityEvent('concurrent_session_detected', { 
          sessionCount: validSessions.length,
          maxAllowed: finalConfig.maxConcurrentSessions 
        });
        
        toast.warning('Multiple active sessions detected. For security, older sessions will be terminated.');
        
        // Keep only the most recent sessions
        validSessions.sort((a: any, b: any) => b.timestamp - a.timestamp);
        validSessions.splice(finalConfig.maxConcurrentSessions);
      }

      localStorage.setItem(sessionKey, JSON.stringify(validSessions));
    };

    checkConcurrentSessions();
    const interval = setInterval(checkConcurrentSessions, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [user, sessionFingerprint, finalConfig]);

  return {
    lastActivity,
    showTimeoutWarning,
    sessionFingerprint,
    updateActivity,
    getRemainingTime: () => {
      const timeoutMs = finalConfig.timeoutMinutes * 60 * 1000;
      return Math.max(0, timeoutMs - (Date.now() - lastActivity));
    }
  };
};
