import moment from "moment"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

/**
 * Area Chart for Cargo Capacity
 * For now it is using dummy data, later it will be replaced with actual data passed from the props
 */
export default function CargoCapacityAreaChart() {
  const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
    const month = moment().subtract(i, "months").format("MMM")

    /**
     * 85% for current month
     * 30% 2 months ago
     * 10% 5 months ago
     * Random values for the rest
     */

    const capacity =
      i === 0
        ? 85
        : i === 2
          ? 30
          : i === 5
            ? 10
            : Math.floor(Math.random() * 100)

    return {
      month,
      capacity,
    }
  }).reverse()

  return (
    <div className="mx-auto flex w-full max-w-md">
      <ChartContainer
        config={{
          capacity: {
            label: "Capacity",
            color: "#FB5727",
          },
        }}
        className="min-h-[300px] w-full"
      >
        <AreaChart
          accessibilityLayer
          data={lastSixMonths}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" isPercentage />}
          />
          <Area
            dataKey="capacity"
            type="natural"
            fill="var(--color-capacity)"
            fillOpacity={0.4}
            stroke="var(--color-capacity)"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
