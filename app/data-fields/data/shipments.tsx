import {
  FileBox,
  FileBoxIcon,
  Globe,
  MapIcon,
  PlaneTakeoffIcon,
  ReceiptTextIcon,
  Truck
} from "lucide-react"

import BookingType from "../booking-type"
import CommodityCode from "../commodity-code"
import { DataFieldsTab } from "../components/datafields-page-template"
import Location from "../location"
import Status from "../status"
import TransportMethod from "../transport-method"
import TimeZone from "../time-zone"

export const shipmentsTabs: DataFieldsTab[] = [
  {
    name: "Booking Type",
    component: <BookingType />,
    icon: ReceiptTextIcon,
    tooltipId: "aircraft-settings-booking-type",
  },
  {
    name: "Status",
    component: <Status />,
    icon: PlaneTakeoffIcon,
    tooltipId: "aircraft-settings-status",
  },
  {
    name: "Location",
    component: <Location />,
    icon: MapIcon,
    tooltipId: "aircraft-settings-location",
  },
  {
    name: "Commodity Code",
    component: <CommodityCode />,
    icon: FileBoxIcon,
    tooltipId: "aircraft-settings-commodity-code",
  },
  {
    name: "Transport Method",
    component: <TransportMethod />,
    icon: Truck,
    tooltipId: "aircraft-settings-transport-method",
  },
  {
    name: "Time Zone",
    component: <TimeZone />,
    icon: Globe,
    tooltipId: "aircraft-settings-time-zone",
  },
]
