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

export const events: Event[] = [
  {
    type: "Spring Break",
    title: "No Meeting",
    desc: "No meeting due to Spring Break. Enjoy your break!",
    date: "2026-03-18",
    time: "4:30 PM",
    endTime: "6:30 PM",
    location: "N/A"
  },
  {
    type: "Info",
    title: "Cowboy Con",
    desc: "Come say hi at the annual Cowboy Con event that is FREE for our OSU and Stillwater community! They'll have a variety of activities including a Super Smash Bro Tournament, Cosplay Contest, FlipBook Photobooth, Trivia, vendors from all over the state & much more! Note: This happens during our regular meeting time.",
    date: "2026-03-25",
    time: "5:00 PM",
    endTime: "9:00 PM",
    location: "Student Union Ballroom (SU 265)"
  },
  {
    type: "Game Jam",
    title: "April Jam Finale",
    desc: "Join us for the April Jam finale! Play and chat about the games that were made during March.",
    date: "2026-04-01",
    time: "4:30 PM",
    endTime: "6:30 PM",
    location: "MSCS 445"
  },
  {
    type: "Meeting",
    title: "TBD",
    desc: "Event details to be announced. Check back soon!",
    date: "2026-04-08",
    time: "4:30 PM",
    endTime: "6:30 PM",
    location: "MSCS 445"
  },
  {
    type: "Special",
    title: "Officer Selection and Election",
    desc: "Join us for the officer selection and election! Vote for the next year's leadership team.",
    date: "2026-04-15",
    time: "4:30 PM",
    endTime: "6:30 PM",
    location: "MSCS 445"
  },
  {
    type: "Special",
    title: "Meet a Doom Developer",
    desc: "Our last event of the semester! Michael Woodard, Senior Gameplay Programmer at id Software and founder of VGDC, will join us virtually to talk about his work on Doom: Eternal and Doom: The Dark Ages, his role in founding the club, and answer your questions.",
    date: "2026-04-22",
    time: "4:30 PM",
    endTime: "6:30 PM",
    location: "MSCS 445"
  },
  {
    type: "Meeting",
    title: "Officer Meeting (2027-2028 Planning)",
    desc: "Officer meeting for the 2027-2028 academic year, including both new and outgoing officers.",
    date: "2026-04-30",
    time: "4:30 PM",
    endTime: "6:30 PM",
    location: "MSCS 445"
  }
];
