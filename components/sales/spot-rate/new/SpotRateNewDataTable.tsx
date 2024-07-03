import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import SpotRateDropDown from "../SpotRateDropDown"

const SpotRateNewDataTable = () => {
  return (
    <div className="p-4">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Weight/Count</TableHead>
            <TableHead>Charge/Rate</TableHead>
            <TableHead>Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <input type="checkbox" />
            </TableCell>
            <TableCell>
              <SpotRateDropDown />
            </TableCell>
            <TableCell>
              <Input placeholder="0" />
            </TableCell>
            <TableCell>
              <Input placeholder="0" />
            </TableCell>
            <TableCell>
              <Input placeholder="0" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

const SpotRateNewDataTable2 = () => {
  return (
    <div className="p-4">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>ULD Type</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Charge/Rate</TableHead>
            <TableHead>Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <input type="checkbox" />
            </TableCell>
            <TableCell>
              <SpotRateDropDown />
            </TableCell>
            <TableCell>
              <SpotRateDropDown />
            </TableCell>
            <TableCell>
              <Input placeholder="0" />
            </TableCell>
            <TableCell>
              <Input placeholder="0" />
            </TableCell>
            <TableCell>
              <Input placeholder="0" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export { SpotRateNewDataTable, SpotRateNewDataTable2 }
