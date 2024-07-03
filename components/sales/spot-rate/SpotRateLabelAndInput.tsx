import { Input } from "@/components/ui/input"

import SpotRateDropDown from "./SpotRateDropDown"

interface SpotRateLabelAndInputProps {
  label: string
  type?: string
  defaultValue?: string
  className?: string
  required?: boolean
  children?: React.ReactNode
}

const SpotRateLabelAndInput = ({
  label,
  type = "text",
  defaultValue = "",
  className = "",
  required = false,
  children,
}: SpotRateLabelAndInputProps) => {
  return (
    <div className="flex items-center gap-2">
      <label className={`whitespace-nowrap`}>
        {label} {required && "*"}
      </label>
      <Input type={type} defaultValue={defaultValue} className={className} />
      {children}
    </div>
  )
}

const SpotRateLabelAndDropDown = ({
  label,
  type = "text",
  defaultValue = "",
  className = "",
  required = false,
  children,
}: SpotRateLabelAndInputProps) => {
  return (
    <div className="flex items-center gap-2">
      <label className={`whitespace-nowrap`}>
        {label} {required && "*"}
      </label>
      <SpotRateDropDown />
      {children}
    </div>
  )
}

export { SpotRateLabelAndInput, SpotRateLabelAndDropDown }
