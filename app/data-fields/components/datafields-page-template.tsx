"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { LucideIcon } from "lucide-react"

import { getTooltipContents } from "@/lib/contentful"
import { SettingsTabName } from "@/lib/hooks/useSettingsDynamicHook"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import PageContainer from "@/components/layout/PageContainer"

export interface DataFieldsTab {
  name: SettingsTabName
  component: JSX.Element
  icon: LucideIcon
  tooltipId: string
}

interface DataFieldsPageTemplateProps {
  tabs: DataFieldsTab[]
}

export default function DataFieldsPageTemplate({
  tabs,
}: DataFieldsPageTemplateProps) {
  const tooltips = getTooltipContents()

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(tabs[0].name)

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
    // setActiveTab(val)
    router.push(
      pathname +
        "?" +
        createQueryString("tab", val.toLowerCase().replace(/\s+/g, "-"))
    )
  }
  // //handle tab change
  // const handleTabChange = (val:any) => {
  //   setActiveTab(val);
  //   window.location.hash = val.toLowerCase().replace(/\s+/g, '-');
  // };

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
        <TooltipTrigger>
          <div>{tabName}</div>
        </TooltipTrigger>
        <TooltipContent side="right" className="border bg-card text-foreground">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <PageContainer>
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="flex h-full w-full flex-row items-start justify-start gap-4 space-y-0"
      >
        <TabsList className="h-fit w-52 flex-col">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.name}
              id={tab.name.toLowerCase().replace(/\s+/g, "-")}
              value={tab.name}
              className="w-full justify-start px-2 py-1.5"
            >
              {<tab.icon className="mr-2 size-4" />}

              {renderTooltip(tab.name)}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent
            key={tab.name}
            className="w-full flex-1 space-y-4"
            value={tab.name}
          >
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </PageContainer>
  )
}
