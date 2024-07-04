import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Separator } from "../ui/separator"

const pendingAtOrigin = [
  { name: "New Order Created", val: "10" },
  { name: "Pickup Warehouse Reached", val: "5" },
  { name: "Mother Bag Generated", val: "5" },
  { name: "Master Bag Generated", val: "5" },
  { name: "Return to Shipper", val: "2" },
  { name: "Offload", val: "1" },
  { name: "Total", val: "18" },
]

const pendingOriginAirport = [
  { name: "Warehouse to Airport", val: "7" },
  { name: "Pickup Airport Reached", val: "5" },
  { name: "Airport to Airport", val: "6" },
  { name: "Total", val: "18" },
]

const pendingAtDestination = [
  { name: "In Flight-Final destination", val: "4" },
  { name: "Destination Airport Reached", val: "3" },
  { name: "Delivered", val: "6" },
  { name: "Total", val: "13" },
]

const renderTable = (title: string, rows: { name: string; val: string }[]) => (
  <Card className="mb-5 rounded-md bg-card/30">
    <CardHeader className="px-6 py-3">
      <CardTitle className="text-xl font-bold">{title}</CardTitle>
    </CardHeader>
    <Separator />
    <CardContent>
      <dl className="grid grid-cols-2 gap-5">
        {rows.map((item) => (
          <div key={item.name} className="px-6 py-3">
            <dt className="truncate text-sm font-medium leading-none text-muted-foreground">
              {item.name}
            </dt>
            <dd className="text-3xl font-extrabold">{item.val}</dd>
          </div>
        ))}
      </dl>
    </CardContent>
  </Card>
)

export default function PendingDeliveriesD2D() {
  return (
    <div className="text-center">
      <h2 className="mb-2 text-xl font-semibold">Deliveries Pending</h2>
      <div className="flex gap-1">
        <div className="w-full md:w-1/3">
          {renderTable("Pending at Origin", pendingAtOrigin)}
        </div>
        <div className="w-full md:w-1/3">
          {renderTable("Pending at Origin Airport", pendingOriginAirport)}
        </div>
        <div className="w-full md:w-1/3">
          {renderTable("Pending at Destination WH", pendingAtDestination)}
        </div>
      </div>
    </div>
  )
}
