"use client"

import { useMemo, useState } from "react"
import { format } from "date-fns"
import { ChevronDown, XCircleIcon } from "lucide-react"
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"

import { useLocations } from "@/lib/hooks/locations"
import { useDefaultMeasurements } from "@/lib/hooks/units/default-measurement"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

import {
  endDate,
  generateMockData,
  groupDataByDate,
  groupDataByRoute,
  startDate,
} from "./utils/generate-mock-data"

type GroupBy = "day" | "route"

const dataDisplay = [
  {
    label: "Volume",
    children: [
      {
        label: "Utilization",
        fullLabel: "Volume Utilization %",
        key: "volume-utilization",
        dataKey: "volumeUtilization",
        formatter: "percentage",
      },
      {
        label: "Value",
        fullLabel: "Volume",
        key: "volume-value",
        dataKey: "volume",
        formatter: "volume",
      },
    ],
  },
  {
    label: "Weight",
    children: [
      {
        label: "Utilization",
        fullLabel: "Weight Utilization %",
        key: "weight-utilization",
        dataKey: "weightUtilization",
        formatter: "percentage",
      },
      {
        label: "Value",
        fullLabel: "Weight",
        key: "weight-value",
        dataKey: "weight",
        formatter: "weight",
      },
    ],
  },
  {
    label: "Revenue",
    children: [
      {
        label: "Per Kg",
        fullLabel: "Revenue Per Kg",
        key: "revenue-per-kg",
        dataKey: "revenuePerKg",
        formatter: "currency",
      },
      {
        label: "Per Flight",
        fullLabel: "Revenue Per Flight",
        key: "revenue-per-flight",
        dataKey: "revenuePerFlight",
        formatter: "currency",
      },
    ],
  },
] as const

const chartConfig = {
  volumeUtilization: {
    label: "Volume Utilization",
  },
  volume: {
    label: "Volume",
  },
  weightUtilization: {
    label: "Weight Utilization",
  },
  revenuePerKg: {
    label: "Revenue Per Kg",
  },
  revenuePerFlight: {
    label: "Revenue Per Flight",
  },
  weight: {
    label: "Weight",
  },
  base: {
    color: "#FB5727",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig

type FormatterType = ArrayElement<
  ArrayElement<typeof dataDisplay>["children"]
>["formatter"]

export default function Page() {
  const [grouping, setGrouping] = useState<GroupBy>("day")

  const [originFilter, setOriginFilter] = useState<null | string>(null)
  const [destinationFilter, setDestinationFilter] = useState<null | string>(
    null
  )

  const routeFilter = useMemo(() => {
    if (!originFilter || !destinationFilter) return null
    return `${originFilter}-${destinationFilter}`
  }, [originFilter, destinationFilter])

  console.log({ routeFilter })

  const { data } = useDefaultMeasurements()
  const volumeSymbol = data?.volume_unit.symbol
  const weightSymbol = data?.weight_unit.symbol

  const [selectedDisplay, setSelectedDisplay] = useState<
    ArrayElement<ArrayElement<typeof dataDisplay>["children"]>
  >(dataDisplay[0]["children"][0])

  const formatterMap: Record<
    FormatterType,
    (value: number | string) => string
  > = useMemo(
    () => ({
      volume: (val) => `${val} ${volumeSymbol}`,
      weight: (val) => `${val} ${weightSymbol}`,
      percentage: (val: number | string) => `${Number(val).toFixed(2)}%`,
      currency: (val) => `$${val}`,
    }),
    [volumeSymbol, weightSymbol]
  )

  const { data: locations } = useLocations()

  const locationsList = useMemo(
    () => locations?.map((item: { name: string }) => item.name) ?? [],
    [locations]
  )

  const { groupedDataByDate, groupedDataByRoute } = useMemo(() => {
    if (locationsList.length < 2) {
      return {
        groupedDataByDate: [],
        groupedDataByRoute: [],
      }
    }
    const mockData = generateMockData(locationsList)
    return {
      groupedDataByDate: groupDataByDate(mockData),
      groupedDataByRoute: groupDataByRoute(mockData),
    }
  }, [locationsList])

  const filteredGroupedDataByRoute = useMemo(() => {
    if (!routeFilter) return groupedDataByRoute
    return groupedDataByRoute.filter((item) => item.route === routeFilter)
  }, [routeFilter, groupedDataByRoute])

  return (
    <div className="grid grid-cols-3">
      <Card className="col-span-2 divide-y">
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div className="space-y-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="inline-flex cursor-pointer items-center gap-3">
                  <CardTitle>{selectedDisplay.fullLabel}</CardTitle>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                sideOffset={10}
                alignOffset={-10}
                align="start"
                side="bottom"
                className="w-56"
              >
                <DropdownMenuGroup>
                  {dataDisplay.map((displayGroup, index) => (
                    <DropdownMenuSub key={index}>
                      <DropdownMenuSubTrigger>
                        <span>{displayGroup.label}</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          {displayGroup.children.map((display) => (
                            <DropdownMenuItem
                              key={display.key}
                              onClick={() => setSelectedDisplay(display)}
                            >
                              <span>{display.label}</span>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <CardDescription className="text-xs">
              {format(startDate, "dd-MM-yyyy")} -{" "}
              {format(endDate, "dd-MM-yyyy")}
            </CardDescription>
          </div>
          <div className="inline-flex items-center gap-2">
            {grouping === "route" && (
              <>
                {routeFilter && (
                  <Button
                    variant={"ghost"}
                    size={"fit"}
                    onClick={() => {
                      setOriginFilter(null)
                      setDestinationFilter(null)
                    }}
                  >
                    <XCircleIcon className="size-4 text-muted-foreground" />
                  </Button>
                )}
                <Select
                  value={originFilter ?? ""}
                  onValueChange={setOriginFilter}
                >
                  <SelectTrigger className="h-8 w-[120px]">
                    <SelectValue placeholder="Origin" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationsList.map((item: string) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={destinationFilter ?? ""}
                  onValueChange={setDestinationFilter}
                >
                  <SelectTrigger className="h-8 w-[120px]">
                    <SelectValue placeholder="Destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationsList.map((item: string) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Separator orientation="vertical" className="w-1 bg-muted" />
              </>
            )}
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
                  tickFormatter={(value) => format(new Date(value), "eee")}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
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
                    formatter={formatterMap[selectedDisplay.formatter]}
                  />
                </Bar>
              </BarChart>
            ) : (
              <BarChart
                accessibilityLayer
                data={filteredGroupedDataByRoute}
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
                  content={<ChartTooltipContent indicator="line" />}
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
                    formatter={formatterMap[selectedDisplay.formatter]}
                  />
                </Bar>
              </BarChart>
            )}
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
