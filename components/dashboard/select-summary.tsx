import React, { useState } from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SummaryBar({
  onTypeChange,
  onDateButtonClick,
}: {
  onTypeChange: (type: string) => void
  onDateButtonClick: (fromDate: string, toDate: string) => void
}) {
  const [selectedType, setSelectedType] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
    onTypeChange(type)
  }

  const handleDateButtonClick = () => {
    onDateButtonClick(fromDate, toDate)
  }

  return (
    <div className="flex items-center justify-between bg-black p-4 text-white">
      <div>
        <Select value={selectedType} onValueChange={handleTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue>{selectedType}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Summary Type</SelectLabel>
              <SelectItem
                value="Inbound"
                onClick={() => handleTypeChange("Inbound")}
              >
                Inbound
              </SelectItem>
              <SelectItem
                value="Outbound"
                onClick={() => handleTypeChange("Outbound")}
              >
                Outbound
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="fromDate">From:</label>
        <input
          type="date"
          id="fromDate"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="ml-2 bg-black text-white"
        />
        <label htmlFor="toDate" className="ml-2">
          To:
        </label>
        <input
          type="date"
          id="toDate"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="ml-2 bg-black text-white"
        />
        <button onClick={handleDateButtonClick} className="ml-2">
          Apply Date
        </button>
      </div>
    </div>
  )
}
