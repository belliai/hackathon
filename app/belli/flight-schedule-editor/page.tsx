"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  flightMasterFormSchema,
  FlightMasterFormValue,
} from "@/schemas/flight-master/flight-master"
import { zodResolver } from "@hookform/resolvers/zod"
import { PaginationState } from "@tanstack/react-table"
import { filter } from "d3-array"
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from "date-fns"
import {
  ListIcon,
  PackageIcon,
  PlaneIcon,
  Plus,
  PlusIcon,
  ScrollTextIcon,
  SquarePenIcon,
  UserIcon,
} from "lucide-react"
import moment from "moment"
import { useForm } from "react-hook-form"
import { RRule } from "rrule"

import { useAircraftTypes } from "@/lib/hooks/aircrafts/aircraft-types"
import {
  useCreateFlight,
  useDeleteFlight,
  useFlightList,
  useUpdateFlight,
} from "@/lib/hooks/flight-master/flight-master"
import { generateRecurringDates } from "@/lib/utils/date-utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import CreateEditModal from "@/components/dashboard/modal/create-edit-modal/create-edit-modal"
import { DataTable } from "@/components/data-table/data-table"
import DataTableFilterForm from "@/components/data-table/data-table-filter-form"
import InputSwitch from "@/components/form/InputSwitch"
import PageContainer from "@/components/layout/PageContainer"

import {
  useListViewColumns,
  useRecurringFlightsColumns,
} from "./components/column"
import { formFilters, listViewFilters } from "./components/filter"
import FlightMasterForm from "./components/flight-master-form"
import FlightMasterFormRecurring from "./components/flight-master-form-recurring"
import MonthlyDateStepper from "./components/monthly-date-stepper"
import WeeklyDateStepper from "./components/weekly-date-stepper"
import { LoopIcon } from "@radix-ui/react-icons"

type FlightDetailFormValues = {
  flightNo: string
  source: string
  destination: string
  fromDate: Date
  toDate: Date
  frequencyItems: any
  aircraftType: string | undefined
  tailNo: string
  capacity: string
  uom: string
  sector: string
  status: string
  flightType: string
  rangeDate: {
    from: Date
    to: Date
    fromTime: string
    toTime: string
  }
  deptTime: {
    deptDay: string
    deptHour: string
    deptMinute: string
  }
  arrivalTime: {
    arrivalDay: string
    arrivalHour: string
    arrivalMinute: string
  }
}

const formDefaultValues = {
  flightNo: "",
  source: "",
  destination: "",
  fromDate: new Date(),
  toDate: new Date(),
  frequencyItems: [],
  aircraftType: "",
  tailNo: "",
  capacity: "",
  recurring: "",
  uom: "",
  sector: "",
  status: "",
  flightType: "",
  rangeDate: {
    from: new Date(),
    to: new Date(),
    fromTime: "00:00",
    toTime: "00:00",
  },
  deptTime: {
    deptDay: "0",
    deptHour: "0",
    deptMinute: "0",
  },
  arrivalTime: {
    arrivalDay: "0",
    arrivalHour: "0",
    arrivalMinute: "0",
  },
}

const flightSchema = flightMasterFormSchema.pick({
  flightNo: true,
  source: true,
  destination: true,
  fromDate: true,
  toDate: true,
  aircraftType: true,
  status: true,
  deptTime: true,
  arrivalTime: true,
  tailNo: true,
  capacity: true,
  uom: true,
  sector: true,
  flightType: true,
})

const recurringFlightSchema = flightMasterFormSchema.pick({
  flightNo: true,
  source: true,
  destination: true,
  fromDate: true,
  toDate: true,
  aircraftType: true,
  status: true,
  deptTime: true,
  arrivalTime: true,
  rangeDate: true,
  recurring: true,
})

const filtersSchema = flightMasterFormSchema.pick({
  period: true,
  fromDate: true,
})

const initialWeeklyFromDate = startOfWeek(new Date(), { weekStartsOn: 1 })
const initialWeeklyToDate = endOfWeek(initialWeeklyFromDate, {
  weekStartsOn: 1,
})

const initialMonthlyFromDate = startOfMonth(new Date()) // Start of the current month
const initialMonthlyToDate = endOfMonth(initialMonthlyFromDate) // End of the current month

export default function Page() {
  const [openModal, setOpenModal] = useState<string | boolean>(false)
  const [openModalRecurring, setOpenModalRecurring] = useState<
    string | boolean
  >(false)
  const [deleteConfirm, setDeleteConfirm] = useState<Flight | null>(null)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [filterWeekly, setFilterWeekly] = useState<{ from: Date; to: Date }>({
    from: initialWeeklyFromDate,
    to: initialWeeklyToDate,
  })
  const [filterMonthly, setFilterMonthly] = useState<{ from: Date; to: Date }>({
    from: initialMonthlyFromDate,
    to: initialMonthlyToDate,
  })

  const [flightDataRecurring, setFlightDataRecurring] = useState<Flight[]>([])

  const paginationDetails = useMemo(
    () => ({
      page: pagination.pageIndex === 0 ? 1 : pagination.pageIndex + 1,
      page_size: pagination.pageSize,
    }),
    [pagination]
  )

  const { data: flightData, isLoading } = useFlightList(paginationDetails)

  const { mutateAsync: createFlight, isPending } = useCreateFlight()
  const { mutateAsync: updateFlight, isPending: isPendingUpdate } =
    useUpdateFlight()

  const { data: aircraftTypeList } = useAircraftTypes()
  const { mutateAsync: deleteFlight } = useDeleteFlight()

  const sectionedHookForm = useForm({
    defaultValues: formDefaultValues,
    resolver: zodResolver(flightSchema),
  })

  const sectionedHookRecurringForm = useForm({
    defaultValues: formDefaultValues,
    resolver: zodResolver(recurringFlightSchema),
  })

  const filtersHookForm = useForm({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      period: "daily",
      fromDate: new Date(),
    },
  })

  const filterData = filtersHookForm.watch()

  useEffect(() => {
    if (flightData && flightData.data) {
      const flightDataRecurring = flightData.data.map((item) => ({
        ...item,
        // Temporary recurring value following this rule standard
        // https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
        recurring: `DTSTART:20240701T040000Z
RRULE:FREQ=DAILY;WKST=MO`,
      }))

      console.log(flightDataRecurring)

      const flightDataNew = flightDataRecurring.flatMap((item) => {
        const rruleString = item.recurring || ""
        let occurrences: Date[] = []

        try {
          const rrule = RRule.fromString(rruleString)
          const now = new Date(filterData.fromDate)

          let rangeDate = new Date(now)
          switch (filterData.period) {
            case "daily":
              rangeDate.setDate(now.getDate() + 1)
              occurrences = rrule.between(now, rangeDate)
              break
            case "weekly":
              occurrences = rrule.between(filterWeekly.from, filterWeekly.to)
              break
            case "monthly":
              occurrences = rrule.between(filterMonthly.from, filterMonthly.to)
              break
            default:
              rangeDate.setDate(now.getDate() + 10)
              break
          }
        } catch (error) {
          console.error("Invalid RRule string:", rruleString, error)
        }

        return occurrences.map((date) => ({
          ...item,
          recurring: rruleString,
          next_at: date,
        }))
      })

      setFlightDataRecurring(flightDataNew)
    }
  }, [
    flightData,
    filterData.fromDate,
    filterData.period,
    filterWeekly,
    filterMonthly,
  ])

  const findDays = (data: string[], key: string): boolean => {
    return (data && data.includes(key)) || false
  }

  const leadingZero = (val: number, count: number) => {
    return String(val).padStart(count, "0")
  }

  const handleCreateFlightRecurring = async (param: FlightMasterFormValue) => {
    const { rangeDate, recurring } = param

    if (rangeDate) {
      const [fromHour, fromMinutes] = rangeDate.fromTime.split(":")
      const [toHour, toMinutes] = rangeDate.fromTime.split(":")

      const payload: CreateRecurringFlightMasterPayload = {
        aircraft_id: param.aircraftType,
        destination_id: param.destination,
        flight_no: param.flightNo,
        source_id: param.source,
        status_id: param.status,
        from_date: moment(rangeDate?.from).format("YYYY-MM-DD"),
        to_date: moment(rangeDate?.to).format("YYYY-MM-DD"),
        arrival_h: parseInt(toHour),
        arrival_m: parseInt(toMinutes),
        departure_h: parseInt(fromHour),
        departure_m: parseInt(fromMinutes),
      }
      try {
        await createFlight(payload as CreateFlightMasterPayload, {
          onError: (error) => {
            throw error
          },
        })
      } catch (error) {
        console.error("Error creating flight recurring:", error)
      } finally {
        setOpenModal(false)
        setOpenModalRecurring(false)
        sectionedHookRecurringForm.reset(formDefaultValues)
        toast({
          title: "Success!",
          description: "Recurring Flights created successfully",
        })
      }
    }
  }

  const handleCreateFlight = async (param: FlightMasterFormValue) => {
    const payload: CreateFlightMasterPayload = {
      aircraft_id: param.aircraftType,
      capacity: parseInt(param.capacity),
      destination_id: param.destination,
      flight_no: param.flightNo,
      flight_type_id: param.flightType,
      sector_id: param.sector,
      source_id: param.source,
      status_id: param.status,
      tail_id: param.tailNo,
      from_date: moment(param.fromDate).format("YYYY-MM-DD"),
      to_date: moment(param.toDate).format("YYYY-MM-DD"),
      uom_id: param.uom,
      arrival_d: parseInt(param.arrivalTime.arrivalDay || "0", 10),
      arrival_h: parseInt(param.arrivalTime.arrivalHour || "0", 10),
      arrival_m: parseInt(param.arrivalTime.arrivalMinute || "0", 10),
      departure_d: parseInt(param.deptTime.deptDay || "0", 10),
      departure_h: parseInt(param.deptTime.deptHour || "0", 10),
      departure_m: parseInt(param.deptTime.deptMinute || "0", 10),
      mon:
        (param.frequencyItems && findDays(param.frequencyItems, "mon")) ||
        false,
      tue:
        (param.frequencyItems && findDays(param.frequencyItems, "tue")) ||
        false,
      wed:
        (param.frequencyItems && findDays(param.frequencyItems, "wed")) ||
        false,
      thu:
        (param.frequencyItems && findDays(param.frequencyItems, "thu")) ||
        false,
      fri:
        (param.frequencyItems && findDays(param.frequencyItems, "fri")) ||
        false,
      sat:
        (param.frequencyItems && findDays(param.frequencyItems, "sat")) ||
        false,
      sun:
        (param.frequencyItems && findDays(param.frequencyItems, "sun")) ||
        false,
    }

    if (param.rangeDate) {
      const [fromHour, fromMin] = param.rangeDate.fromTime.split(":")
      const [toHour, toMin] = param.rangeDate.toTime.split(":")
      payload.departure_h = parseInt(fromHour)
      payload.departure_m = parseInt(fromMin)
      payload.arrival_h = parseInt(toHour)
      payload.arrival_m = parseInt(toMin)
    }

    if (
      typeof openModal === "string" ||
      typeof openModalRecurring === "string"
    ) {
      const id = openModal || openModalRecurring

      await updateFlight(
        { id: String(id), ...payload },
        {
          onError: (error) => {
            console.error(error)
            toast({
              title: "Error!",
              description: "An error occurred while updating flight",
            })
          },
          onSuccess: (data) => {
            setOpenModal(false)
            setOpenModalRecurring(false)
            sectionedHookForm.reset(formDefaultValues)
            console.log("res data", data)
            toast({
              title: "Success!",
              description: "Flight updated successfully",
            })
          },
        }
      )
    } else {
      await createFlight(payload, {
        onError: (error) => {
          console.error(error)
          toast({
            title: "Error!",
            description: "An error occurred while creating flight",
          })
        },
        onSuccess: (data) => {
          setOpenModal(false)
          setOpenModalRecurring(false)
          sectionedHookForm.reset(formDefaultValues)
          console.log("res data", data)
          toast({
            title: "Success!",
            description: "Flight created successfully",
          })
        },
      })
    }
  }

  const reformatDays = (data: Flight) => {
    const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]

    return days.filter((day) => data[day as keyof Flight])
  }

  const reformatDetailToForm = (data: Flight): FlightDetailFormValues => {
    const aircraftTypeId = aircraftTypeList?.find(
      (item: any) => item.aircraft_type === data.aircraft?.aircraft_type
    )

    const formattedPayload: FlightDetailFormValues = {
      flightNo: data.flight_no,
      source: data.source.ID,
      destination: data.destination.ID,
      fromDate: new Date(data.from_date),
      toDate: new Date(data.to_date),
      frequencyItems: reformatDays(data) || [],
      aircraftType: aircraftTypeId?.id,
      tailNo: data.tail?.ID,
      capacity: data.capacity?.toString(),
      uom: data.uom?.ID,
      sector: data.sector?.ID,
      status: data.status.ID,
      flightType: data.flight_type?.ID,
      rangeDate: {
        from: new Date(data.from_date),
        to: new Date(data.to_date),
        fromTime:
          leadingZero(data.departure_d, 2) +
          ":" +
          leadingZero(data.departure_m, 2),
        toTime:
          leadingZero(data.arrival_h, 2) + ":" + leadingZero(data.arrival_m, 2),
      },
      deptTime: {
        deptDay: data.departure_d?.toString() || "0",
        deptHour: data.departure_h?.toString() || "0",
        deptMinute: data.departure_m?.toString() || "0",
      },
      arrivalTime: {
        arrivalDay: data.arrival_d?.toString() || "0",
        arrivalHour: data.arrival_h?.toString() || "0",
        arrivalMinute: data.arrival_m?.toString() || "0",
      },
    }

    return formattedPayload
  }

  const openDetailFlight = (data: Flight) => {
    const formValue = reformatDetailToForm(data)
    setOpenModal(data.ID)
    sectionedHookForm.reset(formValue as FlightDetailFormValues) // Ensure correct type assertion
  }

  const openDetailRecurringFlight = (data: Flight) => {
    const formValue = reformatDetailToForm(data)
    setOpenModalRecurring(data.ID)
    sectionedHookForm.reset(formValue as FlightDetailFormValues) // Ensure correct type assertion
  }

  const handleDeleteFlight = async (data: Flight) => {
    if (data) {
      await deleteFlight(
        { id: data.ID },
        {
          onError: (error) => {
            console.error(error)
            toast({
              title: "Error!",
              description: "An error occurred while deleting flight",
            })
          },
          onSuccess: (data) => {
            setDeleteConfirm(null)
            console.log("res data", data)
            toast({
              title: "Success!",
              description: "Flight deleted successfully",
            })
          },
        }
      )
    } else {
      toast({
        title: "Error!",
        description: "Cannot find Flight",
      })
    }
  }

  const onShowDelete = (data: Flight) => {
    setDeleteConfirm(data)
  }

  const createButtonFlight = (
    <Button
      size={"sm"}
      variant={"button-primary"}
      className="p-2 text-xs"
      onClick={() => setOpenModal(true)}
      style={{ fontSize: "0.875rem" }}
    >
      <PlusIcon className="mr-2 size-4" />
      Create New Flight
    </Button>
  )

  const createButtonRecurringFlight = (
    <Button
      size={"sm"}
      variant={"button-primary"}
      className="p-2 text-xs"
      onClick={() => setOpenModalRecurring(true)}
      style={{ fontSize: "0.875rem" }}
    >
      <PlusIcon className="mr-2 size-4" />
      Create Recurring Flight
    </Button>
  )

  const tableState = useCallback(async ({ pagination }: any) => {
    setPagination(pagination)
  }, [])

  const listViewColumns = useListViewColumns(openDetailFlight, onShowDelete)
  const recurringFlightsColumns = useRecurringFlightsColumns(
    openDetailFlight,
    onShowDelete
  )

  return (
    <>
      <PageContainer>
        <Tabs defaultValue="list-view" className="w-full">
          <TabsContent value="list-view" className="mt-0">
            <DataTable
              showToolbarOnlyOnHover={true}
              columns={listViewColumns}
              data={isLoading ? [] : flightDataRecurring}
              onRowClick={openDetailFlight}
              extraRightComponents={createButtonFlight}
              extraLeftComponents={
                <TabsList className="gap-2 bg-transparent p-0">
                  <TabsTrigger
                    className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
                    value="list-view"
                    style={{ fontSize: "0.875rem" }}
                  >
                    <ListIcon className="mr-2 size-4" />
                    List View
                  </TabsTrigger>
                  <TabsTrigger
                    className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
                    value="create-recurring-flight"
                    style={{ fontSize: "0.875rem" }}
                  >
                    <LoopIcon className="mr-2 size-4" />
                    Recurring Flights
                  </TabsTrigger>
                  <Form {...filtersHookForm}>
                    <InputSwitch
                      name="period"
                      type="select"
                      defaultValue="daily"
                      className="h-8 w-24"
                      selectOptions={[
                        {
                          label: "Daily",
                          value: "daily",
                        },
                        {
                          label: "Weekly",
                          value: "weekly",
                        },
                        {
                          label: "Monthly",
                          value: "monthly",
                        },
                      ]}
                    />
                    {filterData.period === "daily" && (
                      <InputSwitch
                        name="fromDate"
                        type="date"
                        className="h-8 w-36"
                      />
                    )}
                    {filterData.period === "weekly" && (
                      <WeeklyDateStepper
                        value={filterWeekly}
                        onChange={setFilterWeekly}
                      />
                    )}
                    {filterData.period === "monthly" && (
                      <MonthlyDateStepper
                        value={filterMonthly}
                        onChange={setFilterMonthly}
                      />
                    )}
                  </Form>
                </TabsList>
              }
              pageCount={1}
              manualPagination={true}
              hidePagination
              tableState={tableState}
              menuId="flight-master-list-view"
              isCanExport
            />
          </TabsContent>

          <TabsContent value="create-recurring-flight" className="mt-0">
            <DataTable
              showToolbarOnlyOnHover={true}
              columns={recurringFlightsColumns}
              data={isLoading ? [] : (flightData && flightData.data) || []}
              extraRightComponents={createButtonRecurringFlight}
              extraLeftComponents={
                <TabsList className="gap-2 bg-transparent p-0">
                  <TabsTrigger
                    className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
                    value="list-view"
                  >
                    <ListIcon className="mr-2 size-4" />
                    List View
                  </TabsTrigger>
                  <TabsTrigger
                    className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
                    value="create-recurring-flight"
                  >
                    <LoopIcon className="mr-2 size-4" />
                    Recurring Flights
                  </TabsTrigger>
                </TabsList>
              }
              pageCount={
                isLoading ? 1 : (flightData && flightData.total_pages) || 1
              }
              manualPagination={true}
              tableState={tableState}
              menuId="flight-master-recurring-view"
            />
          </TabsContent>
        </Tabs>
      </PageContainer>
      <CreateEditModal
        title={
          typeof openModal === "string"
            ? "Edit Flight"
            : openModal
              ? "Create New Flight"
              : ""
        }
        open={openModal !== false}
        form={sectionedHookForm}
        onSubmit={handleCreateFlight}
        setOpen={(open) => {
          if (open) {
            setOpenModal(openModal)
          } else {
            sectionedHookForm.reset(formDefaultValues)
            setOpenModal(false)
          }
        }}
        tabItems={[]}
        content={
          <Card className="mt-4 pt-4">
            <CardContent>
              <FlightMasterForm hookForm={sectionedHookForm} />
            </CardContent>
            <CardFooter className="flex flex-col items-end">
              <Button
                isLoading={isPending}
                variant={"button-primary"}
                className="w-40"
                type="submit"
              >
                Save Flight
              </Button>
            </CardFooter>
          </Card>
        }
      />
      <CreateEditModal
        title={
          typeof openModalRecurring === "string"
            ? "Edit Flight"
            : openModal
              ? "Create Recurring Flight"
              : ""
        }
        open={openModalRecurring !== false}
        form={sectionedHookRecurringForm}
        onSubmit={handleCreateFlightRecurring}
        setOpen={(open) => {
          if (open) {
            setOpenModalRecurring(openModalRecurring)
          } else {
            sectionedHookRecurringForm.reset(formDefaultValues)
            setOpenModalRecurring(false)
          }
        }}
        tabItems={[]}
        content={
          <Card className="mt-4 pt-4">
            <CardContent>
              <FlightMasterFormRecurring
                hookForm={sectionedHookRecurringForm}
              />
            </CardContent>
            <CardFooter className="flex flex-col items-end">
              <Button
                isLoading={isPending}
                variant={"button-primary"}
                className="w-40"
                type="submit"
              >
                Save Recurring Flight
              </Button>
            </CardFooter>
          </Card>
        }
      />
      <AlertDialog
        open={deleteConfirm !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteConfirm(null)
          } else {
            setDeleteConfirm(deleteConfirm)
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure want to delete Flight?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will delete {deleteConfirm && `${deleteConfirm?.flight_no}`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm && handleDeleteFlight(deleteConfirm)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
