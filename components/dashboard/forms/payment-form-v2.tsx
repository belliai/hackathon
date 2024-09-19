"use client"

import React, { useEffect, useState } from "react"
import { Customer } from "@/schemas/customer"
import { useFormContext } from "react-hook-form"

import { useCustomers } from "@/lib/hooks/customers"
import { Card } from "@/components/ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Combobox } from "@/components/form/combobox"
import { usePaymentModes } from "@/lib/hooks/payment-modes"
import { MOCK_PEOPLE_DATA } from "@/app/data-fields/customers/customers-people-crud"
import { Button } from "@/components/ui/button"
import { getDefaults } from "@/schemas/utils"
import { orderSchema } from "@/schemas/order/order"
import { DataTable } from "@components/data-table/data-table"
import { Trash2Icon } from "lucide-react"
import { Pencil1Icon } from "@radix-ui/react-icons"

const TABLE_COLUMN = [
  { header: "Amount", accessorKey: "amount" },
  { header: "Type", accessorKey: "payment_type" },
  { header: "Method", accessorKey: "payment_method" },
  { header: "Employee", accessorKey: "employee" },
  { header: "Transaction ID", accessorKey: "transaction_id" },
]

const PaymentFormV2 = React.forwardRef<HTMLDivElement, any>(
  (_, ref) => {
    const [formType, setFormType] = useState('create')
    const form = useFormContext()
    const initialData = getDefaults(orderSchema)
    const formValues = form.watch()

    const { data: paymentModes} = usePaymentModes()
    const users = MOCK_PEOPLE_DATA

    const paymentModeOptions = paymentModes?.map((payment: any) => ({
      value: payment.ID,
      label: payment.name,
    }));

    const userOptions = users?.map((user: any) => ({
      value: user.id,
      label: user.name,
    }));

    const paymentTypeOptions = [
      {
        value: 'payment',
        label: 'Payment',
      },
      {
        value: 'refund',
        label: 'Refund',
      },
      {
        value: 'adjustment',
        label: 'Adjustment',
      }
    ]

    const handleAction = (payload: any) => {
      if (formType === 'create') {
        form.setValue('payment_table', [...formValues.payment_table, payload]);
      } else {
        const data = [...formValues.payment_table].map(item => item.id === payload.id ? payload : item)
        form.setValue('payment_table', data)
      }

      setFormType('create')
    }

    const createPayload = () => {
      const generateID = `payment-${Math.floor(1000 + Math.random() * 9000)}-${Date.now()}`
      const searchUser = userOptions?.find((item: any) => item.value === formValues.payment_form.employee_id)
      const searchPaymentMethod = paymentModeOptions?.find((item: any) => item.value === formValues.payment_form.payment_method_id)
      const payload = {
        ...formValues.payment_form,
        ...searchUser && { employee: searchUser.label },
        ...searchPaymentMethod && { payment_method: searchPaymentMethod.label },
        ...formType === 'create' && { id: generateID }
      }
      
      handleAction(payload)
      form.setValue('payment_form', initialData.payment_form)
    }

    const handleDelete = (id: string) => {
      const data = [...formValues.payment_table]
      const formattedData = data.filter(item => item.id !== id)

      form.setValue('payment_table', formattedData)
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
                  form.setValue('payment_form', original)
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
      ...TABLE_COLUMN,
      ...actionColumn
    ]

    useEffect(() => {
      const paid = formValues.payment_table.reduce((acc: number, item: { amount: string; payment_type: string }) => {
        const amount = parseFloat(item.amount);
        return item.payment_type === 'refund' ? acc - amount : acc + amount;
      }, 0)

      form.setValue('total_paid', paid)
    }, [formValues.payment_table])

    return (
      <div className="animate-fade-left">
        <Card className="grid grid-cols-1 gap-x-3 gap-y-2 p-4" ref={ref}>
          <div className="grid grid-cols-3 gap-x-3 gap-y-2">
            <Combobox
              name="payment_form.payment_type"
              options={paymentTypeOptions}
              label="Payment Type"
            />

            {formValues.payment_form.payment_type === 'payment' && (
              <Combobox
                name="payment_form.payment_method_id"
                options={paymentModeOptions}
                label="Payment Method"
              />
            )}
            
            <Combobox
              name="payment_form.employee_id"
              options={userOptions}
              label="User Taking Payment"
            />
          </div>

          <div className="grid grid-cols-3 gap-x-3 gap-y-2">
            <FormField
              control={form.control}
              name="payment_form.amount"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="font-semibold" info="Total">Total Amount</FormLabel>
                  <FormControl>
                    <Input {...field} className="dark:border-2 dark:border-foreground/30 h-[40px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="payment_form.transaction_id"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="font-semibold" info="Total">Transaction ID</FormLabel>
                  <FormControl>
                    <Input {...field} className="dark:border-2 dark:border-foreground/30 h-[40px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-x-3 gap-y-2">
            <Combobox
              name="payment_form.send_payment_receipt"
              options={[{ label: 'No', value: 'no' }, { label: 'Yes', value: 'yes' }]}
              label="Send Payment Receipt"
            />
            <FormField
              control={form.control}
              name="payment_form.notes"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="font-semibold" info="Notes">Notes</FormLabel>
                  <FormControl>
                    <Input {...field} className="dark:border-2 dark:border-foreground/30 h-[40px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-3 w-full justify-end">
            {formType === 'edit' && (
              <Button
                type="button"
                variant={"secondary"}
                onClick={() => {
                  form.setValue('payment_form', initialData.payment_form)
                  setFormType('create')
                }}
              >
                Cancel
              </Button>
            )}
            <Button
              type="button"
              variant={"button-primary"}
              onClick={() => { createPayload() }}
            >
              {formType === 'create' ? 'Submit Payment' : 'Edit Payment'}
            </Button>
          </div>
        </Card>
        <div className="flex flex-col gap-3 mt-4">
          <DataTable
            columns={tableColumn}
            data={formValues.payment_table}
            className="border-none [&_td]:px-3 [&_td]:py-1 [&_td]:text-muted-foreground [&_th]:px-3 [&_th]:py-2 [&_th]:text-foreground max-h-44 xl:max-h-80 overflow-y-auto custom-scrollbar max-w-[814px]"
            hidePagination
            hideToolbar
            manualPagination
          />
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 justify-end">
              <div className="text-sm text-right font-bold text-muted-foreground">Total:</div>
              <div className="text-sm text-right text-muted-foreground">${formValues.total || 0}</div>
            </div>
            <div className="flex gap-2 justify-end">
              <div className="text-sm text-right font-bold text-muted-foreground">Paid:</div>
              <div className="text-sm text-right text-muted-foreground">${formValues.total_paid || 0}</div>
            </div>
            <div className="flex gap-2 justify-end">
              <div className="text-sm text-right font-bold text-muted-foreground">Due:</div>
              <div className="text-sm text-right text-muted-foreground">
                {`$${formValues.total && formValues.total_paid ? formValues.total - formValues.total_paid : 
                 formValues.total && !formValues.total_paid ? formValues.total : 
                 !formValues.total && !formValues.total_paid ? 0 : ''}`}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    )
  }
)

PaymentFormV2.displayName = "PaymentFormV2"

export default PaymentFormV2
