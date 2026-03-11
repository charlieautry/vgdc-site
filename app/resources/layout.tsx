import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Browse OSU VGDC game development resources, tutorials, tools, links, and downloadable files for students and creators.",
  alternates: {
    canonical: "/resources",
  },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
