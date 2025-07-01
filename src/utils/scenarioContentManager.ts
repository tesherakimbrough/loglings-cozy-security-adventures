
import { ThreatLevel } from './logGenerator';
import { AdvancedScenario } from './advancedScenarioDatabase';

export interface ScenarioTemplate {
  id: string;
  category: string;
  threatLevel: ThreatLevel;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  template: {
    eventType: string[];
    userTypes: string[];
    locations: string[];
    statusOptions: string[];
    detailsTemplate: string;
    explanationTemplate: string;
    learningTipTemplate: string;
  };
  variables: Record<string, string[]>;
}

export interface ScenarioGenerationConfig {
  totalNeeded: number;
  difficultyDistribution: {
    beginner: number;
    intermediate: number;
    advanced: number;
  };
  categoryDistribution: Record<string, number>;
  excludeIds: string[];
}

// Expanded scenario templates for systematic generation
const SCENARIO_TEMPLATES: ScenarioTemplate[] = [
  // Authentication Templates
  {
    id: 'auth-normal-login',
    category: 'authentication',
    threatLevel: 'safe',
    difficulty: 'beginner',
    template: {
      eventType: ['User Login', 'Morning Login', 'System Access', 'Authentication Success'],
      userTypes: ['employee', 'contractor', 'intern', 'manager'],
      locations: ['office', 'home office', 'company network', 'workstation'],
      statusOptions: ['SUCCESS'],
      detailsTemplate: '{user} logged in successfully from {location} during {timeContext} using {method}.',
      explanationTemplate: 'This appears to be normal authentication activity. {user} is accessing from their usual {location} during expected hours.',
      learningTipTemplate: 'Normal login patterns help establish baselines for detecting anomalies.'
    },
    variables: {
      timeContext: ['business hours', 'morning routine', 'typical work time', 'scheduled shift'],
      method: ['company laptop', 'secure workstation', 'verified device', 'authorized terminal']
    }
  },
  {
    id: 'auth-suspicious-login',
    category: 'authentication',
    threatLevel: 'critical',
    difficulty: 'beginner',
    template: {
      eventType: ['Failed Login Attempt', 'Unauthorized Access', 'Brute Force Attack', 'Security Breach'],
      userTypes: ['admin', 'system administrator', 'privileged user', 'service account'],
      locations: ['unknown location', 'foreign country', 'suspicious IP', 'tor network'],
      statusOptions: ['FAILED', 'BLOCKED', 'DENIED'],
      detailsTemplate: 'Multiple failed login attempts for {user} account from {location}. {attemptCount} attempts in {timeFrame}.',
      explanationTemplate: 'This is a serious security concern! Someone is trying to break into the {user} account from an unusual location.',
      learningTipTemplate: 'Multiple failed logins from unusual locations indicate potential brute force attacks.'
    },
    variables: {
      attemptCount: ['15', '23', '47', '89', '156'],
      timeFrame: ['5 minutes', '10 minutes', '30 seconds', '2 minutes']
    }
  },

  // Network Security Templates
  {
    id: 'network-normal-traffic',
    category: 'network',
    threatLevel: 'safe',
    difficulty: 'beginner',
    template: {
      eventType: ['Network Access', 'File Transfer', 'Data Sync', 'Backup Operation'],
      userTypes: ['backup service', 'system process', 'scheduled task', 'automated system'],
      locations: ['internal network', 'data center', 'secure server', 'backup facility'],
      statusOptions: ['SUCCESS', 'COMPLETED'],
      detailsTemplate: '{user} performed {operation} transferring {dataSize} to {destination} during {timeContext}.',
      explanationTemplate: 'This appears to be routine network activity. {operation} during {timeContext} is expected behavior.',
      learningTipTemplate: 'Scheduled operations during maintenance windows are normal and necessary.'
    },
    variables: {
      operation: ['scheduled backup', 'data synchronization', 'system update', 'routine maintenance'],
      dataSize: ['2.3GB', '156MB', '4.7GB', '823MB'],
      destination: ['backup server', 'cloud storage', 'disaster recovery site', 'secondary datacenter'],
      timeContext: ['maintenance window', 'off-hours', 'scheduled downtime', 'backup window']
    }
  },
  {
    id: 'network-suspicious-traffic',
    category: 'network',
    threatLevel: 'warning',
    difficulty: 'intermediate',
    template: {
      eventType: ['Unusual Network Activity', 'Data Exfiltration', 'Suspicious Transfer', 'Anomalous Traffic'],
      userTypes: ['workstation', 'compromised system', 'infected device', 'unknown process'],
      locations: ['employee desk', 'conference room', 'guest network', 'wifi access point'],
      statusOptions: ['DETECTED', 'FLAGGED', 'MONITORED'],
      detailsTemplate: '{user} showing unusual outbound traffic: {dataSize} transferred to {destination} over {timeFrame}.',
      explanationTemplate: 'This network activity is concerning. Large data transfers to external locations may indicate data theft.',
      learningTipTemplate: 'Monitor unusual traffic patterns, especially large transfers to external destinations.'
    },
    variables: {
      dataSize: ['500MB', '1.2GB', '3.7GB', '847MB'],
      destination: ['external server', 'suspicious IP', 'unknown domain', 'foreign server'],
      timeFrame: ['10 minutes', '5 minutes', '30 seconds', '2 hours']
    }
  },

  // Email Security Templates
  {
    id: 'email-normal',
    category: 'email_security',
    threatLevel: 'safe',
    difficulty: 'beginner',
    template: {
      eventType: ['Email Sent', 'Internal Communication', 'Team Message', 'Project Update'],
      userTypes: ['team member', 'project manager', 'colleague', 'department head'],
      locations: ['office', 'conference room', 'workstation', 'meeting room'],
      statusOptions: ['DELIVERED', 'SUCCESS'],
      detailsTemplate: '{user} sent internal email to team about {subject} during {timeContext}.',
      explanationTemplate: 'This is normal internal communication. Team emails during business hours are expected.',
      learningTipTemplate: 'Internal emails between known colleagues during business hours are typically safe.'
    },
    variables: {
      subject: ['project deadline', 'meeting notes', 'weekly update', 'status report'],
      timeContext: ['business hours', 'team meeting', 'project discussion', 'daily standup']
    }
  },
  {
    id: 'email-phishing',
    category: 'email_security',
    threatLevel: 'critical',
    difficulty: 'intermediate',
    template: {
      eventType: ['Phishing Email', 'Social Engineering', 'Suspicious Message', 'Fraud Attempt'],
      userTypes: ['external sender', 'impersonator', 'scammer', 'threat actor'],
      locations: ['external', 'internet', 'suspicious domain', 'spoofed address'],
      statusOptions: ['QUARANTINED', 'BLOCKED', 'FLAGGED'],
      detailsTemplate: 'Email from {sender} claiming to be {impersonation} requesting {request}. Contains {suspiciousElement}.',
      explanationTemplate: 'This is a {attackType} attack! The sender is trying to trick users into {goal}.',
      learningTipTemplate: 'Always verify sender identity through official channels before responding to urgent requests.'
    },
    variables: {
      sender: ['CEO@company.co', 'admin@companyy.com', 'IT-Support@company.org', 'security@company.co'],
      impersonation: ['company CEO', 'IT department', 'security team', 'HR manager'],
      request: ['wire transfer', 'password reset', 'urgent action', 'personal information'],
      suspiciousElement: ['suspicious link', 'urgent language', 'grammar errors', 'domain misspelling'],
      attackType: ['business email compromise', 'spear phishing', 'CEO fraud', 'social engineering'],
      goal: ['stealing credentials', 'financial fraud', 'data theft', 'system access']
    }
  }
];

// Content generation engine
export class ScenarioContentManager {
  private usedCombinations: Set<string> = new Set();

  generateScenarioFromTemplate(template: ScenarioTemplate): AdvancedScenario {
    const randomChoice = <T>(array: T[]): T => 
      array[Math.floor(Math.random() * array.length)];

    // Generate unique combination
    let combinationKey: string;
    let attempts = 0;
    do {
      const eventType = randomChoice(template.template.eventType);
      const userType = randomChoice(template.template.userTypes);
      const location = randomChoice(template.template.locations);
      const status = randomChoice(template.template.statusOptions);
      
      combinationKey = `${template.id}-${eventType}-${userType}-${location}`;
      attempts++;
    } while (this.usedCombinations.has(combinationKey) && attempts < 10);

    this.usedCombinations.add(combinationKey);

    // Generate variable substitutions
    const variables: Record<string, string> = {};
    Object.entries(template.variables).forEach(([key, options]) => {
      variables[key] = randomChoice(options);
    });
    variables.user = randomChoice(template.template.userTypes);
    variables.location = randomChoice(template.template.locations);

    // Apply template substitutions
    const substituteTemplate = (text: string, vars: Record<string, string>): string => {
      return text.replace(/\{(\w+)\}/g, (match, key) => vars[key] || match);
    };

    return {
      id: `generated-${template.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      category: template.category as any,
      threatLevel: template.threatLevel,
      difficulty: template.difficulty,
      timestamp: new Date().toISOString(),
      sourceIP: this.generateContextualIP(template.category),
      eventType: randomChoice(template.template.eventType),
      user: `${variables.user}@company.com`,
      location: variables.location,
      status: randomChoice(template.template.statusOptions),
      details: substituteTemplate(template.template.detailsTemplate, variables),
      explanation: substituteTemplate(template.template.explanationTemplate, variables),
      learningTip: substituteTemplate(template.template.learningTipTemplate, variables),
      nextSteps: this.generateNextSteps(template.threatLevel),
      realWorldContext: this.generateRealWorldContext(template.category)
    };
  }

  generateScenarioSet(config: ScenarioGenerationConfig): AdvancedScenario[] {
    const scenarios: AdvancedScenario[] = [];
    
    // Calculate how many scenarios per difficulty
    const counts = {
      beginner: Math.floor(config.totalNeeded * config.difficultyDistribution.beginner),
      intermediate: Math.floor(config.totalNeeded * config.difficultyDistribution.intermediate),
      advanced: Math.floor(config.totalNeeded * config.difficultyDistribution.advanced)
    };

    // Generate scenarios for each difficulty
    (['beginner', 'intermediate', 'advanced'] as const).forEach(difficulty => {
      const templatesForDifficulty = SCENARIO_TEMPLATES.filter(t => t.difficulty === difficulty);
      const neededCount = counts[difficulty];
      
      for (let i = 0; i < neededCount; i++) {
        const template = templatesForDifficulty[i % templatesForDifficulty.length];
        const scenario = this.generateScenarioFromTemplate(template);
        scenarios.push(scenario);
      }
    });

    // Shuffle to ensure variety
    return this.shuffleArray(scenarios);
  }

  private generateContextualIP(category: string): string {
    const internalIPs = ['192.168.1.100', '10.0.0.50', '172.16.0.200'];
    const externalIPs = ['203.0.113.45', '198.51.100.33', '192.0.2.146'];
    const suspiciousIPs = ['45.142.122.88', '185.220.101.47', '94.102.49.190'];
    
    if (category === 'network' || category === 'email_security') {
      return [...externalIPs, ...suspiciousIPs][Math.floor(Math.random() * 6)];
    }
    
    return [...internalIPs, ...externalIPs][Math.floor(Math.random() * 6)];
  }

  private generateNextSteps(threatLevel: ThreatLevel): string {
    const steps = {
      safe: [
        'Continue monitoring for any unusual changes in patterns.',
        'Document this activity for baseline establishment.',
        'No immediate action required, maintain regular monitoring.'
      ],
      warning: [
        'Investigate further and verify user intentions.',
        'Check for additional suspicious activity.',
        'Consider implementing additional monitoring.',
        'Verify through official channels.'
      ],
      critical: [
        'Immediately isolate affected systems.',
        'Begin incident response procedures.',
        'Contact security team and management.',
        'Preserve evidence for forensic analysis.',
        'Implement containment measures.'
      ]
    };
    
    const options = steps[threatLevel] || steps.safe;
    return options[Math.floor(Math.random() * options.length)];
  }

  private generateRealWorldContext(category: string): string {
    const contexts = {
      authentication: [
        'Password attacks remain one of the most common attack vectors.',
        'Multi-factor authentication significantly reduces account compromise risk.',
        'Credential stuffing attacks exploit password reuse across services.'
      ],
      network: [
        'Network monitoring is essential for detecting data exfiltration.',
        'Unusual traffic patterns often indicate compromise.',
        'Segmentation helps contain potential breaches.'
      ],
      email_security: [
        'Email remains the primary attack vector for most cyber incidents.',
        'Business email compromise causes billions in losses annually.',
        'User education is critical for email security.'
      ]
    };
    
    const categoryContexts = contexts[category as keyof typeof contexts] || contexts.authentication;
    return categoryContexts[Math.floor(Math.random() * categoryContexts.length)];
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  getAvailableTemplates(): ScenarioTemplate[] {
    return SCENARIO_TEMPLATES;
  }

  resetUsedCombinations(): void {
    this.usedCombinations.clear();
  }
}

// Export singleton instance
export const scenarioContentManager = new ScenarioContentManager();
