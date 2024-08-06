"use client"

import AirwayBillsDataFields from "@/app/data-fields/airway-bills/airway-bills-data-fields"
import BaseSettingPage from "@/components/base-setting-page/base-setting-page"
import React from "react"

const SETTING_LIST = [
  {
    name: 'Custom Data Fields: Airway Bills',
    value: 'airway-bills',
    pageComponent: <AirwayBillsDataFields containerClassName="max-w-screen-lg" />
  },
]

export default function AirwayBillsSettingPage() {
  return <BaseSettingPage settingList={SETTING_LIST} />
}
