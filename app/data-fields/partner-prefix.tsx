import {
  useAddPartnerPrefix,
  usePartnerPrefixes,
  useRemovePartnerPrefix,
  useUpdatePartnerPrefix,
} from "@/lib/hooks/partner-prefix"

import CrudTable from "./components/crud-table"

const PartnerPrefix = ({ tabComponent }: { tabComponent?: React.ReactNode }) => {
  const { isLoading, isPending, error, data } = usePartnerPrefixes()
  const update = useUpdatePartnerPrefix()
  const add = useAddPartnerPrefix()
  const remove = useRemovePartnerPrefix()

  if (error) return "An error has occurred: " + error.message

  const partnerPrefixesOptions = data?.map((prefix: any) => ({
    value: prefix.ID,
    label: prefix.name,
  }))
  
  return (
    <CrudTable
      isLoading={isPending}
      title="Airline AWB Prefix"
      columns={[{ accessorKey: "option", header: 'Name' }]}
      form={[
        { name: "id", type: "hidden" },
        { name: "option", type: "text", label: "Airline AWB Prefix" },
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
      searchOptions={partnerPrefixesOptions}
      canSearch
      tabComponent={tabComponent}
    />
  )
}
export default PartnerPrefix
