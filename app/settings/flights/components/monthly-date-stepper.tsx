import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { startOfMonth, endOfMonth, addMonths, subMonths, format } from "date-fns";

type MonthlyDateRange = {
  from: Date;
  to: Date;
};

type MonthlyDateStepperProps = {
  value: MonthlyDateRange;
  onChange: (val: MonthlyDateRange) => void;
  disabled?: boolean;
};

const MonthlyDateStepper = ({
  value,
  onChange,
  disabled = false,
}: MonthlyDateStepperProps) => {
  const handleNextMonth = () => {
    if (!disabled) {
      const nextFrom = addMonths(value.from, 1);
      const nextTo = endOfMonth(nextFrom);
      onChange({ from: nextFrom, to: nextTo });
    }
  };

  const handlePreviousMonth = () => {
    if (!disabled) {
      const prevFrom = subMonths(value.from, 1);
      const prevTo = endOfMonth(prevFrom);
      onChange({ from: prevFrom, to: prevTo });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <ChevronLeft
        onClick={!disabled ? handlePreviousMonth : undefined}
        size={24}
        className={`hover:text-blue-300 cursor-pointer ${disabled ? "text-gray-400 cursor-not-allowed" : ""}`}
      />
      <div className="text-sm">
        {format(value.from, "MMMM yyyy")}
      </div>
      <ChevronRight
        onClick={!disabled ? handleNextMonth : undefined}
        size={24}
        className={`hover:text-blue-300 cursor-pointer ${disabled ? "text-gray-400 cursor-not-allowed" : ""}`}
      />
    </div>
  );
};

export default MonthlyDateStepper;
