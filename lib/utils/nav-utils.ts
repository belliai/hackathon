import { TSidebarItem } from "@/components/nav/SidebarItem";

export const findActiveItem = (
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
