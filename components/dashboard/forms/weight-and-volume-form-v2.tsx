"use client"

import React, { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Combobox } from "@/components/form/combobox"
import { useFormContext } from "react-hook-form"
import IndividualParcelForm from "./individual-parcel-form"
import HAWBForm from "./hawb-form"
import TotalWeightAndVolumeFormV2 from "./total-weight-and-volume-form"
import { DataTable } from "@/components/data-table/data-table"
import { Button } from "@components/ui/button"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { Trash2Icon } from "lucide-react"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog"
import { useCommodityCodes } from "@/lib/hooks/commodity-codes"
import { useLocations } from "@/lib/hooks/locations"
import { getDefaults } from "@/schemas/utils"
import { orderSchema } from "@/schemas/order/order"
import { useBookingTypes } from "@/lib/hooks/booking-types"
import { useCustomers } from "@/lib/hooks/customers"

const QTY_COLUMN = [
  { header: "Qty", accessorKey: "qty" },
]

const BASE_COLUMN = [
  { header: "From", accessorKey: "origin" },
  { header: "To", accessorKey: "destination" },
  { header: "Width", accessorKey: "width" },
  { header: "Length", accessorKey: "length" },
  { header: "Height", accessorKey: "height" },
  { header: "CBM (Subtotal)", accessorKey: "subtotal" },
  { header: "Skid", accessorKey: "skid" },
  { header: "CBM (Total)", accessorKey: "total" },
]

const HAWB_COLUMN = [
  ...QTY_COLUMN,
  { header: "House AWB", accessorKey: "row_id" },
  ...BASE_COLUMN,
]

const PARCEL_COLUMN = [
  ...QTY_COLUMN,
  { header: "Parcel ID", accessorKey: "row_id" },
  ...BASE_COLUMN,
]

const ALL_COLUMN = [
  ...QTY_COLUMN,
  { header: "Type", accessorKey: "type" },
  { header: "ID", accessorKey: "row_id" },
  ...BASE_COLUMN,
]

const WEIGHT_AND_VOLUME_LIST = [
  {
    label: 'Parcels',
    buttonLabel: 'Add Parcel',
    value: 'parcels',
  },
  {
    label: 'House Airway Bills',
    buttonLabel: 'Add House Airway Bill',
    value: 'hawb',
  },
  {
    label: 'Show All',
    buttonLabel: '',
    value: 'all',
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

const WeightAndVolumeFormV2 = React.forwardRef<HTMLDivElement, any>(
  (_, ref) => {
    const { data: commodityCodes } = useCommodityCodes()
    const { data: bookingTypes } = useBookingTypes()
    const { data: locations } = useLocations()
    const { data: customers } = useCustomers()
    const [formType, setFormType] = useState('create')
    const [isOpenForm, setIsOpenForm] = useState(false)
    const [selectedDataType, setSelectedDataType] = useState('hawb')
    const form = useFormContext()
    const formValues = form.watch()
    const initialData = getDefaults(orderSchema)

    const commodityCodeOptions = commodityCodes?.map((code: any) => ({
      value: code.ID,
      label: `${code.name}: ${code.description}`,
    }));

    const locationsOptions = locations?.map((location: any) => ({
      label: location.name,
      value: location.ID,
    }))

    const bookingTypeOptions = bookingTypes?.map((code: any) => ({
      value: code.ID,
      label: `${code.name}`,
      name: code.booking_type,
      description: code.description,
    }));

    const customerOptions = customers?.data.map((customer: any) => ({
      value: customer.ID,
      label: customer.name,
    }))

    const handleAction = (payload: any) => {
      const tableKey = 'weight_and_volume_table';
      const currentTable = formValues[tableKey];

      if (formType === 'create') {
        form.setValue(tableKey, [...currentTable, payload]);
      } else {
        const updatedTable = currentTable.map((item: any) => item.id === payload.id ? payload : item);
        form.setValue(tableKey, updatedTable);
      }

      setFormType('create');
      setIsOpenForm(false);
    }

    const handleDelete = (id: string) => {
      const data = [...formValues.weight_and_volume_table]
      const formattedData = data.filter(item => item.id !== id)

      form.setValue('weight_and_volume_table', formattedData)
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
                  if (formValues.weight_and_volume_type === 'hawb' || (formValues.weight_and_volume_type === 'all' && original.type.toLowerCase() === 'hawb')) {
                    form.setValue('hawb_form', original)
                  } else {
                    form.setValue('individual_parcel_form', original)
                  }
                  setSelectedDataType(original?.type.toLowerCase())
                  setIsOpenForm(true)
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

    const getColumns = () => {
      let columns: any[] = []
      if (formValues.weight_and_volume_type === 'parcels') {
        columns = PARCEL_COLUMN
      }

      if (formValues.weight_and_volume_type === 'hawb') {
        columns = HAWB_COLUMN
      }
      
      if (formValues.weight_and_volume_type === 'all') {
        columns = ALL_COLUMN
      }

      return [...columns, ...actionColumn]
    }

    const generateParcelPayload = () => {
      const generateID = `individual-${Math.floor(1000 + Math.random() * 9000)}-${Date.now()}`
      const searchCommodity = commodityCodeOptions?.find((item: any) => item.value === formValues.individual_parcel_form.commodity_code_id)
      const searchOrigin = locationsOptions?.find((item: { value: string }) => item.value === formValues.individual_parcel_form.origin_id)
      const searchDestination = locationsOptions?.find((item: { value: string }) => item.value === formValues.individual_parcel_form.destination_id)
      const total = parseFloat(formValues.individual_parcel_form.subtotal || 0) + parseFloat(formValues.individual_parcel_form.skid || 0)
      const payload = {
        ...formValues.individual_parcel_form,
        row_id: formValues.individual_parcel_form.internal_id,
        ...searchCommodity && { commodity_code: searchCommodity.label },
        ...searchOrigin && { origin: searchOrigin.label },
        ...searchDestination && { destination: searchDestination.label },
        ...formType === 'create' && { id: generateID },
        total: total.toFixed(2),
        type: 'Parcels'
      }

      return payload;
    }

    const generateHAWBPayload = () => {
      const generateID = `hawb-${Math.floor(1000 + Math.random() * 9000)}-${Date.now()}`
      const searchBookingType = bookingTypeOptions?.find((item: { value: string }) => item.value === formValues.hawb_form.booking_type_id)
      const searchOrigin = locationsOptions?.find((item: { value: string }) => item.value === formValues.hawb_form.origin_id)
      const searchDestination = locationsOptions?.find((item: { value: string }) => item.value === formValues.hawb_form.destination_id)
      const searchConsignor = customerOptions?.find((item: { value: string }) => item.value === formValues.hawb_form.consignor_id)
      const searchConsignee = customerOptions?.find((item: { value: string }) => item.value === formValues.hawb_form.consignee_id)
      const total = parseFloat(formValues.hawb_form.subtotal || 0) + parseFloat(formValues.hawb_form.skid || 0);
      const payload = {
        ...formValues.hawb_form,
        ...searchBookingType && { booking_type: searchBookingType.label },
        ...searchOrigin && { origin: searchOrigin.label },
        ...searchDestination && { destination: searchDestination.label },
        ...searchConsignor && { consignor: searchConsignor.label },
        ...searchConsignee && { consignee: searchConsignee.label },
        ...formType === 'create' && { id: generateID },
        total: total.toFixed(2),
        type: 'HAWB',
        row_id: formValues.hawb_form.awb,
      }
  
      return payload;
    }

    const onSubmitForm = () => {
      const payload = formValues.weight_and_volume_type === 'parcels' || (formValues.weight_and_volume_type === 'all' && selectedDataType === 'parcels') ? generateParcelPayload() : generateHAWBPayload();

      handleAction(payload)
      form.setValue('individual_parcel_form', initialData.individual_parcel_form)
      form.setValue('hawb_form', initialData.hawb_form)
    }

    useEffect(() => {
      const calculateTotal = (table: any[]) => {
        const totals = table.reduce((acc, item) => ({
          weight: acc.weight + parseFloat(item.weight || '0'),
          volume: acc.volume + parseFloat(item.volume || '0')
        }), { weight: 0, volume: 0 });

        return {
          totalWeight: totals.weight,
          totalVolume: totals.volume,
          chargeableWeight: Math.max(totals.weight, totals.volume)
        };
      }

      const filteredData = formValues.weight_and_volume_type === 'all' 
        ? formValues.weight_and_volume_table
        : formValues.weight_and_volume_table.filter((item: { type: string }) => item.type.toLowerCase() === formValues.weight_and_volume_type);

      const { totalWeight, totalVolume, chargeableWeight } = calculateTotal(filteredData);

      form.setValue('total_weight', totalWeight);
      form.setValue('total_volume', totalVolume);
      form.setValue('ch_weight_kg', chargeableWeight);
    }, [formValues.weight_and_volume_type, formValues.weight_and_volume_table])

    useEffect(() => {
      form.setValue('weight_and_volume_type', 'parcels')
    }, [])

    const selectedType = WEIGHT_AND_VOLUME_LIST.find(item => item.value === formValues.weight_and_volume_type)

    const filteredData = formValues.weight_and_volume_table.filter((item: { type: string }) => item.type.toLowerCase() === selectedType?.value)
    const formTitle = formValues.weight_and_volume_type === 'all' ? 'Data' : selectedType?.label;

    return (
      <div className="animate-fade-left">
        <Card className="flex flex-col gap-3 p-4 h-fit" ref={ref}>
          <div className="grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="total_weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel info="hellow world!, this is info">
                    Weight
                  </FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={formValues.total_weight}
                      {...field}
                      className="border-2 border-foreground/30 h-[40px]"
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="total_volume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel info="hellow world!, this is info">
                    Volume
                  </FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={formValues.total_volume}
                      {...field}
                      className="border-2 border-foreground/30 h-[40px]"
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ch_weight_kg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel info="hellow world!, this is info">
                    Chargeable Weight
                  </FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={formValues.ch_weight_kg}
                      {...field}
                      className="border-2 border-foreground/30 h-[40px]"
                      readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>

        <div className="flex flex-col gap-3 mt-4">
          <div className="flex gap-3 justify-between">
            <div className="flex gap-3">
              {WEIGHT_AND_VOLUME_LIST.map(navItem => (
                <Button
                  type="button"
                  variant={"ghost"}
                  onClick={() => { form.setValue('weight_and_volume_type', navItem.value) }}
                  key={navItem.value}
                  className={`h-8 border border-secondary ${formValues.weight_and_volume_type === navItem.value ? 'border-muted-foreground/40 bg-secondary' : ''}`}
                >
                  {navItem.label}
                </Button>
              ))}
            </div>
            {formValues.weight_and_volume_type !== 'all' && (
              <Button
                type="button"
                variant={"button-primary"}
                onClick={() => {
                  setIsOpenForm(true);
                  form.setValue('hawb_form', initialData.hawb_form)
                  form.setValue('individual_parcel_form', initialData.individual_parcel_form)
                }}
                className="h-8"
              >
                {selectedType?.buttonLabel || 'Add'}
              </Button>
            )}
          </div>

          <DataTable
            columns={getColumns()}
            data={formValues.weight_and_volume_type === 'all' ? formValues.weight_and_volume_table : filteredData}
            className="border-none [&_td]:px-3 [&_td]:py-1 [&_td]:text-muted-foreground [&_th]:px-3 [&_th]:py-2 [&_th]:text-foreground max-h-44 xl:max-h-80 overflow-y-auto custom-scrollbar max-w-[814px]"
            hidePagination
            hideToolbar
            manualPagination
          />
        </div>
        <AlertDialog open={isOpenForm} onOpenChange={setIsOpenForm}>
          <AlertDialogContent className="max-w-3xl">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {formType === 'create' ? `Add ${formTitle}` : `Edit ${formTitle}`}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {(formValues.weight_and_volume_type === 'hawb' || (formValues.weight_and_volume_type === 'all' && selectedDataType === 'hawb')) && (
                  <HAWBForm weightUnitOptions={WEIGHT_UNIT_LIST} volumeUnitOptions={VOLUME_UNIT_LIST} handleAction={handleAction} setFormType={setFormType} formType={formType} />
                )}

                {(formValues.weight_and_volume_type === 'parcels' || (formValues.weight_and_volume_type === 'all' && selectedDataType === 'parcels')) && (
                  <IndividualParcelForm weightUnitOptions={WEIGHT_UNIT_LIST} volumeUnitOptions={VOLUME_UNIT_LIST} handleAction={handleAction} setFormType={setFormType} formType={formType} />
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant={"button-primary"}
                onClick={onSubmitForm}
              >
                Save
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    )
  }
)

WeightAndVolumeFormV2.displayName = "WeightAndVolumeFormV2"

export default WeightAndVolumeFormV2
