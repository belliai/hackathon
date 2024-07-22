import { useState } from "react"
import { FieldValues } from "react-hook-form"

import {
  useAddBookingType,
  useBookingTypes,
  useRemoveBookingType,
  useUpdateBookingType,
} from "@/lib/hooks/booking-types"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { InputSwitchProps } from "@/components/form/InputSwitch"

import CrudTable, { FormDialog } from "./components/crud-table"
import {
  DataFields,
  DataFieldsItem,
  DataFieldsItemContent,
} from "./components/data-fields"

const BookingType = () => {
  const [selectedEditing, setSelectedEditing] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const { isLoading, isPending, error, data } = useBookingTypes()
  const update = useUpdateBookingType()
  const add = useAddBookingType()
  const remove = useRemoveBookingType()

  if (error) return "An error has occurred: " + error.message

  const form: InputSwitchProps<FieldValues>[] = [
    { name: "id", type: "hidden" },
    { name: "name", type: "text", label: "Acronym" },
    { name: "booking_type", type: "text", label: "Booking Type" },
    { name: "description", type: "text", label: "Description" },
    {
      name: "status",
      type: "select",
      label: "Status",
      selectOptions: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Hidden", value: "hidden" },
      ],
    },
    {
      name: "default",
      type: "select",
      label: "Default",
      selectOptions: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
    },
  ]

  const shouldUseModal = form.filter((f) => f.name !== "id").length > 1

  return (
    <div className="flex flex-col gap-8 py-4">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Booking Type</h1>
          <p className="text-sm text-muted-foreground">
            Manage booking types throughout the system
          </p>
        </div>
        <Separator />
      </div>
      <DataFields>
        {shouldUseModal && (
          <>
            <FormDialog
              form={form}
              open={shouldUseModal && open}
              setOpen={setOpen}
              title="Booking Type"
              onSave={(data) => {
                const { id, option } = data

                console.log(data)

                if (id) {
                  update.mutate({ id, name: option })
                } else {
                  add.mutate({ name: option })
                }
              }}
            />
            <Button
              variant="button-primary"
              size="sm"
              onClick={() => setOpen(true)}
              className="mb-2 ml-auto"
            >
              Add New
            </Button>
          </>
        )}
        {data.map((item) => (
          <DataFieldsItem key={item.id}>
            <DataFieldsItemContent
              selectedEditing={selectedEditing}
              setSelectedEditing={setSelectedEditing}
              data={item}
              form={form}
              title={item.name}
              subtitle={item.booking_type}
              onSave={(data) => {
                if (data.id) {
                  update.mutate(data)
                }
              }}
              onDelete={() => {
                remove.mutate(item.id)
              }}
            />
          </DataFieldsItem>
        ))}
      </DataFields>
    </div>
  )
}
export default BookingType
