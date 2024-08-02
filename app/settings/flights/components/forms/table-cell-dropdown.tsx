import { useForm } from "react-hook-form"

import { Form } from "@/components/ui/form"
import { Combobox } from "@/components/form/combobox"
import { SelectOptions } from "@/components/form/InputSwitch"

type CellProps<TData> = {
  defaultValue: TData
  name: string
  options: SelectOptions
  onChangeSelect: (data: TData) => void
}

export function TableCellDropdown<TData>({
  options,
  defaultValue,
  name,
  onChangeSelect,
}: CellProps<TData>) {
  const form = useForm<any>({
    defaultValues: {
      [name]: defaultValue,
    },
  })

  return (
    <Form {...form}>
      <div onClick={(e) => e.stopPropagation()}>
        <Combobox
          name={name}
          label=""
          options={options}
          onChangeValue={() =>
            onChangeSelect({ ...defaultValue, [name]: form.getValues(name) })
          }
          className="h-[30px] border-0 border-zinc-900 bg-transparent p-1"
        />
      </div>
    </Form>
  )
}
