import {
  useAddPaymentMode,
  usePaymentModes,
  useRemovePaymentMode,
  useUpdatePaymentMode,
} from "@/lib/hooks/payment-modes"

import CrudTiledView from "./components/crud-tiled-view"

const PaymentMode = ({ tabComponent }: { tabComponent?: React.ReactNode }) => {
  const { isPending, data } = usePaymentModes()
  const update = useUpdatePaymentMode()
  const add = useAddPaymentMode()
  const remove = useRemovePaymentMode()

  return (
    <CrudTiledView<{ id: string; option: string }>
      identifier="id"
      className="grid h-8 grid-cols-3 gap-4"
      rowRenderer={(item) => <span>{item.option}</span>}
      isLoading={isPending}
      title="Payment Mode"
      form={[
        { name: "id", type: "hidden" },
        { name: "option", type: "text", label: "Payment Mode" },
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
export default PaymentMode
