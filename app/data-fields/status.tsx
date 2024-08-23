import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { FieldValues, useForm } from "react-hook-form"

import {
  useAddStatus,
  useRemoveStatus,
  useStatuses,
  useUpdateStatus,
} from "@/lib/hooks/statuses"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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

interface GroupsDefinition {
  name: string
  startIndex: number
  endIndex: number
}

const statusGroupDef: GroupsDefinition[] = [
  {
    name: "Sales",
    startIndex: 0,
    endIndex: 3,
  },
  {
    name: "Before Airport",
    startIndex: 3,
    endIndex: 7,
  },
  {
    name: "During Airport",
    startIndex: 7,
    endIndex: 14,
  },
  {
    name: "After Airport",
    startIndex: 14,
    endIndex: 22,
  },
  {
    name: "Unassigned",
    startIndex: 22,
    endIndex: 9999,
  },
]

function groupData(data: any[], groupsDef: GroupsDefinition[]) {
  const groupped = groupsDef.map((group) => {
    return {
      name: group.name,
      data: data.slice(group.startIndex, group.endIndex),
    }
  })

  return groupped.filter((g) => g.data.length > 0)
}

const Status = ({ tabComponent }: { tabComponent?: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [selectedEditing, setSelectedEditing] = useState<string | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<string[]>([])
  const [selectedAddgroup, setSelectedAddGroup] = useState<string | null>(null)
  const [selectedEditingGroup, setSelectedEditingGroup] = useState<
    string | null
  >(null)
  const [grouppedData, setGrouppedData] = useState<any[]>([])
  const [statusesData, setStatusesData] = useState<any[]>([])

  const { isLoading, isPending, error, data: apiStatusesData } = useStatuses()
  const update = useUpdateStatus()
  const add = useAddStatus()
  const remove = useRemoveStatus()

  const statusForm = useForm({
    defaultValues: { name: "" },
  })

  const fieldGroupForm = useForm({
    defaultValues: { name: "" },
  })

  const secondForm: InputSwitchProps<{ name: string }>[] = [
    {
      name: "name",
      type: "text",
      label: "Group Name",
    },
  ]

  useEffect(() => {
    if (apiStatusesData) {
      const statusesDataWithDescription = apiStatusesData?.map(
        (status: any) => ({
          ...status,
          description: "Description for " + status.name, // Hardcoded for now, should change once API is ready
        })
      )

      // This is a hacky way to sort the statuses. A better way would be to define order with a separate field
      const data = statusesDataWithDescription?.sort((a: any, b: any) => {
        const numA = parseInt(a.name.split(")")[0])
        const numB = parseInt(b.name.split(")")[0])

        // Check if the values are valid numbers
        const isNumAValid = !isNaN(numA)
        const isNumBValid = !isNaN(numB)

        if (isNumAValid && isNumBValid) {
          // Both are valid numbers, sort them
          return numA - numB
        } else if (isNumAValid) {
          // Only `a` is valid, so it should come before `b`
          return -1
        } else if (isNumBValid) {
          // Only `b` is valid, so it should come before `a`
          return 1
        } else {
          // Neither is a valid number, do not change their order
          return 0
        }
      })

      const newGroupedData = groupData(data, statusGroupDef)

      setStatusesData(data)
      setGrouppedData(newGroupedData)
    }
  }, [apiStatusesData])

  if (error) return "An error has occurred: " + error.message

  const form: InputSwitchProps<FieldValues>[] = [
    { name: "id", type: "hidden" },
    { name: "name", type: "text", label: "Status" },
    { name: "description", type: "text", label: "Description" },
  ]

  console.log("grouppedData", grouppedData)

  const shouldUseModal = form.filter((f) => f.name !== "id").length > 1

  return (
    <div className="flex flex-col gap-8 py-4">
      <Form {...statusForm}>
        <Accordion
          type="multiple"
          className="flex flex-col gap-2"
          value={selectedGroup}
          onValueChange={setSelectedGroup}
        >
          {grouppedData.map((group) => {
            return (
              <AccordionItem
                key={group.name}
                value={group.name}
                className="rounded-sm border bg-zinc-900/50"
              >
                <Form {...fieldGroupForm}>
                  <AccordionTrigger
                    value={group.name}
                    className="group/trigger flex flex-row-reverse justify-between gap-2 px-3 py-1.5"
                  >
                    {/* <Button
                      size="icon"
                      className="h-8 w-8 bg-transparent p-0 text-gray-400 opacity-0 transition-opacity duration-200 hover:bg-transparent group-hover/trigger:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log("Add new field")
                      }}
                    >
                      <Plus size={16} />
                    </Button> */}
                    <DataFieldsItemContent
                      selectedEditing={selectedEditingGroup}
                      setSelectedEditing={setSelectedEditingGroup}
                      columnSpans={[12, 0, 0]}
                      data={{ name: group.name }}
                      title={group.name}
                      form={secondForm}
                      // onSave={(data) => {
                      //   console.log("Save group", data)
                      // }}
                      // onDelete={() => deleteFieldGroup(fieldGroup.id)}
                      actionsClassName="group/trigger:opacity-0 group-hover/trigger:opacity-100 group-hover:opacity-0"
                    />
                  </AccordionTrigger>
                  <AccordionContent className="py-2">
                    {group.data.map((item: any) => {
                      return (
                        <DataFieldsItem
                          key={item.id}
                          className="rounded-none border-0 bg-transparent pl-9 hover:bg-white/5"
                        >
                          <DataFieldsItemContent
                            selectedEditing={selectedEditing}
                            setSelectedEditing={setSelectedEditing}
                            columnSpans={[4, 8, 0]}
                            data={item}
                            form={form}
                            title={item.name}
                            onSave={(data) => {
                              const { id, option } = data

                              const actualId = id || data.ID
                              const payload = option || data.name

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
                      )
                    })}
                    {/* {selectedAddgroup === fieldGroup.id && (
                      <DataFieldsItem className="group/item border-0 bg-transparent pl-9">
                        <DataFieldsItemContent
                          selectedEditing={selectedAddgroup}
                          setSelectedEditing={setSelectedAddGroup}
                          columnSpans={[4, 4, 4]}
                          data={{
                            id: fieldGroup.id,
                            field_name: "",
                            field_type: "",
                          }}
                          actionsClassName="group-hover:opacity-0 opacity-0 group-hover/item:opacity-100"
                          form={[
                            {
                              name: "id",
                              type: "hidden",
                            },
                            {
                              name: "field_name",
                              type: "text",
                              label: "Field Name*",
                            },
                            {
                              name: "field_type",
                              type: "combobox",
                              label: "Field Type",
                              placeholder: "Field Type*",
                              className: "min-w-[200px]",
                              selectOptions: DUMMY_FIELD_TYPES,
                            },
                          ]}
                          title={`New Field to ${fieldGroup.name}`}
                          isNew
                          onSave={(data) => {
                            addCustomField({
                              ...data,
                              field_group: fieldGroup.id,
                            })
                            setSelectedAddGroup(null)
                          }}
                          onDelete={() => {}}
                        />
                      </DataFieldsItem>
                    )} */}
                  </AccordionContent>
                </Form>
              </AccordionItem>
            )
          })}
        </Accordion>
        <DataFields>
          <div className="flex justify-between">
            {tabComponent && tabComponent}
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
          </div>
          {statusesData?.map((item: any) => (
            <DataFieldsItem key={item.id}>
              <DataFieldsItemContent
                selectedEditing={selectedEditing}
                setSelectedEditing={setSelectedEditing}
                columnSpans={[4, 8, 0]}
                data={item}
                form={form}
                title={item.name}
                onSave={(data) => {
                  const { id, option } = data

                  const actualId = id || data.ID
                  const payload = option || data.name

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
}
export default Status
