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
          onChangeValue={(changedValue) =>
            onChangeSelect({ [name]: changedValue } as TData)
          }
          className="h-[20px] border-0 border-zinc-900 bg-transparent hover:bg-transparent"
        />
      </div>
    </Form>
  )
}
