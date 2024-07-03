import { ListIcon, SearchIcon } from "lucide-react"
import { FieldValues, Path, useFormContext } from "react-hook-form"

import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
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

export default function InputSwitch<DataType extends FieldValues>(
  props: InputProps & {
    type: "select" | "date" | "search" | "text" | "checkbox"
    name: Path<DataType>
    label: string
    selectOptions?: { value: string; label: string }[]
    withDialog?: boolean
  }
) {
  const form = useFormContext<DataType>()
  const input = () => {
    switch (props.type) {
      case "select":
        return (
          <FormField
            key={props.name}
            control={form.control}
            name={props.name}
            render={({ field }) => (
              <FormItem className="flex-grow space-y-1">
                <FormLabel className="text-xs font-semibold text-muted-foreground">
                  {props.label}
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
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
                <FormLabel className="text-xs font-semibold text-muted-foreground">
                  {props.label}
                </FormLabel>
                <DateInput {...field} />
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
                <FormLabel className="text-xs font-semibold text-muted-foreground">
                  {props.label}
                </FormLabel>
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
                <FormLabel>{props.label}</FormLabel>
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
                <FormLabel className="text-xs font-semibold text-muted-foreground">
                  {props.label}
                </FormLabel>
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
