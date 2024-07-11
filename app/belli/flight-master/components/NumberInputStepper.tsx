import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type NumberInputStepperProps = {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
};

const NumberInputStepper = ({
  value,
  onChange,
  min = 1,
  max = 100,
  step = 1,
  disabled = false,
}: NumberInputStepperProps) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + step);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - step);
    }
  };

  return (
    <div className="flex-col items-center space-y-2">
      <ChevronUp
        onClick={!disabled && value < max ? handleIncrement : undefined}
        size={12}
        className={`hover:text-blue-300 cursor-pointer ${disabled || value >= max ? "text-gray-400 cursor-not-allowed" : ""}`}
      />
      <ChevronDown
        onClick={!disabled && value > min ? handleDecrement : undefined}
        size={12}
        className={`hover:text-blue-300 cursor-pointer ${disabled || value <= min ? "text-gray-400 cursor-not-allowed" : ""}`}
      />
    </div>
  );
};

export default NumberInputStepper;
