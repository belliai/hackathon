"use client"

import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react"
import { Customer } from "@/schemas/customer"
import { Order, orderSchema } from "@/schemas/order/order"
import { getDefaults } from "@/schemas/utils"
import { ArrowsPointingOutIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import {
  ArrowLeftIcon,
  FileTextIcon,
  GlobeIcon,
  HistoryIcon,
  KeyIcon,
  PackageIcon,
  PackageOpenIcon,
  PlaneIcon,
  ScrollTextIcon,
  ShieldCheckIcon,
  SquarePenIcon,
  UserIcon,
} from "lucide-react"
import { useForm } from "react-hook-form"
import { useStep } from "usehooks-ts"

import { useUpdateCustomer } from "@/lib/hooks/customers"
import { useAddOrder, useUpdateOrder } from "@/lib/hooks/orders"
import { mapJsonToSchema, mapSchemaToJson } from "@/lib/mapper/order"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/vertical-tabs"
import { useBookingContext } from "@/components/dashboard/BookingContext"

import ActivityLog from "./activity-log"
import BalanceCard from "./balance-card"
import DimensionsCard from "./dimensions-card"
import ConsignmentDetailsForm from "./forms/consignment-details.form"
import CreateBookingForm from "./forms/create-booking-form"
import ProcessRatesForm from "./forms/process-rates-form"
import ShipperDetailsForm from "./forms/shipper-details-form"
import OrderSummaryCard from "./order-summary-card"
import { CheckIcon } from "@radix-ui/react-icons"

type NewOrderModalProps = PropsWithChildren & {
  onOpenChange?: (open: boolean) => void
  open?: boolean
  mode?: "edit" | "create"
}

type ShipmentType = "axb" | "hawb" | "cn-38" | "cbv"

const schemas = orderSchema.omit({ activity_logs: true })
const initialValues = getDefaults(schemas)

const steps = [
  {
    label: "Booking Type",
    icon: SquarePenIcon,
    descriptionContent: (
      <div className="space-y-4">
        <div className="flex w-fit flex-row items-start justify-start gap-4">
          <div>
            <FileTextIcon className="h-4 w-4" />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold leading-none">
              What type of data will i need to submit
            </h3>
            <p className="text-xs text-muted-foreground">
              An air waybill or AWB is a document that accompanies goods shipped
              by an international courier, which allow for tracking.
            </p>
          </div>
        </div>
        <div className="flex w-fit flex-row items-start justify-start gap-4">
          <div>
            <ShieldCheckIcon className="h-4 w-4" />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold leading-none">Is my data safe?</h3>
            <p className="text-xs text-muted-foreground">
              An air waybill or AWB is a document that accompanies goods shipped
              by an international courier, which allow for tracking.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: "Consignment Details",
    icon: PlaneIcon,
    descriptionContent: (
      <p className="text-xs text-muted-foreground">
        An air waybill or AWB is a document that accompanies goods shipped by an
        international courier, which allow for tracking.
      </p>
    ),
  },
  {
    label: "Shipper Details",
    icon: UserIcon,
    descriptionContent: (
      <p className="text-xs text-muted-foreground">
        An air waybill or AWB is a document that accompanies goods shipped by an
        international courier, which allow for tracking.
      </p>
    ),
  },
  {
    label: "Process Rates",
    icon: PackageIcon,
    descriptionContent: (
      <p className="text-xs text-muted-foreground">
        An air waybill or AWB is a document that accompanies goods shipped by an
        international courier, which allow for tracking.
      </p>
    ),
  },
]

export default function NewOrderModal(props: NewOrderModalProps) {
  const { children, onOpenChange, mode = "create" } = props
  const { selectedBooking, setSelectedBooking } = useBookingContext()
  const [open, setOpen] = useState(props.open ?? false)
  const [isFullScreen, setFullScreen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [selectedShipmentType, setSelectedShipmentType] =
    useState<ShipmentType | null>(null)

  const add = useAddOrder()
  const update = useUpdateOrder()
  const updateCustomer = useUpdateCustomer()

  useEffect(() => {
    onOpenChange && onOpenChange(open)
  }, [open, onOpenChange])

  const defaultValues = useMemo(
    () => ({
      ...initialValues,
      ...(selectedBooking && { ...mapJsonToSchema(selectedBooking) }),
    }),
    [selectedBooking]
  )

  useEffect(() => {
    setOpen(props.open ?? false)
    if (!props.open && mode === "edit") {
      setSelectedBooking(initialValues)
    }
  }, [props.open])

  useEffect(() => {}, [selectedBooking])

  const form = useForm<Order>({
    // TODO : implement later
    resolver: zodResolver(schemas),
    defaultValues,
  })

  // Watch the entire form for changes
  const formValues = form.watch()

  useEffect(() => {
    if (selectedBooking) {
      form.reset(defaultValues)
    }
  }, [selectedBooking, defaultValues, form])

  const toggleFullScreen = () => {
    setFullScreen((prev) => !prev)
  }

  const onSubmit = async (data: Order) => {
    const { bill_to_name, bill_to_old_name, bill_to_id } = data

    try {
      const mappedShipperDetails = data.shipper_details?.map((item) => ({
        ...item,
        date: item?.date ? format(item.date, "yyyy-MM-dd") : "",
      }))
      data.shipper_details = mappedShipperDetails
      setIsLoading(true)

      const dataMapped = mapSchemaToJson(data)
      //update bill to name if the value changes
      if (bill_to_id && bill_to_name && bill_to_old_name !== bill_to_name) {
        await updateCustomer.mutateAsync({ id: bill_to_id, name: bill_to_name })
      }

      try {
        if (!data.ID) {
          await add.mutateAsync(dataMapped as Order)
          toast({
            title: "Success!",
            description: "Your order has been created",
          })
        } else {
          await update.mutateAsync({ ...(dataMapped as Order), id: data.ID })
          toast({
            title: "Success!",
            description: "Your order has been updated",
          })
        }
        setOpen(false)
        form.reset()
      } catch (e) {
        toast({
          title: "Failed!",
          variant: "destructive",
          description: "Your request failed",
        })
      }
    } catch (error) {
      console.error({ error })
    } finally {
      setIsLoading(false)
    }
  }

  const [currentStep, helpers] = useStep(steps.length)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        hideCloseButton
        className={cn(
          "p-0",
          isFullScreen
            ? "h-screen w-screen max-w-none"
            : "top-8 max-h-[90dvh] max-w-6xl translate-y-0"
        )}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs
              value={String(currentStep)}
              className="flex h-full w-full flex-row"
            >
              <div className="flex w-[30%] flex-col justify-between bg-background p-4">
                <div className="flex h-full flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold">New Shipment</h3>
                    <p className="text-sm text-muted-foreground">
                      Use this form to create a new shipment
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="p-2 bg-zinc-950 flex flex-col rounded-md gap-1">
                      {steps.map((step, index) => {
                        const isLast = index + 1 === steps.length
                        const isActive = index+1 === currentStep
                        const isComplete = index + 1 < currentStep
                        const subMenu = index === 0 && selectedShipmentType === 'axb' ? (
                          <div
                            className={`flex gap-2 items-center p-2 pl-8`}
                          >
                            Booking Details
                            {isComplete && (
                              <CheckIcon className="h-4 w-4" />
                            )}
                          </div>
                        ) : null;

                        return (
                          <div className={`flex flex-col rounded-sm text-sm ${isActive ? "bg-accent" : ""}`} key={index}>
                            <div className={`flex gap-2 items-center p-2 px-3 `} >
                              <step.icon className={`w-4-4 h-4 ${isActive ? "text-[#FB5727]" : "text-white"}`} />
                              {step.label}
                              {isComplete && (
                                <CheckIcon className="h-4 w-4" />
                              )}
                            </div>
                            {subMenu}
                          </div>
                        )
                      })}
                    </div>
                    <div className="h-fit">
                      {
                        steps.find((step, index) => index + 1 === currentStep)
                          ?.descriptionContent
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-card p-4">
                <TabsContent value={"1"} className="mt-0 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold">Create New Shipment</h3>
                    <p className="text-sm text-muted-foreground">
                      What kind of shipment is it?
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Button
                      onClick={() => setSelectedShipmentType("axb")}
                      variant={"ghost"}
                      type="button"
                      className="h-fit w-full whitespace-normal p-0 text-start"
                    >
                      <Card className="cursor-pointer transition-colors hover:border-button-primary/30 hover:bg-muted/10">
                        <CardHeader className="flex flex-row gap-4 space-y-0">
                          <FileTextIcon className="size-5" />
                          <div className="flex-1 space-y-2">
                            <h4 className="font-bold leading-none">
                              Airway Bill
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              An air waybill or AWB is a document that
                              accompanies goods shipped by an international
                              courier, which allow for tracking. It serves as a
                              receipt of goods by an airline, as well as a
                              contract of carriage between the shipper and the
                              carrier.
                            </p>
                          </div>
                        </CardHeader>
                      </Card>
                    </Button>
                    <Button
                      disabled
                      variant={"ghost"}
                      type="button"
                      className={cn(
                        "h-fit w-full whitespace-normal p-0 text-start",
                        selectedShipmentType !== null &&
                          selectedShipmentType !== "hawb" &&
                          "hidden"
                      )}
                    >
                      <Card className="cursor-pointer">
                        <CardHeader className="flex flex-row gap-4 space-y-0">
                          <GlobeIcon className="size-5" />
                          <div className="flex-1 space-y-2">
                            <h4 className="font-bold leading-none">
                              House Airway Bill
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              An air waybill or AWB is a document that
                              accompanies goods shipped by an international
                              courier, which allow for tracking. It serves as a
                              receipt of goods by an airline, as well as a
                              contract of carriage between the shipper and the
                              carrier.
                            </p>
                          </div>
                        </CardHeader>
                      </Card>
                    </Button>
                    <Button
                      disabled
                      variant={"ghost"}
                      type="button"
                      className={cn(
                        "h-fit w-full whitespace-normal p-0 text-start",
                        selectedShipmentType !== null &&
                          selectedShipmentType !== "cn-38" &&
                          "hidden"
                      )}
                    >
                      <Card className="cursor-pointer">
                        <CardHeader className="flex flex-row gap-4 space-y-0">
                          <PackageOpenIcon className="size-5" />
                          <div className="flex-1 space-y-2">
                            <h4 className="font-bold leading-none">CN-38</h4>
                            <p className="text-xs text-muted-foreground">
                              An air waybill or AWB is a document that
                              accompanies goods shipped by an international
                              courier, which allow for tracking. It serves as a
                              receipt of goods by an airline, as well as a
                              contract of carriage between the shipper and the
                              carrier.
                            </p>
                          </div>
                        </CardHeader>
                      </Card>
                    </Button>
                    <Button
                      disabled
                      variant={"ghost"}
                      type="button"
                      className={cn(
                        "h-fit w-full whitespace-normal p-0 text-start",
                        selectedShipmentType !== null &&
                          selectedShipmentType !== "cbv" &&
                          "hidden"
                      )}
                    >
                      <Card className="cursor-pointer">
                        <CardHeader className="flex flex-row gap-4 space-y-0">
                          <KeyIcon className="size-5" />
                          <div className="flex-1 space-y-2">
                            <h4 className="font-bold leading-none">CBV</h4>
                            <p className="text-xs text-muted-foreground">
                              An air waybill or AWB is a document that
                              accompanies goods shipped by an international
                              courier, which allow for tracking. It serves as a
                              receipt of goods by an airline, as well as a
                              contract of carriage between the shipper and the
                              carrier.
                            </p>
                          </div>
                        </CardHeader>
                      </Card>
                    </Button>
                  </div>
                  {selectedShipmentType !== null && (
                    <>
                      <CreateBookingForm />
                      <div className="flex w-full flex-row items-center justify-between">
                        <Button
                          onClick={() => setSelectedShipmentType(null)}
                          type="button"
                          variant={"link"}
                        >
                          <ArrowLeftIcon className="mr-2 size-4" />
                          Change Shipment Type
                        </Button>
                        <Button
                          onClick={() => {
                            form
                              .trigger([
                                "awb",
                                "partner_prefix_id",
                                "partner_code_id",
                                "is_physical",
                                "status_id",
                              ])
                              .then((success) => {
                                console.log(success)
                                success && helpers.goToNextStep()
                              })
                          }}
                          type="button"
                          variant={"button-primary"}
                        >
                          Next
                        </Button>
                      </div>
                    </>
                  )}
                  {selectedShipmentType === null && (
                    <p className="text-sm text-muted-foreground">
                      Please Select one of the options above
                    </p>
                  )}
                </TabsContent>
                <TabsContent value={"2"} className="mt-0 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold">Consignment Details</h3>
                    <p className="text-sm text-muted-foreground">Please Fill</p>
                  </div>
                  <ConsignmentDetailsForm />
                  <div className="flex w-full flex-row items-center justify-between">
                    <Button
                      onClick={helpers.goToPrevStep}
                      type="button"
                      variant={"link"}
                    >
                      <ArrowLeftIcon className="mr-2 size-4" />
                      Previous
                    </Button>
                    <Button
                      onClick={() => {
                        form
                          .trigger([
                            "origin_id",
                            "destination_id",
                            "commodity_code_id",
                            "payment_mode_id",
                            "bill_to_id",
                            "bill_to_name",
                            "shipper_id",
                            "consignee_id",
                            "customer_id",
                            "gs_weight_kg",
                            "freight_forwarder_id",
                            "organization_id",
                          ])
                          .then((success) => {
                            success && helpers.goToNextStep()
                          })
                      }}
                      type="button"
                      variant={"button-primary"}
                    >
                      Next
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value={"3"} className="mt-0 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold">Shipper Details</h3>
                    <p className="text-sm text-muted-foreground">Please Fill</p>
                  </div>
                  <ShipperDetailsForm />
                  <div className="flex w-full flex-row items-center justify-between">
                    <Button
                      onClick={helpers.goToPrevStep}
                      type="button"
                      variant={"link"}
                    >
                      <ArrowLeftIcon className="mr-2 size-4" />
                      Previous
                    </Button>
                    <Button
                      onClick={() => {
                        form.trigger(["shipper_details"]).then((success) => {
                          console.log(form.getValues())
                          success && helpers.goToNextStep()
                        })
                      }}
                      type="button"
                      variant={"button-primary"}
                    >
                      Next
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value={"4"} className="mt-0 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold">Process Rates</h3>
                    <p className="text-sm text-muted-foreground">Please Fill</p>
                  </div>
                  <ProcessRatesForm />
                  <div className="flex w-full flex-row items-center justify-between">
                    <Button
                      onClick={helpers.goToPrevStep}
                      type="button"
                      variant={"link"}
                    >
                      <ArrowLeftIcon className="mr-2 size-4" />
                      Previous
                    </Button>
                    <Button
                      isLoading={isLoading}
                      type="submit"
                      variant={"button-primary"}
                    >
                      Submit
                    </Button>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
            {/* <DialogHeader className="flex flex-row items-center justify-between space-y-0">
              <DialogTitle>
                {mode === "create" ? "New Orders" : "Edit Order"}
              </DialogTitle>
              <div className="flex flex-row items-center justify-end gap-2 text-muted-foreground">
                <Button
                  onClick={toggleFullScreen}
                  variant={"ghost"}
                  size={"icon"}
                  className="h-6 w-6"
                  type="button"
                >
                  <ArrowsPointingOutIcon className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => setOpen(false)}
                  variant={"ghost"}
                  size={"icon"}
                  className="h-6 w-6"
                  type="button"
                >
                  <XMarkIcon className="h-5 w-5" />
                </Button>
              </div>
            </DialogHeader>
            <Tabs defaultValue="booking-details">
              <div className="flex w-full flex-row items-stretch gap-4 pt-4">
                <div className="min-w-[220px]">
                  <Card className="h-full">
                    <TabsList className="p-0 py-2">
                      <TabsTrigger value="booking-details">
                        <SquarePenIcon className="h-4 w-4" />
                        Booking Details
                      </TabsTrigger>
                      <TabsTrigger value="consignment-details">
                        <PlaneIcon className="h-4 w-4" />
                        Consignment Details
                      </TabsTrigger>
                      <TabsTrigger value="shipper-details">
                        <UserIcon className="h-4 w-4" />
                        Shipper Details
                      </TabsTrigger>
                      <TabsTrigger value="process-rates">
                        <PackageIcon className="h-4 w-4" />
                        Process Rates
                      </TabsTrigger>
                    </TabsList>
                    <Separator />
                    <TabsList className="p-0 py-2">
                      <TabsTrigger value="activity-log">
                        <HistoryIcon className="h-4 w-4" />
                        Activity Log
                      </TabsTrigger>
                    </TabsList>
                  </Card>
                </div>
                <div className="grid flex-1">
                  <TabsContent value="booking-details" asChild>
                    <CreateBookingForm />
                  </TabsContent>
                  <TabsContent value="consignment-details" asChild>
                    <ConsignmentDetailsForm />
                  </TabsContent>
                  <TabsContent value="shipper-details" asChild>
                    <ShipperDetailsForm />
                  </TabsContent>
                  <TabsContent value="process-rates" asChild>
                    <ProcessRatesForm />
                  </TabsContent>
                  <TabsContent value="activity-log" asChild>
                    <ActivityLog />
                  </TabsContent>
                </div>
                <div className="flex max-w-[300px] flex-col items-stretch justify-between gap-4">
                  <div className="space-y-4">
                    <OrderSummaryCard {...formValues} />
                    <DimensionsCard {...formValues} />
                    <BalanceCard {...formValues} />
                  </div>
                  <div className="space-y-4">
                    <Button
                      type="button"
                      variant={"button-secondary"}
                      className="w-full"
                    >
                      <ScrollTextIcon className="mr-2 h-4 w-4" />
                      View Invoice
                    </Button>
                    <Button
                      isLoading={isLoading}
                      variant={"button-primary"}
                      className="w-full"
                      type="submit"
                    >
                      Save Reservation
                    </Button>
                  </div>
                </div>
              </div>
            </Tabs> */}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
