import type { Metadata } from "next"

import "./globals.css"
import Topbar from "./Topbar"

export const metadata: Metadata = {
  title: "Job Search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className="antialiased bg-gradient-to-b from-white to-teal-100 min-h-screen">
        <div>
          <Topbar/>
          <main className="py-[12px] px-[32px] flex flex-col overflow-auto items-center">{children}</main>
        </div>
      </body>
    </html>
  );
}
