import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

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
        <nav className="bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex space-x-8 h-16 items-center">
              <Link href="/" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href="/about" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
              <Link href="/resources" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Resources
              </Link>
              <Link href="/game-jam" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Game Jam
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
