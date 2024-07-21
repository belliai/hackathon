import { ColumnDef } from "@tanstack/react-table"

import { Person } from "@/types/partner/person"
import { TableHeaderWithTooltip } from "@/components/ui/table"

export const peopleColumns: ColumnDef<Person>[] = [
  {
    accessorKey: "name",
    header: () => <TableHeaderWithTooltip header="Name" tooltipId="name" />,
  },
  {
    accessorKey: "company.name",
    header: () => (
      <TableHeaderWithTooltip header="Company Name" tooltipId="company-name" />
    ),
  },
  {
    accessorKey: "jobTitle",
    header: () => (
      <TableHeaderWithTooltip header="Job Title" tooltipId="job-title" />
    ),
  },
  {
    accessorKey: "email",
    cell: ({ row }) => <span className="w-fit">{row.original.email}</span>,
    header: () => <TableHeaderWithTooltip header="Email" tooltipId="email" />,
    size: 240,
  },
  {
    accessorKey: "phone",
    header: () => (
      <TableHeaderWithTooltip header="Phone Number" tooltipId="phone-number" />
    ),
  },
]
