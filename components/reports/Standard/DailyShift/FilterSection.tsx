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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

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

const PAYMENT_TYPE = [
  {
    id: 1,
    label: 'All',
  },
  {
    id: 2,
    label: 'Cash',
  },
  {
    id: 3,
    label: 'Cheque',
  },
  {
    id: 4,
    label: 'Card',
  },
  {
    id: 5,
    label: 'Credit Account',
  },
  {
    id: 6,
    label: 'Advance',
  },
  {
    id: 7,
    label: 'VeriFone',
  },
  {
    id: 8,
    label: 'NEFT',
  },
  {
    id: 10,
    label: 'IMPS',
  },
  {
    id: 11,
    label: 'Paytm',
  },
  {
    id: 12,
    label: 'Phone Pay',
  },
];

const POSTED_STATUS = [
  {
    id: 1,
    label: 'All',
  },
  {
    id: 2,
    label: 'Posted',
  },
  {
    id: 3,
    label: 'Non Posted',
  },
];

export default function FilterSection() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Daily Shift Report</h1>
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
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
        <div className="text-white text-base font-semibold">Filter</div>
        <div className="flex gap-4 w-full">
          <div className="flex flex-col gap-2 w-1/6">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">From Date</div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`flex justify-between border-zinc-700 bg-zinc-900 pl-3 pr-3 w-full`}
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
          </div>

          <div className="flex flex-col gap-2 w-1/6">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">Time (HH:MM)</div>
            </div>
            <div className="flex gap-2">
              <Input className="border-zinc-700" placeholder="HH" />
              <Input className="border-zinc-700" placeholder="MM" />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-1/6">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">To Date</div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`flex justify-between border-zinc-700 bg-zinc-900 pl-3 pr-3 w-full`}
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

          <div className="flex flex-col gap-2 w-1/6">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">Time (HH:MM)</div>
            </div>
            <div className="flex gap-2">
              <Input className="border-zinc-700" placeholder="HH" />
              <Input className="border-zinc-700" placeholder="MM" />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-1/6">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">User ID</div>
            </div>
            <div className="flex gap-2">
              <Input className="border-zinc-700" placeholder="User ID" />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-1/6">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">Station</div>
            </div>
            <Select>
              <SelectTrigger className="border-zinc-700 w-full">
                <SelectValue placeholder="Station" />
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
        </div>

        <div className="flex gap-4 w-full">
          <div className="flex flex-col gap-2 w-1/6">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">Payment Type</div>
            </div>
            <Select>
              <SelectTrigger className="border-zinc-700 w-full">
                <SelectValue placeholder="Payment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {PAYMENT_TYPE.map((paymentType) => (
                    <SelectItem key ={paymentType.id} value={paymentType.label}>{paymentType.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-1/6">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">Posted Status</div>
            </div>
            <Select>
              <SelectTrigger className="border-zinc-700 w-full">
                <SelectValue placeholder="Posted Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {POSTED_STATUS.map((postedStatus) => (
                    <SelectItem key ={postedStatus.id} value={postedStatus.label}>{postedStatus.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2 w-1/6">
            <div className="flex gap-1 items-center text-white">
              <div className="text-sm">AWB</div>
            </div>
            <div className="flex gap-2">
              <Input className="border-zinc-700" placeholder="Prefix" />
              <Input className="border-zinc-700" placeholder="Number" />
            </div>
          </div>
          
          <RadioGroup defaultValue="summary" className="flex flex-row items-center pt-5">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="summary" id="r1" />
              <Label htmlFor="r1">Summary</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="detail" id="r2" />
              <Label htmlFor="r2">Detail</Label>
            </div>
          </RadioGroup>
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
