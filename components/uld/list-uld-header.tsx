import React, { useState } from "react"
import { Separator } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ListUldInputHeader() {
  return (
    <div className="space-y-6 px-4 py-8">
      <div className="flex w-full justify-between">
        <div className="flex flex-wrap items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="location" className="whitespace-nowrap">
              Location *
            </label>
            <Selector />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="uldNumber" className="whitespace-nowrap">
              ULD#
            </label>
            <Input type="text" id="uldNumber" className="w-24" />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="uldType" className="whitespace-nowrap">
              ULD type
            </label>
            <Selector />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="uldOwner" className="whitespace-nowrap">
              ULD Owner
            </label>
            <Selector />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="uldUseStatus" className="whitespace-nowrap">
              ULD Use Status
            </label>
            <Selector />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="uldStatus" className="whitespace-nowrap">
              ULD Status
            </label>
            <Selector />
          </div>
          <div className="flex items-center space-x-2">
            <label htmlFor="status" className="whitespace-nowrap">
              Status
            </label>
            <Selector />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button className="ml-2">List</Button>
          <Button className="ml-2">Clear</Button>
          <Button className="ml-2">Export</Button>
        </div>
      </div>
      <Separator className="my-4" />
    </div>
  )
}

function Selector() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Options</SelectLabel>
          <SelectItem value="Option 1">Option 1</SelectItem>
          <SelectItem value="Option 2">Option 2</SelectItem>
          <SelectItem value="Option 3">Option 3</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
