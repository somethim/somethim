import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { type PropsWithChildren, Suspense } from "react";
import { Background } from "./(main)/_components/background";
import { SmoothScroll } from "./(main)/_components/smooth-scroll";

const rfDewi = localFont({
  src: [
    {
      path: "../../public/fonts/RFDewi-Ultralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/RFDewi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/RFDewi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/RFDewi-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/RFDewi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/RFDewi-Ultrabold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/RFDewi-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-rfdewi",
  display: "swap",
});

const rfDewiExpanded = localFont({
  src: [
    {
      path: "../../public/fonts/RFDewiExpanded-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-rfdewi-expanded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arbi Kullakshi — Full Stack Engineer",
  description:
    "Full stack engineer architecting and shipping production-ready systems end-to-end — React and Next.js web apps, scalable backend infrastructure, and automated CI/CD pipelines.",
  keywords: [
    "Arbi Kullakshi",
    "full stack engineer",
    "backend developer",
    "web developer",
    "React",
    "Next.js",
    "Laravel",
    "Django",
    "TypeScript",
    "PHP",
    "portfolio",
  ],
  authors: [{ name: "Arbi Kullakshi", url: "https://arbikullakshi.com" }],
  creator: "Arbi Kullakshi",
  metadataBase: new URL("https://arbikullakshi.com"),
  openGraph: {
    type: "website",
    url: "https://arbikullakshi.com",
    title: "Arbi Kullakshi — Full Stack Engineer",
    description:
      "Architecting and shipping production-ready systems end-to-end.",
    siteName: "Arbi Kullakshi",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Arbi Kullakshi — Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arbi Kullakshi — Full Stack Engineer",
    description:
      "Architecting and shipping production-ready systems end-to-end.",
    images: ["/og.png"],
    creator: "@arbikullakshi",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://arbikullakshi.com/#arbi",
      name: "Arbi Kullakshi",
      url: "https://arbikullakshi.com",
      image: "https://arbikullakshi.com/og.png",
      jobTitle: "Full Stack Engineer",
      description:
        "Full stack engineer architecting and shipping production-ready systems end-to-end — React and Next.js web apps, scalable backend infrastructure, and automated CI/CD pipelines.",
      knowsAbout: [
        "Full Stack Engineering",
        "Backend Architecture",
        "React",
        "Next.js",
        "React Native",
        "TypeScript",
        "PHP",
        "Laravel",
        "Django",
        "PostgreSQL",
        "Docker",
        "CI/CD",
      ],
      sameAs: ["https://github.com/somethim"],
      email: "contact@arbikullakshi.com",
    },
    {
      "@type": "WebSite",
      "@id": "https://arbikullakshi.com/#website",
      url: "https://arbikullakshi.com",
      name: "Arbi Kullakshi",
      description: "Portfolio of Arbi Kullakshi — Full Stack Engineer",
      author: { "@id": "https://arbikullakshi.com/#arbi" },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://arbikullakshi.com/#service",
      name: "Arbi Kullakshi — Full Stack Engineer",
      url: "https://arbikullakshi.com",
      description:
        "Full stack engineering services: backend architecture, web applications, mobile apps, and infrastructure.",
      provider: { "@id": "https://arbikullakshi.com/#arbi" },
      serviceType: [
        "Full Stack Engineering",
        "Backend Architecture",
        "Web Development",
        "Mobile Development",
        "Infrastructure & DevOps",
      ],
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: "https://arbikullakshi.com",
        contactOption: "TollFree",
      },
    },
  ],
};

export default ({ children }: PropsWithChildren) => (
  <html
    lang="en"
    className={`h-full antialiased ${rfDewi.variable} ${rfDewiExpanded.variable}`}
  >
    <head>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </head>
    <body className="root isolate min-h-full overflow-x-hidden bg-background font-body text-foreground">
      <Background />
      <SmoothScroll>
        <Suspense>{children}</Suspense>
      </SmoothScroll>
      <Analytics />
      {process.env.NODE_ENV === "development" && (
        <Script
          src="//unpkg.com/react-grab/dist/index.global.js"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      )}
    </body>
  </html>
);
