"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoopIcon } from "@radix-ui/react-icons"
import { PaginationState, SortingState } from "@tanstack/react-table"
import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns"
import { ListIcon, PlusIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Flight } from "@/types/flight-master/flight-master"
import { useAircraftTypes } from "@/lib/hooks/aircrafts/aircraft-types"
import { useAircrafts } from "@/lib/hooks/aircrafts/aircrafts"
import {
  useCreateFlight,
  useDeleteFlight,
  useFlightList,
  useRecurringFlightList,
  useUpdateFlight,
} from "@/lib/hooks/flight-master/flight-master"
import { onExport } from "@/lib/utils/export"
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
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { DataTable } from "@/components/data-table/data-table"
import InputSwitch from "@/components/form/InputSwitch"
import PageContainer from "@/components/layout/PageContainer"

import { listViewColumns, useRecurringColumns } from "./components/column"
import MonthlyDateStepper from "./components/monthly-date-stepper"
import NewFlightModal from "./components/new-flight-form"
import WeeklyDateStepper from "./components/weekly-date-stepper"

type FlightDetailFormValues = {
  flightNo: string
  source: string
  destination: string
  from_date: Date
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

const filtersSchema = z.object({
  period: z.string(),
  from_date: z.date().optional(),
  range_date: z
    .object({
      to: z.date(),
      from: z.date(),
    })
    .optional(),
})

const initialWeeklyFromDate = startOfWeek(new Date(), { weekStartsOn: 1 })
const initialWeeklyToDate = endOfWeek(initialWeeklyFromDate, {
  weekStartsOn: 1,
})

const initialMonthlyFromDate = startOfMonth(new Date()) // Start of the current month
const initialMonthlyToDate = endOfMonth(initialMonthlyFromDate) // End of the current month

const initialPagination = {
  pageIndex: 0,
  pageSize: 10,
}

type selectionFlight = "from" | "one" | "all" | undefined

export default function Page() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [modalType, setModalType] = useState<"edit" | "create">("create")
  const [currentTab, setCurrentTab] = useState<string>("list-view")

  const [openModalRecurring, setOpenModalRecurring] = useState<
    string | boolean
  >(false)
  const [deleteConfirm, setDeleteConfirm] = useState<Flight | null>(null)
  const [pagination, setPagination] =
    useState<PaginationState>(initialPagination)

  const [sorting, setSorting] = useState<SortingState>([
    { id: "departure_date", desc: false },
  ])

  const [selectedData, setSelectedData] = useState<Flight | null>(null)

  const [filterWeekly, setFilterWeekly] = useState<{ from: Date; to: Date }>({
    from: initialWeeklyFromDate,
    to: initialWeeklyToDate,
  })
  const [filterMonthly, setFilterMonthly] = useState<{ from: Date; to: Date }>({
    from: initialMonthlyFromDate,
    to: initialMonthlyToDate,
  })

  const [selectionFlight, setSelectionFlight] = useState<selectionFlight>("one")
  const [recurringSelection, setRecurringSelection] = useState<boolean>(false)

  const paginationDetails = useMemo(
    () => ({
      page: pagination.pageIndex === 0 ? 1 : pagination.pageIndex + 1,
      page_size: pagination.pageSize,
    }),
    [pagination]
  )

  const sortingDetails = useMemo(
    () => ({
      //curently only sort by column departure_date
      //TODO implement all column sorting
      sort_by: sorting[0]?.id || "departure_date",
      sort_dir: sorting[0]?.desc ? "desc" : "asc" || "asc",
    }),
    [sorting]
  )

  const filtersHookForm = useForm({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      list_period: "all",
      recurring_period: "all",
      from_date: new Date(),
      range_date: {
        from: new Date(),
        to: new Date(),
      },
    },
  })

  const filterData = filtersHookForm.watch()

  useEffect(() => {
    // reset selectionFlight
    if (!openModal) setSelectionFlight("one")
  }, [openModal])

  useEffect(() => {}, [filterData])

  const { data: flightData, isLoading } = useFlightList({
    ...paginationDetails,
    ...sortingDetails,
    start_date:
      currentTab === "list-view"
        ? filterData.list_period === "all"
          ? undefined // format(new Date(), "yyyy-MM-dd") // filter by today
          : filterData.list_period === "daily"
            ? filterData.from_date && format(filterData.from_date, "yyyy-MM-dd")
            : filterData.range_date.from &&
              format(filterData.range_date.from, "yyyy-MM-dd")
        : filterData.recurring_period === "weekly"
          ? format(filterWeekly.from, "yyyy-MM-dd")
          : format(filterMonthly.from, "yyyy-MM-dd"),
    end_date:
      currentTab === "list-view"
        ? filterData.list_period === "all"
          ? undefined
          : filterData.list_period === "daily"
            ? filterData.from_date && format(filterData.from_date, "yyyy-MM-dd")
            : filterData.range_date.to &&
              format(filterData.range_date.to, "yyyy-MM-dd")
        : filterData.recurring_period === "weekly"
          ? format(filterWeekly.to, "yyyy-MM-dd")
          : format(filterMonthly.to, "yyyy-MM-dd"),
  })

  const { data: flightRecurringData, isLoading: isLoadingRecurring } =
    useRecurringFlightList({
      ...paginationDetails,
      ...sortingDetails,
      start_date:
        currentTab === "list-view"
          ? filterData.list_period === "all"
            ? undefined // format(new Date(), "yyyy-MM-dd") // filter by today
            : filterData.list_period === "daily"
              ? filterData.from_date &&
                format(filterData.from_date, "yyyy-MM-dd")
              : filterData.range_date.from &&
                format(filterData.range_date.from, "yyyy-MM-dd")
          : filterData.recurring_period === "weekly"
            ? format(filterWeekly.from, "yyyy-MM-dd")
            : format(filterMonthly.from, "yyyy-MM-dd"),
      end_date:
        currentTab === "list-view"
          ? filterData.list_period === "all"
            ? undefined
            : filterData.list_period === "daily"
              ? filterData.from_date &&
                format(filterData.from_date, "yyyy-MM-dd")
              : filterData.range_date.to &&
                format(filterData.range_date.to, "yyyy-MM-dd")
          : filterData.recurring_period === "weekly"
            ? format(filterWeekly.to, "yyyy-MM-dd")
            : format(filterMonthly.to, "yyyy-MM-dd"),
    })

  const { mutateAsync: createFlight, isPending } = useCreateFlight()
  const { mutateAsync: updateFlight, isPending: isPendingUpdate } =
    useUpdateFlight()

  const { data: aircraftTypeList } = useAircraftTypes()
  const { mutateAsync: deleteFlight } = useDeleteFlight()

  const { data: aircraftsList, generateTailName } = useAircrafts({
    page: 1,
    page_size: 999,
  })

  const aircraftTailNumbers = aircraftsList?.data.flatMap((list) =>
    list.aircraft_tail_numbers
      .filter((tail) => !tail.is_deleted)
      .map((tail) => ({
        value: String(tail.id),
        label: generateTailName(list, tail.tail_number),
      }))
  )

  const findDays = (data: string[], key: string): boolean => {
    return (data && data.includes(key)) || false
  }

  const leadingZero = (val: number, count: number) => {
    return String(val).padStart(count, "0")
  }

  const reformatDays = (data: Flight) => {
    const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]

    return days.filter((day) => data[day as keyof Flight])
  }

  const openDetailFlight = (data: Flight) => {
    setSelectedData(data)
    if (data) {
      setModalType("edit")
      // if this recurring show a popup
      if (data.recurring_flight_id) {
        setRecurringSelection(true)
      } else {
        setOpenModal(true)
      }
    } else {
      setOpenModal(true)
    }
  }

  const handleDeleteFlight = async (data: Flight) => {
    if (data) {
      await deleteFlight(
        { id: data.id },
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

  const onOpenChange = useCallback((open: boolean) => {
    setOpenModal(open)
  }, [])

  const createButtonFlight = (
    <Button
      size={"sm"}
      variant={"button-primary"}
      className="p-2 text-xs"
      onClick={() => {
        setOpenModal(true)
        setModalType("create")
      }}
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
      // onClick={() => setOpenModalRecurring(true)}
      onClick={() => {
        setOpenModal(true)
        setModalType("create")
      }}
      style={{ fontSize: "0.875rem" }}
    >
      <PlusIcon className="mr-2 size-4" />
      Create Recurring Flight
    </Button>
  )

  const tableState = useCallback(async ({ pagination }: any) => {
    setPagination(pagination)
  }, [])

  const columns = listViewColumns({
    onRowClick: openDetailFlight,
    onDelete: onShowDelete,
    aircraftOptions: aircraftTailNumbers || [],
    onChangeTailNumber: async (data) => {
      if (!data) return
      const { ID, ...rest } = data
      if (ID) await updateFlight({ ...rest, id: ID })
    },
  })

  const recurringColumns = useRecurringColumns({
    aircraftOptions: aircraftTailNumbers || [],
  })

  // this temporary sorting in client side, if  nested sorting in BE ready it can be removed.
  const flights =
    flightData &&
    flightData.data
      .map((flight) => {
        const departureDatetime = new Date(flight.departure_date)
        let hour = flight.departure_hour

        if (flight.departure_period === "PM" && hour < 12) {
          hour += 12
        } else if (flight.departure_period === "AM" && hour === 12) {
          hour = 0
        }

        departureDatetime.setHours(hour)
        departureDatetime.setMinutes(flight.departure_minute)

        return {
          ...flight,
          departureDatetime,
        }
      })
      .sort((a, b) => {
        if (sorting[0].desc)
          b.departureDatetime.getTime() - a.departureDatetime.getTime()
        return a.departureDatetime.getTime() - b.departureDatetime.getTime()
      })

  console.log({ flights })

  return (
    <>
      <PageContainer>
        <Tabs
          value={currentTab}
          onValueChange={setCurrentTab}
          defaultValue="list-view"
          className="w-full"
        >
          <TabsContent value="list-view" className="mt-0">
            <DataTable
              showToolbarOnlyOnHover={true}
              columns={columns}
              data={isLoading || !flights ? [] : flights}
              pageSize={10}
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
                      name="list_period"
                      type="select"
                      defaultValue="daily"
                      className="h-8 w-40"
                      selectOptions={[
                        {
                          label: "All Flights",
                          value: "all",
                        },
                        {
                          label: "Daily",
                          value: "daily",
                        },
                        {
                          label: "Custom Range",
                          value: "range",
                        },
                      ]}
                    />
                    {filterData.list_period === "daily" && (
                      <InputSwitch
                        name="from_date"
                        type="date"
                        className="h-8 w-36"
                        disabledMatcher={(date) => false}
                      />
                    )}
                    {filterData.list_period === "range" && (
                      <InputSwitch
                        name="range_date"
                        type="date"
                        // enable all date
                        disabledMatcher={(date) => false}
                        className="h-8 w-56"
                        mode="range"
                      />
                    )}
                  </Form>
                </TabsList>
              }
              pageCount={
                isLoading ? 1 : (flightData && flightData.total_pages) || 1
              }
              manualPagination={true}
              tableState={tableState}
              menuId="flight-master-list-view"
              isCanExport={true}
              onExport={() =>
                onExport({
                  data: flightData && flightData.data,
                  filename: "Flightdata",
                })
              }
            />
          </TabsContent>

          <TabsContent value="create-recurring-flight" className="mt-0">
            <DataTable
              showToolbarOnlyOnHover={true}
              columns={recurringColumns}
              data={
                isLoadingRecurring
                  ? []
                  : (flightRecurringData && flightRecurringData.data) || []
              }
              onRowClick={openDetailFlight}
              pageSize={10}
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
                    style={{ fontSize: "0.875rem" }}
                  >
                    <LoopIcon className="mr-2 size-4" />
                    Recurring Flights
                  </TabsTrigger>
                  <Form {...filtersHookForm}>
                    <InputSwitch
                      name="recurring_period"
                      type="select"
                      defaultValue="weekly"
                      className=""
                      selectOptions={[
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
                    {filterData.recurring_period === "weekly" && (
                      <WeeklyDateStepper
                        value={filterWeekly}
                        onChange={setFilterWeekly}
                      />
                    )}
                    {filterData.recurring_period === "monthly" && (
                      <MonthlyDateStepper
                        value={filterMonthly}
                        onChange={setFilterMonthly}
                      />
                    )}
                  </Form>
                </TabsList>
              }
              pageCount={
                isLoading
                  ? 1
                  : (flightRecurringData && flightRecurringData.total_pages) ||
                    1
              }
              manualPagination={true}
              tableState={tableState}
              menuId="flight-master-recurring-view"
            />
          </TabsContent>
        </Tabs>
      </PageContainer>
      <NewFlightModal
        data={selectedData}
        open={openModal}
        mode={modalType}
        onOpenChange={onOpenChange}
        resetData={setSelectedData}
        selectedFlights={selectionFlight}
      />

      <AlertDialog
        open={recurringSelection}
        onOpenChange={setRecurringSelection}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Recurring Flight</AlertDialogTitle>
          </AlertDialogHeader>
          <RadioGroup
            value={selectionFlight}
            onValueChange={(val) => setSelectionFlight(val as selectionFlight)}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="one" id="one" />
              <Label htmlFor="one">This Flight</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="from" id="from" />
              <Label htmlFor="from">This and following Flights</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All Flight</Label>
            </div>
          </RadioGroup>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant={"button-primary"}
              onClick={() => {
                setRecurringSelection(false)
                setOpenModal(true)
              }}
            >
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
              This will delete{" "}
              {deleteConfirm && `${deleteConfirm?.flight_number}`}
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
