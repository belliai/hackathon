import { CalendarDaysIcon } from "@heroicons/react/24/solid"
import { MagnifyingGlassIcon, ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"

export default function FilterSection() {
  return (
    <div className="mt-10 flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Flight Planning</h1>
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
        <div className="flex justify-between">
          <div className="flex w-2/3 gap-4">
            <div className="w-2/12">
              <Input
                className="border-zinc-500"
                placeholder="Flight"
                rightIcon={
                  <MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />
                }
              />
            </div>

            <div className="w-2/12">
              <Input
                className="border-zinc-500"
                placeholder="Flight ID"
                rightIcon={
                  <MagnifyingGlassIcon className="h-4 w-4 text-zinc-400" />
                }
              />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`flex w-2/12 justify-between border-zinc-500 bg-zinc-900 pl-3 pr-3`}
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
            <Button className="bg-zinc-800 text-white hover:bg-zinc-700">
              <span className="mr-1 h-4 w-4">
                <MagnifyingGlassIcon />
              </span>
              Search
            </Button>
          </div>

          <div className="flex w-1/3 justify-end gap-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="uld-cart">ULD</label>
              <Switch
                id="uld-cart"
                className="data-[state=checked]:bg-zinc-800 data-[state=unchecked]:bg-zinc-800"
              />
              <label htmlFor="uld-cart">Cart</label>
            </div>

            <div className="flex gap-2">
              <Input className="border-zinc-500" placeholder="Cart/ULD" />
              <Button className="bg-button-primary text-white hover:bg-button-primary/80">
                Assign
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
