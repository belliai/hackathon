"use client"

import { useState } from "react"
import {
  tailNumberFormSchema,
  TailNumberFormValues,
} from "@/schemas/aircraft/tail-numbers"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import { TailNumber } from "@/types/aircraft/tail-number"
import { useAircraftDefaults } from "@/lib/hooks/aircrafts/aircraft-defaults"
import { useTailNumbers } from "@/lib/hooks/aircrafts/tail-numbers"
import { useTableState } from "@/lib/hooks/tables/table-state"
import { onExport } from "@/lib/utils/export"
import { isVallidUuid } from "@/lib/utils/string-utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table-v2/data-table"

import { tailNumberFormDefaultValues } from "../../constants"
import { aircraftTailNumbersColumns } from "../columns/aircraft-tail-number-columns"
import TailNumberForm from "../forms/aircraft-tail-number-form"
import AircraftTabsList from "./tab-list"

export default function TailNumbersForm({
  isSetting = false,
}: {
  isSetting?: boolean
}) {
  const [currentOpenTailNumberModal, setCurrentOpenTailNumberModal] = useState<
    string | boolean
  >(false) // When the state is a string, it means the modal is in edit mode

  const tableState = useTableState({})

  const {
    data: tailNumbers,
    refetch,
    isLoading,
  } = useTailNumbers({
    ...tableState.pagination,
    ...tableState.sort,
  })

  const tailnumberForm = useForm<TailNumberFormValues>({
    resolver: zodResolver(tailNumberFormSchema),
    defaultValues: tailNumberFormDefaultValues,
  })

  const handleTailNumberRowClick = (tailNumber: TailNumber) => {
    tailnumberForm.reset({
      ...tailNumber,
      body_type_id: isVallidUuid(tailNumber.body_type?.id),
      status_id: isVallidUuid(tailNumber.status?.id),
      gl_code_id: isVallidUuid(tailNumber.gl_code?.id),
    })

    setCurrentOpenTailNumberModal(tailNumber.id)
  }

  return (
    <>
      <DataTable
        tableKey="tail_numbers"
        data={tailNumbers}
        isLoading={isLoading}
        onRowClick={handleTailNumberRowClick}
        onRefetchData={refetch}
        extraRightComponents={
          <Button
            size={"sm"}
            variant={"button-primary"}
            className="p-2 text-sm"
            onClick={() => setCurrentOpenTailNumberModal(true)}
          >
            <PlusIcon className="mr-2 size-4" />
            Create Tail Number
          </Button>
        }
        {...(!isSetting && { extraLeftComponents: AircraftTabsList })}
        {...tableState}
        customCellRenderers={[
          {
            key: "status.name",
            renderer: (data) => (
              <Badge
                variant={
                  data.status.name === "Active" ? "secondary" : "destructive"
                }
              >
                {data.status.name}
              </Badge>
            ),
          },
          {
            key: "aircraft_manufacturer.name",
            renderer: (data, value) => (
              <p>
                {value}{" "}
                {(data.manufacturer.is_deleted || !value) && (
                  <span className="text-destructive">(deleted)</span>
                )}
              </p>
            ),
          },
          {
            key: "aircraft_type.name",
            renderer: (data, value) => (
              <p>
                {value}{" "}
                {(data.aircraft_type.is_deleted || !value) && (
                  <span className="text-destructive">(deleted)</span>
                )}
              </p>
            ),
          },
          {
            key: "aircraft_version.version",
            renderer: (data, value) => (
              <p>
                {value}{" "}
                {(data.version.is_deleted || !value) && (
                  <span className="text-destructive">(deleted)</span>
                )}
              </p>
            ),
          },
        ]}
        // isCanExport={true}
        onExport={() => onExport({ data: [], filename: "TailsNumberData" })}
      />
      <TailNumberForm
        form={tailnumberForm}
        currentOpen={currentOpenTailNumberModal}
        onOpenChange={(open) => {
          if (open) {
            setCurrentOpenTailNumberModal(currentOpenTailNumberModal)
          } else {
            if (typeof currentOpenTailNumberModal === "string") {
              tailnumberForm.reset(tailNumberFormDefaultValues)
            }
            setCurrentOpenTailNumberModal(false)
          }
        }}
      />
    </>
  )
}
