"use client"

import { useMemo } from "react"
import { format } from "date-fns"
import { ArrowRight, Calendar, HandCoins, PlaneTakeoff } from "lucide-react"

import { useLocations } from "@/lib/hooks/locations"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import ReportCard from "./components/report-card"
import {
  endDate,
  generateMockData,
  startDate,
} from "./utils/generate-mock-data"

export default function Page() {
  const { data: locations } = useLocations()

  const locationsList = useMemo(
    () => locations?.map((item: { name: string }) => item.name) ?? [],
    [locations]
  )

  const mockData = useMemo(() => {
    if (locationsList.length < 2) return []
    return generateMockData(locationsList)
  }, [locationsList])

  console.log({ mockData })

  const totalRevenue = useMemo(
    () => mockData.reduce((total, flight) => total + flight.revenue, 0),
    [mockData]
  )

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="grid grid-cols-1 gap-4">
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <Calendar className="size-6 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-0.5">
            <CardDescription className="text-button-primary">
              Period
            </CardDescription>
            <CardTitle className="inline-flex items-center gap-2 text-xl">
              <span>{format(new Date(startDate), "dd MMM yyyy")}</span>
              <ArrowRight className="size-3 text-muted-foreground" />
              <span>{format(new Date(endDate), "dd MMM yyyy")}</span>
            </CardTitle>
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <HandCoins className="size-6 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-0.5">
            <CardDescription className="text-button-primary">
              Total Revenue
            </CardDescription>
            <CardTitle className="text-xl">
              $ {totalRevenue.toLocaleString()}
            </CardTitle>
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <PlaneTakeoff className="size-6 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-0.5">
            <CardDescription className="text-button-primary">
              Total Flights
            </CardDescription>
            <CardTitle className="text-xl">{mockData.length} Flights</CardTitle>
          </CardContent>
        </Card>
      </div>
      <ReportCard
        className="col-span-3"
        data={mockData}
        initialDisplayGroup="revenue"
      />
      <ReportCard
        className="col-span-2"
        data={mockData}
        initialDisplayGroup="volume"
      />
      <ReportCard
        className="col-span-2"
        data={mockData}
        initialDisplayGroup="weight"
      />
    </div>
  )
}
