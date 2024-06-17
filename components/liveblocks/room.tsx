"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { Loader } from "lucide-react";

export function Room({
  children,
  roomId,
  fallback,
}: {
  children: ReactNode;
  roomId: string;
  fallback?: ReactNode;
}) {
  const publicKey = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY;
  if (!publicKey) return children;
  return (
    <LiveblocksProvider publicApiKey={publicKey}>
      <RoomProvider id={roomId} initialPresence={{ cursor: { x: 0, y: 0 } }}>
        <ClientSideSuspense
          fallback={
            fallback ?? (
              <Loader className="size-4 text-muted-foreground animate-spin" />
            )
          }
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
