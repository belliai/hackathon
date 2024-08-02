import { ListIcon, SearchIcon } from "lucide-react"
import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import ComboBoxInput, {
  ComboAdminBoxInputProps,
} from "../ui/combobox-admin-input"
import DateInput from "../ui/date-input"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input, InputProps } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Switch } from "../ui/switch"
import { Combobox, ComboboxProps } from "./combobox"
import NumberInputStepper from "./number-input-stepper"

type BaseInputProps<DataType> = InputProps & {
  name: Path<DataType>
  label?: string
  withDialog?: boolean
  info?: string
}

export type SelectOptions = {
  value: string
  label: string
  component?: React.ReactNode
}[]

export type InputSwitchProps<DataType extends FieldValues> =
  | (BaseInputProps<DataType> & {
      type: "search" | "text" | "checkbox" | "switch" | "hidden" | "number"
    })
  | (BaseInputProps<DataType> & {
      type: "stepper-number"
      suffix?: string
      min?: number
      max?: number
      step?: number
    })
  | (BaseInputProps<DataType> & {
      type: "date"
      disabledMatcher?: (date: Date) => boolean
      mode?: "single" | "range"
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
  | (BaseInputProps<DataType> & {
      type: "combobox"
      selectOptions?: SelectOptions
    } & ComboboxProps)

export default function InputSwitch<DataType extends FieldValues>(
  props: InputSwitchProps<DataType>
) {
  const form = useFormContext<DataType>()
  const input = () => {
    switch (props.type) {
      case "combobox":
        return (
          <Combobox
            {...props}
            min={Number(props.min)}
            max={Number(props.max)}
            step={Number(props.step)}
            name={props.name}
            label={props.label}
            options={props.selectOptions}
            className={cn(
              "h-9 rounded-sm border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              props.className
            )}
          />
        )

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
                    <SelectTrigger
                      className={cn(
                        {
                          "text-muted-foreground": !field.value, // Placeholder styling
                        },
                        props.className
                      )}
                    >
                      <SelectValue placeholder={props.placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {props.selectOptions?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option?.component ? option.component : option.label}
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
                  disabledMatcher={props.disabledMatcher}
                  mode={props.mode}
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
                    className={props.className}
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
                    className={cn("border-zinc-700", props.className)}
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
      case "switch":
        return (
          <FormField
            key={props.name}
            control={form.control}
            name={props.name}
            render={({ field }) => (
              <FormItem className="flex items-center gap-1.5 space-y-0">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={cn(props.className)}
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
      case "stepper-number":
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
                  <div className="flex items-center gap-1">
                    <div className="relative w-full">
                      <Input
                        {...field}
                        disabled={props.disabled}
                        type="number"
                        placeholder={props.placeholder}
                      />
                      <span className="absolute right-2 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center text-zinc-400">
                        <NumberInputStepper
                          min={Number(props.min)}
                          max={Number(props.max)}
                          step={Number(props.step)}
                          value={parseInt(field.value)}
                          onChange={field.onChange}
                          suffix={props.suffix}
                        />
                      </span>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
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
