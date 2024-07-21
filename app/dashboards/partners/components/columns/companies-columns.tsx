import { ColumnDef } from "@tanstack/react-table"

import { Company } from "@/types/partner/company"
import { TableHeaderWithTooltip } from "@/components/ui/table"

import { companyTypeLabelMap } from "../../constants/company-types"

export const companiesColumns: ColumnDef<Company>[] = [
  {
    accessorKey: "companyCode",
    header: () => (
      <TableHeaderWithTooltip header="Company Code" tooltipId="company-code" />
    ),
  },
  {
    accessorKey: "companyName",
    header: () => (
      <TableHeaderWithTooltip header="Company Name" tooltipId="company-name" />
    ),
  },
  {
    accessorKey: "peopleCount",
    header: () => (
      <TableHeaderWithTooltip header="People Count" tooltipId="people-count" />
    ),
  },
  {
    accessorKey: "type",
    accessorFn: (row) => companyTypeLabelMap[row.type],
    header: () => (
      <TableHeaderWithTooltip header="Company Type" tooltipId="company-type" />
    ),
  },
  {
    accessorKey: "address",
    header: () => (
      <TableHeaderWithTooltip header="Address" tooltipId="address" />
    ),
    size: 240,
  },
]
