import { Component, ChangeDetectionStrategy, Input, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

export interface TechNodeInfo {
  id: string;
  name: string;
  tier: string;
  phase: string;
  phaseNumber?: number;
  weeks: string;
  tierColor: 'blue' | 'rose' | 'emerald' | 'amber' | 'purple' | 'red';
  role: string;
  description: string;
  skills: string[];
  logoUrls: string[];
  connections: string[];
}

export const TECH_NODES_DATA: Record<string, TechNodeInfo> = {
  angular: {
    id: 'angular',
    name: 'Angular',
    tier: 'Web Client Layer',
    phase: '3. Web Engineering',
    phaseNumber: 3,
    weeks: 'Weeks 5–7',
    tierColor: 'rose',
    role: 'Enterprise Web Application Client',
    description: 'Signals reactive state management, standalone component architecture, dependency injection, and typed forms.',
    skills: [
      'Signals reactive state & computed values',
      'Standalone component architecture',
      'Typed reactive forms & custom validators',
      'Client routing & guards',
      'WCAG AA accessible user experiences'
    ],
    logoUrls: ['images/tech/angular.svg'],
    connections: ['nestjs', 'typescript', 'devops', 'ai']
  },
  react: {
    id: 'react',
    name: 'React',
    tier: 'Web Client Layer',
    phase: '3. Web Engineering',
    phaseNumber: 3,
    weeks: 'Weeks 5–7',
    tierColor: 'blue',
    role: 'Dynamic Component-Driven Web Client',
    description: 'Modern React hooks, custom state workflows, component lifecycle, virtual DOM reconciliation, and routing.',
    skills: [
      'Modern React hooks (useState, useEffect, useMemo)',
      'Custom reusable hooks & state workflows',
      'Component-driven UI architecture',
      'REST & WebSocket client integration',
      'Unit testing with Vitest & Testing Library'
    ],
    logoUrls: ['images/tech/react.svg'],
    connections: ['nestjs', 'typescript', 'devops', 'ai']
  },
  'react-native': {
    id: 'react-native',
    name: 'React Native + Expo',
    tier: 'Mobile Client Layer',
    phase: '4. Mobile App Engineering',
    phaseNumber: 4,
    weeks: 'Weeks 8–9',
    tierColor: 'amber',
    role: 'Cross-Platform Mobile Application Client',
    description: 'Unified codebase for iOS and Android native apps with Expo managed workflow, native navigation, and device APIs.',
    skills: [
      'Expo managed workflow & developer toolchain',
      'React Navigation for native screen stacks',
      'Native device permissions, camera & storage',
      'Offline state synchronization',
      'EAS build & app store distribution'
    ],
    logoUrls: ['images/tech/react.svg', 'images/tech/expo.svg'],
    connections: ['nestjs', 'typescript', 'devops', 'ai']
  },
  nestjs: {
    id: 'nestjs',
    name: 'NestJS',
    tier: 'Backend & API Gateway',
    phase: '2. Backend & Real-Time APIs',
    phaseNumber: 2,
    weeks: 'Weeks 3–4',
    tierColor: 'red',
    role: 'Modular RESTful APIs & Real-Time Gateway',
    description: 'Enterprise TypeScript backend with dependency injection, modular controllers, services, WebSocket gateways, and JWT authentication.',
    skills: [
      'Modular dependency injection architecture',
      'RESTful API controllers & services',
      'Real-time WebSocket gateways (Socket.io)',
      'JWT authentication, guards & interceptors',
      'Validation pipes & typed request DTOs'
    ],
    logoUrls: ['images/tech/nestjs.svg'],
    connections: ['mongodb', 'angular', 'react', 'react-native', 'typescript', 'devops', 'ai']
  },
  mongodb: {
    id: 'mongodb',
    name: 'MongoDB & Mongoose',
    tier: 'Data Persistence Layer',
    phase: '2. Backend & Real-Time APIs',
    phaseNumber: 2,
    weeks: 'Weeks 3–4',
    tierColor: 'emerald',
    role: 'Document Database & Data Modeling',
    description: 'Flexible JSON-like document persistence, schema modeling, query indexing, transactions, and aggregation pipelines with Mongoose.',
    skills: [
      'Mongoose schema definition & validation',
      'Relational document references & population',
      'Aggregation pipelines for advanced queries',
      'Compound indexing for query performance',
      'Transactions & resilient database connections'
    ],
    logoUrls: ['images/tech/mongodb.svg'],
    connections: ['nestjs', 'devops', 'ai']
  },
  typescript: {
    id: 'typescript',
    name: 'JavaScript & TypeScript',
    tier: 'Universal Language Core',
    phase: '1. Foundations & Developer Tools',
    phaseNumber: 1,
    weeks: 'Weeks 1–2',
    tierColor: 'blue',
    role: 'Shared Typed Foundation Across All Tiers',
    description: 'Single unified programming language across backend microservices, web clients, and mobile apps with end-to-end type safety.',
    skills: [
      'Advanced TypeScript types, generics & utility types',
      'Modern ESNext syntax & async asynchronous patterns',
      'Shared data transfer object (DTO) interfaces',
      'Modular code organization & clean architecture',
      'Type guards, Discriminated Unions & strict mode'
    ],
    logoUrls: ['images/tech/javascript.svg', 'images/tech/typescript.svg'],
    connections: ['angular', 'react', 'react-native', 'nestjs', 'devops', 'ai']
  },
  devops: {
    id: 'devops',
    name: 'Testing & DevOps',
    tier: 'Quality & Cloud Delivery',
    phase: '5. Live Project & Cloud Delivery',
    phaseNumber: 5,
    weeks: 'Weeks 10–12',
    tierColor: 'purple',
    role: 'Automated Testing, Docker & CI/CD Pipelines',
    description: 'End-to-end automation with Playwright, containerization with Docker, Git branching PRs, and automated cloud deployments.',
    skills: [
      'Playwright end-to-end testing across browsers',
      'Docker multi-stage containerization',
      'GitHub Actions automated CI/CD workflows',
      'Environment configuration & secret management',
      'Cloud edge deployment & monitoring'
    ],
    logoUrls: ['images/tech/playwright.svg', 'images/tech/docker.svg'],
    connections: ['angular', 'react', 'react-native', 'nestjs', 'mongodb', 'ai']
  },
  ai: {
    id: 'ai',
    name: 'AI as Co-Pilot',
    tier: 'Intelligent Engineering Workflow',
    phase: 'Continuous across all phases',
    weeks: 'Continuous across all layers',
    tierColor: 'rose',
    role: 'AI-Assisted Pair Programming & Task Decomposition',
    description: 'Modern AI coding assistants used responsibly across all phases for systematic task planning, test synthesis, debugging, and code reviews.',
    skills: [
      'Prompt-driven architectural planning & scoping',
      'Task decomposition into iterative steps',
      'Automated unit & E2E test synthesis',
      'Systematic error root-cause diagnosis',
      'Automated code reviews against quality standards'
    ],
    logoUrls: ['images/tech/ai-sparkle.svg'],
    connections: ['angular', 'react', 'react-native', 'nestjs', 'mongodb', 'typescript', 'devops']
  }
};

@Component({
  selector: 'app-tech-stack-graph',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './tech-stack-graph.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechStackGraphComponent {
  @Input() allowExpand = true;
  @Input() isInspectionModal = false;

  private readonly dialog = inject(MatDialog);

  readonly selectedNodeId = signal<string>('nestjs');

  readonly allNodeIds: string[] = [
    'typescript',
    'nestjs',
    'mongodb',
    'angular',
    'react',
    'react-native',
    'devops',
    'ai'
  ];

  readonly allNodes = computed(() =>
    this.allNodeIds.map(id => TECH_NODES_DATA[id])
  );

  readonly activeNode = computed<TechNodeInfo>(() => {
    const id = this.selectedNodeId();
    return TECH_NODES_DATA[id] || TECH_NODES_DATA['nestjs'];
  });

  selectNode(id: string, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.selectedNodeId.set(id);
  }

  isNodeActive(id: string): boolean {
    return this.selectedNodeId() === id;
  }

  isConnectionHighlighted(from: string, to: string): boolean {
    const current = this.selectedNodeId();
    if (!current) return false;
    return (current === from || current === to);
  }

  async openExpandedView(event?: MouseEvent): Promise<void> {
    if (event) {
      event.stopPropagation();
    }
    if (!this.allowExpand) return;

    try {
      const { TechStackInspectionDialogComponent } = await import(
        '../../../features/modals/tech-stack-inspection-dialog/tech-stack-inspection-dialog.component'
      );

      this.dialog.open(TechStackInspectionDialogComponent, {
        panelClass: ['tech-stack-modal-panel', 'p-0', 'bg-transparent', 'shadow-none', 'overflow-visible'],
        maxWidth: 'min(96vw, 1200px)',
        width: '100%',
        maxHeight: '94dvh',
        autoFocus: false,
        restoreFocus: true
      });
    } catch (err) {
      console.error('Error opening tech stack expanded view:', err);
    }
  }
}
