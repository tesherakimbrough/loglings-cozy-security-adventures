import { ThreatLevel } from './logGenerator';

interface LogEntry {
  timestamp: string;
  sourceIP: string;
  eventType: string;
  user: string;
  location: string;
  status: string;
  details: string;
  threatLevel: ThreatLevel;
  explanation: string;
  category?: string;
  difficulty?: string;
  learningTip?: string;
}

const scenarioTemplates: LogEntry[] = [
  {
    timestamp: '2024-04-01T14:30:00Z',
    sourceIP: '192.168.1.100',
    eventType: 'login_attempt',
    user: 'sarah.johnson',
    location: 'office',
    status: 'success',
    details: 'Normal login during business hours',
    threatLevel: 'safe',
    explanation: 'This appears to be a normal login attempt during regular business hours.',
    category: 'authentication',
    difficulty: 'beginner',
    learningTip: 'Always verify the time and location of login attempts.'
  },
  {
    timestamp: '2024-04-01T03:15:00Z',
    sourceIP: '203.0.113.45',
    eventType: 'login_attempt',
    user: 'mike.chen',
    location: 'unknown',
    status: 'failure',
    details: 'Failed login attempt from unusual location outside business hours',
    threatLevel: 'warning',
    explanation: 'The failed login from an unusual location warrants further investigation.',
    category: 'authentication',
    difficulty: 'intermediate',
    learningTip: 'Implement multi-factor authentication to mitigate risks from compromised passwords.'
  },
  {
    timestamp: '2024-04-01T18:45:00Z',
    sourceIP: '10.0.0.50',
    eventType: 'file_access',
    user: 'alex.rodriguez',
    location: 'home',
    status: 'success',
    details: 'User accessed sensitive financial documents remotely',
    threatLevel: 'warning',
    explanation: 'Accessing sensitive documents remotely should be monitored for anomalies.',
    category: 'data_access',
    difficulty: 'intermediate',
    learningTip: 'Ensure sensitive data is encrypted both in transit and at rest.'
  },
  {
    timestamp: '2024-04-01T22:00:00Z',
    sourceIP: '172.16.0.200',
    eventType: 'system_update',
    user: 'system',
    location: 'datacenter',
    status: 'failure',
    details: 'Attempt to install unauthorized software',
    threatLevel: 'critical',
    explanation: 'Unauthorized software installation attempts are a serious security breach.',
    category: 'system_integrity',
    difficulty: 'advanced',
    learningTip: 'Regularly audit system logs for unauthorized software installations.'
  },
  {
    timestamp: '2024-04-02T09:00:00Z',
    sourceIP: '198.51.100.33',
    eventType: 'email_received',
    user: 'emma.davis',
    location: 'office',
    status: 'success',
    details: 'User received a phishing email with a malicious link',
    threatLevel: 'warning',
    explanation: 'Phishing emails can lead to malware infections or credential theft.',
    category: 'phishing',
    difficulty: 'intermediate',
    learningTip: 'Train users to identify and report phishing emails.'
  },
  {
    timestamp: '2024-04-02T11:30:00Z',
    sourceIP: '192.0.2.146',
    eventType: 'network_scan',
    user: 'unknown',
    location: 'internet',
    status: 'detected',
    details: 'External network scan detected targeting internal servers',
    threatLevel: 'critical',
    explanation: 'Network scans are often precursors to more serious attacks.',
    category: 'network_security',
    difficulty: 'advanced',
    learningTip: 'Implement intrusion detection and prevention systems to block malicious traffic.'
  },
  {
    timestamp: '2024-04-02T15:45:00Z',
    sourceIP: '10.10.10.10',
    eventType: 'login_attempt',
    user: 'john.smith',
    location: 'office',
    status: 'success',
    details: 'Successful login after multiple failed attempts',
    threatLevel: 'warning',
    explanation: 'Multiple failed login attempts followed by a successful one may indicate a brute-force attack.',
    category: 'authentication',
    difficulty: 'intermediate',
    learningTip: 'Implement account lockout policies to prevent brute-force attacks.'
  },
  {
    timestamp: '2024-04-02T17:00:00Z',
    sourceIP: '172.20.0.5',
    eventType: 'data_exfiltration',
    user: 'lisa.wang',
    location: 'home',
    status: 'detected',
    details: 'Large amount of data being transferred to an external drive',
    threatLevel: 'critical',
    explanation: 'Unusual data transfers to external devices can indicate data theft.',
    category: 'data_loss_prevention',
    difficulty: 'advanced',
    learningTip: 'Monitor and control data transfers to prevent data exfiltration.'
  },
  {
    timestamp: '2024-04-03T08:00:00Z',
    sourceIP: '192.168.1.105',
    eventType: 'application_error',
    user: 'david.brown',
    location: 'office',
    status: 'failure',
    details: 'Critical application crashed due to a memory leak',
    threatLevel: 'warning',
    explanation: 'Application crashes can lead to data loss and system instability.',
    category: 'system_integrity',
    difficulty: 'intermediate',
    learningTip: 'Regularly patch and update applications to prevent vulnerabilities.'
  },
  {
    timestamp: '2024-04-03T10:30:00Z',
    sourceIP: '203.0.113.50',
    eventType: 'malware_detected',
    user: 'anna.garcia',
    location: 'internet',
    status: 'blocked',
    details: 'Malware detected in an incoming email attachment',
    threatLevel: 'critical',
    explanation: 'Malware infections can compromise entire systems and networks.',
    category: 'malware_detection',
    difficulty: 'advanced',
    learningTip: 'Use anti-malware software and regularly scan systems for infections.'
  },
  {
    timestamp: '2024-04-03T14:00:00Z',
    sourceIP: '10.0.0.55',
    eventType: 'unauthorized_access',
    user: 'guest',
    location: 'datacenter',
    status: 'failure',
    details: 'Unauthorized access attempt to a restricted server',
    threatLevel: 'critical',
    explanation: 'Unauthorized access attempts should be immediately investigated.',
    category: 'access_control',
    difficulty: 'advanced',
    learningTip: 'Implement strong access control policies and regularly audit user permissions.'
  },
  {
    timestamp: '2024-04-03T16:45:00Z',
    sourceIP: '172.16.0.205',
    eventType: 'suspicious_activity',
    user: 'sarah.johnson',
    location: 'home',
    status: 'detected',
    details: 'User account exhibiting unusual behavior patterns',
    threatLevel: 'warning',
    explanation: 'Unusual user behavior can indicate a compromised account.',
    category: 'anomaly_detection',
    difficulty: 'intermediate',
    learningTip: 'Use machine learning algorithms to detect anomalous user behavior.'
  },
  {
    timestamp: '2024-04-04T09:30:00Z',
    sourceIP: '198.51.100.38',
    eventType: 'denial_of_service',
    user: 'system',
    location: 'internet',
    status: 'ongoing',
    details: 'Denial-of-service attack targeting the company website',
    threatLevel: 'critical',
    explanation: 'Denial-of-service attacks can disrupt critical business operations.',
    category: 'network_security',
    difficulty: 'advanced',
    learningTip: 'Use content delivery networks (CDNs) and DDoS mitigation services to protect against attacks.'
  },
  {
    timestamp: '2024-04-04T11:00:00Z',
    sourceIP: '192.0.2.151',
    eventType: 'vulnerability_scan',
    user: 'unknown',
    location: 'internet',
    status: 'detected',
    details: 'External vulnerability scan detected targeting web applications',
    threatLevel: 'warning',
    explanation: 'Vulnerability scans can identify weaknesses in web applications.',
    category: 'vulnerability_management',
    difficulty: 'intermediate',
    learningTip: 'Regularly scan web applications for vulnerabilities and apply patches promptly.'
  },
  {
    timestamp: '2024-04-04T14:15:00Z',
    sourceIP: '10.10.10.15',
    eventType: 'password_reset',
    user: 'mike.chen',
    location: 'office',
    status: 'success',
    details: 'User initiated a password reset request',
    threatLevel: 'safe',
    explanation: 'Password reset requests are normal but should be monitored for suspicious patterns.',
    category: 'authentication',
    difficulty: 'beginner',
    learningTip: 'Implement strong password policies and multi-factor authentication.'
  },
  {
    timestamp: '2024-04-04T17:30:00Z',
    sourceIP: '172.20.0.10',
    eventType: 'data_backup',
    user: 'system',
    location: 'datacenter',
    status: 'success',
    details: 'Successful completion of the daily data backup',
    threatLevel: 'safe',
    explanation: 'Regular data backups are essential for disaster recovery.',
    category: 'data_loss_prevention',
    difficulty: 'beginner',
    learningTip: 'Regularly test data backups to ensure they can be restored successfully.'
  }
];

export const generateExpandedScenario = (difficulty: string = 'beginner') => {
  const availableScenarios = scenarioTemplates.filter(template => 
    !template.difficulty || template.difficulty === difficulty || difficulty === 'mixed'
  );
  
  const template = availableScenarios[Math.floor(Math.random() * availableScenarios.length)];
  
  const variations = {
    sourceIP: generateRandomIP(),
    user: generateRandomUser(),
    timestamp: generateRecentTimestamp(),
    location: generateRandomLocation()
  };
  
  return {
    ...template,
    sourceIP: variations.sourceIP,
    user: variations.user,
    timestamp: variations.timestamp,
    location: variations.location,
    details: template.details.replace(/\{(\w+)\}/g, (match, key) => variations[key] || match)
  };
};

const generateRandomIP = () => {
  const ips = [
    '192.168.1.100', '10.0.0.50', '172.16.0.200', '203.0.113.45',
    '198.51.100.33', '192.0.2.146', '10.10.10.10', '172.20.0.5'
  ];
  return ips[Math.floor(Math.random() * ips.length)];
};

const generateRandomUser = () => {
  const users = [
    'sarah.johnson', 'mike.chen', 'alex.rodriguez', 'emma.davis',
    'john.smith', 'lisa.wang', 'david.brown', 'anna.garcia'
  ];
  return users[Math.floor(Math.random() * users.length)];
};

const generateRecentTimestamp = () => {
  const now = new Date();
  const randomHours = Math.floor(Math.random() * 24);
  const randomMinutes = Math.floor(Math.random() * 60);
  now.setHours(now.getHours() - randomHours);
  now.setMinutes(randomMinutes);
  return now.toISOString();
};

const generateRandomLocation = () => {
  const locations = [
    'office', 'home', 'coffee_shop', 'airport', 'hotel',
    'coworking_space', 'library', 'mobile'
  ];
  return locations[Math.floor(Math.random() * locations.length)];
};
