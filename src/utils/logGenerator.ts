
export type ThreatLevel = 'safe' | 'warning' | 'critical';

export interface LogEntry {
  timestamp: string;
  sourceIP: string;
  eventType: string;
  user: string;
  location: string;
  status: string;
  details: string;
  threatLevel: ThreatLevel;
  explanation: string;
}

const safeEvents = [
  {
    eventType: 'Login',
    user: 'john.doe@company.com',
    sourceIP: '192.168.1.100',
    location: 'New York, US',
    status: 'SUCCESS',
    details: 'Standard workday login from corporate office',
    explanation: 'Normal login activity during business hours from a known corporate IP address.'
  },
  {
    eventType: 'File Access',
    user: 'sarah.wilson@company.com',
    sourceIP: '10.0.1.45',
    location: 'Chicago, US',
    status: 'SUCCESS',
    details: 'Accessed quarterly report from shared drive',
    explanation: 'Legitimate file access from internal network during business hours.'
  },
  {
    eventType: 'Email Send',
    user: 'marketing@company.com',
    sourceIP: '172.16.2.30',
    location: 'Seattle, US',
    status: 'SUCCESS',
    details: 'Newsletter sent to subscriber list',
    explanation: 'Authorized email marketing activity from the marketing department.'
  }
];

const warningEvents = [
  {
    eventType: 'Login',
    user: 'admin@company.com',
    sourceIP: '203.45.123.67',
    location: 'London, UK',
    status: 'SUCCESS',
    details: 'Admin login from unusual geographic location',
    explanation: 'Admin access from unexpected location - monitor for additional suspicious activity.'
  },
  {
    eventType: 'Failed Login',
    user: 'finance@company.com',
    sourceIP: '198.51.100.42',
    location: 'Unknown',
    status: 'FAILED',
    details: '3 consecutive failed login attempts',
    explanation: 'Multiple failed login attempts could indicate a brute force attack in progress.'
  },
  {
    eventType: 'Database Access',
    user: 'temp.contractor@company.com',
    sourceIP: '192.168.5.200',
    location: 'Remote',
    status: 'SUCCESS',
    details: 'Accessed customer database outside business hours',
    explanation: 'Unusual database access by temporary user after hours warrants investigation.'
  }
];

const criticalEvents = [
  {
    eventType: 'Login',
    user: 'ceo@company.com',
    sourceIP: '185.220.101.42',
    location: 'Moscow, Russia',
    status: 'SUCCESS',
    details: 'Executive account accessed from known malicious IP range',
    explanation: 'CRITICAL: Executive account compromised from known threat actor IP address. Immediate response required!'
  },
  {
    eventType: 'Data Export',
    user: 'intern@company.com',
    sourceIP: '167.94.138.15',
    location: 'Unknown',
    status: 'SUCCESS',
    details: 'Downloaded entire customer database (500MB)',
    explanation: 'CRITICAL: Unauthorized mass data exfiltration by low-privilege user. Potential data breach in progress!'
  },
  {
    eventType: 'System Command',
    user: 'maintenance@company.com',
    sourceIP: '192.168.1.50',
    location: 'Internal',
    status: 'SUCCESS',
    details: 'Executed PowerShell script to disable security monitoring',
    explanation: 'CRITICAL: Security controls being disabled. This indicates advanced persistent threat activity!'
  }
];

const generateTimestamp = (): string => {
  const now = new Date();
  const offset = Math.floor(Math.random() * 24 * 60 * 60 * 1000); // Random time within last 24 hours
  const timestamp = new Date(now.getTime() - offset);
  return timestamp.toISOString().replace('T', ' ').substring(0, 19);
};

export const generateLogEntry = (): LogEntry => {
  const rand = Math.random();
  let events: typeof safeEvents;
  let threatLevel: ThreatLevel;

  // 40% safe, 35% warning, 25% critical
  if (rand < 0.4) {
    events = safeEvents;
    threatLevel = 'safe';
  } else if (rand < 0.75) {
    events = warningEvents;
    threatLevel = 'warning';
  } else {
    events = criticalEvents;
    threatLevel = 'critical';
  }

  const event = events[Math.floor(Math.random() * events.length)];

  return {
    timestamp: generateTimestamp(),
    sourceIP: event.sourceIP,
    eventType: event.eventType,
    user: event.user,
    location: event.location,
    status: event.status,
    details: event.details,
    threatLevel,
    explanation: event.explanation
  };
};
