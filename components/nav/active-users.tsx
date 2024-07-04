"use client"

import { CSSProperties } from "react"
import { useOthers, useSelf } from "@liveblocks/react/suspense"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

function getInitials(name: string) {
  //Convert multi spaces to single space
  name = name.replace(/\s+/g, " ")

  //Capitalize all words
  name = name.replace(/\b\w/g, (c) => c.toUpperCase())

  return name.split(" ").map((n) => n[0])
}

export default function ActiveUsers() {
  const users = useOthers()
  const currentUser = useSelf()
  const hasMoreUsers = users.length > 3
  const initials = getInitials(currentUser.info.name)

  return (
    <div className="flex flex-row items-center -space-x-1 text-foreground">
      <span className="mr-4 text-sm text-muted-foreground">
        Users on this page
      </span>
      {currentUser && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar
              style={
                {
                  "--accent": currentUser.info.color,
                } as CSSProperties
              }
              className="h-6 w-6 ring-1 ring-[var(--accent)] ring-offset-2 ring-offset-background"
              key={currentUser.connectionId}
            >
              <AvatarImage src={currentUser.info.avatar} />
              <AvatarFallback className="cursor-default text-sm">
                {initials}
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent className="border bg-background text-foreground">
            You
          </TooltipContent>
        </Tooltip>
      )}
      {users.slice(0, 3).map(({ connectionId, info }) => {
        return (
          <Tooltip key={connectionId}>
            <TooltipTrigger asChild>
              <Avatar
                style={
                  {
                    "--accent": info.color,
                  } as CSSProperties
                }
                className="h-6 w-6 ring-1 ring-[var(--accent)] ring-offset-2 ring-offset-background"
                key={currentUser.connectionId}
              >
                <AvatarImage src={info.avatar} />
                <AvatarFallback>BL</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent className="border bg-background text-foreground">
              {info.name}
            </TooltipContent>
          </Tooltip>
        )
      })}
      {hasMoreUsers && (
        <Avatar className="h-6 w-6 border">
          <AvatarFallback className="text-sm">
            +{users.length - 3}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
