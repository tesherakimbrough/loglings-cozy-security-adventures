
import { ThreatLevel } from './logGenerator';

interface ScenarioTemplate {
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  threatLevel: ThreatLevel;
  baseScenario: {
    eventType: string;
    details: string;
    explanation: string;
    learningTip: string;
  };
  variations: {
    users: string[];
    locations: string[];
    times: string[];
    sources: string[];
  };
}

const scenarioTemplates: ScenarioTemplate[] = [
  {
    category: 'authentication',
    difficulty: 'beginner',
    threatLevel: 'safe',
    baseScenario: {
      eventType: 'login_success',
      details: 'Normal business hours login from office location',
      explanation: 'This appears to be a legitimate login during regular business hours from a known office location.',
      learningTip: 'Look for login patterns that match expected user behavior - correct location, time, and device.'
    },
    variations: {
      users: ['alice.smith', 'john.doe', 'maria.garcia', 'david.kim', 'sarah.jones'],
      locations: ['Office-NYC', 'Office-LA', 'Office-Chicago', 'Remote-Home', 'Office-Seattle'],
      times: ['09:15', '10:30', '14:20', '16:45', '11:10'],
      sources: ['192.168.1.10', '192.168.1.15', '192.168.1.20', '192.168.1.25', '192.168.1.30']
    }
  },
  {
    category: 'authentication',
    difficulty: 'intermediate',
    threatLevel: 'warning',
    baseScenario: {
      eventType: 'login_attempt',
      details: 'Multiple failed login attempts from different locations',
      explanation: 'This shows suspicious activity with multiple failed login attempts, possibly indicating a brute force attack.',
      learningTip: 'Watch for patterns like multiple failures, geographic anomalies, or unusual timing.'
    },
    variations: {
      users: ['admin', 'root', 'administrator', 'service_account', 'backup_user'],
      locations: ['Unknown-RU', 'Unknown-CN', 'Unknown-TOR', 'Proxy-VPN', 'Unknown-Location'],
      times: ['02:30', '03:15', '04:20', '01:45', '05:10'],
      sources: ['45.123.45.67', '123.45.67.89', '67.89.123.45', '89.123.45.67', '156.78.90.123']
    }
  },
  {
    category: 'network',
    difficulty: 'beginner',
    threatLevel: 'safe',
    baseScenario: {
      eventType: 'file_transfer',
      details: 'Regular file backup to approved cloud storage',
      explanation: 'This is normal backup activity to an approved cloud storage service during maintenance hours.',
      learningTip: 'Scheduled backups to known services are typically safe, especially during maintenance windows.'
    },
    variations: {
      users: ['backup_service', 'system_backup', 'auto_backup', 'scheduled_task', 'maintenance'],
      locations: ['AWS-S3', 'Azure-Blob', 'Google-Drive', 'OneDrive', 'Dropbox-Business'],
      times: ['23:00', '00:30', '02:00', '01:30', '03:00'],
      sources: ['10.0.1.100', '10.0.1.101', '10.0.1.102', '10.0.1.103', '10.0.1.104']
    }
  },
  {
    category: 'network',
    difficulty: 'advanced',
    threatLevel: 'critical',
    baseScenario: {
      eventType: 'data_exfiltration',
      details: 'Large volume of sensitive data transferred to external server',
      explanation: 'This indicates potential data theft with large amounts of sensitive information being sent to an unknown external server.',
      learningTip: 'Look for unusual data volumes, transfers to unknown destinations, and access to sensitive file types.'
    },
    variations: {
      users: ['compromised_user', 'insider_threat', 'stolen_credentials', 'malware_process', 'unknown_process'],
      locations: ['Unknown-Server', 'Suspicious-IP', 'Dark-Web', 'Command-Control', 'Attacker-Server'],
      times: ['22:30', '23:45', '01:20', '02:15', '03:30'],
      sources: ['172.16.0.50', '172.16.0.51', '172.16.0.52', '172.16.0.53', '172.16.0.54']
    }
  },
  {
    category: 'email',
    difficulty: 'intermediate',
    threatLevel: 'warning',
    baseScenario: {
      eventType: 'phishing_attempt',
      details: 'Suspicious email with urgent payment request and suspicious links',
      explanation: 'This email shows classic phishing indicators: urgency, payment requests, and suspicious links.',
      learningTip: 'Be alert for urgent language, unexpected payment requests, and links that don\'t match the sender domain.'
    },
    variations: {
      users: ['finance_team', 'accounting', 'payroll', 'executive_assistant', 'hr_manager'],
      locations: ['External-Sender', 'Spoofed-Domain', 'Suspicious-IP', 'Compromised-Account', 'Unknown-Source'],
      times: ['16:30', '17:45', '18:20', '19:15', '20:30'],
      sources: ['external_email', 'spoofed_sender', 'phishing_kit', 'malicious_link', 'fake_domain']
    }
  }
];

export const generateExpandedScenarios = (count: number = 50) => {
  const scenarios = [];
  
  for (let i = 0; i < count; i++) {
    const template = scenarioTemplates[i % scenarioTemplates.length];
    const variation = template.variations;
    
    // Randomly select variations
    const user = variation.users[Math.floor(Math.random() * variation.users.length)];
    const location = variation.locations[Math.floor(Math.random() * variation.locations.length)];
    const time = variation.times[Math.floor(Math.random() * variation.times.length)];
    const source = variation.sources[Math.floor(Math.random() * variation.sources.length)];
    
    scenarios.push({
      id: `scenario_${i + 1}`,
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      sourceIP: source,
      eventType: template.baseScenario.eventType,
      user: user,
      location: location,
      status: template.threatLevel === 'safe' ? 'success' : 'alert',
      details: template.baseScenario.details,
      threatLevel: template.threatLevel,
      explanation: template.baseScenario.explanation,
      category: template.category,
      difficulty: template.difficulty,
      learningTip: template.baseScenario.learningTip
    });
  }
  
  return scenarios;
};

export const getScenarioByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
  const allScenarios = generateExpandedScenarios(100);
  return allScenarios.filter(scenario => scenario.difficulty === difficulty);
};

export const getScenarioByCategory = (category: string) => {
  const allScenarios = generateExpandedScenarios(100);
  return allScenarios.filter(scenario => scenario.category === category);
};
