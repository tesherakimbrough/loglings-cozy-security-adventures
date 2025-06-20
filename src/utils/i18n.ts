
export type Language = 'en' | 'es' | 'fr' | 'ja' | 'ko' | 'zh';

export const languageNames = {
  en: 'English',
  es: 'Español', 
  fr: 'Français',
  ja: '日本語',
  ko: '한국어',
  zh: '中文'
};

export const getLanguageFlag = (lang: Language): string => {
  const flags = {
    en: '🇺🇸',
    es: '🇪🇸',
    fr: '🇫🇷', 
    ja: '🇯🇵',
    ko: '🇰🇷',
    zh: '🇨🇳'
  };
  return flags[lang];
};

export interface Translations {
  of: string;
  dailyChallenge: string;
  joy: string;
  whatIsLoglings: string;
  cozy: string;
  professionalTraining: string;
  lovinglyCreatedBy: string;
  language: string;
  tutorial: string;
  beginAdventure: string;
  gameSubtitle: string;
  chapter: string;
  analystPip: string;
  detectiveLuna: string;
  guardianSage: string;
  pipDescription: string;
  lunaDescription: string;
  sageDescription: string;
  
  // GameIntroFeatures keys
  analyzeComplexSecurityLogs: string;
  practiceIncidentResponse: string;
  learnThreatIntelligence: string;
  buildSkillsForSOC: string;
  masteringAdvancedScenarios: string;
  properIncidentHandling: string;
  identifyingSubtleThreats: string;
  professionalSkillBadges: string;
  readGentleLogStories: string;
  helpLoglingsUnderstand: string;
  learnTogetherEveryChoice: string;
  collectCozyMoments: string;
  helpingLoglingsFeel: string;
  noticingCuriousThings: string;
  learningSomethingNew: string;
  gentleEncouragement: string;
  yourAdventureAwaits: string;
  professional: string;
  whatYoullDo: string;
  howYoullGrow: string;
  
  // GameIntroGuides keys
  analystPipDescription: string;
  detectiveLunaDescription: string;
  guardianSageDescription: string;
  pipTheSafeLogling: string;
  lunaTheCuriousLogling: string;
  sageTheAlertLogling: string;
  
  // GameIntroHeader keys
  professionalSecurityAdventures: string;
  welcomeToYourCybersecuritySkillBuildingJourney: string;
  cozySecurityAdventures: string;
  welcomeToAGentleWorld: string;
  
  // GamePlay keys
  preparingEnhancedAdventure: string;
  sessionStats: string;
  
  // GameResults keys
  exceptional: string;
  excellent: string;
  great: string;
  good: string;
  learning: string;
  outstandingMessage: string;
  excellentWorkMessage: string;
  greatJobMessage: string;
  goodProgressMessage: string;
  everyExpertMessage: string;
  improvementTip1: string;
  improvementTip2: string;
  improvementTip3: string;
  adventureComplete: string;
  performance: string;
  joyPoints: string;
  time: string;
  progressJourney: string;
  totalAdventures: string;
  avgScore: string;
  trend: string;
  nextGrowthStep: string;
  
  // ImprovedOnboarding keys
  differentKindOfLearning: string;
  welcomeToGentleApproach: string;
  traditionalCybersecurityTraining: string;
  ourLearningPhilosophy: string;
  curiosityOverFear: string;
  weExploreThreats: string;
  growthMindset: string;
  everyMistakeIsLearning: string;
  supportiveCommunity: string;
  youreNotAlone: string;
  practicalWisdom: string;
  realWorldSkills: string;

  // Missing keys from AdvancedGamePlay
  adventurePaused: string;
  takeYourTime: string;
  resumeAdventure: string;
  advanced: string;
  intermediate: string;
  beginner: string;
  analysisMode: string;
  gentleCuriosity: string;
  safeAndPeaceful: string;
  everythingNormal: string;
  curiousAndWatchful: string;
  somethingDifferent: string;
  alertAndProtective: string;
  dangerDetected: string;
  excellentIntuition: string;
  learningMoment: string;
  completeAdventure: string;
  continueJourney: string;
  yourGrowth: string;
  streak: string;
  accuracy: string;
  level: string;
  realWorldInsight: string;
  securityJourney: string;

  // Missing keys from DailyChallenge
  perfectHarmony: string;
  perfectHarmonyDesc: string;
  quickExplorer: string;
  quickExplorerDesc: string;
  gentleHelper: string;
  gentleHelperDesc: string;
  curiousMind: string;
  curiousMindDesc: string;
  wiseGuardian: string;
  wiseGuardianDesc: string;
  seedling: string;
  sapling: string;
  ancientTree: string;
  todaysChallenge: string;
  untilNext: string;
  challengeComplete: string;
  startTodaysAdventure: string;

  // Missing keys from GamePlay
  uniqueScenarios: string;
  categoriesMastered: string;
  started: string;
  expert: string;

  // Missing keys from GameResults
  correct: string;

  // Missing keys from GameStats
  gameTitle: string;

  // Missing keys from GameTutorial
  back: string;
  nextTip: string;

  // Missing keys from ImprovedOnboarding
  meetYourLearningCompanions: string;
  threeFriendlyGuides: string;
  pipThePeacefulObserver: string;
  pipOnboardingDescription: string;
  lunaTheCuriousExplorer: string;
  lunaOnboardingDescription: string;
  sageTheProtectiveGuardian: string;
  sageOnboardingDescription: string;
  tryYourFirstGentleAnalysis: string;
  letsPracticeWithRealScenario: string;
  scenario: string;
  sarahBloomScenario: string;
  howDoesThisFeelToYou: string;
  peacefulAndSafe: string;
  pipFeelsCalm: string;
  curiousAndInteresting: string;
  lunaWantsToInvestigate: string;
  sageSensesDanger: string;
  perfectYoureThinking: string;
  pipAgreesResponse: string;
  lunaAppreciatesResponse: string;
  sageRespectsResponse: string;
  yourCozyLearningJourney: string;
  howWeMakeCybersecurity: string;
  progressiveGrowth: string;
  progressiveGrowthDescription: string;
  understandingOverMemorization: string;
  understandingOverMemorizationDescription: string;
  realWorldRelevance: string;
  realWorldRelevanceDescription: string;
  readyToBeginGentleJourney: string;
  welcomeJourney: string;
  skipForNow: string;
  beginMyJourney: string;
  continue: string;

  // Missing keys from SoftLaunchFeedbackSystem
  yourExperienceSoFar: string;
  helpUsUnderstand: string;
  learningAndGrowth: string;
  tellUsAboutJourney: string;
  featuresAndImprovements: string;
  whatsWorking: string;
  yourThoughts: string;
  anythingElse: string;
  valuableFeedback: string;
  helpsBetter: string;
  rateDifficulty: string;
  tooEasy: string;
  tooHard: string;
  howEngaging: string;
  boring: string;
  veryEngaging: string;
  howClear: string;
  confusing: string;
  veryClear: string;
  difficultyFelt: string;
  tooGradual: string;
  justRight: string;
  tooSteep: string;
  moreConfident: string;
  noChange: string;
  muchMoreConfident: string;
  howRelevant: string;
  notRealistic: string;
  veryRealistic: string;
  wouldRecommend: string;
  definitelyNot: string;
  absolutelyYes: string;
  experienceLevel: string;
  completeBeginner: string;
  someExposure: string;
  intermediateKnowledge: string;
  advancedProfessional: string;
  whichFeatures: string;
  selectAll: string;
  loglingCharacters: string;
  storyBasedScenarios: string;
  gentleExplanations: string;
  progressTracking: string;
  achievementSystem: string;
  dailyChallenges: string;
  learningTips: string;
  realWorldContext: string;
  featuresWanted: string;
  makeBetter: string;
  enjoyMost: string;
  mostConfusing: string;
  anythingUnclear: string;
  generalFeedback: string;
  whatYouLove: string;
  bugReports: string;
  describeProblem: string;
  thankYouBeta: string;
  betaExplorer: string;
  stepOf: string;
  previous: string;
  next: string;
  skip: string;
  sendingFeedback: string;
  submitFeedback: string;
  shareExperience: string;
}

const englishTranslations: Translations = {
  of: "of",
  dailyChallenge: "Daily Challenge",
  joy: "Joy",
  whatIsLoglings: "What is Loglings?",
  cozy: "Cozy",
  professionalTraining: "Professional Training",
  lovinglyCreatedBy: "Lovingly created by",
  language: "Language",
  tutorial: "Tutorial",
  beginAdventure: "Begin Adventure",
  gameSubtitle: "Game Subtitle",
  chapter: "Chapter",
  analystPip: "Analyst Pip",
  detectiveLuna: "Detective Luna",
  guardianSage: "Guardian Sage",
  pipDescription: "Pip Description",
  lunaDescription: "Luna Description",
  sageDescription: "Sage Description",
  
  // GameIntroFeatures
  analyzeComplexSecurityLogs: "Analyze complex security logs and incident patterns",
  practiceIncidentResponse: "Practice incident response and threat hunting",
  learnThreatIntelligence: "Learn threat intelligence and forensic analysis",
  buildSkillsForSOC: "Build skills for SOC analyst roles",
  masteringAdvancedScenarios: "Mastering advanced scenarios and real-world cases",
  properIncidentHandling: "Proper incident handling and documentation",
  identifyingSubtleThreats: "Identifying subtle threats and attack patterns",
  professionalSkillBadges: "Professional skill badges and certifications",
  readGentleLogStories: "Read gentle log stories in cozy forest settings",
  helpLoglingsUnderstand: "Help Loglings understand what they see",
  learnTogetherEveryChoice: "Learn together - every choice teaches something new",
  collectCozyMoments: "Collect cozy moments and peaceful discoveries",
  helpingLoglingsFeel: "Helping Loglings feel safe and understood",
  noticingCuriousThings: "Noticing curious things in the digital forest",
  learningSomethingNew: "Learning something new about staying safe",
  gentleEncouragement: "Gentle encouragement and positive growth",
  yourAdventureAwaits: "Your {mode} Adventure Awaits",
  professional: "Professional",
  whatYoullDo: "What You'll Do",
  howYoullGrow: "How You'll Grow",
  
  // GameIntroGuides
  analystPipDescription: "Expert security analyst specializing in threat detection and incident response",
  detectiveLunaDescription: "Investigative specialist who uncovers hidden threats and analyzes attack patterns",
  guardianSageDescription: "Senior security architect focused on defense strategies and system protection",
  pipTheSafeLogling: "Pip, the Safe Logling",
  lunaTheCuriousLogling: "Luna, the Curious Logling",
  sageTheAlertLogling: "Sage, the Alert Logling",
  
  // GameIntroHeader
  professionalSecurityAdventures: "Professional Security Adventures",
  welcomeToYourCybersecuritySkillBuildingJourney: "Welcome to your cybersecurity skill-building journey",
  cozySecurityAdventures: "Cozy Security Adventures",
  welcomeToAGentleWorld: "Welcome to a gentle world of cybersecurity learning",
  
  // GamePlay
  preparingEnhancedAdventure: "Preparing your enhanced security adventure...",
  sessionStats: "Session Stats",
  
  // GameResults
  exceptional: "Exceptional",
  excellent: "Excellent", 
  great: "Great",
  good: "Good",
  learning: "Learning",
  outstandingMessage: "Outstanding work! You've shown exceptional cybersecurity intuition.",
  excellentWorkMessage: "Excellent work! Your security awareness is growing strong.",
  greatJobMessage: "Great job! You're developing solid security instincts.",
  goodProgressMessage: "Good progress! Every expert was once a beginner.",
  everyExpertMessage: "Every expert was once a beginner. Keep exploring!",
  improvementTip1: "Focus on understanding the context around each log entry - who, what, when, where.",
  improvementTip2: "Look for patterns and anomalies that break normal behavior.",
  improvementTip3: "You're doing excellent! Try exploring different scenario types to broaden your expertise.",
  adventureComplete: "Adventure Complete!",
  performance: "Performance",
  joyPoints: "Joy Points",
  time: "Time",
  progressJourney: "Progress Journey",
  totalAdventures: "Total Adventures",
  avgScore: "Avg Score",
  trend: "Trend",
  nextGrowthStep: "Next Growth Step",
  
  // ImprovedOnboarding
  differentKindOfLearning: "A Different Kind of Learning",
  welcomeToGentleApproach: "Welcome to a gentle approach to cybersecurity education",
  traditionalCybersecurityTraining: "Traditional cybersecurity training can feel overwhelming, stressful, or intimidating. We believe learning about digital safety should feel welcoming and encouraging.",
  ourLearningPhilosophy: "Our Learning Philosophy",
  curiosityOverFear: "Curiosity over Fear",
  weExploreThreats: "We explore threats with wonder, not worry",
  growthMindset: "Growth Mindset", 
  everyMistakeIsLearning: "Every mistake is a learning opportunity",
  supportiveCommunity: "Supportive Community",
  youreNotAlone: "You're not alone in this journey",
  practicalWisdom: "Practical Wisdom",
  realWorldSkills: "Real-world skills delivered gently",

  // AdvancedGamePlay translations
  adventurePaused: "Adventure Paused",
  takeYourTime: "Take your time to rest and reflect",
  resumeAdventure: "Resume Adventure",
  advanced: "Advanced",
  intermediate: "Intermediate",
  beginner: "Beginner",
  analysisMode: "Professional analysis mode",
  gentleCuriosity: "Gentle curiosity and exploration",
  safeAndPeaceful: "Safe & Peaceful",
  everythingNormal: "Everything looks normal",
  curiousAndWatchful: "Curious & Watchful",
  somethingDifferent: "Something seems different",
  alertAndProtective: "Alert & Protective",
  dangerDetected: "Potential danger detected",
  excellentIntuition: "Excellent Intuition!",
  learningMoment: "Learning Moment",
  completeAdventure: "Complete Adventure",
  continueJourney: "Continue Journey",
  yourGrowth: "Your Growth",
  streak: "Streak",
  accuracy: "Accuracy",
  level: "Level",
  realWorldInsight: "Real-World Insight",
  securityJourney: "Security Journey",

  // DailyChallenge translations
  perfectHarmony: "Perfect Harmony",
  perfectHarmonyDesc: "Complete 5 scenarios without any mistakes",
  quickExplorer: "Quick Explorer",
  quickExplorerDesc: "Complete 3 scenarios in under 10 minutes",
  gentleHelper: "Gentle Helper",
  gentleHelperDesc: "Help Loglings understand 2 new concepts",
  curiousMind: "Curious Mind",
  curiousMindDesc: "Explore 4 different scenario types",
  wiseGuardian: "Wise Guardian",
  wiseGuardianDesc: "Identify 3 security threats correctly",
  seedling: "Seedling",
  sapling: "Sapling",
  ancientTree: "Ancient Tree",
  todaysChallenge: "Today's Challenge",
  untilNext: "until next",
  challengeComplete: "Challenge Complete!",
  startTodaysAdventure: "Start Today's Adventure",

  // GamePlay translations
  uniqueScenarios: "Unique Scenarios",
  categoriesMastered: "Categories Mastered",
  started: "Started",
  expert: "Expert",

  // GameResults translations
  correct: "Correct",

  // GameStats translations
  gameTitle: "Loglings: Security Adventures",

  // GameTutorial translations
  back: "Back",
  nextTip: "Next Tip",

  // ImprovedOnboarding translations
  meetYourLearningCompanions: "Meet Your Learning Companions",
  threeFriendlyGuides: "Three friendly guides will accompany you",
  pipThePeacefulObserver: "Pip, the Peaceful Observer",
  pipOnboardingDescription: "Pip helps you stay calm and notice important details",
  lunaTheCuriousExplorer: "Luna, the Curious Explorer",
  lunaOnboardingDescription: "Luna encourages questions and creative thinking",
  sageTheProtectiveGuardian: "Sage, the Protective Guardian",
  sageOnboardingDescription: "Sage teaches you to recognize and respond to threats",
  tryYourFirstGentleAnalysis: "Try Your First Gentle Analysis",
  letsPracticeWithRealScenario: "Let's practice with a real scenario",
  scenario: "Scenario",
  sarahBloomScenario: "Sarah from Bloom Corp logs in at 3:00 AM",
  howDoesThisFeelToYou: "How does this feel to you?",
  peacefulAndSafe: "Peaceful & Safe",
  pipFeelsCalm: "Pip feels calm about this",
  curiousAndInteresting: "Curious & Interesting",
  lunaWantsToInvestigate: "Luna wants to investigate",
  sageSensesDanger: "Sage senses potential danger",
  perfectYoureThinking: "Perfect! You're thinking like a security expert",
  pipAgreesResponse: "Pip agrees - sometimes people work late",
  lunaAppreciatesResponse: "Luna appreciates your curiosity",
  sageRespectsResponse: "Sage respects your protective instincts",
  yourCozyLearningJourney: "Your Cozy Learning Journey",
  howWeMakeCybersecurity: "How we make cybersecurity approachable",
  progressiveGrowth: "Progressive Growth",
  progressiveGrowthDescription: "Start simple and gradually build expertise",
  understandingOverMemorization: "Understanding over Memorization",
  understandingOverMemorizationDescription: "Learn why things work, not just what to do",
  realWorldRelevance: "Real-World Relevance",
  realWorldRelevanceDescription: "Every lesson connects to actual security scenarios",
  readyToBeginGentleJourney: "Ready to begin your gentle journey into cybersecurity?",
  welcomeJourney: "Welcome Journey",
  skipForNow: "Skip for now",
  beginMyJourney: "Begin My Journey",
  continue: "Continue",

  // SoftLaunchFeedbackSystem translations
  yourExperienceSoFar: "Your Experience So Far",
  helpUsUnderstand: "Help us understand how you're finding Loglings",
  learningAndGrowth: "Learning and Growth",
  tellUsAboutJourney: "Tell us about your learning journey",
  featuresAndImprovements: "Features and Improvements",
  whatsWorking: "What's working well and what could be better?",
  yourThoughts: "Your Thoughts",
  anythingElse: "Anything else you'd like to share?",
  valuableFeedback: "Thank you for your valuable feedback!",
  helpsBetter: "Your input helps us make Loglings better for everyone.",
  rateDifficulty: "How would you rate the difficulty level?",
  tooEasy: "Too easy",
  tooHard: "Too hard",
  howEngaging: "How engaging is the experience?",
  boring: "Boring",
  veryEngaging: "Very engaging",
  howClear: "How clear are the explanations?",
  confusing: "Confusing",
  veryClear: "Very clear",
  difficultyFelt: "How did the difficulty progression feel?",
  tooGradual: "Too gradual",
  justRight: "Just right",
  tooSteep: "Too steep",
  moreConfident: "Do you feel more confident about cybersecurity?",
  noChange: "No change",
  muchMoreConfident: "Much more confident",
  howRelevant: "How relevant are the scenarios to real-world security?",
  notRealistic: "Not realistic",
  veryRealistic: "Very realistic",
  wouldRecommend: "Would you recommend Loglings to others?",
  definitelyNot: "Definitely not",
  absolutelyYes: "Absolutely yes",
  experienceLevel: "What's your cybersecurity experience level?",
  completeBeginner: "Complete beginner",
  someExposure: "Some exposure to cybersecurity",
  intermediateKnowledge: "Intermediate knowledge",
  advancedProfessional: "Advanced professional",
  whichFeatures: "Which features did you enjoy most?",
  selectAll: "select all that apply",
  loglingCharacters: "Logling characters",
  storyBasedScenarios: "Story-based scenarios",
  gentleExplanations: "Gentle explanations",
  progressTracking: "Progress tracking",
  achievementSystem: "Achievement system",
  dailyChallenges: "Daily challenges",
  learningTips: "Learning tips",
  realWorldContext: "Real-world context",
  featuresWanted: "What features would you like to see added?",
  makeBetter: "What would make Loglings even better?",
  enjoyMost: "What did you enjoy most?",
  mostConfusing: "What was most confusing?",
  anythingUnclear: "Was anything unclear or hard to understand?",
  generalFeedback: "General feedback",
  whatYouLove: "Tell us what you love, what needs improvement, or any suggestions",
  bugReports: "Bug reports",
  describeProblem: "Describe any technical problems you encountered",
  thankYouBeta: "Thank You for Being a Beta Explorer!",
  betaExplorer: "Your feedback is shaping the future of cybersecurity education.",
  stepOf: "Step {current} of {total}",
  previous: "Previous",
  next: "Next",
  skip: "Skip",
  sendingFeedback: "Sending feedback...",
  submitFeedback: "Submit Feedback",
  shareExperience: "Share Your Experience"
};

// For now, using English as fallback for all other languages to resolve build errors
const spanishTranslations: Translations = { ...englishTranslations };
const frenchTranslations: Translations = { ...englishTranslations };
const japaneseTranslations: Translations = { ...englishTranslations };
const koreanTranslations: Translations = { ...englishTranslations };
const chineseTranslations: Translations = { ...englishTranslations };

export const translations = {
  en: englishTranslations,
  es: spanishTranslations,
  fr: frenchTranslations,
  ja: japaneseTranslations,
  ko: koreanTranslations,
  zh: chineseTranslations
};
