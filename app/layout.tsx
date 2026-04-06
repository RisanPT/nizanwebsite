import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nizan Makeovers | Luxury Bridal Makeup Artist",
  description:
    "Experience unparalleled luxury with Nizan Makeovers — professional bridal, fashion, and party makeovers tailored perfectly to you. South Asia's premier luxury makeup artist.",
  keywords: [
    "bridal makeup artist",
    "luxury makeup",
    "South Asian bridal",
    "Nizan Makeovers",
    "wedding makeup",
    "HD makeup",
  ],
  openGraph: {
    title: "Nizan Makeovers | Luxury Bridal Makeup Artist",
    description:
      "Experience unparalleled luxury with professional bridal, fashion, and party makeovers tailored perfectly to you.",
    type: "website",
    locale: "en_US",
    siteName: "Nizan Makeovers",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
