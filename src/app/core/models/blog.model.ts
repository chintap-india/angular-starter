export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  authorRole?: string;
  authorAvatarUrl?: string;
  category: string;
  tags: string[];
  summary: string;
  coverImage?: string;
  featured?: boolean;
  readingTimeMinutes: number;
  body?: string;
}

export interface BlogFilter {
  category?: string;
  tag?: string;
  searchQuery?: string;
}
