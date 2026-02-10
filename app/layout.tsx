import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/app/Navigation";

export const metadata: Metadata = {
  title: "VGDC",
  description: "Video Game Development Club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
