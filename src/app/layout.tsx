import type { Metadata } from "next";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import { Header } from "./components/Header";
import { NavBar } from "./components/NavBar";

import { Manrope } from "next/font/google";

// Remove Inter — we're fully on Manrope now
// const inter = Inter({ subsets: ["latin"] });

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rigged",
  description: "Modern overland community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`
            ${manrope.variable}     /* Apply variable font */
            font-sans               /* Use the variable font as default */
            bg-background 
            text-foreground 
            min-h-screen 
            antialiased
          `}
        >
          <Header />

          <main className="pb-20 pt-16">
            {children}
          </main>

          <NavBar />
        </body>
      </html>
    </ClerkProvider>
  );
}