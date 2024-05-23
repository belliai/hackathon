import { Table } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

interface DataTableSelectHeadProps {
  table: Table<any>;
}

export default function DataTableSelectHead({
  table,
}: DataTableSelectHeadProps) {
  return (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
      className="translate-y-[2px] mx-1"
    />
  );
}
