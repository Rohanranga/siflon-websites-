import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Siflon Group | Diverse Expertise. One Group.",
  description: "Discover Siflon Group's specialist businesses across pharmaceuticals, animal health and advanced industrial materials.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}