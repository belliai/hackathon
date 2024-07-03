import React, { useState } from "react"
import { Button } from "@components/ui/button"

import { Checkbox } from "@/components/ui/checkbox"
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

export default function StockAllocationTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Level</TableHead>
          <TableHead>AWB Prefix</TableHead>
          <TableHead>From</TableHead>
          <TableHead>To</TableHead>
          <TableHead>LD3 Onhand</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Allocation TIme</TableHead>
          <TableHead>Allocated By</TableHead>
          <TableHead>Available AWB</TableHead>
          <TableHead>Last Allocated</TableHead>
          <TableHead>Cnote Type</TableHead>
          <TableHead>Stock Type</TableHead>
          <TableHead>AWB Type</TableHead>
          <TableHead>Allocated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
