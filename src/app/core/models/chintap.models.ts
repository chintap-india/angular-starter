export interface Pillar {
  id: 'things' | 'apps' | 'possibilities';
  title: string;
  tagline: string;
  description: string;
  icon: string;
  examples: string[];
}

export interface Capability {
  id: string;
  title: string;
  description: string;
  icon: string;
  examples: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  summary: string;
  details: string;
}

export interface ConversationInquiry {
  name: string;
  email: string;
  organization?: string;
  type: 'problem' | 'idea' | 'connected' | 'general';
  message: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
}
