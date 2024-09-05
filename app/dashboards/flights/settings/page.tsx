"use client"

import FlightSettingPage from "@/app/settings/flights/page"
import BaseSettingPage from "@/components/base-setting-page/base-setting-page"
import React from "react"
import AircraftDatafields from "@/app/data-fields/aircrafts/components/aircraft-data-fields"
import FlightsDataFields from "@/app/data-fields/flights/flight-data-fields"
import TailNumbersForm from "@/app/settings/aircrafts/components/tabs/tail-numbers-form"
import AircraftDataTable from "@/app/settings/aircrafts/components/tabs/aircraft-data-table"
import AircraftTypePage from "@/app/settings/aircrafts/components/tabs/aircraft-type-page"

const SETTING_LIST = [
  {
    name: 'Flight Scheduler',
    value: 'flight-scheduler',
    pageComponent: <FlightSettingPage />
  },
  {
    name: 'Tail Numbers',
    value: 'tail-numbers',
    pageComponent: <TailNumbersForm isSetting />
  },
  {
    name: 'Aircraft Type',
    value: 'aircraft-types',
    pageComponent: <AircraftTypePage isSetting />
  },
  {
    name: 'Custom Data Fields: Aircrafts',
    value: 'custom-data-aircrafts',
    pageComponent: <AircraftDatafields containerClassName="max-w-screen-lg" />
  },
  {
    name: 'Custom Data Fields: Flights',
    value: 'custom-data-flights',
    pageComponent: <FlightsDataFields containerClassName="max-w-screen-lg" />
  },
]

export default function FlightsSettingPage() {
  return <BaseSettingPage settingList={SETTING_LIST} />
}
