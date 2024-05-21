import FilterSection from "@/components/operation/MotherBag/FilterSection";
import { DataTable } from "@/components/dashboard/dashtable";
import { columns } from "@/components/operation/MotherBag/columns";
import { getData } from "@/lib/operation/MotherBag/data";

export default async function MotherBag() {
  const data = await getData();

  return (
    <div>
      <FilterSection />
      <div className=" py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
