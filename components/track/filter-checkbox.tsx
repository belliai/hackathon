"use client"

import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

export function FilterCheckbox(props: any) {
  const { name, id, onChange, value, className } = props
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Checkbox id={id} value={value} onCheckedChange={onChange} />
      <label
        htmlFor="terms"
        className="text-xs font-medium leading-none opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-30"
      >
        {name}
      </label>
    </div>
  )
}
