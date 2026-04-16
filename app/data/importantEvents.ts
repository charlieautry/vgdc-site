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
    title: "Meet a Doom Developer",
    image: "/images/vgdc-meetadoomdeveloper.jpg",
    description: "Join us for our last event of the semester! Michael Woodard, Senior Gameplay Programmer at id Software and founder of our club, will be joining us virtually to talk about his experience working on Doom: Eternal and Doom: The Dark Ages, his role in founding VGDC, and answer your questions.",
    date: "April 22nd, 2026",
    link: "",
    linkText: ""
  },
  {
    title: "Have a Great Summer!",
    image: "None",
    description: "That's a wrap on the semester! Thanks to everyone who came out this year. Have a fantastic summer, and we'll see you in the fall!",
    date: "Summer 2026",
    link: "",
    linkText: ""
  }
]
