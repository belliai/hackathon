import { useForm } from "react-hook-form"

import {
  CreateFlightMasterPayload,
  Flight,
} from "@/types/flight-master/flight-master"
import { Form } from "@/components/ui/form"
import { Combobox } from "@/components/form/combobox"
import { SelectOptions } from "@/components/form/InputSwitch"

import { TableCellDropdown } from "./table-cell-dropdown"

type CellProps = {
  row: any
  aircraftOptions: SelectOptions
  onChangeTailNumber?: (data: CreateFlightMasterPayload | null) => void
}

const TailNumberForm = ({
  row,
  aircraftOptions,
  onChangeTailNumber,
}: CellProps) => {
  const original = row.original
  const tail = row.original.tail

  const onChangeSelect = ({ tail_id }: { tail_id: string | null }) => {
    const payload: CreateFlightMasterPayload = {
      ID: original.id,
      destination_id: original.destination.id,
      flight_number: original.flight_number,
      origin_id: original.origin.id,
      departure_date: original.departure_date,
      departure_hour: original.departure_hour,
      departure_minute: original.departure_minute,
      flight_duration_minute: original.flight_duration_minute,
      flight_duration_hour: original.flight_duration_hour,
      departure_period: original.departure_period,
    }
    if (original.tail_id !== null && onChangeTailNumber)
      onChangeTailNumber({ tail_id: tail_id || undefined, ...payload })
  }

  return (
    <TableCellDropdown
      name="tail_id"
      defaultValue={tail?.id}
      options={aircraftOptions}
      onChangeSelect={(data) => {
        onChangeSelect({ tail_id: data.tail_id ?? null })
      }}
    />
  )
}

export default TailNumberForm
