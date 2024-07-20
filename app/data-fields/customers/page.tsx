"use client"

import { Building2Icon, Contact2Icon } from "lucide-react"

import DataFieldsPageTemplate from "../components/datafields-page-template"
import CustomersOrganizationsCrud from "./customers-organizations.crud"
import CustomersPeopleCrud from "./customers-people-crud"

export default function CustomersDataFields() {
  return (
    <DataFieldsPageTemplate
      tabs={[
        {
          name: "Organizations",
          icon: Building2Icon,
          tooltipId: "customer-organizations",
          component: <CustomersOrganizationsCrud />,
        },
        {
          name: "People",
          icon: Contact2Icon,
          tooltipId: "customer-people",
          component: <CustomersPeopleCrud />,
        },
      ]}
      containerClassName="max-w-screen-lg"
    />
  )
}
