import { ReactNode } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

type DataTableSelectProps = {
  value: string
  placeholder?: string
  onValueChange: (val: string) => void
  options: { label: string; value: string }[]
  className?: string
  children: ReactNode
}

const DataTableSelect = (props: DataTableSelectProps) => {
  return (
    <Select onValueChange={props.onValueChange} value={String(props.value)}>
      {props.children}
      <SelectContent >
        <SelectGroup>
          {props.options.map((filter, id) => {
            return (
              <SelectItem key={id} value={filter.value}>
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
