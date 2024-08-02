import { TailNumberFormValues } from "@/schemas/aircraft/tail-numbers"
import { Path } from "react-hook-form"

import {
  aircraftFormFieldSections,
  aircraftFormSectionsOrder,
} from "@/app/data-fields/aircrafts/constants/form-fields-sections"

import { TailNumberFormTabs } from "../types"

export const stepsOrder: TailNumberFormTabs[] = [
  "tail-numbers",
  ...aircraftFormSectionsOrder,
]

type Fields = Partial<Path<TailNumberFormValues>>[]

export const tailNumberTabValidations: Record<TailNumberFormTabs, Fields> = {
  "tail-numbers": ["tail_number", "aircraft_id", "status_id"],
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
