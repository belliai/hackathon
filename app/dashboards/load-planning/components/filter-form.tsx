import React, { useEffect, useMemo, useState } from "react"
import { Search } from "lucide-react"
import { ObjectSet } from "@/lib/utils/array-utils"
import { Location } from "@/types/flight-master/flight-master"
import { useLocationSearch } from "@/lib/hooks/locations"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import DateInput from "@/components/ui/date-input"
import AsyncSearchComboBox from "@/components/form/combobox-async"
import { Combobox, ComboboxOption } from "@/components/form/combobox"
import { useLoadPlanningContext } from "../contexts/load-planning-context"

const STATUS_OPTIONS = [
  { label: 'Unplanned', value: 'unplanned' },
  { label: 'Planned', value: 'planned' }
]

const useLocationOptions = (searchTerm: string): ComboboxOption[] => {
  const { data: locationsSearch } = useLocationSearch({ searchTerm })
  const [allLocations, setAllLocations] = useState<Location[]>([])

  useEffect(() => {
    if (locationsSearch?.data) {
      const objectSet = new ObjectSet<Location>("ID")
      setAllLocations((prev) => {
        objectSet.addAll([...prev, ...locationsSearch.data])
        return objectSet.getItems()
      })
    }
  }, [locationsSearch])

  return useMemo(() => allLocations.map((location) => {
    const cityName = location.timezone?.name.split(" - ").pop() || ""
    const label = (
      <p>
        {location.airport_code}{" "}
        {location.timezone && (
          <span className="text-xs text-zinc-500">
            (GMT {location.timezone.offset}, {cityName})
          </span>
        )}
      </p>
    )
    return {
      component: label,
      label: location.name,
      value: location.ID,
    }
  }), [allLocations])
}

const FilterForm: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const formattedLocations = useLocationOptions(searchTerm)
  const { formFilterHooks, onSubmitFilters } = useLoadPlanningContext();
  
  return (
    <Form {...formFilterHooks}>
      <form onSubmit={formFilterHooks.handleSubmit(onSubmitFilters)} className="grid grid-cols-3 gap-3">
        <FormField
          control={formFilterHooks.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Search Flight</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-[40px] dark:border-2 dark:border-foreground/30"
                  leftIcon={<Search className="size-4" />}
                  placeholder="Search flight code ..."
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={formFilterHooks.control}
          name="filterDate"
          render={({ field }) => (
            <FormItem className="flex-grow space-y-1">
              <FormLabel className="font-bold">Departure Date</FormLabel>
              <DateInput
                {...field}
                className="h-[40px] dark:border-2 dark:border-foreground/30"
                mode="range"
                disabledMatcher={{ before: new Date() }}
              />
            </FormItem>
          )}
        />
        <Combobox
          name="status"
          options={STATUS_OPTIONS}
          label="Status"
          info="Select Status"
          tooltipId="Select flight status"
          placeholder="Select Status"
        />
        <AsyncSearchComboBox
          name="origin"
          options={formattedLocations}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search origin by airport code"
          label="Origin"
          info="Select the origin location"
        />
        <AsyncSearchComboBox
          name="destination"
          options={formattedLocations}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search destination by airport code"
          label="Destination"
          info="Select the destination location"
        />
      </form>
    </Form>
  )
}

export { FilterForm }
