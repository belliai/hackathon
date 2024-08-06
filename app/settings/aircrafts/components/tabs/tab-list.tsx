import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlaneIcon, ScrollTextIcon } from "lucide-react"

const AircraftTabsList = (
  <TabsList className="gap-2 bg-transparent p-0">
    <TabsTrigger
      className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
      value="tail-numbers"
    >
      <ScrollTextIcon className="mr-2 size-4" />
      Tail Numbers
    </TabsTrigger>
    <TabsTrigger
      className="h-8 border border-secondary data-[state=active]:border-muted-foreground/40 data-[state=active]:bg-secondary"
      value="aircraft-types"
    >
      <PlaneIcon className="mr-2 size-4" />
      Aircraft Types
    </TabsTrigger>
  </TabsList>
)

export default AircraftTabsList