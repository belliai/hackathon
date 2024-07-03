import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
    TableHead,
    TableCaption,
    TableFooter
} from "@/components/ui/table";
import { Button } from "@components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger,SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

export default function OtherChargesList() {

    const rates = [
        { rateNo: 'SK-82', origin: 'KUL', destination: 'BKI', startDate: '02/02/2023', endDate: '30/06/2024' },
        { rateNo: 'SK-83', origin: 'BKI', destination: 'SYD', startDate: '01/04/2017', endDate: '01/01/2022' },
    ];

    return (
        <div>
            <div className="filters grid grid-cols-4 gap-4">
                <div>
                    <label>Origin Level</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Origin Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="airport">Airport</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>Origin</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Origin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>Destination Level</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Destination Level" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="airport">Airport</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>Destination</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Destination" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">All</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>Status</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>Charge Name</label>
                    <Input type="text" value="" />
                </div>
                <div>
                    <label>Parameter</label>
                    <Input type="text" value="" />
                </div>
                <div>
                    <label>From Date</label>
                    <DatePicker />
                </div>
                <div>
                    <label>To Date</label>
                    <DatePicker />
                </div>
                <div>
                    <label>Charge Type</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Rate Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>Agent Code</label>
                    <Input type="text" value="" />
                </div>
                <div>
                    <label>Shipper Code</label>
                    <Input type="text" value="" />
                </div>
                <div>
                    <label>IATA Comm Code</label>
                    <Input type="text" value="" />
                </div>
                <div>
                    <label>Product Type</label>
                    <Input type="text" value="" />
                </div>
                <div>
                    <label>ChargedAt</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>OC ID</label>
                    <Input type="text" value="" />
                </div>
                <div>
                    <label>Expires From Date</label>
                    <DatePicker />
                </div>
                <div>
                    <label>Expires To Date</label>
                    <DatePicker />
                </div>
            </div>
            <div className="buttons flex space-x-2 mt-4">
                <Button>List</Button>
                <Button>Clear</Button>
                <Button>Export</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Other Charges Details</TableHead>
                    </TableRow>
                </TableHeader>
            </Table>
        </div>
    );
};

export function DatePicker() {
    const [date, setDate] = React.useState<Date>()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}