
import { ThreatLevel } from './logGenerator';

export interface ScenarioTemplate {
  id: string;
  category: 'authentication' | 'network' | 'malware' | 'data-breach' | 'social-engineering' | 'system-admin';
  threatLevel: ThreatLevel;
  templates: {
    eventType: string[];
    users: string[];
    locations: string[];
    details: string[];
    explanations: string[];
  };
}

export const scenarioTemplates: ScenarioTemplate[] = [
  // Safe Authentication Scenarios
  {
    id: 'safe-auth',
    category: 'authentication',
    threatLevel: 'safe',
    templates: {
      eventType: ['Morning Login', 'Afternoon Login', 'Remote Access', 'Password Reset'],
      users: ['sarah.bloom@company.com', 'alex.garden@company.com', 'jamie.rivers@company.com', 'taylor.woods@company.com'],
      locations: ['Main Office', 'Home Office - Verified', 'Branch Office', 'Co-working Space'],
      details: [
        'User logged in from their registered device during normal hours',
        'Employee accessed files from verified home office setup',
        'Team member checked emails during lunch break',
        'Staff member updated their profile information'
      ],
      explanations: [
        'Pip feels so peaceful! This is exactly the kind of normal, happy activity we love to see. Everything looks perfectly routine! 🌸',
        'How wonderful! This employee is working safely from their usual spot. The Loglings feel very secure about this! 🏠',
        'Such a lovely, normal workday moment! Pip is delighted to see healthy work-life balance in action! ☀️'
      ]
    }
  },
  
  // Warning Authentication Scenarios  
  {
    id: 'warning-auth',
    category: 'authentication',
    threatLevel: 'warning',
    templates: {
      eventType: ['Unusual Login Time', 'Multiple Login Attempts', 'New Device Access', 'Geographic Anomaly'],
      users: ['admin@company.com', 'finance.lead@company.com', 'hr.manager@company.com', 'security@company.com'],
      locations: ['Unknown City', 'Different Country', 'Public WiFi', 'Unregistered Location'],
      details: [
        'User logged in at 3:47 AM from an unfamiliar location',
        'Multiple failed login attempts followed by successful access',
        'Account accessed from a new device without prior notification',
        'Login detected from location 500 miles from usual workplace'
      ],
      explanations: [
        'Luna tilts her head curiously. This timing and location seem unusual for this person. Worth a gentle check-in! 🤔',
        'Luna wonders if someone might be trying to guess passwords. Better to be safe and investigate kindly! ✨',
        'Luna notices something different! A new device could be fine, but it\'s worth confirming with the user! 💫'
      ]
    }
  },

  // Critical Authentication Scenarios
  {
    id: 'critical-auth', 
    category: 'authentication',
    threatLevel: 'critical',
    templates: {
      eventType: ['Brute Force Attack', 'Admin Account Breach', 'Multiple Failed Logins', 'Suspicious Root Access'],
      users: ['root@company.com', 'ceo@company.com', 'system.admin@company.com', 'backup.service@company.com'],
      locations: ['Tor Network', 'Known Malicious IP', 'Blocked Country', 'Anonymous Proxy'],
      details: [
        'Admin account accessed from known malicious IP with 50+ failed attempts',
        'Root user logged in from anonymous proxy during CEO vacation',
        'System account showing login from location flagged by threat intelligence',
        'Critical service account accessed from Tor network at midnight'
      ],
      explanations: [
        'Sage is very alarmed! This looks like someone trying to break in with many password guesses. Immediate action needed! 🚨',
        'Sage\'s protective instincts are strongly activated! This admin access seems very suspicious and needs urgent attention! ⚠️',
        'Sage feels deeply concerned! Critical accounts shouldn\'t be accessed this way. Time for emergency response! 🛡️'
      ]
    }
  },

  // Safe Network Scenarios
  {
    id: 'safe-network',
    category: 'network', 
    threatLevel: 'safe',
    templates: {
      eventType: ['File Download', 'Email Sync', 'Software Update', 'Backup Process'],
      users: ['system.backup@company.com', 'update.service@company.com', 'user.sync@company.com'],
      locations: ['Internal Network', 'Approved Cloud Service', 'Corporate Servers'],
      details: [
        'Scheduled backup transferring files to approved cloud storage',
        'Automatic software update downloading from verified vendor',
        'Email system synchronizing with corporate mail servers',
        'Employee downloading approved software from company repository'
      ],
      explanations: [
        'Pip is happy to see everything working as planned! Scheduled backups keep our data safe and cozy! 💚',
        'How wonderful! The system is keeping itself updated and secure. Pip feels very safe! 🔄',
        'Such organized, planned activity! Pip loves seeing systems take care of themselves properly! 📧'
      ]
    }
  },

  // Warning Network Scenarios
  {
    id: 'warning-network',
    category: 'network',
    threatLevel: 'warning', 
    templates: {
      eventType: ['Unusual Data Transfer', 'Port Scan', 'Unexpected Connection', 'Large File Upload'],
      users: ['unknown.device', 'guest.user@company.com', 'contractor.temp@company.com'],
      locations: ['External Network', 'Unknown Subnet', 'Guest Network'],
      details: [
        'Large data transfer to external server during off-hours',
        'Unknown device performing network scan on internal systems',
        'Guest user accessing internal file shares beyond normal permissions',
        'Temporary contractor uploading unusually large files to personal cloud'
      ],
      explanations: [
        'Luna notices something interesting! This data movement seems bigger than usual. Worth investigating gently! 📊',
        'Luna\'s curiosity is piqued! Someone is looking around the network. Let\'s see what they\'re up to! 🔍',
        'Luna wonders about this activity. It might be fine, but it\'s different from normal patterns! 🌐'
      ]
    }
  },

  // Critical Network Scenarios
  {
    id: 'critical-network',
    category: 'network',
    threatLevel: 'critical',
    templates: {
      eventType: ['Data Exfiltration', 'Command & Control', 'Malware Communication', 'Unauthorized Access'],
      users: ['compromised.system', 'unknown.attacker', 'malware.process'],
      locations: ['Known C2 Server', 'Malicious Domain', 'Blocked IP Range'],
      details: [
        'Critical server communicating with known command & control infrastructure',
        'Database server sending encrypted data to suspicious external domain',
        'Multiple systems connecting to malware distribution network',
        'Financial database accessed by unauthorized process sending data externally'
      ],
      explanations: [
        'Sage is in full alert mode! This looks like data being stolen by attackers. Emergency response needed now! 🚨',
        'Sage feels extremely worried! Malware might be controlling our systems. Immediate isolation required! ⚠️',
        'Sage\'s strongest protective instincts are activated! This is a serious breach requiring urgent action! 🛡️'
      ]
    }
  }
];

export const generateProceduralLog = () => {
  // Select random scenario template
  const template = scenarioTemplates[Math.floor(Math.random() * scenarioTemplates.length)];
  
  // Generate random elements from template
  const eventType = template.templates.eventType[Math.floor(Math.random() * template.templates.eventType.length)];
  const user = template.templates.users[Math.floor(Math.random() * template.templates.users.length)];
  const location = template.templates.locations[Math.floor(Math.random() * template.templates.locations.length)];
  const details = template.templates.details[Math.floor(Math.random() * template.templates.details.length)];
  const explanation = template.templates.explanations[Math.floor(Math.random() * template.templates.explanations.length)];
  
  // Generate realistic timestamp (within last 24 hours)
  const now = new Date();
  const offset = Math.floor(Math.random() * 24 * 60 * 60 * 1000);
  const timestamp = new Date(now.getTime() - offset);
  
  // Generate IP address based on threat level
  const generateIP = (threatLevel: ThreatLevel) => {
    if (threatLevel === 'safe') {
      return `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    } else if (threatLevel === 'warning') {
      return `203.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    } else {
      return `185.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    }
  };
  
  // Generate status based on threat level
  const generateStatus = (threatLevel: ThreatLevel) => {
    if (threatLevel === 'safe') return 'SUCCESS';
    if (threatLevel === 'warning') return Math.random() > 0.5 ? 'SUCCESS' : 'FAILED';
    return Math.random() > 0.3 ? 'FAILED' : 'ANOMALY';
  };

  return {
    timestamp: timestamp.toISOString().replace('T', ' ').substring(0, 19),
    sourceIP: generateIP(template.threatLevel),
    eventType,
    user,
    location,
    status: generateStatus(template.threatLevel),
    details,
    threatLevel: template.threatLevel,
    explanation,
    category: template.category
  };
};
