import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'ja' | 'ko' | 'zh';

export interface Translations {
  of: string;
  dailyChallenge: string;
  joy: string;
  whatIsLoglings: string;
  cozy: string;
  professionalTraining: string;
  lovinglyCreatedBy: string;
  
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
}

const englishTranslations: Translations = {
  of: "of",
  dailyChallenge: "Daily Challenge",
  joy: "Joy",
  whatIsLoglings: "What is Loglings?",
  cozy: "Cozy",
  professionalTraining: "Professional Training",
  lovinglyCreatedBy: "Lovingly created by",
  
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
  realWorldSkills: "Real-world skills delivered gently"
};

const spanishTranslations: Translations = {
  of: "de",
  dailyChallenge: "Desafío Diario",
  joy: "Alegría",
  whatIsLoglings: "¿Qué es Loglings?",
  cozy: "Acogedor",
  professionalTraining: "Entrenamiento Profesional",
  lovinglyCreatedBy: "Creado con amor por",
  
  // GameIntroFeatures Spanish
  analyzeComplexSecurityLogs: "Analizar registros de seguridad complejos y patrones de incidentes",
  practiceIncidentResponse: "Practicar respuesta a incidentes y caza de amenazas",
  learnThreatIntelligence: "Aprender inteligencia de amenazas y análisis forense",
  buildSkillsForSOC: "Desarrollar habilidades para roles de analista SOC",
  masteringAdvancedScenarios: "Dominar escenarios avanzados y casos del mundo real",
  properIncidentHandling: "Manejo adecuado de incidentes y documentación",
  identifyingSubtleThreats: "Identificar amenazas sutiles y patrones de ataque",
  professionalSkillBadges: "Insignias de habilidades profesionales y certificaciones",
  readGentleLogStories: "Leer historias suaves de registros en entornos forestales acogedores",
  helpLoglingsUnderstand: "Ayudar a los Loglings a entender lo que ven",
  learnTogetherEveryChoice: "Aprender juntos - cada elección enseña algo nuevo",
  collectCozyMoments: "Recopilar momentos acogedores y descubrimientos pacíficos",
  helpingLoglingsFeel: "Ayudar a los Loglings a sentirse seguros y comprendidos",
  noticingCuriousThings: "Notar cosas curiosas en el bosque digital",
  learningSomethingNew: "Aprender algo nuevo sobre mantenerse seguro",
  gentleEncouragement: "Ánimo suave y crecimiento positivo",
  yourAdventureAwaits: "Tu Aventura {mode} Te Espera",
  professional: "Profesional",
  whatYoullDo: "Lo Que Harás",
  howYoullGrow: "Cómo Crecerás",
  
  // GameIntroGuides Spanish
  analystPipDescription: "Analista de seguridad experto especializado en detección de amenazas y respuesta a incidentes",
  detectiveLunaDescription: "Especialista investigativo que descubre amenazas ocultas y analiza patrones de ataque",
  guardianSageDescription: "Arquitecto de seguridad senior enfocado en estrategias de defensa y protección de sistemas",
  pipTheSafeLogling: "Pip, el Logling Seguro",
  lunaTheCuriousLogling: "Luna, la Logling Curiosa",
  sageTheAlertLogling: "Sage, el Logling Alerta",
  
  // GameIntroHeader Spanish
  professionalSecurityAdventures: "Aventuras de Seguridad Profesional",
  welcomeToYourCybersecuritySkillBuildingJourney: "Bienvenido a tu viaje de desarrollo de habilidades de ciberseguridad",
  cozySecurityAdventures: "Aventuras de Seguridad Acogedoras",
  welcomeToAGentleWorld: "Bienvenido a un mundo suave de aprendizaje de ciberseguridad",
  
  // GamePlay Spanish
  preparingEnhancedAdventure: "Preparando tu aventura de seguridad mejorada...",
  sessionStats: "Estadísticas de Sesión",
  
  // GameResults Spanish
  exceptional: "Excepcional",
  excellent: "Excelente",
  great: "Genial",
  good: "Bueno",
  learning: "Aprendiendo",
  outstandingMessage: "¡Trabajo excepcional! Has mostrado una intuición de ciberseguridad excepcional.",
  excellentWorkMessage: "¡Excelente trabajo! Tu conciencia de seguridad está creciendo fuerte.",
  greatJobMessage: "¡Gran trabajo! Estás desarrollando instintos de seguridad sólidos.",
  goodProgressMessage: "¡Buen progreso! Todo experto fue una vez principiante.",
  everyExpertMessage: "Todo experto fue una vez principiante. ¡Sigue explorando!",
  improvementTip1: "Enfócate en entender el contexto alrededor de cada entrada de registro - quién, qué, cuándo, dónde.",
  improvementTip2: "Busca patrones y anomalías que rompan el comportamiento normal.",
  improvementTip3: "¡Lo estás haciendo excelente! Intenta explorar diferentes tipos de escenarios para ampliar tu experiencia.",
  adventureComplete: "¡Aventura Completa!",
  performance: "Rendimiento",
  joyPoints: "Puntos de Alegría",
  time: "Tiempo",
  progressJourney: "Viaje de Progreso",
  totalAdventures: "Aventuras Totales",
  avgScore: "Puntuación Promedio",
  trend: "Tendencia",
  nextGrowthStep: "Siguiente Paso de Crecimiento",
  
  // ImprovedOnboarding Spanish
  differentKindOfLearning: "Un Tipo Diferente de Aprendizaje",
  welcomeToGentleApproach: "Bienvenido a un enfoque suave para la educación en ciberseguridad",
  traditionalCybersecurityTraining: "El entrenamiento tradicional en ciberseguridad puede sentirse abrumador, estresante o intimidante. Creemos que aprender sobre seguridad digital debería sentirse acogedor y alentador.",
  ourLearningPhilosophy: "Nuestra Filosofía de Aprendizaje",
  curiosityOverFear: "Curiosidad sobre Miedo",
  weExploreThreats: "Exploramos amenazas con asombro, no preocupación",
  growthMindset: "Mentalidad de Crecimiento",
  everyMistakeIsLearning: "Cada error es una oportunidad de aprendizaje",
  supportiveCommunity: "Comunidad de Apoyo",
  youreNotAlone: "No estás solo en este viaje",
  practicalWisdom: "Sabiduría Práctica",
  realWorldSkills: "Habilidades del mundo real entregadas suavemente"
};

const frenchTranslations: Translations = {
  of: "de",
  dailyChallenge: "Défi Quotidien",
  joy: "Joie",
  whatIsLoglings: "Qu'est-ce que Loglings?",
  cozy: "Douillet",
  professionalTraining: "Formation Professionnelle",
  lovinglyCreatedBy: "Créé avec amour par",
  
  // GameIntroFeatures French
  analyzeComplexSecurityLogs: "Analyser des journaux de sécurité complexes et des modèles d'incidents",
  practiceIncidentResponse: "Pratiquer la réponse aux incidents et la chasse aux menaces",
  learnThreatIntelligence: "Apprendre l'intelligence des menaces et l'analyse judiciaire",
  buildSkillsForSOC: "Développer des compétences pour les rôles d'analyste SOC",
  masteringAdvancedScenarios: "Maîtriser des scénarios avancés et des cas du monde réel",
  properIncidentHandling: "Gestion appropriée des incidents et documentation",
  identifyingSubtleThreats: "Identifier les menaces subtiles et les modèles d'attaque",
  professionalSkillBadges: "Badges de compétences professionnelles et certifications",
  readGentleLogStories: "Lire des histoires douces de journaux dans des environnements forestiers douillets",
  helpLoglingsUnderstand: "Aider les Loglings à comprendre ce qu'ils voient",
  learnTogetherEveryChoice: "Apprendre ensemble - chaque choix enseigne quelque chose de nouveau",
  collectCozyMoments: "Collecter des moments douillets et des découvertes paisibles",
  helpingLoglingsFeel: "Aider les Loglings à se sentir en sécurité et compris",
  noticingCuriousThings: "Remarquer des choses curieuses dans la forêt numérique",
  learningSomethingNew: "Apprendre quelque chose de nouveau sur la sécurité",
  gentleEncouragement: "Encouragement doux et croissance positive",
  yourAdventureAwaits: "Votre Aventure {mode} Vous Attend",
  professional: "Professionnel",
  whatYoullDo: "Ce Que Vous Ferez",
  howYoullGrow: "Comment Vous Allez Grandir",
  
  // GameIntroGuides French
  analystPipDescription: "Analyste de sécurité expert spécialisé dans la détection des menaces et la réponse aux incidents",
  detectiveLunaDescription: "Spécialiste d'investigation qui découvre des menaces cachées et analyse des modèles d'attaque",
  guardianSageDescription: "Architecte de sécurité senior axé sur les stratégies de défense et la protection des systèmes",
  pipTheSafeLogling: "Pip, le Logling Sûr",
  lunaTheCuriousLogling: "Luna, le Logling Curieux",
  sageTheAlertLogling: "Sage, le Logling Alerte",
  
  // GameIntroHeader French
  professionalSecurityAdventures: "Aventures de Sécurité Professionnelle",
  welcomeToYourCybersecuritySkillBuildingJourney: "Bienvenue dans votre parcours de développement de compétences en cybersécurité",
  cozySecurityAdventures: "Aventures de Sécurité Douillettes",
  welcomeToAGentleWorld: "Bienvenue dans un monde doux d'apprentissage de la cybersécurité",
  
  // GamePlay French
  preparingEnhancedAdventure: "Préparation de votre aventure de sécurité améliorée...",
  sessionStats: "Statistiques de Session",
  
  // GameResults French
  exceptional: "Exceptionnel",
  excellent: "Excellent",
  great: "Génial",
  good: "Bon",
  learning: "Apprentissage",
  outstandingMessage: "Travail exceptionnel ! Vous avez montré une intuition exceptionnelle en cybersécurité.",
  excellentWorkMessage: "Excellent travail ! Votre sensibilisation à la sécurité se renforce.",
  greatJobMessage: "Super travail ! Vous développez de solides instincts de sécurité.",
  goodProgressMessage: "Bon progrès ! Chaque expert a été un jour débutant.",
  everyExpertMessage: "Chaque expert a été un jour débutant. Continuez à explorer !",
  improvementTip1: "Concentrez-vous sur la compréhension du contexte de chaque entrée de journal - qui, quoi, quand, où.",
  improvementTip2: "Recherchez des modèles et des anomalies qui rompent le comportement normal.",
  improvementTip3: "Vous faites excellent ! Essayez d'explorer différents types de scénarios pour élargir votre expertise.",
  adventureComplete: "Aventure Complète !",
  performance: "Performance",
  joyPoints: "Points de Joie",
  time: "Temps",
  progressJourney: "Parcours de Progrès",
  totalAdventures: "Aventures Totales",
  avgScore: "Score Moyen",
  trend: "Tendance",
  nextGrowthStep: "Prochain Pas de Croissance",
  
  // ImprovedOnboarding French
  differentKindOfLearning: "Un Type Différent d'Apprentissage",
  welcomeToGentleApproach: "Bienvenue dans une approche douce de l'éducation en cybersécurité",
  traditionalCybersecurityTraining: "La formation traditionnelle en cybersécurité peut sembler écrasante, stressante ou intimidante. Nous croyons que l'apprentissage de la sécurité numérique devrait être accueillant et encourageant.",
  ourLearningPhilosophy: "Notre Philosophie d'Apprentissage",
  curiosityOverFear: "Curiosité plutôt que Peur",
  weExploreThreats: "Nous explorons les menaces avec émerveillement, pas d'inquiétude",
  growthMindset: "Mentalité de Croissance",
  everyMistakeIsLearning: "Chaque erreur est une opportunité d'apprentissage",
  supportiveCommunity: "Communauté de Soutien",
  youreNotAlone: "Vous n'êtes pas seul dans ce voyage",
  practicalWisdom: "Sagesse Pratique",
  realWorldSkills: "Compétences du monde réel livrées en douceur"
};

const japaneseTranslations: Translations = {
  of: "の",
  dailyChallenge: "日課チャレンジ",
  joy: "喜び",
  whatIsLoglings: "Loglingsとは？",
  cozy: "心地良い",
  professionalTraining: "プロフェッショナルトレーニング",
  lovinglyCreatedBy: "愛情を込めて作成",
  
  // GameIntroFeatures Japanese
  analyzeComplexSecurityLogs: "複雑なセキュリティログとインシデントパターンを分析する",
  practiceIncidentResponse: "インシデントレスポンスと脅威ハンティングを実践する",
  learnThreatIntelligence: "脅威インテリジェンスとフォレンジック分析を学ぶ",
  buildSkillsForSOC: "SOCアナリストの役割に必要なスキルを構築する",
  masteringAdvancedScenarios: "高度なシナリオと実世界のケースをマスターする",
  properIncidentHandling: "インシデントの適切な処理と文書化",
  identifyingSubtleThreats: "微妙な脅威と攻撃パターンを特定する",
  professionalSkillBadges: "プロフェッショナルスキルバッジと認定",
  readGentleLogStories: "心地良い森の環境で優しいログストーリーを読む",
  helpLoglingsUnderstand: "Loglingsが見たものを理解するのを助ける",
  learnTogetherEveryChoice: "一緒に学ぶ - すべての選択が新しいことを教える",
  collectCozyMoments: "心地良い瞬間と平和な発見を集める",
  helpingLoglingsFeel: "Loglingsが安全で理解されていると感じるのを助ける",
  noticingCuriousThings: "デジタルフォレストでの好奇心を持つことに気づく",
  learningSomethingNew: "安全を保つための新しいことを学ぶ",
  gentleEncouragement: "優しい励ましと前向きな成長",
  yourAdventureAwaits: "あなたの{mode}の冒険が待っています",
  professional: "プロフェッショナル",
  whatYoullDo: "あなたがすること",
  howYoullGrow: "あなたが成長する方法",
  
  // GameIntroGuides Japanese
  analystPipDescription: "脅威検出とインシデントレスポンスを専門とするセキュリティアナリスト",
  detectiveLunaDescription: "隠れた脅威を発見し、攻撃パターンを分析する調査専門家",
  guardianSageDescription: "防御戦略とシステム保護に焦点を当てたシニアセキュリティアーキテクト",
  pipTheSafeLogling: "安全なLoglingのPip",
  lunaTheCuriousLogling: "好奇心旺盛なLoglingのLuna",
  sageTheAlertLogling: "警戒心の強いLoglingのSage",
  
  // GameIntroHeader Japanese
  professionalSecurityAdventures: "プロフェッショナルセキュリティアドベンチャー",
  welcomeToYourCybersecuritySkillBuildingJourney: "あなたのサイバーセキュリティスキル構築の旅へようこそ",
  cozySecurityAdventures: "心地良いセキュリティアドベンチャー",
  welcomeToAGentleWorld: "サイバーセキュリティ学習の穏やかな世界へようこそ",
  
  // GamePlay Japanese
  preparingEnhancedAdventure: "あなたの強化されたセキュリティアドベンチャーを準備中...",
  sessionStats: "セッション統計",
  
  // GameResults Japanese
  exceptional: "例外的",
  excellent: "優れた",
  great: "素晴らしい",
  good: "良い",
  learning: "学習中",
  outstandingMessage: "素晴らしい仕事！あなたは例外的なサイバーセキュリティの直感を示しました。",
  excellentWorkMessage: "優れた仕事！あなたのセキュリティ意識は強くなっています。",
  greatJobMessage: "素晴らしい仕事！あなたはしっかりとしたセキュリティの本能を育てています。",
  goodProgressMessage: "良い進捗！すべての専門家はかつて初心者でした。",
  everyExpertMessage: "すべての専門家はかつて初心者でした。探求を続けてください！",
  improvementTip1: "各ログエントリの周りの文脈を理解することに焦点を当ててください - 誰、何、いつ、どこ。",
  improvementTip2: "通常の行動を破るパターンや異常を探してください。",
  improvementTip3: "あなたは素晴らしいことをしています！異なるシナリオタイプを探求して専門知識を広げてみてください。",
  adventureComplete: "アドベンチャー完了！",
  performance: "パフォーマンス",
  joyPoints: "喜びポイント",
  time: "時間",
  progressJourney: "進捗の旅",
  totalAdventures: "合計アドベンチャー",
  avgScore: "平均スコア",
  trend: "トレンド",
  nextGrowthStep: "次の成長ステップ",
  
  // ImprovedOnboarding Japanese
  differentKindOfLearning: "異なる学習の形",
  welcomeToGentleApproach: "サイバーセキュリティ教育への穏やかなアプローチへようこそ",
  traditionalCybersecurityTraining: "従来のサイバーセキュリティトレーニングは圧倒的、ストレスが多い、または威圧的に感じることがあります。私たちは、デジタルセキュリティについて学ぶことは歓迎され、励まされるべきだと信じています。",
  ourLearningPhilosophy: "私たちの学習哲学",
  curiosityOverFear: "恐れよりも好奇心",
  weExploreThreats: "私たちは脅威を心配ではなく、驚きと共に探求します",
  growthMindset: "成長の心構え",
  everyMistakeIsLearning: "すべての間違いは学びの機会です",
  supportiveCommunity: "支援的なコミュニティ",
  youreNotAlone: "この旅の中であなたは一人ではありません",
  practicalWisdom: "実践的な知恵",
  realWorldSkills: "現実のスキルを優しく提供"
};

const koreanTranslations: Translations = {
  of: "의",
  dailyChallenge: "일일 도전",
  joy: "기쁨",
  whatIsLoglings: "로글링스란?",
  cozy: "아늑한",
  professionalTraining: "전문 교육",
  lovinglyCreatedBy: "사랑으로 만든",
  
  // GameIntroFeatures Korean
  analyzeComplexSecurityLogs: "복잡한 보안 로그 및 사건 패턴 분석",
  practiceIncidentResponse: "사건 대응 및 위협 사냥 연습",
  learnThreatIntelligence: "위협 인텔리전스 및 포렌식 분석 학습",
  buildSkillsForSOC: "SOC 분석가 역할을 위한 기술 구축",
  masteringAdvancedScenarios: "고급 시나리오 및 실제 사례 마스터하기",
  properIncidentHandling: "사건 처리 및 문서화 적절히 수행하기",
  identifyingSubtleThreats: "미세한 위협 및 공격 패턴 식별하기",
  professionalSkillBadges: "전문 기술 배지 및 인증",
  readGentleLogStories: "아늑한 숲 환경에서 부드러운 로그 이야기를 읽기",
  helpLoglingsUnderstand: "로그링스가 보는 것을 이해하도록 돕기",
  learnTogetherEveryChoice: "함께 배우기 - 모든 선택이 새로운 것을 가르친다",
  collectCozyMoments: "아늑한 순간과 평화로운 발견 수집하기",
  helpingLoglingsFeel: "로그링스가 안전하고 이해받는 느낌을 주기",
  noticingCuriousThings: "디지털 숲에서 호기심을 느끼기",
  learningSomethingNew: "안전하게 지내는 것에 대해 새로운 것을 배우기",
  gentleEncouragement: "부드러운 격려와 긍정적인 성장",
  yourAdventureAwaits: "당신의 {mode} 모험이 기다립니다",
  professional: "전문가",
  whatYoullDo: "당신이 할 일",
  howYoullGrow: "당신이 성장하는 방법",
  
  // GameIntroGuides Korean
  analystPipDescription: "위협 탐지 및 사건 대응을 전문으로 하는 보안 분석가",
  detectiveLunaDescription: "숨겨진 위협을 발견하고 공격 패턴을 분석하는 조사 전문가",
  guardianSageDescription: "방어 전략 및 시스템 보호에 중점을 둔 시니어 보안 아키텍트",
  pipTheSafeLogling: "안전한 로그링의 핀",
  lunaTheCuriousLogling: "호기심 많은 로그링의 루나",
  sageTheAlertLogling: "경계하는 로그링의 세이지",
  
  // GameIntroHeader Korean
  professionalSecurityAdventures: "전문 보안 모험",
  welcomeToYourCybersecuritySkillBuildingJourney: "당신의 사이버 보안 기술 구축 여정에 오신 것을 환영합니다",
  cozySecurityAdventures: "아늑한 보안 모험",
  welcomeToAGentleWorld: "사이버 보안 학습의 부드러운 세계에 오신 것을 환영합니다",
  
  // GamePlay Korean
  preparingEnhancedAdventure: "강화된 보안 모험을 준비 중입니다...",
  sessionStats: "세션 통계",
  
  // GameResults Korean
  exceptional: "예외적",
  excellent: "우수한",
  great: "훌륭한",
  good: "좋은",
  learning: "학습 중",
  outstandingMessage: "탁월한 작업! 당신은 예외적인 사이버 보안 직관을 보여주었습니다.",
  excellentWorkMessage: "우수한 작업! 당신의 보안 인식이 강해지고 있습니다.",
  greatJobMessage: "훌륭한 작업! 당신은 확고한 보안 본능을 개발하고 있습니다.",
  goodProgressMessage: "좋은 진행! 모든 전문가는 한때 초보자였습니다.",
  everyExpertMessage: "모든 전문가는 한때 초보자였습니다. 계속 탐구하세요!",
  improvementTip1: "각 로그 항목의 주변 맥락을 이해하는 데 집중하세요 - 누가, 무엇을, 언제, 어디서.",
  improvementTip2: "정상 행동을 깨는 패턴과 이상을 찾아보세요.",
  improvementTip3: "당신은 훌륭한 일을 하고 있습니다! 다양한 시나리오 유형을 탐색하여 전문 지식을 넓혀보세요.",
  adventureComplete: "모험 완료!",
  performance: "성능",
  joyPoints: "기쁨 포인트",
  time: "시간",
  progressJourney: "진행 여정",
  totalAdventures: "총 모험",
  avgScore: "평균 점수",
  trend: "추세",
  nextGrowthStep: "다음 성장 단계",
  
  // ImprovedOnboarding Korean
  differentKindOfLearning: "다른 종류의 학습",
  welcomeToGentleApproach: "사이버 보안 교육에 대한 부드러운 접근 방식에 오신 것을 환영합니다",
  traditionalCybersecurityTraining: "전통적인 사이버 보안 교육은 압도적이거나 스트레스를 주거나 위협적으로 느껴질 수 있습니다. 우리는 디지털 안전에 대해 배우는 것이 환영받고 격려받아야 한다고 믿습니다.",
  ourLearningPhilosophy: "우리의 학습 철학",
  curiosityOverFear: "두려움보다 호기심",
  weExploreThreats: "우리는 걱정이 아닌 경이로움으로 위협을 탐구합니다",
  growthMindset: "성장 마인드셋",
  everyMistakeIsLearning: "모든 실수는 학습의 기회입니다",
  supportiveCommunity: "지원하는 커뮤니티",
  youreNotAlone: "이 여정에서 당신은 혼자가 아닙니다",
  practicalWisdom: "실용적인 지혜",
  realWorldSkills: "현실 세계의 기술을 부드럽게 전달합니다"
};

const chineseTranslations: Translations = {
  of: "的",
  dailyChallenge: "每日挑战",
  joy: "喜悦",
  whatIsLoglings: "什么是Loglings？",
  cozy: "舒适",
  professionalTraining: "专业培训",
  lovinglyCreatedBy: "用爱创造",
  
  // GameIntroFeatures Chinese
  analyzeComplexSecurityLogs: "分析复杂的安全日志和事件模式",
  practiceIncidentResponse: "练习事件响应和威胁狩猎",
  learnThreatIntelligence: "学习威胁情报和取证分析",
  buildSkillsForSOC: "为SOC分析师角色建立技能",
  masteringAdvancedScenarios: "掌握高级场景和真实案例",
  properIncidentHandling: "适当处理事件和文档",
  identifyingSubtleThreats: "识别微妙的威胁和攻击模式",
  professionalSkillBadges: "专业技能徽章和认证",
  readGentleLogStories: "在舒适的森林环境中阅读温和的日志故事",
  helpLoglingsUnderstand: "帮助Loglings理解他们所看到的",
  learnTogetherEveryChoice: "一起学习 - 每个选择都教会新东西",
  collectCozyMoments: "收集舒适的时刻和宁静的发现",
  helpingLoglingsFeel: "帮助Loglings感到安全和被理解",
  noticingCuriousThings: "在数字森林中注意好奇的事物",
  learningSomethingNew: "学习保持安全的新知识",
  gentleEncouragement: "温和的鼓励和积极的成长",
  yourAdventureAwaits: "你的{mode}冒险在等待着你",
  professional: "专业",
  whatYoullDo: "你将做什么",
  howYoullGrow: "你将如何成长",
  
  // GameIntroGuides Chinese
  analystPipDescription: "专注于威胁检测和事件响应的安全分析师",
  detectiveLunaDescription: "揭示隐藏威胁并分析攻击模式的调查专家",
  guardianSageDescription: "专注于防御策略和系统保护的高级安全架构师",
  pipTheSafeLogling: "安全的Logling Pip",
  lunaTheCuriousLogling: "好奇的Logling Luna",
  sageTheAlertLogling: "警觉的Logling Sage",
  
  // GameIntroHeader Chinese
  professionalSecurityAdventures: "专业安全冒险",
  welcomeToYourCybersecuritySkillBuildingJourney: "欢迎来到你的网络安全技能建设之旅",
  cozySecurityAdventures: "舒适的安全冒险",
  welcomeToAGentleWorld: "欢迎来到温和的网络安全学习世界",
  
  // GamePlay Chinese
  preparingEnhancedAdventure: "准备你的增强安全冒险...",
  sessionStats: "会话统计",
  
  // GameResults Chinese
  exceptional: "卓越",
  excellent: "优秀",
  great: "伟大",
  good: "好",
  learning: "学习中",
  outstandingMessage: "出色的工作！你展现了卓越的网络安全直觉。",
  excellentWorkMessage: "优秀的工作！你的安全意识正在增强。",
  greatJobMessage: "干得好！你正在培养扎实的安全本能。",
  goodProgressMessage: "良好的进展！每个专家曾经都是初学者。",
  everyExpertMessage: "每个专家曾经都是初学者。继续探索！",
  improvementTip1: "专注于理解每个日志条目的上下文 - 谁、什么、何时、何地。",
  improvementTip2: "寻找打破正常行为的模式和异常。",
  improvementTip3: "你做得很好！尝试探索不同类型的场景以拓宽你的专业知识。",
  adventureComplete: "冒险完成！",
  performance: "表现",
  joyPoints: "快乐点",
  time: "时间",
  progressJourney: "进步之旅",
  totalAdventures: "总冒险",
  avgScore: "平均分数",
  trend: "趋势",
  nextGrowthStep: "下一个成长步骤",
  
  // ImprovedOnboarding Chinese
  differentKindOfLearning: "不同类型的学习",
  welcomeToGentleApproach: "欢迎来到温和的网络安全教育方法",
  traditionalCybersecurityTraining: "传统的网络安全培训可能会让人感到压倒性、压力大或令人畏惧。我们相信，学习数字安全应该是受欢迎和鼓励的。",
  ourLearningPhilosophy: "我们的学习哲学",
  curiosityOverFear: "好奇心胜过恐惧",
  weExploreThreats: "我们以惊奇而非担忧的态度探索威胁",
  growthMindset: "成长心态",
  everyMistakeIsLearning: "每个错误都是学习的机会",
  supportiveCommunity: "支持性社区",
  youreNotAlone: "在这段旅程中你并不孤单",
  practicalWisdom: "实用智慧",
  realWorldSkills: "温和地传授现实世界的技能"
};

export const translations = {
  en: englishTranslations,
  es: spanishTranslations,
  fr: frenchTranslations,
  ja: japaneseTranslations,
  ko: koreanTranslations,
  zh: chineseTranslations
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
}

export const I18nProvider = ({ children }: I18nProviderProps) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('loglings-language');
    if (saved && saved in translations) {
      return saved as Language;
    }
    
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('ja')) return 'ja';
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('ko')) return 'ko';
    if (browserLang.startsWith('zh')) return 'zh';
    
    return 'en'; // Default fallback
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('loglings-language', lang);
  };

  const t = translations[language];

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
