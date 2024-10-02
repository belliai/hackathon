import { BoxesIcon, ClipboardListIcon, TagIcon } from "lucide-react"

import { Flight } from "@/types/flight-master/flight-master"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import BookingListTab from "./tab-booking-list"
import LoadCapacityTab from "./tab-load-capacity"

type FlightDetailTabsProps = {
  flight?: Flight | null
  onOpenChange: (open: boolean) => void
}

export default function FlightDetailTabs(props: FlightDetailTabsProps) {
  const { flight } = props
  return (
    <Tabs
      className="mt-3 flex flex-1 flex-col space-y-2"
      defaultValue="booking-list"
    >
      <TabsList className="justify-start gap-2 bg-transparent p-0">
        <TabsTrigger
          className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
          value="booking-list"
        >
          <ClipboardListIcon className="mr-2 size-4" />
          Booking List
        </TabsTrigger>
        <TabsTrigger
          className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
          value="load-capacity"
        >
          <BoxesIcon className="mr-2 size-4" />
          Load Capacity
        </TabsTrigger>
        <TabsTrigger
          disabled
          className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
          value="freight-rates"
        >
          <TagIcon className="mr-2 size-4" />
          Freight Rates
        </TabsTrigger>
      </TabsList>
      <TabsContent
        className="flex-1 flex-col justify-between data-[state=active]:flex"
        value="booking-list"
      >
        <BookingListTab flight={flight} onOpenChange={props.onOpenChange} />
      </TabsContent>
      <TabsContent
        className="flex-1 flex-col justify-between data-[state=active]:flex"
        value="load-capacity"
      >
        <LoadCapacityTab flight={flight} onOpenChange={props.onOpenChange} />
      </TabsContent>
    </Tabs>
  )
}
