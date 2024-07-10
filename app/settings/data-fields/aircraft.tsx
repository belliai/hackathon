import CustomFields from "./custom-fields"

export default function CrudAircraft() {
  return (
    <CustomFields
      title="Aircraft"
      data={[
        {
          field_group: "Aircraft",
          field_label: "Aircraft",
          field_name: "aircraft",
          field_type: "text",
          id: "1",
        },
      ]}
    />
  )
}
