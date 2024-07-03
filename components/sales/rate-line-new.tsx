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

export default function RateLineNew() {
  return (
    <div>
      <div className="rate-line-form">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Rate Card Name" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="IATA">IATA</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Origin" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="airport">Airport</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Destination" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="airport">Airport</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Rating Basis" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="weightBr">Weight Br</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input placeholder="Contr Ref" />
        <Input placeholder="Agent Comm %" />
        <Input placeholder="Max Discount %" />
        <label>Heavy Applicable</label>
        <Checkbox />
        <label>All-In Rate</label>
        <Checkbox />
        <label>Is Prime</label>
        <Checkbox />
        <label>TACT Rate</label>
        <Checkbox />
        <Button>Save</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Charge/Rate</TableHead>
            <TableHead>Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="N">N</SelectItem>
                    <SelectItem value="Q">Q</SelectItem>
                    <SelectItem value="F">F</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Input placeholder="0" />
            </TableCell>
            <TableCell>
              <Input placeholder="0" />
            </TableCell>
            <TableCell>
              <Input placeholder="0" />
            </TableCell>
            <TableCell>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup></SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="N">N</SelectItem>
                    <SelectItem value="Q">Q</SelectItem>
                    <SelectItem value="F">F</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Input placeholder="0" />
            </TableCell>
            <TableCell>
              <Input placeholder="0" />
            </TableCell>
            <TableCell>
              <Input placeholder="0" />
            </TableCell>
            <TableCell>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="select">Select</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="N">N</SelectItem>
                    <SelectItem value="Q">Q</SelectItem>
                    <SelectItem value="F">F</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>
            <TableCell>
              <Input placeholder="0" />
            </TableCell>
            <TableCell>
              <Input placeholder="0" />
            </TableCell>
            <TableCell>
              <Input placeholder="0" />
            </TableCell>
            <TableCell>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="select">Select</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div>
        <Button>Add</Button>
        <Button>Delete</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ULDType</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Charge/Rate</TableHead>
            <TableHead>Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
              </Select>
            </TableCell>
            <TableCell>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
              </Select>
            </TableCell>
            <TableCell>
              <Input placeholder="0" />
            </TableCell>
            <TableCell>
              <Input placeholder="0" />
            </TableCell>
            <TableCell>
              <Input placeholder="0" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div>
        <Button>Add</Button>
        <Button>Delete</Button>
      </div>
      <ParameterForm />
      <div>
        <Textarea placeholder="Type your remarks here." />
      </div>
      <div>
        <Button>Add Another</Button>
        <Button>Save</Button>
        <Button>Cancel</Button>
        <Button variant="secondary">Impact Analysis</Button>
      </div>
    </div>
  )
}

export function ParameterForm() {
  return (
    <div>
      <Table>
        <TableHeader>Paramter</TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <label>Flight Carrier</label>
            </TableCell>
            <TableCell>
              <Input placeholder="" />
            </TableCell>
            <TableCell>
              <RadioGroup className="" defaultValue="exclude">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exclude" id="r1" />
                  <Label htmlFor="r1">Exclude</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="include" id="r2" />
                  <Label htmlFor="r2">Include</Label>
                </div>
              </RadioGroup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <label>Issuing Carrier</label>
            </TableCell>
            <TableCell>
              <Input placeholder="AK" />
            </TableCell>
            <TableCell>
              <RadioGroup className="" defaultValue="exclude">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exclude" id="r1" />
                  <Label htmlFor="r1">Exclude</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="include" id="r2" />
                  <Label htmlFor="r2">Include</Label>
                </div>
              </RadioGroup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <label>Proration %</label>
            </TableCell>
            <TableCell>
              <Input placeholder="AK" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <label>SPA Markup%</label>
            </TableCell>
            <TableCell>
              <Input placeholder="" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <label>Flight Number</label>
            </TableCell>
            <TableCell>
              <Input placeholder="" />
            </TableCell>
            <TableCell>
              <RadioGroup className="" defaultValue="exclude">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exclude" id="r1" />
                  <Label htmlFor="r1">Exclude</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="include" id="r2" />
                  <Label htmlFor="r2">Include</Label>
                </div>
              </RadioGroup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <label>Days of the Week</label>
            </TableCell>
            <TableCell>
              <RadioGroup className="" defaultValue="mon">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mon" id="r1" />
                  <Label htmlFor="r1">Mon</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tue" id="r2" />
                  <Label htmlFor="r2">Tue</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="wed" id="r2" />
                  <Label htmlFor="r2">Wed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="thu" id="r2" />
                  <Label htmlFor="r2">Thu</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fri" id="r2" />
                  <Label htmlFor="r2">Fri</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sat" id="r2" />
                  <Label htmlFor="r2">Sat</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Sun" id="r2" />
                  <Label htmlFor="r2">Sun</Label>
                </div>
              </RadioGroup>
            </TableCell>
            <TableCell>
              <RadioGroup className="" defaultValue="exclude">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exclude" id="r1" />
                  <Label htmlFor="r1">Exclude</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="include" id="r2" />
                  <Label htmlFor="r2">Include</Label>
                </div>
              </RadioGroup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <label>Dep Interval</label>
            </TableCell>
            <TableCell>
              <label>From</label>
              <Input placeholder="" />
              <label>To</label>
              <Input placeholder="" />
            </TableCell>
            <TableCell>
              <RadioGroup className="" defaultValue="exclude">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exclude" id="r1" />
                  <Label htmlFor="r1">Exclude</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="include" id="r2" />
                  <Label htmlFor="r2">Include</Label>
                </div>
              </RadioGroup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <label>Transit Station</label>
            </TableCell>
            <TableCell>
              <Input placeholder="" />
            </TableCell>
            <TableCell>
              <RadioGroup className="" defaultValue="exclude">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exclude" id="r1" />
                  <Label htmlFor="r1">Exclude</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="include" id="r2" />
                  <Label htmlFor="r2">Include</Label>
                </div>
              </RadioGroup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <label>Shipping Agent Code</label>
            </TableCell>
            <TableCell>
              <Input placeholder="" />
            </TableCell>
            <TableCell>
              <RadioGroup className="" defaultValue="exclude">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exclude" id="r1" />
                  <Label htmlFor="r1">Exclude</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="include" id="r2" />
                  <Label htmlFor="r2">Include</Label>
                </div>
              </RadioGroup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <label>Shipper Code</label>
            </TableCell>
            <TableCell>
              <Input placeholder="" />
            </TableCell>
            <TableCell>
              <RadioGroup className="" defaultValue="exclude">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exclude" id="r1" />
                  <Label htmlFor="r1">Exclude</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="include" id="r2" />
                  <Label htmlFor="r2">Include</Label>
                </div>
              </RadioGroup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <label>IATA Comm.Code</label>
            </TableCell>
            <TableCell>
              <Input placeholder="" />
            </TableCell>
            <TableCell>
              <RadioGroup className="" defaultValue="exclude">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exclude" id="r1" />
                  <Label htmlFor="r1">Exclude</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="include" id="r2" />
                  <Label htmlFor="r2">Include</Label>
                </div>
              </RadioGroup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <label>Product Type</label>
            </TableCell>
            <TableCell>
              <Input placeholder="" />
            </TableCell>
            <TableCell>
              <RadioGroup className="" defaultValue="exclude">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exclude" id="r1" />
                  <Label htmlFor="r1">Exclude</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="include" id="r2" />
                  <Label htmlFor="r2">Include</Label>
                </div>
              </RadioGroup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <label>SPL Handling Code</label>
            </TableCell>
            <TableCell>
              <Input placeholder="" />
            </TableCell>
            <TableCell>
              <RadioGroup className="" defaultValue="exclude">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exclude" id="r1" />
                  <Label htmlFor="r1">Exclude</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="include" id="r2" />
                  <Label htmlFor="r2">Include</Label>
                </div>
              </RadioGroup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <label>Equipment Type</label>
            </TableCell>
            <TableCell>
              <Input placeholder="" />
            </TableCell>
            <TableCell>
              <RadioGroup className="" defaultValue="exclude">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exclude" id="r1" />
                  <Label htmlFor="r1">Exclude</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="include" id="r2" />
                  <Label htmlFor="r2">Include</Label>
                </div>
              </RadioGroup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <label>Billing Agent Code</label>
            </TableCell>
            <TableCell>
              <Input placeholder="" />
            </TableCell>
            <TableCell>
              <RadioGroup className="" defaultValue="exclude">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exclude" id="r1" />
                  <Label htmlFor="r1">Exclude</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="include" id="r2" />
                  <Label htmlFor="r2">Include</Label>
                </div>
              </RadioGroup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <label>Service Taker</label>
            </TableCell>
            <TableCell>
              <Input placeholder="" />
            </TableCell>
            <TableCell>
              <RadioGroup>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exclude" id="r1" />
                  <Label htmlFor="r1">Exclude</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="include" id="r2" />
                  <Label htmlFor="r2">Include</Label>
                </div>
              </RadioGroup>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <label>Flight Type</label>
            </TableCell>
            <TableCell>
              <Input />
            </TableCell>
            <TableCell>
              <RadioGroup className="" defaultValue="exclude">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exclude" id="r1" />
                  <Label htmlFor="r1">Exclude</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="include" id="r2" />
                  <Label htmlFor="r2">Include</Label>
                </div>
              </RadioGroup>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
export function DatePicker() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
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
