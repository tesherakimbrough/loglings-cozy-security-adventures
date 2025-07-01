
export interface GameData {
  score: number;
  timeElapsed: number;
  correctAnswers: number;
  incorrectAnswers: number;
  sessionsPlayed: number;
  totalQuestions: number;
  accuracy: number;
  totalRounds: number;
  difficulty?: string;
}
