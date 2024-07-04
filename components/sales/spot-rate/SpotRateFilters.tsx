import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  SpotRateDateIcon,
  SpotRateDatePicker,
} from "@/components/sales/spot-rate/SpotRateDatePicker"
import SpotRateDropDown from "@/components/sales/spot-rate/SpotRateDropDown"

const SpotRateFilters = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Origin and Agent Code */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Origin</label>
            <SpotRateDropDown />
            <SpotRateDropDown />
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Agent Code</label>
            <Input type="text" className="w-full" />
          </div>
        </div>

        {/* Destination and Spot Rate ID */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Destination</label>
            <SpotRateDropDown />
            <SpotRateDropDown />
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Spot Rate ID</label>
            <Input type="text" className="w-full" />
          </div>
        </div>

        {/* Flight# and AWBNumber */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Flight#</label>
            <SpotRateDropDown className="w-full" />
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">AWBNumber</label>
            <Input type="text" className="w-14" defaultValue="807" />
            <Input type="text" className="w-24" />
          </div>
        </div>

        {/* Flight Date and Status */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Flight Date</label>
            <Input type="text" className="w-24" />
            <SpotRateDateIcon />
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Status</label>
            <SpotRateDropDown />
          </div>
        </div>

        {/* From Date and To Date */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">From Date</label>
            <SpotRateDatePicker />
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">To Date</label>
            <SpotRateDatePicker />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <Button> List</Button>
        <Button>Clear</Button>
        <Button>Export</Button>
      </div>
    </div>
  )
}

export default SpotRateFilters
