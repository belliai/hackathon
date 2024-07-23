import { useForm } from "react-hook-form"

import {
  CreateFlightMasterPayload,
  Flight,
} from "@/types/flight-master/flight-master"
import { Form } from "@/components/ui/form"
import { Combobox } from "@/components/form/combobox"
import { SelectOptions } from "@/components/form/InputSwitch"

type CellProps = {
  row: any
  aircraftOptions: SelectOptions
  onChangeTailNumber: (data: CreateFlightMasterPayload | null) => void
}

const TailNumberForm = ({
  row,
  aircraftOptions,
  onChangeTailNumber,
}: CellProps) => {
  const original: Flight = row.original
  const tail = row.original.tail

  const form = useForm({
    defaultValues: {
      tail_id: tail?.id,
    },
  })


  const onChangeSelect = (tail_id: string | null) => {
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
    if (tail_id !== null) onChangeTailNumber({ tail_id, ...payload })
  }

  return (
    <Form {...form}>
      <div onClick={(e) => e.stopPropagation()}>
        <Combobox
          name="tail_id"
          label=""
          info="Select Tail number"
          options={aircraftOptions}
          onChangeValue={onChangeSelect}
        />
      </div>
    </Form>
  )
}

export default TailNumberForm
