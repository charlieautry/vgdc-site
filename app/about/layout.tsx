import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Oklahoma State University Video Game Development Club (OSU VGDC), our mission, officers, and club history.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
