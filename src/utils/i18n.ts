
export type Language = 'en' | 'ja' | 'es' | 'fr' | 'ko' | 'zh';

export interface Translations {
  // Navigation & UI
  startGame: string;
  welcomeBack: string;
  chooseYourLog: string;
  correct: string;
  tryAgain: string;
  explanation: string;
  uploadLogs: string;
  levelComplete: string;
  yourScore: string;
  cozyMode: string;
  exitToMenu: string;
  thankYouForPlaying: string;
  
  // Game Introduction
  gameTitle: string;
  gameSubtitle: string;
  beginAdventure: string;
  howToPlay: string;
  meetYourGuides: string;
  todaysChallenge: string;
  
  // Character Names & Descriptions
  pipDescription: string;
  lunaDescription: string;
  sageDescription: string;
  
  // Game Modes
  cozyEveryday: string;
  careerPro: string;
  
  // Tutorial & Onboarding
  tutorial: string;
  skipTutorial: string;
  nextTip: string;
  gotIt: string;
  
  // Settings
  settings: string;
  language: string;
  audio: string;
  notifications: string;
  
  // Common Actions
  continue: string;
  back: string;
  save: string;
  cancel: string;
  close: string;
  
  // Game Play - NEW ADDITIONS
  adventurePaused: string;
  excellentIntuition: string;
  learningMoment: string;
  resumeAdventure: string;
  takeYourTime: string;
  progressIsSafe: string;
  chapter: string;
  analysisMode: string;
  gentleCuriosity: string;
  safeAndPeaceful: string;
  everythingNormal: string;
  curiousAndWatchful: string;
  somethingDifferent: string;
  alertAndProtective: string;
  dangerDetected: string;
  continueJourney: string;
  completeAdventure: string;
  
  // Character Names
  pipSafe: string;
  lunaWarning: string;
  sageCritical: string;
  analystPip: string;
  detectiveLuna: string;
  guardianSage: string;
  
  // Stats & Progress
  yourGrowth: string;
  streak: string;
  accuracy: string;
  level: string;
  uniqueScenarios: string;
  categoriesMastered: string;
  securityJourney: string;
  started: string;
  expert: string;
  
  // Achievements
  achievements: string;
  newAchievement: string;
  forestNewcomer: string;
  forestNewcomerDesc: string;
  keenObserver: string;
  keenObserverDesc: string;
  threatHunter: string;
  threatHunterDesc: string;
  dedicatedGuardian: string;
  dedicatedGuardianDesc: string;
  perfectVision: string;
  perfectVisionDesc: string;
  securitySage: string;
  securitySageDesc: string;
  
  // Daily Challenges
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
  challengeComplete: string;
  startTodaysAdventure: string;
  untilNext: string;
  
  // Difficulty Levels
  seedling: string;
  sapling: string;
  ancientTree: string;
  beginner: string;
  intermediate: string;
  advanced: string;
  
  // Feedback System
  shareExperience: string;
  stepOf: string;
  yourExperienceSoFar: string;
  helpUsUnderstand: string;
  learningAndGrowth: string;
  tellUsAboutJourney: string;
  featuresAndImprovements: string;
  whatsWorking: string;
  yourThoughts: string;
  anythingElse: string;
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
  gotBored: string;
  justRight: string;
  perfectChallenge: string;
  tooSteep: string;
  feltOverwhelmed: string;
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
  couldImprove: string;
  anythingUnclear: string;
  generalFeedback: string;
  whatYouLove: string;
  bugReports: string;
  technicalIssues: string;
  describeProblem: string;
  thankYouBeta: string;
  betaExplorer: string;
  directlyShapes: string;
  gentleEffective: string;
  sendingFeedback: string;
  submitFeedback: string;
  valuableFeedback: string;
  helpsBetter: string;
  previous: string;
  next: string;
  skip: string;
  
  // Error Messages
  gameHiccup: string;
  dontWorry: string;
  loglingsFix: string;
  errorId: string;
  tryAgainAttempts: string;
  returnForest: string;
  reportBug: string;
  
  // Game Results
  sessionComplete: string;
  wellDone: string;
  statsBreakdown: string;
  totalScore: string;
  finalAccuracy: string;
  timeSpent: string;
  roundsCompleted: string;
  perfectRounds: string;
  encouragementMessages: string;
  playAgain: string;
  
  // Real World Context
  realWorldInsight: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation & UI
    startGame: "Start Game",
    welcomeBack: "Welcome back!",
    chooseYourLog: "Choose your log to analyze",
    correct: "Correct!",
    tryAgain: "Try again",
    explanation: "Explanation",
    uploadLogs: "Upload logs",
    levelComplete: "Level complete!",
    yourScore: "Your score",
    cozyMode: "Cozy mode",
    exitToMenu: "Exit to menu",
    thankYouForPlaying: "Thank you for playing",
    
    gameTitle: "Loglings: Cozy Security Adventures",
    gameSubtitle: "Where learning cybersecurity feels like a warm hug 🤗",
    beginAdventure: "Begin Cozy Adventure",
    howToPlay: "How to Play",
    meetYourGuides: "Meet Your Forest Guides",
    todaysChallenge: "Today's Cozy Challenge",
    
    pipDescription: "Pip helps you identify safe, everyday activities in the digital forest",
    lunaDescription: "Luna guides you through suspicious events that need gentle investigation",
    sageDescription: "Sage protects the forest from serious threats with ancient wisdom",
    
    cozyEveryday: "Cozy Everyday Discovery",
    careerPro: "Career Pro Mode",
    
    tutorial: "Tutorial",
    skipTutorial: "Skip Tutorial",
    nextTip: "Next Tip",
    gotIt: "Got it!",
    
    settings: "Settings",
    language: "Language",
    audio: "Audio",
    notifications: "Notifications",
    
    continue: "Continue",
    back: "Back",
    save: "Save",
    cancel: "Cancel",
    close: "Close",
    
    // NEW Game Play translations
    adventurePaused: "Adventure Paused",
    excellentIntuition: "Excellent intuition!",
    learningMoment: "Learning moment!",
    resumeAdventure: "Resume Adventure",
    takeYourTime: "Take your time! Your progress is safe. Resume whenever you're ready to continue your security journey.",
    progressIsSafe: "Your progress is safe",
    chapter: "Chapter",
    analysisMode: "Analyze this advanced security scenario and determine the appropriate response level.",
    gentleCuriosity: "The Loglings have discovered something in their forest. Let's explore it together with gentle curiosity.",
    safeAndPeaceful: "Safe & Peaceful",
    everythingNormal: "Everything looks normal",
    curiousAndWatchful: "Curious & Watchful",
    somethingDifferent: "Something seems different",
    alertAndProtective: "Alert & Protective",
    dangerDetected: "Danger detected!",
    continueJourney: "Continue Journey",
    completeAdventure: "Complete Adventure",
    
    pipSafe: "Pip the Safe Logling",
    lunaWarning: "Luna the Curious Logling",
    sageCritical: "Sage the Alert Logling",
    analystPip: "Analyst Pip",
    detectiveLuna: "Detective Luna",
    guardianSage: "Guardian Sage",
    
    yourGrowth: "Your Growth",
    streak: "Streak",
    accuracy: "Accuracy",
    level: "level",
    uniqueScenarios: "Unique Scenarios",
    categoriesMastered: "Categories Mastered",
    securityJourney: "Your Security Journey",
    started: "Started",
    expert: "Expert! 🛡️",
    
    achievements: "Achievements",
    newAchievement: "Achievement Unlocked",
    forestNewcomer: "Forest Newcomer",
    forestNewcomerDesc: "Complete your first cybersecurity adventure",
    keenObserver: "Keen Observer",
    keenObserverDesc: "Achieve 90% accuracy in a single session",
    threatHunter: "Threat Hunter",
    threatHunterDesc: "Correctly identify 25 critical threats",
    dedicatedGuardian: "Dedicated Guardian",
    dedicatedGuardianDesc: "Maintain a 7-day learning streak",
    perfectVision: "Perfect Vision",
    perfectVisionDesc: "Get 100% accuracy in a 10-round session",
    securitySage: "Security Sage",
    securitySageDesc: "Master all 6 security categories",
    
    perfectHarmony: "Perfect Harmony",
    perfectHarmonyDesc: "Complete an adventure with 100% accuracy",
    quickExplorer: "Quick Explorer",
    quickExplorerDesc: "Complete 3 adventures in under 10 minutes",
    gentleHelper: "Gentle Helper",
    gentleHelperDesc: "Help Pip identify 5 safe scenarios",
    curiousMind: "Curious Mind",
    curiousMindDesc: "Work with Luna to explore 7 warning scenarios",
    wiseGuardian: "Wise Guardian",
    wiseGuardianDesc: "Help Sage protect the forest from 3 critical threats",
    challengeComplete: "Challenge Complete!",
    startTodaysAdventure: "Start Today's Adventure",
    untilNext: "until next",
    
    seedling: "Seedling",
    sapling: "Sapling",
    ancientTree: "Ancient Tree",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    
    shareExperience: "Share Your Loglings Experience",
    stepOf: "Step {current} of {total}",
    yourExperienceSoFar: "Your Experience So Far",
    helpUsUnderstand: "Help us understand how Loglings feels to you",
    learningAndGrowth: "Learning & Growth",
    tellUsAboutJourney: "Tell us about your learning journey",
    featuresAndImprovements: "Features & Improvements",
    whatsWorking: "What's working and what could be better?",
    yourThoughts: "Your Thoughts",
    anythingElse: "Anything else you'd like to share?",
    rateDifficulty: "How would you rate the difficulty progression?",
    tooEasy: "Too easy",
    tooHard: "Too hard",
    howEngaging: "How engaging did you find the scenarios?",
    boring: "Boring",
    veryEngaging: "Very engaging",
    howClear: "How clear were the explanations?",
    confusing: "Confusing",
    veryClear: "Very clear",
    difficultyFelt: "The difficulty progression felt:",
    tooGradual: "Too gradual (I got bored)",
    justRight: "Just right (perfect challenge)",
    tooSteep: "Too steep (I felt overwhelmed)",
    perfectChallenge: "Perfect challenge",
    gotBored: "I got bored",
    feltOverwhelmed: "I felt overwhelmed",
    moreConfident: "Do you feel more confident about cybersecurity after using Loglings?",
    noChange: "No change",
    muchMoreConfident: "Much more confident",
    howRelevant: "How relevant are the scenarios to real-world situations?",
    notRealistic: "Not realistic",
    veryRealistic: "Very realistic",
    wouldRecommend: "Would you recommend Loglings to a friend?",
    definitelyNot: "Definitely not",
    absolutelyYes: "Absolutely yes",
    experienceLevel: "What's your experience level with cybersecurity?",
    completeBeginner: "Complete beginner",
    someExposure: "Some exposure to security concepts",
    intermediateKnowledge: "Intermediate knowledge",
    advancedProfessional: "Advanced/Professional",
    whichFeatures: "Which features do you enjoy most?",
    selectAll: "Select all that apply",
    loglingCharacters: "The Logling characters",
    storyBasedScenarios: "Story-based scenarios",
    gentleExplanations: "Gentle explanations",
    progressTracking: "Progress tracking",
    achievementSystem: "Achievement system",
    dailyChallenges: "Daily challenges",
    learningTips: "Learning tips",
    realWorldContext: "Real-world context",
    featuresWanted: "What features would you like to see added?",
    makeBetter: "Tell us about features that would make your learning experience even better...",
    enjoyMost: "What aspect of Loglings do you enjoy most?",
    mostConfusing: "What aspect is most confusing or could be improved?",
    couldImprove: "Anything that felt unclear or frustrating...",
    anythingUnclear: "Anything that felt unclear or frustrating...",
    generalFeedback: "Any other thoughts about your Loglings experience?",
    whatYouLove: "What you love, what could be better, ideas for improvement...",
    bugReports: "Did you encounter any bugs or technical issues?",
    technicalIssues: "Describe any problems you experienced...",
    describeProblem: "Describe any problems you experienced...",
    thankYouBeta: "Thank You for Being a Beta Explorer! 🌟",
    betaExplorer: "Your feedback directly shapes how we build Loglings. As one of our early users, you're helping create a more gentle and effective way to learn cybersecurity.",
    directlyShapes: "Your feedback directly shapes how we build Loglings.",
    gentleEffective: "helping create a more gentle and effective way to learn cybersecurity.",
    sendingFeedback: "Sending...",
    submitFeedback: "Submit Feedback",
    valuableFeedback: "Thank you for your valuable feedback! 🌟",
    helpsBetter: "Your insights help us create a better learning experience for everyone.",
    previous: "Previous",
    next: "Next",
    skip: "Skip",
    
    gameHiccup: "Game Hiccup! 🌱",
    dontWorry: "Don't worry! The Loglings are fixing things. Your progress is safe.",
    loglingsFix: "The Loglings are fixing things",
    errorId: "Error ID",
    tryAgainAttempts: "Try Again ({attempts} attempts left)",
    returnForest: "Return to Forest Home",
    reportBug: "Report Bug",
    
    sessionComplete: "Session Complete!",
    wellDone: "Well done! You've completed your security adventure.",
    statsBreakdown: "Your Stats Breakdown",
    totalScore: "Total Score",
    finalAccuracy: "Final Accuracy",
    timeSpent: "Time Spent",
    roundsCompleted: "Rounds Completed",
    perfectRounds: "Perfect Rounds",
    encouragementMessages: "Encouragement Messages",
    playAgain: "Play Again",
    
    realWorldInsight: "Real-World Insight"
  },
  
  ja: {
    // Navigation & UI
    startGame: "ゲーム開始",
    welcomeBack: "おかえりなさい！",
    chooseYourLog: "分析するログを選択",
    correct: "正解！",
    tryAgain: "もう一度挑戦",
    explanation: "説明",
    uploadLogs: "ログをアップロード",
    levelComplete: "レベルクリア！",
    yourScore: "あなたのスコア",
    cozyMode: "コージーモード",
    exitToMenu: "メニューに戻る",
    thankYouForPlaying: "プレイありがとうございました",
    
    gameTitle: "ログリングス：コージーセキュリティアドベンチャー",
    gameSubtitle: "サイバーセキュリティを温かく学ぼう 🤗",
    beginAdventure: "コージーな冒険を始める",
    howToPlay: "遊び方",
    meetYourGuides: "森のガイドに会おう",
    todaysChallenge: "今日のコージーチャレンジ",
    
    pipDescription: "ピップはデジタルの森で安全な日常活動を見つけるお手伝いをします",
    lunaDescription: "ルナは優しい調査が必要な疑わしい出来事を案内します",
    sageDescription: "セージは古代の知恵で森を深刻な脅威から守ります",
    
    cozyEveryday: "コージーな日常探索",
    careerPro: "キャリアプロモード",
    
    tutorial: "チュートリアル",
    skipTutorial: "チュートリアルをスキップ",
    nextTip: "次のヒント",
    gotIt: "わかりました！",
    
    settings: "設定",
    language: "言語",
    audio: "オーディオ",
    notifications: "通知",
    
    continue: "続ける",
    back: "戻る",
    save: "保存",
    cancel: "キャンセル",
    close: "閉じる",
    
    adventurePaused: "冒険を一時停止",
    excellentIntuition: "素晴らしい直感です！",
    learningMoment: "学習の瞬間！",
    resumeAdventure: "冒険を再開",
    takeYourTime: "ゆっくりどうぞ！進行状況は安全です。準備ができたらいつでもセキュリティジャーニーを続けてください。",
    progressIsSafe: "進行状況は安全です",
    chapter: "章",
    analysisMode: "この高度なセキュリティシナリオを分析し、適切な対応レベルを決定してください。",
    gentleCuriosity: "ログリングスが森で何かを発見しました。優しい好奇心で一緒に探索しましょう。",
    safeAndPeaceful: "安全で平和",
    everythingNormal: "すべて正常に見えます",
    curiousAndWatchful: "好奇心と注意深さ",
    somethingDifferent: "何か違うようです",
    alertAndProtective: "警戒と保護",
    dangerDetected: "危険を検出！",
    continueJourney: "旅を続ける",
    completeAdventure: "冒険を完了",
    
    pipSafe: "安全なログリング ピップ",
    lunaWarning: "好奇心旺盛なログリング ルナ",
    sageCritical: "警戒するログリング セージ",
    analystPip: "アナリスト ピップ",
    detectiveLuna: "探偵 ルナ",
    guardianSage: "守護者 セージ",
    
    yourGrowth: "あなたの成長",
    streak: "連続記録",
    accuracy: "正確性",
    level: "レベル",
    uniqueScenarios: "ユニークシナリオ",
    categoriesMastered: "習得カテゴリ",
    securityJourney: "あなたのセキュリティジャーニー",
    started: "開始",
    expert: "エキスパート！ 🛡️",
    
    achievements: "実績",
    newAchievement: "実績解除",
    forestNewcomer: "森の新参者",
    forestNewcomerDesc: "初回のサイバーセキュリティ冒険を完了",
    keenObserver: "鋭い観察者",
    keenObserverDesc: "1セッションで90％の正確性を達成",
    threatHunter: "脅威ハンター",
    threatHunterDesc: "25の重大な脅威を正しく識別",
    dedicatedGuardian: "献身的な守護者",
    dedicatedGuardianDesc: "7日間の学習連続記録を維持",
    perfectVision: "完璧な視覚",
    perfectVisionDesc: "10ラウンドセッションで100％の正確性を獲得",
    securitySage: "セキュリティの賢者",
    securitySageDesc: "6つのセキュリティカテゴリをすべて習得",
    
    perfectHarmony: "完璧な調和",
    perfectHarmonyDesc: "100％の正確性で冒険を完了",
    quickExplorer: "迅速な探検家",
    quickExplorerDesc: "10分以内に3つの冒険を完了",
    gentleHelper: "優しいヘルパー",
    gentleHelperDesc: "ピップが5つの安全なシナリオを識別するのを手伝う",
    curiousMind: "好奇心旺盛な心",
    curiousMindDesc: "ルナと協力して7つの警告シナリオを探索",
    wiseGuardian: "賢い守護者",
    wiseGuardianDesc: "セージが3つの重大な脅威から森を守るのを手伝う",
    challengeComplete: "チャレンジ完了！",
    startTodaysAdventure: "今日の冒険を開始",
    untilNext: "次まで",
    
    seedling: "苗木",
    sapling: "若木",
    ancientTree: "古木",
    beginner: "初心者",
    intermediate: "中級",
    advanced: "上級",
    
    shareExperience: "ログリングス体験を共有",
    stepOf: "ステップ {current} / {total}",
    yourExperienceSoFar: "これまでの体験",
    helpUsUnderstand: "ログリングスがどのように感じられるかを理解するのに役立ちます",
    learningAndGrowth: "学習と成長",
    tellUsAboutJourney: "学習の旅について教えてください",
    featuresAndImprovements: "機能と改善",
    whatsWorking: "何が機能していて、何が改善できるか？",
    yourThoughts: "あなたの考え",
    anythingElse: "他に共有したいことはありますか？",
    rateDifficulty: "難易度の進行をどう評価しますか？",
    tooEasy: "簡単すぎる",
    tooHard: "難しすぎる",
    howEngaging: "シナリオはどの程度魅力的でしたか？",
    boring: "退屈",
    veryEngaging: "とても魅力的",
    howClear: "説明はどの程度明確でしたか？",
    confusing: "混乱する",
    veryClear: "とても明確",
    difficultyFelt: "難易度の進行は感じられました：",
    tooGradual: "徐々すぎる（退屈でした）",
    justRight: "ちょうど良い（完璧な挑戦）",
    tooSteep: "急すぎる（圧倒されました）",
    perfectChallenge: "完璧な挑戦",
    gotBored: "退屈でした",
    feltOverwhelmed: "圧倒されました",
    moreConfident: "ログリングスを使用した後、サイバーセキュリティについてより自信を持てますか？",
    noChange: "変化なし",
    muchMoreConfident: "とても自信がついた",
    howRelevant: "シナリオは実世界の状況にどの程度関連していますか？",
    notRealistic: "現実的ではない",
    veryRealistic: "とても現実的",
    wouldRecommend: "友人にログリングスを勧めますか？",
    definitelyNot: "絶対にしない",
    absolutelyYes: "絶対にする",
    experienceLevel: "サイバーセキュリティの経験レベルは？",
    completeBeginner: "完全な初心者",
    someExposure: "セキュリティ概念への多少の露出",
    intermediateKnowledge: "中級知識",
    advancedProfessional: "上級/プロフェッショナル",
    whichFeatures: "どの機能を最も楽しんでいますか？",
    selectAll: "該当するものをすべて選択",
    loglingCharacters: "ログリングキャラクター",
    storyBasedScenarios: "ストーリーベースシナリオ",
    gentleExplanations: "優しい説明",
    progressTracking: "進行状況追跡",
    achievementSystem: "実績システム",
    dailyChallenges: "日次チャレンジ",
    learningTips: "学習ヒント",
    realWorldContext: "実世界の文脈",
    featuresWanted: "追加したい機能は何ですか？",
    makeBetter: "学習体験をさらに良くする機能について教えてください...",
    enjoyMost: "ログリングスの最も楽しい側面は何ですか？",
    mostConfusing: "最も混乱する、または改善できる側面は何ですか？",
    couldImprove: "不明確または苛立たしく感じたことは...",
    anythingUnclear: "不明確または苛立たしく感じたことは...",
    generalFeedback: "ログリングス体験について他に思うことはありますか？",
    whatYouLove: "愛している点、改善できる点、改善のアイデア...",
    bugReports: "バグや技術的問題に遭遇しましたか？",
    technicalIssues: "経験した問題を説明してください...",
    describeProblem: "経験した問題を説明してください...",
    thankYouBeta: "ベータ探検家になってくださってありがとう！ 🌟",
    betaExplorer: "あなたのフィードバックは、ログリングスの構築方法を直接形作ります。初期ユーザーの一人として、サイバーセキュリティを学ぶより優しく効果的な方法を作成するのに役立っています。",
    directlyShapes: "あなたのフィードバックは、ログリングスの構築方法を直接形作ります。",
    gentleEffective: "より優しく効果的なサイバーセキュリティ学習方法の作成に役立っています。",
    sendingFeedback: "送信中...",
    submitFeedback: "フィードバックを送信",
    valuableFeedback: "貴重なフィードバックをありがとうございました！ 🌟",
    helpsBetter: "あなたの洞察は、すべての人にとってより良い学習体験を作るのに役立ちます。",
    previous: "前へ",
    next: "次へ",
    skip: "スキップ",
    
    gameHiccup: "ゲームの問題！ 🌱",
    dontWorry: "心配いりません！ログリングスが修正しています。進行状況は安全です。",
    loglingsFix: "ログリングスが修正しています",
    errorId: "エラーID",
    tryAgainAttempts: "再試行（{attempts}回の試行が残っています）",
    returnForest: "森のホームに戻る",
    reportBug: "バグを報告",
    
    sessionComplete: "セッション完了！",
    wellDone: "よくできました！セキュリティ冒険を完了しました。",
    statsBreakdown: "統計の内訳",
    totalScore: "総スコア",
    finalAccuracy: "最終正確性",
    timeSpent: "費やした時間",
    roundsCompleted: "完了したラウンド",
    perfectRounds: "完璧なラウンド",
    encouragementMessages: "励ましメッセージ",
    playAgain: "もう一度プレイ",
    
    realWorldInsight: "実世界の洞察"
  },
  
  es: {
    // Navigation & UI
    startGame: "Iniciar Juego",
    welcomeBack: "¡Bienvenido de vuelta!",
    chooseYourLog: "Elige tu registro para analizar",
    correct: "¡Correcto!",
    tryAgain: "Inténtalo de nuevo",
    explanation: "Explicación",
    uploadLogs: "Subir registros",
    levelComplete: "¡Nivel completado!",
    yourScore: "Tu puntuación",
    cozyMode: "Modo acogedor",
    exitToMenu: "Salir al menú",
    thankYouForPlaying: "Gracias por jugar",
    
    gameTitle: "Loglings: Aventuras Acogedoras de Seguridad",
    gameSubtitle: "Donde aprender ciberseguridad se siente como un abrazo cálido 🤗",
    beginAdventure: "Comenzar Aventura Acogedora",
    howToPlay: "Cómo Jugar",
    meetYourGuides: "Conoce a tus Guías del Bosque",
    todaysChallenge: "Desafío Acogedor de Hoy",
    
    pipDescription: "Pip te ayuda a identificar actividades seguras y cotidianas en el bosque digital",
    lunaDescription: "Luna te guía a través de eventos sospechosos que necesitan investigación gentil",
    sageDescription: "Sage protege el bosque de amenazas serias con sabiduría ancestral",
    
    cozyEveryday: "Descubrimiento Cotidiano Acogedor",
    careerPro: "Modo Profesional de Carrera",
    
    tutorial: "Tutorial",
    skipTutorial: "Saltar Tutorial",
    nextTip: "Siguiente Consejo",
    gotIt: "¡Entendido!",
    
    settings: "Configuración",
    language: "Idioma",
    audio: "Audio",
    notifications: "Notificaciones",
    
    continue: "Continuar",
    back: "Atrás",
    save: "Guardar",
    cancel: "Cancelar",
    close: "Cerrar",
    
    adventurePaused: "Aventura Pausada",
    excellentIntuition: "¡Excelente intuición!",
    learningMoment: "¡Momento de aprendizaje!",
    resumeAdventure: "Reanudar Aventura",
    takeYourTime: "¡Tómate tu tiempo! Tu progreso está seguro. Reanuda cuando estés listo para continuar tu viaje de seguridad.",
    progressIsSafe: "Tu progreso está seguro",
    chapter: "Capítulo",
    analysisMode: "Analiza este escenario de seguridad avanzado y determina el nivel de respuesta apropiado.",
    gentleCuriosity: "Los Loglings han descubierto algo en su bosque. Explorémoslo juntos con gentil curiosidad.",
    safeAndPeaceful: "Seguro y Pacífico",
    everythingNormal: "Todo parece normal",
    curiousAndWatchful: "Curioso y Vigilante",
    somethingDifferent: "Algo parece diferente",
    alertAndProtective: "Alerta y Protector",
    dangerDetected: "¡Peligro detectado!",
    continueJourney: "Continuar Viaje",
    completeAdventure: "Completar Aventura",
    
    pipSafe: "Pip el Logling Seguro",
    lunaWarning: "Luna la Logling Curiosa",
    sageCritical: "Sage el Logling Alerta",
    analystPip: "Analista Pip",
    detectiveLuna: "Detective Luna",
    guardianSage: "Guardián Sage",
    
    yourGrowth: "Tu Crecimiento",
    streak: "Racha",
    accuracy: "Precisión",
    level: "nivel",
    uniqueScenarios: "Escenarios Únicos",
    categoriesMastered: "Categorías Dominadas",
    securityJourney: "Tu Viaje de Seguridad",
    started: "Iniciado",
    expert: "¡Experto! 🛡️",
    
    achievements: "Logros",
    newAchievement: "Logro Desbloqueado",
    forestNewcomer: "Recién Llegado al Bosque",
    forestNewcomerDesc: "Completa tu primera aventura de ciberseguridad",
    keenObserver: "Observador Perspicaz",
    keenObserverDesc: "Logra 90% de precisión en una sola sesión",
    threatHunter: "Cazador de Amenazas",
    threatHunterDesc: "Identifica correctamente 25 amenazas críticas",
    dedicatedGuardian: "Guardián Dedicado",
    dedicatedGuardianDesc: "Mantén una racha de aprendizaje de 7 días",
    perfectVision: "Visión Perfecta",
    perfectVisionDesc: "Obtén 100% de precisión en una sesión de 10 rondas",
    securitySage: "Sabio de Seguridad",
    securitySageDesc: "Domina las 6 categorías de seguridad",
    
    perfectHarmony: "Armonía Perfecta",
    perfectHarmonyDesc: "Completa una aventura con 100% de precisión",
    quickExplorer: "Explorador Rápido",
    quickExplorerDesc: "Completa 3 aventuras en menos de 10 minutos",
    gentleHelper: "Ayudante Gentil",
    gentleHelperDesc: "Ayuda a Pip a identificar 5 escenarios seguros",
    curiousMind: "Mente Curiosa",
    curiousMindDesc: "Trabaja con Luna para explorar 7 escenarios de advertencia",
    wiseGuardian: "Guardián Sabio",
    wiseGuardianDesc: "Ayuda a Sage a proteger el bosque de 3 amenazas críticas",
    challengeComplete: "¡Desafío Completado!",
    startTodaysAdventure: "Iniciar la Aventura de Hoy",
    untilNext: "hasta el próximo",
    
    seedling: "Plántula",
    sapling: "Arbolito",
    ancientTree: "Árbol Ancestral",
    beginner: "Principiante",
    intermediate: "Intermedio",
    advanced: "Avanzado",
    
    shareExperience: "Comparte tu Experiencia con Loglings",
    stepOf: "Paso {current} de {total}",
    yourExperienceSoFar: "Tu Experiencia Hasta Ahora",
    helpUsUnderstand: "Ayúdanos a entender cómo se siente Loglings para ti",
    learningAndGrowth: "Aprendizaje y Crecimiento",
    tellUsAboutJourney: "Cuéntanos sobre tu viaje de aprendizaje",
    featuresAndImprovements: "Características y Mejoras",
    whatsWorking: "¿Qué está funcionando y qué podría ser mejor?",
    yourThoughts: "Tus Pensamientos",
    anythingElse: "¿Algo más que te gustaría compartir?",
    rateDifficulty: "¿Cómo calificarías la progresión de dificultad?",
    tooEasy: "Demasiado fácil",
    tooHard: "Demasiado difícil",
    howEngaging: "¿Qué tan atractivos encontraste los escenarios?",
    boring: "Aburrido",
    veryEngaging: "Muy atractivo",
    howClear: "¿Qué tan claras fueron las explicaciones?",
    confusing: "Confuso",
    veryClear: "Muy claro",
    difficultyFelt: "La progresión de dificultad se sintió:",
    tooGradual: "Demasiado gradual (me aburrí)",
    justRight: "Perfecto (desafío perfecto)",
    tooSteep: "Demasiado empinado (me sentí abrumado)",
    perfectChallenge: "Desafío perfecto",
    gotBored: "Me aburrí",
    feltOverwhelmed: "Me sentí abrumado",
    moreConfident: "¿Te sientes más confiado sobre ciberseguridad después de usar Loglings?",
    noChange: "Sin cambio",
    muchMoreConfident: "Mucho más confiado",
    howRelevant: "¿Qué tan relevantes son los escenarios para situaciones del mundo real?",
    notRealistic: "No realista",
    veryRealistic: "Muy realista",
    wouldRecommend: "¿Recomendarías Loglings a un amigo?",
    definitelyNot: "Definitivamente no",
    absolutelyYes: "Absolutamente sí",
    experienceLevel: "¿Cuál es tu nivel de experiencia con ciberseguridad?",
    completeBeginner: "Principiante completo",
    someExposure: "Alguna exposición a conceptos de seguridad",
    intermediateKnowledge: "Conocimiento intermedio",
    advancedProfessional: "Avanzado/Profesional",
    whichFeatures: "¿Qué características disfrutas más?",
    selectAll: "Selecciona todo lo que aplique",
    loglingCharacters: "Los personajes Logling",
    storyBasedScenarios: "Escenarios basados en historias",
    gentleExplanations: "Explicaciones gentiles",
    progressTracking: "Seguimiento de progreso",
    achievementSystem: "Sistema de logros",
    dailyChallenges: "Desafíos diarios",
    learningTips: "Consejos de aprendizaje",
    realWorldContext: "Contexto del mundo real",
    featuresWanted: "¿Qué características te gustaría ver agregadas?",
    makeBetter: "Cuéntanos sobre características que harían tu experiencia de aprendizaje aún mejor...",
    enjoyMost: "¿Qué aspecto de Loglings disfrutas más?",
    mostConfusing: "¿Qué aspecto es más confuso o podría mejorarse?",
    couldImprove: "Algo que se sintió poco claro o frustrante...",
    anythingUnclear: "Algo que se sintió poco claro o frustrante...",
    generalFeedback: "¿Algún otro pensamiento sobre tu experiencia con Loglings?",
    whatYouLove: "Lo que amas, lo que podría ser mejor, ideas para mejora...",
    bugReports: "¿Encontraste algún error o problema técnico?",
    technicalIssues: "Describe cualquier problema que hayas experimentado...",
    describeProblem: "Describe cualquier problema que hayas experimentado...",
    thankYouBeta: "¡Gracias por ser un Explorador Beta! 🌟",
    betaExplorer: "Tu retroalimentación da forma directamente a cómo construimos Loglings. Como uno de nuestros usuarios tempranos, estás ayudando a crear una forma más gentil y efectiva de aprender ciberseguridad.",
    directlyShapes: "Tu retroalimentación da forma directamente a cómo construimos Loglings.",
    gentleEffective: "ayudando a crear una forma más gentil y efectiva de aprender ciberseguridad.",
    sendingFeedback: "Enviando...",
    submitFeedback: "Enviar Retroalimentación",
    valuableFeedback: "¡Gracias por tu valiosa retroalimentación! 🌟",
    helpsBetter: "Tus perspectivas nos ayudan a crear una mejor experiencia de aprendizaje para todos.",
    previous: "Anterior",
    next: "Siguiente",
    skip: "Saltar",
    
    gameHiccup: "¡Problema del Juego! 🌱",
    dontWorry: "¡No te preocupes! Los Loglings están arreglando las cosas. Tu progreso está seguro.",
    loglingsFix: "Los Loglings están arreglando las cosas",
    errorId: "ID de Error",
    tryAgainAttempts: "Intentar de Nuevo ({attempts} intentos restantes)",
    returnForest: "Volver al Hogar del Bosque",
    reportBug: "Reportar Error",
    
    sessionComplete: "¡Sesión Completada!",
    wellDone: "¡Bien hecho! Has completado tu aventura de seguridad.",
    statsBreakdown: "Desglose de tus Estadísticas",
    totalScore: "Puntuación Total",
    finalAccuracy: "Precisión Final",
    timeSpent: "Tiempo Gastado",
    roundsCompleted: "Rondas Completadas",
    perfectRounds: "Rondas Perfectas",
    encouragementMessages: "Mensajes de Aliento",
    playAgain: "Jugar de Nuevo",
    
    realWorldInsight: "Perspectiva del Mundo Real"
  },
  
  fr: {
    // Navigation & UI
    startGame: "Démarrer le Jeu",
    welcomeBack: "Bon retour !",
    chooseYourLog: "Choisissez votre journal à analyser",
    correct: "Correct !",
    tryAgain: "Réessayez",
    explanation: "Explication",
    uploadLogs: "Télécharger des journaux",
    levelComplete: "Niveau terminé !",
    yourScore: "Votre score",
    cozyMode: "Mode douillet",
    exitToMenu: "Retour au menu",
    thankYouForPlaying: "Merci d'avoir joué",
    
    gameTitle: "Loglings : Aventures Douillettes de Sécurité",
    gameSubtitle: "Où apprendre la cybersécurité ressemble à un câlin chaleureux 🤗",
    beginAdventure: "Commencer l'Aventure Douillette",
    howToPlay: "Comment Jouer",
    meetYourGuides: "Rencontrez vos Guides de la Forêt",
    todaysChallenge: "Défi Douillet d'Aujourd'hui",
    
    pipDescription: "Pip vous aide à identifier les activités sûres et quotidiennes dans la forêt numérique",
    lunaDescription: "Luna vous guide à travers des événements suspects nécessitant une enquête douce",
    sageDescription: "Sage protège la forêt contre les menaces sérieuses avec une sagesse ancestrale",
    
    cozyEveryday: "Découverte Quotidienne Douillette",
    careerPro: "Mode Professionnel de Carrière",
    
    tutorial: "Tutoriel",
    skipTutorial: "Passer le Tutoriel",
    nextTip: "Conseil Suivant",
    gotIt: "Compris !",
    
    settings: "Paramètres",
    language: "Langue",
    audio: "Audio",
    notifications: "Notifications",
    
    continue: "Continuer",
    back: "Retour",
    save: "Sauvegarder",
    cancel: "Annuler",
    close: "Fermer",
    
    adventurePaused: "Aventure en Pause",
    excellentIntuition: "Excellente intuition !",
    learningMoment: "Moment d'apprentissage !",
    resumeAdventure: "Reprendre l'Aventure",
    takeYourTime: "Prenez votre temps ! Votre progression est en sécurité. Reprenez quand vous êtes prêt à continuer votre voyage de sécurité.",
    progressIsSafe: "Votre progression est en sécurité",
    chapter: "Chapitre",
    analysisMode: "Analysez ce scénario de sécurité avancé et déterminez le niveau de réponse approprié.",
    gentleCuriosity: "Les Loglings ont découvert quelque chose dans leur forêt. Explorons ensemble avec une douce curiosité.",
    safeAndPeaceful: "Sûr et Paisible",
    everythingNormal: "Tout semble normal",
    curiousAndWatchful: "Curieux et Vigilant",
    somethingDifferent: "Quelque chose semble différent",
    alertAndProtective: "Alerte et Protecteur",
    dangerDetected: "Danger détecté !",
    continueJourney: "Continuer le Voyage",
    completeAdventure: "Terminer l'Aventure",
    
    pipSafe: "Pip le Logling Sûr",
    lunaWarning: "Luna la Logling Curieuse",
    sageCritical: "Sage le Logling Alerte",
    analystPip: "Analyste Pip",
    detectiveLuna: "Détective Luna",
    guardianSage: "Gardien Sage",
    
    yourGrowth: "Votre Croissance",
    streak: "Série",
    accuracy: "Précision",
    level: "niveau",
    uniqueScenarios: "Scénarios Uniques",
    categoriesMastered: "Catégories Maîtrisées",
    securityJourney: "Votre Voyage de Sécurité",
    started: "Commencé",
    expert: "Expert ! 🛡️",
    
    achievements: "Réalisations",
    newAchievement: "Réalisation Débloquée",
    forestNewcomer: "Nouveau Venu de la Forêt",
    forestNewcomerDesc: "Terminez votre première aventure de cybersécurité",
    keenObserver: "Observateur Perspicace",
    keenObserverDesc: "Atteignez 90% de précision en une seule session",
    threatHunter: "Chasseur de Menaces",
    threatHunterDesc: "Identifiez correctement 25 menaces critiques",
    dedicatedGuardian: "Gardien Dévoué",
    dedicatedGuardianDesc: "Maintenez une série d'apprentissage de 7 jours",
    perfectVision: "Vision Parfaite",
    perfectVisionDesc: "Obtenez 100% de précision dans une session de 10 tours",
    securitySage: "Sage de Sécurité",
    securitySageDesc: "Maîtrisez les 6 catégories de sécurité",
    
    perfectHarmony: "Harmonie Parfaite",
    perfectHarmonyDesc: "Terminez une aventure avec 100% de précision",
    quickExplorer: "Explorateur Rapide",
    quickExplorerDesc: "Terminez 3 aventures en moins de 10 minutes",
    gentleHelper: "Aide Douce",
    gentleHelperDesc: "Aidez Pip à identifier 5 scénarios sûrs",
    curiousMind: "Esprit Curieux",
    curiousMindDesc: "Travaillez avec Luna pour explorer 7 scénarios d'avertissement",
    wiseGuardian: "Gardien Sage",
    wiseGuardianDesc: "Aidez Sage à protéger la forêt de 3 menaces critiques",
    challengeComplete: "Défi Terminé !",
    startTodaysAdventure: "Commencer l'Aventure d'Aujourd'hui",
    untilNext: "jusqu'au prochain",
    
    seedling: "Semis",
    sapling: "Jeune Arbre",
    ancientTree: "Arbre Ancien",
    beginner: "Débutant",
    intermediate: "Intermédiaire",
    advanced: "Avancé",
    
    shareExperience: "Partagez votre Expérience Loglings",
    stepOf: "Étape {current} de {total}",
    yourExperienceSoFar: "Votre Expérience Jusqu'à Présent",
    helpUsUnderstand: "Aidez-nous à comprendre comment Loglings vous fait ressentir",
    learningAndGrowth: "Apprentissage et Croissance",
    tellUsAboutJourney: "Parlez-nous de votre voyage d'apprentissage",
    featuresAndImprovements: "Fonctionnalités et Améliorations",
    whatsWorking: "Qu'est-ce qui fonctionne et qu'est-ce qui pourrait être mieux ?",
    yourThoughts: "Vos Pensées",
    anythingElse: "Autre chose que vous aimeriez partager ?",
    rateDifficulty: "Comment évalueriez-vous la progression de difficulté ?",
    tooEasy: "Trop facile",
    tooHard: "Trop difficile",
    howEngaging: "À quel point avez-vous trouvé les scénarios engageants ?",
    boring: "Ennuyeux",
    veryEngaging: "Très engageant",
    howClear: "À quel point les explications étaient-elles claires ?",
    confusing: "Confuses",
    veryClear: "Très claires",
    difficultyFelt: "La progression de difficulté semblait :",
    tooGradual: "Trop graduelle (je me suis ennuyé)",
    justRight: "Parfaite (défi parfait)",
    tooSteep: "Trop raide (je me suis senti dépassé)",
    perfectChallenge: "Défi parfait",
    gotBored: "Je me suis ennuyé",
    feltOverwhelmed: "Je me suis senti dépassé",
    moreConfident: "Vous sentez-vous plus confiant en cybersécurité après avoir utilisé Loglings ?",
    noChange: "Aucun changement",
    muchMoreConfident: "Beaucoup plus confiant",
    howRelevant: "À quel point les scénarios sont-ils pertinents pour les situations réelles ?",
    notRealistic: "Pas réaliste",
    veryRealistic: "Très réaliste",
    wouldRecommend: "Recommanderiez-vous Loglings à un ami ?",
    definitelyNot: "Certainement pas",
    absolutelyYes: "Absolument oui",
    experienceLevel: "Quel est votre niveau d'expérience avec la cybersécurité ?",
    completeBeginner: "Débutant complet",
    someExposure: "Quelque exposition aux concepts de sécurité",
    intermediateKnowledge: "Connaissance intermédiaire",
    advancedProfessional: "Avancé/Professionnel",
    whichFeatures: "Quelles fonctionnalités appréciez-vous le plus ?",
    selectAll: "Sélectionnez tout ce qui s'applique",
    loglingCharacters: "Les personnages Logling",
    storyBasedScenarios: "Scénarios basés sur des histoires",
    gentleExplanations: "Explications douces",
    progressTracking: "Suivi des progrès",
    achievementSystem: "Système de réalisations",
    dailyChallenges: "Défis quotidiens",
    learningTips: "Conseils d'apprentissage",
    realWorldContext: "Contexte du monde réel",
    featuresWanted: "Quelles fonctionnalités aimeriez-vous voir ajoutées ?",
    makeBetter: "Parlez-nous des fonctionnalités qui rendraient votre expérience d'apprentissage encore meilleure...",
    enjoyMost: "Quel aspect de Loglings appréciez-vous le plus ?",
    mostConfusing: "Quel aspect est le plus confus ou pourrait être amélioré ?",
    couldImprove: "Quelque chose qui semblait peu clair ou frustrant...",
    anythingUnclear: "Quelque chose qui semblait peu clair ou frustrant...",
    generalFeedback: "D'autres pensées sur votre expérience Loglings ?",
    whatYouLove: "Ce que vous aimez, ce qui pourrait être mieux, idées d'amélioration...",
    bugReports: "Avez-vous rencontré des bugs ou des problèmes techniques ?",
    technicalIssues: "Décrivez les problèmes que vous avez rencontrés...",
    describeProblem: "Décrivez les problèmes que vous avez rencontrés...",
    thankYouBeta: "Merci d'être un Explorateur Bêta ! 🌟",
    betaExplorer: "Vos commentaires façonnent directement la façon dont nous construisons Loglings. En tant qu'un de nos premiers utilisateurs, vous aidez à créer un moyen plus doux et efficace d'apprendre la cybersécurité.",
    directlyShapes: "Vos commentaires façonnent directement la façon dont nous construisons Loglings.",
    gentleEffective: "aidant à créer un moyen plus doux et efficace d'apprendre la cybersécurité.",
    sendingFeedback: "Envoi en cours...",
    submitFeedback: "Soumettre les Commentaires",
    valuableFeedback: "Merci pour vos précieux commentaires ! 🌟",
    helpsBetter: "Vos idées nous aident à créer une meilleure expérience d'apprentissage pour tous.",
    previous: "Précédent",
    next: "Suivant",
    skip: "Passer",
    
    gameHiccup: "Problème de Jeu ! 🌱",
    dontWorry: "Ne vous inquiétez pas ! Les Loglings réparent les choses. Votre progression est en sécurité.",
    loglingsFix: "Les Loglings réparent les choses",
    errorId: "ID d'Erreur",
    tryAgainAttempts: "Réessayer ({attempts} tentatives restantes)",
    returnForest: "Retourner à la Maison de la Forêt",
    reportBug: "Signaler un Bug",
    
    sessionComplete: "Session Terminée !",
    wellDone: "Bien joué ! Vous avez terminé votre aventure de sécurité.",
    statsBreakdown: "Répartition de vos Statistiques",
    totalScore: "Score Total",
    finalAccuracy: "Précision Finale",
    timeSpent: "Temps Passé",
    roundsCompleted: "Tours Terminés",
    perfectRounds: "Tours Parfaits",
    encouragementMessages: "Messages d'Encouragement",
    playAgain: "Rejouer",
    
    realWorldInsight: "Aperçu du Monde Réel"
  },
  
  ko: {
    // Navigation & UI
    startGame: "게임 시작",
    welcomeBack: "다시 오신 것을 환영합니다!",
    chooseYourLog: "분석할 로그를 선택하세요",
    correct: "정답!",
    tryAgain: "다시 시도",
    explanation: "설명",
    uploadLogs: "로그 업로드",
    levelComplete: "레벨 완료!",
    yourScore: "당신의 점수",
    cozyMode: "아늑한 모드",
    exitToMenu: "메뉴로 나가기",
    thankYouForPlaying: "플레이해 주셔서 감사합니다",
    
    gameTitle: "로글링스: 아늑한 보안 모험",
    gameSubtitle: "사이버보안을 배우는 것이 따뜻한 포옹처럼 느껴지는 곳 🤗",
    beginAdventure: "아늑한 모험 시작하기",
    howToPlay: "게임 방법",
    meetYourGuides: "숲의 가이드들을 만나보세요",
    todaysChallenge: "오늘의 아늑한 도전",
    
    pipDescription: "핍은 디지털 숲에서 안전한 일상 활동을 식별하는 데 도움을 줍니다",
    lunaDescription: "루나는 부드러운 조사가 필요한 의심스러운 이벤트를 안내합니다",
    sageDescription: "세이지는 고대의 지혜로 숲을 심각한 위협으로부터 보호합니다",
    
    cozyEveryday: "아늑한 일상 탐색",
    careerPro: "커리어 프로 모드",
    
    tutorial: "튜토리얼",
    skipTutorial: "튜토리얼 건너뛰기",
    nextTip: "다음 팁",
    gotIt: "알겠습니다!",
    
    settings: "설정",
    language: "언어",
    audio: "오디오",
    notifications: "알림",
    
    continue: "계속",
    back: "뒤로",
    save: "저장",
    cancel: "취소",
    close: "닫기",
    
    adventurePaused: "모험 일시 정지",
    excellentIntuition: "훌륭한 직감입니다!",
    learningMoment: "학습의 순간!",
    resumeAdventure: "모험 재개",
    takeYourTime: "천천히 하세요! 진행 상황이 안전합니다. 보안 여정을 계속할 준비가 되면 언제든지 재개하세요.",
    progressIsSafe: "진행 상황이 안전합니다",
    chapter: "챕터",
    analysisMode: "이 고급 보안 시나리오를 분석하고 적절한 대응 수준을 결정하세요.",
    gentleCuriosity: "로글링스가 숲에서 무언가를 발견했습니다. 부드러운 호기심으로 함께 탐험해 봅시다.",
    safeAndPeaceful: "안전하고 평화로운",
    everythingNormal: "모든 것이 정상으로 보입니다",
    curiousAndWatchful: "호기심 많고 주의 깊은",
    somethingDifferent: "뭔가 다른 것 같습니다",
    alertAndProtective: "경계하고 보호하는",
    dangerDetected: "위험 감지!",
    continueJourney: "여정 계속",
    completeAdventure: "모험 완료",
    
    pipSafe: "안전한 로글링 핍",
    lunaWarning: "호기심 많은 로글링 루나",
    sageCritical: "경계하는 로글링 세이지",
    analystPip: "분석가 핍",
    detectiveLuna: "탐정 루나",
    guardianSage: "수호자 세이지",
    
    yourGrowth: "당신의 성장",
    streak: "연속",
    accuracy: "정확도",
    level: "레벨",
    uniqueScenarios: "독특한 시나리오",
    categoriesMastered: "마스터한 카테고리",
    securityJourney: "당신의 보안 여정",
    started: "시작됨",
    expert: "전문가! 🛡️",
    
    achievements: "업적",
    newAchievement: "업적 달성",
    forestNewcomer: "숲 신입",
    forestNewcomerDesc: "첫 번째 사이버보안 모험 완료",
    keenObserver: "예리한 관찰자",
    keenObserverDesc: "한 세션에서 90% 정확도 달성",
    threatHunter: "위협 사냥꾼",
    threatHunterDesc: "25개의 중요한 위협을 올바르게 식별",
    dedicatedGuardian: "헌신적인 수호자",
    dedicatedGuardianDesc: "7일간의 학습 연속 기록 유지",
    perfectVision: "완벽한 시야",
    perfectVisionDesc: "10라운드 세션에서 100% 정확도 획득",
    securitySage: "보안 현자",
    securitySageDesc: "6개의 보안 카테고리 모두 마스터",
    
    perfectHarmony: "완벽한 조화",
    perfectHarmonyDesc: "100% 정확도로 모험 완료",
    quickExplorer: "빠른 탐험가",
    quickExplorerDesc: "10분 이내에 3개의 모험 완료",
    gentleHelper: "부드러운 도우미",
    gentleHelperDesc: "핍이 5개의 안전한 시나리오를 식별하도록 도움",
    curiousMind: "호기심 많은 마음",
    curiousMindDesc: "루나와 함께 7개의 경고 시나리오 탐색",
    wiseGuardian: "현명한 수호자",
    wiseGuardianDesc: "세이지가 3개의 중요한 위협으로부터 숲을 보호하도록 도움",
    challengeComplete: "도전 완료!",
    startTodaysAdventure: "오늘의 모험 시작",
    untilNext: "다음까지",
    
    seedling: "새싹",
    sapling: "묘목",
    ancientTree: "고대 나무",
    beginner: "초보자",
    intermediate: "중급자",
    advanced: "고급자",
    
    shareExperience: "로글링스 경험 공유",
    stepOf: "{total} 중 {current}단계",
    yourExperienceSoFar: "지금까지의 경험",
    helpUsUnderstand: "로글링스가 어떻게 느껴지는지 이해하는 데 도움을 주세요",
    learningAndGrowth: "학습과 성장",
    tellUsAboutJourney: "학습 여정에 대해 말해주세요",
    featuresAndImprovements: "기능과 개선사항",
    whatsWorking: "무엇이 잘 작동하고 무엇이 더 나아질 수 있나요?",
    yourThoughts: "당신의 생각",
    anythingElse: "공유하고 싶은 다른 것이 있나요?",
    rateDifficulty: "난이도 진행을 어떻게 평가하시나요?",
    tooEasy: "너무 쉬움",
    tooHard: "너무 어려움",
    howEngaging: "시나리오가 얼마나 매력적이었나요?",
    boring: "지루함",
    veryEngaging: "매우 매력적",
    howClear: "설명이 얼마나 명확했나요?",
    confusing: "혼란스러움",
    veryClear: "매우 명확",
    difficultyFelt: "난이도 진행이 느껴졌습니다:",
    tooGradual: "너무 점진적 (지루했음)",
    justRight: "딱 좋음 (완벽한 도전)",
    tooSteep: "너무 가파름 (압도당했음)",
    perfectChallenge: "완벽한 도전",
    gotBored: "지루했음",
    feltOverwhelmed: "압도당했음",
    moreConfident: "로글링스를 사용한 후 사이버보안에 대해 더 자신감이 생겼나요?",
    noChange: "변화 없음",
    muchMoreConfident: "훨씬 더 자신감 있음",
    howRelevant: "시나리오가 실제 상황과 얼마나 관련이 있나요?",
    notRealistic: "현실적이지 않음",
    veryRealistic: "매우 현실적",
    wouldRecommend: "친구에게 로글링스를 추천하시겠나요?",
    definitelyNot: "절대 아니요",
    absolutelyYes: "절대 예",
    experienceLevel: "사이버보안에 대한 경험 수준은?",
    completeBeginner: "완전 초보자",
    someExposure: "보안 개념에 약간의 노출",
    intermediateKnowledge: "중급 지식",
    advancedProfessional: "고급/전문가",
    whichFeatures: "가장 즐기는 기능은 무엇인가요?",
    selectAll: "해당하는 모든 것 선택",
    loglingCharacters: "로글링 캐릭터들",
    storyBasedScenarios: "스토리 기반 시나리오",
    gentleExplanations: "부드러운 설명",
    progressTracking: "진행 상황 추적",
    achievementSystem: "업적 시스템",
    dailyChallenges: "일일 도전",
    learningTips: "학습 팁",
    realWorldContext: "실제 세계 맥락",
    featuresWanted: "추가되기를 원하는 기능은 무엇인가요?",
    makeBetter: "학습 경험을 더욱 좋게 만들 기능에 대해 알려주세요...",
    enjoyMost: "로글링스의 어떤 측면을 가장 즐기시나요?",
    mostConfusing: "가장 혼란스럽거나 개선될 수 있는 측면은 무엇인가요?",
    couldImprove: "불분명하거나 좌절스럽게 느껴진 것...",
    anythingUnclear: "불분명하거나 좌절스럽게 느껴진 것...",
    generalFeedback: "로글링스 경험에 대한 다른 생각이 있나요?",
    whatYouLove: "좋아하는 것, 더 나아질 수 있는 것, 개선 아이디어...",
    bugReports: "버그나 기술적 문제를 만났나요?",
    technicalIssues: "경험한 문제를 설명해주세요...",
    describeProblem: "경험한 문제를 설명해주세요...",
    thankYouBeta: "베타 탐험가가 되어주셔서 감사합니다! 🌟",
    betaExplorer: "당신의 피드백은 우리가 로글링스를 구축하는 방식을 직접적으로 형성합니다. 초기 사용자 중 한 명으로서, 사이버보안을 배우는 더 부드럽고 효과적인 방법을 만드는 데 도움을 주고 있습니다.",
    directlyShapes: "당신의 피드백은 우리가 로글링스를 구축하는 방식을 직접적으로 형성합니다.",
    gentleEffective: "사이버보안을 배우는 더 부드럽고 효과적인 방법을 만드는 데 도움을 주고 있습니다.",
    sendingFeedback: "전송 중...",
    submitFeedback: "피드백 제출",
    valuableFeedback: "소중한 피드백을 주셔서 감사합니다! 🌟",
    helpsBetter: "당신의 통찰력은 모든 사람을 위한 더 나은 학습 경험을 만드는 데 도움이 됩니다.",
    previous: "이전",
    next: "다음",
    skip: "건너뛰기",
    
    gameHiccup: "게임 문제! 🌱",
    dontWorry: "걱정하지 마세요! 로글링스가 고치고 있습니다. 진행 상황은 안전합니다.",
    loglingsFix: "로글링스가 고치고 있습니다",
    errorId: "오류 ID",
    tryAgainAttempts: "다시 시도 ({attempts}회 시도 남음)",
    returnForest: "숲 집으로 돌아가기",
    reportBug: "버그 신고",
    
    sessionComplete: "세션 완료!",
    wellDone: "잘했습니다! 보안 모험을 완료했습니다.",
    statsBreakdown: "통계 분석",
    totalScore: "총 점수",
    finalAccuracy: "최종 정확도",
    timeSpent: "소요 시간",
    roundsCompleted: "완료된 라운드",
    perfectRounds: "완벽한 라운드",
    encouragementMessages: "격려 메시지",
    playAgain: "다시 플레이",
    
    realWorldInsight: "실제 세계 통찰"
  },
  
  zh: {
    // Navigation & UI
    startGame: "开始游戏",
    welcomeBack: "欢迎回来！",
    chooseYourLog: "选择要分析的日志",
    correct: "正确！",
    tryAgain: "再试一次",
    explanation: "解释",
    uploadLogs: "上传日志",
    levelComplete: "关卡完成！",
    yourScore: "您的得分",
    cozyMode: "舒适模式",
    exitToMenu: "退出到菜单",
    thankYouForPlaying: "感谢您的游玩",
    
    gameTitle: "日志精灵：舒适安全冒险",
    gameSubtitle: "让学习网络安全就像温暖的拥抱 🤗",
    beginAdventure: "开始舒适冒险",
    howToPlay: "如何游玩",
    meetYourGuides: "遇见您的森林向导",
    todaysChallenge: "今日舒适挑战",
    
    pipDescription: "皮普帮助您识别数字森林中安全的日常活动",
    lunaDescription: "露娜引导您处理需要温和调查的可疑事件",
    sageDescription: "赛奇用古老智慧保护森林免受严重威胁",
    
    cozyEveryday: "舒适日常探索",
    careerPro: "职业专业模式",
    
    tutorial: "教程",
    skipTutorial: "跳过教程",
    nextTip: "下一个提示",
    gotIt: "明白了！",
    
    settings: "设置",
    language: "语言",
    audio: "音频",
    notifications: "通知",
    
    continue: "继续",
    back: "返回",
    save: "保存",
    cancel: "取消",
    close: "关闭",
    
    adventurePaused: "冒险暂停",
    excellentIntuition: "出色的直觉！",
    learningMoment: "学习时刻！",
    resumeAdventure: "恢复冒险",
    takeYourTime: "慢慢来！您的进度是安全的。当您准备好继续安全之旅时，随时恢复。",
    progressIsSafe: "您的进度是安全的",
    chapter: "章节",
    analysisMode: "分析这个高级安全场景并确定适当的响应级别。",
    gentleCuriosity: "日志精灵在他们的森林中发现了什么。让我们带着温和的好奇心一起探索。",
    safeAndPeaceful: "安全与和平",
    everythingNormal: "一切看起来正常",
    curiousAndWatchful: "好奇与警觉",
    somethingDifferent: "似乎有什么不同",
    alertAndProtective: "警报与保护",
    dangerDetected: "检测到危险！",
    continueJourney: "继续旅程",
    completeAdventure: "完成冒险",
    
    pipSafe: "安全的日志精灵皮普",
    lunaWarning: "好奇的日志精灵露娜",
    sageCritical: "警觉的日志精灵赛奇",
    analystPip: "分析师皮普",
    detectiveLuna: "侦探露娜",
    guardianSage: "守护者赛奇",
    
    yourGrowth: "您的成长",
    streak: "连胜",
    accuracy: "准确率",
    level: "级别",
    uniqueScenarios: "独特场景",
    categoriesMastered: "掌握的类别",
    securityJourney: "您的安全之旅",
    started: "已开始",
    expert: "专家！ 🛡️",
    
    achievements: "成就",
    newAchievement: "成就解锁",
    forestNewcomer: "森林新人",
    forestNewcomerDesc: "完成您的第一次网络安全冒险",
    keenObserver: "敏锐观察者",
    keenObserverDesc: "在单次会话中达到90%准确率",
    threatHunter: "威胁猎手",
    threatHunterDesc: "正确识别25个关键威胁",
    dedicatedGuardian: "专职守护者",
    dedicatedGuardianDesc: "保持7天学习连胜记录",
    perfectVision: "完美视野",
    perfectVisionDesc: "在10轮会话中获得100%准确率",
    securitySage: "安全贤者",
    securitySageDesc: "掌握全部6个安全类别",
    
    perfectHarmony: "完美和谐",
    perfectHarmonyDesc: "以100%准确率完成冒险",
    quickExplorer: "快速探索者",
    quickExplorerDesc: "在10分钟内完成3次冒险",
    gentleHelper: "温和助手",
    gentleHelperDesc: "帮助皮普识别5个安全场景",
    curiousMind: "好奇心",
    curiousMindDesc: "与露娜合作探索7个警告场景",
    wiseGuardian: "智慧守护者",
    wiseGuardianDesc: "帮助赛奇保护森林免受3个关键威胁",
    challengeComplete: "挑战完成！",
    startTodaysAdventure: "开始今日冒险",
    untilNext: "直到下一个",
    
    seedling: "幼苗",
    sapling: "小树",
    ancientTree: "古树",
    beginner: "初学者",
    intermediate: "中级",
    advanced: "高级",
    
    shareExperience: "分享您的日志精灵体验",
    stepOf: "第{current}步，共{total}步",
    yourExperienceSoFar: "您到目前为止的体验",
    helpUsUnderstand: "帮助我们了解日志精灵给您的感受",
    learningAndGrowth: "学习与成长",
    tellUsAboutJourney: "告诉我们您的学习之旅",
    featuresAndImprovements: "功能与改进",
    whatsWorking: "什么有效，什么可以更好？",
    yourThoughts: "您的想法",
    anythingElse: "还有什么您想分享的吗？",
    rateDifficulty: "您如何评价难度进展？",
    tooEasy: "太容易",
    tooHard: "太难",
    howEngaging: "您觉得场景有多吸引人？",
    boring: "无聊",
    veryEngaging: "非常吸引人",
    howClear: "解释有多清楚？",
    confusing: "令人困惑",
    veryClear: "非常清楚",
    difficultyFelt: "难度进展感觉：",
    tooGradual: "太渐进（我感到无聊）",
    justRight: "恰到好处（完美挑战）",
    tooSteep: "太陡峭（我感到不知所措）",
    perfectChallenge: "完美挑战",
    gotBored: "我感到无聊",
    feltOverwhelmed: "我感到不知所措",
    moreConfident: "使用日志精灵后您对网络安全更有信心吗？",
    noChange: "没有变化",
    muchMoreConfident: "更有信心",
    howRelevant: "场景与现实世界情况的相关性如何？",
    notRealistic: "不现实",
    veryRealistic: "非常现实",
    wouldRecommend: "您会向朋友推荐日志精灵吗？",
    definitelyNot: "绝对不会",
    absolutelyYes: "绝对会",
    experienceLevel: "您的网络安全经验水平？",
    completeBeginner: "完全初学者",
    someExposure: "对安全概念有一些接触",
    intermediateKnowledge: "中级知识",
    advancedProfessional: "高级/专业",
    whichFeatures: "您最喜欢哪些功能？",
    selectAll: "选择所有适用的",
    loglingCharacters: "日志精灵角色",
    storyBasedScenarios: "基于故事的场景",
    gentleExplanations: "温和的解释",
    progressTracking: "进度跟踪",
    achievementSystem: "成就系统",
    dailyChallenges: "每日挑战",
    learningTips: "学习技巧",
    realWorldContext: "现实世界背景",
    featuresWanted: "您希望添加什么功能？",
    makeBetter: "告诉我们什么功能能让您的学习体验更好...",
    enjoyMost: "您最喜欢日志精灵的哪个方面？",
    mostConfusing: "最令人困惑或可以改进的方面是什么？",
    couldImprove: "感觉不清楚或令人沮丧的任何事情...",
    anythingUnclear: "感觉不清楚或令人沮丧的任何事情...",
    generalFeedback: "关于您的日志精灵体验还有其他想法吗？",
    whatYouLove: "您喜欢的，可以更好的，改进想法...",
    bugReports: "您遇到任何错误或技术问题吗？",
    technicalIssues: "描述您遇到的任何问题...",
    describeProblem: "描述您遇到的任何问题...",
    thankYouBeta: "感谢您成为Beta探索者！ 🌟",
    betaExplorer: "您的反馈直接塑造了我们如何构建日志精灵。作为我们的早期用户之一，您正在帮助创造一种更温和有效的网络安全学习方式。",
    directlyShapes: "您的反馈直接塑造了我们如何构建日志精灵。",
    gentleEffective: "帮助创造一种更温和有效的网络安全学习方式。",
    sendingFeedback: "发送中...",
    submitFeedback: "提交反馈",
    valuableFeedback: "感谢您宝贵的反馈！ 🌟",
    helpsBetter: "您的见解帮助我们为每个人创造更好的学习体验。",
    previous: "上一步",
    next: "下一步",
    skip: "跳过",
    
    gameHiccup: "游戏故障！ 🌱",
    dontWorry: "别担心！日志精灵正在修复。您的进度是安全的。",
    loglingsFix: "日志精灵正在修复",
    errorId: "错误ID",
    tryAgainAttempts: "再试一次（剩余{attempts}次尝试）",
    returnForest: "返回森林之家",
    reportBug: "报告错误",
    
    sessionComplete: "会话完成！",
    wellDone: "做得好！您已完成安全冒险。",
    statsBreakdown: "统计详情",
    totalScore: "总分",
    finalAccuracy: "最终准确率",
    timeSpent: "花费时间",
    roundsCompleted: "完成轮数",
    perfectRounds: "完美轮数",
    encouragementMessages: "鼓励消息",
    playAgain: "再玩一次",
    
    realWorldInsight: "现实世界洞察"
  }
};

export const languageNames: Record<Language, string> = {
  en: "English",
  ja: "日本語",
  es: "Español",
  fr: "Français",
  ko: "한국어",
  zh: "中文"
};

export const getLanguageFlag = (language: Language): string => {
  const flags: Record<Language, string> = {
    en: "🇺🇸",
    ja: "🇯🇵",
    es: "🇪🇸",
    fr: "🇫🇷",
    ko: "🇰🇷",
    zh: "🇨🇳"
  };
  return flags[language];
};
