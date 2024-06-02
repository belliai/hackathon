import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon, ReloadIcon } from "@radix-ui/react-icons";
import CreateDialog from "./CreateDialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MODULE_LIST = [
  { id: 1, label: "AH1" },
  { id: 2, label: "AIP" },
  { id: 3, label: "AJL" },
  { id: 4, label: "ALA" },
  { id: 5, label: "AMD" },
  { id: 6, label: "AMS" },
  { id: 7, label: "AN1" },
  { id: 8, label: "ASU" },
  { id: 9, label: "ATL" },
  { id: 10, label: "ATQ" },
  { id: 11, label: "AUA" },
  { id: 12, label: "AYJ" },
];

export default function FilterSection() {
  return (
    <div className="flex flex-col mt-10 gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Manual Section</h1>
        <div className="flex gap-4">
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            <span className="mr-1 h-4 w-4">
              <ReloadIcon />
            </span>
            Refresh
          </Button>
          <CreateDialog />
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border-[1px] border-zinc-700 p-5">
        <div className="text-white text-base font-semibold">Filter</div>
        <div className="flex gap-4">
          <div className="w-2/6">
            <Select>
              <SelectTrigger className="border-zinc-500 w-full">
                <SelectValue placeholder="Module Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {MODULE_LIST.map((stationList) => (
                    <SelectItem key ={stationList.id} value={stationList.label}>{stationList.label}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-white">
            <span className="mr-1 h-4 w-4">
              <MagnifyingGlassIcon />
            </span>
            Search
          </Button>
        </div>
      </div>
      
    </div>
  );
}
