"use client"

import { useForm } from "react-hook-form"

import { TFormTextField } from "@/components/form/FormTextField"
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate"
import FilterActions from "@/components/page-template/FilterActions"
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions"
import MastersPageTemplate from "@/app/k360/organize/masters/components/MastersPageTemplate"

export default function MasterIrregularityCodes() {
  const formFields: TFormTextField[] = [
    {
      name: "type",
      type: "select",
      label: "Type",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "irregularityCode",
      type: "text",
      label: "Irregularity Code",
      orientation: "horizontal",
    },
    {
      name: "description",
      type: "text",
      label: "Description",
      orientation: "horizontal",
    },
    {
      name: "exportImport",
      type: "select",
      label: "Export/Import",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "fadCode",
      type: "select",
      label: "FAD Code",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "impactFab",
      type: "select",
      label: "Impact Fab",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "stationCode",
      type: "select",
      label: "Station Code",
      orientation: "horizontal",
      options: DUMMY_SELECT_OPTIONS,
    },
    {
      name: "active",
      type: "checkbox",
      label: "Active",
    },
  ]

  const form = useForm()

  return (
    <CreateFormPageTemplate
      heading="Irregularity Codes"
      formFields={formFields}
      hookForm={form}
      customDialogContent={
        <div className="flex flex-col gap-4">
          <div className="mt-8 max-w-96">
            <FilterActions />
          </div>
        </div>
      }
    />
  )
}
