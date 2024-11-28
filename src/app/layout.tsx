import type { Metadata } from "next"
import localFont from "next/font/local"

import "./globals.css"
import Topbar from "./Topbar"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Junior Search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-white to-teal-100 min-h-screen`}>
        <div>
          <Topbar/>
          <main className="py-[12px] px-[32px] flex flex-col overflow-auto items-center">{children}</main>
        </div>
      </body>
    </html>
  );
}
