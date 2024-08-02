import {
  BoxesIcon,
  BoxIcon,
  DoorClosedIcon,
  FileSlidersIcon,
  LucideIcon,
  PackageIcon,
  PlaneIcon,
} from "lucide-react"

export type TabTrigger = {
  label: string
  icon: LucideIcon
  key: string
  defaultOpen?: true
}

export const generalFieldsTabTriggers: TabTrigger[] = [
  {
    label: "Cargo Capacity",
    icon: BoxesIcon,
    key: "cargo-capacity",
    defaultOpen: true,
  },
  {
    label: "Max Per Piece",
    icon: PackageIcon,
    key: "max-per-piece",
  },
  {
    label: "Aircraft Details",
    icon: FileSlidersIcon,
    key: "aircraft-details",
  },
  {
    label: "Door Dimensions",
    icon: DoorClosedIcon,
    key: "door-closed",
  },
  {
    label: "Volume",
    icon: BoxIcon,
    key: "volume",
  },
]

export const aircraftFormTabsTrigger: TabTrigger = {
  label: "Aircraft Type",
  icon: PlaneIcon,
  key: "aircraft-type",
}

export const tailNumberFormTabsTrigger: TabTrigger = {
  label: "Tail Number",
  icon: PlaneIcon,
  key: "tail-numbers",
}
