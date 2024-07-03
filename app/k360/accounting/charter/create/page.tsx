import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import Contents from "./contents"

export default async function Page() {
  const Actions = () => {
    return (
      <div className="flex items-center space-x-2">
        <p className="w-full text-right text-xs">Reference no</p>
        <Input />
        <Button variant="button-secondary">Clear</Button>
      </div>
    )
  }
  const props = {
    title: "Create Charter",
    actions: <Actions />,
  }

  return <Contents {...props} />
}
