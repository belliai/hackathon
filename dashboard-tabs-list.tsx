import { LucideIcon } from "lucide-react"

import { TabsList, TabsTrigger } from "./components/ui/tabs"

type TabListItems = {
  icon?: LucideIcon
  label: string
  value: string
}

interface TabsListProps {
  items: TabListItems[]
}

export default function DashboardTabsList({ items }: TabsListProps) {
  return (
    <TabsList className="gap-2 bg-transparent p-0">
      {items.map((item) => (
        <TabsTrigger
          key={item.value}
          className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary [&_svg]:!mr-2 [&_svg]:!size-4"
          value={item.value}
        >
          {item.icon && <item.icon className="mr-2 size-4" />}
          {item.label}
        </TabsTrigger>
      ))}
    </TabsList>
  )
}
