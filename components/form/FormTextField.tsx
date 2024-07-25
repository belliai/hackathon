import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form"
import { ListBulletIcon } from "@heroicons/react/24/outline"
import { format } from "date-fns"
import { CalendarIcon, Info } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import NumberInputStepper from "./number-input-stepper"

type SelectOption = {
  label: string
  value: string
}

export type TFormTextField = Omit<FormTextFieldProps, "form">

export interface FormTextFieldProps {
  name: string
  type: string
  label?: string
  description?: string
  form: UseFormReturn<any>
  required?: boolean
  options?: SelectOption[]
  endIcon?: React.ReactNode
  hasList?: boolean
  toolTipContent?: string
  hideTooltip?: boolean
  placeholder?: string
  disabled?: boolean
  orientation?: "horizontal" | "vertical"
  hideErrorMessage?: boolean
  min?: number
  max?: number
  step?: number
  suffix?: string
}

export default function FormTextField({
  name,
  type,
  label,
  description,
  form,
  required,
  options,
  endIcon,
  hasList,
  toolTipContent,
  hideTooltip,
  placeholder,
  disabled,
  orientation = "vertical",
  hideErrorMessage = false,
  min,
  max,
  step,
  suffix
}: FormTextFieldProps) {
  const fieldClassName = cn(
    "bg-transparent border-zinc-700 focus:ring-zinc-800 focus-visible:ring-zinc-700 w-full",
    {
      "pr-8": endIcon,
    }
  )

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        function conditionalRender() {
          switch (type) {
            case "date":
              return (
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        disabled={disabled}
                        className={cn(
                          fieldClassName,
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>{placeholder ?? "Pick a date"}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )
            case "date-range-time":
              return (
                <div className="flex flex-col gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          disabled={disabled}
                          className={cn(
                            fieldClassName,
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value?.from ? (
                            field.value.to ? (
                              <>
                                {format(field.value.from, "LLL dd, y")}{" "}
                                {form.watch(`${name}.fromTime`)} -{" "}
                                {format(field.value.to, "LLL dd, y")}{" "}
                                {form.watch(`${name}.toTime`)}
                              </>
                            ) : (
                              format(field.value.from, "LLL dd, y")
                            )
                          ) : (
                            <span>{placeholder ?? "Pick a date"}</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <div className="flex p-1">
                        <Input
                          type="text"
                          value={
                            field.value?.from &&
                            format(field.value.from, "LLL dd, y")
                          }
                          onChange={(e) =>
                            field.onChange({
                              ...field.value,
                              from: e.target.value,
                            })
                          }
                          className={cn(fieldClassName, "w-40")}
                          disabled={disabled}
                        />
                        <Input
                          type="time"
                          defaultValue={"00:00"}
                          value={form.watch(`${name}.fromTime`)}
                          onChange={(e) =>
                            form.setValue(`${name}.fromTime`, e.target.value)
                          }
                          className={cn(fieldClassName, "w-20")}
                          disabled={disabled}
                        />
                      </div>
                      <div className="flex p-1">
                        <Input
                          type="text"
                          value={
                            field.value?.to &&
                            format(field.value.to, "LLL dd, y")
                          }
                          onChange={(e) =>
                            field.onChange({
                              ...field.value,
                              to: e.target.value,
                            })
                          }
                          className={cn(fieldClassName, "w-40")}
                          disabled={disabled}
                        />
                        <Input
                          type="time"
                          value={form.watch(`${name}.toTime`)}
                          onChange={(e) =>
                            form.setValue(`${name}.toTime`, e.target.value)
                          }
                          className={cn(fieldClassName, "white w-20")}
                          disabled={disabled}
                        />
                      </div>

                      <Calendar
                        mode="range"
                        selected={field.value}
                        onSelect={(val) => {
                          const fromTime = val?.from
                            ? format(val?.from, "HH:mm")
                            : "00:00"
                          const toTime = val?.to
                            ? format(val?.to, "HH:mm")
                            : "00:00"
                          field.onChange(val)
                          form.setValue(`${name}.fromTime`, fromTime)
                          form.setValue(`${name}.toTime`, toTime)
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                      <div className="flex justify-end p-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            field.onChange({ from: null, to: null })
                            form.setValue(`${name}.fromTime`, "00:00")
                            form.setValue(`${name}.toTime`, "00:00")
                          }}
                        >
                          Clear
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )

            case "radio":
              return (
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="my-2 flex"
                    disabled={disabled}
                  >
                    {options?.map((option) => {
                      return (
                        <FormItem
                          className="flex items-center space-x-3 space-y-0"
                          key={option.value}
                        >
                          <FormControl>
                            <RadioGroupItem value={option.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      )
                    })}
                  </RadioGroup>
                </FormControl>
              )

            case "checkbox":
              return (
                <div className="my-2 flex items-center gap-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      disabled={disabled}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-0 leading-none">
                    <FormLabel className="text-zinc-400">
                      {label} {required ? "*" : ""}
                    </FormLabel>
                    <FormDescription>{description}</FormDescription>
                  </div>
                </div>
              )

            case "select":
              return (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger
                      className={cn(fieldClassName, {
                        "text-zinc-400": !field.value,
                      })}
                      disabled={disabled}
                    >
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="">
                    {options?.map((option) => {
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              )
            case "stepper-number":
              return (
                <FormControl>
                  <div className="flex items-center gap-1">
                    <div className="relative w-full">
                      <Input
                        {...field}
                        disabled={disabled}
                        type="number"
                        className={cn(fieldClassName, "file:text-white")}
                        placeholder={placeholder}
                      />
                      <span className="absolute right-2 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center text-zinc-400">
                        <NumberInputStepper
                          min={min}
                          max={max}
                          step={step}
                          value={parseInt(field.value)}
                          onChange={field.onChange}
                          suffix={suffix}
                        />
                      </span>
                    </div>
                    {hasList && (
                      <Button
                        size="icon"
                        type="button"
                        className="text-zinc-400"
                      >
                        <ListBulletIcon className="h-6 w-6" />
                      </Button>
                    )}
                  </div>
                </FormControl>
              )

            default:
              return (
                <FormControl>
                  <div className="flex items-center gap-1">
                    <div className="relative w-full">
                      <Input
                        {...field}
                        disabled={disabled}
                        type={type}
                        className={cn(fieldClassName, "file:text-white")}
                        placeholder={placeholder}
                      />
                      <span className="absolute right-2 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center text-zinc-400">
                        {endIcon}
                      </span>
                    </div>
                    {hasList && (
                      <Button
                        size="icon"
                        type="button"
                        className="text-zinc-400"
                      >
                        <ListBulletIcon className="h-6 w-6" />
                      </Button>
                    )}
                  </div>
                </FormControl>
              )
          }
        }
        return (
          <FormItem
            className={cn("flex w-full flex-col space-y-2", {
              "md:flex-row": orientation === "horizontal",
            })}
          >
            {label && type !== "checkbox" && (
              <div
                className={cn("flex items-center gap-1 text-zinc-50", {
                  "w-full max-w-48": orientation === "horizontal",
                })}
              >
                <FormLabel className="text-sm" htmlFor={name}>
                  {label} {required ? "*" : ""}{" "}
                </FormLabel>
                {toolTipContent && !hideTooltip && (
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger type="button">
                        <Info size={16} />
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="flex flex-col gap-2 text-sm"
                      >
                        <span className="text-black">{label}</span>
                        <span className="text-zinc-500">{toolTipContent}</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            )}
            <div className="relative flex w-full flex-col">
              {conditionalRender()}
              {description && <FormDescription>{description}</FormDescription>}
              {!hideErrorMessage && (
                <FormMessage className="top-10 text-[10px]" />
              )}
            </div>
          </FormItem>
        )
      }}
    />
  )
}
