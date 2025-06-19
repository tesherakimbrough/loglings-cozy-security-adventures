
export type ThreatLevel = 'safe' | 'warning' | 'critical';

export interface LogEntry {
  timestamp: string;
  sourceIP: string;
  eventType: string;
  user: string;
  location: string;
  status: string;
  details: string;
  threatLevel: ThreatLevel;
  explanation: string;
}

const safeEvents = [
  {
    eventType: 'Morning Login',
    user: 'sarah.bloom@cozytech.com',
    sourceIP: '192.168.1.42',
    location: 'Cozy Office, Downtown',
    status: 'SUCCESS',
    details: 'Sarah arrived at work and logged in with her morning coffee, just like every Tuesday',
    explanation: 'Pip is delighted! This is Sarah\'s usual routine - she always logs in around 9 AM from her office computer. Everything feels safe and peaceful here. 🌸'
  },
  {
    eventType: 'Document Access',
    user: 'alex.garden@cozytech.com',
    sourceIP: '10.0.1.88',
    location: 'Home Office, Maple Street',
    status: 'SUCCESS',
    details: 'Alex opened the team\'s shared recipe collection during lunch break',
    explanation: 'How wonderful! Alex is working from home today and took a sweet moment to browse the team\'s favorite lunch recipes. The Loglings love seeing such wholesome activities! 🍃'
  },
  {
    eventType: 'Email Sent',
    user: 'newsletter@cozytech.com',
    sourceIP: '172.16.3.10',
    location: 'Mail Server Room',
    status: 'SUCCESS',
    details: 'Weekly newsletter about upcoming tea time and company garden updates sent to all staff',
    explanation: 'The automated newsletter system is sharing lovely updates about the company\'s herb garden and next week\'s afternoon tea gathering. So heartwarming! 💌'
  }
];

const warningEvents = [
  {
    eventType: 'Late Night Login',
    user: 'jamie.owl@cozytech.com',
    sourceIP: '203.45.123.67',
    location: 'Coffee Shop, Distant City',
    status: 'SUCCESS',
    details: 'Jamie logged in at 11:47 PM from an unfamiliar coffee shop while traveling',
    explanation: 'Luna is curious! While Jamie might be traveling for work, logging in this late from a new location is unusual. It\'s probably fine, but worth a gentle check-in with Jamie tomorrow morning. ✨'
  },
  {
    eventType: 'Password Attempts',
    user: 'robin.keys@cozytech.com',
    sourceIP: '198.51.100.42',
    location: 'Unknown Location',
    status: 'FAILED',
    details: 'Someone tried Robin\'s password 3 times but couldn\'t remember the exact spelling',
    explanation: 'Luna wonders if Robin might have forgotten their password, or if someone else is trying to guess it. Either way, Robin should probably reset their password to feel safe again. 🔑'
  },
  {
    eventType: 'File Download',
    user: 'temp.helper@cozytech.com',
    sourceIP: '192.168.5.200',
    location: 'Remote Connection',
    status: 'SUCCESS',
    details: 'Temporary contractor downloaded customer contact list during weekend hours',
    explanation: 'Luna tilts her head thoughtfully. The contractor might need this for Monday\'s project, but downloading sensitive information during the weekend feels a bit unusual. A friendly reminder about data handling might be nice. 🤔'
  }
];

const criticalEvents = [
  {
    eventType: 'Suspicious Login',
    user: 'ceo.rivers@cozytech.com',
    sourceIP: '185.220.101.42',
    location: 'Far Away Country',
    status: 'SUCCESS',
    details: 'CEO account accessed from a location known for digital mischief, during a board meeting',
    explanation: 'Sage is very concerned! The CEO is currently in a board meeting down the hall, but someone from far away just logged into their account. This definitely needs immediate, but gentle, attention. 🚨'
  },
  {
    eventType: 'Mass Data Access',
    user: 'intern.newbie@cozytech.com',
    sourceIP: '167.94.138.15',
    location: 'Unknown Location',
    status: 'SUCCESS',
    details: 'New intern downloaded entire customer database (2GB) on their first day',
    explanation: 'Sage\'s protective instincts are tingling! A brand new intern shouldn\'t need access to everyone\'s information on day one. This needs caring but immediate attention to protect everyone\'s privacy. 🛡️'
  },
  {
    eventType: 'System Changes',
    user: 'maintenance.bot@cozytech.com',
    sourceIP: '192.168.1.50',
    location: 'Server Room',
    status: 'SUCCESS',
    details: 'Maintenance account turned off security monitoring systems during business hours',
    explanation: 'Sage feels deeply troubled! Someone used the maintenance account to turn off our protective systems while everyone is working. This is like removing all the garden fences while the rabbits are playing - we need to restore protection immediately! ⚠️'
  }
];

const generateTimestamp = (): string => {
  const now = new Date();
  const offset = Math.floor(Math.random() * 24 * 60 * 60 * 1000);
  const timestamp = new Date(now.getTime() - offset);
  return timestamp.toISOString().replace('T', ' ').substring(0, 19);
};

export const generateLogEntry = (): LogEntry => {
  const rand = Math.random();
  let events: typeof safeEvents;
  let threatLevel: ThreatLevel;

  // 40% safe, 35% warning, 25% critical
  if (rand < 0.4) {
    events = safeEvents;
    threatLevel = 'safe';
  } else if (rand < 0.75) {
    events = warningEvents;
    threatLevel = 'warning';
  } else {
    events = criticalEvents;
    threatLevel = 'critical';
  }

  const event = events[Math.floor(Math.random() * events.length)];

  return {
    timestamp: generateTimestamp(),
    sourceIP: event.sourceIP,
    eventType: event.eventType,
    user: event.user,
    location: event.location,
    status: event.status,
    details: event.details,
    threatLevel,
    explanation: event.explanation
  };
};
