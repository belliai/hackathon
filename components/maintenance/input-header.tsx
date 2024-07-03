import React, { useState } from "react"
import { Separator } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function InputHeader() {
  return (
    <div>
      <div className="ml-4 flex w-full justify-between">
        <h2 className="mb-2 text-xl font-semibold">Update AWB Information</h2>
      </div>
      <Separator className="my-4" />
      <InputDemo />
    </div>
  )
}
function InputDemo() {
  const [input1, setInput1] = useState("")
  const [input2, setInput2] = useState("")
  const [list, setList] = useState<string[]>([])

  const handleAdd = () => {
    setList([...list, `${input1} ${input2}`])
    setInput1("")
    setInput2("")
  }

  return (
    <div className="gap-6 py-8">
      <div className="ml-4 flex w-full justify-between">
        <div className="flex items-center space-x-4">
          <label htmlFor="awbNumber" className="flex items-center space-x-1">
            AWBNumber *
          </label>
          <Input type="text" id="awbNumber" className="w-24" />
          <Input type="text" id="awbNumber" className="w-24" />
          <Button className="ml-2">List</Button>
          <Button className="ml-2">Clear</Button>
        </div>
      </div>
      <Separator className="my-4" />
    </div>
  )
}
