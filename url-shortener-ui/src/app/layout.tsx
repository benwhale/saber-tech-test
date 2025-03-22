import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// Taken from https://tailwindcss.com/plus/ui-blocks/application-ui/application-shells/stacked as a starting point
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "URL and File Shortener",
  description: "A simple URL and file shortener written as a technical test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <div className="min-h-full">
          <Navigation />
          {children}
        </div>
      </body>
    </html>
  );
}
