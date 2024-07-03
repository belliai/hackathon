import Link from "next/link"

import { Button } from "@/components/ui/button"

import Contents from "./contents"

export default async function Page() {
  const Actions = () => {
    return (
      <div>
        <Link href="/accounting/agent/charge-correction/create">
          <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
            Create Charges Correction Advise
          </Button>
        </Link>
      </div>
    )
  }

  const props = {
    title: "Charge Correction Advise",
    actions: <Actions />,
  }

  return <Contents {...props} />
}
