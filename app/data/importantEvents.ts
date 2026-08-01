import importantEventsJson from '@/content/important-events.json';

export interface ImportantEvent {
  title: string;
  image: string;
  description: string;
  date: string;
  link?: string;
  linkText?: string;
}

export const importantEvents: ImportantEvent[] =
  importantEventsJson.items as ImportantEvent[];
