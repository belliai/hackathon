import { Row } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

interface DataTableSelectRowProps {
  row: Row<any>;
}

export default function DataTableSelectRow({ row }: DataTableSelectRowProps) {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
      className="translate-y-[2px]"
    />
  );
}
