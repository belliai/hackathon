import { ControllerRenderProps } from "react-hook-form"

import { FormControl } from "./form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

type SelectInputProps = ControllerRenderProps & {
  label?: string
  placeholder?: string
  selectOptions: { value: string; label: string }[]
}

export default function SelectInput({
  value,
  onChange,
  selectOptions,
}: SelectInputProps) {
  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {selectOptions?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
