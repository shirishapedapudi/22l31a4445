// src/types.ts
export interface ShortUrl {
  shortCode: string;
  originalUrl: string;
  clicks: number;
  expiry: number;
}
