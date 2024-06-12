import FilterSection from "@/components/operation/Transfer/List/FilterSection";
import { DataTable } from "@components/data-table/data-table";
import { columns } from "@/components/operation/Transfer/List/columns";
import { getData } from "@/lib/operation/Transfer/List/data";

export default async function List() {
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
