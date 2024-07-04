import React from "react"
import { Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import {
  SpotRateLabelAndDropDown,
  SpotRateLabelAndInput,
} from "@/components/sales/spot-rate/SpotRateLabelAndInput"

import { SpotRateDateIcon } from "../SpotRateDatePicker"
import SpotRateDropDown from "../SpotRateDropDown"
import {
  SpotRateNewDataTable,
  SpotRateNewDataTable2,
} from "./SpotRateNewDataTable"

const SpotRateNewRequesterDetails = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Left Column */}
      <div className="col-span-1">
        {/* Spot Rate Details Section */}
        <div className="mb-4 rounded-lg border p-4">
          <h2 className="text-lg font-semibold">Spot Rate Details</h2>

          <div className="grid grid-cols-1 gap-4">
            <SpotRateLabelAndDropDown label="Spot Category" required />

            <SpotRateLabelAndDropDown label="Weight Category" required>
              <input type="checkbox" />
              <label className="whitespace-nowrap">All In</label>
            </SpotRateLabelAndDropDown>

            <SpotRateLabelAndInput
              label="Currency"
              required
              className="w-fit"
            />

            <SpotRateLabelAndInput
              label="Threshold Limit"
              required
              className="w-fit"
            />

            <SpotRateLabelAndInput label="Valid From" required>
              <SpotRateDateIcon />
            </SpotRateLabelAndInput>

            <SpotRateLabelAndInput label="Valid To" required>
              <SpotRateDateIcon />
            </SpotRateLabelAndInput>

            <div className="flex items-center gap-2">
              <RadioGroup className="" defaultValue="exclude">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exclude" id="r1" />
                  <Label htmlFor="r1">Commissionable</Label>

                  <RadioGroupItem value="include" id="r2" />
                  <Label htmlFor="r2">Non Commissionable</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        {/* Requester Details Section */}
        <div className="rounded-lg border p-4">
          <h2 className="text-lg font-semibold">Requester Details</h2>

          <div className="grid grid-cols-1 gap-4">
            <SpotRateLabelAndInput label="Requested By" required />

            <SpotRateLabelAndInput label="Requested On" required>
              <SpotRateDateIcon />
            </SpotRateLabelAndInput>

            <SpotRateLabelAndInput label="Station" required />

            <div className="flex items-center gap-2">
              <label className="whitespace-nowrap">Reason *</label>
              <Textarea />
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="col-span-2">
        {/* Data table 1 */}
        <div className="flex justify-end gap-2">
          <Button>Add</Button>
          <Button>Delete</Button>
        </div>
        <SpotRateNewDataTable />

        <div className="flex justify-end gap-2">
          <Button>Add</Button>
          <Button>Delete</Button>
        </div>

        <SpotRateNewDataTable2 />
      </div>
    </div>
  )
}

export default SpotRateNewRequesterDetails
