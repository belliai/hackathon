"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  BadgeDollarSignIcon,
  BookUserIcon,
  CreditCardIcon,
  FileBoxIcon,
  HandshakeIcon,
  LucideIcon,
  MapPinIcon,
  Plane,
  PlaneTakeoffIcon,
  ReceiptTextIcon,
  TruckIcon,
  UserRoundCogIcon,
} from "lucide-react"

import { getTooltipContents } from "@/lib/contentful"
import { SettingsTabName } from "@/lib/hooks/useSettingsDynamicHook"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import PageContainer from "@/components/layout/PageContainer"

import CrudAircraft from "./aircraft"
import CrudBookingType from "./booking-type"
import CrudCommodityCode from "./commodity-code"
import CrudCurrency from "./currency"
import CrudLocation from "./location"
import CrudPartnerCode from "./partner-code"
import CrudPartnerPrefix from "./partner-prefix"
import CrudPartnerType from "./partner-type"
import CrudPaymentMode from "./payment-mode"
import CrudStatus from "./status"
import CrudTransportMethod from "./transport-method"

const tabs: {
  name: SettingsTabName
  component: JSX.Element
  icon: LucideIcon
  tooltipId: string
}[] = [
  {
    name: "Booking Type",
    component: <CrudBookingType />,
    icon: ReceiptTextIcon,
    tooltipId: "aircraft-settings-booking-type",
  },
  {
    name: "Partner Prefix",
    component: <CrudPartnerPrefix />,
    icon: UserRoundCogIcon,
    tooltipId: "aircraft-settings-partner-prefix",
  },
  {
    name: "Partner Code",
    component: <CrudPartnerCode />,
    icon: BookUserIcon,
    tooltipId: "aircraft-settings-partner-code",
  },
  {
    name: "Partner Type",
    component: <CrudPartnerType />,
    icon: HandshakeIcon,
    tooltipId: "aircraft-settings-partner-type",
  },
  {
    name: "Status",
    component: <CrudStatus />,
    icon: PlaneTakeoffIcon,
    tooltipId: "aircraft-settings-status",
  },
  {
    name: "Location",
    component: <CrudLocation />,
    icon: MapPinIcon,
    tooltipId: "aircraft-settings-location",
  },
  {
    name: "Commodity Code",
    component: <CrudCommodityCode />,
    icon: FileBoxIcon,
    tooltipId: "aircraft-settings-commodity-code",
  },
  {
    name: "Payment Mode",
    component: <CrudPaymentMode />,
    icon: CreditCardIcon,
    tooltipId: "aircraft-settings-payment-mode",
  },
  {
    name: "Transport Method",
    component: <CrudTransportMethod />,
    icon: TruckIcon,
    tooltipId: "aircraft-settings-transport-method",
  },
  {
    name: "Currency",
    component: <CrudCurrency />,
    icon: BadgeDollarSignIcon,
    tooltipId: "aircraft-settings-currency",
  },
  {
    name: "Aircrafts",
    component: <CrudAircraft />,
    icon: Plane,
    tooltipId: "aircraft",
  },
]

export default function Page() {
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
    setActiveTab(val)
    router.push(
      pathname +
        "?" +
        createQueryString("tab", val.toLowerCase().replace(/\s+/g, "-"))
    )
  }

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
