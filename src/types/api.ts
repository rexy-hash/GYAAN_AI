
export interface AIModel {
  id: string;
  name: string;
  description: string;
  source: 'GitHub' | 'HuggingFace' | 'ArXiv' | 'Other';
  sourceUrl: string;
  category: string;
  categoryColor: string;
  tags: string[];
  stars: number;
  date: string;
  createdAt: string; // ISO Date string
  isSubscribed?: boolean; // Added to track subscription status
}

export interface AICategory {
  id: string;
  title: string;
  count: number;
  growth: number;
  color: string;
  icon: string;
}

export interface TrendData {
  date: string;
  models: number;
}

export interface APIResponse<T> {
  data: T;
  error: string | null;
}
