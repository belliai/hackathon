import React, { useState } from "react"
import { Button } from "@components/ui/button"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

export default function OtherChargesNew() {
    return (
        <div>
            <div className="other-charges-form grid grid-cols-4 gap-4">
                <div>
                    <label>Charge</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Normal" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="normal">Normal</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>Start Date</label>
                    <DatePicker />
                </div>
                <div>
                    <label>End Date</label>
                    <DatePicker />
                </div>
                <div>
                    <label>Currency</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="MYR-Malaysia" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="MYR-Malaysia">MYR-Malaysia</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>Level</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Airport" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="airport">Airport</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>Location</label>
                    <Input placeholder="Location" />
                </div>
                <div>
                    <label>Payment Type</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="ALL" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="ALL">ALL</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>Charge Type</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Due Carrier" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Due Carrier">Due Carrier</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>Due Carrier</label>
                    <Input placeholder="Due Carrier" />
                </div>
                <div>
                    <label>Origin Level</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Airport" />
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
                    <Input placeholder="Origin" />
                </div>
                <div>
                    <label>Destination Level</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Airport" />
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
                    <Input placeholder="Destination" />
                </div>
                <div>
                    <label>UOM</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="ALL" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="ALL">ALL</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>Status</label>
                    <Checkbox/>
                </div>
                <div>
                    <label>Misc. Charges</label>
                    <Checkbox />
                </div>
                <div>
                    <label>GL Account Code</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="select">Select</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>Circuitry Type</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="ALL" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="ALL">ALL</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>Part of</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="ALL" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="ALL">ALL</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>Manual Edit</label>
                    <Checkbox />
                </div>
                <div>
                    <label>Charge Head Basis</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Flat Charge" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Flat Charge">Flat Charge</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>Minimum</label>
                    <Input placeholder="0" />
                </div>
                <div>
                    <label>Charge</label>
                    <Input placeholder="0" />
                </div>
                <div>
                    <label>Maximum</label>
                    <Input placeholder="0" />
                </div>
                <div>
                    <label>Applied On</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Freight" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Freight">Freight</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>BaseRate</label>
                    <Input placeholder="0" />
                </div>
                <div>
                    <label>Charged At</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="At Departure" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="At Departure">At Departure</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label>Via Station</label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="select">Select</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ULDType</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead>Charge/Rate</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell><Checkbox /></TableCell>
                        <TableCell>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="M">M</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </TableCell>
                        <TableCell><Input placeholder="0" /></TableCell>
                        <TableCell><Input placeholder="0" /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><Checkbox /></TableCell>
                        <TableCell>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="M">M</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </TableCell>
                        <TableCell><Input placeholder="0" /></TableCell>
                        <TableCell><Input placeholder="0" /></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div className="buttons flex space-x-2 mt-4">
                <Button>Add</Button>
                <Button>Delete</Button>
            </div>
            <div>
                <Textarea placeholder="Type your remarks here." />
            </div>
            <div className="buttons flex space-x-2 mt-4">
                <Button>Add Another</Button>
                <Button>Save</Button>
                <Button>Cancel</Button>
            </div>
        </div>
    );
}

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
            <PopoverContent className="w-auto p-0">
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