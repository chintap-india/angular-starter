export interface PartnerItem {
  id: string;
  name: string;
  category: 'Technology' | 'Media' | 'Platform' | 'Creative' | 'Research' | string;
  description: string;
  logoUrl?: string;
  websiteUrl?: string;
  featured?: boolean;
}
