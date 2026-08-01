import type { Metadata } from "next";
import "./globals.css";
import "./flower-motion.css";
import { NavigationBar } from "./components/NavigationBar";
import Footer from "./components/Footer";
import { FlowerMaterialProvider } from "./components/FlowerMaterial";
import { PortfolioIntroProvider } from "./components/PortfolioIntro";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Vivian Zhou — Creative Technologist",
  description:
    "Portfolio of Vivian Zhou, a Georgia Tech computer science student building thoughtful digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="site-body">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <PortfolioIntroProvider>
          <FlowerMaterialProvider>
            <NavigationBar />
            {children}
            <Footer />
          </FlowerMaterialProvider>
        </PortfolioIntroProvider>
        <Analytics />
      </body>
    </html>
  );
}
