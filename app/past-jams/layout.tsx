import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Past Game Jams",
  description:
    "Explore past OSU VGDC game jam submissions, winners, and projects from Oklahoma State University student developers.",
  alternates: {
    canonical: "/past-jams",
  },
};

export default function PastJamsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
