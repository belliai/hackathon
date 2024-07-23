import React, { PropsWithChildren, useEffect, useMemo, useState } from "react"
import { FlightSchema, flightSchema } from "@/schemas/flight-master/flight"
import { flightMasterFormSchema } from "@/schemas/flight-master/flight-master"
import { getDefaults } from "@/schemas/utils"
import { ArrowsPointingOutIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { zodResolver } from "@hookform/resolvers/zod"
import { format, isValid, toDate } from "date-fns"
import {
  ChevronRight,
  Plane,
  PlaneIcon,
  PlaneTakeoff,
  Repeat,
  SaveIcon,
  XCircle,
} from "lucide-react"
import { useForm } from "react-hook-form"

import {
  CreateFlightMasterPayload,
  Flight,
} from "@/types/flight-master/flight-master"
import {
  useCreateFlight,
  useUpdateFlight,
} from "@/lib/hooks/flight-master/flight-master"
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import ActivityLog from "@/components/dashboard/activity-log"
import { Combobox } from "@/components/form/combobox"

import AircraftForm from "./forms/aircraft"
import FlightDetailsForm from "./forms/flight-details"
import RecurringForm from "./forms/recurring"

type NewFlightModalProps = PropsWithChildren & {
  onOpenChange: (open: boolean) => void
  resetData?: (props: any) => void
  open?: boolean
  mode?: "edit" | "create"
  data?: Flight | null
}

const schemas = flightMasterFormSchema
const initialValues = getDefaults(schemas)

const mappedData = (props: Flight) : CreateFlightMasterPayload => {
  return {
    origin_id: props.origin.id,
    destination_id: props.destination.id,
    departure_date: new Date(props.departure_date),
    departure_hour: props.departure_hour,
    departure_minute: props.departure_minute,
    tail_id: props.tail.id,
    flight_number: props.flight_number,
    departure_period: props.departure_period,
    flight_duration_hour: props.flight_duration_hour,
    flight_duration_minute: props.flight_duration_minute,
  
  }
}

export default function NewFlightModal(props: NewFlightModalProps) {
  const { children, onOpenChange, mode = "create", data, resetData } = props
  const [open, setOpen] = useState(props.open ?? false)
  const [isFullScreen, setFullScreen] = useState(false)
  const [closeWarningOpen, setCloseWarningOpen] = useState(false)
  const [currentTab, setCurrentTab] = useState("flight-details")

  const update = useUpdateFlight()
  const create = useCreateFlight()

  const form = useForm({
    resolver: zodResolver(flightSchema),
    defaultValues: {
      ...initialValues,
    },
  })

  const reset = () => {
    form.reset(initialValues)
    resetData && resetData(null)
    onOpenChange(false)
    setOpen(false)
    setCurrentTab("flight-details")
  }

  useEffect(() => {
    setOpen(props.open ?? false)
    if (!props.open) {
      reset()
    }
  }, [props.open])

  const toggleFullScreen = () => {
    setFullScreen((prev) => !prev)
  }

  const nextTab = async () => {
    const currentTabIndex = TAB_LIST.findIndex(
      (tab) => tab.value === currentTab
    )
    const fieldList = TAB_LIST[currentTabIndex].fieldList || []
    const isValid = await form.trigger(fieldList)
    if (isValid) setCurrentTab(TAB_LIST[currentTabIndex + 1].value)

    // form.trigger(fieldList as any).then((success) => {
    //   const isLast = isLastIndex()
    //   if (success && !isLast) setCurrentTab(TAB_LIST[currentTabIndex + 1].value)
    // })
  }

  const TAB_LIST: {
    label: string
    value: string
    icon: any
    content: JSX.Element
    fieldList: string[]
  }[] = [
    {
      label: "Flight Details",
      value: "flight-details",
      icon: PlaneTakeoff,
      content: <FlightDetailsForm />,
      fieldList: [
        "flight_no",
        "source_id",
        "from_date",
        "departure_h",
        "departure_m",
        "departure_am_pm",
        "destination_id"
      ],
    },
    // {
    //   label: "Recurring",
    //   value: "recurring",
    //   icon: Repeat,
    //   content: <RecurringForm />,
    //   fieldList: ["recurring"],
    // },
    // {
    //   label: "Aircraft",
    //   value: "aircraft",
    //   icon: PlaneIcon,
    //   content: <AircraftForm />,
    //   fieldList: [],
    // },
  ]

  const onSubmit = async (data: CreateFlightMasterPayload) => {
    const payload: CreateFlightMasterPayload = {
      flight_number: data.flight_number,
      origin_id: data.origin_id,
      destination_id: data.destination_id,
      departure_hour: data.departure_hour,
      departure_minute: data.departure_minute,
      departure_period: data.departure_period,
      tail_id: data.tail_id,
      departure_date: format(data.departure_date,"yyyy-MM-dd"),
      flight_duration_hour: data.flight_duration_hour,
      flight_duration_minute: data.flight_duration_minute,
    }
    try {
      // check props data
      if (!props.data) {
        await create.mutateAsync(payload)
        toast({
          title: "Success!",
          description: "Your Flight has been created",
        })
      } else {
        await update.mutateAsync({
          ...(payload as CreateFlightMasterPayload),
          id: props.data.id,
        })
        toast({
          title: "Success!",
          description: "Your flight has been updated",
        })
      }
      reset()
    } catch (error) {
      toast({
        title: "Failed!",
        variant: "destructive",
        description: "Your request failed",
      })
      console.error("Error creating flight", error)
    } finally {
    }
  }

  const [validationStatus, setValidationStatus] = useState(
    TAB_LIST.map((tab) => ({ tabValue: tab.value, isValid: true }))
  )

  useEffect(() => {
    const { errors } = form.formState
    const validationStatus = TAB_LIST.map((tab) => {
      const tabFields = tab.fieldList
      const tabValid = tabFields.every((field) => !errors[field])
      return { tabValue: tab.value, isValid: tabValid }
    })
    setValidationStatus(validationStatus)
    // Find the first invalid tab and update the currentTab
    const firstInvalidTab = validationStatus.find((item) => !item.isValid)
    if (firstInvalidTab) {
      setCurrentTab(firstInvalidTab.tabValue)
    }
  }, [form.formState.errors])

  useEffect(() => {
    if (data) {
      const dt = mappedData(data)
      form.reset(dt)
    }
    if (mode === "create") form.reset(initialValues)
  }, [data, mode])

  const renderSaveButtons = () => {
    return (
      <Button
        type="button"
        variant={"button-primary"}
        onClick={ async () => {
          isLastIndex()  ? await form.handleSubmit(onSubmit)() : nextTab()
        }}
      >
        {isLastIndex() ? (
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

  const isLastIndex = () => {
    const currentTabIndex = TAB_LIST.findIndex(
      (tab) => tab.value === currentTab
    )

    return currentTabIndex + 1 === TAB_LIST.length
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        hideCloseButton
        className={
          isFullScreen
            ? "h-screen w-screen max-w-none"
            : "top-8 h-[53dvh] max-w-[1100px] translate-y-0"
        }
        onInteractOutside={(e) => e.preventDefault()}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full w-full flex-col justify-start gap-4"
          >
            <DialogHeader className="flex flex-row items-center justify-between space-y-0">
              <DialogTitle>
                {mode === "create" ? "New Flight" : "Edit Flight"}
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
                  onClick={() => setCloseWarningOpen(true)}
                  variant={"ghost"}
                  size={"icon"}
                  className="h-6 w-6"
                  type="button"
                >
                  <XMarkIcon className="h-5 w-5" />
                </Button>
              </div>
            </DialogHeader>
            <Tabs
              value={currentTab}
              onValueChange={(val) => {
                setCurrentTab(val)
              }}
              className="grow"
            >
              <div className="flex w-full flex-row items-stretch gap-4">
                {/* <div className="flex min-w-[220px] grow-0 flex-col gap-4">
                  <TabsList className="h-fit w-full flex-col">
                    {TAB_LIST.map((list) => {
                      const isValid = validationStatus.find(
                        (item) => item.tabValue === list.value
                      )?.isValid
                      return (
                        <TabsTrigger
                          key={`list-${list.value}`}
                          className="w-full justify-start py-1.5"
                          value={list.value}
                        >
                          <list.icon className="mr-2 h-4 w-4" />
                          {list.label}{" "}
                          {!isValid && (
                            <span className="text-red-700">&nbsp;*</span>
                          )}
                        </TabsTrigger>
                      )
                    })}
                  </TabsList>
                </div> */}
                <div className="grid flex-1">
                  {TAB_LIST.map((item) => (
                    <TabsContent
                      key={`tab-${item.value}`}
                      value={item.value}
                      asChild
                    >
                      {item.content}
                    </TabsContent>
                  ))}
                  <TabsContent value="activity-log" asChild>
                    <ActivityLog />
                  </TabsContent>
                </div>
              </div>
            </Tabs>
            <DialogFooter>
              <Button
                type="button"
                variant={"secondary"}
                onClick={() => setCloseWarningOpen(true)}
              >
                <XCircle className="mr-2 size-4" />
                Cancel
              </Button>
              {renderSaveButtons()}
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
              onClick={() => {
                reset()
              }}
            >
              Yes, discard changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  )
}
