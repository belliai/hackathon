"use client"

import DataFieldsPageTemplate from "../components/datafields-page-template"
import { tabs } from "../data/payment-mode"

export default function PaymentModeDataFields({ containerClassName }: { containerClassName?: string }) {
  const isSetting = !!containerClassName
  return <DataFieldsPageTemplate tabs={tabs} {...containerClassName && { containerClassName: containerClassName }} isSetting={isSetting} />
}
