"use client"

import { useCallback, useState, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  BadgeDollarSignIcon,
  BookUserIcon,
  CreditCardIcon,
  FileBoxIcon,
  HandshakeIcon,
  LucideIcon,
  MapPinIcon,
  PlaneTakeoffIcon,
  ReceiptTextIcon,
  TruckIcon,
  UserRoundCogIcon,
} from "lucide-react"

import { SettingsTabName } from "@/lib/hooks/useSettingsDynamicHook"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PageContainer from "@/components/layout/PageContainer"

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
}[] = [
  {
    name: "Booking Type",
    component: <CrudBookingType />,
    icon: ReceiptTextIcon,
  },
  {
    name: "Partner Prefix",
    component: <CrudPartnerPrefix />,
    icon: UserRoundCogIcon,
  },
  { name: "Partner Code", component: <CrudPartnerCode />, icon: BookUserIcon },
  { name: "Partner Type", component: <CrudPartnerType />, icon: HandshakeIcon },
  { name: "Status", component: <CrudStatus />, icon: PlaneTakeoffIcon },
  { name: "Location", component: <CrudLocation />, icon: MapPinIcon },
  {
    name: "Commodity Code",
    component: <CrudCommodityCode />,
    icon: FileBoxIcon,
  },
  {
    name: "Payment Mode",
    component: <CrudPaymentMode />,
    icon: CreditCardIcon,
  },
  {
    name: "Transport Method",
    component: <CrudTransportMethod />,
    icon: TruckIcon,
  },
  { name: "Currency", component: <CrudCurrency />, icon: BadgeDollarSignIcon },
  // { name: "Customers", component: <CrudCustomers /> },
]

export default function Page() {
  //const [activeTab, setActiveTab] = useState(tabs[0].name)
  
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(tabs[0].name)

  // Get the tab from the search params on initial load
  useEffect(() => {
    const tabParam = searchParams.get("tab")
    if (tabParam) {
      const tab = tabs.find((tab) => tab.name.toLowerCase().replace(/\s+/g, '-') === tabParam)
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
    router.push(pathname + "?" + createQueryString("tab", val.toLowerCase().replace(/\s+/g, '-')))
  }
  // //handle tab change
  // const handleTabChange = (val:any) => {
  //   setActiveTab(val);
  //   window.location.hash = val.toLowerCase().replace(/\s+/g, '-');
  // };
  return (
    <PageContainer>
      <Tabs
        value={activeTab}
        //onValueChange={(val) => setActiveTab(val as SettingsTabName)}
        onValueChange={handleTabChange}
        className="flex h-full w-full flex-row items-start justify-start gap-4 space-y-0"
      >
        <TabsList className="h-fit w-52 flex-col">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.name}
              id={tab.name.toLowerCase().replace(/\s+/g, '-')}
              value={tab.name}
              className="w-full justify-start px-2 py-1.5"
            >
              {<tab.icon className="mr-2 size-4" />}
              {tab.name}
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
