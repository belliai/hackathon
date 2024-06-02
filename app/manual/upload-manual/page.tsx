import FilterSection from "@/components/manual/UploadManual/FilterSection";
import { DataTable } from "@/components/dashboard/dashtable";
import { columns } from "@/components/manual/UploadManual/columns";
import { getData } from "@/lib/manual/UploadManual/data";

export default async function UploadManual() {
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
