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
import FormTextField from "@/components/form/FormTextField"

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
    () => getPeriods(formData.every_number),
    [formData.every_number]
  )

  useEffect(() => {
    if (formData.from_date) {
      const { options } = generateRecurringOptions({
        startAt: formData.from_date,
      })
      setRecurrings(options)
    }
  }, [formData.from_date])

  useEffect(() => {
    if (formData.every_period) {
    }
  }, [formData.every_period])

  return (
    <Card className="space-y-4 p-4" ref={ref}>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2">
          <FormTextField
            form={form}
            name="recurring"
            label="Recurring"
            type="select"
            options={recurrings}
          />
        </div>
      </div>
      {formData.recurring === "custom" && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 items-end gap-4">
            <FormTextField
              name="every_number"
              form={form}
              type="stepper-number"
              label="Repeat every"
              orientation="horizontal"
            />
            <FormTextField
              label=""
              name="every_period"
              form={form}
              type="select"
              options={optionsPeriod}
            />
          </div>
          {formData.every_period === "weekly" && (
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
                  <FormTextField
                    name="ends_on"
                    type="date"
                    form={form}
                    disabled={repeatEnd !== "ends_on"}
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="space-x-2">
                  <RadioGroupItem value="after" id="r3" />
                  <Label htmlFor="r3">After</Label>
                </div>
                <div className="col-span-1 flex items-center space-x-2">
                  <FormTextField
                    label=""
                    name="after_occurence"
                    form={form}
                    type="stepper-number"
                    disabled={repeatEnd !== "after"}
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
