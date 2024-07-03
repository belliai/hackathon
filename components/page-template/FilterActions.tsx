"use client"

import { Button } from "../ui/button"

export default function FilterActions() {
  return (
    <div className="grid grid-cols-2 gap-2 md:col-span-2 md:grid-cols-4">
      <Button
        className="bg-button-primary text-white hover:bg-button-primary/80"
        type="button"
        size="sm"
      >
        List
      </Button>
      <Button
        className="bg-button-primary text-white hover:bg-button-primary/80"
        type="button"
        size="sm"
      >
        Clear
      </Button>
      <Button
        className="bg-button-primary text-white hover:bg-button-primary/80"
        type="button"
        size="sm"
      >
        Export
      </Button>
      <Button
        className="bg-button-primary text-white hover:bg-button-primary/80"
        type="button"
        size="sm"
      >
        Delete
      </Button>
    </div>
  )
}
