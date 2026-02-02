import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";

export const metadata: Metadata = {
  title: "Patryk & Rebecca | 28th November 2026",
  description: "Join us as we celebrate our wedding at Broxmouth Courtyard, Dunbar, Scotland",
  keywords: ["wedding", "Patryk and Rebecca", "Broxmouth Courtyard", "Dunbar", "Scotland"],
  openGraph: {
    title: "Patryk & Rebecca Wedding",
    description: "Join us as we celebrate our wedding on 28th November 2026 at Broxmouth Courtyard, Dunbar, Scotland",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
