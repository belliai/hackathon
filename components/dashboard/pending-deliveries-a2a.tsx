import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";

const pendingAtOrigin = [
  { name: "New Order Created", val: "10" },
  { name: "Pickup Airport Reached", val: "5" },
  { name: "Return to Shipper", val: "2" },
  { name: "Offload", val: "1" },
  { name: "Total", val: "18" },
];

const transitStation = [
  { name: "Airport to Airport", val: "7" },
  { name: "Total", val: "7" },
];

const pendingAtDestination = [
  { name: "In Flight-Final destination", val: "4" },
  { name: "Destination Airport Reached", val: "3" },
  { name: "Delivered", val: "6" },
  { name: "Total", val: "13" },
];

const renderTable = (title: string, rows: { name: string, val: string }[]) => (
  <Card className=" rounded-md bg-card/30 mb-5">
    <CardHeader className="py-3 px-6">
      <CardTitle className="text-xl font-bold">{title}</CardTitle>
    </CardHeader>
    <Separator />
    <CardContent>
      <dl className="grid grid-cols-2 gap-5">
        {rows.map((item) => (
          <div key={item.name} className="py-3 px-6">
            <dt className="truncate leading-none text-muted-foreground text-sm font-medium">
              {item.name}
            </dt>
            <dd className="text-3xl font-extrabold">{item.val}</dd>
          </div>
        ))}
      </dl>
    </CardContent>
  </Card>
);

export default function PendingDeliveriesA2A() {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-2">Deliveries Pending</h2>
      <div className="flex gap-1">
        <div className="w-full md:w-1/3">{renderTable("Pending at Origin", pendingAtOrigin)}</div>
        <div className="w-full md:w-1/3">{renderTable("Transit Station", transitStation)}</div>
        <div className="w-full md:w-1/3">{renderTable("Pending at Destination", pendingAtDestination)}</div>
      </div>
    </div>
  );
}