import FilterSection from "@/components/rewards/AppreciationReport/FilterSection";
import { DataTable } from "@components/data-table/data-table";
import { columns } from "@/components/rewards/AppreciationReport/columns";
import { getData } from "@/lib/rewards/AppreciationReport/data";

export default async function AppreciationReport() {
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