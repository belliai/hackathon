import FilterSection from "@/components/operation/Accept/CargoAcceptance/FilterSection";
import { DataTable } from "@components/data-table/data-table";
import { columns } from "@/components/operation/Accept/CargoAcceptance/columns";

import { Button } from "@/components/ui/button";
import { ListBulletIcon } from "@radix-ui/react-icons";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getData } from "@/lib/operation/Accept/CargoAcceptance/data";

export default async function CargoAcceptance() {
  const data = await getData();
  return (
    <div className="flex flex-col gap-4">
      <FilterSection />
      <div className=" py-10 rounded-lg border-[1px] border-zinc-700 p-5">
        <DataTable columns={columns} data={data} hideToolbar />
      </div>
      <Card
        className="overflow-hidden rounded-lg border-[1px] bg-transparent border-zinc-700 text-zinc-400"
      >
        <CardContent className="p-5 flex flex-col gap-4">
          <div className="text-base font-bold text-white">Cargo Acceptance Bulk</div>

          <div className="flex gap-4 items-end">
            <div className="w-1/3 flex flex-col gap-2 text-white">
              <div className="text-sm">Acceptance Methods</div>
              <Input className="border-zinc-700" rightIcon={<ListBulletIcon className="h-4 w-4 text-zinc-400" />} />
            </div>
            <Button className="bg-button-primary hover:bg-button-primary/80 text-white">
              Save
            </Button>
            <Button className="bg-button-secondary hover:bg-button-secondary/80 text-white">
              Create UCR
            </Button>
            <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
              Send PRI
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
