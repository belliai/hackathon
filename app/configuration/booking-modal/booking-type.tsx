import CrudTable from "./components/crud-table";
import { useBookingTypes, useUpdateBookingType, useAddBookingType, useRemoveBookingType } from '@/lib/hooks/booking-types';

const BookingType = () => {

    const { isLoading, isPending, error, data } = useBookingTypes()
    const update = useUpdateBookingType()
    const add = useAddBookingType()
    const remove = useRemoveBookingType()

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return (<CrudTable
        title="Booking Type"
        columns={[{ accessorKey: "option" }]}
        form={[
            { name: "id", type: "hidden" },
            { name: "option", type: "text", label: "Booking Type" },
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
export default BookingType