import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavMenu } from "../components/NavMenu";
import { ModeToggle } from "../components/ModeToggle";
import { SearchBar } from "../components/SearchBar";
import { UserInfo } from "../components/UserInfo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GIA - Gestió Integrada d'Accions",
  description: "Sistema de gestió integrada d'accions formatives",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex w-full px-4 h-16 items-center justify-between ">
            <div className="flex items-center grow">
              <NavMenu />
              <div className="mx-auto grow max-w-[250px]">
                <SearchBar />
              </div>
            </div>
            <div className="flex grow justify-end items-center gap-2">
              <UserInfo />

              <div className="hidden sm:block w-px h-6 bg-border" />
              <ModeToggle />
            </div>
          </div>
        </header>
        <main className="min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
