import { CohortCurriculumData } from '../models/curriculum.model';

export const CURRICULUM_DATA: CohortCurriculumData = {
  motto: 'Imagine · Explore · Learn · Build · Test · Launch',
  title: 'Full-Stack & Mobile App Development Cohort',
  subtitle: 'A hands-on programme to learn, build and ship real software with AI assistance.',
  makerSteps: [
    {
      step: '01',
      name: 'Imagine',
      description: 'Start with an idea or a problem worth solving.'
    },
    {
      step: '02',
      name: 'Explore',
      description: 'Understand the possibilities and choose the right approach.'
    },
    {
      step: '03',
      name: 'Learn',
      description: 'Pick up the tools, concepts, and skills you need along the way.'
    },
    {
      step: '04',
      name: 'Build',
      description: 'Turn the idea into a working product, step by step.'
    },
    {
      step: '05',
      name: 'Test',
      description: 'Refine, optimize, and make sure it works well.'
    },
    {
      step: '06',
      name: 'Launch',
      description: 'Share it with the world.'
    }
  ],
  techStack: [
    {
      name: 'JavaScript & TypeScript',
      purpose: 'Shared typed foundation across backend services, modern web clients, and native mobile apps',
      logoKeys: ['javascript', 'typescript']
    },
    {
      name: 'NestJS',
      purpose: 'Enterprise modular architecture for robust RESTful APIs & real-time WebSocket services',
      logoKeys: ['nestjs']
    },
    {
      name: 'MongoDB',
      purpose: 'Document database persistence, flexible schema modeling, and query optimization with Mongoose',
      logoKeys: ['mongodb']
    },
    {
      name: 'Angular',
      purpose: 'Enterprise web application architecture with Signals reactive state, standalone components, and typed forms',
      logoKeys: ['angular']
    },
    {
      name: 'React',
      purpose: 'Dynamic, component-driven user interfaces with modern React hooks, declarative state, and routing',
      logoKeys: ['react']
    },
    {
      name: 'React Native + Expo',
      purpose: 'Cross-platform native mobile applications for iOS and Android with unified codebase and native capabilities',
      logoKeys: ['react', 'expo']
    },
    {
      name: 'Testing & DevOps',
      purpose: 'End-to-end automation with Playwright, containerization with Docker, and automated CI/CD deployment pipelines',
      logoKeys: ['devops']
    },
    {
      name: 'AI as Co-Pilot',
      purpose: 'AI coding assistants for task decomposition, test generation, systematic debugging, and code review',
      logoKeys: ['ai']
    }
  ],
  learningJourney: [
    {
      step: 1,
      title: 'Foundations & Developer Tools',
      weeks: 'Weeks 1–2',
      color: 'blue',
      icon: 'laptop',
      points: [
        'Modern TypeScript & JavaScript',
        'Git branching, PRs & code reviews',
        'AI-assisted engineering workflow',
        'Web architecture & HTTP fundamentals'
      ]
    },
    {
      step: 2,
      title: 'Backend & Real-Time APIs',
      weeks: 'Weeks 3–4',
      color: 'emerald',
      icon: 'database',
      points: [
        'NestJS modular architecture & DI',
        'RESTful & real-time WebSocket APIs',
        'MongoDB schema modeling & Mongoose',
        'JWT authentication & validation guards'
      ]
    },
    {
      step: 3,
      title: 'Web Engineering (Angular & React)',
      weeks: 'Weeks 5–7',
      color: 'rose',
      icon: 'desktop',
      points: [
        'Angular with Signals & standalone components',
        'React with hooks & custom state workflows',
        'Resilient REST & WebSocket API integration',
        'Reactive forms, client routing & accessibility',
        'Component & unit testing with Playwright / Vitest'
      ]
    },
    {
      step: 4,
      title: 'Mobile App Engineering',
      weeks: 'Weeks 8–9',
      color: 'amber',
      icon: 'mobile',
      points: [
        'React Native + Expo cross-platform apps',
        'Native navigation & responsive mobile UI',
        'Shared backend integration & offline states',
        'Device permissions & EAS build pipelines'
      ]
    },
    {
      step: 5,
      title: 'Live Project',
      weeks: 'Weeks 10–12',
      color: 'purple',
      icon: 'target',
      points: [
        'Product planning, architecture & sprint scoping',
        'Full-stack implementation & client integration',
        'Automated CI/CD pipelines & cloud deployment',
        'Live demonstration, portfolio & code walkthrough'
      ]
    }
  ],
  whatYoullAchieve: [
    'Build full-stack web and mobile applications',
    'Work with modern, industry-relevant technologies',
    'Use AI tools effectively and responsibly',
    'Follow professional development workflows (Git, PRs, tests)',
    'Deploy a real application and present it confidently',
    'Build a portfolio of working projects'
  ],
  programmeDetails: [
    {
      label: 'Duration',
      value: '12 weeks / 60 weekdays',
      icon: 'calendar'
    },
    {
      label: 'Schedule',
      value: 'Monday – Friday (Weekends off)',
      icon: 'clock'
    },
    {
      label: 'Starting level',
      value: 'Mixed programming experience',
      icon: 'chart'
    },
    {
      label: 'Ideal for',
      value: 'Aspiring developers, fresh graduates, career switchers and early-career engineers',
      icon: 'users'
    },
    {
      label: 'Outcome',
      value: 'Plan, build, test, deploy, document and demonstrate a full-stack product with web and mobile clients.',
      icon: 'star'
    }
  ],
  footerTagline: 'Academy by Chintap • From ideas to life.'
};
