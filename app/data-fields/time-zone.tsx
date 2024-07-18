import {
  useAddTimeZone,
  useRemoveTimeZone,
  useTimeZones,
  useUpdateTimeZone,
} from "@/lib/hooks/time-zones"

import CrudTable from "./components/crud-table"

const TimeZone = () => {
  const { isLoading, isPending, error, data = [] } = useTimeZones()
  const update = useUpdateTimeZone()
  const add = useAddTimeZone()
  const remove = useRemoveTimeZone()

  if (error) return "An error has occurred: " + error.message

  return (
    <CrudTable
      isLoading={isPending}
      title="Time Zone"
      columns={[{ accessorKey: "option", header: 'Name' }]}
      form={[
        { name: "id", type: "hidden" },
        { name: "option", type: "text", label: "Time Zone" },
      ]}
      data={
        data && data?.map((item: any) => ({ option: item.TZ, id: item.ID }))
      }
      onSave={(data) => {
        // configure logic for add or edit, for edit the id will be zero
        const { id, option } = data
        if (id) {
          update.mutate({ id, name: option })
        } else {
          add.mutate({ name: option })
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
export default TimeZone
