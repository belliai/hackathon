import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";

const SpotRateListDetails = () => {
  const rates = [
    {
      AWBNumber: '807-22439185',
      agentName: 'Teleport Commerce (M) Sdn',
      flightNo: 'AK701',
      flightDate: '05/04/2024',
      origin: 'KUL',
      destination: 'SIN',
      spotRate: 'BULK-Q-50.00-5.00',
      allIn: 'MYR',
      currency: 'MYR',
      type: 'Per KG',
      status: 'Approved',
      validTo: '10/04/2024',
      weight: '350.00',
      chWeight: '350.00',
      uom: 'KG',
      shc: 'PER, EAT',
      commDesc: '0002, 0010, 0013-FRUIT DRY, FRESH, INFANT FOOD, LIMES, LEMONS',
      spotRateRef: 'AGT/SR/2024/25/0713',
    },
    {
      AWBNumber: '807-00083705',
      agentName: 'CargoSpaceAgentSdnBhd',
      flightNo: 'SA125',
      flightDate: '04/05/2024',
      origin: 'FRA',
      destination: 'KUL',
      spotRate: 'BULK-Q-45.00-150.00',
      allIn: 'EUR',
      currency: 'EUR',
      type: 'Per KG',
      status: 'Approved',
      validTo: '11/05/2024',
      weight: '350.00',
      chWeight: '350.00',
      uom: 'KG',
      shc: 'PER',
      commDesc: '0002-FRUIT DRY, FRESH',
      spotRateRef: 'AGT/SR/2024/25/0714',
    },
  ];

  return (
    <>
      <p> Spot Rate Details </p>
      <p>No. Of Records : {rates.length}</p>
      <Table className="w-full mt-4">
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
            <TableHead>Spot Rate Ref.</TableHead>
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
    </>
  );
};

export default SpotRateListDetails;
