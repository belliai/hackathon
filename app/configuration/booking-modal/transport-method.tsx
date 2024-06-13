import CrudTable from "./components/crud-table";
import { useTransportMethods, useUpdateTransportMethod, useAddTransportMethod, useRemoveTransportMethod } from '@/lib/hooks/transport-method';

const TransportMethod = () => {

    const { isLoading, isPending, error, data } = useTransportMethods()
    const update = useUpdateTransportMethod()
    const add = useAddTransportMethod()
    const remove = useRemoveTransportMethod()

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (<CrudTable
        title="Transport Method"
        columns={[{ accessorKey: "option" }]}
        form={[
            { name: "id", type: "hidden" },
            { name: "option", type: "text", label: "Transport Method" },
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
export default TransportMethod