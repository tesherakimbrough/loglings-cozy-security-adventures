
import { LogEntry, ThreatLevel } from './logGenerator';

export interface EnhancedLogEntry extends LogEntry {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'authentication' | 'network' | 'malware' | 'data-breach' | 'social-engineering';
  hints?: string[];
  educationalContext?: string;
}

export const generateEnhancedLogEntry = (difficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner'): EnhancedLogEntry => {
  const scenarios = getScenariosByDifficulty(difficulty);
  const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
  
  return {
    ...scenario,
    timestamp: new Date().toISOString(),
    difficulty,
    // Ensure all required properties are present
    sourceIP: scenario.sourceIP || '192.168.1.1',
    eventType: scenario.eventType || 'Unknown Event',
    user: scenario.user || 'unknown@company.com',
    location: scenario.location || 'Unknown Location',
    status: scenario.status || 'UNKNOWN',
    details: scenario.details || 'No details available',
    threatLevel: scenario.threatLevel || 'safe',
    explanation: scenario.explanation || 'No explanation available',
    category: scenario.category
  };
};

const getScenariosByDifficulty = (difficulty: string): EnhancedLogEntry[] => {
  const beginnerScenarios: EnhancedLogEntry[] = [
    {
      sourceIP: '192.168.1.100',
      eventType: 'User Login',
      user: 'alice@company.com',
      location: 'Office Network',
      status: 'SUCCESS',
      details: 'User Alice logged in successfully from her usual workstation during business hours.',
      threatLevel: 'safe' as ThreatLevel,
      explanation: 'This is a normal login - same user, same location, during work hours. The Loglings feel peaceful! 🌸',
      category: 'authentication',
      difficulty: 'beginner',
      timestamp: new Date().toISOString(),
      hints: ['Check the time and location', 'Is this the user\'s normal pattern?'],
      educationalContext: 'Normal authentication logs show expected user behavior patterns.'
    },
    {
      sourceIP: '203.0.113.45',
      eventType: 'Login Attempt',
      user: 'admin@company.com',
      location: 'Unknown Country',
      status: 'FAILED',
      details: 'Multiple failed login attempts for admin account from an unfamiliar international IP address.',
      threatLevel: 'critical' as ThreatLevel,
      explanation: 'Someone is trying to break into the admin account from far away! Sage the Alert Logling needs your help! 🚨',
      category: 'authentication',
      difficulty: 'beginner',
      timestamp: new Date().toISOString(),
      hints: ['Check the IP location', 'How many attempts were made?'],
      educationalContext: 'Multiple failed logins from unusual locations indicate potential brute force attacks.'
    }
  ];

  const intermediateScenarios: EnhancedLogEntry[] = [
    {
      sourceIP: '10.0.0.15',
      eventType: 'File Access',
      user: 'bob@company.com',
      location: 'Internal Network',
      status: 'SUCCESS',
      details: 'User Bob accessed sensitive customer database files outside of normal business hours.',
      threatLevel: 'warning' as ThreatLevel,
      explanation: 'Bob is accessing important files at an unusual time. Luna the Curious Logling wonders why! 🤔',
      category: 'data-breach',
      difficulty: 'intermediate',
      timestamp: new Date().toISOString(),
      hints: ['Consider the timing', 'What type of files were accessed?'],
      educationalContext: 'Unusual access patterns to sensitive data require investigation even from authorized users.'
    }
  ];

  const advancedScenarios: EnhancedLogEntry[] = [
    {
      sourceIP: '172.16.0.8',
      eventType: 'Network Traffic',
      user: 'system',
      location: 'DMZ Server',
      status: 'ANOMALY',
      details: 'Unusual outbound traffic pattern detected: 500MB encrypted data transfer to external server during maintenance window.',
      threatLevel: 'warning' as ThreatLevel,
      explanation: 'Something is sending a lot of data outside during maintenance. Luna thinks this needs investigation! 🕵️',
      category: 'network',
      difficulty: 'advanced',
      timestamp: new Date().toISOString(),
      hints: ['Consider the timing and volume', 'Is this normal for maintenance?'],
      educationalContext: 'Data exfiltration often happens during maintenance windows when monitoring may be relaxed.'
    }
  ];

  switch (difficulty) {
    case 'beginner': return beginnerScenarios;
    case 'intermediate': return [...beginnerScenarios, ...intermediateScenarios];
    case 'advanced': return [...beginnerScenarios, ...intermediateScenarios, ...advancedScenarios];
    default: return beginnerScenarios;
  }
};

export const getDifficultyRecommendation = (accuracy: number, sessionCount: number): 'beginner' | 'intermediate' | 'advanced' => {
  if (sessionCount < 5) return 'beginner';
  if (accuracy >= 80 && sessionCount >= 10) return 'advanced';
  if (accuracy >= 65) return 'intermediate';
  return 'beginner';
};
