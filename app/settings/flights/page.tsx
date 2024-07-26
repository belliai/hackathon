"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { PaginationState } from "@tanstack/react-table"
import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns"
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
import { z } from "zod"

import { Aircraft } from "@/types/aircraft/aircraft"
import {
  CreateFlightMasterPayload,
  CreateRecurringFlightMasterPayload,
  Flight,
} from "@/types/flight-master/flight-master"
import { useAircraftTypes } from "@/lib/hooks/aircrafts/aircraft-types"
import { useAircrafts } from "@/lib/hooks/aircrafts/aircrafts"
import {
  useCreateFlight,
  useDeleteFlight,
  useFlightList,
  useUpdateFlight,
} from "@/lib/hooks/flight-master/flight-master"
import { generateRecurringDates } from "@/lib/utils/date-utils"
import { exportToXlsx, flattenList } from "@/lib/utils/export"
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

import { useListViewColumns } from "./components/column"
import { formFilters, listViewFilters } from "./components/filter"
import FlightMasterForm from "./components/flight-master-form"
import FlightMasterFormRecurring from "./components/flight-master-form-recurring"
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

export default function Page() {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [modalType, setModalType] = useState<"edit" | "create">("create")

  const [openModalRecurring, setOpenModalRecurring] = useState<
    string | boolean
  >(false)
  const [deleteConfirm, setDeleteConfirm] = useState<Flight | null>(null)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const [selectedData, setSelectedData] = useState<Flight | null>(null)

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
  const filtersHookForm = useForm({
    resolver: zodResolver(filtersSchema),
    defaultValues: {
      period: "daily",
      from_date: new Date(),
      range_date: {
        from: new Date(),
        to: new Date(),
      },
    },
  })

  const filterData = filtersHookForm.watch()

  useEffect(() => {}, [filterData])

  const { data: flightData, isLoading } = useFlightList({
    ...paginationDetails,
    start_date:
      filterData.period === "daily"
        ? filterData.from_date && format(filterData.from_date, "yyyy-MM-dd")
        : filterData.range_date.from &&
          format(filterData.range_date.from, "yyyy-MM-dd"),
    end_date:
      filterData.period === "daily"
        ? filterData.from_date && format(filterData.from_date, "yyyy-MM-dd")
        : filterData.range_date.to &&
          format(filterData.range_date.to, "yyyy-MM-dd"),
  })

  const { mutateAsync: createFlight, isPending } = useCreateFlight()
  const { mutateAsync: updateFlight, isPending: isPendingUpdate } =
    useUpdateFlight()

  const { data: aircraftTypeList } = useAircraftTypes()
  const { mutateAsync: deleteFlight } = useDeleteFlight()

  const { data: aircraftsList } = useAircrafts({ page: 1, page_size: 999 })

  const generateTailName = (selectedAircraftType: Aircraft, tail: string) => {
    const tailDetail = selectedAircraftType.aircraft_tail_numbers.find(
      (item) => item.tail_number === tail
    )
    return `${tail} - ${selectedAircraftType?.aircraft_type?.name} (${tailDetail?.status?.name})`
  }

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
    setOpenModal(true)
    if (data) setModalType("edit")
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

  const onExport = (data: any) => {
    const flatData = flattenList(data)
    const todayStr = format(new Date(),"yyyMMddHHmmss")
    exportToXlsx(flatData, "Sheet1", `Flightdata_${todayStr}.xlsx`)
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

  const listViewColumns = useListViewColumns({
    onRowClick: openDetailFlight,
    onDelete: onShowDelete,
    aircraftOptions: aircraftTailNumbers || [],
    onChangeTailNumber: async (data) => {
      if (!data) return
      const { ID, ...rest } = data
      if (ID) await updateFlight({ ...rest, id: ID })
    },
  })

  return (
    <>
      <PageContainer>
        <Tabs defaultValue="list-view" className="w-full">
          <TabsContent value="list-view" className="mt-0">
            <DataTable
              showToolbarOnlyOnHover={true}
              columns={listViewColumns}
              data={isLoading ? [] : (flightData && flightData.data) || []}
              onRowClick={openDetailFlight}
              extraRightComponents={createButtonFlight}
              extraLeftComponents={
                <TabsList className="gap-2 bg-transparent p-0">
                  {/* <TabsTrigger
                    className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
                    value="list-view"
                    style={{ fontSize: "0.875rem" }}
                  >
                    <ListIcon className="mr-2 size-4" />
                    List View
                  </TabsTrigger> */}
                  {/* <TabsTrigger
                    className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
                    value="create-recurring-flight"
                    style={{ fontSize: "0.875rem" }}
                  >
                    <LoopIcon className="mr-2 size-4" />
                    Recurring Flights
                  </TabsTrigger> */}
                  <Form {...filtersHookForm}>
                    <InputSwitch
                      name="period"
                      type="select"
                      defaultValue="daily"
                      className="h-8 w-40"
                      selectOptions={[
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
                    {filterData.period === "daily" && (
                      <InputSwitch
                        name="from_date"
                        type="date"
                        className="h-8 w-36"
                        disabledMatcher={(date) => false}
                      />
                    )}
                    {filterData.period === "range" && (
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
              onExport={() => onExport(flightData && flightData.data)}
            />
          </TabsContent>

          <TabsContent value="create-recurring-flight" className="mt-0">
            {/* <DataTable
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
                </TabsList>
              }
              pageCount={
                isLoading ? 1 : (flightData && flightData.total_pages) || 1
              }
              manualPagination={true}
              tableState={tableState}
              menuId="flight-master-recurring-view"
            /> */}
          </TabsContent>
        </Tabs>
      </PageContainer>
      <NewFlightModal
        data={selectedData}
        open={openModal}
        mode={modalType}
        onOpenChange={onOpenChange}
        resetData={setSelectedData}
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
