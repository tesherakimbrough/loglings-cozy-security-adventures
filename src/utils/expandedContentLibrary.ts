
import { generateExpandedScenarios, getScenarioByDifficulty, getScenarioByCategory } from './softLaunchContentGenerator';
import { ThreatLevel } from './logGenerator';

interface LaunchReadyScenario {
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
  isPremium?: boolean;
  tags?: string[];
}

// Premium scenario templates for advanced users
const premiumScenarioTemplates = [
  {
    category: 'advanced_persistent_threat',
    difficulty: 'advanced' as const,
    threatLevel: 'critical',
    isPremium: true,
    baseScenario: {
      eventType: 'multi_stage_attack',
      details: 'Sophisticated APT campaign with lateral movement and data exfiltration',
      explanation: 'This represents a complex Advanced Persistent Threat with multiple attack vectors and long-term persistence.',
      learningTip: 'Look for patterns of behavior over time, not just individual events. APTs often use legitimate tools and blend in.'
    }
  },
  {
    category: 'zero_day_exploit',
    difficulty: 'advanced' as const,
    threatLevel: 'critical',
    isPremium: true,
    baseScenario: {
      eventType: 'unknown_vulnerability',
      details: 'Exploitation of previously unknown system vulnerability',
      explanation: 'This shows signs of a zero-day exploit targeting an unpatched vulnerability.',
      learningTip: 'Zero-day attacks often show unusual system behavior or unexpected process execution.'
    }
  },
  {
    category: 'supply_chain_attack',
    difficulty: 'advanced' as const,
    threatLevel: 'critical',
    isPremium: true,
    baseScenario: {
      eventType: 'compromised_software',
      details: 'Legitimate software update containing malicious code',
      explanation: 'This indicates a supply chain compromise where attackers inserted malicious code into legitimate software.',
      learningTip: 'Verify software signatures and monitor for unexpected behavior after updates.'
    }
  }
];

// Generate comprehensive scenario library (500+ scenarios)
export const generateLaunchReadyContent = () => {
  const scenarios: LaunchReadyScenario[] = [];
  
  // Generate base scenarios (300 free scenarios)
  const baseScenarios = generateExpandedScenarios(300);
  scenarios.push(...baseScenarios.map(scenario => ({
    ...scenario,
    isPremium: false,
    tags: [scenario.category, scenario.difficulty]
  })));
  
  // Generate premium scenarios (200 premium scenarios)
  for (let i = 0; i < 200; i++) {
    const template = premiumScenarioTemplates[i % premiumScenarioTemplates.length];
    scenarios.push({
      id: `premium_scenario_${i + 1}`,
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      sourceIP: `172.16.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      eventType: template.baseScenario.eventType,
      user: 'advanced_user',
      location: 'Enterprise-Network',
      status: 'alert',
      details: template.baseScenario.details,
      threatLevel: template.threatLevel as ThreatLevel,
      explanation: template.baseScenario.explanation,
      category: template.category,
      difficulty: template.difficulty,
      learningTip: template.baseScenario.learningTip,
      isPremium: true,
      tags: [template.category, template.difficulty, 'premium']
    });
  }
  
  return scenarios;
};

// Content access control based on user subscription
export const getAccessibleScenarios = (userTier: 'free' | 'basic' | 'premium' | 'team') => {
  const allScenarios = generateLaunchReadyContent();
  
  switch (userTier) {
    case 'free':
      return allScenarios.filter(s => !s.isPremium).slice(0, 50); // Limited free access
    case 'basic':
      return allScenarios.filter(s => !s.isPremium); // All free scenarios
    case 'premium':
    case 'team':
      return allScenarios; // Full access
    default:
      return allScenarios.filter(s => !s.isPremium).slice(0, 10); // Very limited
  }
};

// Learning path recommendations
export const getRecommendedLearningPath = (userGoal: string) => {
  const paths = {
    'soc_analyst': [
      'authentication',
      'network',
      'email',
      'incident_response',
      'threat_hunting'
    ],
    'pentester': [
      'network',
      'web_application',
      'privilege_escalation',
      'persistence',
      'lateral_movement'
    ],
    'security_manager': [
      'risk_assessment',
      'compliance',
      'incident_management',
      'security_governance',
      'vendor_management'
    ],
    'beginner': [
      'authentication',
      'basic_security',
      'phishing',
      'password_security',
      'social_engineering'
    ]
  };
  
  return paths[userGoal as keyof typeof paths] || paths.beginner;
};

export const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Free',
    price: 0,
    scenarioLimit: 50,
    features: ['Basic scenarios', 'Progress tracking', 'Community access']
  },
  basic: {
    name: 'Basic',
    price: 4.99,
    scenarioLimit: 300,
    features: ['All free scenarios', 'Daily challenges', 'Learning paths', 'Email support']
  },
  premium: {
    name: 'Premium',
    price: 9.99,
    scenarioLimit: 500,
    features: ['All scenarios', 'Advanced simulations', 'Personal coach', 'Priority support', 'Custom scenarios']
  },
  team: {
    name: 'Team',
    price: 19.99,
    scenarioLimit: 500,
    features: ['Everything in Premium', 'Team management', 'Progress analytics', 'Custom branding', 'API access']
  }
};
