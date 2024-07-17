import { ChevronDown, ListIcon, SearchIcon } from "lucide-react"
import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import ComboBoxInput, {
  ComboAdminBoxInputProps,
} from "../ui/combobox-admin-input"
import { Command } from "../ui/command"
import DateInput from "../ui/date-input"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input, InputProps } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

type BaseInputProps<DataType> = InputProps & {
  name: Path<DataType>
  label?: string
  withDialog?: boolean
  info?: string
}

type SelectOptions = { value: string; label: string }[]

export type InputSwitchProps<DataType extends FieldValues> =
  | (BaseInputProps<DataType> & {
      type: "date" | "search" | "text" | "checkbox" | "hidden" | "number"
    })
  | (BaseInputProps<DataType> & {
      type: "select"
      names?: Path<DataType>[]
      selectOptions?: SelectOptions
    })
  | ((BaseInputProps<DataType> & {
      type: "combobox-admin"
    }) &
      Omit<ComboAdminBoxInputProps<DataType, Path<DataType>>, "field">)

export default function InputSwitch<DataType extends FieldValues>(
  props: InputSwitchProps<DataType>
) {
  const form = useFormContext<DataType>()
  const input = () => {
    switch (props.type) {
      case "combobox-admin":
        return (
          <FormField
            key={props.name}
            control={form.control}
            name={props.name}
            render={({ field }) => (
              <FormItem className="flex-grow space-y-1">
                {!!props.label && (
                  <FormLabel
                    info={props.info}
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    {props.label}
                  </FormLabel>
                )}
                <ComboBoxInput
                  field={field}
                  itemName={props.label}
                  {...props}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        )
      case "select":
        return (
          <FormField
            key={props.name}
            control={form.control}
            name={props.name}
            render={({ field }) => (
              <FormItem className="flex-grow space-y-1">
                {!!props.label && (
                  <FormLabel
                    info={props.info}
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    {props.label}
                  </FormLabel>
                )}
                <Select
                  onValueChange={
                    !!props.names
                      ? (val) => {
                          props.names?.forEach((name) =>
                            form.setValue(
                              name,
                              val as PathValue<DataType, typeof name>
                            )
                          )
                        }
                      : field.onChange
                  }
                  value={props.names ? form.watch(props.names[0]) : field.value}
                  defaultValue={field.value}
                  disabled={props.disabled}
                >
                  <FormControl>
                    <SelectTrigger className={props.className}>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {props.selectOptions?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      case "date":
        return (
          <FormField
            key={props.name}
            control={form.control}
            name={props.name}
            render={({ field }) => (
              <FormItem className="flex-grow space-y-1">
                {!!props.label && (
                  <FormLabel
                    info={props.info}
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    {props.label}
                  </FormLabel>
                )}
                <DateInput
                  {...field}
                  className={props.className}
                  disabled={props.disabled}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        )
      case "search":
        return (
          <FormField
            key={props.name}
            control={form.control}
            name={props.name}
            render={({ field }) => (
              <FormItem className="flex-grow space-y-1">
                {!!props.label && (
                  <FormLabel
                    info={props.info}
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    {props.label}
                  </FormLabel>
                )}
                <FormControl>
                  <Input
                    {...field}
                    rightIcon={
                      <SearchIcon className="size-4 min-w-10 text-muted-foreground" />
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )
      case "checkbox":
        return (
          <FormField
            key={props.name}
            control={form.control}
            name={props.name}
            render={({ field }) => (
              <FormItem className="flex items-center gap-1.5 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-zinc-700"
                  />
                </FormControl>
                {!!props.label && (
                  <FormLabel
                    info={props.info}
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    {props.label}
                  </FormLabel>
                )}
              </FormItem>
            )}
          />
        )
      // case "number":
      //   // Destructure `type` and `rest` from `props`
      //   const { type, ...rest } = props;
      //   return (
      //     <FormField
      //       key={props.name}
      //       control={form.control}
      //       name={props.name}
      //       render={({ field }) => (
      //         <FormItem className="flex-grow space-y-1">
      //           {!!props.label && (
      //             <FormLabel
      //               info={props.info}
      //               className="text-xs font-semibold text-muted-foreground"
      //             >
      //               {props.label}
      //             </FormLabel>
      //           )}
      //           <FormControl>
      //             <Input
      //               type="number"
      //               {...field}
      //               {...rest} 
      //             />
      //           </FormControl>
      //           <FormMessage />
      //         </FormItem>
      //       )}
      //     />
      //   )
      case "hidden":
        return (
          <FormField
            key={props.name}
            control={form.control}
            name={props.name}
            render={({ field }) => (
              <input className="hidden" {...field} {...props} />
            )}
          />
        )
      default:
        return (
          <FormField
            key={props.name}
            control={form.control}
            name={props.name}
            render={({ field }) => (
              <FormItem className="flex-grow space-y-1">
                {!!props.label && (
                  <FormLabel
                    info={props.info}
                    className="text-xs font-semibold text-muted-foreground"
                  >
                    {props.label}
                  </FormLabel>
                )}
                <FormControl>
                  <Input {...field} {...props} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )
    }
  }
  if (props.withDialog) {
    return (
      <div className="flex w-full flex-row gap-2">
        {input()}
        <Button
          type="button"
          variant={"ghost"}
          size={"icon"}
          className="mt-7 h-9 w-9"
        >
          <ListIcon className="size-4" />
        </Button>
      </div>
    )
  }
  return input()
}
