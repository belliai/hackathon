"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import {
  flightMasterFormSchema,
  FlightMasterFormValue,
} from "@/schemas/flight-master/flight-master"
import { zodResolver } from "@hookform/resolvers/zod"
import { PaginationState } from "@tanstack/react-table"
import {
  PackageIcon,
  PlaneIcon,
  Plus,
  ScrollTextIcon,
  SquarePenIcon,
  UserIcon,
} from "lucide-react"
import moment from "moment"
import { useForm } from "react-hook-form"

import { useAircraftTypes } from "@/lib/hooks/aircrafts/aircraft-types"
import {
  useCreateFlight,
  useDeleteFlight,
  useFlightList,
  useUpdateFlight,
} from "@/lib/hooks/flight-master/flight-master"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import CreateEditModal from "@/components/dashboard/modal/create-edit-modal/create-edit-modal"
import { DataTable } from "@/components/data-table/data-table"
import PageContainer from "@/components/layout/PageContainer"
import PageHeader from "@/components/layout/PageHeader"

import { columns } from "./components/column"
import FlightMasterForm from "./components/FlightMasterForm"

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
  uom: "",
  sector: "",
  status: "",
  flightType: "",
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

export default function Page() {
  const [openModal, setOpenModal] = useState<string | boolean>(false)
  const [deleteConfirm, setDeleteConfirm] = useState<Flight | null>(null)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

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
    resolver: zodResolver(flightMasterFormSchema),
  })

  const findDays = (data: string[], key: string): boolean => {
    return data.includes(key)
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
      mon: findDays(param.frequencyItems, "mon"),
      tue: findDays(param.frequencyItems, "tue"),
      wed: findDays(param.frequencyItems, "wed"),
      thu: findDays(param.frequencyItems, "thu"),
      fri: findDays(param.frequencyItems, "fri"),
      sat: findDays(param.frequencyItems, "sat"),
      sun: findDays(param.frequencyItems, "sun"),
    }

    if (typeof openModal === "string") {
      await updateFlight(
        { id: openModal, ...payload },
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
      (item: any) => item.aircraft_type === data.aircraft.aircraft_type
    )

    const formattedPayload: FlightDetailFormValues = {
      flightNo: data.flight_no,
      source: data.source.ID,
      destination: data.destination.ID,
      fromDate: new Date(data.from_date),
      toDate: new Date(data.to_date),
      frequencyItems: reformatDays(data) || [],
      aircraftType: aircraftTypeId?.id,
      tailNo: data.tail.ID,
      capacity: data.capacity.toString(),
      uom: data.uom.ID,
      sector: data.sector.ID,
      status: data.status.ID,
      flightType: data.flight_type.ID,
      deptTime: {
        deptDay: data.departure_d.toString(),
        deptHour: data.departure_h.toString(),
        deptMinute: data.departure_m.toString(),
      },
      arrivalTime: {
        arrivalDay: data.arrival_d.toString(),
        arrivalHour: data.arrival_h.toString(),
        arrivalMinute: data.arrival_m.toString(),
      },
    }

    return formattedPayload
  }

  const openDetailFlight = (data: Flight) => {
    const formValue = reformatDetailToForm(data)
    setOpenModal(data.ID)
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

  const tableState = useCallback(async ({ pagination }: any) => {
    console.log(pagination)
    setPagination(pagination)
  }, [])

  return (
    <>
      <PageContainer className="gap-6">
        <PageHeader title="Flight Master" />
        <Tabs defaultValue="list-view" className="w-full">
          <TabsList>
            <TabsTrigger value="list-view">List View</TabsTrigger>
            <TabsTrigger value="calendar-view">Calendar View</TabsTrigger>
            <TabsTrigger value="create-recurring-flight">
              Create Recurring Flight
            </TabsTrigger>
          </TabsList>
          <TabsContent value="list-view">
            <div className="mt-4">
              <DataTable
                columns={columns(openDetailFlight, onShowDelete)}
                data={isLoading ? [] : (flightData && flightData.data) || []}
                onRowClick={openDetailFlight}
                extraToolbarButtons={[
                  {
                    label: "Create New Flight",
                    icon: Plus,
                    variant: "button-primary",
                    onClick: () => setOpenModal(true),
                  },
                ]}
                pageCount={
                  isLoading ? 1 : (flightData && flightData.total_pages) || 1
                }
                manualPagination={true}
                tableState={tableState}
              />
            </div>
          </TabsContent>
          <TabsContent value="calendar-view"></TabsContent>
          <TabsContent value="create-recurring-flight"></TabsContent>
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