/** Typed view of content/important-events.json, edited via /admin. Empty or absent image = none rendered. */
import importantEventsJson from '@/content/important-events.json';

export interface ImportantEvent {
  title: string;
  image?: string;
  description: string;
  date: string;
  link?: string;
  linkText?: string;
}

export const importantEvents: ImportantEvent[] = importantEventsJson.items;
