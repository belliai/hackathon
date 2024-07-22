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

  if (error) return "An error has occurred: " + error.message

  const partnerCodeOptions = data?.map((prefix: any) => ({
    value: prefix.ID,
    label: prefix.name,
  }))

  return (
    <CrudTable
      isLoading={isPending}
      title="IATA Airline Code"
      columns={[{ accessorKey: "option", header: 'Name' }, { accessorKey: 'description', header: 'Description' }]}
      form={[
        { name: "id", type: "hidden" },
        { name: "option", type: "text", label: "IATA Airline Code" },
      ]}
      data={data?.map((item: any) => ({ ...item, option: item.name, id: item.ID }))}
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
      canSearch
      searchOptions={partnerCodeOptions}
    />
  )
}
export default PartnerCode
