import { useEffect } from "react"
import { useForm } from "react-hook-form"

import { Form } from "@/components/ui/form"
import { Combobox } from "@/components/form/combobox"
import { SelectOptions } from "@/components/form/InputSwitch"

type CellProps<TData> = {
  defaultValue: TData
  name: string
  options: SelectOptions
  onChangeSelect: (data: { [key: string]: string | null }) => void
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

  useEffect(() => {
    form.reset({
      [name]: defaultValue,
    })
  }, [defaultValue])

  return (
    <Form {...form}>
      <div onClick={(e) => e.stopPropagation()}>
        <Combobox
          name={name}
          options={options}
          onChangeValue={(changedValue) =>
            onChangeSelect({ [name]: changedValue })
          }
          className="h-[20px] border-0 border-zinc-900 bg-transparent font-normal text-black shadow-none hover:bg-transparent dark:border-0 dark:text-muted-foreground"
        />
      </div>
    </Form>
  )
}
