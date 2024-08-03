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

const BookingType = ({ tabComponent }: { tabComponent?: React.ReactNode }) => {
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
      <DataFields>
        <div className="flex justify-between">
          {tabComponent && (
            tabComponent
          )}
          {shouldUseModal && (
            <>
              <FormDialog
                form={form}
                open={shouldUseModal && open}
                setOpen={setOpen}
                title="Booking Type"
                onSave={(data) => {
                  const { id, ID, name } = data
                  const actualId = id || ID

                  if (actualId) {
                    update.mutate({ id: actualId, name })
                  } else {
                    add.mutate({ name })
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
        </div>
        
        {data.map((item) => (
          <DataFieldsItem key={item.id}>
            <DataFieldsItemContent
              selectedEditing={selectedEditing}
              setSelectedEditing={setSelectedEditing}
              data={item}
              form={form}
              title={item.name}
              columnSpans={[2, 7, 3]}
              subtitle={item.booking_type}
              onSave={(data) => {
                const { id, ID, ...rest } = data
                const actualId = id || ID

                if (actualId) {
                  update.mutate({ id: actualId, ...rest })
                }
              }}
              onDelete={() => {
                const actualId = item.id || item.ID

                if (actualId) {
                  remove.mutate({ id: actualId })
                }
              }}
            />
          </DataFieldsItem>
        ))}
      </DataFields>
    </div>
  )
}
export default BookingType
