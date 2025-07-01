import { generateContextualScenario, AdvancedScenario } from './advancedScenarioDatabase';
import { enhancedScenarioGenerator, EnhancedGenerationOptions } from './enhancedScenarioGenerator';

export interface ScenarioGenerationOptions {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  usedScenarioIds: string[];
  currentRound: number;
  totalRounds: number;
}

export const generateScenarioWithFallbacks = (options: ScenarioGenerationOptions): AdvancedScenario => {
  const { difficulty, usedScenarioIds, currentRound, totalRounds } = options;
  
  console.log('Generating scenario with enhanced system:', difficulty);
  console.log('Used scenario IDs:', usedScenarioIds.length);
  
  try {
    // Use the enhanced scenario generator
    const enhancedOptions: EnhancedGenerationOptions = {
      difficulty,
      usedScenarioIds,
      currentRound,
      totalRounds,
      adaptiveDifficulty: true
    };

    const scenario = enhancedScenarioGenerator.generateScenario(enhancedOptions);
    console.log('Generated enhanced scenario:', scenario.id);
    return scenario;
    
  } catch (error) {
    console.error('Enhanced generation failed, falling back to original system:', error);
    
    // Fallback to original system
    let attempts = 0;
    let newScenario = null;
    
    while (attempts < 5) {
      try {
        newScenario = generateContextualScenario(difficulty, usedScenarioIds);
        
        if (newScenario && newScenario.id && !usedScenarioIds.includes(newScenario.id)) {
          break;
        } else if (newScenario && newScenario.id && attempts >= 3) {
          console.log('Allowing repeated scenario after multiple attempts');
          break;
        }
      } catch (generationError) {
        console.error('Original generation attempt failed:', generationError);
      }
      
      attempts++;
    }
    
    if (!newScenario || !newScenario.id) {
      console.log('All generation attempts failed, creating ultimate fallback');
      newScenario = createUltimateFallbackScenario();
    }
    
    return newScenario;
  }
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
  return createEmergencyFallbackScenario();
};
