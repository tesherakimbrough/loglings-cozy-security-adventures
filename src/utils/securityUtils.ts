// Comprehensive security utilities for input sanitization and validation

// HTML entity encoding to prevent XSS
export const sanitizeHtml = (input: string): string => {
  const entityMap: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };
  
  return String(input).replace(/[&<>"'`=\/]/g, (s) => entityMap[s]);
};

// Content filtering for potentially malicious patterns
export const containsMaliciousContent = (input: string): boolean => {
  const maliciousPatterns = [
    /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
    /<iframe[\s\S]*?>/gi,
    /<object[\s\S]*?>/gi,
    /<embed[\s\S]*?>/gi,
    /eval\s*\(/gi,
    /expression\s*\(/gi
  ];
  
  return maliciousPatterns.some(pattern => pattern.test(input));
};

// Enhanced input validation with length limits
export const validateTextInput = (
  input: string, 
  minLength: number = 0, 
  maxLength: number = 1000,
  allowHtml: boolean = false
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (input.length < minLength) {
    errors.push(`Input must be at least ${minLength} characters long`);
  }
  
  if (input.length > maxLength) {
    errors.push(`Input must be less than ${maxLength} characters`);
  }
  
  if (!allowHtml && containsMaliciousContent(input)) {
    errors.push('Input contains potentially unsafe content');
  }
  
  return { isValid: errors.length === 0, errors };
};

// Rate limiting utility
class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();
  
  isAllowed(key: string, maxAttempts: number = 5, windowMs: number = 300000): boolean {
    const now = Date.now();
    const attempt = this.attempts.get(key);
    
    if (!attempt || now > attempt.resetTime) {
      this.attempts.set(key, { count: 1, resetTime: now + windowMs });
      return true;
    }
    
    if (attempt.count >= maxAttempts) {
      return false;
    }
    
    attempt.count++;
    return true;
  }
  
  getRemainingTime(key: string): number {
    const attempt = this.attempts.get(key);
    if (!attempt) return 0;
    return Math.max(0, attempt.resetTime - Date.now());
  }
}

export const rateLimiter = new RateLimiter();

// Session security utilities
export const generateSessionFingerprint = (): string => {
  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset().toString()
  ];
  
  return btoa(components.join('|')).slice(0, 16);
};

// Detect suspicious activity patterns
export const detectSuspiciousActivity = (events: string[]): boolean => {
  const suspiciousPatterns = [
    'rapid_login_attempts',
    'multiple_failed_validations',
    'unusual_input_patterns',
    'session_hijack_attempt'
  ];
  
  return events.some(event => suspiciousPatterns.includes(event));
};

// Security event types
export type SecurityEvent = 
  | 'login_attempt'
  | 'failed_validation'
  | 'suspicious_input'
  | 'rate_limit_exceeded'
  | 'session_timeout'
  | 'concurrent_session_detected';

// Security logger
export const logSecurityEvent = (event: SecurityEvent, details: any = {}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    details,
    fingerprint: generateSessionFingerprint(),
    url: window.location.href
  };
  
  // Store in localStorage for now (in production, send to security service)
  const existingLogs = JSON.parse(localStorage.getItem('loglings-security-logs') || '[]');
  existingLogs.push(logEntry);
  
  // Keep only last 100 security events
  if (existingLogs.length > 100) {
    existingLogs.splice(0, existingLogs.length - 100);
  }
  
  localStorage.setItem('loglings-security-logs', JSON.stringify(existingLogs));
  
  // Console log for development
  console.warn('Security Event:', logEntry);
};

// Data integrity validation for game scores
export const validateGameScore = (score: number, correctAnswers: number, totalRounds: number): boolean => {
  // Basic sanity checks for game data integrity
  if (score < 0 || correctAnswers < 0 || totalRounds < 0) return false;
  if (correctAnswers > totalRounds) return false;
  if (totalRounds > 1000) return false; // Reasonable upper limit
  
  // Score should be reasonable based on correct answers
  const maxPossibleScore = totalRounds * 100; // Assuming max 100 points per round
  if (score > maxPossibleScore) return false;
  
  return true;
};
