"use client"

import DataFieldsPageTemplate from "../components/datafields-page-template"
import { tabs } from "../data/organizations"

export default function OrganizationsDataFields({ containerClassName }: { containerClassName?: string }) {
  const isSetting = !!containerClassName
  return <DataFieldsPageTemplate tabs={tabs} {...containerClassName && { containerClassName: containerClassName }} isSetting={isSetting} />
}
