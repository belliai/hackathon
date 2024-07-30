"use client"

import React, { useEffect, useMemo, useState } from "react"
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
    {
      label: "Day",
      value: "daily",
    },
    {
      label: "Week",
      value: "weekly",
    },
    {
      label: "Month",
      value: "monthly",
    },
    {
      label: "Year",
      value: "yearly",
    },
  ]

  return list.map((item) => ({
    value: item.value,
    label: item.label + addition,
  }))
}

const RecurringForm = React.forwardRef<HTMLDivElement, any>((_, ref) => {
  const form = useFormContext()
  const formData = form.watch()
  const [recurrings, setRecurrings] =
    useState<Array<{ label: string; value: string }>>(recurringOption)
  const [repeatEnd, setRepeatEnd] = useState<string>("never")

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

  useEffect(() => {}, [formData.period])

  return (
    <Card className="space-y-4 p-4" ref={ref}>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2">
          <InputSwitch
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
              name="recurring_count"
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
            />
          </div>
          {formData.period === "weekly" && (
            <div className="grid grid-cols-1 gap-4">
              <Label>Repeat on</Label>
              <div className="flex">
                {["sun", "mon", "tue", "wed", "thu", "fri", "sat"].map(
                  (day: string, index) => (
                    <FormField
                      key={day}
                      control={form.control}
                      name="days"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={day}
                            className="mr-3 flex flex-row items-start gap-1 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(day)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, day])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: string) => value !== day
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{day}</FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  )
                )}
              </div>
              <p className={cn("text-[0.8rem] font-medium text-destructive")}>
                {/* {form.formState.errors.days?.message} */}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            <Label>Ends</Label>
            <RadioGroup
              defaultValue="never"
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
                  <RadioGroupItem value="ends_on" id="r2" />
                  <Label htmlFor="r2">On</Label>
                </div>
                <div>
                  <InputSwitch
                    label=""
                    name="recurring_ends_on"
                    type="date"
                    disabledMatcher={repeatEnd !== "ends_on"}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="space-x-2">
                  <RadioGroupItem value="after" id="r3" />
                  <Label htmlFor="r3">After</Label>
                </div>
                <div className="col-span-1 flex items-center space-x-2">
                  <InputSwitch
                    label=""
                    name="recurring_occurence"
                    type="stepper-number"
                    disabled={repeatEnd !== "after"}
                    max={100}
                    min={1}
                    step={1}
                  />
                  <Label
                    className={cn(repeatEnd !== "after" ? "text-zinc-500" : "")}
                  >
                    Occurence{formData.after_occurence > 1 && "s"}
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
