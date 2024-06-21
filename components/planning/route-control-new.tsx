"use client"

import * as React from "react"
import { useState } from "react" // Add this line
import {
        Table,
        TableBody,
        TableCaption,
        TableCell,
        TableFooter,
        TableHead,
        TableHeader,
        TableRow,
    } from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
        Select,
        SelectContent,
        SelectGroup,
        SelectItem,
        SelectLabel,
        SelectTrigger,
        SelectValue,
    } from "@/components/ui/select"
export default function RouteControlNewForm() {
    const [validity, setValidity] = useState<Date | undefined>(new Date());
    const [flightDate, setFlightDate] = useState<Date | undefined>(new Date());

    const handleValidityChange = (date: Date | undefined) => {
        setValidity(date ?? new Date());
    };

    const handleFlightDateChange = (date: Date | undefined) => {
        setFlightDate(date ?? new Date());
    };

    return (
        <div className="p-4">
            <div className="flex space-x-4 mb-4">
                <div>
                    <Label htmlFor="refNo">Ref. No.</Label>
                    <Input id="refNo" />
                </div>
                <Button variant="secondary" className="self-end">List</Button>
                <Button variant="secondary" className="self-end">Clear</Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 grid grid-cols-2 gap-2 row-gap-2">
                    <div>
                        <Label htmlFor="refNo">Ref. No.</Label>
                        <Input id="refNo" />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" />
                    </div>
                    <div>
                        <Label htmlFor="validity">Validity</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !validity && "text-muted-foreground")}>
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {validity ? format(validity, "PPP") : "Pick a date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={validity} onSelect={handleValidityChange} />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div>
                        <Label htmlFor="flightDate">Flight Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !flightDate && "text-muted-foreground")}>
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {flightDate ? format(flightDate, "PPP") : "Pick a date"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={flightDate} onSelect={handleFlightDateChange} />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div>
                        <Label htmlFor="origin">Origin*</Label>
                        <Select>
                            <SelectTrigger id="origin">
                                <SelectValue placeholder="Airport" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="JFK">JFK</SelectItem>
                                    <SelectItem value="LAX">LAX</SelectItem>
                                    {/* Add more options as needed */}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="destination">Destination*</Label>
                        <Select>
                            <SelectTrigger id="destination">
                                <SelectValue placeholder="Airport" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="minCapacity">Minimum Available Capacity</Label>
                        <Input id="minCapacity" />
                    </div>
                    <div>
                        <Label htmlFor="maxWeight">Maximum Weight</Label>
                        <Input id="maxWeight" />
                    </div>
                    <div>
                        <Label htmlFor="minVolume">Minimum Available Volume</Label>
                        <Input id="minVolume" />
                    </div>
                    <div>
                        <Label htmlFor="maxValue">Max Declared Value</Label>
                        <Input id="maxValue" />
                    </div>
                    <div>
                        <Label htmlFor="type">Type</Label>
                        <Select>
                            <SelectTrigger id="type">
                                <SelectValue placeholder="Warning" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Warning">Warning</SelectItem>
                                    <SelectItem value="Critical">Critical</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="yield">Yield</Label>
                        <Input id="yield" />
                    </div>
                    <div>
                        <Label htmlFor="appliedOn">Applied On</Label>
                        <Select>
                            <SelectTrigger id="appliedOn">
                                <SelectValue placeholder="Outbound" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="Outbound">Outbound</SelectItem>
                                    <SelectItem value="Inbound">Inbound</SelectItem>
                                   
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="gap-2">
                        <Label htmlFor="active">Active</Label>
                        <Checkbox id="active" defaultChecked />
                    </div>
                    <div className="gap-2">
                        <Label htmlFor="harmonizedCode">Required Harmonized Code</Label>
                        <Checkbox id="harmonizedCode" />
                    </div>
                    <div>
                        <Label htmlFor="remark">Remark</Label>
                        <Input id="remark" />
                    </div>
                </div>

                <div className="border-l pl-4">
                    <Label>Parameters</Label>
                    <div className="col-span-2 grid grid-cols-2 gap-2">
                        {[
                            "Issuing Carrier", "Flight Carrier", "Origin", "Destination", "Transit Station", "Flight#", 
                            "Shipper", "Shipping Agent Code", "Billing Agent Code", "Priority", "Product Type", "Comm Code", 
                            "SHC", "ULD Categories", "Days of Week (Booking Date)", "Days of Week (Flight Date)", "Payment Type", 
                            "Equipment Type", "Flight Type", "Part Shipment Block", "Tail No"
                        ].map((param, index) => (
                            <React.Fragment key={index}>
                                <Label>{param}</Label>
                                <Input className="col-span-2" />
                                <div className="col-span-3 flex space-x-2">
                                    <div className="flex items-center space-x-2">
                                        <Label htmlFor={`${param}-exclude`}>Exclude</Label>
                                        <Checkbox id={`${param}-exclude`} />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Label htmlFor={`${param}-include`}>Include</Label>
                                        <Checkbox id={`${param}-include`} />
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                    <div>            
                        <Label htmlFor="Days of Week (Booking Date)">Days of Week (Booking Date)</Label>
                        <div className="flex flex-wrap gap-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="Mon" />
                                <Label htmlFor="Mon">Mon</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="Tue" />
                                <Label htmlFor="Tue">Tue</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="Wed" />
                                <Label htmlFor="Wed">Wed</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="Thu" />
                                <Label htmlFor="Thu">Thu</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="Fri" />
                                <Label htmlFor="Fri">Fri</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="Sat" />
                                <Label htmlFor="Sat">Sat</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="Sun" />
                                <Label htmlFor="Sun">Sun</Label>
                            </div>
                        </div>
                    </div>
                    <div>            
                        <Label htmlFor="Days of Week (Flight Date)">Days of Week (Flight Date)</Label>
                        <div className="flex flex-wrap gap-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="Mon" />
                                <Label htmlFor="Mon">Mon</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="Tue" />
                                <Label htmlFor="Tue">Tue</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="Wed" />
                                <Label htmlFor="Wed">Wed</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="Thu" />
                                <Label htmlFor="Thu">Thu</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="Fri" />
                                <Label htmlFor="Fri">Fri</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="Sat" />
                                <Label htmlFor="Sat">Sat</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="Sun" />
                                <Label htmlFor="Sun">Sun</Label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex space-x-4 mt-4">
                <Button button-variant="primary">Save</Button>
                <Button variant="secondary">Add Another</Button>
            </div>
        </div>
    );
}