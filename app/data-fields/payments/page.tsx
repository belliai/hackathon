"use client"

import DataFieldsPageTemplate from "../components/datafields-page-template"
import { tabs } from "../data/payment-mode"

export default function PaymentModeDataFields() {
  return <DataFieldsPageTemplate tabs={tabs} />
}
