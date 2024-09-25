"use client"

import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { NAV_TYPE } from "@/types/nav/enums"
import { findActiveItem } from "@/lib/utils/nav-utils"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import SidebarItem, { TSidebarItem } from "./SidebarItem"

interface SidebarMenuProps {
  items: TSidebarItem[]
  collapsible?: boolean
  sectionTitle?: string
  isExpanded?: boolean
  onNavTypeChange: (type: NAV_TYPE) => void
}

export default function SidebarMenu({
  items,
  collapsible,
  sectionTitle,
  isExpanded,
  onNavTypeChange,
}: SidebarMenuProps) {
  const pathname = usePathname()

  const activeItem = findActiveItem(items, pathname)

  if (items.length === 0) {
    return (
      <div className="px-8 py-8">
        <p className="text-center text-xs text-zinc-500">
          No navigation items found. Please check your configuration.
        </p>
      </div>
    )
  }

  const menu = (
    <Accordion
      type="single"
      collapsible
      defaultValue={
        items[0]?.disabled ? items[0]?.name : activeItem?.parent?.name
      }
      className="space-y-1"
    >
      {items.map((item) => {
        return (
          <SidebarItem
            key={item.name}
            item={item}
            isExpanded={isExpanded}
            disabled={item.disabled}
            onNavTypeChange={onNavTypeChange}
            active={
              (activeItem?.parent?.name ?? activeItem?.item.name) === item.name
            }
          />
        )
      })}
    </Accordion>
  )

  if (collapsible && sectionTitle) {
    return (
      <Accordion type="single" collapsible className="space-y-1">
        <AccordionItem className="border-b-0" value={sectionTitle}>
          <AccordionTrigger
            customarrow={
              <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground transition-transform duration-200" />
            }
            className="justify-start gap-2 border-b-0 px-[5px] py-2 text-xs text-muted-foreground hover:no-underline [&[data-state=open]>svg]:rotate-90"
          >
            <div className="inline-flex items-center gap-2">
              <span>{sectionTitle}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-0">{menu}</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }

  return menu
}
