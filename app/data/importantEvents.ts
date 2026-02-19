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
    image: "/images/osugamejamflyer.png",
    description: "Join us for our biggest event of the semester with a $300 prize pool! 72 hours to create a game from scratch. All levels of experience are welcome. Come experience prizes, food, and fun!",
    date: "Feb 23 - 26",
    link: "https://itch.io/jam/osu-game-jam-spring-2026",
    linkText: "Register here"
  },
  {
    title: "Goldfire Studios Q&A",
    image: "https://goldfirestudios.com/images/ogGoldFire.png",
    description: "James Simpson, the founder of the indie game company GoldFire Studios, has agreed to a virtual Q&A for 5pm on this day! We will still meet at 4:30 in our usual room and at 5 we will have the video call on the projector screen. If you've ever wanted to talk to the founder of a video game company now is your chance!",
    date: "Feb 17",
    link: "",
    linkText: ""
  }
];