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
    title: "OSU Spring Game Jam",
    image: "/images/gamejambanner.png",
    description: "Join us for our biggest event of the semester with a $300 prize pool! 72 hours to create an amazing game from scratch. Prizes, food, and fun!",
    date: "Feb 23 - 26",
    link: "https://itch.io/jam/osu-game-jam-spring-2026",
    linkText: "Register here"
  }
];
