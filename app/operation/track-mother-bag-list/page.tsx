import FilterSection from "@/components/operation/TrackMotherBagList/FilterSection";
import { DataTable } from "@/components/dashboard/dashtable";
import { columns } from "@/components/operation/TrackMotherBagList/columns";
import { getData } from "@/lib/operation/TrackMotherBagList/data";

export default async function TrackMotherBagList() {
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
