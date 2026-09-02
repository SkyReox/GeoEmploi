import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Spectral } from "next/font/google";
import "./globals.css";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const spectral = Spectral({
  weight: "400",
  variable: "--font-spectral",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GéoEmploi",
  description: "GéoEmploi est une application web qui permet de visualiser les offres d'emploi sur une carte interactive. Elle offre une interface conviviale pour rechercher et explorer les opportunités d'emploi dans différentes régions.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${spectral.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <HeaderComponent/>
        {children}
        <FooterComponent/>
      </body>
    </html>
  );
}
