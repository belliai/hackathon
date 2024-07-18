import {
  useAddStatus,
  useRemoveStatus,
  useStatuses,
  useUpdateStatus,
} from "@/lib/hooks/statuses"

import CrudTable from "./components/crud-table"

const Status = () => {
  const { isLoading, isPending, error, data } = useStatuses()
  const update = useUpdateStatus()
  const add = useAddStatus()
  const remove = useRemoveStatus()

  if (error) return "An error has occurred: " + error.message

  return (
    <CrudTable
      isLoading={isLoading}
      title="Status"
      columns={[{ accessorKey: "option", header: 'Name' }]}
      form={[
        { name: "id", type: "hidden" },
        { name: "option", type: "text", label: "Status" },
      ]}
      data={data?.map((item: any) => ({ option: item.name, id: item.ID }))}
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
export default Status
