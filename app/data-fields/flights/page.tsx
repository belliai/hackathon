"use client"

import DataFieldsPageTemplate from "../components/datafields-page-template"
import { flightsTabs } from "../data/flights"

export default function FlightsCustomFieldsPage() {
  return <DataFieldsPageTemplate tabs={flightsTabs} />
}
