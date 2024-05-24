import FilterBar from "@/components/dashboard/filterbar";
import Stats from "@/components/dashboard/stats";
import { DataTable } from "@components/data-table/data-table";
import { columns } from "@/components/dashboard/columns";
import { getData } from "@/lib/data";
export default async function Dashboard() {
  const data = await getData();

  return (
    <div>
      <Stats />
      <FilterBar />
      <div className=" py-10">
        <DataTable
          columns={columns}
          data={data}
          hideToolbar
          className="border-none [&_th]:text-white [&_th]:py-5 [&_th]:px-3 [&_td]:px-3 [&_td]:text-zinc-400 [&_td]:py-4"
        />
      </div>
    </div>
  );
}
