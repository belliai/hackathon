"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

// BookingCount component
export function BookingCount() {
  // Array of tags
  const bookingCounts = Array.from({ length: 50 }).map(
    (_, i, a) => `x.${a.length - i}`
  )

  return (
    <ScrollArea className="h-72 w-1/2 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">
          Booking Counts
        </h4>
        {bookingCounts.map((count, index) => (
          <div
            key={count}
            className="flex items-center justify-between text-sm"
          >
            <span>{count}</span>
            <Progress value={(index + 1) * 2} />
            <span className="ml-2">{(index + 1) * 2}%</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
