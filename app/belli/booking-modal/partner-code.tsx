import {
  useAddPartnerCode,
  usePartnerCodes,
  useRemovePartnerCode,
  useUpdatePartnerCode,
} from "@/lib/hooks/partner-codes"

import CrudTable from "./components/crud-table"

const PartnerCode = () => {
  const { isLoading, isPending, error, data } = usePartnerCodes()
  const update = useUpdatePartnerCode()
  const add = useAddPartnerCode()
  const remove = useRemovePartnerCode()

  if (isPending) return "Loading..."

  if (error) return "An error has occurred: " + error.message

  return (
    <CrudTable
      title="Partner Code"
      columns={[{ accessorKey: "option" }]}
      form={[
        { name: "id", type: "hidden" },
        { name: "option", type: "text", label: "Partner Code" },
      ]}
      data={data.map((item: any) => ({ option: item.name, id: item.ID }))}
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
export default PartnerCode
