import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { NewsletterModal } from "@/components/layout/newsletter-modal";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
  title: {
    default: "PRISM — Contemporary Clothing & Essentials",
    template: "%s | PRISM",
  },
  description:
    "Discover PRISM: A curated selection of contemporary clothing, essential basics, and limited archival pieces.",
  openGraph: {
    title: "PRISM — Contemporary Clothing & Essentials",
    description: "High-end contemporary apparel and archival fashion pieces.",
    url: "./",
    siteName: "PRISM",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PRISM Clothing Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PRISM",
    description: "Contemporary apparel and archival essentials.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          geistSans.className,
          geistMono.variable,
          "antialiased flex flex-col min-h-screen",
        )}
      >
        <SessionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          {/* Reserve footer space to prevent layout shift */}
          <div style={{ minHeight: "600px" }}>
            <Footer />
          </div>
          <NewsletterModal />
          <Toaster
            position="bottom-right"
            expand={false}
            gap={12}
            toastOptions={{
              unstyled: true,
              classNames: {
                toast: cn(
                  "group flex items-center gap-3 w-full p-4 rounded-none bg-black text-white",
                  "border border-white/10",
                  "font-sans text-[11px] font-bold uppercase tracking-[0.2em]",
                ),
                description:
                  "text-white/60 font-light lowercase tracking-normal normal-case text-[10px]",
                actionButton:
                  "bg-white text-black px-4 py-2 text-[10px] font-bold uppercase tracking-widest",
                cancelButton:
                  "bg-transparent text-white/50 px-4 py-2 text-[10px]",
              },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
