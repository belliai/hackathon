"use client"

import { ReactNode } from "react"
import { LiveObject } from "@liveblocks/client"
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense"
import { Loader } from "lucide-react"

export function Room({
  children,
  roomId,
  fallback,
}: {
  children: ReactNode
  roomId: string
  fallback?: ReactNode
}) {
  const publicKey = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY
  if (!publicKey) return children
  return (
    <RoomProvider
      id={"belli:" + roomId}
      initialPresence={{ cursor: { x: 0, y: 0 }, selectedCell: null }}
      initialStorage={{ spreadsheet: new LiveObject() }}
    >
      <ClientSideSuspense
        fallback={
          fallback ?? (
            <Loader className="size-4 animate-spin text-muted-foreground" />
          )
        }
      >
        {children}
      </ClientSideSuspense>
    </RoomProvider>
  )
}
