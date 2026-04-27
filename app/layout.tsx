import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

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
        <link rel="icon" href="/nizan_logo_white.png" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
