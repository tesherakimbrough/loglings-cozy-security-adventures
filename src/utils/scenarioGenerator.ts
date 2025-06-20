
import { generateContextualScenario, AdvancedScenario } from './advancedScenarioDatabase';

export interface ScenarioGenerationOptions {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  usedScenarioIds: string[];
  currentRound: number;
  totalRounds: number;
}

export const generateScenarioWithFallbacks = (options: ScenarioGenerationOptions): AdvancedScenario => {
  const { difficulty, usedScenarioIds, currentRound, totalRounds } = options;
  
  console.log('Generating new scenario with difficulty:', difficulty);
  console.log('Used scenario IDs:', usedScenarioIds.length);
  
  // Reset used scenarios if we've used too many (prevents getting stuck)
  let currentUsedIds = usedScenarioIds;
  if (usedScenarioIds.length > 15) {
    console.log('Resetting used scenarios to prevent exhaustion');
    currentUsedIds = [];
  }
  
  let attempts = 0;
  let newScenario = null;
  
  // Try to generate a unique scenario, with fallback logic
  while (attempts < 5) {
    try {
      newScenario = generateContextualScenario(difficulty, currentUsedIds);
      
      if (newScenario && newScenario.id && !currentUsedIds.includes(newScenario.id)) {
        break; // Found a valid, unused scenario
      } else if (newScenario && newScenario.id) {
        // If we got a used scenario, allow it if we've tried multiple times
        if (attempts >= 3) {
          console.log('Allowing repeated scenario after multiple attempts');
          break;
        }
      }
    } catch (generationError) {
      console.error('Scenario generation attempt failed:', generationError);
    }
    
    attempts++;
  }
  
  // Final fallback if all attempts failed
  if (!newScenario || !newScenario.id) {
    console.log('All generation attempts failed, creating emergency fallback');
    newScenario = createEmergencyFallbackScenario();
  }
  
  console.log('Generated scenario:', newScenario.id);
  return newScenario;
};

export const createEmergencyFallbackScenario = (): AdvancedScenario => {
  return {
    id: `emergency-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    category: 'authentication',
    threatLevel: 'safe',
    difficulty: 'beginner',
    timestamp: new Date().toISOString(),
    sourceIP: '192.168.1.100',
    eventType: 'Normal Login',
    user: 'user@company.com',
    location: 'Office',
    status: 'SUCCESS',
    details: 'User logged in normally during business hours from their usual location.',
    explanation: 'This appears to be normal authentication activity from a trusted location.',
    learningTip: 'Normal logins should happen during expected hours from known locations.',
    nextSteps: 'Continue monitoring for any unusual patterns.',
    realWorldContext: 'Regular authentication patterns help establish baselines for detecting anomalies.'
  };
};

export const createUltimateFallbackScenario = (): AdvancedScenario => {
  return {
    id: `fallback-${Date.now()}`,
    category: 'authentication',
    threatLevel: 'safe',
    difficulty: 'beginner',
    timestamp: new Date().toISOString(),
    sourceIP: '192.168.1.100',
    eventType: 'Normal Login',
    user: 'user@company.com',
    location: 'Office',
    status: 'SUCCESS',
    details: 'User logged in normally during business hours from their usual location.',
    explanation: 'This appears to be normal authentication activity from a trusted location.',
    learningTip: 'Normal logins should happen during expected hours from known locations.',
    nextSteps: 'Continue monitoring for any unusual patterns.',
    realWorldContext: 'Regular authentication patterns help establish baselines for detecting anomalies.'
  };
};
