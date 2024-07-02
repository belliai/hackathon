import FilterSection from "@/components/reports/operation/UnbilledAwbReport/FilterSection";
import { DataTable } from "@components/data-table/data-table";
import { columns } from "@/components/reports/operation/UnbilledAwbReport/columns";
import { getData } from "@/lib/reports/operation/UnbilledAwbReport/data";

export default async function UnbilledAwbReport() {
  const data = await getData();

  return (
    <div className="flex flex-col gap-5">
      <FilterSection />
      <div className="rounded-lg border-[1px] border-zinc-700 p-5">
        <DataTable columns={columns} data={data} hideToolbar />
      </div>
    </div>
  );
}
