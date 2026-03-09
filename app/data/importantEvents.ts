export interface ImportantEvent {
  title: string;
  image: string;
  description: string;
  date: string;
  link?: string;
  linkText?: string;
}

// if you dont want an image with your card, just do "None"

export const importantEvents: ImportantEvent[] = [
  {
    title: "Events Coming Soon!",
    image: "/images/VGDC_Spring_2026_Flyer.PNG",
    description: "Nothing to see here right now, but stay tuned for more information about our upcoming events!",
    date: "Spring 2026",
    link: "",
    linkText: ""
  }
];