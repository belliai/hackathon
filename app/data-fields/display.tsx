import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useLocalStorage } from "usehooks-ts"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import InputSwitch, { SelectOptions } from "@/components/form/InputSwitch"

export type DisplayOption = "numbers" | "percentage" | "numbers-percentages"

export default function DisplaySettings() {
  const [value, setValue] = useLocalStorage("display_option", "numbers", {
    initializeWithValue: false, // For SSR compatibility
  })

  const displaySelectoptions: SelectOptions = [
    {
      value: "numbers",
      label: "500/10,000 kg",
    },
    {
      value: "percentage",
      label: "",
      component: (
        <div className="flex w-full gap-2 items-center">
          <span className="w-12 whitespace-nowrap rounded-sm bg-button-primary px-1 py-0.5 text-center text-sm">
            50%
          </span>
          <span className="text-xs italic text-muted-foreground">
            *Detail will be shown on hover
          </span>
        </div>
      ),
    },
    {
      value: "numbers-percentages",
      label: "",
      component: (
        <div className="flex items-center gap-2">
          <span className="w-12 whitespace-nowrap rounded-sm bg-button-primary px-1 py-0.5 text-center text-sm">
            50%
          </span>
          <span>500/10,000 kg</span>
        </div>
      ),
    },
  ]

  const displayForm = useForm({
    defaultValues: {
      displayOption: "numbers-percentages",
    },
  })

  useEffect(() => {
    if (value) {
      displayForm.setValue("displayOption", value)
    }
  }, [value])

  function handleSaveDisplayOption(data: { displayOption: string }) {
    // For now, we are just saving the display option to local storage
    // Later, we will save it to the backend
    setValue(data.displayOption)

    toast({
      title: "Display Option Saved",
      description: "The display option has been set to " + data.displayOption,
    })
  }

  return (
    <div className="flex flex-col gap-2 pt-2 max-w-screen-md">
      <label htmlFor="displayOption" className="text-sm text-muted-foreground">
        Display actual and maximum as:
      </label>
      <Form {...displayForm}>
        <form onSubmit={displayForm.handleSubmit(handleSaveDisplayOption)}>
          <div className="flex items-center gap-4">
            <InputSwitch
              placeholder="Display Option"
              name="displayOption"
              selectOptions={displaySelectoptions}
              type="select"
            />
            <Button variant="button-primary">Save</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
