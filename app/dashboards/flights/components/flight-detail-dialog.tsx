import Link from "next/link"
import { format } from "date-fns"
import {
  ArrowRightIcon,
  CalendarIcon,
  ExpandIcon,
  PlaneIcon,
} from "lucide-react"

import { Flight } from "@/types/flight-master/flight-master"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import FlightDetailTabs from "./flight-detail-tabs"

type FlightDetailDialogProps = {
  flight?: Flight | null
  onOpenChange: (open: boolean) => void
}

export default function FlightDetailDialog(props: FlightDetailDialogProps) {
  const { flight } = props

  return (
    <Sheet open={!!flight} onOpenChange={props.onOpenChange}>
      <SheetContent className="flex !min-w-[1000px] flex-row gap-0 py-0">
        <div className="flex !min-w-[600px] flex-col border-r py-6 pr-6">
          <SheetHeader className="space-y-3">
            <div className="inline-flex items-center justify-between">
              <div className="inline-flex items-center gap-3">
                <DialogTitle>{flight?.flight_number}</DialogTitle>
                <Badge
                  className="mt-0.5 inline-flex items-center gap-1.5"
                  variant={"chip-secondary"}
                >
                  <span>{flight?.origin.airport_code}</span>
                  <ArrowRightIcon className="size-2" />
                  <span>{flight?.destination.airport_code}</span>
                </Badge>
              </div>
              <Link href={`/dashboards/flights/${flight?.id}`}>
                <Button className="mt-0.5" variant={"ghost"} size={"fit"}>
                  <ExpandIcon className="size-4 text-muted-foreground" />
                </Button>
              </Link>
            </div>
            <div className="inline-flex items-center gap-2">
              <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <CalendarIcon className="size-3.5" />
                <span>
                  {flight &&
                    format(new Date(flight.departure_date), "EEE, dd-MM-yyyy")}
                </span>
                <span>
                  {flight?.departure_hour}:{flight?.departure_minute}{" "}
                  {flight?.departure_period}
                </span>
              </div>
              <Separator orientation="vertical" />
              <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <PlaneIcon className="size-3.5" />
                <span>
                  {flight?.tail.tail_number} - {flight?.tail.manufacturer.name}{" "}
                  {flight?.tail.aircraft_type.name}{" "}
                  {flight?.tail.version.version}
                </span>
              </div>
            </div>
          </SheetHeader>
          <FlightDetailTabs flight={flight} onOpenChange={props.onOpenChange} />
        </div>
        <div className="!min-w-[400px] py-6 pl-6">
          <SheetHeader>
            <SheetTitle className="text-muted-foreground">
              Flight Properties
            </SheetTitle>
          </SheetHeader>
        </div>
      </SheetContent>
    </Sheet>
  )
}
