"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export function FilterCheckbox(props: any) {
    const { name, id, onChange, value, className } = props
  return (
    <div className={cn("flex items-center space-x-2",className)}>
      <Checkbox id={id}
        value={value}
        onCheckedChange={onChange}
      />
      <label
        htmlFor="terms"
        className="text-xs opacity-50 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-30"
      >
       {name}
      </label>
    </div>
  )
}