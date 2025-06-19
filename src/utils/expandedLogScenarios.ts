
import { ThreatLevel } from './logGenerator';

export interface EnhancedScenarioTemplate {
  id: string;
  category: 'authentication' | 'network' | 'malware' | 'data-breach' | 'social-engineering' | 'system-admin' | 'cloud-security' | 'mobile-security';
  threatLevel: ThreatLevel;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  templates: {
    eventType: string[];
    users: string[];
    locations: string[];
    details: string[];
    explanations: string[];
    learningTips: string[];
  };
}

export const expandedScenarioTemplates: EnhancedScenarioTemplate[] = [
  // BEGINNER SAFE SCENARIOS
  {
    id: 'safe-auth-beginner',
    category: 'authentication',
    threatLevel: 'safe',
    difficulty: 'beginner',
    templates: {
      eventType: ['Morning Login', 'Lunch Break Login', 'End of Day Access', 'Weekly Report Access'],
      users: ['sarah.bloom@company.com', 'alex.garden@company.com', 'jamie.rivers@company.com', 'taylor.woods@company.com'],
      locations: ['Main Office Building', 'Home Office - Registered', 'Branch Office - Downtown', 'Coffee Shop - Verified WiFi'],
      details: [
        'Employee logged in from their usual workstation during regular hours',
        'Team member accessed their email during scheduled break time',
        'User checked their calendar before heading home for the day',
        'Staff member downloaded their weekly timesheet on Friday afternoon'
      ],
      explanations: [
        'Pip feels so peaceful! This is exactly the kind of normal, routine activity we love to see. The timing, location, and user all match expected patterns perfectly! 🌸',
        'How wonderful! This employee is following their usual routine. Everything looks just right - same person, same time, same place! 🍃',
        'Such a lovely, predictable workday moment! Pip is delighted to see healthy work patterns in action! ☀️'
      ],
      learningTips: [
        'Normal login patterns include: expected times, familiar locations, and consistent user behavior.',
        'Safe authentication shows regular work hours, known devices, and typical user activities.',
        'Look for consistency in timing, location, and user identity to identify safe activities.'
      ]
    }
  },

  // INTERMEDIATE WARNING SCENARIOS
  {
    id: 'warning-auth-intermediate',
    category: 'authentication',
    threatLevel: 'warning',
    difficulty: 'intermediate',
    templates: {
      eventType: ['Unusual Time Login', 'Geographic Anomaly', 'Multiple Failed Attempts', 'New Device Access'],
      users: ['admin.assistant@company.com', 'finance.reviewer@company.com', 'hr.coordinator@company.com'],
      locations: ['Airport WiFi Network', 'Hotel Business Center', 'Unknown Geographic Region', 'VPN Exit Node'],
      details: [
        'Administrative account accessed at 2:47 AM from international airport WiFi',
        'Finance user logged in from hotel in different country during supposed vacation',
        'HR coordinator had 5 failed login attempts followed by successful access from new device',
        'Privileged account accessed through VPN from location not matching user travel itinerary'
      ],
      explanations: [
        'Luna tilts her head curiously. While travel can explain location changes, this timing and access pattern needs gentle investigation! 🤔',
        'Luna wonders about this unusual pattern. It might be legitimate travel, but the circumstances deserve a friendly check-in! ✨',
        'Luna notices something that makes her pause. The combination of failed attempts and new location suggests we should verify with the user! 💫'
      ],
      learningTips: [
        'Warning signs include: unusual times, unexpected locations, failed attempts followed by success.',
        'Consider context: Is the user traveling? Are they working different hours? Is this a new device?',
        'Investigate anomalies gently - they might be legitimate but unusual circumstances.'
      ]
    }
  },

  // ADVANCED CRITICAL SCENARIOS
  {
    id: 'critical-auth-advanced',
    category: 'authentication',
    threatLevel: 'critical',
    difficulty: 'advanced',
    templates: {
      eventType: ['Credential Stuffing Attack', 'Privilege Escalation', 'Simultaneous Access', 'Service Account Abuse'],
      users: ['root@company.com', 'service.backup@company.com', 'ceo@company.com', 'database.admin@company.com'],
      locations: ['Tor Exit Node', 'Known Botnet IP', 'Sanctioned Country', 'Compromised Infrastructure'],
      details: [
        'Root account accessed simultaneously from corporate office and known command & control server',
        'Service account used to access production database while same account active in maintenance script',
        'CEO credentials used from sanctioned country IP while CEO confirmed in board meeting',
        'Database admin account showing 50+ rapid-fire login attempts from botnet infrastructure'
      ],
      explanations: [
        'Sage is deeply alarmed! Simultaneous access from impossible locations indicates credential compromise. Immediate containment needed! 🚨',
        'Sage\'s protective instincts are fully activated! This service account abuse pattern shows likely unauthorized access requiring emergency response! ⚠️',
        'Sage feels extremely concerned! The timing and location impossibilities confirm this is an active security incident! 🛡️'
      ],
      learningTips: [
        'Critical indicators: Impossible simultaneous access, service account abuse, privileged account compromise.',
        'Geographic impossibilities (same user, different continents, same time) are strong indicators of compromise.',
        'Service accounts should only be active during scheduled tasks - human-like usage patterns indicate compromise.'
      ]
    }
  },

  // NETWORK SECURITY SCENARIOS
  {
    id: 'safe-network-beginner',
    category: 'network',
    threatLevel: 'safe',
    difficulty: 'beginner',
    templates: {
      eventType: ['Scheduled Backup', 'Software Update', 'Email Synchronization', 'File Share Access'],
      users: ['backup.service@company.com', 'update.manager@company.com', 'mail.sync@company.com'],
      locations: ['Internal Data Center', 'Approved Cloud Provider', 'Corporate Mail Server', 'File Server Rack'],
      details: [
        'Automated backup system transferring encrypted files to approved cloud storage at 2 AM',
        'Patch management system downloading security updates from Microsoft servers',
        'Email server synchronizing with Exchange Online during maintenance window',
        'File server replicating data to disaster recovery site on schedule'
      ],
      explanations: [
        'Pip is happy to see everything working as planned! Scheduled processes keep our data safe and secure! 💚',
        'How wonderful! Our systems are maintaining themselves properly with approved vendors! 🔄',
        'Such organized, predictable maintenance! Pip loves seeing infrastructure take care of itself! 📧'
      ],
      learningTips: [
        'Safe network activity: scheduled processes, approved destinations, expected timing.',
        'Look for automation patterns, vendor relationships, and maintenance windows.',
        'Encrypted transfers to known-good destinations during off-hours are typically safe.'
      ]
    }
  },

  {
    id: 'warning-network-intermediate',
    category: 'network',
    threatLevel: 'warning',
    difficulty: 'intermediate',
    templates: {
      eventType: ['Unusual Data Volume', 'Off-Schedule Transfer', 'Port Scanning', 'DNS Tunneling'],
      users: ['temp.contractor@company.com', 'guest.researcher@company.com', 'intern.summer@company.com'],
      locations: ['Guest Network Segment', 'Partner VPN Connection', 'Remote Access Portal', 'BYOD Network'],
      details: [
        'Temporary contractor uploaded 5GB of design files to personal cloud storage during lunch break',
        'Guest researcher performing network discovery scans on internal subnets',
        'Summer intern downloading entire customer database to laptop before end of internship',
        'BYOD device generating unusual DNS queries to suspicious domains'
      ],
      explanations: [
        'Luna notices something interesting! Large uploads to personal accounts might be legitimate but deserve a gentle conversation! 📊',
        'Luna\'s curiosity is piqued! Network scanning might be research-related, but we should verify the purpose! 🔍',
        'Luna wonders about this data access pattern. End-of-term activities can seem suspicious even when legitimate! 🌐'
      ],
      learningTips: [
        'Context matters: temporary access, large data movements, scanning activities.',
        'Consider user roles and permissions - are they acting within expected boundaries?',
        'Timing can be suspicious: end of employment, after hours, during high-stress periods.'
      ]
    }
  },

  // MALWARE & THREATS
  {
    id: 'critical-malware-advanced',
    category: 'malware',
    threatLevel: 'critical',
    difficulty: 'advanced',
    templates: {
      eventType: ['Command & Control Communication', 'Lateral Movement', 'Data Exfiltration', 'Persistence Mechanism'],
      users: ['compromised.workstation', 'infected.server', 'backdoor.process', 'malware.payload'],
      locations: ['Command & Control Server', 'Malware Distribution Network', 'Compromised Infrastructure', 'Dark Web Marketplace'],
      details: [
        'Workstation communicating with known APT command server every 60 seconds with encrypted payloads',
        'Server process spawning suspicious child processes and scanning internal network for vulnerabilities',
        'Database server sending encrypted customer data to external FTP server at 3 AM',
        'Multiple workstations downloading identical suspicious executables from compromised website'
      ],
      explanations: [
        'Sage is in maximum alert mode! This shows active malware communication requiring immediate network isolation! 🚨',
        'Sage feels extremely concerned! Advanced persistent threat behavior detected - containment and forensics needed now! ⚠️',
        'Sage\'s strongest protective instincts are engaged! This coordinated attack requires emergency incident response! 🛡️'
      ],
      learningTips: [
        'Malware indicators: regular beaconing, lateral movement, unusual process spawning.',
        'APTs often use encrypted communications on regular intervals to avoid detection.',
        'Coordinated behavior across multiple systems indicates sophisticated threats.'
      ]
    }
  },

  // CLOUD SECURITY SCENARIOS
  {
    id: 'safe-cloud-beginner',
    category: 'cloud-security',
    threatLevel: 'safe',
    difficulty: 'beginner',
    templates: {
      eventType: ['Auto-scaling Event', 'Backup Completion', 'Certificate Renewal', 'Health Check'],
      users: ['aws.autoscale@company.com', 'azure.backup@company.com', 'gcp.monitor@company.com'],
      locations: ['AWS US-East-1', 'Azure West Europe', 'Google Cloud Central', 'CloudFlare Edge'],
      details: [
        'Auto-scaling group launched additional web servers due to increased traffic during business hours',
        'Automated backup completed successfully for production database in approved region',
        'SSL certificate automatically renewed by certificate authority with 30-day notice',
        'Load balancer health checks confirming all application servers responding normally'
      ],
      explanations: [
        'Pip feels secure in the cloud! Our automated systems are working perfectly to keep everything running smoothly! ☁️',
        'How delightful! The cloud infrastructure is taking care of itself just as designed! 🌟',
        'Such reliable automation! Pip loves seeing cloud services maintain themselves properly! 💫'
      ],
      learningTips: [
        'Cloud safety indicators: automated processes, expected scaling, routine maintenance.',
        'Look for patterns that match business needs and traffic cycles.',
        'Automated certificate renewals and health checks are normal cloud operations.'
      ]
    }
  },

  // SOCIAL ENGINEERING SCENARIOS
  {
    id: 'warning-social-intermediate',
    category: 'social-engineering',
    threatLevel: 'warning',
    difficulty: 'intermediate',
    templates: {
      eventType: ['Phishing Attempt', 'Pretexting Call', 'Suspicious Email', 'Fake Vendor Contact'],
      users: ['external.sender@suspicious.com', 'fake.vendor@lookalike.com', 'imposter.ceo@company.co'],
      locations: ['External Email System', 'Spoofed Domain', 'Suspicious IP Range', 'Known Phishing Infrastructure'],
      details: [
        'Email from "CEO" requesting immediate wire transfer, sent from external lookalike domain',
        'Vendor claiming urgent security update needed, requesting admin credentials over phone',
        'IT support email asking employees to verify passwords due to "security audit"',
        'Invoice from known vendor but with different payment details and urgent language'
      ],
      explanations: [
        'Luna feels a bit worried! This message has several red flags that suggest someone might be trying to trick us! 🎭',
        'Luna\'s intuition is tingling! The urgency and credential requests feel like someone pretending to be helpful! 🎪',
        'Luna notices this doesn\'t feel quite right. Real IT teams follow different procedures for security matters! 🔍'
      ],
      learningTips: [
        'Social engineering red flags: urgency, credential requests, external pressure.',
        'Verify requests through separate communication channels before taking action.',
        'Be suspicious of emails that create time pressure or bypass normal procedures.'
      ]
    }
  },

  // MOBILE SECURITY SCENARIOS
  {
    id: 'critical-mobile-advanced',
    category: 'mobile-security',
    threatLevel: 'critical',
    difficulty: 'advanced',
    templates: {
      eventType: ['Mobile Device Compromise', 'App Store Malware', 'SMS Phishing', 'Rogue Mobile App'],
      users: ['mobile.user@company.com', 'exec.tablet@company.com', 'sales.phone@company.com'],
      locations: ['Mobile Device Management', 'App Store Download', 'SMS Gateway', 'Mobile VPN'],
      details: [
        'Executive mobile device accessing corporate email while also communicating with known mobile malware C2',
        'Sales team mobile app requesting excessive permissions and uploading contact lists to unknown servers',
        'Mobile device enrolled in MDM but running jailbreak detection bypass tools',
        'Company tablet downloading apps from unofficial app stores in violation of security policy'
      ],
      explanations: [
        'Sage is very concerned about mobile security! Compromised devices can access all our corporate data! 📱',
        'Sage feels alarmed by this mobile threat! Personal devices with corporate access need immediate attention! ⚠️',
        'Sage\'s mobile security instincts are activated! This device behavior indicates serious compromise! 🛡️'
      ],
      learningTips: [
        'Mobile threats: jailbroken devices, malicious apps, excessive permissions.',
        'Corporate data on personal devices creates unique security challenges.',
        'MDM bypass attempts indicate intentional security policy violations.'
      ]
    }
  }
];

export const generateExpandedLog = (difficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner') => {
  // Filter scenarios by difficulty
  const availableScenarios = expandedScenarioTemplates.filter(template => 
    template.difficulty === difficulty || 
    (difficulty === 'intermediate' && template.difficulty === 'beginner') ||
    (difficulty === 'advanced' && ['beginner', 'intermediate'].includes(template.difficulty))
  );

  // Select random scenario
  const template = availableScenarios[Math.floor(Math.random() * availableScenarios.length)];
  
  // Generate random elements
  const eventType = template.templates.eventType[Math.floor(Math.random() * template.templates.eventType.length)];
  const user = template.templates.users[Math.floor(Math.random() * template.templates.users.length)];
  const location = template.templates.locations[Math.floor(Math.random() * template.templates.locations.length)];
  const details = template.templates.details[Math.floor(Math.random() * template.templates.details.length)];
  const explanation = template.templates.explanations[Math.floor(Math.random() * template.templates.explanations.length)];
  const learningTip = template.templates.learningTips[Math.floor(Math.random() * template.templates.learningTips.length)];
  
  // Generate realistic timestamp
  const now = new Date();
  const offset = Math.floor(Math.random() * 24 * 60 * 60 * 1000);
  const timestamp = new Date(now.getTime() - offset);
  
  // Generate IP based on threat level and category
  const generateIP = (threatLevel: ThreatLevel, category: string) => {
    if (threatLevel === 'safe') {
      return `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    } else if (threatLevel === 'warning') {
      return `203.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    } else {
      // Critical - use more suspicious ranges
      const suspiciousRanges = ['185', '194', '188', '176'];
      const range = suspiciousRanges[Math.floor(Math.random() * suspiciousRanges.length)];
      return `${range}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    }
  };
  
  // Generate status based on threat level
  const generateStatus = (threatLevel: ThreatLevel) => {
    if (threatLevel === 'safe') return 'SUCCESS';
    if (threatLevel === 'warning') return Math.random() > 0.6 ? 'SUCCESS' : 'FAILED';
    return Math.random() > 0.4 ? 'FAILED' : 'ANOMALY';
  };

  return {
    timestamp: timestamp.toISOString().replace('T', ' ').substring(0, 19),
    sourceIP: generateIP(template.threatLevel, template.category),
    eventType,
    user,
    location,
    status: generateStatus(template.threatLevel),
    details,
    threatLevel: template.threatLevel,
    explanation,
    category: template.category,
    difficulty: template.difficulty,
    learningTip
  };
};
