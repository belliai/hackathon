"use client"

import CustomersDataFields from "@/app/data-fields/customers/customers-data-fields"
import OrganizationsDataFields from "@/app/data-fields/organizations/organizations-data-fields"
import PaymentModeDataFields from "@/app/data-fields/payments/payments-data-fields"
import BaseSettingPage from "@/components/base-setting-page/base-setting-page"
import React from "react"

const SETTING_LIST = [
  {
    name: 'Payments',
    value: 'payments',
    pageComponent: <PaymentModeDataFields containerClassName="max-w-screen-lg" />
  },
  {
    name: 'Organizations',
    value: 'organizations',
    pageComponent: <OrganizationsDataFields containerClassName="max-w-screen-lg" />
  },
  {
    name: 'Customers',
    value: 'customers',
    pageComponent: <CustomersDataFields containerClassName="max-w-screen-lg" />
  },
]

export default function PartnersSettingPage() {
  return <BaseSettingPage settingList={SETTING_LIST} />
}
