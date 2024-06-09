import { TSidebarItem } from "@/components/nav/SidebarItem";
import { defaultNavigation } from "./defaultNavigation";

const configureNavigations = defaultNavigation.filter(
  (item) => item.name === "Configuration"
);

export const settingNavigation: TSidebarItem[] = configureNavigations;
