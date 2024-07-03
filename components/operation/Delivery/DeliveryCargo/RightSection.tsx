import { CalendarDaysIcon } from "@heroicons/react/24/solid"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const BULK_ACTION_LIST = [
  {
    id: "save",
    label: "Save",
  },
  {
    id: "send_fsudlv",
    label: "Send FSU/DLV",
  },
  {
    id: "lookup_charges",
    label: "Lookup Charges",
  },
  {
    id: "sign",
    label: "Sign",
  },
  {
    id: "deliver",
    label: "Deliver",
  },
  {
    id: "reopen_do",
    label: "Re-Open DO",
  },
  {
    id: "notify",
    label: "Notify",
  },
  {
    id: "no_locate",
    label: "No Locate",
  },
  {
    id: "send_fsunfd",
    label: "Send FSU/NFD",
  },
  {
    id: "send_fsuawd",
    label: "Send FSU/AWD",
  },
]

export default function RightSection() {
  return (
    <Accordion
      type="multiple"
      defaultValue={["bulk-action"]}
      className="w-full"
    >
      <AccordionItem
        value="bulk-action"
        className="mb-4 rounded-lg border-[1px] border-zinc-700 bg-transparent px-3 text-zinc-400"
      >
        <AccordionTrigger className="text-white hover:no-underline">
          Delivery Action
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 py-4">
          <div className="flex gap-5">
            <div className="flex w-1/3 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Receiving Company</div>
              </div>
              <Input className="border-zinc-500" />
            </div>

            <div className="flex w-1/3 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Picked-up By</div>
              </div>
              <Input className="border-zinc-500" />
            </div>

            <div className="flex w-1/3 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Delivery Date</div>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`flex w-full justify-between border-zinc-700 bg-zinc-900 pl-3 pr-3`}
                  >
                    <span>Flight Date</span>
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
          </div>

          <div className="flex gap-5">
            <div className="flex w-1/3 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Consignee Name</div>
              </div>
              <Input className="border-zinc-500" />
            </div>

            <div className="flex w-1/3 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Issued By</div>
              </div>
              <Input className="border-zinc-500" />
            </div>

            <div className="flex w-1/3 flex-col gap-2">
              <div className="flex items-center gap-1 text-white">
                <div className="text-sm">Remarks</div>
              </div>
              <Input className="border-zinc-500" />
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-fit bg-zinc-800 text-white hover:bg-zinc-700">
                Bulk Action
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {BULK_ACTION_LIST.map((bulk) => (
                <DropdownMenuItem key={bulk.id}>{bulk.label}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
