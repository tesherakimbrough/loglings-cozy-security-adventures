
import { AdvancedScenario } from './advancedScenarioDatabase';
import { scenarioContentManager, ScenarioGenerationConfig } from './scenarioContentManager';
import { generateContextualScenario } from './advancedScenarioDatabase';

export interface EnhancedGenerationOptions {
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  usedScenarioIds: string[];
  currentRound: number;
  totalRounds: number;
  categoryPreferences?: string[];
  adaptiveDifficulty?: boolean;
}

export class EnhancedScenarioGenerator {
  private static instance: EnhancedScenarioGenerator;
  private scenarioPool: AdvancedScenario[] = [];
  private poolSize = 200; // Large pool for variety

  private constructor() {
    this.initializeScenarioPool();
  }

  static getInstance(): EnhancedScenarioGenerator {
    if (!EnhancedScenarioGenerator.instance) {
      EnhancedScenarioGenerator.instance = new EnhancedScenarioGenerator();
    }
    return EnhancedScenarioGenerator.instance;
  }

  private initializeScenarioPool(): void {
    console.log('Initializing enhanced scenario pool...');
    
    // Generate a diverse pool of scenarios
    const config: ScenarioGenerationConfig = {
      totalNeeded: this.poolSize,
      difficultyDistribution: {
        beginner: 0.4,    // 40% beginner
        intermediate: 0.4, // 40% intermediate
        advanced: 0.2     // 20% advanced
      },
      categoryDistribution: {
        authentication: 0.3,
        email_security: 0.25,
        network: 0.2,
        malware: 0.1,
        social_engineering: 0.15
      },
      excludeIds: []
    };

    try {
      // Generate scenarios using templates
      const generatedScenarios = scenarioContentManager.generateScenarioSet(config);
      
      // Add existing scenarios from database
      const existingScenarios = this.loadExistingScenarios();
      
      this.scenarioPool = [...generatedScenarios, ...existingScenarios];
      
      console.log(`Enhanced scenario pool initialized with ${this.scenarioPool.length} scenarios`);
    } catch (error) {
      console.error('Error initializing scenario pool:', error);
      // Fallback to basic pool
      this.scenarioPool = this.createFallbackPool();
    }
  }

  private loadExistingScenarios(): AdvancedScenario[] {
    try {
      // Try to load from existing scenario database
      const scenarios: AdvancedScenario[] = [];
      
      // Add some from existing database if available
      for (let i = 0; i < 50; i++) {
        try {
          const scenario = generateContextualScenario('beginner', []);
          scenarios.push(scenario);
        } catch (error) {
          // Skip failed generations
          continue;
        }
      }
      
      return scenarios;
    } catch (error) {
      console.log('Could not load existing scenarios, using generated only');
      return [];
    }
  }

  private createFallbackPool(): AdvancedScenario[] {
    // Emergency fallback scenarios
    return Array.from({ length: 20 }, (_, i) => ({
      id: `fallback-${i}`,
      category: 'authentication',
      threatLevel: 'safe' as const,
      difficulty: 'beginner' as const,
      timestamp: new Date().toISOString(),
      sourceIP: '192.168.1.100',
      eventType: 'Normal Login',
      user: `user${i}@company.com`,
      location: 'Office',
      status: 'SUCCESS',
      details: `User ${i} logged in normally during business hours from their usual location.`,
      explanation: 'This appears to be normal authentication activity from a trusted location.',
      learningTip: 'Normal logins should happen during expected hours from known locations.',
      nextSteps: 'Continue monitoring for any unusual patterns.',
      realWorldContext: 'Regular authentication patterns help establish baselines for detecting anomalies.'
    }));
  }

  generateScenario(options: EnhancedGenerationOptions): AdvancedScenario {
    console.log('Generating enhanced scenario with options:', options);

    // Filter available scenarios
    let availableScenarios = this.scenarioPool.filter(scenario => 
      scenario.difficulty === options.difficulty && 
      !options.usedScenarioIds.includes(scenario.id)
    );

    // Apply category preferences if specified
    if (options.categoryPreferences && options.categoryPreferences.length > 0) {
      const categoryFiltered = availableScenarios.filter(scenario =>
        options.categoryPreferences!.includes(scenario.category)
      );
      if (categoryFiltered.length > 0) {
        availableScenarios = categoryFiltered;
      }
    }

    // If we're running low on scenarios, generate more
    if (availableScenarios.length < 5) {
      console.log('Scenario pool running low, generating more...');
      this.expandScenarioPool(options.difficulty);
      availableScenarios = this.scenarioPool.filter(scenario => 
        scenario.difficulty === options.difficulty && 
        !options.usedScenarioIds.includes(scenario.id)
      );
    }

    // Select scenario with variety logic
    if (availableScenarios.length === 0) {
      console.log('No available scenarios, creating emergency scenario');
      return this.createEmergencyScenario(options);
    }

    // Weighted selection for better variety
    const selectedScenario = this.selectWithVariety(availableScenarios, options);
    
    console.log(`Selected scenario: ${selectedScenario.id} (${selectedScenario.category})`);
    return selectedScenario;
  }

  private expandScenarioPool(difficulty: 'beginner' | 'intermediate' | 'advanced'): void {
    const config: ScenarioGenerationConfig = {
      totalNeeded: 50,
      difficultyDistribution: {
        beginner: difficulty === 'beginner' ? 1 : 0,
        intermediate: difficulty === 'intermediate' ? 1 : 0,
        advanced: difficulty === 'advanced' ? 1 : 0
      },
      categoryDistribution: {
        authentication: 0.3,
        email_security: 0.25,
        network: 0.2,
        malware: 0.1,
        social_engineering: 0.15
      },
      excludeIds: this.scenarioPool.map(s => s.id)
    };

    const newScenarios = scenarioContentManager.generateScenarioSet(config);
    this.scenarioPool.push(...newScenarios);
    
    console.log(`Expanded pool with ${newScenarios.length} new ${difficulty} scenarios`);
  }

  private selectWithVariety(scenarios: AdvancedScenario[], options: EnhancedGenerationOptions): AdvancedScenario {
    // Group by category to ensure variety
    const categoryCounts: Record<string, AdvancedScenario[]> = {};
    scenarios.forEach(scenario => {
      if (!categoryCounts[scenario.category]) {
        categoryCounts[scenario.category] = [];
      }
      categoryCounts[scenario.category].push(scenario);
    });

    // Prefer categories we haven't used recently
    const categories = Object.keys(categoryCounts);
    const selectedCategory = categories[Math.floor(Math.random() * categories.length)];
    const categoryScenarios = categoryCounts[selectedCategory];
    
    return categoryScenarios[Math.floor(Math.random() * categoryScenarios.length)];
  }

  private createEmergencyScenario(options: EnhancedGenerationOptions): AdvancedScenario {
    return {
      id: `emergency-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      category: 'authentication',
      threatLevel: 'safe',
      difficulty: options.difficulty,
      timestamp: new Date().toISOString(),
      sourceIP: '192.168.1.100',
      eventType: 'Emergency Scenario',
      user: 'system@company.com',
      location: 'Office Network',
      status: 'SUCCESS',
      details: 'This is an emergency generated scenario to ensure game continuity.',
      explanation: 'Emergency scenario created when no other scenarios were available.',
      learningTip: 'Always have fallback procedures in security operations.',
      nextSteps: 'Review scenario generation system.',
      realWorldContext: 'Redundancy and fallback systems are crucial in cybersecurity.'
    };
  }

  getPoolStats(): { total: number; byDifficulty: Record<string, number>; byCategory: Record<string, number> } {
    const stats = {
      total: this.scenarioPool.length,
      byDifficulty: {} as Record<string, number>,
      byCategory: {} as Record<string, number>
    };

    this.scenarioPool.forEach(scenario => {
      stats.byDifficulty[scenario.difficulty] = (stats.byDifficulty[scenario.difficulty] || 0) + 1;
      stats.byCategory[scenario.category] = (stats.byCategory[scenario.category] || 0) + 1;
    });

    return stats;
  }

  refreshPool(): void {
    scenarioContentManager.resetUsedCombinations();
    this.initializeScenarioPool();
  }
}

// Export singleton instance
export const enhancedScenarioGenerator = EnhancedScenarioGenerator.getInstance();
