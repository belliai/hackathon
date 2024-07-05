import { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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
    <div className="flex flex-col items-center justify-center">
      <div
        className={cn(
          "w-full overflow-hidden rounded-lg border p-2 shadow-md transition-all duration-300 ease-in-out",
          isVisible ? "max-h-fit opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {/* Content of dropdown */}
        <div className="flex items-center gap-4 rounded-md p-2 shadow-md">
          {fields.map((field) => (
            <input
              key={field}
              type="text"
              value={formData[field]}
              placeholder={field}
              className="flex-grow rounded-md border bg-inherit p-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-400"
              onChange={(e) => handleChange(e, field)}
            />
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
    </div>
  )
}
