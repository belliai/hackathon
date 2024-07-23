"use client"

import { Banknote } from "lucide-react"

import DataFieldsPageTemplate from "../data-fields/components/datafields-page-template"
import CheckoutSection from "./components/checkout"
import PricingSection from "./components/pricing"
import SubscriptionsSection from "./components/subscriptions"

export default function PlanPage() {
  return (
    <DataFieldsPageTemplate
    containerClassName="min-w-full"
      tabsOrientation="horizontal"
      tabs={[
        {
          component: <PricingSection />,
          icon: Banknote,
          name: "Pricing",
          tooltipId: "pricing",
        },
        {
          component: <SubscriptionsSection />,
          icon: Banknote,
          name: "Subscriptions",
          tooltipId: "subscription",
        },
        {
          component: <CheckoutSection />,
          icon: Banknote,
          name: "Checkout",
          tooltipId: "checkout",
        },
      ]}
    />
  )
}
