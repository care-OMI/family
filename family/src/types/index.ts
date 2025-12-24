// src/types/index.ts

export type UserRole = 'wife' | 'husband';

export interface WishlistItem {
  id: string;
  title: string;
  price?: string;
  imageUrl?: string;
  addedBy: UserRole;
  // 'pending' means added by wife, 'approved' means confirmed by husband
  status: 'pending' | 'approved' | 'purchased'; 
  aiBrief?: string;       // AI-generated context for the husband
  aiSuggestion?: string;  // AI-generated actionable advice
  createdAt: number;
}

export interface SearchRecord {
  query: string;
  timestamp: number;
}