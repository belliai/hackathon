import {
  useAddPartnerPrefix,
  usePartnerPrefixes,
  useRemovePartnerPrefix,
  useUpdatePartnerPrefix,
} from "@/lib/hooks/partner-prefix"

import CrudTable from "./components/crud-table"

const PartnerPrefix = () => {
  const { isLoading, isPending, error, data } = usePartnerPrefixes()
  const update = useUpdatePartnerPrefix()
  const add = useAddPartnerPrefix()
  const remove = useRemovePartnerPrefix()

  if (error) return "An error has occurred: " + error.message

  return (
    <CrudTable
      isLoading={isPending}
      title="Partner Prefix"
      columns={[{ accessorKey: "option" }]}
      form={[
        { name: "id", type: "hidden" },
        { name: "option", type: "text", label: "Partner Prefix" },
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
export default PartnerPrefix
