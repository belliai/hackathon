import {
  useAddLocation,
  useLocations,
  useRemoveLocation,
  useUpdateLocation,
} from "@/lib/hooks/locations"

import CrudTable from "./components/crud-table"
import { useTimeZones } from "@/lib/hooks/time-zones"

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


  if (isPending) return "Loading..."

  if (error) return "An error has occurred: " + error.message

  return (
    <CrudTable
      title="Location"
      columns={[{ accessorKey: "option" }]}
      form={[
        { name: "id", type: "hidden" },
        { name: "option", type: "text", label: "Location" },
        {
          name: "time_zone_id",
          type: "select",
          label: "Default Time Zone",
          selectOptions: timeZoneOptions,
       
        },
      ]}
      data={data.map((item: any) => ({ option: item.name, id: item.ID, time_zone_id : "" }))}
      onSave={(data) => {
        // configure logic for add or edit, for edit the id will be zero
        const { id, option, time_zone_id } = data
        if (id) {
          update.mutate({ id, name: option,  time_zone_id})
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
