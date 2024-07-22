import { ColumnDef } from "@tanstack/react-table"

import { Company } from "@/types/partner/company"
import { TableHeaderWithTooltip } from "@/components/ui/table"

import { companyTypeLabelMap } from "../../constants/company-types-map"

export const companiesColumns: ColumnDef<Company>[] = [
  {
    accessorKey: "company_code",
    header: () => (
      <TableHeaderWithTooltip header="Company Code" tooltipId="company-code" />
    ),
  },
  {
    accessorKey: "company_name",
    header: () => (
      <TableHeaderWithTooltip header="Company Name" tooltipId="company-name" />
    ),
  },
  {
    accessorKey: "people_count",
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
