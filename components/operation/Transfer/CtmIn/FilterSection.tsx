import { MagnifyingGlassIcon, ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const STATUS_LIST = [
  {
    id: 1,
    label: "775",
  },
  {
    id: 2,
    label: "776",
  },
  {
    id: 3,
    label: "777",
  },
]

export default function FilterSection() {
  return (
    <div className="mt-10 flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">
          New Transfer Manifest - Inbound
        </h1>
        <div className="flex gap-4">
          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            <span className="mr-1 h-4 w-4">
              <ReloadIcon />
            </span>
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
        <div className="text-base font-semibold text-white">Filter</div>
        <div className="flex gap-4">
          <div className="w-2/12">
            <Select>
              <SelectTrigger className="w-full border-zinc-500">
                <SelectValue placeholder="AWB Prefix" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {STATUS_LIST.map((statusList) => (
                    <SelectItem key={statusList.id} value={statusList.label}>
                      {statusList.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-2/12">
            <Input className="border-zinc-500" placeholder="AWB No" />
          </div>

          <div className="w-2/12">
            <Select>
              <SelectTrigger className="w-full border-zinc-500">
                <SelectValue placeholder="Partner Code" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {STATUS_LIST.map((statusList) => (
                    <SelectItem key={statusList.id} value={statusList.label}>
                      {statusList.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-2/12">
            <Input className="border-zinc-500" placeholder="From Carrier" />
          </div>

          <div className="w-2/12">
            <Select>
              <SelectTrigger className="w-full border-zinc-500">
                <SelectValue placeholder="Partner Code" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {STATUS_LIST.map((statusList) => (
                    <SelectItem key={statusList.id} value={statusList.label}>
                      {statusList.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
            <span className="mr-1 h-4 w-4">
              <MagnifyingGlassIcon />
            </span>
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}
