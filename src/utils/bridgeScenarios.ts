
import { ThreatLevel } from './logGenerator';

export interface BridgeScenario {
  id: string;
  category: string;
  threatLevel: ThreatLevel;
  difficulty: 'beginner-plus' | 'pre-intermediate';
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

export const bridgeScenarios: BridgeScenario[] = [
  // Authentication Bridge Scenarios (Beginner-Plus)
  {
    id: 'bridge-auth-001',
    category: 'authentication',
    threatLevel: 'warning',
    difficulty: 'beginner-plus',
    timestamp: '2024-01-15 14:23:12',
    sourceIP: '203.0.113.45',
    eventType: 'Login Attempt',
    user: 'sarah.chen@company.com',
    location: 'Coffee Shop WiFi',
    status: 'SUCCESS',
    details: 'User logged in successfully from a public WiFi network during lunch hours. No previous logins from this location.',
    explanation: 'While the login was successful, public WiFi presents security risks. This warrants attention but isn\'t critical.',
    learningTip: 'Public WiFi logins should be monitored for unusual patterns or suspicious timing.',
    nextSteps: 'Monitor for any unusual activity from this session and consider implementing VPN requirements for public networks.',
    realWorldContext: 'Many companies now require VPN connections when accessing company resources from public networks.'
  },
  {
    id: 'bridge-auth-002',
    category: 'authentication',
    threatLevel: 'warning',
    difficulty: 'beginner-plus',
    timestamp: '2024-01-15 02:47:33',
    sourceIP: '192.168.1.156',
    eventType: 'Password Reset',
    user: 'mike.johnson@company.com',
    location: 'Home Office',
    status: 'SUCCESS',
    details: 'Password reset requested and completed at 2:47 AM. User has been working late frequently this month.',
    explanation: 'Late-night password resets could indicate account compromise or just a forgetful night owl employee.',
    learningTip: 'Consider the context: is this user known for working unusual hours? Check recent activity patterns.',
    nextSteps: 'Verify with the user that they initiated the reset and monitor subsequent login activity.',
    realWorldContext: 'Password resets at unusual hours are often the first sign of account compromise attempts.'
  },

  // Network Activity Bridge Scenarios
  {
    id: 'bridge-network-001',
    category: 'network',
    threatLevel: 'warning',
    difficulty: 'beginner-plus',
    timestamp: '2024-01-15 16:45:22',
    sourceIP: '10.0.1.87',
    eventType: 'Unusual Traffic Pattern',
    user: 'dev-server-03',
    location: 'Data Center',
    status: 'DETECTED',
    details: 'Server showing 300% increase in outbound traffic to external IPs. Traffic primarily on port 443 (HTTPS).',
    explanation: 'Significant traffic increases can indicate data exfiltration, but could also be legitimate bulk operations.',
    learningTip: 'Look for patterns: is this during business hours? Are the destination IPs known services?',
    nextSteps: 'Investigate the destination IPs and check if any bulk data operations were scheduled.',
    realWorldContext: 'Data exfiltration often appears as unusual traffic patterns, but legitimate cloud backups can look similar.'
  },
  {
    id: 'bridge-network-002',
    category: 'network',
    threatLevel: 'critical',
    difficulty: 'pre-intermediate',
    timestamp: '2024-01-15 03:22:18',
    sourceIP: '172.16.0.55',
    eventType: 'Port Scanning',
    user: 'unknown',
    location: 'Internal Network',
    status: 'BLOCKED',
    details: 'Systematic scanning of ports 21, 22, 23, 80, 443, 3389 across multiple internal subnets from compromised workstation.',
    explanation: 'Internal port scanning strongly suggests lateral movement by an attacker who has gained initial access.',
    learningTip: 'Internal reconnaissance is a key indicator of advanced persistent threats (APTs).',
    nextSteps: 'Immediately isolate the source system and conduct forensic analysis. Check for initial compromise vector.',
    realWorldContext: 'Lateral movement through port scanning is a common tactic in multi-stage cyber attacks.'
  },

  // File System Bridge Scenarios
  {
    id: 'bridge-file-001',
    category: 'file_system',
    threatLevel: 'warning',
    difficulty: 'beginner-plus',
    timestamp: '2024-01-15 19:33:41',
    sourceIP: '10.0.2.23',
    eventType: 'Mass File Access',
    user: 'jenny.parks@company.com',
    location: 'Marketing Dept',
    status: 'SUCCESS',
    details: 'User accessed 147 files from HR shared drive in 3 minutes. Files include salary data and performance reviews.',
    explanation: 'Rapid access to sensitive HR files by a marketing employee raises concerns about unauthorized data access.',
    learningTip: 'Consider: Does this user have legitimate business need for HR data? Is this normal behavior?',
    nextSteps: 'Check user permissions and verify business justification for accessing HR files.',
    realWorldContext: 'Insider threats often manifest as employees accessing data outside their normal job functions.'
  },
  {
    id: 'bridge-file-002',
    category: 'file_system',
    threatLevel: 'critical',
    difficulty: 'pre-intermediate',
    timestamp: '2024-01-15 12:15:07',
    sourceIP: '10.0.3.44',
    eventType: 'Ransomware Pattern',
    user: 'system',
    location: 'File Server',
    status: 'DETECTED',
    details: 'Mass file encryption detected: 2,847 files renamed with .locked extension. Process: "backup_manager.exe".',
    explanation: 'This is a classic ransomware attack pattern. The disguised process name is attempting to blend in.',
    learningTip: 'Ransomware often uses legitimate-sounding process names to avoid detection.',
    nextSteps: 'Immediately disconnect affected systems, activate incident response plan, and check backup integrity.',
    realWorldContext: 'Modern ransomware groups often spend weeks in networks before deploying encryption payloads.'
  },

  // Email Security Bridge Scenarios
  {
    id: 'bridge-email-001',
    category: 'email',
    threatLevel: 'warning',
    difficulty: 'beginner-plus',
    timestamp: '2024-01-15 09:12:33',
    sourceIP: '203.0.113.78',
    eventType: 'Suspicious Email',
    user: 'alex.rivera@company.com',
    location: 'Sales Office',
    status: 'QUARANTINED',
    details: 'Email with subject "Urgent: Wire Transfer Required" from CEO@company.co (note the .co instead of .com).',
    explanation: 'This is a business email compromise (BEC) attempt using domain spoofing to impersonate leadership.',
    learningTip: 'Always verify sender domains carefully. One character differences are common in phishing attempts.',
    nextSteps: 'Alert the recipient about the attempt and train staff on domain verification techniques.',
    realWorldContext: 'BEC attacks cost organizations billions annually, often targeting finance and executive staff.'
  },
  {
    id: 'bridge-email-002',
    category: 'email',
    threatLevel: 'critical',
    difficulty: 'pre-intermediate',
    timestamp: '2024-01-15 14:56:21',
    sourceIP: '10.0.1.95',
    eventType: 'Data Exfiltration',
    user: 'tom.wilson@company.com',
    location: 'Finance Dept',
    status: 'BLOCKED',
    details: 'Attempt to email 15MB zip file containing customer database exports to personal Gmail account.',
    explanation: 'This represents potential insider threat or compromised account attempting to steal sensitive customer data.',
    learningTip: 'Large file transfers to personal email accounts, especially with sensitive data, require immediate investigation.',
    nextSteps: 'Investigate user account, check for compromise, and review data access policies.',
    realWorldContext: 'Data exfiltration through email is a common vector for both insider threats and external attackers.'
  },

  // Application Security Bridge Scenarios
  {
    id: 'bridge-app-001',
    category: 'application',
    threatLevel: 'warning',
    difficulty: 'beginner-plus',
    timestamp: '2024-01-15 11:44:17',
    sourceIP: '203.0.113.91',
    eventType: 'SQL Injection Attempt',
    user: 'anonymous',
    location: 'External',
    status: 'BLOCKED',
    details: 'Web application blocked request containing "UNION SELECT * FROM users--" in login form.',
    explanation: 'This is a basic SQL injection attempt trying to extract user data from the database.',
    learningTip: 'SQL injection remains one of the most common web application attack vectors.',
    nextSteps: 'Review application input validation and consider additional web application firewall rules.',
    realWorldContext: 'OWASP consistently ranks injection attacks as a top web application security risk.'
  },
  {
    id: 'bridge-app-002',
    category: 'application',
    threatLevel: 'critical',
    difficulty: 'pre-intermediate',
    timestamp: '2024-01-15 20:31:45',
    sourceIP: '198.51.100.23',
    eventType: 'Privilege Escalation',
    user: 'service_account',
    location: 'Web Server',
    status: 'SUCCESS',
    details: 'Service account successfully elevated to admin privileges through buffer overflow exploit in legacy component.',
    explanation: 'Successful privilege escalation indicates a serious compromise that grants attacker administrative access.',
    learningTip: 'Buffer overflow exploits in legacy systems are difficult to patch but extremely dangerous.',
    nextSteps: 'Immediately contain the system, revoke elevated privileges, and begin incident response procedures.',
    realWorldContext: 'Legacy systems often become the weakest link in otherwise secure environments.'
  },

  // Physical Security Bridge Scenarios
  {
    id: 'bridge-physical-001',
    category: 'physical',
    threatLevel: 'warning',
    difficulty: 'beginner-plus',
    timestamp: '2024-01-15 07:23:44',
    sourceIP: '10.0.4.12',
    eventType: 'Badge Access',
    user: 'maria.garcia@company.com',
    location: 'Server Room',
    status: 'SUCCESS',
    details: 'IT manager accessed server room at 7:23 AM, 2 hours before normal arrival time. No scheduled maintenance.',
    explanation: 'Early access to sensitive areas should be verified, even for authorized personnel.',
    learningTip: 'Unusual timing for physical access, even by authorized users, warrants verification.',
    nextSteps: 'Verify with the employee that this access was legitimate and check for any system changes.',
    realWorldContext: 'Physical security breaches often involve compromised credentials or social engineering.'
  },
  {
    id: 'bridge-physical-002',
    category: 'physical',
    threatLevel: 'critical',
    difficulty: 'pre-intermediate',
    timestamp: '2024-01-15 23:47:12',
    sourceIP: '10.0.4.33',
    eventType: 'Unauthorized Access',
    user: 'unknown_device',
    location: 'Executive Floor',
    status: 'DETECTED',
    details: 'Unregistered device connected to network port in CEO office after hours. Device attempting DHCP lease.',
    explanation: 'Unknown device in executive area after hours suggests physical infiltration or malicious insider activity.',
    learningTip: 'Physical network access bypasses many security controls and provides direct internal access.',
    nextSteps: 'Immediately disconnect the device, secure the area, and review physical access logs.',
    realWorldContext: 'Physical access to network infrastructure remains a high-value target for sophisticated attackers.'
  },

  // Advanced Authentication Scenarios
  {
    id: 'bridge-auth-003',
    category: 'authentication',
    threatLevel: 'critical',
    difficulty: 'pre-intermediate',
    timestamp: '2024-01-15 15:17:23',
    sourceIP: '192.168.1.78',
    eventType: 'Credential Stuffing',
    user: 'multiple_accounts',
    location: 'Multiple',
    status: 'PARTIAL_SUCCESS',
    details: 'Automated login attempts against 247 user accounts from single IP. 3 successful logins detected.',
    explanation: 'This is a credential stuffing attack using previously breached passwords. Some accounts were compromised.',
    learningTip: 'Credential stuffing exploits password reuse across multiple services.',
    nextSteps: 'Force password resets for successful logins, implement account lockout policies, and consider MFA.',
    realWorldContext: 'Billions of credentials from data breaches are used in automated credential stuffing attacks.'
  },

  // Advanced Network Scenarios
  {
    id: 'bridge-network-003',
    category: 'network',
    threatLevel: 'warning',
    difficulty: 'pre-intermediate',
    timestamp: '2024-01-15 13:28:55',
    sourceIP: '10.0.5.67',
    eventType: 'DNS Tunneling',
    user: 'workstation_045',
    location: 'Research Lab',
    status: 'DETECTED',
    details: 'Unusual DNS queries with large TXT record requests to external domain. Pattern suggests data exfiltration.',
    explanation: 'DNS tunneling is a sophisticated technique to bypass firewall restrictions and exfiltrate data.',
    learningTip: 'DNS tunneling can bypass traditional network monitoring by hiding data in DNS queries.',
    nextSteps: 'Block the suspicious domain, investigate the source system, and enhance DNS monitoring.',
    realWorldContext: 'Advanced persistent threats often use DNS tunneling to maintain covert communication channels.'
  },

  // Advanced File System Scenarios
  {
    id: 'bridge-file-003',
    category: 'file_system',
    threatLevel: 'warning',
    difficulty: 'pre-intermediate',
    timestamp: '2024-01-15 16:42:18',
    sourceIP: '10.0.2.89',
    eventType: 'Shadow Copy Deletion',
    user: 'admin_service',
    location: 'Domain Controller',
    status: 'SUCCESS',
    details: 'System shadow copies deleted using vssadmin.exe. Command executed via PowerShell remoting.',
    explanation: 'Shadow copy deletion is often a precursor to ransomware deployment, eliminating recovery options.',
    learningTip: 'Attackers delete shadow copies to prevent easy recovery from ransomware attacks.',
    nextSteps: 'Investigate the source of the command, verify admin account integrity, and check backup systems.',
    realWorldContext: 'Modern ransomware groups always attempt to delete backups and shadow copies before encryption.'
  },

  // Advanced Email Scenarios
  {
    id: 'bridge-email-003',
    category: 'email',
    threatLevel: 'warning',
    difficulty: 'pre-intermediate',
    timestamp: '2024-01-15 10:33:27',
    sourceIP: '203.0.113.156',
    eventType: 'Spear Phishing',
    user: 'cfo@company.com',
    location: 'External',
    status: 'DELIVERED',
    details: 'Highly targeted email to CFO containing recent board meeting details and urgent investment opportunity. Link leads to credential harvesting site.',
    explanation: 'This spear phishing attack shows inside knowledge, suggesting reconnaissance or insider threat.',
    learningTip: 'Spear phishing uses personal information to increase credibility and success rates.',
    nextSteps: 'Alert the CFO, investigate information sources, and implement executive protection measures.',
    realWorldContext: 'C-level executives are high-value targets for sophisticated social engineering attacks.'
  },

  // Advanced Application Scenarios
  {
    id: 'bridge-app-003',
    category: 'application',
    threatLevel: 'critical',
    difficulty: 'pre-intermediate',
    timestamp: '2024-01-15 18:55:41',
    sourceIP: '198.51.100.78',
    eventType: 'Zero-Day Exploit',
    user: 'web_application',
    location: 'DMZ',
    status: 'EXPLOITED',
    details: 'Unknown exploit against customer portal resulted in remote code execution. Payload downloaded additional tools.',
    explanation: 'Zero-day exploits use previously unknown vulnerabilities and are extremely dangerous.',
    learningTip: 'Zero-day attacks often show unusual application behavior before signature-based detection.',
    nextSteps: 'Immediately isolate the application, begin incident response, and contact security vendors.',
    realWorldContext: 'Zero-day exploits are often used in targeted attacks against high-value organizations.'
  },

  // Crypto Mining Scenario
  {
    id: 'bridge-crypto-001',
    category: 'system',
    threatLevel: 'warning',
    difficulty: 'pre-intermediate',
    timestamp: '2024-01-15 21:14:32',
    sourceIP: '10.0.3.91',
    eventType: 'Cryptocurrency Mining',
    user: 'background_process',
    location: 'Employee Workstation',
    status: 'DETECTED',
    details: 'High CPU usage from browser process connecting to known mining pool. Process disguised as "chrome_helper.exe".',
    explanation: 'Cryptojacking uses victim resources to mine cryptocurrency, often through compromised websites or malware.',
    learningTip: 'Cryptocurrency mining can indicate browser compromise or malicious website visits.',
    nextSteps: 'Terminate the process, scan for malware, and implement mining pool blocking.',
    realWorldContext: 'Cryptojacking has become a popular low-risk, high-reward attack vector for cybercriminals.'
  },

  // Supply Chain Attack Scenario
  {
    id: 'bridge-supply-001',
    category: 'application',
    threatLevel: 'critical',
    difficulty: 'pre-intermediate',
    timestamp: '2024-01-15 08:45:19',
    sourceIP: '10.0.1.44',
    eventType: 'Malicious Update',
    user: 'update_service',
    location: 'All Workstations',
    status: 'INSTALLED',
    details: 'Software update from trusted vendor contains unexpected network communication to suspicious domains.',
    explanation: 'Supply chain attacks compromise trusted software to distribute malware to multiple organizations.',
    learningTip: 'Even trusted software updates can be compromised in sophisticated supply chain attacks.',
    nextSteps: 'Isolate affected systems, contact the vendor, and implement additional update verification.',
    realWorldContext: 'Supply chain attacks like SolarWinds demonstrate the severe impact of compromised trusted software.'
  }
];

export const getBridgeScenario = (difficulty: 'beginner-plus' | 'pre-intermediate', usedIds: string[] = []): BridgeScenario | null => {
  const availableScenarios = bridgeScenarios.filter(
    scenario => scenario.difficulty === difficulty && !usedIds.includes(scenario.id)
  );
  
  if (availableScenarios.length === 0) return null;
  
  return availableScenarios[Math.floor(Math.random() * availableScenarios.length)];
};
