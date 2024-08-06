"use client"

import DataFieldsPageTemplate from "../components/datafields-page-template"
import { shipmentsTabs } from "../data/shipments"

export default function AirwayBillsDataFields({ containerClassName = '' }: { containerClassName?: string }) {
  const isSetting = !!containerClassName
  return <DataFieldsPageTemplate tabs={shipmentsTabs} containerClassName={containerClassName} isSetting={isSetting} />
}
