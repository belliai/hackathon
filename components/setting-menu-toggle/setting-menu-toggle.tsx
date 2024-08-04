"use client"

import React, { useState } from "react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { CogIcon } from "lucide-react"

type SettingOption = {
  width: string;
  data: OptionProps[];
}

type OptionProps = {
  label: string;
  value: string;
  child?: OptionProps[];
}

interface SettingMenuToggleProps {
  settingOptions?: SettingOption;
  className?: string;
  onOpen?: (isOpen: boolean) => void;
  isOpen?: boolean;
}

const SettingMenuToggle: React.FC<SettingMenuToggleProps> = ({ settingOptions = { width: '', data: [] }, className = '', onOpen = () => {}, isOpen = false }) => {
  return (
    <DropdownMenu
      onOpenChange={(current) => {
        onOpen(current)
      }}
      open={isOpen}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`h-8 border border-secondary text-muted-foreground transition-opacity delay-0 duration-200 ${className} ${settingOptions?.width ? `${settingOptions.width}` : ''}`}>
          <CogIcon className="mr-2 size-4" />
          Settings
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit" align="start" side="top">
        <DropdownMenuGroup>
          {settingOptions?.data.map((item, index) => {
            if (item.child) {
              return (
                <DropdownMenuSub key={`setting-${index}`}>
                  <DropdownMenuSubTrigger className="text-muted-foreground">
                    <span>{item.label}</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="ml-2">
                      {item.child.map((childMenu, childId) => (
                        <Link href={childMenu.value} key={`child-${index}-${childId}`}>
                          <DropdownMenuItem className="cursor-pointer text-muted-foreground">
                            {childMenu.label}
                          </DropdownMenuItem>
                        </Link>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              )
            }
            return (
              <Link href={item.value} key={`setting-${index}`}>
                <DropdownMenuItem className="cursor-pointer text-muted-foreground">
                  {item.label}
                </DropdownMenuItem>
              </Link>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SettingMenuToggle
