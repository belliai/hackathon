import { Loader2 } from "lucide-react"

import {
  useGetOrganizationSettings,
  useUpdateOrganizationSettings,
} from "@/lib/hooks/settings/organization"
import { toast } from "@/components/ui/use-toast"

import {
  aircraftFormFieldSections,
  AircraftFormSectionedFields,
  AircraftFormSections,
} from "../constants/form-fields-sections"
import useFormFieldToggle from "../hooks/use-form-field-toggle"
import FieldSectionVisibilityToggles from "./field-section-visibility-toggles"

const sectionKey = "cargo-capacity" as const

function formValuesAdapter(values: any) {
  const newValues = Object.entries(values).reduce((acc, [key, value]) => {
    if (key.endsWith("_visible")) {
      acc[key.replace("_visible", "") as string] = value
    } else {
      acc[key as string] = value
    }
    return acc
  }, {} as any)

  return newValues
}

function apiPayloadAdapter(values: any) {
  return Object.entries(values).reduce((acc, [key, value]) => {
    const hasActual = /_actual/.test(key)
    const hasVisible = /_visible/.test(key)

    const newKey = !hasVisible && !hasActual ? key + "_visible" : key

    return { ...acc, [newKey]: value }
  }, {})
}

export default function CargoCapacityFields() {
  const { data, update, isPending } = useFormFieldToggle()
  const { mutateAsync } = useUpdateOrganizationSettings({ sectionKey: "cargo" })

  const { data: cargoCapacitySettings, isLoading } =
    useGetOrganizationSettings<{ visible: boolean }>({ sectionKey: "cargo" })

  console.log("cargoCapacitySettings: ", cargoCapacitySettings)

  if (isLoading) {
    return (
      <div className="flex w-full justify-center py-12">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  const newValues = formValuesAdapter(cargoCapacitySettings)

  return (
    <FieldSectionVisibilityToggles<
      AircraftFormSections,
      AircraftFormSectionedFields[typeof sectionKey]
    >
      defaultVisible={!!cargoCapacitySettings?.visible}
      defaultValues={newValues}
      onSave={async ({ fields, sectionKey }) => {
        await update(
          { groupKey: "aircraft", fields, sectionKey },
          {
            onSuccess: () => {
              console.log("success updating clerk organization metadata")
            },
            onError: () => {
              console.error("error updating clerk organization metadata")
            },
          }
        )

        const payloadForSettingsApi = apiPayloadAdapter(fields)

        await mutateAsync(payloadForSettingsApi, {
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
        })
      }}
      sectionKey={sectionKey}
      apiSectionKey="cargo"
      fields={aircraftFormFieldSections[sectionKey]}
      isSaving={isPending}
    />
  )
}
