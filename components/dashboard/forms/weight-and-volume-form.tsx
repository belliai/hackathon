"use client"

import React, { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Combobox } from "@/components/form/combobox"
import { useFormContext } from "react-hook-form"
import IndividualParcelForm from "./individual-parcel-form"
import HAWBForm from "./hawb-form"
import TotalWeightAndVolumeForm from "./total-weight-and-volume-form"
import { DataTable } from "@/components/data-table/data-table"
import { Button } from "@components/ui/button"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { Trash2Icon } from "lucide-react"

const HAWB_COLUMN = [
  { header: "Booking Type", accessorKey: "booking_type" },
  { header: "AWB", accessorKey: "awb" },
  { header: "Origin", accessorKey: "origin" },
  { header: "Destination", accessorKey: "destination" },
  { header: "Consignor", accessorKey: "consignor", size: 225 },
  { header: "Consignee", accessorKey: "consignee", size: 225 },
  { header: "Weight", accessorKey: "weight" },
  { header: "Volume", accessorKey: "volume" },
]

const INDIVIDUAL_PARCEL_COLUMN = [
  { header: "Description", accessorKey: "description" },
  { header: "Internal ID", accessorKey: "internal_id" },
  { header: "External ID", accessorKey: "external_id" },
  { header: "Commodity Code", accessorKey: "commodity_code" },
  { header: "Weight", accessorKey: "weight" },
  { header: "Volume", accessorKey: "volume" },
]

const WEIGHT_AND_VOLUME_LIST = [
  {
      label: 'Add Individual Parcel',
      value: 'individual-parcel',
  },
  {
    label: 'Add House Airway Bill',
    value: 'hawb',
  },
  {
    label: 'Add Total Weight & Volume',
    value: 'total',
  },
]

const WEIGHT_UNIT_LIST = [
  {
      label: 'Kg',
      value: 'kg',
  },
  {
    label: 'Gram',
    value: 'gram',
  },
  {
    label: 'Pound',
    value: 'pound',
  },
]

const VOLUME_UNIT_LIST = [
  {
      label: 'm',
      value: 'm',
  },
  {
    label: 'cm',
    value: 'cm',
  },
  {
    label: 'km',
    value: 'km',
  },
]

const WeightAndVolumeForm = React.forwardRef<HTMLDivElement, any>(
  (_, ref) => {
    const [formType, setFormType] = useState('create')
    const form = useFormContext()
    const formValues = form.watch()

    const handleAction = (type: string, payload: any) => {
      const tableKey = type === 'hawb' ? 'hawb_table' : 'individual_parcel_table';
      const currentTable = formValues[tableKey];

      if (formType === 'create') {
        form.setValue(tableKey, [...currentTable, payload]);
      } else {
        const updatedTable = currentTable.map((item: any) => item.id === payload.id ? payload : item);
        form.setValue(tableKey, updatedTable);
      }

      setFormType('create');
    }

    const handleDelete = (id: string) => {
      const data = [...formValues.weight_and_volume_type === 'hawb' ? formValues.hawb_table : formValues.individual_parcel_table]
      const formattedData = data.filter(item => item.id !== id)

      form.setValue(formValues.weight_and_volume_type === 'hawb' ? 'hawb_table' : 'individual_parcel_table', formattedData)
    }

    const actionColumn = [
      {
        header: '',
        accessorKey: 'id',
        size: 70,
        cell: ({ row: { original } }: any) => {
          return (
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant={"ghost"}
                onClick={() => {
                  setFormType('edit')
                  if (formValues.weight_and_volume_type === 'hawb') {
                    form.setValue('hawb_form', original)
                  } else {
                    form.setValue('individual_parcel_form', original)
                  }
                }}
                size={"icon"}
              >
                <Pencil1Icon className="size-4" />
              </Button>
              <Button
                type="button"
                variant={"ghost"}
                onClick={() => { handleDelete(original.id) }}
                size={"icon"}
              >
                <Trash2Icon className="size-4" />
              </Button>
            </div>
          )
        }
      }
    ]

    const tableColumn = [
      ...(formValues.weight_and_volume_type === 'individual-parcel' ? INDIVIDUAL_PARCEL_COLUMN : HAWB_COLUMN),
      ...actionColumn
    ]

    useEffect(() => {
      let totalWeight = 0;
      let totalVolume = 0;

      const calculateTotal = (table: any) => {
        totalWeight = table.reduce((acc: number, item: { weight: string }) => acc + parseFloat(item.weight), 0)
        totalVolume = table.reduce((acc: number, item: { volume: string }) => acc + parseFloat(item.volume), 0)
      }

      if (formValues.weight_and_volume_type === 'individual-parcel') {
        calculateTotal(formValues.individual_parcel_table)
      }

      if (formValues.weight_and_volume_type === 'hawb') {
        calculateTotal(formValues.hawb_table)
      }

      if (formValues.weight_and_volume_type === 'total') {
        totalWeight = formValues.total_weight_volume_form.weight
        totalWeight = formValues.total_weight_volume_form.volume
      }

      form.setValue('total_weight', totalWeight)
      form.setValue('total_volume', totalVolume)
    }, [formValues.weight_and_volume_type, formValues.individual_parcel_table, formValues.hawb_table])

    return (
      <>
        <Card className="flex flex-col gap-3 p-4" ref={ref}>
          <div className="flex">
            <Combobox
              name="weight_and_volume_type"
              options={WEIGHT_AND_VOLUME_LIST}
              label="Select Type"
            />
          </div>
          {formValues.weight_and_volume_type === 'individual-parcel' && (
            <IndividualParcelForm weightUnitOptions={WEIGHT_UNIT_LIST} volumeUnitOptions={VOLUME_UNIT_LIST} handleAction={handleAction} setFormType={setFormType} formType={formType} />
          )}
          
          {formValues.weight_and_volume_type === 'hawb' && (
            <HAWBForm weightUnitOptions={WEIGHT_UNIT_LIST} volumeUnitOptions={VOLUME_UNIT_LIST} handleAction={handleAction} setFormType={setFormType} formType={formType} />
          )}

          {formValues.weight_and_volume_type === 'total' && (
            <TotalWeightAndVolumeForm weightUnitOptions={WEIGHT_UNIT_LIST} volumeUnitOptions={VOLUME_UNIT_LIST} />
          )}
        </Card>

        {(formValues.weight_and_volume_type === 'hawb' || formValues.weight_and_volume_type === 'individual-parcel') && (
          <div className="flex flex-col gap-3 mt-4">
            <DataTable
              columns={tableColumn}
              data={formValues.weight_and_volume_type === 'hawb' ? formValues.hawb_table : formValues.individual_parcel_table}
              className="border-none [&_td]:px-3 [&_td]:py-1 [&_td]:text-muted-foreground [&_th]:px-3 [&_th]:py-2 [&_th]:text-foreground max-h-44 xl:max-h-80 overflow-y-auto custom-scrollbar max-w-[814px]"
              hidePagination
              hideToolbar
              manualPagination
            />
            <div className="text-right font-bold text-sm text-muted-foreground">
              Total: {`${formValues.total_weight || 0}`}Kg {`${formValues.total_volume || 0}`}m3
            </div>
          </div>
        )}
      </>
    )
  }
)

WeightAndVolumeForm.displayName = "WeightAndVolumeForm"

export default WeightAndVolumeForm
