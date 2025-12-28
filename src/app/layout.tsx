import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";

import { Header } from "./components/Header";
import { NavBar } from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

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
        <body className={`${inter.className} bg-background text-foreground min-h-screen`}>

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