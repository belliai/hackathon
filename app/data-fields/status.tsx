import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

import {
  useAddStatus,
  useRemoveStatus,
  useStatuses,
  useUpdateStatus,
} from "@/lib/hooks/statuses"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { InputSwitchProps } from "@/components/form/InputSwitch"

import CrudTable, { FormDialog, FormDropdown } from "./components/crud-table"
import {
  DataFields,
  DataFieldsItem,
  DataFieldsItemContent,
} from "./components/data-fields"

const Status = () => {
  const [open, setOpen] = useState(false)
  const [selectedEditing, setSelectedEditing] = useState<string | null>(null)

  const { isLoading, isPending, error, data } = useStatuses()
  const update = useUpdateStatus()
  const add = useAddStatus()
  const remove = useRemoveStatus()

  const statusForm = useForm({
    defaultValues: { name: "" },
  })

  if (error) return "An error has occurred: " + error.message

  const form: InputSwitchProps<FieldValues>[] = [
    { name: "id", type: "hidden" },
    { name: "name", type: "text", label: "Status" },
  ]

  const shouldUseModal = form.filter((f) => f.name !== "id").length > 1

  return (
    <div className="flex flex-col gap-8 py-4">
      <Form {...statusForm}>
        <DataFields>
          <div className={cn("mb-2", { "flex justify-end": shouldUseModal })}>
            {shouldUseModal ? (
              <>
                <FormDialog
                  form={form}
                  open={shouldUseModal && open}
                  setOpen={setOpen}
                  title="Status"
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
                >
                  Add New
                </Button>
              </>
            ) : (
              <FormDropdown
                form={form}
                onSave={(data) => {
                  const { id, name } = data
                  if (id) {
                    update.mutate({ id, name })
                  } else {
                    add.mutate({ name })
                  }
                }}
              />
            )}
          </div>
          {data?.map((item: any) => (
            <DataFieldsItem key={item.id}>
              <DataFieldsItemContent
                selectedEditing={selectedEditing}
                setSelectedEditing={setSelectedEditing}
                data={item}
                form={form}
                title={item.name}
                onSave={(data) => {
                  const { id, option } = data

                  const actualId = id || data.ID
                  const payload = option || data.name

                  console.log(data, actualId)

                  if (actualId) {
                    update.mutate({ id: actualId, name: payload })
                  } else {
                    add.mutate({ name: option })
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
      </Form>
    </div>
  )

  // return (
  //   <CrudTable
  //     isLoading={isLoading}
  //     title="Status"
  //     columns={[{ accessorKey: "option", header: 'Name' }]}
  //     form={[
  //       { name: "id", type: "hidden" },
  //       { name: "option", type: "text", label: "Status" },
  //     ]}
  //     data={data?.map((item: any) => ({ option: item.name, id: item.ID }))}
  //     onSave={(data) => {
  //       // configure logic for add or edit, for edit the id will be zero
  //       const { id, option } = data
  //       if (id) {
  //         update.mutate({ id, name: option })
  //       } else {
  //         add.mutate({ name: option })
  //       }
  //     }}
  //     onDelete={(data) => {
  //       // configure logic for delete
  //       if (data.id) {
  //         remove.mutate({ id: data.id })
  //       }
  //     }}
  //   />
  // )
}
export default Status
