import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@components/ui/button";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@radix-ui/react-label";
import { Separator } from "../ui/separator";

const Consignmentlabels = [
  "AWB Origin",
  "AWB Destination",
  "Shipper",
  "Consignee",
  "Notify Party",
  "Commodity",
  "Comm. Description",
  "Shipping Agent",
  "Bill To",
  "Product Type",
  "SHC",
  "Pay Mode",
  "Pieces",
  "Gross Weight",
  "Volume",
  "Chargeable Weight",
  "Currency Code",
  "Executed Date",
  "Dimensions",
  "Packaging Info.",
  "Accepted Date",
  "DV for Customs",
  "DV for Carriage",
  "Insurance Amount",
];

const RateLabels = ["Rate / KG", 		
"IATA Freight Amount",		
"IATA Tax Amount",		
"MKT Freight Amount",
"MKT Tax Amount",
"Spot Freight Amount",		"Spot Tax Amount:   0.00",
"OCDC	"	,
"OCDC Tax",
"OCDA",
"OCDA Tax",	
"Total Tax",	
"AWB Total(Amount Due)"	,	
"Collection Status"
]

const Otherlabels = ["Handling Info", "Harmonised System COde", "Remarks"]

const oldValues = [
  "Old Value 1",
  "Old Value 2",
  "Old Value 3",
  "Old Value 4",
  "Old Value 5",
  "Old Value 6",
  "Old Value 7",
  "Old Value 8",
  "Old Value 9",
  "Old Value 10",
  "Old Value 11",
  "Old Value 12",
  "Old Value 13",
  "Old Value 14",
  "Old Value 15",
  "Old Value 16",
  "Old Value 17",
  "Old Value 18",
  "Old Value 19",
  "Old Value 20",
  "Old Value 21",
  "Old Value 22",
  "Old Value 23",
  "Old Value 24",
];

export default function FormSection() {
  const [newValues, setNewValues] = useState<string[]>(new Array(Consignmentlabels.length).fill(""));

  const handleInputChange = (index: number, value: string) => {
    const updatedValues = [...newValues];
    updatedValues[index] = value;
    setNewValues(updatedValues);
  };

  const renderInputField = (label: string, index: number) => {
    switch (label) {
      case "Product Type":
      case "Pay Mode":
        return (
          <div className="flex items-center">
          <Select
            value={newValues[index]}
            onValueChange={(value) => handleInputChange(index, value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder={`Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                <SelectItem value="Option 1">Option 1</SelectItem>
                <SelectItem value="Option 2">Option 2</SelectItem>
                <SelectItem value="Option 3">Option 3</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">i</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Information about {label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          </div>
        );
      case "Dimensions":
      case "Packaging Info.":
        return (
          <div className="flex items-center">
          <Popover >
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-32">Open form</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">{label}</h4>
                  <p className="text-sm text-muted-foreground">
                    Set the {label.toLowerCase()}.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor={`input1-${index}`}>Input 1</Label>
                    <Input
                      id={`input1-${index}`}
                      value={newValues[index]}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor={`input2-${index}`}>Input 2</Label>
                    <Input
                      id={`input2-${index}`}
                      value={newValues[index]}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">i</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Information about {label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        </div>
        );
      default:
        return ( 
          <div className="flex items-center">
          <Input
            type="text"
            value={newValues[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder="New Value"
            className="w-32"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">i</Button>
              </TooltipTrigger>
              <TooltipContent >
                <p>Information about {label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          </div>
        );
    }
  };

  return (
    <div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Consignment Information</TableHead>
          <TableHead>OLD VALUES</TableHead>
          <TableHead>NEW VALUES</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Consignmentlabels.map((label, index) => (
          <TableRow key={label}>
            <TableCell>{label}</TableCell>
            <TableCell>{oldValues[index]}</TableCell>
            <TableCell>
              <div className="flex items-center">
                {renderInputField(label, index)}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Separator className="my-4" />
    <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Rate Information</TableHead>
        <TableHead>OLD VALUES</TableHead>
        <TableHead>NEW VALUES</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {RateLabels.map((label, index) => (
        <TableRow key={label}>
          <TableCell>{label}</TableCell>
          <TableCell>{oldValues[index]}</TableCell>
          <TableCell>
            <div className="flex items-center">
              {renderInputField(label, index)}
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
    </Table>
    <Separator className="my-4" />
    <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Other Information</TableHead>
        <TableHead>NEW VALUES</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {Otherlabels.map((label, index) => (
        <TableRow key={label}>
          <TableCell>{label}</TableCell>
          <TableCell>
            <div className="flex items-center">
              {renderInputField(label, index)}
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
    </Table>
    <Separator className="my-4" />
    <Table>
      <TableCell>NOTE:</TableCell>
      <TableCell>
      <Input
            type="text"
            placeholder=""
            className="w-32"
          />
      </TableCell>
    </Table>
    <Button className="ml-2">Save</Button>
    <Button className="ml-2">Clear</Button>
    <Button className="ml-2">Un-Return to Shipper</Button>
    </div>
  );
}
