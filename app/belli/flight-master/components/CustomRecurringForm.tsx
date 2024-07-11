import { useEffect, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select } from "@/components/ui/select"
import FormTextField from "@/components/form/FormTextField"

import NumberInputStepper from "./NumberInputStepper"

type CustomRecurringFormProps = {
  open: boolean
  setOpen: (val: boolean) => void
  onSave: (data: any) => void
}


const getSchema = (everyPeriod: string, repeatEnd: string) => {
  let schema = z.object({
    everyNumber: z.number().min(1).max(100),
    everyPeriod: z.enum(["day", "week", "month", "year"]),
  })

  if (everyPeriod === "week") {
    schema = schema.extend({
      days: z.array(z.string()).nonempty({ message: "At least select 1 day" }),
    })
  } else {
    schema = schema.extend({
      days: z.array(z.string()).optional(),
    })
  }

  if (repeatEnd === "endsOn") {
    schema = schema.extend({
      endsOn: z.preprocess(
        (arg) => (typeof arg === "string" ? new Date(arg) : arg),
        z.date().refine((date) => !isNaN(date.getTime()), {
          message: "Please enter a valid date",
        })
      ),
    })
  }

  if (repeatEnd === "after") {
    schema = schema.extend({
      afterOccurence: z.number().optional(),
    })
  }

  return schema
}

const schema = z.object({
  everyNumber: z.number().min(1).max(100),
  everyPeriod: z.enum(["day", "week", "month", "year"]),
  days: z.array(z.string()).optional(),
  endsOn: z.date().optional(),
  afterOccurence: z.number().optional(),
})

// Add custom validation to ensure 'days' is required and non-empty if 'everyPeriod' is 'week'
const validatedSchema = schema.refine(
  (data) => {
    if (data.everyPeriod === "week") {
      return data.days && data.days.length > 0
    }
    return true
  },
  {
    message: "At least select 1 day",
    path: ["days"], // This path helps indicate where the error should appear
  }
)

const periods = (val: number) => {
  const addition = val > 1 ? "s" : ""

  const list = [
    {
      label: "Day",
      value: "day",
    },
    {
      label: "Week",
      value: "week",
    },
    {
      label: "Month",
      value: "month",
    },
    {
      label: "Year",
      value: "year",
    },
  ]

  return list.map((item) => ({
    value: item.value,
    label: item.label + addition,
  }))
}

export function CustomRecurringForm({
  open,
  setOpen,
  onSave,
}: CustomRecurringFormProps) {

  const [repeatCount, setRepeatCount] = useState<number>(1)
  const [repeatPeriod, setRepeatPeriod] = useState<string>("day")
  const [repeatEnd, setRepeatEnd] = useState<string>("never")
  const [repeatOccurrence, setRepeatOccurrence] = useState<number>(1)

  const optionsPeriod = useMemo(() => periods(repeatCount), [repeatCount])

  const form = useForm({
    resolver: zodResolver(getSchema(repeatPeriod, repeatEnd)),
    defaultValues: {
      everyNumber: 1,
      everyPeriod: "day",
      days: [] as string[],
      endsOn: "",
      afterOccurence: 1,
    },
  })

  useEffect(() => {
    form.setValue("everyNumber", repeatCount)
    form.setValue("afterOccurence", repeatOccurrence)
    form.setValue("everyPeriod", "day")
  }, [])

  useEffect(() => {
    setRepeatPeriod(form.watch("everyPeriod"))
  }, [form.watch("everyPeriod")])

  const handleSave = async () => {
    const isValid = await form.trigger()
    if (isValid) {
        form.handleSubmit(onSave)()
        //close the popup
        setOpen(false)
        form.reset()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Custom recurrence</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FormTextField
                name="everyNumber"
                form={form}
                type="number"
                label="Repeat every"
                orientation="horizontal"
              />
              <NumberInputStepper
                max={100}
                min={1}
                value={repeatCount}
                onChange={(val) => {
                  setRepeatCount(val)
                  form.setValue("everyNumber", val)
                }}
              />
              <FormTextField
                label=""
                name="everyPeriod"
                form={form}
                type="select"
                options={optionsPeriod}
              />
            </div>

            {repeatPeriod === "week" && (
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
                              <FormLabel className="font-normal">
                                {day}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    )
                  )}
                </div>
                <p className={cn("text-[0.8rem] font-medium text-destructive")}>
                  {form.formState.errors.days?.message}
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-x-2">
                    <RadioGroupItem value="endsOn" id="r2" />
                    <Label htmlFor="r2">On</Label>
                  </div>
                  <div>
                    <FormTextField
                      name="endsOn"
                      type="date"
                      form={form}
                      disabled={repeatEnd !== "endsOn"}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-x-2">
                    <RadioGroupItem value="after" id="r3" />
                    <Label htmlFor="r3">After</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FormTextField
                      label=""
                      name="afterOccurence"
                      form={form}
                      type="number"
                      disabled={repeatEnd !== "after"}
                    />
                    <Label
                      className={cn(
                        repeatEnd !== "after" ? "text-zinc-500" : ""
                      )}
                    >
                      Occurence{repeatOccurrence > 1 && "s"}
                    </Label>
                    <NumberInputStepper
                      max={100}
                      min={1}
                      value={repeatOccurrence}
                      disabled={repeatEnd !== "after"}
                      onChange={(val) => {
                        setRepeatOccurrence(val)
                        form.setValue("afterOccurence", val)
                      }}
                    />
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        </Form>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSave} variant="button-primary">
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
