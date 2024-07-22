"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { LucideIcon } from "lucide-react"

import { getTooltipContents } from "@/lib/contentful"
import { SettingsTabName } from "@/lib/hooks/useSettingsDynamicHook"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import PageContainer from "@/components/layout/PageContainer"

export interface DataFieldsTab {
  name: SettingsTabName | string
  component: JSX.Element
  icon: LucideIcon
  tooltipId: string
  disabled?: boolean
}

interface DataFieldsPageTemplateProps {
  tabs: DataFieldsTab[]
  tabsOrientation?: "horizontal" | "vertical"
  containerClassName?: string
}

export default function DataFieldsPageTemplate({
  tabs,
  tabsOrientation = "vertical",
  containerClassName,
}: DataFieldsPageTemplateProps) {
  const tooltips = getTooltipContents()

  const defaultTab = tabs.filter((tab) => !tab.disabled)[0]

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(defaultTab.name)

  // Get the tab from the search params on initial load
  useEffect(() => {
    const tabParam = searchParams.get("tab")
    if (tabParam) {
      const tab = tabs.find(
        (tab) => tab.name.toLowerCase().replace(/\s+/g, "-") === tabParam
      )
      if (tab) {
        setActiveTab(tab.name)
      }
    }
  }, [searchParams])

  // Create a new searchParams string by merging the current searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  // Handle tab change
  const handleTabChange = (val: any) => {
    router.push(
      pathname +
        "?" +
        createQueryString("tab", val.toLowerCase().replace(/\s+/g, "-"))
    )
  }

  useEffect(() => {
    handleTabChange(activeTab)
  }, [activeTab])

  const getHoveredContent = (tabName: string) => {
    const tabFound = tabs.find((tab) => tab.name === tabName)
    const tooltip = tooltips.find((list) => list.id === tabFound?.tooltipId)
    return tooltip?.content || ""
  }
  const renderTooltip = (tabName: string) => {
    const content = getHoveredContent(tabName)
    if (!content) {
      return <p>{tabName}</p>
    }
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div>{tabName}</div>
        </TooltipTrigger>
        <TooltipContent
          side={tabsOrientation === "horizontal" ? "bottom" : "right"}
          className="border bg-card text-foreground"
        >
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <PageContainer>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className={cn("flex h-full w-full items-start justify-start", {
          "flex-col gap-2": tabsOrientation === "horizontal",
          "flex-row gap-4 space-y-0": tabsOrientation === "vertical",
        })}
      >
        <TabsList
          className={cn("h-fit", {
            "w-full justify-start gap-4 overflow-auto bg-transparent":
              tabsOrientation === "horizontal",
            "w-52 flex-col": tabsOrientation === "vertical",
          })}
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.name}
              id={tab.name.toLowerCase().replace(/\s+/g, "-")}
              value={tab.name}
              disabled={tab?.disabled}
              className={cn("px-2 py-1.5", {
                "w-fit": tabsOrientation === "horizontal",
                "w-full justify-start": tabsOrientation === "vertical",
              })}
            >
              {tabsOrientation === "vertical" && (
                <tab.icon className="mr-2 size-4" />
              )}
              {renderTooltip(tab.name)}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabsOrientation === "horizontal" && <Separator />}
        <div className="mt-6 flex w-full flex-col items-center">
          <div
            className={cn("flex w-full max-w-screen-sm", containerClassName)}
          >
            {tabs.map((tab) => (
              <TabsContent
                key={tab.name}
                className="w-full flex-1 space-y-4"
                value={tab.name}
              >
                {tab.component}
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>
    </PageContainer>
  )
}
