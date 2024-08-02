import { AircraftFormValues } from "@/schemas/aircraft/aircraft"
import { Path } from "react-hook-form"

import {
  aircraftFormFieldSections,
  aircraftFormSectionsOrder,
} from "@/app/data-fields/aircrafts/constants/form-fields-sections"

import { AircraftFormTabs } from "../types"

export const aircraftStepsOrder: AircraftFormTabs[] = [
  "aircraft-type",
  ...aircraftFormSectionsOrder,
]

type Fields = Partial<Path<AircraftFormValues>>[]

export const aircractTabValidations: Record<AircraftFormTabs, Fields> = {
  "aircraft-type": [
    "manufacturer_id",
    "aircraft_type_id",
    "version_id",
    "body_type_id",
  ],
  "cargo-capacity": aircraftFormFieldSections["cargo-capacity"].map(
    (field) => field.name
  ),
  "max-per-piece": aircraftFormFieldSections["max-per-piece"].map(
    (field) => field.name
  ),
  "aircraft-details": aircraftFormFieldSections["aircraft-details"].map(
    (field) => field.name
  ),
  "door-dimensions": aircraftFormFieldSections["door-dimensions"].map(
    (field) => field.name
  ),
  volume: aircraftFormFieldSections["volume"].map((field) => field.name),
}
