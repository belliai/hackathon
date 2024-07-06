import { useState } from "react"

import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import InputSwitch from "@/components/form/InputSwitch"

interface AddNewSettingProps {
  isVisible: boolean
  toggleVisibility: () => void
  onSave: (data: Record<string, any>) => void
  fields: string[] // List of fields to be displayed
}

export default function AddNewSetting({
  isVisible,
  toggleVisibility,
  onSave,
  fields,
}: AddNewSettingProps) {
  const [formData, setFormData] = useState<Record<string, any>>(
    fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {})
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const handleSave = () => {
    onSave(formData)
    setFormData(fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {})) // Clear the input fields
    toggleVisibility()
  }

  return (
    <Accordion collapsible type="single">
      <AccordionItem value="item" className="space-y-4 border-b-0">
        <AccordionTrigger
          className="flex flex-row justify-end p-0 hover:no-underline"
          customarrow={<></>}
        >
          <Button variant={"button-primary"}>Add new</Button>
        </AccordionTrigger>
        <AccordionContent className="border-none p-0">
          <div
            className={cn(
              "w-full overflow-hidden rounded-lg border p-2 shadow-md transition-all duration-300 ease-in-out"
            )}
          >
            {/* Content of dropdown */}
            <div className="flex items-center gap-4 rounded-md p-2 shadow-md">
              {fields.map((field) => (
                <InputSwitch
                  key={field}
                  name={field}
                  type="text"
                  placeholder="Field"
                />
                // <input
                //   key={field}
                //   type="text"
                //   value={formData[field]}
                //   placeholder={field}
                //   className="flex-grow rounded-md border bg-inherit p-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                //   onChange={(e) => handleChange(e, field)}
                // />
              ))}
              <div className="flex gap-2">
                <Button variant="secondary" onClick={toggleVisibility}>
                  Cancel
                </Button>
                <Button
                  className="rounded-sm"
                  variant={"button-primary"}
                  onClick={handleSave}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
