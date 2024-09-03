import { useEffect, useState } from "react"

import { ObjectSet } from "@/lib/utils/array-utils"
import { useDebounce } from "@/components/ui/multi-selector"

import { Combobox, ComboboxFormProps, ComboboxOption } from "./combobox"

export type AsyncSearchComboBoxProps = {
  searchTerm: string
  onSearchChange: (value: string) => void
  name: string
} & ComboboxFormProps

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
    />
  )
}

export default AsyncSearchComboBox
