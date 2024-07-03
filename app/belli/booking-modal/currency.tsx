import {
  useAddCurrency,
  useCurrencies,
  useRemoveCurrency,
  useUpdateCurrency,
} from "@/lib/hooks/currencies"

import CrudTable from "./components/crud-table"

const Currency = () => {
  const { isLoading, isPending, error, data } = useCurrencies()
  const update = useUpdateCurrency()
  const add = useAddCurrency()
  const remove = useRemoveCurrency()

  if (isPending) return "Loading..."

  if (error) return "An error has occurred: " + error.message

  return (
    <CrudTable
      title="Currency"
      columns={[{ accessorKey: "option" }]}
      form={[
        { name: "id", type: "hidden" },
        { name: "option", type: "text", label: "Currency" },
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
export default Currency
