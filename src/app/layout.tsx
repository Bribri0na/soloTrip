import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://solotrip-nine.vercel.app"),
  title: "SoloTrip",
  description: "Find travel buddies for your next solo trip.",
  openGraph: {
    title: "SoloTrip: Find a travel buddy for your next solo trip",
    description: "A women-first travel-buddy app with safety built into the product logic.",
    url: "/",
    siteName: "SoloTrip",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} bg-cream font-sans text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}