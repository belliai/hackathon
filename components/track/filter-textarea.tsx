import React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

import { Textarea } from "../ui/textarea"

const FilterTextarea = ({
  value: initialValue,
  onChange,
  debounce = 500,
  title,
  className,
  ...props
}: {
  title: string
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
  className?: string
  [x: string]: any
} & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange">) => {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={cn("flex-col", className)}>
      <Label className="text-xs opacity-50">{title}</Label>
      <Textarea
        className="h-8 focus:ring-indigo-600 focus-visible:ring-1 focus-visible:ring-indigo-600 active:ring-indigo-600"
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default FilterTextarea
