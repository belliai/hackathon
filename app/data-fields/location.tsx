import { useMemo, useState } from "react"
import { PaginationState } from "@tanstack/react-table"

import {
  useAddLocation,
  useLocations,
  useRemoveLocation,
  useUpdateLocation,
} from "@/lib/hooks/locations"
import { useTimeZones } from "@/lib/hooks/time-zones"

import CrudTable from "./components/crud-table"

const Location = () => {

  const { isLoading, isPending, error, data } = useLocations()
  const update = useUpdateLocation()
  const add = useAddLocation()
  const remove = useRemoveLocation()

  const { data: timeZones, isLoading: isLoadingTimeZones } = useTimeZones()

  const timeZoneOptions =
    timeZones &&
    timeZones?.data?.map((tz: any) => ({
      value: String(tz.ID),
      label: tz.name,
    }))

  if (error) return "An error has occurred: " + error.message

  return (
    <CrudTable
      isLoading={isPending}
      id="location"
      title="Location"
      columns={[
        { accessorKey: "option", header: "Name" },
        { accessorKey: "timezone.name", header: "Timezone" },
      ]}
      form={[
        { name: "id", type: "hidden" },
        { name: "option", type: "text", label: "Location" },
        {
          name: "timezone.ID",
          type: "select",
          label: "Default Time Zone",
          selectOptions: timeZoneOptions,
          placeholder: "Time Zone",
        },
      ]}
      data={
        data &&
        data?.map((item: any) => ({
          option: item.name,
          id: item.ID,
          timezone: item.timezone,
        }))
      }
      onSave={async (data) => {
        // configure logic for add or edit, for edit the id will be zero
        const { id, option, timezone } = data
        if (id) {
          await update.mutateAsync({
            id,
            name: option,
            timezone_id: timezone.ID,
          })
        } else {
          await add.mutateAsync({ name: option, timezone_id: timezone.ID })
        }
      }}
      onDelete={(data) => {
        // configure logic for delete
        if (data.id) {
          remove.mutate({ id: data.id })
        }
      }}
    />
  )
}
export default Location
