import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const SpotRateApprovalDetails = () => {
  const rates: any[] = [] //no data yet

  return (
    <div className="p-4">
      <h2 className="mb-2 text-xl font-semibold">Spot Rate Details</h2>
      <Table className="mt-4 w-full">
        <TableHeader>
          <TableRow>
            <TableHead>
              <input type="checkbox" />
            </TableHead>
            <TableHead>AWBNumber</TableHead>
            <TableHead>Agent Name</TableHead>
            <TableHead>FlightNo</TableHead>
            <TableHead>FlightDate</TableHead>
            <TableHead>Origin</TableHead>
            <TableHead>Dest</TableHead>
            <TableHead>Spot Rate</TableHead>
            <TableHead>ALL In</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Valid To</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Ch.Weight</TableHead>
            <TableHead>UOM</TableHead>
            <TableHead>SHC</TableHead>
            <TableHead>Comm Desc.</TableHead>
            <TableHead>Spot Rate ID.</TableHead>
            <TableHead>Info.</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rates.map((rate, index) => (
            <TableRow key={index}>
              <TableCell>
                <input type="checkbox" />
              </TableCell>
              <TableCell>
                <a href="#" className="text-blue-600">
                  {rate.AWBNumber}
                </a>
              </TableCell>
              <TableCell>{rate.agentName}</TableCell>
              <TableCell>{rate.flightNo}</TableCell>
              <TableCell>{rate.flightDate}</TableCell>
              <TableCell>{rate.origin}</TableCell>
              <TableCell>{rate.destination}</TableCell>
              <TableCell>{rate.spotRate}</TableCell>
              <TableCell>{rate.allIn}</TableCell>
              <TableCell>{rate.currency}</TableCell>
              <TableCell>{rate.type}</TableCell>
              <TableCell>{rate.status}</TableCell>
              <TableCell>{rate.validTo}</TableCell>
              <TableCell>{rate.weight}</TableCell>
              <TableCell>{rate.chWeight}</TableCell>
              <TableCell>{rate.uom}</TableCell>
              <TableCell>{rate.shc}</TableCell>
              <TableCell>{rate.commDesc}</TableCell>
              <TableCell>{rate.spotRateRef}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default SpotRateApprovalDetails
