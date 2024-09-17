"use client"

import { Box, FileSpreadsheetIcon, Waypoints } from "lucide-react"

import DataFieldsPageTemplate, {
  DataFieldsTab,
} from "@/app/data-fields/components/datafields-page-template"

import GoogleAPI from "./components/google-api"
import DataIntegrations from "./components/integrations"
import DataSyncWithCMS from "./components/sync-with-cms"

export default function DataPage() {
  const tabs: DataFieldsTab[] = [
    {
      name: "Integrations" as any,
      component: <DataIntegrations />,
      icon: Waypoints,
      tooltipId: "integrations",
    },
    {
      name: "Sync with CMS" as any,
      component: <DataSyncWithCMS />,
      icon: Box,
      tooltipId: "sync-with-cms",
    },
    {
      name: "Google API" as any,
      component: <GoogleAPI />,
      icon: FileSpreadsheetIcon,
      tooltipId: "google-api",
    },
  ]

  return (
    <DataFieldsPageTemplate
      tabs={tabs}
      tabsOrientation="vertical"
      containerClassName="max-w-none"
    />
  )
}
