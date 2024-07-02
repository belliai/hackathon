import FilterSection from "@/components/operation/Accept/CargoScreening/FilterSection";
import { DataTable } from "@components/data-table/data-table";
import { columns, unscreenedColumns } from "@/components/operation/Accept/CargoScreening/columns";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getData, getDataUnscreened } from "@/lib/operation/Accept/CargoScreening/data";

export default async function CargoScreening() {
  const data = await getData();
  const dataUnscreened = await getDataUnscreened();

  return (
    <div className="flex flex-col gap-4">
      <FilterSection />
      <div className="flex gap-4">
        <Card
          className="overflow-hidden rounded-lg border-[1px] bg-transparent border-zinc-700 text-zinc-400 w-1/3 h-fit"
        >
          <CardContent className="p-5 flex flex-col gap-4">
            <div className="text-white text-base font-semibold">Unscreened Cargo</div>
            <DataTable columns={unscreenedColumns} data={dataUnscreened} hideToolbar hidePagination />
            <Button className="bg-button-primary hover:bg-button-primary/80 text-white">
              Mark Screened
            </Button>
            <Button className="bg-button-secondary hover:bg-button-secondary/80 text-white">
              Skip Screening
            </Button>
          </CardContent>
        </Card>
        <Card
          className="overflow-hidden rounded-lg border-[1px] bg-transparent border-zinc-700 text-zinc-400 w-2/3 h-fit"
        >
          <CardContent className="p-5 flex flex-col gap-4">
            <div className="text-white text-base font-semibold">Screened Cargo</div>
            <DataTable columns={columns} data={data} hideToolbar />
            <Button className="bg-button-primary hover:bg-button-primary/80 text-white w-fit">
              Print Screening Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
