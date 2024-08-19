import { ReactNode, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { CalendarIcon, Text, UserIcon } from "lucide-react"
import { OptionWithType } from "./types"



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
          <Command>
            <CommandInput placeholder="Search ..." />
            <CommandList>
              <CommandEmpty>No Column found.</CommandEmpty>
              <CommandGroup>
                {props.options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(currentValue) => {
                      props.onValueChange(currentValue)
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    {option.type === "date" && (
                      <CalendarIcon className="mr-2 h-4 w-4" />
                    )}
                    {option.type === "text" && <Text className="mr-2 h-4 w-4" />}
  
                    {option.type === "profile" && (
                      <UserIcon className="mr-2 h-4 w-4" />
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