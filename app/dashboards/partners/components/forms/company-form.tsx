"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CompanyFormValues } from "@/schemas/partners/company"
import {
  ChevronLeftCircleIcon,
  ChevronRightCircleIcon,
  PlusIcon,
  SaveIcon,
  Trash,
  Trash2Icon,
} from "lucide-react"
import { Path, useFieldArray, UseFormReturn } from "react-hook-form"
import { useStep } from "usehooks-ts"

import { Aircraft } from "@/types/aircraft/aircraft"
import { useAircraftBodyTypes } from "@/lib/hooks/aircrafts/aircraft-body-type"
import { useAircraftStatuses } from "@/lib/hooks/aircrafts/aircraft-statuses"
import {
  useAircrafts,
  useCreateAircraft,
  useDeleteAircraft,
  useUpdateAircraft,
} from "@/lib/hooks/aircrafts/aircrafts"
import { useUnits } from "@/lib/hooks/units/units"
import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InputSwitch from "@/components/form/InputSwitch"

import {
  CompanyFormTabs,
  companyFormTabsList,
} from "../../constants/company-tabs-list"
import {
  addressStatusOptions,
  companyTypeOptions,
  DUMMY_SELECT_OPTIONS,
} from "../../constants/select-options"

type AircraftTypeFormProps = {
  currentOpen: string | boolean
  onOpenChange: (open: boolean) => void
  form: UseFormReturn<CompanyFormValues>
}

const getTabIndexValue = (value: CompanyFormTabs) =>
  (companyFormTabsList.findIndex((item) => item.value === value) + 1).toString()

export default function CompanyForm(props: AircraftTypeFormProps) {
  const { currentOpen, onOpenChange, form } = props

  const fieldArray = useFieldArray({
    control: form.control,
    name: "addresses",
  })

  const [closeWarningOpen, setCloseWarningOpen] = useState(false)

  const [hasDelete, setHasDelete] = useState(false)

  const isEdit = typeof currentOpen === "string"

  const { mutateAsync, isPending: isPendingCreate } = useCreateAircraft()

  const { mutateAsync: updateMutateAsync, isPending: isPendingUpdate } =
    useUpdateAircraft()

  const { data: aircraftBodyTypes } = useAircraftBodyTypes()

  const { data: aircraftStatuses } = useAircraftStatuses()

  const [step, stepControls] = useStep(companyFormTabsList.length)

  const { data: aircrafts } = useAircrafts({
    page: 1,
    page_size: 999,
  })

  const [validatedSteps, setValidatedSteps] = useState<
    Record<CompanyFormTabs, boolean>
  >({
    "general-info": isEdit ? true : false,
    "address-book": isEdit ? true : false,
    "billing-details": isEdit ? true : false,
  })

  const isAllValidated = !Object.values(validatedSteps).some((item) => !item)
  // default values

  // this is to set default values on create

  const { data: unitsW } = useUnits({
    category: "weight",
  })

  const { data: unitsVol } = useUnits({
    category: "volume",
  })

  const { data: unitsLen } = useUnits({
    category: "length",
  })

  const aircraftStatusOptions = aircraftStatuses?.map((status) => ({
    value: String(status.ID),
    label: status.Name,
  }))

  const aircraftBodyTypesOptions = aircraftBodyTypes?.map((bodyType) => ({
    value: String(bodyType.ID),
    label: bodyType.Name,
  }))

  const weightUnitsOptions = unitsW?.map((unit) => ({
    value: String(unit.ID),
    label: `${unit.Name} - ${unit.Symbol}`,
  }))

  const volumeUnitsOptions = unitsVol?.map((unit) => ({
    value: String(unit.ID),
    label: `${unit.Name} - ${unit.Symbol}`,
  }))

  const lengthUnitsOptions = unitsLen?.map((unit) => ({
    value: String(unit.ID),
    label: `${unit.Name} - ${unit.Symbol}`,
  }))

  // this is to reset the form states on modal close
  useEffect(() => {
    if (!currentOpen) {
      form.reset({})
      stepControls.reset()
      setHasDelete(false)
    }
    setValidatedSteps({
      "general-info": isEdit ? true : false,
      "address-book": isEdit ? true : false,
      "billing-details": isEdit ? true : false,
    })
  }, [currentOpen, form, isEdit])

  const { mutateAsync: deleteMutateAsync, isPending: isPendingDelete } =
    useDeleteAircraft()

  async function onDelete(id?: Aircraft["id"]) {
    // waiting for backend
    console.log({ id })
  }

  return (
    <Dialog
      open={!!currentOpen}
      onOpenChange={(_open) => {
        if (!form.formState.isDirty) {
          onOpenChange(false)
          return
        }
        if (!_open) setCloseWarningOpen(true)
      }}
    >
      <DialogContent hideCloseButton className="h-[90dvh] min-w-[1100px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              (data) => console.log({ data }),
              (data) => console.log({ data })
            )}
            className="flex h-full w-full flex-col justify-start gap-6"
          >
            <DialogHeader>
              <DialogTitle>
                {isEdit ? "Edit Company" : "New Company"}
              </DialogTitle>
            </DialogHeader>
            <Tabs
              value={String(step)}
              onValueChange={(val) => stepControls.setStep(Number(val))}
              className="flex h-full flex-row items-start justify-start gap-4 space-y-0"
            >
              <div className="space-y-2">
                <TabsList className="h-fit w-52 flex-col">
                  {companyFormTabsList.map((item, index) => (
                    <TabsTrigger
                      key={item.value}
                      value={(index + 1).toString()}
                      disabled={
                        index === 0
                          ? false
                          : !validatedSteps[companyFormTabsList[index].value]
                      }
                      className="w-full justify-start py-1.5"
                    >
                      <item.icon className="mr-2 size-4" />
                      {item.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              <TabsContent value={getTabIndexValue("general-info")} asChild>
                <Card className="flex w-full flex-grow flex-col divide-y rounded-md">
                  <CardHeader className="w-full">
                    <CardTitle className="font-semibold">
                      General Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid w-full grid-cols-3 gap-2 pt-2">
                    <InputSwitch<CompanyFormValues>
                      label="Company Code"
                      name="company_code"
                      type="text"
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Company Name"
                      name="company_name"
                      type="text"
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Type"
                      name="company_type"
                      type="select"
                      selectOptions={companyTypeOptions}
                    />
                    <InputSwitch<CompanyFormValues>
                      label="IATA Agent Code"
                      name="iata_agent_code"
                      type="text"
                    />
                    <InputSwitch<CompanyFormValues>
                      label="SAP Customer Code"
                      name="sap_customer_code"
                      type="text"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value={getTabIndexValue("address-book")} asChild>
                <Card className="flex h-full w-5 flex-1 flex-col divide-y rounded-md">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="font-semibold">
                      Address Book
                    </CardTitle>
                    <Button
                      className="h-7"
                      type="button"
                      onClick={() => {
                        fieldArray.append({
                          street_address: "",
                          address_2: "",
                          city: "",
                          state: "",
                          postal_code: "",
                          country: "",
                          status: "default_billing",
                        })
                      }}
                      variant={"secondary"}
                      size={"sm"}
                    >
                      <PlusIcon className="mr-2 size-4" />
                      Add Address
                    </Button>
                  </CardHeader>
                  <CardContent className="w-full flex-1 p-0">
                    <Table containerClassName="min-h-full h-5 overflow-y-auto overflow-x-auto">
                      <TableHeader className="border-b">
                        <TableHead className="whitespace-nowrap pl-4 pr-1">
                          Street Address
                        </TableHead>
                        <TableHead className="px-1">Address 2</TableHead>
                        <TableHead className="px-1">City</TableHead>
                        <TableHead className="px-1">State</TableHead>
                        <TableHead className="px-1">Postal Code</TableHead>
                        <TableHead className="px-1">Country</TableHead>
                        <TableHead className="px-1">Status</TableHead>
                        <TableHead className="pl-1 pr-4"></TableHead>
                      </TableHeader>
                      <TableBody className="overflow-y-auto">
                        {fieldArray.fields?.map((field, index) => {
                          return (
                            <TableRow key={field.id}>
                              <TableCell className="pl-4 pr-1 align-top">
                                <InputSwitch<CompanyFormValues>
                                  className="w-52"
                                  name={`addresses.${index}.street_address`}
                                  type="text"
                                />
                              </TableCell>
                              <TableCell className="min-w-24 px-1 align-top">
                                <InputSwitch<CompanyFormValues>
                                  className="w-52"
                                  name={`addresses.${index}.address_2`}
                                  type="text"
                                />
                              </TableCell>
                              <TableCell className="min-w-24 px-1 align-top">
                                <InputSwitch<CompanyFormValues>
                                  className="w-32"
                                  name={`addresses.${index}.city`}
                                  type="text"
                                />
                              </TableCell>
                              <TableCell className="min-w-24 px-1 align-top">
                                <InputSwitch<CompanyFormValues>
                                  className="w-32"
                                  name={`addresses.${index}.state`}
                                  type="text"
                                />
                              </TableCell>
                              <TableCell className="min-w-24 px-1 align-top">
                                <InputSwitch<CompanyFormValues>
                                  className="w-32"
                                  name={`addresses.${index}.postal_code`}
                                  type="text"
                                />
                              </TableCell>
                              <TableCell className="min-w-24 px-1 align-top">
                                <InputSwitch<CompanyFormValues>
                                  className="w-32"
                                  name={`addresses.${index}.country`}
                                  type="text"
                                />
                              </TableCell>
                              <TableCell className="min-w-24 px-1 align-top">
                                <InputSwitch<CompanyFormValues>
                                  className="w-44"
                                  name={`addresses.${index}.status`}
                                  type="select"
                                  selectOptions={addressStatusOptions}
                                />
                              </TableCell>
                              <TableCell className="w-9 pl-1 pr-4 align-top">
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="destructive"
                                  onClick={() => {
                                    fieldArray.remove(index)
                                  }}
                                >
                                  <Trash className="size-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value={getTabIndexValue("billing-details")} asChild>
                <Card className="flex h-full w-full flex-grow flex-col divide-y rounded-md">
                  <CardHeader className="w-full">
                    <CardTitle className="font-semibold">
                      Billing Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="custom-scrollbar grid h-5 w-full flex-grow grid-cols-3 gap-2 overflow-y-scroll pt-2">
                    <InputSwitch<CompanyFormValues>
                      label="Valid From *"
                      name="valid_from"
                      type="date"
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Valid To *"
                      name="valid_to"
                      type="date"
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Participation Type *"
                      name="participation_type"
                      type="select"
                      selectOptions={DUMMY_SELECT_OPTIONS}
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Stock Controller *"
                      name="stock_controller"
                      type="text"
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Stock Controller Code *"
                      name="stock_controller_code"
                      type="text"
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Bill To *"
                      name="bill_to"
                      type="text"
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Billing Controller Code"
                      name="billing_controller_code"
                      type="text"
                    />
                    <InputSwitch<CompanyFormValues>
                      label="GL Code"
                      name="gl_code"
                      type="text"
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Bill Type *"
                      name="bill_type"
                      type="select"
                      selectOptions={DUMMY_SELECT_OPTIONS}
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Credit Controller *"
                      name="credit_controller"
                      type="text"
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Credit Controller Code *"
                      name="credit_controller_code"
                      type="text"
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Commission (%)"
                      name="commission"
                      type="number"
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Incentive Per Kg"
                      name="incentive"
                      type="number"
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Currency Code *"
                      name="currency_id"
                      type="select"
                      selectOptions={DUMMY_SELECT_OPTIONS}
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Agent Type *"
                      name="agent_type"
                      type="select"
                      selectOptions={DUMMY_SELECT_OPTIONS}
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Deals PLI applied To"
                      name="deal_pli"
                      type="text"
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Invoice due days *"
                      name="invoice_due"
                      type="number"
                    />
                    <InputSwitch<CompanyFormValues>
                      label="PP"
                      name="pp"
                      type="text"
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Default Pay Mode"
                      name="default_pay_mode"
                      type="text"
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Is FOC"
                      name="is_foc"
                      type="select"
                      selectOptions={DUMMY_SELECT_OPTIONS}
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Validate Credit"
                      name="validate_credit"
                      type="select"
                      selectOptions={DUMMY_SELECT_OPTIONS}
                    />
                    <InputSwitch<CompanyFormValues>
                      label="IsActive *"
                      name="is_active"
                      type="select"
                      selectOptions={DUMMY_SELECT_OPTIONS}
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Rateline Preference *"
                      name="rateline_preference"
                      type="text"
                    />
                    <InputSwitch<CompanyFormValues>
                      label="IsPOMail"
                      name="is_po_mail"
                      type="select"
                      selectOptions={DUMMY_SELECT_OPTIONS}
                    />
                    <InputSwitch<CompanyFormValues>
                      label="IsBonded"
                      name="is_bonded"
                      type="select"
                      selectOptions={DUMMY_SELECT_OPTIONS}
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Auto Allocate Stock"
                      name="auto_allocate_stock"
                      type="select"
                      selectOptions={DUMMY_SELECT_OPTIONS}
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Auto Generate Invoice"
                      name="autoGenerateInvoice"
                      type="select"
                      selectOptions={DUMMY_SELECT_OPTIONS}
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Participate in CASS"
                      name="participate_in_cass"
                      type="select"
                      selectOptions={DUMMY_SELECT_OPTIONS}
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Billing on Gross.wt"
                      name="billing_on_gross"
                      type="select"
                      selectOptions={DUMMY_SELECT_OPTIONS}
                    />
                    <InputSwitch<CompanyFormValues>
                      label="IsCharter"
                      name="is_charter"
                      type="select"
                      selectOptions={DUMMY_SELECT_OPTIONS}
                    />
                    <InputSwitch<CompanyFormValues>
                      label="IsWalkIn"
                      name="is_walkin"
                      type="select"
                      selectOptions={DUMMY_SELECT_OPTIONS}
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Sr Number Required"
                      name="sr_number_required"
                      type="select"
                      selectOptions={DUMMY_SELECT_OPTIONS}
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Select allow paymode"
                      name="select_allow_paymode"
                      type="select"
                      selectOptions={DUMMY_SELECT_OPTIONS}
                    />
                    <InputSwitch<CompanyFormValues>
                      label="Allowed Payment Mode"
                      name="allowed_payment_id"
                      type="text"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button
                type="button"
                variant={"secondary"}
                onClick={() => setCloseWarningOpen(true)}
              >
                Cancel
              </Button>
              {typeof currentOpen === "string" && (
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button
                      type="button"
                      variant={"secondary"}
                      isLoading={isPendingDelete}
                    >
                      <Trash2Icon className="mr-2 size-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        variant={"destructive"}
                        onClick={() => onDelete(currentOpen)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              <Button
                disabled={!stepControls.canGoToPrevStep}
                type="button"
                variant={"secondary"}
                onClick={() => stepControls.goToPrevStep()}
              >
                <ChevronLeftCircleIcon className="mr-2 size-4" />
                Prev
              </Button>

              <Button
                type="button"
                className={cn(
                  !stepControls.canGoToNextStep && !isAllValidated && "hidden"
                )}
                disabled={!stepControls.canGoToNextStep}
                variant={isAllValidated ? "secondary" : "button-primary"}
                onClick={async () => {
                  const isValidated = await form.trigger(
                    companyFormTabsList[step - 1].validationFields
                  )
                  setValidatedSteps((prev) => ({
                    ...prev,
                    [companyFormTabsList[step].value]: isValidated,
                  }))
                  isValidated && stepControls.goToNextStep()
                }}
              >
                <ChevronRightCircleIcon className="mr-2 size-4" />
                Next
              </Button>

              {(!stepControls.canGoToNextStep || isEdit || isAllValidated) && (
                <Button
                  type="submit"
                  variant={"button-primary"}
                  isLoading={isPendingCreate || isPendingUpdate}
                >
                  <SaveIcon className="mr-2 size-4" />
                  Save
                </Button>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
      <AlertDialog open={closeWarningOpen} onOpenChange={setCloseWarningOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You may have unsaved changes. Continue?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, continue editing</AlertDialogCancel>
            <AlertDialogAction
              variant={"button-primary"}
              onClick={() => onOpenChange(false)}
            >
              Yes, discard changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        open={!currentOpen && hasDelete}
        onOpenChange={(_open) => {
          if (!_open) setHasDelete(false)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You may have deleted an aircraft type or tail number that is
              assigned to an upcoming flight
            </AlertDialogTitle>
            <AlertDialogDescription>
              This flight needs a new aircraft assigned to it
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Ignore</AlertDialogCancel>
            <Link href={"/dashboards/flights"}>
              <AlertDialogAction variant={"button-primary"}>
                Fix This
              </AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  )
}
