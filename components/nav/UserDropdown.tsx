"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronDownIcon, User } from "lucide-react";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import React from "react";

export default function UserDropdown() {
  const router = useRouter();

  const ITEMS = [
    {
      icon: <User className="mr-2 h-4 w-4" />,
      shortcut: "⇧⌘P",
      route: "/profile",
      label: "Profile",
      separator: true,
    },
    {
      route: "/settings",
      label: "Settings",
    },
    {
      shortcut: "⇧⌘Q",
      route: "/logout",
      label: "Logout",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-x-2 cursor-pointer">
          <Avatar className="rounded-md w-6 h-6">
            <AvatarImage src="/jeff.webp" />
            <AvatarFallback className="rounded-md w-6 h-6">B</AvatarFallback>
          </Avatar>
          <span className="text-white">Belli</span>
          <ChevronDownIcon
            className="h-4 w-4 text-zinc-500"
            aria-hidden="true"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-950 rounded-xl" align="start" sideOffset={8}>
        {ITEMS.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <DropdownMenuItem
                className="px-3.5 py-2 min-w-40 rounded-lg"
                onClick={() => router.push(item.route)}
              >
                {/* {item.icon} */}
                <span className="mr-4">{item.label}</span>
                {item.shortcut && (
                  <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
                )}
              </DropdownMenuItem>
              {item.separator && <DropdownMenuSeparator />}
            </React.Fragment>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
