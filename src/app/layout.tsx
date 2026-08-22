import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = "https://arbikullakshi.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Arbi Kullakshi — Software Engineer",
  description:
    "Arbi Kullakshi is a software engineer working across backend systems, full-stack products, infrastructure, and autonomous robotics.",
  alternates: { canonical: "/" },
  icons: [{ rel: "icon", url: "/assets/favicon.svg", type: "image/svg+xml" }],
  openGraph: {
    type: "website",
    siteName: "Arbi Kullakshi",
    title: "Arbi Kullakshi — Software Engineer",
    description:
      "Systems, full-stack platforms, infrastructure, and autonomous robotics.",
    url: "/",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arbi Kullakshi, Software Engineer — Systems, Full Stack and Robotics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arbi Kullakshi — Software Engineer",
    description:
      "Systems, full-stack platforms, infrastructure, and autonomous robotics.",
    images: ["/assets/og-image.png"],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0b0d14",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Arbi Kullakshi",
  url: siteUrl,
  email: "mailto:contact@arbikullakshi.com",
  jobTitle: "Software Engineer",
  homeLocation: { "@type": "Place", name: "Tirana, Albania" },
  sameAs: [
    "https://github.com/somethim",
    "https://www.linkedin.com/in/arbi-kullakshi-214986222/",
  ],
  knowsAbout: [
    "Backend systems",
    "Full-stack development",
    "Infrastructure automation",
    "Rust",
    "Autonomous robotics",
    "ROS 2",
    "SLAM",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          // This constant contains public profile data only.
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be embedded as raw JSON and contains no user-controlled values.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
