import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SpotRateNewHeader = () => {
  return (
    <div className="flex items-center gap-4 py-2 border-y">
      {/* AWB Number */}
      <div className="flex items-center gap-2">
        <label className="whitespace-nowrap">AWB Number*</label>
        <Input type="text" defaultValue="807" className="w-20" />
        <Input type="text" className="w-32" />
      </div>
      
      {/* Buttons */}
      <div className="flex items-center gap-2">
        <Button className="bg-red-600 text-white">List</Button>
        <Button className="bg-red-600 text-white">Clear</Button>
      </div>
      
      {/* Spot Rate ID */}
      <div className="flex items-center gap-2 ml-auto">
        <label className="whitespace-nowrap font-bold">Spot Rate ID</label>
        <Input type="text" disabled className="w-32 bg-gray-300" />
      </div>
    </div>
  );
};

export default SpotRateNewHeader;
