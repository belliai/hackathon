"use client"

import { useState } from "react"
import { ListIcon, RotateCwIcon, Search, SearchIcon } from "lucide-react"
import { Path, useForm, useFormContext } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DateInput from "@/components/ui/date-input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import PageContainer from "@/components/layout/PageContainer"
import PageHeader from "@/components/layout/PageHeader"

type FilterDataType = { partner_code: string; awb: string }

type DataType = {
  awbOrigin: string
  awbDestination: string
  shipperOldValue: string
  shipperNewValue: string
  consigneeOldValue: string
  consigneeNewValue: string
  notifyPartyOldValue: string
  notifyPartyNewValue: string
  commodityOldValue: string
  commodityNewValue: string
  commDescriptionOldValue: string
  commDescriptionNewValue: string
  customerOldValue: string
  customerNewValue: string
  billToOldValue: string
  billToNewValue: string
  productTypeOldValue: string
  productTypeNewValue: string
  shcOldValue: string
  shcNewValue: string
  payModeOldValue: string
  payModeNewValue: string
  grossWeightOldValue: string
  grossWeightNewValue: string
  volumeOldValue: string
  volumeNewValue: string
  chargeableWeightOldValue: string
  chargeableWeightNewValue: string
  currencyCodeOldValue: string
  currencyCodeNewValue: string
  executedOldDate: string
  executedNewDate: string
  dimensionsOldValue: string
  dimensionsNewValue: string
  dvForCarriageOldValue: string
  dvForCarriageNewValue: string
  eWayBillOldValue: string
  eWayBillNewValue: string
  shprInvNoOldValue: string
  shprInvNoNewValue: string
  //rate information
  rateKgValue: string
  iataFreightValue: string
  iataTaxValue: string
  mktFreightValue: string
  mktTaxValue: string
  ocdcValue: string
  ocdcTaxValue: string
  ocdaValue: string
  ocdaTaxValue: string
  totalTaxValue: string
  awbAmountDueValue: string
  //other information
  handlingInfoValue: string
  remarkValue: string
  consolidatorValue: string
  agentGstinNumberOldValue: string
  agentGstinNumberNewValue: string
  note: string
}

export default function Page() {
  const filterForm = useForm<FilterDataType>()

  const newDocumentForm = useForm<{ document_name: string }>()

  const [dialogOpen, setDialogOpen] = useState(false)

  const form = useForm<DataType>()

  return (
    <PageContainer className="gap-6">
      <PageHeader title="Maintain AWB" />
      <Card className="rounded-md p-4 transition-all">
        <Form {...filterForm}>
          <form className="flex flex-row gap-3">
            <FormField
              control={filterForm.control}
              name={"partner_code"}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-semibold text-muted-foreground">
                    Partner Code
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="min-w-32">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"774"}>{"774"}</SelectItem>
                      <SelectItem value={"732"}>{"732"}</SelectItem>
                      <SelectItem value={"6E"}>{"6E"}</SelectItem>
                      <SelectItem value={"7D"}>{"7D"}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={filterForm.control}
              name={"awb"}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-semibold text-muted-foreground">
                    AWB Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      rightIcon={
                        <SearchIcon className="size-4 text-muted-foreground" />
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-7 inline-flex gap-3">
              <Button
                size="icon"
                type="button"
                className="size-9 bg-button-primary text-white hover:bg-button-primary/80"
              >
                <Search size={16} />
              </Button>
              <Button
                size="icon"
                type="button"
                className="size-9 bg-button-secondary text-white hover:bg-button-secondary/80"
              >
                <RotateCwIcon size={16} />
              </Button>
            </div>
          </form>
        </Form>
      </Card>
      <Form {...form}>
        <form className="space-y-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Consignment Information</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="grid grid-cols-4 gap-3 p-4">
              <InputSwitch name="awbOrigin" label="AWB Origin" type="text" />
              <InputSwitch
                name="awbDestination"
                label="AWB Destination"
                type="text"
              />
              <InputSwitch
                name="shipperOldValue"
                label="Shipper Old Value"
                type="search"
                withDialog
              />
              <InputSwitch
                name="shipperNewValue"
                label="Shipper New Value"
                type="search"
                withDialog
              />
              <InputSwitch
                name="consigneeOldValue"
                label="Consignee Old Value"
                type="search"
                withDialog
              />
              <InputSwitch
                name="consigneeNewValue"
                label="Consignee New Value"
                type="search"
                withDialog
              />
              <InputSwitch
                name="notifyPartyOldValue"
                label="Notify Party Old Value"
                type="text"
              />
              <InputSwitch
                name="notifyPartyNewValue"
                label="Notify Party New Value"
                type="text"
              />
              <InputSwitch
                name="commodityOldValue"
                label="Commodity Old Value"
                type="search"
                withDialog
              />
              <InputSwitch
                name="commodityNewValue"
                label="Commodity New Value"
                type="search"
                withDialog
              />
              <InputSwitch
                name="commDescriptionOldValue"
                label="Comm. Description Old Value"
                type="text"
              />
              <InputSwitch
                name="commDescriptionNewValue"
                label="Comm. Description New Value"
                type="text"
              />
              <InputSwitch
                name="customerOldValue"
                label="Customer Old Value"
                type="search"
                withDialog
              />
              <InputSwitch
                name="customerNewValue"
                label="Customer New Value"
                type="text"
              />
              <InputSwitch
                name="billToOldValue"
                label="Bill To Old Value"
                type="text"
              />
              <InputSwitch
                name="billToNewValue"
                label="Bill To New Value"
                type="text"
              />
              <InputSwitch
                name="productTypeOldValue"
                label="Product Type Old Value"
                type="select"
                selectOptions={[]}
              />
              <InputSwitch
                name="productTypeNewValue"
                label="Product Type New Value"
                type="select"
                selectOptions={[]}
              />
              <InputSwitch
                name="shcOldValue"
                label="SHC Old Value"
                type="text"
              />
              <InputSwitch
                name="shcNewValue"
                label="SHC New Value"
                type="text"
              />
              <InputSwitch
                name="payModeOldValue"
                label="Pay Mode Old Value"
                type="select"
                selectOptions={[]}
              />
              <InputSwitch
                name="payModeNewValue"
                label="Pay Mode New Value"
                type="select"
                selectOptions={[]}
              />
              <InputSwitch
                name="grossWeightOldValue"
                label="Gross Weight Old Value"
                type="text"
              />
              <InputSwitch
                name="grossWeightNewValue"
                label="Gross Weight New Value"
                type="text"
              />
              <InputSwitch
                name="volumeOldValue"
                label="Volume Old Value"
                type="text"
              />
              <InputSwitch
                name="volumeNewValue"
                label="Volume New Value"
                type="text"
              />
              <InputSwitch
                name="chargeableWeightOldValue"
                label="Chargeable Weight Old Value"
                type="text"
              />
              <InputSwitch
                name="chargeableWeightNewValue"
                label="Chargeable Weight New Value"
                type="text"
              />
              <InputSwitch
                name="currencyCodeOldValue"
                label="Currency Code Old Value"
                type="select"
                selectOptions={[]}
              />
              <InputSwitch
                name="currencyCodeNewValue"
                label="Currency Code New Value"
                type="select"
                selectOptions={[]}
              />
              <InputSwitch
                name="executedOldDate"
                label="Executed Old Date"
                type="date"
              />
              <InputSwitch
                name="executedNewDate"
                label="Executed New Date"
                type="date"
              />
              <InputSwitch
                name="dimensionsOldValue"
                label="Dimensions Old Value"
                type="search"
                withDialog
              />
              <InputSwitch
                name="dimensionsNewValue"
                label="Dimensions New Value"
                type="search"
                withDialog
              />
              <InputSwitch
                name="dvForCarriageOldValue"
                label="Dv For Carriage Old Value"
                type="text"
              />
              <InputSwitch
                name="dvForCarriageNewValue"
                label="Dv For Carriage New Value"
                type="text"
              />
              <InputSwitch
                name="eWayBillOldValue"
                label="E Way Bill Old Value"
                type="text"
              />
              <InputSwitch
                name="eWayBillNewValue"
                label="E Way Bill New Value"
                type="text"
              />
              <InputSwitch
                name="shprInvNoOldValue"
                label="Shpr Inv. No. Old Value"
                type="text"
              />
              <InputSwitch
                name="shprInvNoNewValue"
                label="Shpr Inv. No. New Value"
                type="text"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Rate Information</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="grid grid-cols-4 gap-3 p-4">
              <InputSwitch
                name="rateKgValue"
                label="Rate / KG Value"
                type="text"
              />
              <InputSwitch
                name="iataFreightValue"
                label="IATA Freight Value"
                type="text"
              />
              <InputSwitch
                name="iataTaxValue"
                label="IATA Tax Value"
                type="text"
              />
              <InputSwitch
                name="mktFreightValue"
                label="MKT Freight Value"
                type="text"
              />
              <InputSwitch
                name="mktTaxValue"
                label="MKT Tax Value"
                type="text"
              />
              <InputSwitch
                name="ocdcValue"
                label="OCDC Value"
                type="text"
                withDialog
              />
              <InputSwitch
                name="ocdcTaxValue"
                label="OCDC Tax Value"
                type="text"
              />
              <InputSwitch
                name="ocdaValue"
                label="OCDA Value"
                type="text"
                withDialog
              />
              <InputSwitch
                name="ocdaTaxValue"
                label="OCDA Tax Value"
                type="text"
              />
              <InputSwitch
                name="totalTaxValue"
                label="Total Tax Value"
                type="text"
              />
              <InputSwitch
                name="awbAmountDueValue"
                label="AWB Amount Due Value"
                type="text"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Other Information</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="grid grid-cols-4 gap-3 p-4">
              <InputSwitch
                name="handlingInfoValue"
                label="Rate / KG Value"
                type="text"
              />
              <InputSwitch
                name="remarkValue"
                label="IATA Freight Value"
                type="text"
                withDialog
              />
              <InputSwitch
                name="consolidatorValue"
                label="Consolidator Value"
                type="select"
                selectOptions={[]}
              />
              <InputSwitch
                name="agentGstinNumberOldValue"
                label="Agent GSTIN No. Old Value"
                type="text"
              />
              <InputSwitch name="note" label="Note" type="text" />
            </CardContent>
          </Card>
          <div className="flex flex-row items-center justify-end gap-2">
            <Button type="submit" variant={"button-primary"}>
              Save
            </Button>
            <Button type="button" variant={"button-secondary"}>
              Check
            </Button>
            <Button type="button" variant={"button-secondary"}>
              Clear
            </Button>
            <Button type="button" variant={"destructive"}>
              Delete
            </Button>
            <Button type="button" variant={"destructive"}>
              Un-Return To Shipper
            </Button>
          </div>
        </form>
      </Form>
    </PageContainer>
  )
}

function InputSwitch(props: {
  type: "select" | "date" | "search" | "text"
  name: Path<DataType>
  label: string
  selectOptions?: { value: string; label: string }[]
  withDialog?: boolean
}) {
  const form = useFormContext<DataType>()
  const input = () => {
    switch (props.type) {
      case "select":
        return (
          <FormField
            key={props.name}
            control={form.control}
            name={props.name}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs font-semibold text-muted-foreground">
                  {props.label}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {props.selectOptions?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      case "date":
        return (
          <FormField
            key={props.name}
            control={form.control}
            name={props.name}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs font-semibold text-muted-foreground">
                  {props.label}
                </FormLabel>
                <DateInput {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        )
      case "search":
        return (
          <FormField
            key={props.name}
            control={form.control}
            name={props.name}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs font-semibold text-muted-foreground">
                  {props.label}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    rightIcon={
                      <SearchIcon className="size-4 min-w-10 text-muted-foreground" />
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      default:
        return (
          <FormField
            key={props.name}
            control={form.control}
            name={props.name}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-xs font-semibold text-muted-foreground">
                  {props.label}
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )
    }
  }
  if (props.withDialog) {
    return (
      <div className="flex flex-row gap-2">
        {input()}
        <Button
          type="button"
          variant={"ghost"}
          size={"icon"}
          className="mt-7 h-9 w-9"
        >
          <ListIcon className="size-4" />
        </Button>
      </div>
    )
  }
  return input()
}
