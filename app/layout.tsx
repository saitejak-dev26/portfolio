import type { Metadata, Viewport } from "next";
import { site } from "@/data/site";

// Self-hosted fonts (bundled at build time — no request to Google at runtime).
import "@fontsource/orbitron/500.css";
import "@fontsource/orbitron/700.css";
import "@fontsource/orbitron/800.css";
import "@fontsource/orbitron/900.css";
import "@fontsource/outfit/300.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";
import "@fontsource/outfit/700.css";
import "@fontsource/outfit/800.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.role}`,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  robots: { index: true, follow: true },
  // Stop iOS turning numbers (e.g. 99.9%, years) into phone links.
  formatDetection: { telephone: false, address: false, email: false },
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "React",
    "Node.js",
    "NestJS",
    "MySQL",
    "SaaS",
    "CRM",
    "Hyderabad",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: site.url,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    siteName: site.name,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF9FD",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${site.url}/#person`,
      name: site.name,
      jobTitle: site.role,
      url: site.url,
      image: `${site.url}${site.photo.jpg}`,
      email: `mailto:${site.email}`,
      address: { '@type': 'PostalAddress', addressLocality: 'Hyderabad', addressCountry: 'IN' },
      worksFor: { '@type': 'Organization', name: 'Muzigal Edutech Private Limited' },
      sameAs: [site.github, site.linkedin],
      knowsAbout: ['Next.js', 'React', 'Node.js', 'NestJS', 'MySQL', 'SaaS', 'CRM'],
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: 'en',
      publisher: { '@id': `${site.url}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {/* Structured data (schema.org) so search engines understand who this site is about. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
