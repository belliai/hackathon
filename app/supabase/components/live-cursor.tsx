"use client"

import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { usePathname } from "next/navigation"
import { RealtimeChannel } from "@supabase/supabase-js"
import { MousePointer2 } from "lucide-react"
import { nanoid } from "nanoid"

import { createClient } from "@/lib/utils/supabase/client"

export enum EventTypes {
  MOVE_MOUSE = "move-mouse",
  MOVE_NOTE = "move-note",
  ADD_NOTE = "add-note",
  ADD_NOTE_TEXT = "add-note-text",
}

export type Note = {
  x: number
  y: number
  content: string
}

type Payload = {
  eventType: EventTypes
  x: number
  y: number
  color: string
  notes: Array<Note>
}

export type Clients = Record<string, Payload>

const CURRENT_CLIENT_ID = nanoid()

const randomNumber = Math.trunc(Math.random() * 100)
const randomColor = `rgb(${randomNumber}%, 30%, 40%)`

export default function SupabaseLiveCursor(props: PropsWithChildren) {
  const supabase = createClient()
  const pathname = usePathname()
  const channel = supabase.channel(`live-cursor:${pathname}`)
  // const throttledChannelTrack = throttle(channel, channel.track);

  const [newClients, setNewClients] = useState<Clients>({})
  const isFirstRender = useRef<boolean>(true)
  const subsChannel = useRef<RealtimeChannel>()

  const removeClient = useCallback(
    (clientId: string) => {
      const clients = { ...newClients }
      delete clients[clientId]

      setNewClients(clients)
    },
    [newClients]
  )

  const handleMouseMove = (event: MouseEvent) => {
    channel.track({
      [CURRENT_CLIENT_ID]: {
        ...newClients[CURRENT_CLIENT_ID],
        eventType: EventTypes.MOVE_MOUSE,
        color: randomColor,
        x: event.clientX,
        y: event.clientY,
      },
    })
  }

  useEffect(() => {
    channel.on("presence", { event: "sync" }, () => {
      const newState = channel.presenceState<Clients>()

      const presenceValues: Clients = {}

      Object.keys(newState).forEach((stateId) => {
        const presenceValue = newState[stateId][0]
        const clientId = Object.keys(presenceValue)[0]

        presenceValues[clientId] = presenceValue[clientId]
      })

      setNewClients((preValue) => {
        const updatedClients = Object.keys(presenceValues).reduce<Clients>(
          (acc, curr) => {
            acc[curr] = {
              ...preValue[curr],
              ...presenceValues[curr],
            }
            return acc
          },
          {}
        )

        return updatedClients
      })
    })

    // code to manage the state once other client updates
  }, [])

  useEffect(() => {
    channel.on<{ clientId: string }>(
      "presence",
      { event: "leave" },
      ({ leftPresences }) => {
        const { clientId } = leftPresences[0]
        removeClient(clientId)
      }
    )
  }, [removeClient])

  useEffect(() => {
    if (isFirstRender.current) {
      subsChannel.current = channel.subscribe()
      isFirstRender.current = false
    }
  }, [])

  useEffect(() => {
    const mainElement = document.getElementById("container")

    if (mainElement) {
      mainElement.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      mainElement?.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div id="container" className="relative h-fit w-fit">
      {props.children}
      <div className="pointer-events-none fixed left-0 top-0 z-50 h-full w-full">
        {Object.entries(newClients).map(([key, value]) => {
          if (key === CURRENT_CLIENT_ID) return null
          return (
            <MousePointer2
              key={key}
              fill={value.color}
              className="size-4"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                transform: `translateX(${value.x}px) translateY(${value.y}px)`,
                color: value.color,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export function throttle<ArgType>(
  instance: unknown,
  func: (args: ArgType) => unknown,
  delay: number = 2000
) {
  let flag: NodeJS.Timeout | null = null
  const _this = instance

  return (args: ArgType) => {
    if (flag === null) {
      func.call(_this, args)
      flag = setTimeout(() => {
        flag = null
      }, delay)
    }
  }
}
