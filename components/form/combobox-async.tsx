import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { ObjectSet } from "@/lib/utils/array-utils"
import { useDebounce } from "@/components/ui/multi-selector"

import { Combobox, ComboboxOption, ComboboxProps } from "./combobox"

export type AsyncSearchComboBoxProps = {
  searchTerm: string
  onSearchChange: (value: string) => void
  name: string
} & ComboboxProps

const AsyncSearchComboBox = ({
  onSearchChange,
  options,
  name,
  ...props
}: AsyncSearchComboBoxProps) => {
  const [localOptions, setLocalOptions] = useState<ComboboxOption[]>([])

  const [searchTerm, setSearchTerm] = useState(props.searchTerm)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    onSearchChange(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  useEffect(() => {
    if (!options) return

    const objectSet = new ObjectSet<ComboboxOption>("value")
    setLocalOptions((prev) => {
      objectSet.addAll([...prev, ...options])
      return objectSet.getItems()
    })
  }, [options])

  return (
    <Combobox
      {...props}
      showSearchInput
      onSearchChange={setSearchTerm}
      name={name}
      options={localOptions}
      className={cn(
        "h-9 rounded-sm border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        props.className
      )}
    />
  )
}

export default AsyncSearchComboBox
