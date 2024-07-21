import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useLocalStorage } from "usehooks-ts"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import InputSwitch, { SelectOptions } from "@/components/form/InputSwitch"
import { useTimeZones } from "@/lib/hooks/time-zones"

export type DisplayOption = "numbers" | "percentage" | "numbers-percentages"

export default function DefaultTimezone() {
  const [value, setValue] = useLocalStorage("timezone_option", "Pacific/Wake", {
    initializeWithValue: false, // For SSR compatibility
  })

  const { data: timeZones, isLoading: isLoadingTimeZones } = useTimeZones()

  const timeZoneOptions =
    timeZones &&
    timeZones?.data?.map((tz: any) => ({
      value: String(tz.ID),
      label: tz.name,
    }))


  const timezoneForm = useForm({
    defaultValues: {
      timezone_option: "Pacific/Wake",
    },
  })

  useEffect(() => {
    if (value) {
      timezoneForm.setValue("timezone_option", value)
    }
  }, [value])

  function handleSaveTimezoneOption(data: { timezone_option: string }) {
    // For now, we are just saving the timezone option to local storage
    // Later, we will save it to the backend
    setValue(data.timezone_option)

    toast({
      title: "Timezone Saved",
      description: "The default timezone has been set to " + data.timezone_option,
    })
  }

  return (
    <div className="flex flex-col gap-2 pt-2 max-w-screen-md">
      <label htmlFor="timezone_option" className="text-sm text-muted-foreground">
        Set default Timezone:
      </label>
      <Form {...timezoneForm}>
        <form onSubmit={timezoneForm.handleSubmit(handleSaveTimezoneOption)}>
          <div className="flex items-center gap-4">
            <InputSwitch
              placeholder="Timezone"
              name="timezone_option"
              selectOptions={timeZoneOptions}
              type="select"
            />
            <Button variant="button-primary">Save</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
