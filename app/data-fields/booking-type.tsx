import {
  useAddBookingType,
  useBookingTypes,
  useRemoveBookingType,
  useUpdateBookingType,
} from "@/lib/hooks/booking-types"

import CrudTable from "./components/crud-table"

const BookingType = () => {
  const { isLoading, isPending, error, data } = useBookingTypes()
  const update = useUpdateBookingType()
  const add = useAddBookingType()
  const remove = useRemoveBookingType()

  if (error) return "An error has occurred: " + error.message

  return (
    <CrudTable
      isLoading={isPending}
      title="Booking Type"
      columns={[
        { accessorKey: "option", header: 'Acronym' },
        { accessorKey: "booking_type", header: 'Booking Type' },
        { accessorKey: "description", header: 'Description' },
        { accessorKey: "status", header: 'Status' },
        { accessorKey: "default", header: 'Default' },
      ]}
      form={[
        { name: "id", type: "hidden" },
        { name: "option", type: "text", label: "Booking Type" },
        { name: "booking_type", type: "text", label: "Booking Type" },
        { name: "description", type: "text", label: "Description" },
        { name: "status", type: "select", label: "Status", selectOptions: [{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }, { label: 'Hidden', value: 'hidden' }] },
        { name: "default", type: "select", label: "Default", selectOptions: [{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }] },
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
export default BookingType
