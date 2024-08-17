"use client"

import { ReactNode, useMemo, useState } from "react"
import { format } from "date-fns"
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"
import {
  Formatter,
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent"

import { useDefaultMeasurements } from "@/lib/hooks/units/default-measurement"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { chartConfig } from "../constants/chart-config"
import { dataDisplay } from "../constants/data-display"
import {
  endDate,
  FlightData,
  groupDataByDate,
  groupDataByRoute,
  startDate,
} from "../utils/generate-mock-data"

type DataGroup = ArrayElement<typeof dataDisplay>

type DataDisplay = ArrayElement<DataGroup["children"]>

type ReportCardProps = {
  initialDisplayGroup: DataGroup["key"]
  data: FlightData[]
  className?: HTMLDivElement["className"]
}

type FormatterType = DataDisplay["formatter"]

type GroupBy = "day" | "route"

function findChildByKey(key: string): DataDisplay | undefined {
  for (const item of dataDisplay) {
    for (const child of item.children) {
      if (child.key === key) {
        return child
      }
    }
  }
  return undefined // Return undefined if no match is found
}

export default function ReportCard(props: ReportCardProps) {
  const [selectedGroup, setSelectedGroup] = useState<DataGroup | undefined>(
    dataDisplay.find((item) => item.key === props.initialDisplayGroup)
  )

  const [selectedDisplay, setSelectedDisplay] = useState<
    DataDisplay | undefined
  >(selectedGroup?.children[0])

  const [grouping, setGrouping] = useState<GroupBy>("day")

  const { data } = useDefaultMeasurements()
  const volumeSymbol = data?.volume_unit.symbol
  const weightSymbol = data?.weight_unit.symbol

  const labelFormatterMap: Record<
    FormatterType,
    (value: number | string) => string
  > = useMemo(
    () => ({
      volume: (val) => `${val}`,
      weight: (val) => `${val}`,
      percentage: (val: number | string) => `${Number(val).toFixed(1)}%`,
      currency: (val) => `$${Number(val).toFixed(1)}`,
    }),
    [volumeSymbol, weightSymbol]
  )

  const tooltipFormatterMap: Record<
    FormatterType,
    (value: number | string) => ReactNode
  > = useMemo(
    () => ({
      volume: (val) => (
        <>
          {val}
          <span className="font-normal text-muted-foreground">
            {volumeSymbol}
          </span>
        </>
      ),
      weight: (val) => (
        <>
          {val}
          <span className="font-normal text-muted-foreground">
            {weightSymbol}
          </span>
        </>
      ),
      percentage: (val: number | string) => (
        <>
          {Number(val).toFixed(1)}
          <span className="font-normal text-muted-foreground">%</span>
        </>
      ),
      currency: (val) => (
        <>
          <span className="font-normal text-muted-foreground">$</span>
          {Number(val).toFixed(1)}
        </>
      ),
    }),
    [volumeSymbol, weightSymbol]
  )

  const { groupedDataByDate, groupedDataByRoute } = useMemo(() => {
    return {
      groupedDataByDate: groupDataByDate(props.data),
      groupedDataByRoute: groupDataByRoute(props.data),
    }
  }, [props.data])

  const tooltipFormatter: Formatter<ValueType, NameType> = (
    value,
    name,
    item
  ) => {
    if (!selectedDisplay) return undefined
    return (
      <div>
        <div className="inline-flex items-center gap-1.5">
          <div
            className="h-3.5 w-1.5 shrink-0 rounded-[2px] bg-[--color-bg]"
            style={
              {
                "--color-bg": `var(--color-base)`,
              } as React.CSSProperties
            }
          />
          <span className="text-muted-foreground">
            {chartConfig[name as keyof typeof chartConfig]?.label || name}
          </span>

          <div className="ml-1 flex items-baseline gap-0.5 font-mono font-bold tabular-nums text-foreground">
            {tooltipFormatterMap[selectedDisplay.formatter](value.toString())}
          </div>
        </div>
      </div>
    )
  }

  if (!selectedDisplay) return null

  return (
    <Card className={cn("divide-y", props.className)}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-0">
          <DropdownMenu>
            <div className="inline-flex cursor-pointer items-center gap-3">
              <CardTitle>{selectedDisplay.fullLabel}</CardTitle>
            </div>
          </DropdownMenu>
          <CardDescription className="text-xs">
            {format(startDate, "dd MMM yyyy")} -{" "}
            {format(endDate, "dd MMM yyyy")}
          </CardDescription>
        </div>
        <div className="inline-flex items-center gap-2">
          <Select
            value={selectedDisplay.key}
            onValueChange={(val) =>
              setSelectedDisplay(
                selectedGroup?.children.find((item) => item.key === val)
              )
            }
          >
            <SelectTrigger className="h-8 w-[130px]">
              <SelectValue placeholder="Group By" />
            </SelectTrigger>
            <SelectContent>
              {selectedGroup?.children.map((display) => (
                <SelectItem key={display.key} value={display.key}>
                  {display.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={grouping}
            onValueChange={(val) => setGrouping(val as GroupBy)}
          >
            <SelectTrigger className="h-8 w-[130px]">
              <SelectValue placeholder="Group By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">By Day</SelectItem>
              <SelectItem value="route">By Route</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <ChartContainer
          config={chartConfig}
          className="h-[300px] w-full overflow-y-auto"
        >
          {grouping === "day" ? (
            <BarChart
              accessibilityLayer
              data={groupedDataByDate}
              margin={{
                top: 20,
              }}
            >
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value: string | number | Date) =>
                  format(new Date(value), "eee")
                }
              />
              <ChartTooltip
                labelFormatter={(value: string | number | Date) =>
                  format(new Date(value), "eee, dd-MM-yyyy")
                }
                content={<ChartTooltipContent formatter={tooltipFormatter} />}
              />
              <Bar
                max={100}
                dataKey={selectedDisplay.dataKey}
                fill="var(--color-base)"
                radius={4}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-muted-foreground"
                  fontSize={12}
                  formatter={labelFormatterMap[selectedDisplay.formatter]}
                />
              </Bar>
            </BarChart>
          ) : (
            <BarChart
              accessibilityLayer
              data={groupedDataByRoute}
              layout="vertical"
              margin={{
                right: 48,
                left: 16,
              }}
            >
              <YAxis
                dataKey="route"
                type="category"
                minTickGap={0}
                tickLine={false}
                tickMargin={8}
                axisLine={false}
              />
              <XAxis dataKey={selectedDisplay.dataKey} type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent formatter={tooltipFormatter} />}
              />
              <Bar
                dataKey={selectedDisplay.dataKey}
                layout="vertical"
                fill="var(--color-base)"
                radius={4}
              >
                <LabelList
                  dataKey={selectedDisplay.dataKey}
                  position="right"
                  offset={8}
                  className="fill-muted-foreground"
                  fontSize={12}
                  formatter={labelFormatterMap[selectedDisplay.formatter]}
                />
              </Bar>
            </BarChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
