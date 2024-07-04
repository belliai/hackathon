import { DataTable } from "@components/data-table/data-table"
import { ListBulletIcon } from "@radix-ui/react-icons"

import { getData } from "@/lib/operation/Accept/CargoAcceptance/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { columns } from "@/components/operation/Accept/CargoAcceptance/columns"
import FilterSection from "@/components/operation/Accept/CargoAcceptance/FilterSection"

export default async function CargoAcceptance() {
  const data = await getData()
  return (
    <div className="flex flex-col gap-4">
      <FilterSection />
      <div className="rounded-lg border-[1px] border-zinc-700 p-5 py-10">
        <DataTable columns={columns} data={data} hideToolbar />
      </div>
      <Card className="overflow-hidden rounded-lg border-[1px] border-zinc-700 bg-transparent text-zinc-400">
        <CardContent className="flex flex-col gap-4 p-5">
          <div className="text-base font-bold text-white">
            Cargo Acceptance Bulk
          </div>

          <div className="flex items-end gap-4">
            <div className="flex w-1/3 flex-col gap-2 text-white">
              <div className="text-sm">Acceptance Methods</div>
              <Input
                className="border-zinc-700"
                rightIcon={<ListBulletIcon className="h-4 w-4 text-zinc-400" />}
              />
            </div>
            <Button className="bg-button-primary text-white hover:bg-button-primary/80">
              Save
            </Button>
            <Button className="bg-button-secondary text-white hover:bg-button-secondary/80">
              Create UCR
            </Button>
            <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
              Send PRI
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
