"use client"

import { PropsWithChildren, useEffect } from "react"
import { useMyPresence, useOthers } from "@liveblocks/react/suspense"

const COLORS = [
  "#E57373",
  "#9575CD",
  "#4FC3F7",
  "#81C784",
  "#FFF176",
  "#FF8A65",
  "#F06292",
  "#7986CB",
]

export default function LiveCursorHoc({ children }: PropsWithChildren) {
  /**
   * useMyPresence returns the presence of the current user and a function to update it.
   * updateMyPresence is different than the setState function returned by the useState hook from React.
   * You don't need to pass the full presence object to update it.
   * See https://liveblocks.io/docs/api-reference/liveblocks-react#useMyPresence for more information
   */
  const [{ cursor }, updateMyPresence] = useMyPresence()

  /**
   * Return all the other users in the room and their presence (a cursor position in this case)
   */
  const others = useOthers()

  useEffect(() => {
    const mainElement = document.getElementById("main")

    const moveCursor = (event: PointerEvent) => {
      updateMyPresence({
        cursor: {
          x: Math.round(event.clientX),
          y: Math.round(event.clientY),
        },
      })
    }

    const removeCursor = () => {
      updateMyPresence({
        cursor: null,
      })
    }

    if (mainElement) {
      mainElement.addEventListener("pointermove", moveCursor)
      mainElement.addEventListener("pointerleave", removeCursor)
    }

    return () => {
      mainElement?.removeEventListener("pointermove", moveCursor)
      mainElement?.removeEventListener("pointerleave", removeCursor)
    }
  }, [])

  return (
    <>
      {children}
      <div className="pointer-events-none fixed inset-0 h-screen w-screen">
        {
          /**
           * Iterate over other users and display a cursor based on their presence
           */
          others.map(({ connectionId, presence, info }) => {
            if (presence.cursor === null) {
              return null
            }

            return (
              <Cursor
                key={`cursor-${connectionId}`}
                // connectionId is an integer that is incremented at every new connections
                // Assigning a color with a modulo makes sure that a specific user has the same colors on every clients
                color={info.color}
                x={presence.cursor.x}
                y={presence.cursor.y}
              />
            )
          })
        }
      </div>
    </>
  )
}

type CursorProps = {
  color: string
  x?: number
  y?: number
}

function Cursor({ color, x, y }: CursorProps) {
  if (!x || !y) return null
  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
      width="24"
      height="36"
      viewBox="0 0 24 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
        fill={color}
      />
    </svg>
  )
}
