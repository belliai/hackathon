"use client"

import React, { useState } from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

export function DatePicker({
  date,
  setDate,
  placeholder,
}: {
  date: any
  setDate: any
  placeholder: string
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
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

export function SelectField({
  options,
  placeholder,
}: {
  options: any[]
  placeholder: string
}) {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option, index) => (
            <SelectItem key={index} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default function NewUcrForm() {
  const [transferDate, setTransferDate] = useState()
  const [actTraDate, setActTraDate] = useState()
  const [actRecDate, setActRecDate] = useState()

  const locationOptions = [
    { value: "select", label: "Select" },
    { value: "kul", label: "KUL" },
    // Add more options as needed
  ]

  const finalLocationOptions = [
    { value: "select", label: "Select" },
    // Add more options as needed
  ]

  const uldConditionOptions = [
    { value: "missing", label: "Missing" },
    { value: "serviceable", label: "Serviceable" },
    { value: "unserviceable", label: "Unserviceable" },
  ]

  const accessoryStatuses = [
    { status: "Released", nets: 0, doors: 0, straps: 0, fittings: 0 },
    { status: "Returned", nets: 0, doors: 0, straps: 0, fittings: 0 },
    { status: "Damaged", nets: 0, doors: 0, straps: 0, fittings: 0 },
    { status: "Yet To Arrive", nets: 0, doors: 0, straps: 0, fittings: 0 },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <label>UCR #</label>
      <Input type="text" />

      <label>Transferring Party*</label>
      <Input type="text" />

      <label>Receiving Party*</label>
      <Input type="text" />

      <label>Transfer Location*</label>
      <div className="flex gap-4">
        <SelectField options={locationOptions} placeholder="SELECT" />
        <SelectField options={locationOptions} placeholder="SELECT" />
      </div>

      <label>Loaded</label>
      <Checkbox />

      <label>AWB Number</label>
      <Input type="text" />

      <label>Supplemental Information</label>
      <Textarea />

      <label>Transfer Date*</label>
      <DatePicker
        date={transferDate}
        setDate={setTransferDate}
        placeholder="21/05/2024"
      />

      <label>Act Tra Date</label>
      <DatePicker
        date={actTraDate}
        setDate={setActTraDate}
        placeholder="21/05/2024"
      />

      <label>Act Rec Date</label>
      <DatePicker
        date={actRecDate}
        setDate={setActRecDate}
        placeholder="21/05/2024"
      />

      <label>Final Location*</label>
      <div className="flex gap-4">
        <SelectField options={finalLocationOptions} placeholder="SELECT" />
        <SelectField options={finalLocationOptions} placeholder="SELECT" />
      </div>

      <label>Remarks</label>
      <Textarea className="col-span-2" />

      <h2 className="col-span-2 mt-4">UCR ULD Details</h2>

      <label>ULD #</label>
      <Input type="text" />

      <label>Receipt No</label>
      <Input type="text" />

      <label>isDamaged</label>
      <Checkbox />

      <label>Returned At</label>
      <Input type="text" />

      <label>Returned On</label>
      <Input type="text" />

      <label>AWB Prefix</label>
      <Input type="text" />

      <label>AWBNo</label>
      <Input type="text" />

      <label>isLoaded</label>
      <Checkbox />

      <label>ULD Condition</label>
      <SelectField options={uldConditionOptions} placeholder="Missing" />

      <label>ULD ODLN</label>
      <Input type="text" />

      <div className="col-span-2 mt-4 flex justify-end gap-4">
        <Button button-variant="primary">Add ULD</Button>
      </div>

      <h2 className="col-span-2 mt-4">Accessories</h2>
      <Table className="col-span-2 w-full border">
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Nets</TableHead>
            <TableHead>Doors</TableHead>
            <TableHead>Straps</TableHead>
            <TableHead>Fittings</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accessoryStatuses.map((status, index) => (
            <TableRow key={index}>
              <TableCell>{status.status}</TableCell>
              <TableCell>{status.nets}</TableCell>
              <TableCell>{status.doors}</TableCell>
              <TableCell>{status.straps}</TableCell>
              <TableCell>{status.fittings}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="col-span-2 mt-4 flex justify-end gap-4">
        <Button button-variant="primary">Save</Button>
        <Button variant="secondary">Print</Button>
        <Button variant="secondary">Clear</Button>
        <Button variant="secondary">Cancel</Button>
        <Button button-variant="primary">Send LUC</Button>
      </div>
    </div>
  )
}
