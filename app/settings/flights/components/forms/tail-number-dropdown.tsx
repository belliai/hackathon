import {
  CreateFlightMasterPayload,
  Flight,
} from "@/types/flight-master/flight-master"
import { SelectOptions } from "@/components/form/InputSwitch"

import { TableCellDropdown } from "./table-cell-dropdown"

type CellProps = {
  data: Flight
  aircraftOptions: SelectOptions
  onChangeTailNumber?: (data: CreateFlightMasterPayload | null) => void
}

const TailNumberDropdown = ({
  data,
  aircraftOptions,
  onChangeTailNumber,
}: CellProps) => {
  const onChangeSelect = ({ tail_id }: { tail_id: string | null }) => {
    const payload: CreateFlightMasterPayload = {
      ID: data.id,
      destination_id: data.destination.id,
      flight_number: data.flight_number,
      origin_id: data.origin.id,
      departure_date: data.departure_date,
      departure_hour: data.departure_hour,
      departure_minute: data.departure_minute,
      flight_duration_minute: data.flight_duration_minute,
      flight_duration_hour: data.flight_duration_hour,
      departure_period: data.departure_period,
    }
    if (data.tail.id !== null && onChangeTailNumber)
      onChangeTailNumber({ tail_id: tail_id || undefined, ...payload })
  }

  return (
    <TableCellDropdown
      name="tail_id"
      defaultValue={data.tail.id}
      options={aircraftOptions}
      onChangeSelect={(data) => {
        onChangeSelect({ tail_id: data.tail_id ?? null })
      }}
    />
  )
}

export default TailNumberDropdown
