import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function ULDStationSummary() {
  return (
    <div>
      <Button variant="outline">Add</Button>
      <Button>Save</Button>
      <Button>Cancel</Button>
      <Button>Send SCM</Button>
    </div>
  )
}
