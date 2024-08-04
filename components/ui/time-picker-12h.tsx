"use client"

import * as React from "react"

import { getPeriod, Period } from "@/lib/utils/time-picker-utils"
import { Label } from "@/components/ui/label"

import { TimePeriodSelect } from "./time-period-select"
import { TimePickerInput } from "./time-picker-input"

interface TimePickerDemoProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

export function TimePicker12({ date, setDate }: TimePickerDemoProps) {
  const [period, setPeriod] = React.useState<Period>(
    date ? getPeriod(new Date(date)) : "AM"
  )

  const minuteRef = React.useRef<HTMLInputElement>(null)
  const hourRef = React.useRef<HTMLInputElement>(null)
  const secondRef = React.useRef<HTMLInputElement>(null)
  const periodRef = React.useRef<HTMLButtonElement>(null)

  return (
    <div className="flex items-end gap-4">
      <div className="inline-flex items-center gap-2">
        <div className="grid gap-1">
          <TimePickerInput
            picker="12hours"
            period={period}
            date={date}
            setDate={setDate}
            ref={hourRef}
            onRightFocus={() => minuteRef.current?.focus()}
          />
        </div>
        <span>:</span>
        <div className="grid gap-1">
          <TimePickerInput
            picker="minutes"
            id="minutes12"
            date={date}
            setDate={setDate}
            ref={minuteRef}
            onLeftFocus={() => hourRef.current?.focus()}
            onRightFocus={() => secondRef.current?.focus()}
          />
        </div>
      </div>
      <div className="grid gap-1">
        <TimePeriodSelect
          period={period}
          setPeriod={setPeriod}
          date={date}
          setDate={setDate}
          ref={periodRef}
          onLeftFocus={() => secondRef.current?.focus()}
        />
      </div>
    </div>
  )
}
