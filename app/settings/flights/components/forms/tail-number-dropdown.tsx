import { useForm } from "react-hook-form"

import { CreateFlightMasterPayload } from "@/types/flight-master/flight-master"
import { Form } from "@/components/ui/form"
import { Combobox } from "@/components/form/combobox"
import { SelectOptions } from "@/components/form/InputSwitch"

type CellProps = {
  row: any
  aircraftOptions: SelectOptions
  onChangeTailNumber: (data: CreateFlightMasterPayload) => void
}

const TailNumberForm = ({
  row,
  aircraftOptions,
  onChangeTailNumber,
}: CellProps) => {
  const original = row.original
  const tail = row.original.tail

  const form = useForm({
    defaultValues: {
      tail_no: tail?.ID,
    },
  })

  const tail_no = form.watch("tail_no")

  const onChangeSelect = (tail_id: string | null) => {
    const payload = {
      ID: original.ID,
      destination_id: original.destination.ID,
      flight_no: original.flight_no,
      source_id: original.source.ID,
      from_date: original.from_date,
      departure_h: original.departure_h,
      departure_m: original.departure_h,
    }
    onChangeTailNumber({ tail_id, ...payload })
  }

  return (
    <Form {...form}>
      <div onClick={(e) => e.stopPropagation()}>
        <Combobox
          name="tail_no"
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
