export interface NewsItem {
  id: string;
  title: string;
  date: string | null;
  category: string;
  body: string;
  verified: boolean;
}

export const NEWS: NewsItem[] = [];
