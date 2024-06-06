"use client"

import { Checkbox } from "@/components/ui/checkbox"

export function FilterCheckbox(props: any) {
    const { name, id, onChange, value } = props
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id}
        value={value}
        onCheckedChange={onChange}
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
       {name}
      </label>
    </div>
  )
}
