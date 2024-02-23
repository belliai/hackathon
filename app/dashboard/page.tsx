import FilterBar from "@/components/dashboard/filterbar";
import Stats from "@/components/dashboard/stats";
import { DataTable } from "@/components/dashboard/dashtable";
import { columns } from "@/components/dashboard/columns";
import { getData } from "@/lib/data";
export default async function Dashboard() {
  const data = await getData();

  return (
    <div>
      <Stats />
      <FilterBar />
      <div className=" py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
