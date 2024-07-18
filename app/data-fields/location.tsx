import {
  useAddLocation,
  useLocations,
  useRemoveLocation,
  useUpdateLocation,
} from "@/lib/hooks/locations"
import { useTimeZones } from "@/lib/hooks/time-zones"

import CrudTable from "./components/crud-table"

const Location = () => {
  const { isLoading, isPending, error, data } = useLocations()
  const update = useUpdateLocation()
  const add = useAddLocation()
  const remove = useRemoveLocation()

  const { data: timeZones, isLoading: isLoadingTimeZones } = useTimeZones()

  const timeZoneOptions = timeZones?.map((timeZone: any) => ({
    value: String(timeZone.ID),
    label: timeZone.TZ,
  }))

  if (error) return "An error has occurred: " + error.message

  return (
    <CrudTable
      isLoading={isPending}
      id="location"
      title="Location"
      columns={[{ accessorKey: "option", header: 'Name' }, { accessorKey: "time_zone.name", header: 'Timezone' }]}
      form={[
        { name: "id", type: "hidden" },
        { name: "option", type: "text", label: "Location" },
        {
          name: "time_zone_id",
          type: "select",
          label: "Default Time Zone",
          selectOptions: timeZoneOptions,
          placeholder: "Time Zone",
        },
      ]}
      data={data?.map((item: any) => ({
        option: item.name,
        id: item.ID,
        time_zone_id: item.time_zone?.ID,
      }))}
      onSave={(data) => {
        // configure logic for add or edit, for edit the id will be zero
        const { id, option, time_zone_id } = data
        if (id) {
          update.mutate({ id, name: option, time_zone_id })
        } else {
          add.mutate({ name: option, time_zone_id })
        }
      }}
      onDelete={(data) => {
        // configure logic for delete
        if (data.id) {
          remove.mutate({ id: data.id })
        }
      }}
    />
  )
}
export default Location
