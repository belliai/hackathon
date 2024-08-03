import {
  useAddCurrency,
  useCurrencies,
  useRemoveCurrency,
  useUpdateCurrency,
} from "@/lib/hooks/currencies"

import CrudTable from "./components/crud-table"

const Currency = ({ tabComponent }: { tabComponent?: React.ReactNode }) => {
  const { isLoading, isPending, error, data } = useCurrencies()
  const update = useUpdateCurrency()
  const add = useAddCurrency()
  const remove = useRemoveCurrency()

  if (error) return "An error has occurred: " + error.message

  return (
    <CrudTable
      isLoading={isPending}
      title="Currency"
      columns={[
        { accessorKey: "option", header: 'Name' },
        { accessorKey: "symbol", header: 'Symbol' },
        { accessorKey: "description", header: 'Description' },
        { accessorKey: "is_default", header: 'Default' },
      ]}
      form={[
        { name: "id", type: "hidden" },
        { name: "option", type: "text", label: "Currency" },
        { name: "symbol", type: "text", label: "Symbol" },
        { name: "description", type: "text", label: "Description" },
        { name: "is_default", type: "select", label: "Default", selectOptions: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
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
      tabComponent={tabComponent}
    />
  )
}
export default Currency
