import { AircraftGeneralFields } from "@/schemas/aircraft/general-fields"
import {
  BoxesIcon,
  BoxIcon,
  DoorClosedIcon,
  LucideIcon,
  PackageIcon,
  PlaneIcon,
} from "lucide-react"
import { Path } from "react-hook-form"

import { useAircraftBodyTypes } from "@/lib/hooks/aircrafts/aircraft-body-type"
import { InputSwitchProps, SelectOptions } from "@/components/form/InputSwitch"
import { AircraftFormSections } from "@/app/data-fields/aircrafts/constants/form-fields-sections"
import useFormFieldToggle from "@/app/data-fields/aircrafts/hooks/use-form-field-toggle"

import { TabTrigger } from "../constants/tab-triggers"

export const useGeneralFieldSections = () => {
  const { data } = useFormFieldToggle()

  const fieldVisibility = data["aircraft"]

  const { data: aircraftBodyTypes } = useAircraftBodyTypes()
  const aircraftBodyTypesOptions = aircraftBodyTypes?.map((bodyType) => ({
    value: String(bodyType.ID),
    label: bodyType.Name,
  }))

  const sections: {
    value: AircraftFormSections
    title: string
    icon: LucideIcon
    items: {
      label?: string
      name: Path<AircraftGeneralFields>
      type: InputSwitchProps<AircraftGeneralFields>["type"]
      unit?: "weight" | "dimension" | "volume"
      selectOptions?: SelectOptions
    }[]
  }[] = [
    {
      value: "cargo-capacity",
      title: "Cargo Capacity",
      icon: BoxesIcon,
      items: [
        { label: "Cargo Capacity", name: "cargo_capacity", type: "number" },
        { label: "ULD Positions", name: "uld_position", type: "number" },
        {
          label: "Max Bulk Capacity Weight",
          name: "max_bulk_capacity_weight",
          type: "number",
          unit: "weight",
        },
        {
          label: "Max Bulk Capacity Volume",
          name: "max_bulk_capacity_volume",
          type: "number",
          unit: "volume",
        },
        {
          label: "Max Volume",
          name: "max_volume",
          type: "number",
          unit: "volume",
        },
      ],
    },
    {
      value: "max-per-piece",
      title: "Max Per Piece",
      icon: PackageIcon,
      items: [
        {
          label: "Restricted Weight Per Piece",
          name: "restricted_weight_piece",
          type: "number",
          unit: "weight",
        },
        {
          label: "Max Dimension per Piece (Length)",
          name: "max_dimension_length",
          type: "number",
          unit: "dimension",
        },
        {
          label: "Max Dimension per Piece (Breadth)",
          name: "max_dimension_breadth",
          type: "number",
          unit: "dimension",
        },
        {
          label: "Max Dimension per Piece (Height)",
          name: "max_dimension_height",
          type: "number",
          unit: "dimension",
        },
      ],
    },
    {
      value: "aircraft-details",
      title: "Aircraft Details",
      icon: PlaneIcon,
      items: [
        { label: "MTOW", name: "mtow", type: "number", unit: "weight" },
        {
          label: "Max Zero Fuel Weight",
          name: "max_zero_fuel_weight",
          type: "number",
          unit: "weight",
        },
        {
          label: "Passenger Capacity",
          name: "passenger_capacity",
          type: "number",
        },
        {
          label: "Landing Weight",
          name: "landing_weight",
          type: "number",
          unit: "weight",
        },
        {
          label: "GL Code",
          name: "gl_code_id",
          type: "select",
          selectOptions: aircraftBodyTypesOptions,
        },
        { name: "count", type: "hidden" },
      ],
    },
    {
      value: "door-dimensions",
      title: "Door Dimensions",
      icon: DoorClosedIcon,
      items: [
        { label: "AFT (H)", name: "aft_h", type: "number", unit: "dimension" },
        { label: "AFT (W)", name: "aft_w", type: "number", unit: "dimension" },
        { label: "FWD (H)", name: "fwd_h", type: "number", unit: "dimension" },
        { label: "FWD (W)", name: "fwd_w", type: "number", unit: "dimension" },
        {
          label: "Bulk (H)",
          name: "bulk_h",
          type: "number",
          unit: "dimension",
        },
        {
          label: "Bulk (W)",
          name: "bulk_w",
          type: "number",
          unit: "dimension",
        },
      ],
    },
    {
      value: "volume",
      title: "Volume",
      icon: BoxIcon,
      items: [
        { label: "FWT", name: "fwt", type: "number" },
        { label: "FWD", name: "fwd", type: "number" },
        { label: "Bulk", name: "bulk", type: "number" },
      ],
    },
  ]

  const fieldSections = sections
    .map((section) => {
      const filteredItems = section.items.filter(
        (item) => fieldVisibility?.[section.value]?.[item.name]
      )
      return filteredItems.length > 0
        ? { ...section, items: filteredItems }
        : null
    })
    .filter((section) => section !== null)

  type NullableTabTrigger = TabTrigger | null

  const triggers: TabTrigger[] = fieldSections
    .map((section): NullableTabTrigger => {
      if (!section) return null
      return {
        key: section.value,
        label: section.title,
        icon: section.icon,
      }
    })
    .filter((item): item is TabTrigger => item !== null)

  return { fieldSections, triggers }
}

export default useGeneralFieldSections
