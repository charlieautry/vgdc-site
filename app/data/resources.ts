/** Typed view of content/resources.json, edited via /admin. */
import resourcesJson from '@/content/resources.json';

export interface Resource {
  title: string;
  description: string;
  type: 'link' | 'youtube' | 'download';
  url: string; // For links and downloads, this is the URL. For YouTube, this is the video ID
  category: string;
  tags: string[];
  image?: string; // Optional OpenGraph image URL
}

// JSON infers `type: string`; narrow only that field so every other field keeps
// real structural checking (a missing required field fails the build).
export const resources: Resource[] = resourcesJson.items.map((r) => ({
  ...r,
  type: r.type as Resource['type'],
}));
