import { useEffect, useState } from "react"
import { useOrganization } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import { FieldValues, useForm } from "react-hook-form"
import { useLocalStorage } from "usehooks-ts"

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
import { toast } from "@/components/ui/use-toast"
import { InputSwitchProps } from "@/components/form/InputSwitch"

import CrudTable, { FormDialog, FormDropdown } from "./components/crud-table"
import {
  DataFields,
  DataFieldsItem,
  DataFieldsItemContent,
} from "./components/data-fields"

interface GroupDefinition {
  id: string
  name: string
  startIndex: number
  endIndex: number
}

const statusGroupDef: GroupDefinition[] = [
  {
    id: "sales",
    name: "Sales",
    startIndex: 0,
    endIndex: 3,
  },
  {
    id: "operations",
    name: "Before Airport",
    startIndex: 3,
    endIndex: 7,
  },
  {
    id: "during-airport",
    name: "During Airport",
    startIndex: 7,
    endIndex: 14,
  },
  {
    id: "after-airport",
    name: "After Airport",
    startIndex: 14,
    endIndex: 22,
  },
  {
    id: "unassigned",
    name: "Unassigned",
    startIndex: 22,
    endIndex: 9999,
  },
]

function groupData(data: any[], groupsDef: GroupDefinition[]) {
  const statusWithGroup = data.map((status, index) => {
    const group = groupsDef.find(
      (g) => index >= g.startIndex && index < g.endIndex
    )

    return {
      ...status,
      groupId: group?.id || "unassigned",
    }
  })

  return statusWithGroup
}

const Status = ({ tabComponent }: { tabComponent?: React.ReactNode }) => {
  const [savedStatuses, setSavedStatuses] = useLocalStorage<any[]>(
    "statuses_with_group",
    []
  )

  const [savedGroups, setSavedGroups] = useLocalStorage<any[]>(
    "status_groups",
    []
  )

  const { organization } = useOrganization()

  const orgId = organization?.id

  const [open, setOpen] = useState(false)
  const [selectedEditing, setSelectedEditing] = useState<string | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<string[]>([])
  const [selectedAddgroup, setSelectedAddGroup] = useState<string | null>(null)
  const [selectedEditingGroup, setSelectedEditingGroup] = useState<
    string | null
  >(null)
  const [grouppedData, setGrouppedData] = useState<any[]>([])
  const [statusesData, setStatusesData] = useState<any[]>([])
  const [statusGroups, setStatusGroups] =
    useState<GroupDefinition[]>(statusGroupDef)

  const groupStatusOptions = statusGroups?.map((status) => ({
    value: status.id,
    label: status.name,
  }))

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
    const orgSavedGroups = savedGroups.filter((group) => group.orgId === orgId)

    if (orgSavedGroups.length === 0) {
      setSavedGroups((prev) => [
        ...prev,
        {
          orgId,
          groups: statusGroups,
        },
      ])
    } else {
      setStatusGroups(orgSavedGroups[0].groups)
    }
  }, [savedGroups, statusGroups])

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

      const orgSavedStatuses = savedStatuses.find(
        (status) => status.orgId === orgId
      )

      if (!orgSavedStatuses) {
        // Set initial saved statuses
        const statusWithGroup = groupData(data, statusGroupDef)

        // Set default to active
        const activeStatuses = statusWithGroup.map((status: any) => ({
          ...status,
          is_active: true,
        }))

        setSavedStatuses((prev) => [
          ...prev,
          {
            orgId,
            statuses: activeStatuses.map((status) => ({
              ...status,
            })),
          },
        ])
      } else {
        const updatedStatuses = statusesDataWithDescription.map(
          (status: any) => {
            const savedStatus = orgSavedStatuses.statuses.find(
              (saved: any) => saved.ID === status.ID
            )

            if (savedStatus) {
              return {
                ...status,
                groupId: savedStatus.groupId,
                is_active: savedStatus.is_active,
              }
            } else {
              // Set unassigned group for new statuses
              return {
                ...status,
                groupId: "unassigned",
                is_active: true,
              }
            }
          }
        )

        setStatusesData(updatedStatuses)
      }
    }
  }, [apiStatusesData, savedStatuses])

  if (error) return "An error has occurred: " + error.message

  const form: InputSwitchProps<FieldValues>[] = [
    { name: "id", type: "hidden" },
    { name: "name", type: "text", label: "Status" },
    {
      name: "groupId",
      type: "combobox",
      label: "Group",
      selectOptions: groupStatusOptions,
    },
    { name: "description", type: "text", label: "Description" },
  ]

  const shouldUseModal = form.filter((f) => f.name !== "id").length > 1

  return (
    <div className="flex flex-col gap-8 py-4">
      <Form {...statusForm}>
        <div className="flex justify-between">
          {tabComponent && tabComponent}
          <div className={cn("", { "flex justify-end": shouldUseModal })}>
            {shouldUseModal ? (
              <>
                <FormDialog
                  form={form}
                  open={shouldUseModal && open}
                  setOpen={setOpen}
                  title="Status"
                  onSave={(data) => {
                    const { id, name } = data

                    console.log("Save", data)

                    if (id) {
                      update.mutate({ id, name })
                    } else {
                      add.mutate(
                        { name },
                        {
                          onSuccess: (resData) => {
                            console.log("resData: ", resData)

                            if (resData?.id) {
                              // Save the new status to local storage
                              setSavedStatuses((prev) => {
                                const orgStatuses = prev.find(
                                  (status) => status.orgId === orgId
                                )

                                return [
                                  ...prev.filter(
                                    (status) => status.orgId !== orgId
                                  ),
                                  {
                                    orgId,
                                    statuses: [
                                      ...orgStatuses.statuses,
                                      {
                                        ID: resData.id,
                                        name,
                                        groupId: data?.groupId,
                                        is_active: true,
                                      },
                                    ],
                                  },
                                ]
                              })
                            }

                            setOpen(false)
                          },
                        }
                      )
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

        <Accordion
          type="multiple"
          className="flex flex-col gap-2"
          value={selectedGroup}
          onValueChange={setSelectedGroup}
        >
          {statusGroups.map((group) => {
            const statuses: any[] =
              group.id === "unassigned"
                ? statusesData.filter(
                    (status) =>
                      !status.groupId || status.groupId === "unassigned"
                  )
                : statusesData.filter((status) => status.groupId === group.id)

            if (statuses.length === 0) return null

            return (
              <AccordionItem
                key={group.name}
                value={group.name}
                className="rounded-sm border dark:bg-zinc-900/50"
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
                      onSave={(data) => {
                        setSavedGroups((prev) => {
                          const orgGroups = prev.find((g) => g.orgId === orgId)

                          return [
                            ...prev.filter((g) => g.orgId !== orgId),
                            {
                              orgId,
                              groups: orgGroups.groups.map((g: any) => {
                                if (g.id === group.id) {
                                  return { ...g, name: data.name }
                                }
                                return g
                              }),
                            },
                          ]
                        })

                        toast({
                          title: "Success",
                          description: "Group updated successfully",
                        })
                      }}
                      onDelete={() => {
                        // Move all statuses to unassigned group
                        setSavedStatuses((prev) => {
                          const orgStatuses = prev.find(
                            (status) => status.orgId === orgId
                          )

                          return [
                            ...prev.filter((status) => status.orgId !== orgId),
                            {
                              orgId,
                              statuses: orgStatuses.statuses.map(
                                (status: any) => {
                                  if (status.groupId === group.id) {
                                    return {
                                      ...status,
                                      groupId: "unassigned",
                                    }
                                  }
                                  return status
                                }
                              ),
                            },
                          ]
                        })

                        // Remove the group
                        setStatusGroups((prev) =>
                          prev.filter((g) => g.id !== group.id)
                        )

                        toast({
                          title: "Success",
                          description:
                            "Group deleted successfully, statuses moved to Unassigned",
                        })
                      }}
                      actionsClassName="group/trigger:opacity-0 group-hover/trigger:opacity-100 group-hover:opacity-0"
                    />
                  </AccordionTrigger>
                  <AccordionContent className="py-2">
                    {statuses?.map((item: any) => {
                      const { groupId, ...rest } = item

                      return (
                        <DataFieldsItem
                          key={rest.ID}
                          className="rounded-none border-0 bg-transparent pl-9 hover:bg-white/5"
                        >
                          <DataFieldsItemContent
                            onToggleChange={(value) => {
                              setSavedStatuses((prev) => {
                                const orgStatuses = prev.find(
                                  (status) => status.orgId === orgId
                                )

                                return [
                                  ...prev.filter(
                                    (status) => status.orgId !== orgId
                                  ),
                                  {
                                    orgId,
                                    statuses: orgStatuses.statuses.map(
                                      (status: any) => {
                                        if (status.ID === rest.ID) {
                                          return {
                                            ...status,
                                            is_active: value,
                                          }
                                        }
                                        return status
                                      }
                                    ),
                                  },
                                ]
                              })

                              toast({
                                title: "Success",
                                description: "Status updated successfully",
                              })
                            }}
                            selectedEditing={selectedEditing}
                            setSelectedEditing={setSelectedEditing}
                            columnSpans={[4, 8, 0]}
                            data={rest}
                            form={form}
                            title={rest.name}
                            onSave={(data) => {
                              const { id, option } = data

                              const actualId = id || data.ID
                              const payload = option || data.name

                              if (actualId) {
                                update.mutate(
                                  { id: actualId, name: payload },
                                  {
                                    onSuccess: () => {
                                      setSavedStatuses((prev) => {
                                        const orgStatuses = prev.find(
                                          (status) => status.orgId === orgId
                                        )
                                        return [
                                          ...prev.filter(
                                            (status) => status.orgId !== orgId
                                          ),
                                          {
                                            orgId,
                                            statuses: orgStatuses.statuses.map(
                                              (status: any) => {
                                                if (status.ID === actualId) {
                                                  return {
                                                    ...status,
                                                    groupId: data?.groupId,
                                                    name: payload,
                                                  }
                                                }
                                                return status
                                              }
                                            ),
                                          },
                                        ]
                                      })

                                      toast({
                                        title: "Success",
                                        description:
                                          "Status updated successfully",
                                      })
                                    },
                                    onError: (error) => {
                                      console.error("Error: ", error)

                                      toast({
                                        title: "Error",
                                        description:
                                          "An error occurred when updating the status",
                                        variant: "destructive",
                                      })
                                    },
                                  }
                                )
                              } else {
                                add.mutate({ name: option })
                              }
                            }}
                            onDelete={() => {
                              const actualId = rest.id || rest.ID

                              if (actualId) {
                                remove.mutate(
                                  { id: actualId },
                                  {
                                    onSuccess: () => {
                                      setStatusesData((prev) =>
                                        prev.filter(
                                          (status) => status.ID !== actualId
                                        )
                                      )

                                      toast({
                                        title: "Success",
                                        description:
                                          "Status deleted successfully",
                                      })
                                    },
                                    onError: (error) => {
                                      console.error("Error: ", error)

                                      toast({
                                        title: "Error",
                                        description:
                                          "An error occurred when deleting the status",
                                        variant: "destructive",
                                      })
                                    },
                                  }
                                )
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
      </Form>
    </div>
  )
}
export default Status
