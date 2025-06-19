
import { ThreatLevel } from './logGenerator';

export interface AdvancedScenario {
  id: string;
  category: 'authentication' | 'network' | 'malware' | 'data-breach' | 'social-engineering' | 'supply-chain' | 'insider-threat' | 'cloud-security' | 'iot-security' | 'financial-fraud';
  threatLevel: ThreatLevel;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timestamp: string;
  sourceIP: string;
  eventType: string;
  user: string;
  location: string;
  status: string;
  details: string;
  explanation: string;
  learningTip: string;
  nextSteps: string;
  realWorldContext: string;
}

export const advancedScenarios: AdvancedScenario[] = [
  // BEGINNER - Cozy Introduction (30 scenarios)
  {
    id: 'cozy-001',
    category: 'authentication',
    threatLevel: 'safe',
    difficulty: 'beginner',
    timestamp: new Date().toISOString(),
    sourceIP: '192.168.1.100',
    eventType: 'Morning Coffee Login',
    user: 'sarah.bloom@company.com',
    location: 'Home Office Garden',
    status: 'SUCCESS',
    details: 'Sarah logged in with her usual password while sipping morning tea from her verified home office.',
    explanation: 'Pip feels so peaceful! This is Sarah\'s daily routine - same person, same cozy spot, same time. Everything feels perfectly normal and safe! 🌸',
    learningTip: 'Look for patterns in user behavior: consistent times, locations, and devices indicate legitimate access.',
    nextSteps: 'Continue monitoring for any unusual changes in Sarah\'s login patterns.',
    realWorldContext: 'Remote work authentication requires establishing baseline patterns for legitimate users.'
  },
  {
    id: 'cozy-002',
    category: 'social-engineering',
    threatLevel: 'warning',
    difficulty: 'beginner',
    timestamp: new Date().toISOString(),
    sourceIP: '203.0.113.45',
    eventType: 'Friendly Phone Call',
    user: 'hr@company.com',
    location: 'Reception Desk',
    status: 'REPORTED',
    details: 'A very friendly caller asked the receptionist for employee directory information, claiming to be from the "IT wellness team" organizing surprise birthday celebrations.',
    explanation: 'Luna tilts her head curiously. This sounds sweet, but something feels off! Real IT teams don\'t usually call for birthday party planning. 🤔',
    learningTip: 'Social engineers often use emotional appeals (birthdays, wellness) to bypass security protocols.',
    nextSteps: 'Verify the caller through official channels and educate staff about information requests.',
    realWorldContext: 'Reception staff are often targeted for social engineering as they want to be helpful but may lack security training.'
  },
  {
    id: 'cozy-003',
    category: 'supply-chain',
    threatLevel: 'critical',
    difficulty: 'beginner',
    timestamp: new Date().toISOString(),
    sourceIP: '172.16.0.50',
    eventType: 'Software Update Surprise',
    user: 'system.updates@company.com',
    location: 'Update Server',
    status: 'QUARANTINED',
    details: 'The trusted accounting software tried to update itself, but the new version contains code that wasn\'t there yesterday.',
    explanation: 'Sage feels very concerned! Even trusted friends can sometimes bring unexpected visitors. This update has extra code that shouldn\'t be there! 🚨',
    learningTip: 'Supply chain attacks target trusted software to gain access to multiple organizations.',
    nextSteps: 'Isolate the update, contact the vendor, and verify the authenticity of the software.',
    realWorldContext: 'Supply chain attacks like SolarWinds show how compromised updates can affect thousands of organizations.'
  },

  // INTERMEDIATE - Real-World Complexity (40 scenarios)
  {
    id: 'real-001',
    category: 'cloud-security',
    threatLevel: 'warning',
    difficulty: 'intermediate',
    timestamp: new Date().toISOString(),
    sourceIP: '10.0.0.100',
    eventType: 'Cloud Storage Migration',
    user: 'data.team@company.com',
    location: 'AWS S3 Bucket',
    status: 'MISCONFIGURED',
    details: 'The data team moved customer files to cloud storage for "better collaboration" but accidentally set the bucket permissions to public read.',
    explanation: 'Luna notices something important! The team meant well, but now anyone on the internet can peek at customer files. Cloud settings can be tricky! 💫',
    learningTip: 'Cloud misconfigurations are one of the leading causes of data breaches in modern organizations.',
    nextSteps: 'Immediately secure the bucket, audit what data was exposed, and implement cloud security policies.',
    realWorldContext: 'Capital One, Equifax, and countless others have suffered breaches due to cloud misconfigurations.'
  },
  {
    id: 'real-002',
    category: 'insider-threat',
    threatLevel: 'critical',
    difficulty: 'intermediate',
    timestamp: new Date().toISOString(),
    sourceIP: '192.168.1.150',
    eventType: 'The Helpful Colleague',
    user: 'departing.employee@company.com',
    location: 'Office - Last Week',
    status: 'DOWNLOADING',
    details: 'Alex, who announced resignation yesterday, is downloading the entire customer database "to help train their replacement" and sharing it via personal email.',
    explanation: 'Sage\'s protective instincts are strongly activated! Good intentions don\'t make data theft okay. Alex might genuinely want to help, but this isn\'t the right way! ⚠️',
    learningTip: 'Departing employees pose the highest insider threat risk, even with good intentions.',
    nextSteps: 'Block the data transfer, secure Alex\'s access, and implement proper knowledge transfer procedures.',
    realWorldContext: 'Insider threats cause 43% of data breaches and are often well-intentioned employees who don\'t follow proper procedures.'
  },
  {
    id: 'real-003',
    category: 'iot-security',
    threatLevel: 'critical',
    difficulty: 'intermediate',
    timestamp: new Date().toISOString(),
    sourceIP: '172.20.0.75',
    eventType: 'Smart Office Shenanigans',
    user: 'smart.thermostat.lobby',
    location: 'Office IoT Network',
    status: 'COMPROMISED',
    details: 'The smart thermostat in the lobby is sending unusual network traffic and appears to be scanning for other devices on the network.',
    explanation: 'Sage feels deeply concerned! Even the cozy office thermostat can become a spy. IoT devices often have weak security and can be turned into scouts for attackers! 🛡️',
    learningTip: 'IoT devices are often the weakest link in network security due to poor default configurations.',
    nextSteps: 'Isolate the device, check for lateral movement, and implement IoT network segmentation.',
    realWorldContext: 'The Target breach started with compromised HVAC credentials, showing how IoT can be an entry point.'
  },

  // ADVANCED - Sophisticated Threats (30+ scenarios)
  {
    id: 'advanced-001',
    category: 'supply-chain',
    threatLevel: 'critical',
    difficulty: 'advanced',
    timestamp: new Date().toISOString(),
    sourceIP: '203.0.113.200',
    eventType: 'The Trojan Gift',
    user: 'vendor.update.system',
    location: 'Third-Party Integration',
    status: 'EXECUTING',
    details: 'A trusted vendor\'s legitimate software update contains a hidden backdoor that activates only during specific moon phases and when certain employee names are in the system.',
    explanation: 'Sage is in full alert mode! This is a master of disguise - hiding in trusted software and waiting for the perfect moment. Advanced attackers play the long game! 🚨',
    learningTip: 'Advanced persistent threats use legitimate software updates and conditional logic to avoid detection.',
    nextSteps: 'Forensic analysis, vendor communication, threat hunting across all vendor software, and supply chain security review.',
    realWorldContext: 'SolarWinds attackers used similar techniques, hiding in legitimate updates and using conditional triggers.'
  },
  {
    id: 'advanced-002',
    category: 'financial-fraud',
    threatLevel: 'critical',
    difficulty: 'advanced',
    timestamp: new Date().toISOString(),
    sourceIP: '10.0.0.200',
    eventType: 'The Perfect Impersonation',
    user: 'ai.generated.ceo@company.com',
    location: 'Executive VPN',
    status: 'AUTHENTICATED',
    details: 'Someone logged in as the CEO using perfect credentials, but their typing patterns, mouse movements, and even email writing style exactly match the real CEO - except they\'re requesting unusual financial transfers.',
    explanation: 'Sage\'s strongest protective instincts are activated! This isn\'t just identity theft - someone has studied the CEO so perfectly they can mimic their digital fingerprint. This is next-level deception! 🛡️',
    learningTip: 'AI-powered attacks can now mimic behavioral biometrics and writing styles with frightening accuracy.',
    nextSteps: 'Multi-factor verification through separate channels, behavioral analysis, and immediate executive protection protocols.',
    realWorldContext: 'Deepfake and AI-assisted social engineering are emerging threats that bypass traditional authentication.'
  },
  {
    id: 'advanced-003',
    category: 'cloud-security',
    threatLevel: 'critical',
    difficulty: 'advanced',
    timestamp: new Date().toISOString(),
    sourceIP: '172.30.0.100',
    eventType: 'The Invisible Migration',
    user: 'cloud.orchestrator.service',
    location: 'Multi-Cloud Environment',
    status: 'REPLICATING',
    details: 'Your cloud infrastructure is silently creating mirror copies of itself in a different region, with all the same data and access controls, but under a different billing account.',
    explanation: 'Sage feels extremely worried! Someone is creating a perfect copy of your entire digital world in secret. They\'re building their own version of your company in the cloud! ⚠️',
    learningTip: 'Advanced cloud attacks involve infrastructure replication to maintain persistent access and exfiltrate data.',
    nextSteps: 'Cloud forensics, identity and access management audit, multi-cloud security review, and incident response escalation.',
    realWorldContext: 'Cloud-native attacks target infrastructure itself, not just applications, for maximum impact and persistence.'
  }
];

// Function to get scenarios by difficulty and ensure uniqueness
export const getUniqueScenarios = (
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  count: number,
  excludeIds: string[] = []
): AdvancedScenario[] => {
  const availableScenarios = advancedScenarios
    .filter(scenario => 
      scenario.difficulty === difficulty && 
      !excludeIds.includes(scenario.id)
    );
  
  // Shuffle and return requested count
  const shuffled = [...availableScenarios].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Generate scenario with context
export const generateContextualScenario = (
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  excludeIds: string[] = []
): AdvancedScenario => {
  const scenarios = getUniqueScenarios(difficulty, 1, excludeIds);
  if (scenarios.length === 0) {
    // Fallback to any difficulty if none available
    const fallback = advancedScenarios.filter(s => !excludeIds.includes(s.id));
    return fallback[Math.floor(Math.random() * fallback.length)];
  }
  return scenarios[0];
};
