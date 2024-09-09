import { ReactNode } from "react"

import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select"

type DataTableSelectProps = {
  value: string
  placeholder?: string
  onValueChange: (val: any) => void
  options: { label: string; value: string }[]
  className?: string
  children: ReactNode
}

const DataTableSelect = (props: DataTableSelectProps) => {
  return (
    <Select onValueChange={props.onValueChange} value={String(props.value)}>
      {props.children}
      <SelectContent className={cn("bg-zinc-900", props.className)}>
        <SelectGroup>
          {props.options.map((filter, id) => {
            return (
              <SelectItem className="text-xs" key={id} value={filter.value}>
                {filter.label}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default DataTableSelect
