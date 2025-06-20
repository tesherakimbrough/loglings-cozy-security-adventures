
import { AdvancedScenario } from './advancedScenarioDatabase';

export interface ScoringOptions {
  playerChoice: string;
  scenario: AdvancedScenario;
  correct: boolean;
  responseTime: number;
  streakCount: number;
}

export const calculateEnhancedScore = (options: ScoringOptions): number => {
  const { playerChoice, scenario, correct, responseTime, streakCount } = options;
  
  if (!correct) return -10;

  let basePoints = {
    'beginner': 50,
    'intermediate': 75,
    'advanced': 100
  }[scenario.difficulty];

  // Threat level bonus
  const threatBonus = {
    'safe': 1.0,
    'warning': 1.3,
    'critical': 1.5
  }[scenario.threatLevel];

  basePoints *= threatBonus;

  // Speed bonus (under 30 seconds)
  if (responseTime < 30) {
    basePoints *= 1.5;
  } else if (responseTime < 60) {
    basePoints *= 1.2;
  }

  // Streak bonus
  if (streakCount >= 3) {
    basePoints *= 1.3;
  }

  return Math.floor(basePoints);
};
