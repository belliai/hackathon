"use client"

import { useState } from "react"
import {
  NavigationMenu,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu"

import useSettingsDynamicHook, {
  SettingsTabName,
} from "@/lib/hooks/useSettingsDynamicHook"
import { Button } from "@/components/ui/button"
import PageContainer from "@/components/layout/PageContainer"

import CrudBookingType from "./booking-type"
import CrudCommodityCode from "./commodity-code"
import AddNewSetting from "./components/AddNewSetting"
import SettingsNavigationItem from "./components/SettingsNavigationItem"
import CrudCurrency from "./currency"
import CrudLocation from "./location"
import CrudPartnerCode from "./partner-code"
import CrudPartnerPrefix from "./partner-prefix"
import CrudPartnerType from "./partner-type"
import CrudPaymentMode from "./payment-mode"
import CrudStatus from "./status"
import CrudTransportMethod from "./transport-method"

const tabs: { name: SettingsTabName; component: JSX.Element }[] = [
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
  const { hook: saveEntity, fields } = useSettingsDynamicHook(activeTab)

  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  const renderComponent = () => {
    const activeTabObject = tabs.find((tab) => tab.name === activeTab)
    return activeTabObject ? activeTabObject.component : null
  }

  const handleSave = (data: Record<string, any>) => {
    const payload = fields.reduce(
      (acc: Record<string, any>, field: string) => {
        acc[field] = data[field]
        return acc
      },
      {} as Record<string, any>
    )
    saveEntity.mutate(payload)
  }

  return (
    <PageContainer className="gap-6">
      {/* Sidebar menu */}
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

        {/* Content on the right side */}
        <div className="flex-1 p-4">
          <div className="flex flex-col items-end">
            <Button onClick={toggleVisibility} variant={"button-primary"}>
              Add new
            </Button>
          </div>

          <AddNewSetting
            isVisible={isVisible}
            toggleVisibility={toggleVisibility}
            onSave={handleSave}
            fields={fields}
          />

          {renderComponent()}
        </div>
      </div>
    </PageContainer>
  )
}
