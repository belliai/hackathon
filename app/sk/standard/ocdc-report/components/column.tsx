"use client"

import { ColumnDef } from "@tanstack/react-table"

export type OCDCReportType = {
  agent_name: string
  awb_prefix: string
  awb_fee: string
  awb_cca_fee: string
  do_fee: string
  import_fee: string
  awb_copy: string
  boatnote: string
  signature_service: string
  trucking_charges: string
  other_ocdc: string
  total: string
  currency: string
}

export const columns: ColumnDef<OCDCReportType>[] = [
  {
    header: "Agent Name",
    accessorKey: "agent_name",
  },
  {
    header: "AWB Prefix",
    accessorKey: "awb_prefix",
  },
  {
    header: "AWB Fee",
    accessorKey: "awb_fee",
  },
  {
    header: "AWB CCA Fee",
    accessorKey: "awb_cca_fee",
  },
  {
    header: "DO Fee",
    accessorKey: "do_fee",
  },
  {
    header: "Import Fee",
    accessorKey: "import_fee",
  },
  {
    header: "AWB Copy",
    accessorKey: "awb_copy",
  },
  {
    header: "Boatnote",
    accessorKey: "boatnote",
  },
  {
    header: "Signature Service",
    accessorKey: "signature_service",
  },
  {
    header: "Trucking Charges",
    accessorKey: "trucking_charges",
  },
  {
    header: "Other OCDC",
    accessorKey: "other_ocdc",
  },
  {
    header: "Total",
    accessorKey: "total",
  },
  {
    header: "Currency",
    accessorKey: "currency",
  },
]

export const DUMMY_DATA: OCDCReportType[] = [
  {
    agent_name: "Agent Smith",
    awb_prefix: "001",
    awb_fee: "100.00",
    awb_cca_fee: "10.00",
    do_fee: "5.00",
    import_fee: "15.00",
    awb_copy: "2.00",
    boatnote: "1.00",
    signature_service: "3.00",
    trucking_charges: "20.00",
    other_ocdc: "7.00",
    total: "163.00",
    currency: "USD",
  },
  {
    agent_name: "Agent Johnson",
    awb_prefix: "002",
    awb_fee: "150.00",
    awb_cca_fee: "12.00",
    do_fee: "6.00",
    import_fee: "18.00",
    awb_copy: "2.50",
    boatnote: "1.50",
    signature_service: "4.00",
    trucking_charges: "25.00",
    other_ocdc: "8.00",
    total: "227.00",
    currency: "USD",
  },
  {
    agent_name: "Agent Brown",
    awb_prefix: "003",
    awb_fee: "120.00",
    awb_cca_fee: "11.00",
    do_fee: "5.50",
    import_fee: "16.00",
    awb_copy: "2.20",
    boatnote: "1.20",
    signature_service: "3.50",
    trucking_charges: "22.00",
    other_ocdc: "7.50",
    total: "188.90",
    currency: "USD",
  },
  {
    agent_name: "Agent Davis",
    awb_prefix: "004",
    awb_fee: "130.00",
    awb_cca_fee: "10.50",
    do_fee: "5.20",
    import_fee: "15.50",
    awb_copy: "2.10",
    boatnote: "1.10",
    signature_service: "3.20",
    trucking_charges: "21.00",
    other_ocdc: "7.20",
    total: "196.80",
    currency: "USD",
  },
  {
    agent_name: "Agent Wilson",
    awb_prefix: "005",
    awb_fee: "140.00",
    awb_cca_fee: "11.50",
    do_fee: "6.20",
    import_fee: "17.50",
    awb_copy: "2.30",
    boatnote: "1.30",
    signature_service: "3.70",
    trucking_charges: "23.00",
    other_ocdc: "8.20",
    total: "213.70",
    currency: "USD",
  },
  {
    agent_name: "Agent Moore",
    awb_prefix: "006",
    awb_fee: "160.00",
    awb_cca_fee: "13.00",
    do_fee: "7.00",
    import_fee: "19.00",
    awb_copy: "2.50",
    boatnote: "1.50",
    signature_service: "4.00",
    trucking_charges: "25.00",
    other_ocdc: "9.00",
    total: "241.00",
    currency: "USD",
  },
  {
    agent_name: "Agent Taylor",
    awb_prefix: "007",
    awb_fee: "170.00",
    awb_cca_fee: "14.00",
    do_fee: "7.50",
    import_fee: "20.00",
    awb_copy: "3.00",
    boatnote: "2.00",
    signature_service: "4.50",
    trucking_charges: "26.00",
    other_ocdc: "9.50",
    total: "256.50",
    currency: "USD",
  },
]
