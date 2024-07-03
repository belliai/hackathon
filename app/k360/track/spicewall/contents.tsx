"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import FilterDatePicker from "@components/track/filter-date-picker"
import FilterSelect from "@components/track/filter-select"
import { DataTable } from "@components/track/table"
import { formatDistance } from "date-fns"
import { Download, RefreshCw, Search, SlidersHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Alert } from "@/components/track/alert"
import FilterDebouncedInput from "@/components/track/filter-input"

import { columns } from "./columns"
import { dummyData } from "./dummy-data"
import { Timeline } from "./timeline"

type ContentProps = {
  title: string
}

const initFilter = {
  userEmail: "",
  role: "",
  fromDate: "",
  toDate: "",
}

const dummyJson = {
  task_id: 19675,
  status_details_id: 300,
  airport_code: "DEL",
  city: "Delhi",
  booking_type: "A2A",
  task_completed_by: "Ajay Chauhan",
  a2a_total_piece: 1,
  a2a_total_weight: "10.00",
  route_origin: "DEL",
  route_destination: "BOM",
  flight_code: "SG709",
  flight_departure: "2024-05-17 19:35:00",
  created_at: "2024-05-17 15:02:27",
  updated_at: "2024-05-17 15:02:27",
  partial_piece_count: null,
  partial_mb_count: null,
  formatted_address: null,
  flight_arrival: null,
  mother_bag_offloaded: null,
  task_completed_by_id: null,
  remark: null,
  id: 300,
  display_name: "AWB is Accepted",
  description: "AWB is Accepted",
  registration_no: null,
  warehouse_name: null,
  warehouse_code: null,
  airport_name: "Delhi",
  user_email: "ajay.chauhan1@spicejet.com",
  awb_number: "775-60073952",
}

const Contents = (props: ContentProps) => {
  const { title } = props
  const [data, setData] = useState<Array<any>>(dummyData)
  const [allFilter, setAllfilter] = useState<boolean>(false)
  const [filter, setFilter] = useState<any>(initFilter)

  const resetFilter = () => {
    setFilter(initFilter)
  }

  const onSelectFilter = (key: string, val: any) => {
    setFilter((prev: any) => ({
      ...prev,
      [key]: val,
    }))
  }

  useEffect(() => {}, [filter])

  return (
    <div className="flex-col space-y-4">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div>
        <div className="flex items-center space-x-2 rounded-md border border-zinc-800 p-4">
          <div className="h-8 opacity-40 hover:opacity-60">
            <SlidersHorizontal
              onClick={() => setAllfilter(!allFilter)}
              className={cn(
                "cursor-pointer",
                allFilter && "text-indigo-400 text-opacity-80"
              )}
            />
          </div>
          <div className="grid gap-x-2 gap-y-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7">
            <FilterSelect
              options={[
                { key: "level1", value: "Level 1" },
                { key: "level2", value: "Level 2" },
                { key: "level3", value: "Level 3" },
              ]}
              onChange={(val: any) => onSelectFilter("role", val)}
              name="Select Role"
              value={filter.role}
              className=""
            />
            <FilterDebouncedInput
              onChange={(val: any) => onSelectFilter("userEmail", val)}
              title="userEmail/Code"
              value={filter.userEmail}
              className=""
            />
            <FilterDatePicker
              onChange={(val: any) => onSelectFilter("fromDate", val)}
              value={filter.fromDate}
              name="Login From Date"
            />
            <FilterDatePicker
              onChange={(val: any) => onSelectFilter("toDate", val)}
              value={filter.toDate}
              name="Login To Date"
            />
            <div className="flex items-end space-x-2">
              <Button
                variant="outline"
                className="h-8 w-8 bg-indigo-600 p-1 hover:bg-indigo-700"
              >
                <Search size={18} />
              </Button>
              <Button
                onClick={resetFilter}
                variant="outline"
                className="h-8 w-8 bg-indigo-600 p-1 hover:bg-indigo-700"
              >
                <RefreshCw size={18} />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-4">
          {dummyData.map((item, id) => {
            const {
              activityTime,
              role,
              userEmail,
              browser,
              station,
              ipAddress,
              region,
              city,
            } = item
            const distanceTime = formatDistance(
              new Date(activityTime),
              new Date(),
              { addSuffix: true }
            )
            return (
              <Timeline key={id} timeline={distanceTime} className="h-40">
                <div className="h-full py-2 shadow">
                  <Card className="flex h-full flex-col align-middle">
                    <CardContent className="flex h-full space-x-4">
                      <div className="flex h-full flex-col">
                        <Image
                          className="rounded-lg"
                          width={100}
                          height={100}
                          src="/jeff.webp"
                          alt="Jeff Picture"
                        />
                      </div>

                      <div className="flex h-full flex-grow flex-col items-start space-y-2">
                        <div className="flex h-full w-full items-end justify-between">
                          <div>
                            <p className="text-lg">{role} </p>
                            <p className="text-xs text-blue-300">
                              {userEmail}{" "}
                            </p>
                            <p className="text-xs">
                              Code : {browser} | {role}
                            </p>
                          </div>
                          <Alert
                            title={userEmail}
                            trigger={
                              <Button variant="link">API REQUEST</Button>
                            }
                          >
                            <div className="w-full rounded-lg shadow-lg">
                              <pre className="overflow-auto rounded-lg bg-zinc-800 p-2 text-sm leading-relaxed text-white">
                                <code>
                                  {JSON.stringify(dummyJson, null, 2)}
                                </code>
                              </pre>
                            </div>
                          </Alert>
                        </div>
                        <Separator />
                        <p className="text-sm">
                          {" "}
                          {station} {region} {city} {distanceTime}{" "}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex w-full justify-end">
                      <p className="text-right text-xs text-blue-300">
                        {ipAddress}
                      </p>
                    </CardFooter>
                  </Card>
                </div>
              </Timeline>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Contents
