import {
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu"

import { cn } from "@/lib/utils"

interface SettingsNavigationItemProps {
  tabName: string
  activeTab: string
  setActiveTab: (tab: string) => void
}

const SettingsNavigationItem: React.FC<SettingsNavigationItemProps> = ({
  tabName,
  activeTab,
  setActiveTab,
}) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger
      className={cn(
        "w-full whitespace-nowrap rounded-md px-4 py-2 text-left",
        activeTab === tabName
          ? "bg-muted text-white"
          : "text-[#949496] hover:bg-muted hover:text-white"
      )}
      onClick={() => setActiveTab(tabName)}
    >
      {tabName}
    </NavigationMenuTrigger>
  </NavigationMenuItem>
)

export default SettingsNavigationItem
