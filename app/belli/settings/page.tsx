"use client"

import { useState } from "react"
import {
  NavigationMenu,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu"

import PageContainer from "@/components/layout/PageContainer"

import CrudBookingType from "./booking-type"
import CrudCommodityCode from "./commodity-code"
import SettingsNavigationItem from "./components/SettingsNavigationItem"
import CrudCurrency from "./currency"
import CrudLocation from "./location"
import CrudPartnerCode from "./partner-code"
import CrudPartnerPrefix from "./partner-prefix"
import CrudPartnerType from "./partner-type"
import CrudPaymentMode from "./payment-mode"
import CrudStatus from "./status"
import CrudTransportMethod from "./transport-method"

const tabs = [
  { name: "Booking Type", component: <CrudBookingType /> },
  { name: "Partner Prefix", component: <CrudPartnerPrefix /> },
  { name: "Partner Code", component: <CrudPartnerCode /> },
  { name: "Status", component: <CrudStatus /> },
  { name: "Location", component: <CrudLocation /> },
  { name: "Commodity Code", component: <CrudCommodityCode /> },
  { name: "Payment Mode", component: <CrudPaymentMode /> },
  { name: "Transport Method", component: <CrudTransportMethod /> },
  { name: "Partner Type", component: <CrudPartnerType /> },
  { name: "Currency", component: <CrudCurrency /> },
]

export default function Page() {
  const [activeTab, setActiveTab] = useState(tabs[0].name)

  const renderComponent = () => {
    const activeTabObject = tabs.find((tab) => tab.name === activeTab)
    return activeTabObject ? activeTabObject.component : null
  }

  return (
    <PageContainer className="gap-6">
      <div className="flex">
        <NavigationMenu className="p-4">
          <NavigationMenuList className="flex flex-col space-y-2">
            {tabs.map((tab) => (
              <SettingsNavigationItem
                key={tab.name}
                tabName={tab.name}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex-1 p-4">{renderComponent()}</div>
      </div>
    </PageContainer>
  )
}
