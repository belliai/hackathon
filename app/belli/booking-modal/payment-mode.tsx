import CrudTable from "./components/crud-table";
import { usePaymentModes, useUpdatePaymentMode, useAddPaymentMode, useRemovePaymentMode } from '@/lib/hooks/payment-modes';

const PaymentMode = () => {

    const { isLoading, isPending, error, data } = usePaymentModes()
    const update = useUpdatePaymentMode()
    const add = useAddPaymentMode()
    const remove = useRemovePaymentMode()

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (<CrudTable
        title="Payment Mode"
        columns={[{ accessorKey: "option" }]}
        form={[
            { name: "id", type: "hidden" },
            { name: "option", type: "text", label: "Payment Mode" },
        ]}
        data={data.map((item: any) => ({ option: item.name, id: item.ID }))}
        onSave={(data) => {
            // configure logic for add or edit, for edit the id will be zero
            const { id, option } = data
            if (id) {
                update.mutate({ id, name: option })
            }else{
                add.mutate({ name : option })
            }
        }}
        onDelete={(data) => {
            // configure logic for delete
            if(data.id){    
                remove.mutate({ id : data.id })
            }
        }}
    />)
}
export default PaymentMode