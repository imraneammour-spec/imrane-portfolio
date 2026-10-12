import type { Metadata } from "next";
import { Header, Footer, Preloader, RouteStage } from "@/components/SiteShell";
import { Motion } from "@/components/Motion";
import { site } from "@/data/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Imrane Ammour — Architectural Atelier",
    template: "%s — Imrane Ammour",
  },
  description:
    "Interior architecture, spatial design and photorealistic 3D visualization by Imrane Ammour, based in Rabat–Salé, Morocco.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    images: [
      {
        url: site.heroImage,
        width: 1448,
        height: 1086,
        alt: "Architectural visualization by Imrane Ammour",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  robots: { index: true, follow: true },
};
export const viewport = { themeColor: "#101114", colorScheme: "dark" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body id="page-top">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Preloader />
        <Header />
        <RouteStage>
          <Motion>
            <main id="main-content">{children}</main>
          </Motion>
        </RouteStage>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: site.name,
              url: site.url,
              jobTitle: site.title,
            }),
          }}
        />
      </body>
    </html>
  );
}
