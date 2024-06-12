import CrudTable from "./components/crud-table";
import { useCommodityCodes, useUpdateCommodityCode, useAddCommodityCode, useRemoveCommodityCode } from '@/lib/hooks/commodity-codes';

const CommodityCode = () => {

    const { isLoading, isPending, error, data } = useCommodityCodes()
    const update = useUpdateCommodityCode()
    const add = useAddCommodityCode()
    const remove = useRemoveCommodityCode()

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (<CrudTable
        title="Commodity Code"
        columns={[
            { accessorKey: "name" },
            { accessorKey: "description" }
        ]}
        form={[
            { name: "id", type: "hidden" },
            { name: "name", type: "text", label: "Name" },
            { name: "description", type: "text", label: "Description" }
        ]}
        data={data.map((item: any) => ({ name: item.name, description : item.description , id: item.ID }))}
        onSave={(data) => {
            // configure logic for add or edit, for edit the id will be zero
            const { id, name, description } = data
            if (id) {
                update.mutate({ id, name, description  })
            }else{
                add.mutate({ name , description  })
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
export default CommodityCode