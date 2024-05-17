import React from "react";
import {
  bookingDetails,
  amountDue,
  balanceDetails,
  subtotal,
  grandTotal,
} from "@/lib/data";
import { Separator } from "./ui/separator";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";


const NewOrder = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 p-2  text-white ">
      {/* Left Column */}
      <div className="flex flex-col w-1/3 border-zinc-700 border p-2 rounded-lg">
        <div className="flex flex-col gap-2">
          <span className="py-2 px-4 inline-flex text-sm">Create Booking</span>
          <span className="py-2 px-4 inline-flex text-sm">
            Consignment Details
          </span>
          <span className="py-2 px-4 inline-flex text-sm">Shipper Details</span>
          <span className="py-2 px-4 inline-flex text-sm">Process Rates</span>
          <span className="py-2 px-4 inline-flex text-sm">Activity Log</span>
        </div>
      </div>

      {/* Middle Column */}
     {/* Middle Column */}
<div className="flex flex-col w-full border-zinc-700 border p-4 rounded-lg text-sm">
  <h2 className="text-xl font-bold mb-4">Booking Details</h2>
  <div className="flex flex-col gap-4">
    <div>
      <label className="block mb-1">Booking Type</label>
      <Select >
        <SelectTrigger className="border border-zinc-500 rounded-lg" aria-label="Booking Type">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div>
      <label className="block mb-1">Partner Prefix *</label>
      <Select>
        <SelectTrigger className="border border-zinc-500 rounded-lg" aria-label="Partner Prefix">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="prefix1">Prefix 1</SelectItem>
          <SelectItem value="prefix2">Prefix 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div>
      <label className="block mb-1">AWB#</label>
      <Select>
        <SelectTrigger className="border border-zinc-500 rounded-lg" aria-label="AWB#">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="awb1">AWB 1</SelectItem>
          <SelectItem value="awb2">AWB 2</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div>
      <label className="block mb-1">Partner Code *</label>
      <Select>
        <SelectTrigger className="border border-zinc-500 rounded-lg" aria-label="Partner Code">
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
      <button className="py-2 px-4 bg-blue-600 rounded-lg">Search</button>
      <button className="py-2 px-4 bg-blue-600 rounded-lg">Reset</button>
    </div>
  </div>
</div>

      {/* Right Column */}
      <div className="flex flex-col w-1/2 rounded-lg text-sm">
        {/* Amount Due Box */}
        <div className="flex flex-col border-zinc-700 border p-4 rounded-lg mb-4">
          <h2 className="text-xl font-bold mb-4">Amount Due</h2>
          <Separator className="mb-2 bg-zinc-700" />
          <div className="flex flex-col gap-2">
            {Object.entries(amountDue).map(([label, value]) => (
              <div className="flex justify-between" key={label}>
                <span className="text-zinc-300 capitalize font-semibold">
                  {label.replace(/([a-z])([A-Z])/g, "$1 $2")}
                </span>
                <span className="text-zinc-300">{value}</span>
              </div>
            ))}
          </div>
          <Separator className="mb-4 mt-4 bg-zinc-700" />
          <div className="flex justify-between">
            <span className="text-zinc-300 font-semibold">Subtotal</span>
            <span className="text-zinc-300">{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-300 font-semibold">Grand Total</span>
            <span className="text-zinc-300">{grandTotal}</span>
          </div>
        </div>

        {/* Balance Box */}
        <div className="flex flex-col border-zinc-700 border  rounded-lg mb-4">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-bold">Balance</h2>
            <span className="text-zinc-300 text-xl font-semibold">
              {balanceDetails.individualBalance}
            </span>
          </div>
          <Separator className=" bg-zinc-700" />
          <div className="flex flex-col gap-2 p-4">
            <div className="flex justify-between">
              <span className="text-zinc-200 font-bold">
                {balanceDetails.customerName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className=" font-semibold text-zinc-300">
                Individual Balance
              </span>
              <span className=" text-zinc-300">
                {balanceDetails.individualBalance}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons Box */}
        <div className="flex flex-col rounded-lg">
          <div className="flex flex-col gap-2">
            <button className="py-2 px-4 bg-teal-600 rounded-lg">
              View Invoice
            </button>
            <button className="py-2 px-4 bg-purple-600 rounded-lg">
              Save Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
