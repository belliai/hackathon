"use client"

import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react"
import { Customer } from "@/schemas/customer"
import { Order, orderSchema } from "@/schemas/order/order"
import { getDefaults } from "@/schemas/utils"
import { ArrowsPointingOutIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import {
  HistoryIcon,
  PackageIcon,
  PlaneIcon,
  ScrollTextIcon,
  SquarePenIcon,
  UserIcon,
} from "lucide-react"
import { useForm } from "react-hook-form"

import { useUpdateCustomer } from "@/lib/hooks/customers"
import { useAddOrder, useUpdateOrder } from "@/lib/hooks/orders"
import { mapJsonToSchema, mapSchemaToJson } from "@/lib/mapper/order"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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

type NewOrderModalProps = PropsWithChildren & {
  onOpenChange?: (open: boolean) => void
  open?: boolean
  mode?: "edit" | "create"
}

const schemas = orderSchema.omit({ activity_logs: true })
const initialValues = getDefaults(schemas)

export default function NewOrderModal(props: NewOrderModalProps) {
  const { children, onOpenChange, mode = "create" } = props
  const { selectedBooking, setSelectedBooking } = useBookingContext()
  const [open, setOpen] = useState(props.open ?? false)
  const [isFullScreen, setFullScreen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

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
    // Log the updated form values whenever they change
    //console.log("Form Values Changed:", formValues);
  }, [formValues])

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
        date: item.date ? format(item.date, "yyyy-MM-dd") : "",
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        hideCloseButton
        className={
          isFullScreen
            ? "h-screen w-screen max-w-none"
            : "top-8 max-w-6xl translate-y-0"
        }
        onInteractOutside={(e) => e.preventDefault()}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="flex flex-row items-center justify-between space-y-0">
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
            </Tabs>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
