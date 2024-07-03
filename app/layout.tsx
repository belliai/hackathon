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
import { headers } from "next/headers";
import { findActiveItem } from "@/lib/utils/nav-utils";
import { skNavigation } from "@/components/nav/data/skNavigation";
import { k360Navigation } from "@/components/nav/data/k360Navigation";
import { settingNavigation } from "@/components/nav/data/settingNavigation";
import { accountNavigation } from "@/components/nav/data/accountNavigation";
import { RouteRoom } from "@/components/liveblocks/route-room";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { PHProvider } from "@/components/posthog-provider";
import dynamic from "next/dynamic";
import { operationsNavigation } from "@/components/nav/data/operationsNavigation";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata() {
  const defaultMetadata: Metadata = {
    title: "Belli",
    description: "Next-gen Air Cargo SaaS",
  };

  const pathname = headers().get("x-pathname");

  if (!pathname) return defaultMetadata;

  const menuItem = findActiveItem(
    [
      ...skNavigation,
      ...k360Navigation,
      ...settingNavigation,
      ...accountNavigation,
      ...operationsNavigation,
    ],
    pathname
  );

  if (!menuItem) return defaultMetadata;

  return {
    title: menuItem.item.name,
    description: "Belli - Next-gen Air Cargo SaaS",
  };
}

const PostHogPageView = dynamic(() => import("@/components/posthog-pageview"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProduction = process.env.NODE_ENV === "production";
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html
        lang="en"
        className={cn(
          "scrollbar h-full scroll-smooth antialiased dark",

          ` ${inter.className}`
        )}
      >
        {isProduction && gtmId && <GoogleTagManager gtmId={gtmId} />}
        <PHProvider>
          <body className="  h-full text-white overflow-y-hidden bg-background">
            {/* <ProgressBar />
      <Nav /> */}
            <PostHogPageView />
            <QueryProvider>
              <SignedIn>
                <TooltipProvider>
                  <BookingProvider>
                    <FavoritesProvider>
                      <RouteRoom>
                        <UIWrapper>{children}</UIWrapper>
                      </RouteRoom>
                    </FavoritesProvider>
                    <Toaster />
                  </BookingProvider>
                </TooltipProvider>
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </QueryProvider>
          </body>
        </PHProvider>
      </html>
    </ClerkProvider>
  );
}
