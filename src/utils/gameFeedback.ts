
import { AdvancedScenario } from './advancedScenarioDatabase';

export const getEnhancedFeedback = (
  playerChoice: string,
  scenario: AdvancedScenario,
  correct: boolean
): string => {
  if (!scenario) return 'Something went wrong, but great job trying!';
  
  let feedback = correct ? scenario.explanation : 
    `${scenario.explanation}\n\n💡 Learning insight: ${scenario.learningTip || 'Keep practicing!'}`;
  
  feedback += `\n\n🔍 Next steps: ${scenario.nextSteps || 'Continue learning!'}`;
  feedback += `\n\n🌍 Real-world context: ${scenario.realWorldContext || 'Every scenario teaches us something valuable.'}`;
  
  return feedback;
};
