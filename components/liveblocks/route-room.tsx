"use client";

import { PropsWithChildren } from "react";
import { usePathname } from "next/navigation";
import { LiveblocksProvider, RoomProvider } from "@liveblocks/react/suspense";

export function RouteRoom({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const publicKey = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY;
  if (!publicKey) return children;
  return (
    <LiveblocksProvider publicApiKey={publicKey}>
      <RoomProvider id={pathname} initialPresence={{ cursor: { x: 0, y: 0 } }}>
        {children}
      </RoomProvider>
    </LiveblocksProvider>
  );
}
