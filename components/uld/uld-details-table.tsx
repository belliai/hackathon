import React, { useState } from "react"
import { Button } from "@components/ui/button"
import { Label } from "@radix-ui/react-label"

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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Separator } from "../ui/separator"

export default function UldDetailsTable() {
  const data = [
    {
      id: 1,
      uldNumber: "ULD001",
      uldStatus: "SERVICEABLE",
      uldUseStatus: "PARTIAL",
      location: "SG",
      updatedOn: "2022-01-01",
    },
    {
      id: 2,
      uldNumber: "ULD002",
      uldStatus: "SERVICEABLE",
      uldUseStatus: "PARTIAL",
      location: "Warehouse B",
      updatedOn: "2022-01-02",
    },
  ]
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox />
            </TableHead>
            <TableHead>ULD#</TableHead>
            <TableHead>ULD Status</TableHead>
            <TableHead>ULD Use Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Updated On</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(data as any[]).map((row: any) => (
            <TableRow key={row.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{row.uldNumber}</TableCell>
              <TableCell>{row.uldStatus}</TableCell>
              <TableCell>{row.uldUseStatus}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.updatedOn}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <Button className="ml-2">Get Movement History</Button>
        <Button className="ml-2">Delete</Button>
      </div>
    </div>
  )
}
