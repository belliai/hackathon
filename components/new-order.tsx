import React from "react"

import {
  amountDue,
  balanceDetails,
  bookingDetails,
  grandTotal,
  subtotal,
} from "@/lib/data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Separator } from "./ui/separator"

const NewOrder = () => {
  return (
    <div className="flex flex-col gap-4 p-2 text-white lg:flex-row">
      {/* Left Column */}
      <div className="flex w-1/3 flex-col rounded-lg border border-zinc-700 p-2">
        <div className="flex flex-col gap-2">
          <span className="inline-flex px-4 py-2 text-sm">Create Booking</span>
          <span className="inline-flex px-4 py-2 text-sm">
            Consignment Details
          </span>
          <span className="inline-flex px-4 py-2 text-sm">Shipper Details</span>
          <span className="inline-flex px-4 py-2 text-sm">Process Rates</span>
          <span className="inline-flex px-4 py-2 text-sm">Activity Log</span>
        </div>
      </div>

      {/* Middle Column */}
      {/* Middle Column */}
      <div className="flex w-full flex-col rounded-lg border border-zinc-700 p-4 text-sm">
        <h2 className="mb-4 text-xl font-bold">Booking Details</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block">Booking Type</label>
            <Select>
              <SelectTrigger
                className="rounded-lg border border-zinc-500"
                aria-label="Booking Type"
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1 block">Partner Prefix *</label>
            <Select>
              <SelectTrigger
                className="rounded-lg border border-zinc-500"
                aria-label="Partner Prefix"
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="prefix1">Prefix 1</SelectItem>
                <SelectItem value="prefix2">Prefix 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1 block">AWB#</label>
            <Select>
              <SelectTrigger
                className="rounded-lg border border-zinc-500"
                aria-label="AWB#"
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="awb1">AWB 1</SelectItem>
                <SelectItem value="awb2">AWB 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1 block">Partner Code *</label>
            <Select>
              <SelectTrigger
                className="rounded-lg border border-zinc-500"
                aria-label="Partner Code"
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="code1">Code 1</SelectItem>
                <SelectItem value="code2">Code 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            <span>Is Physical</span>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg bg-blue-600 px-4 py-2">Search</button>
            <button className="rounded-lg bg-blue-600 px-4 py-2">Reset</button>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex w-1/2 flex-col rounded-lg text-sm">
        {/* Amount Due Box */}
        <div className="mb-4 flex flex-col rounded-lg border border-zinc-700 p-4">
          <h2 className="mb-4 text-xl font-bold">Amount Due</h2>
          <Separator className="mb-2 bg-zinc-700" />
          <div className="flex flex-col gap-2">
            {Object.entries(amountDue).map(([label, value]) => (
              <div className="flex justify-between" key={label}>
                <span className="font-semibold capitalize text-zinc-300">
                  {label.replace(/([a-z])([A-Z])/g, "$1 $2")}
                </span>
                <span className="text-zinc-300">{value}</span>
              </div>
            ))}
          </div>
          <Separator className="mb-4 mt-4 bg-zinc-700" />
          <div className="flex justify-between">
            <span className="font-semibold text-zinc-300">Subtotal</span>
            <span className="text-zinc-300">{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-zinc-300">Grand Total</span>
            <span className="text-zinc-300">{grandTotal}</span>
          </div>
        </div>

        {/* Balance Box */}
        <div className="mb-4 flex flex-col rounded-lg border border-zinc-700">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-bold">Balance</h2>
            <span className="text-xl font-semibold text-zinc-300">
              {balanceDetails.individualBalance}
            </span>
          </div>
          <Separator className="bg-zinc-700" />
          <div className="flex flex-col gap-2 p-4">
            <div className="flex justify-between">
              <span className="font-bold text-zinc-200">
                {balanceDetails.customerName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-zinc-300">
                Individual Balance
              </span>
              <span className="text-zinc-300">
                {balanceDetails.individualBalance}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons Box */}
        <div className="flex flex-col rounded-lg">
          <div className="flex flex-col gap-2">
            <button className="rounded-lg bg-teal-600 px-4 py-2">
              View Invoice
            </button>
            <button className="rounded-lg bg-purple-600 px-4 py-2">
              Save Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewOrder
