"use client"

import React, { useEffect, useMemo, useState } from "react"
import { FlightSchema } from "@/schemas/flight-master/flight"
import { useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"
import { generateRecurringOptions } from "@/lib/utils/date-utils"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import InputSwitch from "@/components/form/InputSwitch"

const recurringOption = [
  {
    label: "Does not repeat",
    value: "no-repeat",
  },
  {
    label: "Daily",
    value: "daily",
  },
]

const getPeriods = (val: number) => {
  const addition = val > 1 ? "s" : ""

  const list = [
    // {
    //   label: "Day",
    //   value: "daily",
    // },
    {
      label: "Week",
      value: "weekly",
    },
    // {
    //   label: "Month",
    //   value: "monthly",
    // },
    // {
    //   label: "Year",
    //   value: "yearly",
    // },
  ]

  return list.map((item) => ({
    value: item.value,
    label: item.label + addition,
  }))
}

const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"]
const daysMap = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

interface WeeklyCheckboxProps {
  day: string
  checked: boolean
  onChange: () => void
}

const WeeklyCheckbox: React.FC<WeeklyCheckboxProps> = ({
  day,
  checked,
  onChange,
}) => {
  return (
    <label className="flex cursor-pointer flex-col items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${
          checked ? "bg-[#fb5727] text-white" : "bg-gray-400 text-gray-700"
        }`}
      >
        {day}
      </span>
    </label>
  )
}

const RecurringForm = React.forwardRef<HTMLDivElement, any>((_, ref) => {
  const form = useFormContext()
  const formData = form.watch()
  const [recurrings, setRecurrings] =
    useState<Array<{ label: string; value: string }>>(recurringOption)
  const [repeatEnd, setRepeatEnd] = useState<string>(formData.end_condition || "never")

  const optionsPeriod = useMemo(
    () => getPeriods(formData.recurring_count),
    [formData.recurring_count]
  )

  useEffect(() => {
    if (formData.departure_date) {
      const { options } = generateRecurringOptions({
        startAt: formData.departure_date,
      })
      setRecurrings(options)
    }
  }, [formData.departure_date])

  useEffect(() => {
    if (repeatEnd === "never") {
      form.setValue("end_date", undefined)
      form.setValue("end_after_occurrences", undefined)
    }
    form.setValue("end_condition", repeatEnd)
  }, [repeatEnd])



  return (
    <Card className="space-y-4 p-4" ref={ref}>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2">
          <InputSwitch<FlightSchema>
            name="recurring"
            label="Recurring"
            type="select"
            selectOptions={recurrings}
          />
        </div>
      </div>
      {formData.recurring === "custom" && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 items-end gap-4">
            <InputSwitch
              label="Repeat every"
              name="recurring_every"
              type="stepper-number"
              max={100}
              min={1}
              step={1}
            />
            <InputSwitch
              label=""
              name="recurring_period"
              type="select"
              selectOptions={optionsPeriod}
              defaultValue="weekly"
            />
          </div>
          {formData.recurring_period === "weekly" && (
            <div className="grid grid-cols-1 gap-4">
              <Label>Repeat on</Label>
              <div className="flex">
                {daysOfWeek.map((day: string, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name="days"
                    render={({ field }) => {
                      const value = field.value || [] // Ensure value is an array
                      const mappedDay = daysMap[index]
                      return (
                        <FormItem
                          key={mappedDay}
                          className="mr-3 flex flex-row items-start gap-1 space-y-0"
                        >
                          <FormControl>
                            <WeeklyCheckbox
                              day={day}
                              checked={value.includes(mappedDay)}
                              onChange={() => {
                                const newValue = value.includes(mappedDay)
                                  ? value.filter((d: string) => d !== mappedDay)
                                  : [...value, mappedDay]
                                field.onChange(newValue)
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <p className={cn("text-[0.8rem] font-medium text-destructive")}>
                {/* {form.formState.errors.days?.message} */}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            <Label>Ends</Label>
            <RadioGroup
              name="end_condition"
              defaultValue={repeatEnd}
              onValueChange={(val) => {
                setRepeatEnd(val)
              }}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="never" id="r1" />
                <Label htmlFor="r1">Never</Label>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="space-x-2">
                  <RadioGroupItem value="on_date" id="r2" />
                  <Label htmlFor="r2">On</Label>
                </div>
                <div>
                  <InputSwitch
                    label=""
                    name="end_date"
                    type="date"
                    required={repeatEnd == "on_date"}
                    disabled={repeatEnd !== "on_date"}
                    disabledMatcher={() => false}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="space-x-2">
                  <RadioGroupItem value="after_occurrences" id="r3" />
                  <Label htmlFor="r3">After</Label>
                </div>
                <div className="col-span-1 flex items-center space-x-2">
                  <InputSwitch
                    label=""
                    name="end_after_occurrences"
                    type="stepper-number"
                    disabled={repeatEnd !== "after_occurrences"}
                    max={100}
                    min={1}
                    step={1}
                  />
                  <Label
                    className={cn(repeatEnd !== "after_occurrences" ? "text-zinc-500" : "")}
                  >
                    Occurence{formData.end_after_occurrences > 1 && "s"}
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>
      )}
    </Card>
  )
})

RecurringForm.displayName = "RecurringForm"

export default RecurringForm
