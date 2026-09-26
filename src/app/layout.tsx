import type { Metadata, Viewport } from "next";
import { Lora, Inter } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cardamom House | Slow brunch. Strong coffee. Lisbon",
  description:
    "Slow brunch and single-origin coffee on Rua da Boavista, Lisbon. Saffron French toast, Shakshuka, house toasties, and cardamom espresso.",
  openGraph: {
    title: "Cardamom House — Lisbon Brunch Café",
    description: "Slow brunch. Strong coffee. Lisbon, since 2021.",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#110E0C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${lora.variable} ${inter.variable} scroll-smooth antialiased`}
    >
      <body
        suppressHydrationWarning
        data-gramm="false"
        data-gramm_editor="false"
        data-enable-grammarly="false"
        className="min-h-screen bg-[#110E0C] text-[#FAF5ED] font-sans selection:bg-amber-600/30 selection:text-amber-100"
      >
        {children}
      </body>
    </html>
  );
}
