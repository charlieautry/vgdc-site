import eventsJson from '@/content/events.json';

export interface Event {
  type: string;
  title: string;
  desc: string;
  date: string;
  time: string;
  endDate?: string;
  endTime?: string;
  location?: string;
  image?: string;
}

export const events: Event[] = eventsJson.items as Event[];
