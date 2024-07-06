"use client"

import { useState } from "react"
import {
  flightMasterFormSchema,
  FlightMasterFormValue,
} from "@/schemas/flight-master/flight-master"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { toast } from "@/components/ui/use-toast"
import BalanceCard from "@/components/dashboard/balance-card"
import DimensionsCard from "@/components/dashboard/dimensions-card"
import CreateEditModal from "@/components/dashboard/modal/create-edit-modal/create-edit-modal"
import OrderSummaryCard from "@/components/dashboard/order-summary-card"
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

  const { mutateAsync: createFlight, isPending } = useCreateFlight()
  const { mutateAsync: updateFlight, isPending: isPendingUpdate } =
    useUpdateFlight()
  const { data: flightData, isLoading } = useFlightList({
    page: 1,
    page_size: 10,
  })
  const { data: aircraftTypeList } = useAircraftTypes()
  const { mutateAsync: deleteFlight } = useDeleteFlight()

  const sectionedHookForm = useForm({
    defaultValues: formDefaultValues,
    resolver: zodResolver(flightMasterFormSchema),
  })

  const sectionedFormFields = [
    {
      label: "Booking Details",
      value: "booking-details",
      icon: <SquarePenIcon />,
      content: <FlightMasterForm hookForm={sectionedHookForm} />,
    },
    {
      label: "Consignment Details",
      value: "consignment-details",
      icon: <PlaneIcon />,
      FormFields: [],
    },
    {
      label: "Shipper Details",
      value: "shipper-details",
      icon: <UserIcon />,
      formFields: [],
    },
    {
      label: "Process Rates",
      value: "process-rates",
      icon: <PackageIcon />,
      formFields: [],
    },
  ]

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

  return (
    <>
      <PageContainer className="gap-6">
        <PageHeader title="Flight Master" />
        <DataTable
          columns={columns(openDetailFlight, onShowDelete)}
          data={flightData ? flightData.data : []}
          onRowClick={openDetailFlight}
          extraToolbarButtons={[
            {
              label: "Create New Flight",
              icon: Plus,
              variant: "button-primary",
              onClick: () => setOpenModal(true),
            },
          ]}
        />
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
        tabItems={sectionedFormFields}
        rightComponent={
          // This is a dummy component, will replace once there is a use for this
          <>
            <div className="space-y-4">
              <OrderSummaryCard
                bookingType="37ce1cdf-cd24-4a6a-895e-5e513b175ce6"
                partnerPrefix="d3139164-9222-4a76-b1fe-c076314d5542"
                axb="112233"
                origin="9bb940c1-0bc2-417a-a975-6811d5c0b7ea"
                destination="5de641cd-f699-4fcd-9efc-ea9f6db039a2"
                commodityCode="5ec17d70-3da8-4c32-ac15-8b2eaeae162f"
              />
              <DimensionsCard />
              <BalanceCard />
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
                isLoading={isPending}
                variant={"button-primary"}
                className="w-full"
                type="submit"
              >
                Save Reservation
              </Button>
            </div>
          </>
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
