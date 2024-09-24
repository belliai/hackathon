import { ReactNode, useMemo, useState } from "react"
import {
  CalendarClock,
  CalendarIcon,
  Clock3,
  FileDigit,
  FileSymlink,
  Text,
  UserIcon,
} from "lucide-react"

import { OptionWithType } from "@/types/table/filters"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DataTableColumnOption<TData> {
  children: ReactNode
  options: OptionWithType[]
  onValueChange: (val: string) => void
}

export function DataTableColumnOption<TData>({
  ...props
}: DataTableColumnOption<TData>) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{props.children}</PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          filter={(value, search) => {
            if (value.includes(search)) return 1
            return 0
          }}
        >
          <CommandInput placeholder="Search ..." />
          <CommandList>
            <CommandEmpty>No Column found.</CommandEmpty>

            <CommandGroup>
              {props.options.map((option: OptionWithType) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={(currentValue) => {
                    const originalValue = props.options.find(
                      (option) => option.label === currentValue
                    )?.value
                    originalValue && props.onValueChange(originalValue)
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {option.type === "date" && (
                    <CalendarIcon className="mr-1 h-4 w-4" />
                  )}
                  {option.type === "datetime" && (
                    <CalendarClock className="mr-1 h-4 w-4" />
                  )}
                  {option.type === "string" && (
                    <Text className="mr-1 h-4 w-4" />
                  )}
                  {option.type === "int" && (
                    <FileDigit className="mr-2 h-4 w-4" />
                  )}
                  {option.type === "time" && (
                    <Clock3 className="mr-1 h-4 w-4" />
                  )}
                  {option.type === "uuid" && (
                    <FileSymlink className="mr-1 h-4 w-4" />
                  )}
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
