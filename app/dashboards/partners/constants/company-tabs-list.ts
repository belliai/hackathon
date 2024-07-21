import { AircraftFormValues } from "@/schemas/aircraft/aircraft"
import { BookTextIcon, LucideIcon } from "lucide-react"
import { Path } from "react-hook-form"

export type CompanyFormTabs =
  | "general-info"
  | "address-book"
  | "billing-details"

type Fields = Path<unknown>[]

export const companyFormTabsList: {
  value: CompanyFormTabs
  label: string
  icon: LucideIcon
  validationFields: Fields[]
}[] = [
  {
    value: "general-info",
    label: "General Info",
    icon: BookTextIcon,
    validationFields: [],
  },
  {
    value: "address-book",
    label: "Address Book",
    icon: BookTextIcon,
    validationFields: [],
  },
  {
    value: "billing-details",
    label: "Billing Details",
    icon: BookTextIcon,
    validationFields: [],
  },
]
