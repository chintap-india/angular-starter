export interface CustomerItem {
  id: string;
  name: string;
  category: string;
  services: string[];
  location: string;
  description: string;
  websiteUrl: string;
  workUrl?: string;
  logoUrl?: string;
  logoDarkUrl?: string;
  tagline?: string;
  context?: string;
  findingIdentity?: {
    title: string;
    paragraphs: string[];
  };
  whatWeWorkedOn?: string[];
  result?: {
    title: string;
    paragraphs: string[];
  };
  meta?: {
    customer: string;
    location: string;
    website: string;
    contribution: string;
  };
}
