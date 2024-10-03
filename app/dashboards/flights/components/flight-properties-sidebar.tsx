import { useState } from "react"
import { flightMasterFormSchema } from "@/schemas/flight-master/flight-master"
import { getDefaults } from "@/schemas/utils"
import { format } from "date-fns"
import {
  ArrowRightIcon,
  EditIcon,
  PlaneIcon,
  PlaneLandingIcon,
  PlaneTakeoffIcon,
  TimerIcon,
} from "lucide-react"

import { Flight } from "@/types/flight-master/flight-master"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import NewFlightModal from "@/app/settings/flights/components/new-flight-form"

type FlightPropertiesSidebarProps = {
  flight?: Flight | null
  onRefetchData: VoidFunction
}

const schemas = flightMasterFormSchema
const initialValues = getDefaults(schemas)

export default function FlightPropertiesSidebar(
  props: FlightPropertiesSidebarProps
) {
  const { flight } = props

  const [flightFormOpen, setFlightFormOpen] = useState(false)

  return (
    <>
      <div className="space-y-6">
        <div className="inline-flex w-full items-center justify-between">
          <div className="inline-flex items-center gap-3">
            <span className="text-lg font-semibold">
              {flight?.flight_number}
            </span>
            <Badge
              className="inline-flex items-center gap-1.5"
              variant={"chip-primary"}
            >
              <span>{flight?.origin.airport_code}</span>
              <ArrowRightIcon className="size-2" />
              <span>{flight?.destination.airport_code}</span>
            </Badge>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <Button
                onClick={() => setFlightFormOpen(true)}
                variant={"ghost"}
                size={"fit"}
              >
                <EditIcon className="size-4 text-muted-foreground" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit Flight</TooltipContent>
          </Tooltip>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="inline-flex items-center gap-1">
              <PlaneIcon className="size-3 text-muted-foreground" />
              <Label className="text-xs text-muted-foreground">Aircraft</Label>
            </div>
            <div className="inline-flex items-end gap-2">
              <span>{flight?.tail.tail_number}</span>
              <span className="text-sm text-muted-foreground">
                {flight?.tail.manufacturer.name}{" "}
                {flight?.tail.aircraft_type.name} {flight?.tail.version.version}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="inline-flex items-center gap-1">
              <PlaneTakeoffIcon className="size-3 text-muted-foreground" />
              <Label className="text-xs text-muted-foreground">Departure</Label>
            </div>
            <div className="inline-flex items-end gap-2">
              <span className="tabular-nums">
                {flight?.departure_hour}:{flight?.departure_minute}
                {flight?.departure_period.toLowerCase()}
              </span>
              <span className="text-sm text-muted-foreground">
                {flight &&
                  format(new Date(flight.departure_date), "EEE, dd MMM yyyy")}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="inline-flex items-center gap-1">
              <PlaneLandingIcon className="size-3 text-muted-foreground" />
              <Label className="text-xs text-muted-foreground">Arrival</Label>
            </div>
            <div className="inline-flex items-end gap-2">
              <span className="tabular-nums">{flight?.arrival_time}</span>
              <span className="text-sm text-muted-foreground">
                {flight &&
                  format(new Date(flight.departure_date), "EEE, dd MMM yyyy")}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="inline-flex items-center gap-1">
              <TimerIcon className="size-3 text-muted-foreground" />
              <Label className="text-xs text-muted-foreground">
                Flight Duration
              </Label>
            </div>
            <div className="inline-flex items-end gap-2">
              <span className="tabular-nums">
                {flight?.flight_duration_hour}h {flight?.flight_duration_minute}
                m
              </span>
            </div>
          </div>
        </div>
      </div>
      <NewFlightModal
        data={flight}
        onSaved={props.onRefetchData}
        open={flightFormOpen}
        mode={"edit"}
        onOpenChange={() => setFlightFormOpen(false)}
        resetData={() => setFlightFormOpen(false)}
        selectedFlights={"one"}
      />
    </>
  )
}
