import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "@/app/Navigation";
import Footer from "@/app/components/Footer";

const poppins = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin"] });

const siteUrl = "https://osuvgdc.com";

const seoSearchAliases = [
  "osu video game dev club",
  "osu vgdc",
  "okstate vidoe game club",
  "okstate game dev club",
  "osu game devs",
  "oklahoma gave developers",
  "osu game dev club",
  "oklahoma state university video game developers club",
  "osu video game developers club",
  "okstate vgdc",
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OSU Video Game Dev Club",
    template: "%s | OSU VGDC",
  },
  description:
    "Official website of the Oklahoma State University Video Game Development Club (OSU VGDC). Find meetings, game jams, resources, and community updates.",
  keywords: [
    "OSU Video Game Dev Club",
    "OSU VGDC",
    "Oklahoma State University Video Game Development Club",
    "Oklahoma State game development club",
    "okstate vgdc",
    "okstate game dev club",
    "Stillwater game development",
    "student game developers",
    ...seoSearchAliases,
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "OSU Video Game Dev Club",
    description:
      "Official website of the Oklahoma State University Video Game Development Club (OSU VGDC).",
    siteName: "OSU Video Game Dev Club",
    locale: "en_US",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 1200,
        alt: "OSU VGDC logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "OSU Video Game Dev Club",
    description:
      "Meet OSU game developers, build games, and join semester game jams through OSU VGDC.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Oklahoma State University Video Game Development Club",
  alternateName: ["OSU VGDC", "OSU Video Game Dev Club", ...seoSearchAliases],
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  sameAs: ["https://campuslink.okstate.edu/organization/videogamedevelopment"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased flex flex-col min-h-screen`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
