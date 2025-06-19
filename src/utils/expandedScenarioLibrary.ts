
import { ThreatLevel } from './logGenerator';

export interface ExpandedScenario {
  id: string;
  timestamp: string;
  sourceIP: string;
  eventType: string;
  user: string;
  location: string;
  status: string;
  details: string;
  threatLevel: ThreatLevel;
  explanation: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  learningTip: string;
  tags: string[];
}

const scenarioTemplates = [
  // Authentication Scenarios
  {
    category: 'authentication',
    scenarios: [
      {
        eventType: 'login_attempt',
        threatLevel: 'safe' as ThreatLevel,
        difficulty: 'beginner' as const,
        template: {
          user: 'sarah.johnson',
          location: 'office_network',
          status: 'success',
          details: 'Successful login from registered device during business hours',
          explanation: 'This is a normal login during business hours from a recognized device.',
          learningTip: 'Regular business hour logins from office networks are typically safe.'
        }
      },
      {
        eventType: 'failed_login',
        threatLevel: 'warning' as ThreatLevel,
        difficulty: 'intermediate' as const,
        template: {
          user: 'admin',
          location: 'external_network',
          status: 'failed',
          details: 'Multiple failed login attempts to admin account from unknown IP',
          explanation: 'Multiple failed attempts on an admin account could indicate a brute force attack.',
          learningTip: 'Watch for patterns: multiple failures + admin accounts + external IPs = red flags.'
        }
      },
      {
        eventType: 'privilege_escalation',
        threatLevel: 'critical' as ThreatLevel,
        difficulty: 'advanced' as const,
        template: {
          user: 'temp_worker',
          location: 'server_room',
          status: 'success',
          details: 'Temporary worker account gained administrative privileges outside normal process',
          explanation: 'Unauthorized privilege escalation is a critical security incident.',
          learningTip: 'Privilege changes should always follow documented approval processes.'
        }
      }
    ]
  },
  
  // Network Security Scenarios
  {
    category: 'network',
    scenarios: [
      {
        eventType: 'network_scan',
        threatLevel: 'warning' as ThreatLevel,
        difficulty: 'intermediate' as const,
        template: {
          user: 'unknown',
          location: 'external_network',
          status: 'detected',
          details: 'Port scanning detected from external IP targeting multiple internal hosts',
          explanation: 'Network scanning from external sources often precedes attacks.',
          learningTip: 'Reconnaissance activities like port scans are early indicators of potential attacks.'
        }
      },
      {
        eventType: 'data_exfiltration',
        threatLevel: 'critical' as ThreatLevel,
        difficulty: 'advanced' as const,
        template: {
          user: 'database_service',
          location: 'data_center',
          status: 'alert',
          details: 'Large volume of sensitive data accessed and transmitted to external server',
          explanation: 'Unexpected large data transfers could indicate data theft.',
          learningTip: 'Monitor for unusual data access patterns and large outbound transfers.'
        }
      }
    ]
  },

  // Email Security Scenarios
  {
    category: 'email',
    scenarios: [
      {
        eventType: 'phishing_attempt',
        threatLevel: 'warning' as ThreatLevel,
        difficulty: 'beginner' as const,
        template: {
          user: 'marketing_team',
          location: 'email_server',
          status: 'quarantined',
          details: 'Email with suspicious links blocked by security filters',
          explanation: 'Phishing emails try to steal credentials or install malware.',
          learningTip: 'Always verify sender identity before clicking links or downloading attachments.'
        }
      },
      {
        eventType: 'email_forwarding',
        threatLevel: 'critical' as ThreatLevel,
        difficulty: 'advanced' as const,
        template: {
          user: 'ceo',
          location: 'email_server',
          status: 'active',
          details: 'CEO email account configured to forward all messages to external address',
          explanation: 'Unauthorized email forwarding could indicate account compromise.',
          learningTip: 'Executive email forwarding rules should be closely monitored and verified.'
        }
      }
    ]
  },

  // Malware Scenarios
  {
    category: 'malware',
    scenarios: [
      {
        eventType: 'file_scan',
        threatLevel: 'safe' as ThreatLevel,
        difficulty: 'beginner' as const,
        template: {
          user: 'accounting',
          location: 'workstation',
          status: 'clean',
          details: 'Document scanned by antivirus - no threats detected',
          explanation: 'Regular antivirus scans finding clean files are normal security operations.',
          learningTip: 'Clean antivirus scans indicate your security tools are working properly.'
        }
      },
      {
        eventType: 'malware_detected',
        threatLevel: 'critical' as ThreatLevel,
        difficulty: 'intermediate' as const,
        template: {
          user: 'hr_department',
          location: 'workstation',
          status: 'quarantined',
          details: 'Ransomware detected attempting to encrypt files on HR workstation',
          explanation: 'Ransomware is a critical threat that can encrypt valuable business data.',
          learningTip: 'Ransomware incidents require immediate isolation and incident response.'
        }
      }
    ]
  },

  // Access Control Scenarios
  {
    category: 'access_control',
    scenarios: [
      {
        eventType: 'file_access',
        threatLevel: 'safe' as ThreatLevel,
        difficulty: 'beginner' as const,
        template: {
          user: 'project_manager',
          location: 'file_server',
          status: 'success',
          details: 'Project manager accessed project files during normal work hours',
          explanation: 'Authorized users accessing appropriate files during business hours is normal.',
          learningTip: 'Look for the right person, accessing the right files, at the right time.'
        }
      },
      {
        eventType: 'unauthorized_access',
        threatLevel: 'critical' as ThreatLevel,
        difficulty: 'advanced' as const,
        template: {
          user: 'intern',
          location: 'finance_server',
          status: 'success',
          details: 'Intern account accessed confidential financial records outside normal duties',
          explanation: 'Users accessing data outside their role indicates potential insider threat.',
          learningTip: 'Monitor for access that doesn\'t match job responsibilities or need-to-know basis.'
        }
      }
    ]
  },

  // System Security Scenarios
  {
    category: 'system',
    scenarios: [
      {
        eventType: 'system_update',
        threatLevel: 'safe' as ThreatLevel,
        difficulty: 'beginner' as const,
        template: {
          user: 'system_admin',
          location: 'server_room',
          status: 'completed',
          details: 'Scheduled security patches applied to production servers',
          explanation: 'Regular security updates are essential for maintaining system security.',
          learningTip: 'Scheduled maintenance and patching are signs of good security hygiene.'
        }
      },
      {
        eventType: 'configuration_change',
        threatLevel: 'warning' as ThreatLevel,
        difficulty: 'intermediate' as const,
        template: {
          user: 'unknown',
          location: 'firewall',
          status: 'modified',
          details: 'Firewall rules modified to allow unrestricted outbound connections',
          explanation: 'Unauthorized firewall changes could create security vulnerabilities.',
          learningTip: 'All security configuration changes should be documented and approved.'
        }
      }
    ]
  }
];

export const generateExpandedScenario = (): ExpandedScenario => {
  const category = scenarioTemplates[Math.floor(Math.random() * scenarioTemplates.length)];
  const scenario = category.scenarios[Math.floor(Math.random() * category.scenarios.length)];
  
  const ipRanges = ['192.168.1', '10.0.0', '172.16.0', '203.0.113', '198.51.100'];
  const sourceIP = `${ipRanges[Math.floor(Math.random() * ipRanges.length)]}.${Math.floor(Math.random() * 255)}`;
  
  const timestamp = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString();
  
  return {
    id: `scenario_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp,
    sourceIP,
    eventType: scenario.eventType,
    user: scenario.template.user,
    location: scenario.template.location,
    status: scenario.template.status,
    details: scenario.template.details,
    threatLevel: scenario.threatLevel,
    explanation: scenario.template.explanation,
    category: category.category,
    difficulty: scenario.difficulty,
    learningTip: scenario.template.learningTip,
    tags: [category.category, scenario.difficulty, scenario.threatLevel]
  };
};

export const getScenariosByCategory = (category: string): ExpandedScenario[] => {
  const categoryData = scenarioTemplates.find(c => c.category === category);
  if (!categoryData) return [];
  
  return categoryData.scenarios.map(scenario => ({
    id: `${category}_${scenario.eventType}`,
    timestamp: new Date().toISOString(),
    sourceIP: '192.168.1.100',
    eventType: scenario.eventType,
    user: scenario.template.user,
    location: scenario.template.location,
    status: scenario.template.status,
    details: scenario.template.details,
    threatLevel: scenario.threatLevel,
    explanation: scenario.template.explanation,
    category,
    difficulty: scenario.difficulty,
    learningTip: scenario.template.learningTip,
    tags: [category, scenario.difficulty, scenario.threatLevel]
  }));
};

export const generateMultipleScenarios = (count: number): ExpandedScenario[] => {
  return Array.from({ length: count }, () => generateExpandedScenario());
};
