import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "@/app/Navigation";
import Footer from "@/app/components/Footer";

const poppins = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OSU Video Game Dev Club",
  description: "The official site for the Oklahoma State University Video Game Development Club.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased flex flex-col min-h-screen`}>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
