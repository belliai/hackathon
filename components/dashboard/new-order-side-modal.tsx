"use client"

import { PropsWithChildren, useEffect, useMemo, useState } from "react"
import { Order, orderSchema } from "@/schemas/order/order"
import { getDefaults } from "@/schemas/utils"
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
  DeviceTabletIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import {
  Banknote,
  ChevronLeft,
  ChevronRight,
  Package2Icon,
  PlaneLandingIcon,
  PlaneTakeoffIcon,
  SaveIcon,
  SquarePenIcon,
  Upload,
  UserCheck,
  XCircle,
} from "lucide-react"
import { useForm } from "react-hook-form"

import { useBookingTypes } from "@/lib/hooks/booking-types"
import { useUpdateCustomer } from "@/lib/hooks/customers"
import { useAddOrder, useUpdateOrder } from "@/lib/hooks/orders"
import { useStatuses } from "@/lib/hooks/statuses"
import { mapJsonToSchema, mapSchemaToJson } from "@/lib/mapper/order"
import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { useBookingContext } from "@/components/dashboard/BookingContext"
import { Combobox } from "@/components/form/combobox"

import ActivityLog from "./activity-log"
import BookingDetailsForm from "./forms/booking-details-form"
import ConsigneeForm from "./forms/consignee-form"
import ConsignorForm from "./forms/consignor-form"
import UploadFile from "./forms/file-upload"
import HAWBTable from "./forms/hawb-table"
import PayerForm from "./forms/payer-form"
import PaymentFormV2 from "./forms/payment-form-v2"
import WeightAndVolumeFormV2 from "./forms/weight-and-volume-form-v2"
import HeaderSection from "./header-section"
import SummaryTotal from "./summary-total"

type NewOrderSideModalProps = PropsWithChildren & {
  onOpenChange: (open: boolean) => void
  open?: boolean
  mode?: "edit" | "create"
  selectedColumnId?: string
}

const schemas = orderSchema.omit({ activity_logs: true })
const initialValues = getDefaults(schemas)

export default function NewOrderSideModal({
  onOpenChange,
  open: openModal,
  mode,
  selectedColumnId,
  children,
}: NewOrderSideModalProps) {
  const { selectedBooking, setSelectedBooking } = useBookingContext()
  const [open, setOpen] = useState(openModal ?? false)
  const [isFullScreen, setFullScreen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [closeWarningOpen, setCloseWarningOpen] = useState(false)
  const [currentTab, setCurrentTab] = useState("booking-details")
  const { data: bookingTypes } = useBookingTypes()

  const add = useAddOrder()
  const update = useUpdateOrder()
  const updateCustomer = useUpdateCustomer()
  const { data: statuses } = useStatuses()

  const defaultValues = useMemo(
    () => ({
      ...initialValues,
      ...(selectedBooking && { ...mapJsonToSchema(selectedBooking) }),
      individual_parcel_table: [],
      hawb_table: [],
      payment_table: [],
      weight_and_volume_table: [],
    }),
    [selectedBooking]
  )

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

  const isLastIndex = () => {
    const currentTabIndex = TAB_LIST.findIndex(
      (tab) => tab.value === currentTab
    )

    return currentTabIndex + 1 === TAB_LIST.length
  }

  const nextTab = () => {
    const currentTabIndex = TAB_LIST.findIndex(
      (tab) => tab.value === currentTab
    )
    const fieldList = TAB_LIST[currentTabIndex].fieldList || []
    // form.trigger(fieldList as any)
    // .then((success) => {
    const isLast = isLastIndex()
    // if(success && !isLast)
    setCurrentTab(TAB_LIST[currentTabIndex + 1].value)
    // })
  }

  console.log({ selectedBooking })

  const TAB_LIST: {
    label: string
    value: string
    icon: any
    content: JSX.Element
    fieldList: string[]
    columnList: string[]
  }[] = [
    {
      label: "Booking Details",
      value: "booking-details",
      icon: SquarePenIcon,
      content: (
        <BookingDetailsForm
          initialLocations={
            selectedBooking?.origin &&
            selectedBooking.destination && [
              selectedBooking.origin,
              selectedBooking.destination,
            ]
          }
        />
      ),
      fieldList: [
        "booking_type_id",
        "partner_prefix_id",
        "awb",
        "partner_code_id",
        "is_physical",
        "commodity_code_id",
        "commodity_name",
        "pieces",
        "gs_weight_kg",
        "volume_kg",
      ],
      columnList: [
        "awb",
        "partner_code_name",
        "partner_prefix_name",
        "commodity_code_name",
        "gs_weight_kg",
        "volume_kg",
      ],
    },
    {
      label: "Consignor (Sender)",
      value: "consignor",
      icon: PlaneTakeoffIcon,
      content: <ConsignorForm />,
      fieldList: ["origin_id", "shipper_id"],
      columnList: ["origin_name", "shipper_name"],
    },
    {
      label: "Consignee (Receiver)",
      value: "consignee",
      icon: PlaneLandingIcon,
      content: <ConsigneeForm />,
      fieldList: ["destination_id", "consignee_id"],
      columnList: ["destination_name"],
    },
    {
      label: "Payer",
      value: "payer",
      icon: UserCheck,
      content: <PayerForm />,
      fieldList: ["bill_to_id", "total", "currency"],
      columnList: ["bill_to_name", "total", "currency"],
    },
    {
      label: "Weight & Volume",
      value: "weight-and-volume",
      icon: Package2Icon,
      content: <WeightAndVolumeFormV2 />,
      fieldList: ["origin_id", "shipper_id"],
      columnList: ["origin_name", "shipper_name"],
    },
    {
      label: "Payment History",
      value: "payment-history",
      icon: Banknote,
      content: <PaymentFormV2 />,
      fieldList: [
        "use_freight_forwarder",
        "freight_forwarder_id",
        "organization_id",
        "bill_to_id",
        "bill_to_name",
        "customer_id",
        "customer_name",
        "partner_prefix_id",
        "rate",
        "s_rate",
        "s_freight",
        "spot_id",
        "gs_weight_kg",
        "ch_weight_kg",
      ],
      columnList: [
        "bill_to_name",
        "rate",
        "currency_name",
        "freight_forwarder_name",
        "s_freight",
        "s_rate",
        "total",
        "mode",
        "ch_weight_kg",
        "payment_mode_name",
      ],
    },
    {
      label: "Upload File",
      value: "upload-file",
      icon: Upload,
      content: <UploadFile />,
      fieldList: [],
      columnList: [],
    },
  ]

  useEffect(() => {
    setOpen(openModal ?? false)
    if (!openModal && mode === "edit") {
      setSelectedBooking(initialValues)
    }
  }, [openModal])

  useEffect(() => {
    if (selectedBooking) {
      form.reset(defaultValues)
    }
  }, [selectedBooking, defaultValues, form])

  const toggleFullScreen = () => {
    setFullScreen((prev) => !prev)
  }

  const statusOptions = statuses?.map((status: any) => ({
    value: status.ID,
    label: status.name,
  }))

  useEffect(() => {
    if (selectedColumnId) {
      const currentTabFromTable = TAB_LIST.find((tab) =>
        tab.columnList.includes(selectedColumnId)
      )
      setCurrentTab(currentTabFromTable?.value || "booking-details")
    }
  }, [selectedColumnId])

  const selectedBookingType = bookingTypes.find(
    (bookingType) => bookingType.ID === formValues.booking_type_id
  )

  const renderSaveButtons = () => {
    return (
      <Button
        type="button"
        variant={"button-primary"}
        onClick={
          isLastIndex() || currentTab === "hawb"
            ? form.handleSubmit(onSubmit)
            : nextTab
        }
      >
        {isLastIndex() || currentTab === "hawb" ? (
          <>
            <SaveIcon className="mr-2 size-4" />
            Save
          </>
        ) : (
          <>
            Next
            <ChevronRight className="size-4" />
          </>
        )}
      </Button>
    )
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
      onOpenChange(false)
      setIsLoading(false)
    }
  }

  const getCurrentIndex = (id: string) => {
    return TAB_LIST.findIndex((tab) => tab.value === id)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        className={cn("w-full py-4 sm:max-w-6xl", {
          "h-screen w-screen max-w-none sm:max-w-none": isFullScreen,
        })}
        onInteractOutside={(e) => e.preventDefault()}
        hideCloseButton
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full w-full flex-col justify-start gap-4"
          >
            <SheetHeader className="flex h-7 flex-row items-center justify-between space-y-0">
              <SheetTitle>
                <HeaderSection
                  bookingTypeId={formValues.booking_type_id || ""}
                  partnerPrefixId={formValues.partner_prefix_id || ""}
                  partnerCodeId={formValues.partner_code_id || ""}
                  awbNumber={formValues.awb || ""}
                  destinationId={formValues.destination_id || ""}
                  originId={formValues.origin_id || ""}
                />
              </SheetTitle>
              <div className="flex flex-row items-center justify-end gap-2 dark:text-muted-foreground">
                <SummaryTotal
                  currencyId={formValues.currency_id || ""}
                  total={formValues.total || ""}
                  weight={formValues.total_weight || ""}
                  volume={formValues.total_volume || ""}
                  type="header"
                />
                <Button
                  onClick={toggleFullScreen}
                  variant={"ghost"}
                  size={"icon"}
                  className="h-6 w-6"
                  type="button"
                >
                  {!isFullScreen ? (
                    <ArrowsPointingOutIcon className="h-4 w-4" />
                  ) : (
                    <ArrowsPointingInIcon className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  onClick={() => setCloseWarningOpen(true)}
                  variant={"ghost"}
                  size={"icon"}
                  className="h-6 w-6"
                  type="button"
                >
                  <XMarkIcon className="h-5 w-5" />
                </Button>
              </div>
            </SheetHeader>
            <Tabs
              value={currentTab}
              onValueChange={(val) => {
                setCurrentTab(val)
              }}
              className="grow"
            >
              <div className="flex h-full w-full flex-row items-stretch gap-4">
                <div className="flex min-w-[220px] grow-0 flex-col gap-4">
                  <TabsList className="h-fit w-full flex-col bg-black-background">
                    {TAB_LIST.map((list, index) => (
                      <TabsTrigger
                        key={`list-${list.value}`}
                        className="w-full justify-start py-1.5 disabled:text-muted-foreground/45 data-[state=active]:bg-accent dark:data-[state=active]:text-white"
                        value={list.value}
                        disabled={
                          mode === "create" &&
                          index > getCurrentIndex(currentTab)
                        }
                      >
                        <list.icon className="mr-2 h-4 w-4" />
                        {list.label}
                      </TabsTrigger>
                    ))}
                    <TabsTrigger
                      key={`list-hawb`}
                      className="w-full justify-start py-1.5 disabled:text-muted-foreground/45 data-[state=active]:bg-accent dark:data-[state=active]:text-white"
                      value={"hawb"}
                      disabled={
                        selectedBookingType?.name.toLowerCase() !== "mawb"
                      }
                    >
                      <DeviceTabletIcon className="mr-2 h-4 w-4" />
                      House Airway Bill
                    </TabsTrigger>
                  </TabsList>
                  {mode === "edit" && (
                    <Combobox
                      name="status_id"
                      options={statusOptions}
                      label="Status"
                      info="Select the Status"
                      editLink="/data-fields/airway-bills?tab=status"
                    />
                  )}
                  <SummaryTotal
                    currencyId={formValues.currency_id || ""}
                    total={formValues.total || ""}
                    weight={formValues.total_weight || ""}
                    volume={formValues.total_volume || ""}
                    type="sidebar"
                  />
                </div>
                <div className="flex h-full w-full min-w-0 flex-shrink flex-col">
                  {TAB_LIST.map((item) => (
                    <TabsContent
                      key={`tab-${item.value}`}
                      value={item.value}
                      asChild
                    >
                      {item.content}
                    </TabsContent>
                  ))}
                  <TabsContent key={`tab-hawb`} value={"hawb"} asChild>
                    <HAWBTable />
                  </TabsContent>
                  <TabsContent value="activity-log" asChild>
                    <ActivityLog />
                  </TabsContent>
                </div>
              </div>
            </Tabs>
            <SheetFooter>
              <Button
                type="button"
                variant={"secondary"}
                onClick={() => setCloseWarningOpen(true)}
              >
                <XCircle className="mr-2 size-4" />
                Cancel
              </Button>
              {getCurrentIndex(currentTab) > 0 && currentTab !== "hawb" && (
                <Button
                  type="button"
                  variant={"secondary"}
                  onClick={() => {
                    const currentIndex = getCurrentIndex(currentTab)
                    setCurrentTab(TAB_LIST[currentIndex - 1].value)
                  }}
                >
                  <ChevronLeft className="mr-2 size-4" />
                  Previous
                </Button>
              )}
              {renderSaveButtons()}
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
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
              onClick={() => {
                onOpenChange(false)
                setCloseWarningOpen(false)
                form.reset(defaultValues)
                setCurrentTab("booking-details")
              }}
            >
              Yes, discard changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sheet>
  )
}
