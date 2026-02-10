export interface Event {
  type: string;
  title: string;
  desc: string;
  date: string;
  time: string;
  image?: string;
}

export const events: Event[] = [
  {
    type: "Meeting",
    title: "Weekly VGDC Meeting",
    desc: "Join us for our weekly game development meeting! We'll be discussing current projects and sharing tips.",
    date: "2026-02-12",
    time: "6:00 PM",
    image: "/placeholder-event-1.jpg"
  },
  {
    type: "Workshop",
    title: "Godot Engine Workshop",
    desc: "Learn the basics of Godot Engine in this hands-on workshop. Perfect for beginners!",
    date: "2026-02-19",
    time: "6:00 PM",
    image: "/placeholder-event-2.jpg"
  },
  {
    type: "Game Jam",
    title: "Spring Game Jam 2026",
    desc: "48-hour game jam! Create a game from scratch with your team. Prizes for top submissions!",
    date: "2026-03-15",
    time: "12:00 PM",
    image: "/placeholder-event-3.jpg"
  }
];
