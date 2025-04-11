import * as React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header"; // Make sure this path is correct based on your folder structure

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Status Page",
  description: "Simplified Status Page App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main className="max-w-4xl mx-auto mt-6 px-4">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
