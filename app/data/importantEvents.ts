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
    title: "The April Jam",
    image: "/images/vgdc-chilljam1.jpg",
    description: "From March 11th to April 1st, participate in our April Jam! Create a game based on the theme announced at our March 11th meeting. All skill levels are welcome, and you can work alone or in teams.",
    date: "Spring 2026",
    link: "https://itch.io/jam/osu-spring-2026-chill-jam",
    linkText: "Join the Jam!"
  }
];