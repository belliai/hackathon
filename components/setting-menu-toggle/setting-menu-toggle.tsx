"use client"

import React from "react"
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

type SettingOption = {
  label: string;
  link: string;
  child?: SettingOption[];
}

interface SettingMenuToggleProps {
  settingOptions?: SettingOption[];
}

const SettingMenuToggle: React.FC<SettingMenuToggleProps> = ({ settingOptions = [] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 border border-secondary">Settings</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit" align="start">
        <DropdownMenuGroup>
          {settingOptions.map((item, index) => {
            if (item.child) {
              return (
                <DropdownMenuSub key={`setting-${index}`}>
                  <DropdownMenuSubTrigger>
                    <span>{item.label}</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="ml-2">
                      {item.child.map((childMenu, childId) => (
                        <DropdownMenuItem key={`child-${index}-${childId}`} className="cursor-pointer">
                          <Link href={childMenu.link}>{childMenu.label}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              )
            }
            return (
              <DropdownMenuItem key={`setting-${index}`} className="cursor-pointer">
                <Link href={item.link}>{item.label}</Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SettingMenuToggle
