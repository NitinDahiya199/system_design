import type { Metadata } from "next";
import { Outfit, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "System Design Study Hub",
    template: "%s | System Design Study Hub",
  },
  description:
    "Learn system design with simple lessons, deep pages, and interview-ready examples.",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${sourceSans.variable}`}>
      <body className={sourceSans.className}>
        <div className="site-shell">
          <SiteHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
