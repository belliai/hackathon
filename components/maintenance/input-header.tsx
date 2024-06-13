import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function InputHeader() {
return (
        <div>
            <div className="flex ml-4 justify-between w-full">
                <h2 className="text-xl font-semibold mb-2">Update AWB Information</h2>
            </div>
            <Separator className="my-4" />
            <InputDemo />
        </div>
);
}
function InputDemo() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [list, setList] = useState<string[]>([]);

  const handleAdd = () => {
    setList([...list, `${input1} ${input2}`]);
    setInput1("");
    setInput2("");
  };

  return (
      <div className="py-8 gap-6">
      <div className="flex ml-4 justify-between w-full">
        <div className="flex items-center space-x-4">
          <label htmlFor="awbNumber" className="flex items-center space-x-1">AWBNumber *</label>
          <Input type="text" id="awbNumber" className="w-24" />
          <Input type="text" id="awbNumber" className="w-24" />
          <Button className="ml-2">List</Button>
          <Button className="ml-2">Clear</Button>
        </div>
      </div>
      <Separator className="my-4" />
    </div>
  );
}
