import type { Metadata } from "next";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ant Portfolio",
  description: "Art portfolio, commissions, and projects by Ant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased" 
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
