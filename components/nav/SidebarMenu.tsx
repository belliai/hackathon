"use client";

import { Accordion } from "../ui/accordion";
import SidebarItem, { TSidebarItem } from "./SidebarItem";

interface SidebarMenuProps {
  items: TSidebarItem[];
}

export default function SidebarMenu({ items }: SidebarMenuProps) {
  return (
    <Accordion type="single" collapsible>
      {items.map((item) => {
        return <SidebarItem key={item.name} item={item} />;
      })}
    </Accordion>
  );
}
