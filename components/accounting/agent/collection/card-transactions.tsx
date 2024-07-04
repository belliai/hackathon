import React, { useState } from "react"
import { Button } from "@components/ui/button"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";

export default function CardTransactions() {
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined)
  const [toDate, setToDate] = useState<Date | undefined>(undefined)

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">List Card Transactions</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">From Date</label>
          <DatePicker date={fromDate} setDate={setFromDate} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">To Date</label>
          <DatePicker date={toDate} setDate={setToDate} />
        </div>
        <div className="flex items-end space-x-2">
          <Button className="bg-red-500 text-white">List</Button>
          <Button className="bg-red-500 text-white">Export</Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Card Transaction Details</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  )
}

function DatePicker({ date, setDate }: { date: Date | undefined, setDate: React.Dispatch<React.SetStateAction<Date | undefined>> }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative">
          <Input
            readOnly
            className="cursor-pointer"
            value={date ? format(date, "dd/MM/yyyy") : ""}
            placeholder="Select date"
          />
          <CalendarIcon className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}