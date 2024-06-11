import CrudTable from "./components/crud-table";
import { usePaymentNodes, useUpdatePaymentNode, useAddPaymentNode, useRemovePaymentNode } from '@/lib/hooks/payment-modes';

const PaymentNode = () => {

    const { isLoading, isPending, error, data } = usePaymentNodes()
    const update = useUpdatePaymentNode()
    const add = useAddPaymentNode()
    const remove = useRemovePaymentNode()

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
export default PaymentNode