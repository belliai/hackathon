import React from "react";
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import SpotRateLabelAndInput from "@/components/sales/spot-rate/SpotRateLabelAndInput";
import { SpotRateDateIcon } from "../SpotRateDatePicker";
import SpotRateDropDown from "../SpotRateDropDown";

const SpotRateAndRequesterDetails = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Left Column */}
      <div className="col-span-2">
        {/* Spot Rate Details Section */}
        <div className="rounded-lg border p-4 mb-4">
          <h2 className="mb-4 text-lg font-semibold">Spot Rate Details</h2>
          <div className="grid grid-cols-1 gap-4">
            <SpotRateLabelAndInput label="Spot Category" required />
            <SpotRateLabelAndInput label="Weight Category" required />
            <SpotRateLabelAndInput label="Currency" required />
            <SpotRateLabelAndInput label="Threshold Limit" required />
            <SpotRateLabelAndInput label="Valid From" required />
            <SpotRateLabelAndInput label="Valid To" required />
          </div>
        </div>

        {/* Requester Details Section */}
        <div className="rounded-lg border p-4">
          <h2 className="mb-4 text-lg font-semibold">Requester Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <SpotRateLabelAndInput label="Requested By" required />
            <SpotRateLabelAndInput label="Requested On" required />
            <SpotRateLabelAndInput label="Station" required />
            <SpotRateLabelAndInput label="Reason" required />
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="col-span-1">
        <div className="rounded-lg border p-4 mb-4">
          <h2 className="mb-4 text-lg font-semibold">Data Table 1</h2>
          {/* Your Data Table 1 component here */}
          <table className="min-w-full">
            <thead>
              <tr>
                <th>Type</th>
                <th>Weight/Count</th>
                <th>Charge/Rate</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Q</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
          <div className="flex justify-end mt-2">
            <button className="mr-2 bg-red-500 text-white px-2 py-1 rounded">Add</button>
            <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <h2 className="mb-4 text-lg font-semibold">Data Table 2</h2>
          {/* Your Data Table 2 component here */}
          <table className="min-w-full">
            <thead>
              <tr>
                <th>ULD Type</th>
                <th>Type</th>
                <th>Weight</th>
                <th>Charge/Rate</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Select</td>
                <td>F</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
          <div className="flex justify-end mt-2">
            <button className="mr-2 bg-red-500 text-white px-2 py-1 rounded">Add</button>
            <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotRateAndRequesterDetails;
