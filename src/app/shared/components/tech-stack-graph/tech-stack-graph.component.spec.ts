import { describe, it, expect } from 'vitest';
import '@angular/compiler';
import { TECH_NODES_DATA } from './tech-stack-graph.component';

describe('TechStackGraphComponent Data & Phase Numbering', () => {
  it('should define all 8 technology nodes with authentic tiers, phases, and skills', () => {
    const expectedKeys = ['angular', 'react', 'react-native', 'nestjs', 'mongodb', 'typescript', 'devops', 'ai'];
    for (const key of expectedKeys) {
      expect(TECH_NODES_DATA[key]).toBeDefined();
      expect(TECH_NODES_DATA[key].skills.length).toBeGreaterThan(0);
      if (key !== 'ai') {
        expect(TECH_NODES_DATA[key].phaseNumber).toBeGreaterThanOrEqual(1);
        expect(TECH_NODES_DATA[key].phaseNumber).toBeLessThanOrEqual(5);
      } else {
        expect(TECH_NODES_DATA[key].phaseNumber).toBeUndefined();
      }
    }
  });

  it('should map nodes to the exact 5 curriculum phases with AI as cross-cutting workflow', () => {
    // 1. Weeks 1–2: Foundations & Developer Tools
    expect(TECH_NODES_DATA['typescript'].phaseNumber).toBe(1);
    expect(TECH_NODES_DATA['typescript'].phase).toBe('1. Foundations & Developer Tools');
    expect(TECH_NODES_DATA['typescript'].weeks).toBe('Weeks 1–2');

    // AI as Co-Pilot: Continuous workflow applying across all nodes without phase number
    expect(TECH_NODES_DATA['ai'].phaseNumber).toBeUndefined();
    expect(TECH_NODES_DATA['ai'].phase).toBe('Continuous across all phases');
    expect(TECH_NODES_DATA['ai'].weeks).toBe('Continuous across all layers');
    expect(TECH_NODES_DATA['ai'].connections).toEqual([
      'angular',
      'react',
      'react-native',
      'nestjs',
      'mongodb',
      'typescript',
      'devops'
    ]);

    // 2. Weeks 3–4: Backend & Real-Time APIs
    expect(TECH_NODES_DATA['nestjs'].phaseNumber).toBe(2);
    expect(TECH_NODES_DATA['nestjs'].phase).toBe('2. Backend & Real-Time APIs');
    expect(TECH_NODES_DATA['nestjs'].weeks).toBe('Weeks 3–4');

    expect(TECH_NODES_DATA['mongodb'].phaseNumber).toBe(2);
    expect(TECH_NODES_DATA['mongodb'].phase).toBe('2. Backend & Real-Time APIs');
    expect(TECH_NODES_DATA['mongodb'].weeks).toBe('Weeks 3–4');

    // 3. Weeks 5–7: Web Engineering (Angular & React)
    expect(TECH_NODES_DATA['angular'].phaseNumber).toBe(3);
    expect(TECH_NODES_DATA['angular'].phase).toBe('3. Web Engineering');
    expect(TECH_NODES_DATA['angular'].weeks).toBe('Weeks 5–7');

    expect(TECH_NODES_DATA['react'].phaseNumber).toBe(3);
    expect(TECH_NODES_DATA['react'].phase).toBe('3. Web Engineering');
    expect(TECH_NODES_DATA['react'].weeks).toBe('Weeks 5–7');

    // 4. Weeks 8–9: Mobile App Engineering
    expect(TECH_NODES_DATA['react-native'].phaseNumber).toBe(4);
    expect(TECH_NODES_DATA['react-native'].phase).toBe('4. Mobile App Engineering');
    expect(TECH_NODES_DATA['react-native'].weeks).toBe('Weeks 8–9');

    // 5. Weeks 10–12: Live Project & Cloud Delivery
    expect(TECH_NODES_DATA['devops'].phaseNumber).toBe(5);
    expect(TECH_NODES_DATA['devops'].phase).toBe('5. Live Project & Cloud Delivery');
    expect(TECH_NODES_DATA['devops'].weeks).toBe('Weeks 10–12');
  });
});
