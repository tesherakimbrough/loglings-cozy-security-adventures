
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
    
    // Game Introduction
    gameTitle: "Loglings: Cozy Security Adventures",
    gameSubtitle: "Where learning cybersecurity feels like a warm hug 🤗",
    beginAdventure: "Begin Cozy Adventure",
    howToPlay: "How to Play",
    meetYourGuides: "Meet Your Forest Guides",
    todaysChallenge: "Today's Cozy Challenge",
    
    // Character Descriptions
    pipDescription: "Pip helps you identify safe, everyday activities in the digital forest",
    lunaDescription: "Luna guides you through suspicious events that need gentle investigation",
    sageDescription: "Sage protects the forest from serious threats with ancient wisdom",
    
    // Game Modes
    cozyEveryday: "Cozy Everyday Discovery",
    careerPro: "Career Pro Mode",
    
    // Tutorial & Onboarding
    tutorial: "Tutorial",
    skipTutorial: "Skip Tutorial",
    nextTip: "Next Tip",
    gotIt: "Got it!",
    
    // Settings
    settings: "Settings",
    language: "Language",
    audio: "Audio",
    notifications: "Notifications",
    
    // Common Actions
    continue: "Continue",
    back: "Back",
    save: "Save",
    cancel: "Cancel",
    close: "Close"
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
    
    // Game Introduction
    gameTitle: "ログリングス：コージーセキュリティアドベンチャー",
    gameSubtitle: "サイバーセキュリティを温かく学ぼう 🤗",
    beginAdventure: "コージーな冒険を始める",
    howToPlay: "遊び方",
    meetYourGuides: "森のガイドに会おう",
    todaysChallenge: "今日のコージーチャレンジ",
    
    // Character Descriptions
    pipDescription: "ピップはデジタルの森で安全な日常活動を見つけるお手伝いをします",
    lunaDescription: "ルナは優しい調査が必要な疑わしい出来事を案内します",
    sageDescription: "セージは古代の知恵で森を深刻な脅威から守ります",
    
    // Game Modes
    cozyEveryday: "コージーな日常探索",
    careerPro: "キャリアプロモード",
    
    // Tutorial & Onboarding
    tutorial: "チュートリアル",
    skipTutorial: "チュートリアルをスキップ",
    nextTip: "次のヒント",
    gotIt: "わかりました！",
    
    // Settings
    settings: "設定",
    language: "言語",
    audio: "オーディオ",
    notifications: "通知",
    
    // Common Actions
    continue: "続ける",
    back: "戻る",
    save: "保存",
    cancel: "キャンセル",
    close: "閉じる"
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
    
    // Game Introduction
    gameTitle: "Loglings: Aventuras Acogedoras de Seguridad",
    gameSubtitle: "Donde aprender ciberseguridad se siente como un abrazo cálido 🤗",
    beginAdventure: "Comenzar Aventura Acogedora",
    howToPlay: "Cómo Jugar",
    meetYourGuides: "Conoce a tus Guías del Bosque",
    todaysChallenge: "Desafío Acogedor de Hoy",
    
    // Character Descriptions
    pipDescription: "Pip te ayuda a identificar actividades seguras y cotidianas en el bosque digital",
    lunaDescription: "Luna te guía a través de eventos sospechosos que necesitan investigación gentil",
    sageDescription: "Sage protege el bosque de amenazas serias con sabiduría ancestral",
    
    // Game Modes
    cozyEveryday: "Descubrimiento Cotidiano Acogedor",
    careerPro: "Modo Profesional de Carrera",
    
    // Tutorial & Onboarding
    tutorial: "Tutorial",
    skipTutorial: "Saltar Tutorial",
    nextTip: "Siguiente Consejo",
    gotIt: "¡Entendido!",
    
    // Settings
    settings: "Configuración",
    language: "Idioma",
    audio: "Audio",
    notifications: "Notificaciones",
    
    // Common Actions
    continue: "Continuar",
    back: "Atrás",
    save: "Guardar",
    cancel: "Cancelar",
    close: "Cerrar"
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
    
    // Game Introduction
    gameTitle: "Loglings : Aventures Douillettes de Sécurité",
    gameSubtitle: "Où apprendre la cybersécurité ressemble à un câlin chaleureux 🤗",
    beginAdventure: "Commencer l'Aventure Douillette",
    howToPlay: "Comment Jouer",
    meetYourGuides: "Rencontrez vos Guides de la Forêt",
    todaysChallenge: "Défi Douillet d'Aujourd'hui",
    
    // Character Descriptions
    pipDescription: "Pip vous aide à identifier les activités sûres et quotidiennes dans la forêt numérique",
    lunaDescription: "Luna vous guide à travers des événements suspects nécessitant une enquête douce",
    sageDescription: "Sage protège la forêt contre les menaces sérieuses avec une sagesse ancestrale",
    
    // Game Modes
    cozyEveryday: "Découverte Quotidienne Douillette",
    careerPro: "Mode Professionnel de Carrière",
    
    // Tutorial & Onboarding
    tutorial: "Tutoriel",
    skipTutorial: "Passer le Tutoriel",
    nextTip: "Conseil Suivant",
    gotIt: "Compris !",
    
    // Settings
    settings: "Paramètres",
    language: "Langue",
    audio: "Audio",
    notifications: "Notifications",
    
    // Common Actions
    continue: "Continuer",
    back: "Retour",
    save: "Sauvegarder",
    cancel: "Annuler",
    close: "Fermer"
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
    
    // Game Introduction
    gameTitle: "로글링스: 아늑한 보안 모험",
    gameSubtitle: "사이버보안을 배우는 것이 따뜻한 포옹처럼 느껴지는 곳 🤗",
    beginAdventure: "아늑한 모험 시작하기",
    howToPlay: "게임 방법",
    meetYourGuides: "숲의 가이드들을 만나보세요",
    todaysChallenge: "오늘의 아늑한 도전",
    
    // Character Descriptions
    pipDescription: "핍은 디지털 숲에서 안전한 일상 활동을 식별하는 데 도움을 줍니다",
    lunaDescription: "루나는 부드러운 조사가 필요한 의심스러운 이벤트를 안내합니다",
    sageDescription: "세이지는 고대의 지혜로 숲을 심각한 위협으로부터 보호합니다",
    
    // Game Modes
    cozyEveryday: "아늑한 일상 탐색",
    careerPro: "커리어 프로 모드",
    
    // Tutorial & Onboarding
    tutorial: "튜토리얼",
    skipTutorial: "튜토리얼 건너뛰기",
    nextTip: "다음 팁",
    gotIt: "알겠습니다!",
    
    // Settings
    settings: "설정",
    language: "언어",
    audio: "오디오",
    notifications: "알림",
    
    // Common Actions
    continue: "계속",
    back: "뒤로",
    save: "저장",
    cancel: "취소",
    close: "닫기"
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
    
    // Game Introduction
    gameTitle: "日志精灵：舒适安全冒险",
    gameSubtitle: "让学习网络安全就像温暖的拥抱 🤗",
    beginAdventure: "开始舒适冒险",
    howToPlay: "如何游玩",
    meetYourGuides: "遇见您的森林向导",
    todaysChallenge: "今日舒适挑战",
    
    // Character Descriptions
    pipDescription: "皮普帮助您识别数字森林中安全的日常活动",
    lunaDescription: "露娜引导您处理需要温和调查的可疑事件",
    sageDescription: "赛奇用古老智慧保护森林免受严重威胁",
    
    // Game Modes
    cozyEveryday: "舒适日常探索",
    careerPro: "职业专业模式",
    
    // Tutorial & Onboarding
    tutorial: "教程",
    skipTutorial: "跳过教程",
    nextTip: "下一个提示",
    gotIt: "明白了！",
    
    // Settings
    settings: "设置",
    language: "语言",
    audio: "音频",
    notifications: "通知",
    
    // Common Actions
    continue: "继续",
    back: "返回",
    save: "保存",
    cancel: "取消",
    close: "关闭"
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
