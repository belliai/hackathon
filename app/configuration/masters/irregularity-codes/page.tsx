"use client";

import MastersPageTemplate from "@/app/k360/organize/masters/components/MastersPageTemplate";
import { DUMMY_SELECT_OPTIONS } from "@/app/k360/organize/masters/components/dummySelectOptions";
import { TFormTextField } from "@/components/form/FormTextField";
import CreateFormPageTemplate from "@/components/page-template/CreateFormPageTemplate";
import FilterActions from "@/components/page-template/FilterActions";
import { useForm } from "react-hook-form";

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
  ];

  const form = useForm();

  return (
    <CreateFormPageTemplate
      heading="Irregularity Codes"
      formFields={formFields}
      hookForm={form}
      customDialogContent={
        <div className="flex flex-col gap-4">
          <div className="max-w-96 mt-8">
            <FilterActions />
          </div>
        </div>
      }
    />
  );
}
