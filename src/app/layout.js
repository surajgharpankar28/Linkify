import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { Suspense } from "react";

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

export const metadata = {
  title: "Linkify",
  description: "Your favorite collective link sharing platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#274F1B]`}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          {children}
        </Suspense>
        ;
      </body>
    </html>
  );
}
