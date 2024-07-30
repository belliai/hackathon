import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

type NumberInputStepperProps = {
  value: number
  onChange: (val: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  suffix?: string
}

const NumberInputStepper = ({
  value = 0,
  onChange,
  min = 1,
  max = 100,
  step = 1,
  disabled = false,
  suffix,
}: NumberInputStepperProps) => {

  const handleAction = () => {
    if(isNaN(value)) { onChange(min); return}
  }


  const handleIncrement = () => {
    if (value < max) {
      const val = parseInt(value.toString()) + step
      onChange(val)
    }
  }

  const handleDecrement = () => {
    if (value > min) {
      const val = parseInt(value.toString()) - step
      onChange(val)
    }
  }

  return (
    <div className="flex items-center space-x-1">
      {suffix && <p className="ml-[-5px] text-xs">{suffix}</p>}
      <div className="flex-col items-center space-y-1">
        <ChevronUp
          onClick={!disabled && value  < max ? handleIncrement : handleAction}
          size={12}
          className={`cursor-pointer hover:text-blue-300 ${disabled || value >= max ? "cursor-not-allowed text-gray-400" : ""}`}
        />
        <ChevronDown
          onClick={!disabled && value > min ? handleDecrement : handleAction}
          size={12}
          className={`cursor-pointer hover:text-blue-300 ${disabled || value <= min ? "cursor-not-allowed text-gray-400" : ""}`}
        />
      </div>
    </div>
  )
}

export default NumberInputStepper
