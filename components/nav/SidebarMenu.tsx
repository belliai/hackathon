"use client";

import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import SidebarItem, { TSidebarItem } from "./SidebarItem";
import { ChevronRight } from "lucide-react";
import { findActiveItem } from "@/lib/utils/nav-utils";

interface SidebarMenuProps {
  items: TSidebarItem[];
  collapsible?: boolean;
  sectionTitle?: string;
}

export default function SidebarMenu({
  items,
  collapsible,
  sectionTitle,
}: SidebarMenuProps) {
  const pathname = usePathname();

  const activeItem = findActiveItem(items, pathname);

  if (items.length === 0) {
    return (
      <div className="py-8 px-8">
        <p className="text-center text-zinc-500 text-xs">
          No navigation items found. Please check your configuration.
        </p>
      </div>
    );
  }

  const menu = (
    <Accordion
      type="single"
      collapsible
      defaultValue={activeItem?.parent?.name}
      className="space-y-1"
    >
      {items.map((item) => {
        return (
          <SidebarItem
            key={item.name}
            item={item}
            active={
              (activeItem?.parent?.name ?? activeItem?.item.name) === item.name
            }
          />
        );
      })}
    </Accordion>
  );

  if (collapsible && sectionTitle) {
    return (
      <Accordion type="single" collapsible className="space-y-1">
        <AccordionItem className="border-b-0" value={sectionTitle}>
          <AccordionTrigger
            customarrow={
              <ChevronRight className="h-3 w-3 shrink-0 transition-transform duration-200 text-muted-foreground" />
            }
            className="border-b-0 py-2 px-[5px] text-xs text-muted-foreground hover:no-underline justify-start gap-2 [&[data-state=open]>svg]:rotate-90 "
          >
            <div className="inline-flex items-center gap-2">
              <span>{sectionTitle}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-0">{menu}</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return menu;
}
