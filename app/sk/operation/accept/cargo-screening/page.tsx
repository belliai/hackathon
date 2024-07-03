import { DataTable } from "@components/data-table/data-table"

import {
  getData,
  getDataUnscreened,
} from "@/lib/operation/Accept/CargoScreening/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  columns,
  unscreenedColumns,
} from "@/components/operation/Accept/CargoScreening/columns"
import FilterSection from "@/components/operation/Accept/CargoScreening/FilterSection"

export default async function CargoScreening() {
  const data = await getData()
  const dataUnscreened = await getDataUnscreened()

  return (
    <div className="flex flex-col gap-4">
      <FilterSection />
      <div className="flex gap-4">
        <Card className="h-fit w-1/3 overflow-hidden rounded-lg border-[1px] border-zinc-700 bg-transparent text-zinc-400">
          <CardContent className="flex flex-col gap-4 p-5">
            <div className="text-base font-semibold text-white">
              Unscreened Cargo
            </div>
            <DataTable
              columns={unscreenedColumns}
              data={dataUnscreened}
              hideToolbar
              hidePagination
            />
            <Button className="bg-button-primary text-white hover:bg-button-primary/80">
              Mark Screened
            </Button>
            <Button className="bg-button-secondary text-white hover:bg-button-secondary/80">
              Skip Screening
            </Button>
          </CardContent>
        </Card>
        <Card className="h-fit w-2/3 overflow-hidden rounded-lg border-[1px] border-zinc-700 bg-transparent text-zinc-400">
          <CardContent className="flex flex-col gap-4 p-5">
            <div className="text-base font-semibold text-white">
              Screened Cargo
            </div>
            <DataTable columns={columns} data={data} hideToolbar />
            <Button className="w-fit bg-button-primary text-white hover:bg-button-primary/80">
              Print Screening Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
