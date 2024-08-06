"use client"

import DataFieldsPageTemplate from "../components/datafields-page-template"
import { flightsTabs } from "../data/flights"

export default function FlightsDataFields({ containerClassName = '' }: { containerClassName?: string }) {
  const isSetting = !!containerClassName
  return <DataFieldsPageTemplate tabs={flightsTabs} containerClassName={containerClassName} isSetting={isSetting} />
}
