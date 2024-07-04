import React, { useState } from "react"
import { Button } from "@components/ui/button"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function UcrDetailsTable() {
  const data = [
    {
      id: 1,
      ucrNumber: "1",
      ucrStatus: "SERVICEABLE",
      ucrUseStatus: "PARTIAL",
      location: "SG",
      updatedOn: "2022-01-01",
    },
    {
      id: 2,
      ucrNumber: "2",
      ucrStatus: "SERVICEABLE",
      ucrUseStatus: "PARTIAL",
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
            <TableHead>UCR#</TableHead>
            <TableHead>UCR Status</TableHead>
            <TableHead>UCR Use Status</TableHead>
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
              <TableCell>{row.ucrNumber}</TableCell>
              <TableCell>{row.ucrStatus}</TableCell>
              <TableCell>{row.ucrUseStatus}</TableCell>
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
