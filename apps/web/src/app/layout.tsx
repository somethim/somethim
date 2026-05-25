import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import { Suspense, type PropsWithChildren } from "react";
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
  title: "Mario Vukzaj — Brand × Product × Code",
  description:
    "Designer and developer who builds brands, products, and the code behind them. Available for brand identity, product design, and web development.",
  keywords: [
    "Mario Vukzaj",
    "brand designer",
    "product designer",
    "web developer",
    "UI UX designer",
    "design engineer",
    "motion designer",
    "freelance designer",
    "remote designer",
    "portfolio",
  ],
  authors: [{ name: "Mario Vukzaj", url: "https://mariovukzaj.com" }],
  creator: "Mario Vukzaj",
  metadataBase: new URL("https://mariovukzaj.com"),
  openGraph: {
    type: "website",
    url: "https://mariovukzaj.com",
    title: "Mario Vukzaj — Brand × Product × Code",
    description:
      "Designer and developer who builds brands, products, and the code behind them.",
    siteName: "Mario Vukzaj",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Mario Vukzaj — Brand × Product × Code",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mario Vukzaj — Brand × Product × Code",
    description:
      "Designer and developer who builds brands, products, and the code behind them.",
    images: ["/og.png"],
    creator: "@mariovukzaj",
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
      "@id": "https://mariovukzaj.com/#mario",
      name: "Mario Vukzaj",
      url: "https://mariovukzaj.com",
      image: "https://mariovukzaj.com/og.png",
      jobTitle: "Brand × Product × Code",
      description:
        "Designer and developer specialising in brand identity, product design, and web development. Co-founder of zennit, Creative Lead at LookUp and Zerapy.ai.",
      knowsAbout: [
        "Brand Identity",
        "Product Design",
        "UI/UX Design",
        "Motion Design",
        "Web Development",
        "Next.js",
        "React",
        "TypeScript",
        "Figma",
        "Design Systems",
      ],
      sameAs: [
        "https://x.com/mariovukzaj",
        "https://www.linkedin.com/in/mariovukzaj/",
        "https://www.instagram.com/vukzajmario/",
      ],
      email: "hello@mariovukzaj.com",
    },
    {
      "@type": "WebSite",
      "@id": "https://mariovukzaj.com/#website",
      url: "https://mariovukzaj.com",
      name: "Mario Vukzaj",
      description: "Portfolio of Mario Vukzaj — Brand × Product × Code",
      author: { "@id": "https://mariovukzaj.com/#mario" },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://mariovukzaj.com/#service",
      name: "Mario Vukzaj — Brand × Product × Code",
      url: "https://mariovukzaj.com",
      description:
        "Design and development services: brand identity, product design, motion, and web development.",
      provider: { "@id": "https://mariovukzaj.com/#mario" },
      serviceType: [
        "Brand Identity",
        "Product Design",
        "Motion Design",
        "Web Design",
      ],
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: "https://mariovukzaj.com",
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
    <body className="root isolate min-h-full overflow-x-hidden bg-background text-foreground font-body">
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
