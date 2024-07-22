"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
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

interface SearchDataFieldProps {
  selectOptions: { value: string; label: string }[]
  label: string
  onChangeValue: (value: string) => void
}

export function SearchDataField(props: SearchDataFieldProps) {
  const { selectOptions = [], label = '', onChangeValue = () => {} } = props;
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search for an item" />

          <CommandList className="custom-scrollbar">
            <CommandEmpty>No item found.</CommandEmpty>

            <CommandGroup>
              {selectOptions.map((column, index) => {
                return (
                  <CommandItem
                    key={`search-${index}`}
                    value={column.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                      onChangeValue(currentValue)
                    }}
                    className="flex flex-row items-center justify-between"
                  >
                    {column.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
