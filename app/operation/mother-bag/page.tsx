import FilterSection from "@/components/operation/MotherBag/FilterSection";
import { DataTable } from "@/components/dashboard/dashtable";
import { columns } from "@/components/operation/MotherBag/columns";
import { getData } from "@/lib/operation/MotherBag/data";

export default async function MotherBag() {
  const data = await getData();

  return (
    <div className="flex flex-col gap-5">
      <FilterSection />
      <div className="rounded-lg border-[1px] border-zinc-700 p-5">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
