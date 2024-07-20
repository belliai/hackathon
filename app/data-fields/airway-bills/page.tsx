"use client"

import PageContainer from "@/components/layout/PageContainer"

import DataFieldsPageTemplate from "../components/datafields-page-template"
import { shipmentsTabs } from "../data/shipments"

export default function ShipmentsDataFieldPage() {
  return <DataFieldsPageTemplate tabs={shipmentsTabs} />
}
