"use client";

import { usePathname } from "next/navigation";
import { Accordion } from "../ui/accordion";
import SidebarItem, { TSidebarItem } from "./SidebarItem";

interface SidebarMenuProps {
  items: TSidebarItem[];
}

export default function SidebarMenu({ items }: SidebarMenuProps) {
  const pathname = usePathname();

  const findActiveItem = (
    items: TSidebarItem[],
    pathname: string
  ): { parent?: TSidebarItem; item: TSidebarItem } | undefined => {
    for (const item of items) {
      if (item.href === pathname) {
        return { parent: undefined, item };
      }
      if (item.children) {
        const activeChild = findActiveItem(item.children, pathname);
        if (activeChild) {
          return { parent: item, item: activeChild.item };
        }
      }
    }
    return undefined;
  };

  const activeItem = findActiveItem(items, pathname);

  return (
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
}
