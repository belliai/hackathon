import { toast } from "@/components/ui/use-toast"

import {
  aircraftFormFieldSections,
  AircraftFormSectionedFields,
  AircraftFormSections,
} from "../constants/form-fields-sections"
import useFormFieldToggle from "../hooks/use-form-field-toggle"
import FieldSectionVisibilityToggles from "./field-section-visibility-toggles"

const sectionKey = "cargo-capacity" as const

export default function CargoCapacityFields() {
  const { data, update, isPending } = useFormFieldToggle()

  return (
    <FieldSectionVisibilityToggles<
      AircraftFormSections,
      AircraftFormSectionedFields[typeof sectionKey]
    >
      defaultVisible={true}
      defaultValues={data?.["aircraft"]?.[sectionKey]}
      onSave={async ({ fields, sectionKey }) => {
        await update(
          { groupKey: "aircraft", fields, sectionKey },
          {
            onSuccess: () => {
              toast({
                title: "Success!",
                description: "configuration has been updated",
              })
            },
            onError: () => {
              toast({
                title: "Oops!",
                description: "failed to update configuration",
              })
            },
          }
        )
      }}
      sectionKey={sectionKey}
      fields={aircraftFormFieldSections[sectionKey]}
      isSaving={isPending}
    />
  )
}
