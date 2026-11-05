import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

const sans = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-space-grotesk" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: "Sagnik Dey — Principal Product Designer · Systems thinking",
  description:
    "I help teams turn complex products into coherent ones. 16+ years designing enterprise SaaS, from research to design systems.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} antialiased`}>
      <body className="min-h-screen bg-ground bg-dots font-sans text-ink">
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
