import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { GoogleTagManager } from "@next/third-parties/google";
import UIWrapper from "@/components/ui/wrapper";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { BookingProvider } from "@/components/dashboard/BookingContext";
import { FavoritesProvider } from "@/components/nav/favorites/favorites-provider";
import QueryProvider from "@/components/query-provider";

export const metadata: Metadata = {
  title: "Belli",
  description: "Next-gen Air Cargo SaaS",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProduction = process.env.NODE_ENV === "production";
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    <html
      lang="en"
      className={cn(
        "scrollbar h-full scroll-smooth antialiased dark",

        ` ${inter.className}`
      )}
    >
      {isProduction && gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body className="  h-full text-white overflow-y-hidden bg-background">
        {/* <ProgressBar />
      <Nav /> */}
        <QueryProvider>
          <TooltipProvider>
            <BookingProvider>
              <FavoritesProvider>
                <UIWrapper>{children}</UIWrapper>
              </FavoritesProvider>
              <Toaster />
            </BookingProvider>
          </TooltipProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
