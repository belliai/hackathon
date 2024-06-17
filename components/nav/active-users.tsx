"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function ActiveUsers() {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > 3;

  return (
    <div className="flex flex-row items-center text-foreground -space-x-1">
      <span className="text-sm text-muted-foreground mr-4">
        Users on this page
      </span>
      {currentUser && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar className="w-6 h-6 border " key={currentUser.connectionId}>
              <AvatarImage
                src={`https://liveblocks.io/avatars/avatar-${Math.floor(
                  currentUser.connectionId % 30
                )}.png`}
              />
              <AvatarFallback>BL</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent className="bg-background text-foreground border">
            You
          </TooltipContent>
        </Tooltip>
      )}
      {users.slice(0, 3).map(({ connectionId, info }) => {
        return (
          <Tooltip key={connectionId}>
            <TooltipTrigger asChild>
              <Avatar className="w-6 h-6 border" key={currentUser.connectionId}>
                <AvatarImage
                  src={`https://liveblocks.io/avatars/avatar-${Math.floor(
                    currentUser.connectionId % 30
                  )}.png`}
                />
                <AvatarFallback>BL</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent className="bg-background text-foreground border">
              My Name
            </TooltipContent>
          </Tooltip>
        );
      })}
      {hasMoreUsers && (
        <Avatar className="w-6 h-6 border">
          <AvatarFallback className="text-sm">
            +{users.length - 3}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
