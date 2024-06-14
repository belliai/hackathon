import FilterSection from "@/components/reports/Standard/FfmReport/FilterSection";
import { DataTable } from "@components/data-table/data-table";
import { columns } from "@/components/reports/Standard/FfmReport/columns";
import { getData } from "@/lib/reports/Standard/FfmReport/data";

export default async function FfmReport() {
  const data = await getData();

  return (
    <div className="flex flex-col gap-4">
      <FilterSection />
      <div className="flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
        <div className="">
          <DataTable columns={columns} data={data} hideToolbar />
        </div>
      </div>
      
    </div>
  );
}
