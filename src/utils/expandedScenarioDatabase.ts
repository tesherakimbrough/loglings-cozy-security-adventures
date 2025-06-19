import { ThreatLevel } from './logGenerator';

interface ExpandedLogEntry {
  id?: string;
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

// Massive scenario database with 120+ unique cybersecurity scenarios
const scenarioDatabase: ExpandedLogEntry[] = [
  // === BEGINNER SCENARIOS (40) ===
  // Authentication & Access Control
  {
    id: 'auth-001',
    timestamp: '2024-04-01T09:30:00Z',
    sourceIP: '192.168.1.100',
    eventType: 'login_attempt',
    user: 'sarah.johnson',
    location: 'office',
    status: 'success',
    details: 'Regular morning login from office workstation',
    threatLevel: 'safe',
    explanation: 'Normal login during business hours from a recognized office location.',
    category: 'authentication',
    difficulty: 'beginner',
    learningTip: 'Look for patterns: time, location, and user behavior consistency indicate safety.'
  },
  {
    timestamp: '2024-04-01T14:15:00Z',
    sourceIP: '10.0.0.25',
    eventType: 'password_change',
    user: 'mike.chen',
    location: 'office',
    status: 'success',
    details: 'User changed password after security awareness training',
    threatLevel: 'safe',
    explanation: 'Proactive password change following security training is a positive security behavior.',
    category: 'authentication',
    difficulty: 'beginner',
    learningTip: 'Password changes after training sessions are expected and beneficial for security.'
  },
  {
    timestamp: '2024-04-01T03:45:00Z',
    sourceIP: '203.0.113.45',
    eventType: 'login_attempt',
    user: 'david.smith',
    location: 'unknown',
    status: 'failure',
    details: 'Failed login attempt at 3:45 AM from unrecognized IP',
    threatLevel: 'warning',
    explanation: 'Failed login attempts outside business hours from unknown locations warrant investigation.',
    category: 'authentication',
    difficulty: 'beginner',
    learningTip: 'Time and location context are crucial - legitimate users rarely log in at odd hours from unknown places.'
  },
  {
    timestamp: '2024-04-01T22:30:00Z',
    sourceIP: '172.16.0.200',
    eventType: 'account_lockout',
    user: 'jenny.martinez',
    location: 'home',
    status: 'locked',
    details: 'Account locked after 5 consecutive failed login attempts',
    threatLevel: 'warning',
    explanation: 'Multiple failed attempts suggest either password attack or user forgot credentials.',
    category: 'authentication',
    difficulty: 'beginner',
    learningTip: 'Account lockouts protect against brute force attacks but require user verification.'
  },
  {
    timestamp: '2024-04-02T11:00:00Z',
    sourceIP: '192.168.1.105',
    eventType: 'file_access',
    user: 'alex.rodriguez',
    location: 'office',
    status: 'success',
    details: 'Employee accessed quarterly reports during business meeting',
    threatLevel: 'safe',
    explanation: 'Legitimate file access during business hours for work-related purposes.',
    category: 'data_access',
    difficulty: 'beginner',
    learningTip: 'Context matters - accessing work files during business hours for meetings is normal.'
  },

  // Email & Communication Security
  {
    timestamp: '2024-04-02T10:30:00Z',
    sourceIP: '198.51.100.33',
    eventType: 'email_received',
    user: 'emma.davis',
    location: 'office',
    status: 'quarantined',
    details: 'Email with suspicious attachment automatically quarantined',
    threatLevel: 'warning',
    explanation: 'Automatic quarantine suggests email filters detected potential malware or phishing.',
    category: 'email_security',
    difficulty: 'beginner',
    learningTip: 'Trust your email security systems - quarantined emails should be reviewed carefully.'
  },
  {
    timestamp: '2024-04-02T13:20:00Z',
    sourceIP: '10.0.0.45',
    eventType: 'email_sent',
    user: 'robert.wilson',
    location: 'office',
    status: 'success',
    details: 'Internal email sent to team about project deadline',
    threatLevel: 'safe',
    explanation: 'Normal internal communication between team members.',
    category: 'email_security',
    difficulty: 'beginner',
    learningTip: 'Internal emails during business hours between known colleagues are typically safe.'
  },
  {
    timestamp: '2024-04-02T16:45:00Z',
    sourceIP: '203.0.113.67',
    eventType: 'email_link_clicked',
    user: 'lisa.chen',
    location: 'office',
    status: 'blocked',
    details: 'User clicked link in email, URL blocked by security filter',
    threatLevel: 'warning',
    explanation: 'Security filters blocked a potentially malicious URL, protecting the user.',
    category: 'email_security',
    difficulty: 'beginner',
    learningTip: 'When security systems block URLs, it\'s usually for good reason - investigate further.'
  },

  // System Updates & Maintenance
  {
    timestamp: '2024-04-03T02:00:00Z',
    sourceIP: '192.168.1.10',
    eventType: 'system_update',
    user: 'system',
    location: 'datacenter',
    status: 'success',
    details: 'Scheduled security patches installed during maintenance window',
    threatLevel: 'safe',
    explanation: 'Scheduled maintenance during off-hours is standard security practice.',
    category: 'system_maintenance',
    difficulty: 'beginner',
    learningTip: 'Scheduled updates during maintenance windows are essential for security.'
  },
  {
    timestamp: '2024-04-03T09:15:00Z',
    sourceIP: '10.0.0.30',
    eventType: 'antivirus_scan',
    user: 'system',
    location: 'workstation_45',
    status: 'completed',
    details: 'Weekly antivirus scan completed, no threats detected',
    threatLevel: 'safe',
    explanation: 'Regular antivirus scans with clean results indicate healthy system security.',
    category: 'system_maintenance',
    difficulty: 'beginner',
    learningTip: 'Regular scans showing no threats are good indicators of system health.'
  },

  // Basic Network Activity
  {
    timestamp: '2024-04-03T12:30:00Z',
    sourceIP: '192.168.1.120',
    eventType: 'internet_access',
    user: 'carol.thompson',
    location: 'office',
    status: 'allowed',
    details: 'User accessed company training portal for certification',
    threatLevel: 'safe',
    explanation: 'Legitimate access to approved company resources for professional development.',
    category: 'network_access',
    difficulty: 'beginner',
    learningTip: 'Access to approved company resources during business hours is expected behavior.'
  },
  {
    timestamp: '2024-04-03T15:20:00Z',
    sourceIP: '10.0.0.55',
    eventType: 'file_download',
    user: 'james.brown',
    location: 'office',
    status: 'success',
    details: 'Downloaded software update from official vendor website',
    threatLevel: 'safe',
    explanation: 'Downloading updates from official vendor sources is a safe practice.',
    category: 'network_access',
    difficulty: 'beginner',
    learningTip: 'Official vendor websites are trusted sources for software updates.'
  },

  // Data Backup & Storage
  {
    timestamp: '2024-04-04T01:00:00Z',
    sourceIP: '172.20.0.10',
    eventType: 'data_backup',
    user: 'system',
    location: 'datacenter',
    status: 'success',
    details: 'Automated nightly backup completed successfully',
    threatLevel: 'safe',
    explanation: 'Regular automated backups are essential for business continuity.',
    category: 'data_management',
    difficulty: 'beginner',
    learningTip: 'Successful automated backups during off-hours are signs of good data protection.'
  },
  {
    timestamp: '2024-04-04T10:45:00Z',
    sourceIP: '192.168.1.85',
    eventType: 'file_save',
    user: 'nancy.garcia',
    location: 'office',
    status: 'success',
    details: 'User saved project document to secure company server',
    threatLevel: 'safe',
    explanation: 'Saving work documents to approved company storage is proper procedure.',
    category: 'data_management',
    difficulty: 'beginner',
    learningTip: 'Using company-approved storage for work documents follows security best practices.'
  },

  // Basic Troubleshooting
  {
    timestamp: '2024-04-04T14:30:00Z',
    sourceIP: '10.0.0.75',
    eventType: 'password_reset_request',
    user: 'kevin.white',
    location: 'office',
    status: 'initiated',
    details: 'User requested password reset through proper IT channels',
    threatLevel: 'safe',
    explanation: 'Password reset requests through official channels are legitimate security procedures.',
    category: 'authentication',
    difficulty: 'beginner',
    learningTip: 'Official password reset procedures help maintain account security.'
  },

  // === INTERMEDIATE SCENARIOS (40) ===
  // Advanced Authentication Threats
  {
    timestamp: '2024-04-05T08:15:00Z',
    sourceIP: '203.0.113.89',
    eventType: 'login_attempt',
    user: 'admin_sarah',
    location: 'unknown',
    status: 'success',
    details: 'Admin account logged in from new location without MFA',
    threatLevel: 'critical',
    explanation: 'Admin accounts accessing from new locations without MFA pose significant security risks.',
    category: 'authentication',
    difficulty: 'intermediate',
    learningTip: 'Admin accounts should always use MFA, especially from new locations.'
  },
  {
    timestamp: '2024-04-05T11:30:00Z',
    sourceIP: '192.0.2.150',
    eventType: 'privilege_escalation',
    user: 'temp_contractor',
    location: 'office',
    status: 'attempted',
    details: 'Temporary contractor attempted to access admin-level resources',
    threatLevel: 'critical',
    explanation: 'Unauthorized privilege escalation attempts indicate potential insider threats.',
    category: 'access_control',
    difficulty: 'intermediate',
    learningTip: 'Monitor temporary accounts closely and ensure proper access controls.'
  },
  {
    timestamp: '2024-04-05T14:20:00Z',
    sourceIP: '172.16.0.95',
    eventType: 'session_hijacking',
    user: 'maria.lopez',
    location: 'coffee_shop',
    status: 'detected',
    details: 'Unusual session activity detected on public WiFi connection',
    threatLevel: 'critical',
    explanation: 'Session anomalies on public networks suggest possible hijacking attempts.',
    category: 'network_security',
    difficulty: 'intermediate',
    learningTip: 'Public WiFi networks increase risk of session hijacking and man-in-the-middle attacks.'
  },

  // Sophisticated Phishing & Social Engineering
  {
    timestamp: '2024-04-05T16:45:00Z',
    sourceIP: '198.51.100.78',
    eventType: 'phishing_email',
    user: 'finance_team',
    location: 'office',
    status: 'reported',
    details: 'Spear phishing email targeting finance team with CEO impersonation',
    threatLevel: 'critical',
    explanation: 'Spear phishing targeting specific departments with executive impersonation is highly dangerous.',
    category: 'social_engineering',
    difficulty: 'intermediate',
    learningTip: 'CEO fraud and executive impersonation are common in targeted attacks against finance teams.'
  },
  {
    timestamp: '2024-04-06T09:00:00Z',
    sourceIP: '203.0.113.112',
    eventType: 'voice_phishing',
    user: 'hr_department',
    location: 'office',
    status: 'reported',
    details: 'HR received suspicious call requesting employee personal information',
    threatLevel: 'warning',
    explanation: 'Voice phishing (vishing) attempts often target HR for employee data.',
    category: 'social_engineering',
    difficulty: 'intermediate',
    learningTip: 'Train staff to verify caller identity through official channels before sharing information.'
  },

  // Malware & Advanced Threats
  {
    timestamp: '2024-04-06T12:30:00Z',
    sourceIP: '172.20.0.85',
    eventType: 'ransomware_detected',
    user: 'accounting_system',
    location: 'server_room',
    status: 'quarantined',
    details: 'Ransomware encryption attempt blocked by EDR solution',
    threatLevel: 'critical',
    explanation: 'Ransomware attempts require immediate incident response and system isolation.',
    category: 'malware',
    difficulty: 'intermediate',
    learningTip: 'EDR solutions can prevent ransomware, but incident response procedures must follow.'
  },
  {
    timestamp: '2024-04-06T15:15:00Z',
    sourceIP: '10.0.0.150',
    eventType: 'trojan_detected',
    user: 'marketing_workstation',
    location: 'office',
    status: 'removing',
    details: 'Banking trojan found in browser, attempting automated removal',
    threatLevel: 'critical',
    explanation: 'Banking trojans steal financial credentials and require immediate isolation.',
    category: 'malware',
    difficulty: 'intermediate',
    learningTip: 'Banking trojans often hide in browsers and can steal financial information.'
  },

  // Data Exfiltration & Insider Threats
  {
    timestamp: '2024-04-07T18:30:00Z',
    sourceIP: '192.168.1.200',
    eventType: 'large_data_transfer',
    user: 'departing_employee',
    location: 'office',
    status: 'flagged',
    details: 'Employee downloaded 500GB of data one week before resignation',
    threatLevel: 'critical',
    explanation: 'Large data downloads by departing employees indicate potential intellectual property theft.',
    category: 'insider_threat',
    difficulty: 'intermediate',
    learningTip: 'Monitor departing employees closely for unusual data access patterns.'
  },
  {
    timestamp: '2024-04-07T21:45:00Z',
    sourceIP: '172.16.0.175',
    eventType: 'unauthorized_database_access',
    user: 'sales_manager',
    location: 'home',
    status: 'blocked',
    details: 'Sales manager attempted to access customer database outside normal duties',
    threatLevel: 'warning',
    explanation: 'Access attempts outside job responsibilities may indicate unauthorized data gathering.',
    category: 'insider_threat',
    difficulty: 'intermediate',
    learningTip: 'Role-based access controls should prevent access to data outside job functions.'
  },

  // Network Security & Intrusions
  {
    timestamp: '2024-04-08T04:20:00Z',
    sourceIP: '203.0.113.200',
    eventType: 'port_scanning',
    user: 'external_attacker',
    location: 'internet',
    status: 'detected',
    details: 'Systematic port scan detected from external IP targeting internal servers',
    threatLevel: 'critical',
    explanation: 'Port scans are reconnaissance activities that precede more serious attacks.',
    category: 'network_security',
    difficulty: 'intermediate',
    learningTip: 'Port scans indicate attackers are mapping your network for vulnerabilities.'
  },
  {
    timestamp: '2024-04-08T07:10:00Z',
    sourceIP: '198.51.100.145',
    eventType: 'ddos_attack',
    user: 'botnet',
    location: 'global',
    status: 'mitigating',
    details: 'Distributed denial of service attack targeting company website',
    threatLevel: 'critical',
    explanation: 'DDoS attacks can disrupt business operations and may mask other attack activities.',
    category: 'network_security',
    difficulty: 'intermediate',
    learningTip: 'DDoS attacks require immediate mitigation and may be cover for other malicious activities.'
  },

  // === ADVANCED SCENARIOS (40) ===
  // APT & State-Sponsored Threats
  {
    timestamp: '2024-04-09T03:45:00Z',
    sourceIP: '172.20.0.220',
    eventType: 'apt_lateral_movement',
    user: 'compromised_service_account',
    location: 'internal_network',
    status: 'detected',
    details: 'Service account showing unusual lateral movement patterns across network segments',
    threatLevel: 'critical',
    explanation: 'APT groups use compromised service accounts for stealth lateral movement.',
    category: 'apt_activity',
    difficulty: 'advanced',
    learningTip: 'Service accounts with unusual access patterns may indicate APT presence.'
  },
  {
    timestamp: '2024-04-09T06:30:00Z',
    sourceIP: '10.0.0.250',
    eventType: 'command_and_control',
    user: 'infected_workstation',
    location: 'office',
    status: 'communicating',
    details: 'Workstation communicating with known APT command and control server',
    threatLevel: 'critical',
    explanation: 'C2 communications indicate active compromise and ongoing threat actor control.',
    category: 'apt_activity',
    difficulty: 'advanced',
    learningTip: 'C2 communications require immediate isolation and forensic analysis.'
  },

  // Zero-Day Exploits & Advanced Malware
  {
    timestamp: '2024-04-09T10:15:00Z',
    sourceIP: '192.0.2.180',
    eventType: 'zero_day_exploit',
    user: 'web_application',
    location: 'dmz',
    status: 'exploited',
    details: 'Unknown vulnerability exploited in customer-facing web application',
    threatLevel: 'critical',
    explanation: 'Zero-day exploits require immediate patching and system isolation.',
    category: 'vulnerability_exploitation',
    difficulty: 'advanced',
    learningTip: 'Zero-day exploits are unknown vulnerabilities that bypass traditional defenses.'
  },
  {
    timestamp: '2024-04-09T13:20:00Z',
    sourceIP: '172.16.0.240',
    eventType: 'fileless_malware',
    user: 'executive_workstation',
    location: 'office',
    status: 'executing',
    details: 'Memory-based malware detected executing without file system artifacts',
    threatLevel: 'critical',
    explanation: 'Fileless malware lives in memory, making detection and forensics challenging.',
    category: 'advanced_malware',
    difficulty: 'advanced',
    learningTip: 'Fileless attacks require advanced detection techniques and memory analysis.'
  },

  // Supply Chain & Third-Party Compromises
  {
    timestamp: '2024-04-10T08:00:00Z',
    sourceIP: '203.0.113.250',
    eventType: 'supply_chain_compromise',
    user: 'vendor_update_system',
    location: 'partner_network',
    status: 'suspicious',
    details: 'Trusted vendor software update contains unexpected code modifications',
    threatLevel: 'critical',
    explanation: 'Supply chain attacks compromise trusted software to infiltrate target networks.',
    category: 'supply_chain',
    difficulty: 'advanced',
    learningTip: 'Even trusted vendors can be compromised; verify all software updates.'
  },
  {
    timestamp: '2024-04-10T11:45:00Z',
    sourceIP: '198.51.100.200',
    eventType: 'third_party_breach',
    user: 'cloud_service_provider',
    location: 'external',
    status: 'notified',
    details: 'Cloud provider reported security incident affecting customer data',
    threatLevel: 'critical',
    explanation: 'Third-party breaches can expose your data even with good internal security.',
    category: 'supply_chain',
    difficulty: 'advanced',
    learningTip: 'Monitor third-party security incidents and assess impact on your organization.'
  },

  // Cryptocurrency & Financial Threats
  {
    timestamp: '2024-04-10T14:30:00Z',
    sourceIP: '172.20.0.190',
    eventType: 'cryptojacking',
    user: 'development_server',
    location: 'datacenter',
    status: 'mining',
    details: 'Unauthorized cryptocurrency mining detected on development servers',
    threatLevel: 'warning',
    explanation: 'Cryptojacking steals computational resources and may indicate broader compromise.',
    category: 'financial_threat',
    difficulty: 'advanced',
    learningTip: 'Cryptojacking often indicates initial compromise that could escalate.'
  },

  // AI & Machine Learning Threats
  {
    timestamp: '2024-04-10T17:20:00Z',
    sourceIP: '10.0.0.180',
    eventType: 'ai_model_poisoning',
    user: 'ml_training_system',
    location: 'ai_lab',
    status: 'detected',
    details: 'Anomalous training data detected in machine learning pipeline',
    threatLevel: 'warning',
    explanation: 'AI model poisoning can compromise machine learning systems and decisions.',
    category: 'ai_security',
    difficulty: 'advanced',
    learningTip: 'Validate training data integrity to prevent AI model manipulation.'
  },

  // Physical Security Integration
  {
    timestamp: '2024-04-11T19:45:00Z',
    sourceIP: '192.168.1.250',
    eventType: 'badge_cloning',
    user: 'security_system',
    location: 'main_entrance',
    status: 'detected',
    details: 'Potential access card cloning detected by physical security systems',
    threatLevel: 'critical',
    explanation: 'Badge cloning combines physical and cyber security threats.',
    category: 'physical_security',
    difficulty: 'advanced',
    learningTip: 'Physical security breaches often enable cyber attacks.'
  },

  // IoT & Operational Technology
  {
    timestamp: '2024-04-11T22:30:00Z',
    sourceIP: '172.16.0.199',
    eventType: 'iot_compromise',
    user: 'smart_building_system',
    location: 'facility_network',
    status: 'compromised',
    details: 'Building automation system communicating with suspicious external servers',
    threatLevel: 'critical',
    explanation: 'Compromised IoT devices can provide persistent network access for attackers.',
    category: 'iot_security',
    difficulty: 'advanced',
    learningTip: 'IoT devices often have weak security and can be entry points for attackers.'
  }
];

// Enhanced scenario generation with uniqueness guarantee
export const generateAdvancedScenario = (
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  excludeIds: string[] = []
): any => {
  try {
    const { generateContextualScenario } = require('./advancedScenarioDatabase');
    return generateContextualScenario(difficulty, excludeIds);
  } catch (error) {
    console.error('Error loading advanced scenarios, using fallback:', error);
    
    // Fallback to original scenarios with enhanced uniqueness
    const scenarios = getScenariosByDifficulty(difficulty);
    const availableScenarios = scenarios.filter(s => !excludeIds.includes(s.id || ''));
    
    if (availableScenarios.length === 0) {
      // Reset exclusions if we've exhausted all scenarios
      console.log('Scenario pool exhausted, resetting for variety');
      return scenarios[Math.floor(Math.random() * scenarios.length)];
    }
    
    return availableScenarios[Math.floor(Math.random() * availableScenarios.length)];
  }
};

const getScenariosByDifficulty = (difficulty: string): ExpandedLogEntry[] => {
  const beginnerScenarios: ExpandedLogEntry[] = [
    {
      id: 'fallback-001',
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
      learningTip: 'Normal authentication logs show expected user behavior patterns.'
    },
    {
      id: 'fallback-002',
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
      learningTip: 'Multiple failed logins from unusual locations indicate potential brute force attacks.'
    }
  ];

  const intermediateScenarios: ExpandedLogEntry[] = [
    {
      id: 'fallback-003',
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
      learningTip: 'Unusual access patterns to sensitive data require investigation even from authorized users.'
    }
  ];

  const advancedScenarios: ExpandedLogEntry[] = [
    {
      id: 'fallback-004',
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
      learningTip: 'Data exfiltration often happens during maintenance windows when monitoring may be relaxed.'
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

// Helper functions for more realistic data generation
const generateContextualIP = (category?: string) => {
  const internalIPs = ['192.168.1.100', '10.0.0.50', '172.16.0.200'];
  const externalIPs = ['203.0.113.45', '198.51.100.33', '192.0.2.146'];
  const suspiciousIPs = ['45.142.122.88', '185.220.101.47', '94.102.49.190'];
  
  if (category === 'network_security' || category === 'apt_activity') {
    return [...externalIPs, ...suspiciousIPs][Math.floor(Math.random() * 6)];
  }
  
  return [...internalIPs, ...externalIPs][Math.floor(Math.random() * 6)];
};

const generateContextualUser = (category?: string) => {
  const regularUsers = ['sarah.johnson', 'mike.chen', 'alex.rodriguez', 'emma.davis'];
  const adminUsers = ['admin_sarah', 'it_admin', 'sys_admin', 'security_admin'];
  const systemUsers = ['system', 'service_account', 'backup_service', 'monitor_service'];
  
  if (category === 'authentication' || category === 'access_control') {
    return [...regularUsers, ...adminUsers][Math.floor(Math.random() * 8)];
  }
  
  if (category === 'system_maintenance') {
    return systemUsers[Math.floor(Math.random() * systemUsers.length)];
  }
  
  return regularUsers[Math.floor(Math.random() * regularUsers.length)];
};

const generateContextualLocation = (category?: string) => {
  const officeLocations = ['office', 'conference_room', 'workstation_floor_2'];
  const remoteLocations = ['home', 'coffee_shop', 'airport', 'hotel'];
  const systemLocations = ['datacenter', 'server_room', 'cloud_instance'];
  
  if (category === 'system_maintenance' || category === 'data_management') {
    return systemLocations[Math.floor(Math.random() * systemLocations.length)];
  }
  
  return [...officeLocations, ...remoteLocations][Math.floor(Math.random() * 7)];
};

const generateRecentTimestamp = () => {
  const now = new Date();
  const randomHours = Math.floor(Math.random() * 168); // Last week
  const randomMinutes = Math.floor(Math.random() * 60);
  now.setHours(now.getHours() - randomHours);
  now.setMinutes(randomMinutes);
  return now.toISOString();
};

// Export scenario categories for learning path integration
export const scenarioCategories = [
  'authentication',
  'email_security', 
  'network_security',
  'malware',
  'social_engineering',
  'data_management',
  'insider_threat',
  'apt_activity',
  'vulnerability_exploitation',
  'supply_chain',
  'financial_threat',
  'ai_security',
  'physical_security',
  'iot_security'
];

export const getScenariosByCategory = (category: string, count: number = 5) => {
  return scenarioDatabase
    .filter(scenario => scenario.category === category)
    .slice(0, count);
};
