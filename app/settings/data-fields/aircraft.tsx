import CustomFieldsSettings, { FieldGroupType } from "./custom-fields-settings"

export const DUMMY_FIELD_GROUPS = [
  {
    label: "Aircraft",
    value: "aircraft",
  },
  {
    label: "Crew",
    value: "crew",
  },
  {
    label: "Passenger",
    value: "passenger",
  },
]

export default function CrudAircraft() {
  const customFields = [
    {
      field_group: "aircraft",
      field_label: "Aircraft",
      field_name: "aircraft",
      field_type: "text",
      id: "1",
    },
    {
      field_group: "crew",
      field_label: "Crew",
      field_name: "crew",
      field_type: "text",
      id: "2",
    },
    {
      field_group: "passenger",
      field_label: "Passenger",
      field_name: "passenger",
      field_type: "text",
      id: "3",
    },
  ]

  const fieldGroups: FieldGroupType[] = DUMMY_FIELD_GROUPS.map((fieldGroup) => {
    return {
      id: fieldGroup.value,
      name: fieldGroup.label,
      data: customFields.filter(
        (field) => field.field_group === fieldGroup.value
      ),
    }
  })

  return <CustomFieldsSettings groups={DUMMY_FIELD_GROUPS} data={fieldGroups} />
}
