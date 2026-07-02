import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "A Special Gift For You ❤️",
  description: "Có một người muốn gửi bạn một món quà...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${inter.variable} ${dancingScript.variable} font-sans antialiased bg-pink-50`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
