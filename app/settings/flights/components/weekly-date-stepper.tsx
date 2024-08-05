import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { startOfWeek, endOfWeek, addWeeks, subWeeks, format } from "date-fns";

type WeeklyDateRange = {
  from: Date;
  to: Date;
};

type WeeklyDateStepperProps = {
  value: WeeklyDateRange;
  onChange: (val: WeeklyDateRange) => void;
  disabled?: boolean;
};

const WeeklyDateStepper = ({
  value,
  onChange,
  disabled = false,
}: WeeklyDateStepperProps) => {
  const handleNextWeek = () => {
    if (!disabled) {
      const nextFrom = addWeeks(value.from, 1);
      const nextTo = endOfWeek(nextFrom, { weekStartsOn: 1 });
      onChange({ from: nextFrom, to: nextTo });
    }
  };

  const handlePreviousWeek = () => {
    if (!disabled) {
      const prevFrom = subWeeks(value.from, 1);
      const prevTo = endOfWeek(prevFrom, { weekStartsOn: 1 });
      onChange({ from: prevFrom, to: prevTo });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <ChevronLeft
        onClick={!disabled ? handlePreviousWeek : undefined}
        size={24}
        className={`hover:text-blue-300 cursor-pointer ${disabled ? "text-gray-400 cursor-not-allowed" : ""}`}
      />
      <div className="text-sm">
        {format(value.from, "MMM d, yyyy")} - {format(value.to, "MMM d, yyyy")}
      </div>
      <ChevronRight
        onClick={!disabled ? handleNextWeek : undefined}
        size={24}
        className={`hover:text-blue-300 cursor-pointer ${disabled ? "text-gray-400 cursor-not-allowed" : ""}`}
      />
    </div>
  );
};

export default WeeklyDateStepper;