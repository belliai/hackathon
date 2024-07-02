import CrudTable from "./components/crud-table";
import { usePartnerTypes, useUpdatePartnerType, useAddPartnerType, useRemovePartnerType } from '@/lib/hooks/partner-types';

const PartnerType = () => {

    const { isLoading, isPending, error, data } = usePartnerTypes()
    const update = useUpdatePartnerType()
    const add = useAddPartnerType()
    const remove = useRemovePartnerType()

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (<CrudTable
        title="Partner Type"
        columns={[{ accessorKey: "option" }]}
        form={[
            { name: "id", type: "hidden" },
            { name: "option", type: "text", label: "Partner Type" },
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
export default PartnerType