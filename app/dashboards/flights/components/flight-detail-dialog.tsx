"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import {
  ArrowRightIcon,
  CalendarIcon,
  ExpandIcon,
  PanelRightClose,
  PlaneIcon,
} from "lucide-react"

import { Flight } from "@/types/flight-master/flight-master"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet"

import FlightDetailTabs from "./flight-detail-tabs"

type FlightDetailDialogProps = {
  flight?: Flight | null
  onOpenChange: (open: boolean) => void
}

export default function FlightDetailDialog(props: FlightDetailDialogProps) {
  const { flight } = props
  const [width, setWidth] = useState(800)
  const [isResizing, setIsResizing] = useState(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const newWidth = window.innerWidth - e.clientX
      setWidth(Math.max(newWidth, 500)) // Set a minimum width of 600px
    }
  }

  const handleMouseUp = () => {
    setIsResizing(false)
  }

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    } else {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing])

  return (
    <Sheet open={!!flight} onOpenChange={props.onOpenChange}>
      <SheetContent
        hideCloseButton
        className="min-h-[100dvh]"
        style={{ minWidth: `${width}px` }}
      >
        <div
          onMouseDown={handleMouseDown}
          className="resizer w-1 cursor-col-resize"
          style={{ position: "absolute", left: 0, top: 0, bottom: 0 }}
        />
        <div className="ml-1 flex h-full w-full flex-col">
          <SheetHeader className="mb-3 space-y-3">
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
              <div className="inline-flex items-center justify-end gap-2">
                <Link
                  href={`/dashboards/flights/${flight?.id}?section=${flight?.flight_number}`}
                >
                  <Button className="mt-0.5" variant={"ghost"} size={"fit"}>
                    <ExpandIcon className="size-4 text-muted-foreground" />
                  </Button>
                </Link>
                <div>
                  <Button
                    className="mt-0.5"
                    variant={"ghost"}
                    size={"fit"}
                    onClick={() => props.onOpenChange(false)}
                  >
                    <PanelRightClose className="size-5 text-muted-foreground" />
                  </Button>
                </div>
              </div>
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
      </SheetContent>
    </Sheet>
  )
}
