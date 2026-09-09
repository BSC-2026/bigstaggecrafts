import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "../components/CustomCursor";
import { Inter, Playfair_Display, Cinzel } from "next/font/google";
// ...
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Big Stage Crafts | Premium Event Production Since 1954",
  description: "Pioneering professional sound reinforcement, intelligent lighting, stage architecture, and LED video solutions across South India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${cinzel.variable}`}>
      <body className="antialiased">
        <SmoothScrollProvider><CustomCursor/>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}