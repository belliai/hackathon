import { Button } from "@/components/ui/button";
import { DownloadIcon, MagnifyingGlassIcon, ReloadIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

const AIRPORT_LIST = [
  {
    id: 1,
    label: 'All',
  },
  {
    id: 2,
    label: 'CGK',
  },
  {
    id: 3,
    label: 'SIN',
  },
];

const STATUS_LIST = [
  {
    id: 1,
    label: 'New',
  },
  {
    id: 2,
    label: 'In-Progress',
  },
  {
    id: 3,
    label: 'Resolved',
  },
];

const CLAIM_LIST = [
  {
    id: 1,
    label: 'All',
  },
  {
    id: 2,
    label: 'Yes',
  },
  {
    id: 3,
    label: 'No',
  },
];

const DISCREPANCY_LIST = [
  {
    id: 1,
    label: 'All',
  },
  {
    id: 2,
    label: 'DMGD',
  },
  {
    id: 3,
    label: 'FDAW',
  },
  {
    id: 4,
    label: 'FDCA',
  },
  {
    id: 5,
    label: 'MSAW',
  },
  {
    id: 6,
    label: 'MSCA',
  },
  {
    id: 7,
    label: 'OFLD',
  },
  {
    id: 8,
    label: 'OVCD',
  },
  {
    id: 9,
    label: 'RSGN',
  },
  {
    id: 10,
    label: 'SSPD',
  },
  {
    id: 11,
    label: 'SURP',
  },
];

export default function FilterSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Discrepancy Report</h1>
        <div className="flex gap-4">
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            <span className="mr-1 h-4 w-4">
              <ReloadIcon />
            </span>
            Refresh
          </Button>
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            <span className="mr-1 h-4 w-4">
              <DownloadIcon />
            </span>
            Export
          </Button>
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            <span className="mr-1 h-4 w-4">
              <DownloadIcon />
            </span>
            Export to PDF
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
        <div className="text-white text-base font-semibold">Filter</div>
        <div className="flex gap-4 w-full">
          <div className="w-3/12">
            <Select>
              <SelectTrigger className="border-zinc-700 w-full">
                <SelectValue placeholder="Origin" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {AIRPORT_LIST.map((airportList) => (
                    <SelectItem key ={airportList.id} value={airportList.label}>{airportList.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-3/12">
            <Input className="border-zinc-700" placeholder="Flight No" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
          </div>

          <div className="w-3/12">
            <Select>
              <SelectTrigger className="border-zinc-700 w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {STATUS_LIST.map((statusList) => (
                    <SelectItem key ={statusList.id} value={statusList.label}>{statusList.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-3/12">
            <Select>
              <SelectTrigger className="border-zinc-700 w-full">
                <SelectValue placeholder="Is Claim Raises" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CLAIM_LIST.map((claimList) => (
                    <SelectItem key ={claimList.id} value={claimList.label}>{claimList.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <div className="w-3/12">
            <Select>
              <SelectTrigger className="border-zinc-700 w-full">
                <SelectValue placeholder="Transit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {AIRPORT_LIST.map((airportList) => (
                    <SelectItem key ={airportList.id} value={airportList.label}>{airportList.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`flex justify-between border-zinc-700 bg-zinc-900 pl-3 pr-3 w-3/12`}
              >
                <span>From Date</span>
                <CalendarDaysIcon className="h-4 w-4 text-zinc-400" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date()}
                // onSelect={() => {}}
                disabled={false}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <div className="w-3/12">
            <Select>
              <SelectTrigger className="border-zinc-700 w-full">
                <SelectValue placeholder="Discrepancy Code" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {DISCREPANCY_LIST.map((discrepancyList) => (
                    <SelectItem key ={discrepancyList.id} value={discrepancyList.label}>{discrepancyList.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-3/12">
            <Input className="border-zinc-700" placeholder="AWB No" rightIcon={<MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />} />
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <div className="w-3/12">
            <Select>
              <SelectTrigger className="border-zinc-700 w-full">
                <SelectValue placeholder="Destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {AIRPORT_LIST.map((airportList) => (
                    <SelectItem key ={airportList.id} value={airportList.label}>{airportList.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={`flex justify-between border-zinc-700 bg-zinc-900 pl-3 pr-3 w-3/12`}
              >
                <span>To Date</span>
                <CalendarDaysIcon className="h-4 w-4 text-zinc-400" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date()}
                // onSelect={() => {}}
                disabled={false}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button className="bg-zinc-800 hover:bg-zinc-700 text-white w-fit">
            <span className="mr-1 h-4 w-4">
              <MagnifyingGlassIcon />
            </span>
            Search
          </Button>
      </div>
    </div>
  );
}
