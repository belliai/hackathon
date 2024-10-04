import { useEffect, useMemo, useState } from "react"
import { format } from "date-fns"
import { DownloadIcon, SaveIcon } from "lucide-react"
import { useForm } from "react-hook-form"

import { Flight } from "@/types/flight-master/flight-master"
import { Order } from "@/types/orders"
import {
  useFlightStatuses,
  usePartialUpdateFlight,
} from "@/lib/hooks/flight-master/flight-master"
import { useOrders } from "@/lib/hooks/orders"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { useBookingContext } from "@/components/dashboard/BookingContext"
import NewOrderSideModal from "@/components/dashboard/new-order-side-modal"
import InputSwitch from "@/components/form/InputSwitch"

type LoadCapacityTabProps = {
  flight?: Flight | null
  onOpenChange: (open: boolean) => void
}

export default function BookingListTab(props: LoadCapacityTabProps) {
  const { flight } = props

  const { data: flightStatusesData } = useFlightStatuses()

  const { mutateAsync: updateFlight } = usePartialUpdateFlight()

  const { data: ordersData } = useOrders({ page: 1, page_size: 4 })

  const orders = ordersData?.data.flatMap((item) => item.object) ?? []

  const form = useForm<{ status: string; remarks: string[] }>({
    defaultValues: { status: flight?.status.id ?? "", remarks: [""] },
  })

  const { setSelectedBooking } = useBookingContext()

  useEffect(() => {
    flight &&
      form.reset({ status: flight.status.id, remarks: orders.map(() => "") })
  }, [flight])

  const flightStatusOptions = [
    ...(flightStatusesData?.map((status) => ({
      label: status.status,
      value: status.id,
    })) ?? []),
    { label: "No Status", value: "" },
  ]

  const capacityPercentage = useMemo(() => {
    const actual = flight?.specification.weight_capacity ?? 0
    const maximum = flight?.specification.total_weight_capacity ?? 0
    return ((actual / maximum) * 100).toFixed(1)
  }, [flight])

  const [orderFormOpen, setOrderFormOpen] = useState(false)

  const openModal = (data: Order) => {
    console.error("opening modal from airwaybill", data)
    setSelectedBooking(data)
    setOrderFormOpen(true)
  }

  const onOpenChange = (open: boolean) => {
    setOrderFormOpen(open)
  }

  const handleSubmit = () => {
    if (!flight) return
    const data = form.getValues()
    updateFlight(
      {
        id: flight?.id,
        status_id: data.status,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success!",
            description: "Flight updated",
          })
        },
      }
    )
  }

  return (
    <>
      <Form {...form}>
        <div className="mt-3 space-y-4">
          <div className="inline-flex w-full items-stretch justify-stretch gap-4">
            <div className="flex-1">
              <InputSwitch
                className="!border !border-border"
                name="status"
                type="combobox"
                selectOptions={flightStatusOptions}
                label="Flight Status"
              />
            </div>
            <div className="flex-1 space-y-1">
              <Label className="text-xs font-semibold text-muted-foreground">
                Capacity
              </Label>
              <div className="relative h-9 w-full overflow-hidden rounded-md border border-button-primary/50 bg-button-primary/10">
                <div
                  className="h-full border-r-2 border-dashed border-button-primary/50 bg-button-primary/20"
                  style={{ width: `${capacityPercentage}%` }}
                />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-semibold text-primary/80">
                  {capacityPercentage}%
                </span>
              </div>
            </div>
          </div>
          <div className="group">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Airway Bill</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Origin</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Pieces</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Volume</TableHead>
                  <TableHead>Charged Weight</TableHead>
                  <TableHead>Dimensions</TableHead>
                  <TableHead>Commodity</TableHead>
                  <TableHead>SHC</TableHead>
                  <TableHead>Shipment Status</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow
                    key={order.ID}
                    onClick={() => openModal(order)}
                    className="cursor-pointer whitespace-nowrap"
                  >
                    <TableCell>{order.awb}</TableCell>
                    <TableCell>{order.customer?.name}</TableCell>
                    <TableCell>{order.origin.airport_code}</TableCell>
                    <TableCell>{order.destination.airport_code}</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>{order.volume_kg}</TableCell>
                    <TableCell>{order.volume_kg}</TableCell>
                    <TableCell>{order.ch_weight_kg}</TableCell>
                    <TableCell>20x10x5</TableCell>
                    <TableCell>{order.commodity_code?.name}</TableCell>
                    <TableCell className="inline-flex items-center gap-1">
                      {order.special_handling_codes.map((shc) => (
                        <Badge key={shc.id} variant={"chip-primary"}>
                          {shc.code}
                        </Badge>
                      ))}
                    </TableCell>
                    <TableCell>
                      {order.status ? order.status.name : "No Status"}
                    </TableCell>
                    <TableCell>
                      <InputSwitch
                        onClick={(e) => e.stopPropagation()}
                        name={`remarks.${index}`}
                        type="text"
                        placeholder="input remarks..."
                        className="h-fit min-w-32 border-0 bg-transparent px-0 py-0 focus-visible:ring-0"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div>
            <span className="text-xs font-light text-muted-foreground">
              Last Updated at{" "}
              {!!flight?.updated_at
                ? format(new Date(flight.updated_at), "EEE, dd-MM-yyyy")
                : "-"}
            </span>
          </div>
        </div>
        <div className="inline-flex items-center justify-end gap-2">
          <Button variant={"secondary"}>
            <DownloadIcon className="mr-2 size-4" />
            Export
          </Button>
          <Button onClick={handleSubmit}>
            <SaveIcon className="mr-2 size-4" />
            Save
          </Button>
        </div>
      </Form>
      <NewOrderSideModal
        onOpenChange={onOpenChange}
        open={orderFormOpen}
        mode={"edit"}
      />
    </>
  )
}
